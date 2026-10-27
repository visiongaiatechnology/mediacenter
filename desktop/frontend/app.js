/**
 * VGT MEDIACENTER SUPREME - DESKTOP STANDALONE APP ENGINE
 * STATUS: DIAMANT VGT SUPREME
 * 100% Client-Side Invariant. Zero Cloud. Zero Telemetry.
 */
"use strict";

(function() {
    let tools = [];
    let assets = { styles: {}, scripts: {} };
    let byId = new Map();
    let currentToolId = 'dashboard';
    const recentKey = 'vgt_recent_tools_v1';
    const themeKey = 'vgt_desktop_theme';

    const loadedScripts = new Set();
    const loadedStyles = new Set();

    // DOM References
    const mainContent = document.getElementById('vgt-main-content');
    const recentStrip = document.getElementById('vgt-recent-strip');
    const commandLayer = document.getElementById('vgt-command-layer');
    const commandOpenBtn = document.getElementById('vgt-command-open');
    const shellSearch = document.getElementById('vg-search');
    const themeBtn = document.getElementById('btn-theme-desktop');
    const themeIcon = document.getElementById('icon-theme-desktop');
    const modeBtn = document.getElementById('vgt-mc-mode-toggle');
    const mobileToggle = document.getElementById('vgt-shell-mobile-toggle');
    const shellPanel = document.getElementById('vgt-shell-panel');

    // SVGs for Theme Toggle
    const icons = {
        sun: '<svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
        moon: '<svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    };

    let isInitialized = false;

    async function init() {
        if (isInitialized) return;
        isInitialized = true;

        try {
            if (window.VGT_TOOLS_MANIFEST && window.VGT_ASSETS_MANIFEST) {
                tools = window.VGT_TOOLS_MANIFEST;
                assets = window.VGT_ASSETS_MANIFEST;
            } else {
                const [toolsRes, assetsRes] = await Promise.all([
                    fetch('tools-manifest.json').then(r => r.json()),
                    fetch('assets-manifest.json').then(r => r.json())
                ]);
                tools = toolsRes;
                assets = assetsRes;
            }

            byId = new Map(tools.map(t => [t.id, t]));

            // Set default category for dynamic scrollbar & theme accent
            document.documentElement.setAttribute('data-tool-cat', 'core');
            document.body.setAttribute('data-tool-cat', 'core');

            // Setup global vgtCore mock
            updateVgtCore();

            // Setup Theme
            initTheme();

            // Setup Events
            bindGlobalEvents();

            window.addEventListener('hashchange', handleRoute);

            // Defer initial tool mounting slightly so WebView2 navigation lifecycle completes cleanly
            setTimeout(() => {
                handleRoute();
            }, 10);

            console.log('🛡️ VGT Mediacenter Desktop Core Initialized with ' + tools.length + ' tools.');
        } catch (err) {
            console.error('VGT Desktop Init Failed:', err);
            if (mainContent) {
                mainContent.innerHTML = `<div class="vgt-failsafe"><div class="vgt-failsafe-card"><h2>INITIALIZATION_ERROR</h2><p>${err.message}</p></div></div>`;
            }
        }
    }

    function updateVgtCore() {
        window.vgtCore = Object.freeze({
            assetsUrl: 'assets/vendor/',
            baseUrl: '',
            cspNonce: 'desktop-secure-nonce',
            currentTool: currentToolId,
            tools: tools
        });
    }

    function initTheme() {
        const saved = localStorage.getItem(themeKey);
        if (saved === 'light') {
            document.documentElement.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
        }
        updateThemeIcon();
    }

    function updateThemeIcon() {
        if (!themeIcon) return;
        const isLight = document.documentElement.classList.contains('light-mode');
        themeIcon.innerHTML = isLight ? icons.moon : icons.sun;
    }

    function toggleTheme() {
        const isLight = document.documentElement.classList.toggle('light-mode');
        localStorage.setItem(themeKey, isLight ? 'light' : 'dark');
        updateThemeIcon();
    }

    function bindGlobalEvents() {
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

        if (commandOpenBtn) {
            commandOpenBtn.addEventListener('click', () => openCommandPalette());
        }

        if (mobileToggle && shellPanel) {
            mobileToggle.addEventListener('click', () => {
                const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                mobileToggle.setAttribute('aria-expanded', String(!expanded));
                shellPanel.classList.toggle('is-open', !expanded);
            });
        }

        if (modeBtn) {
            modeBtn.addEventListener('click', () => {
                const isDesktop = document.getElementById('vgt-main-wrapper').classList.toggle('vgt-mc-desktop-mode');
                modeBtn.setAttribute('aria-pressed', String(isDesktop));
                modeBtn.textContent = isDesktop ? 'Grid' : 'Desktop';
            });
        }

        if (shellSearch) {
            shellSearch.addEventListener('input', (e) => {
                const query = e.target.value.trim().toLowerCase();
                filterGridTools(query);
            });
        }

        // Keyboard Shortcuts: Ctrl+K or Cmd+K
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openCommandPalette();
            } else if (e.key === 'Escape') {
                closeCommandPalette();
            }
        });

        // Frameless Window Controls (Wails / Go Runtime Integration)
        const winMin = document.getElementById('vgt-win-min');
        const winMax = document.getElementById('vgt-win-max');
        const winClose = document.getElementById('vgt-win-close');

        if (winMin) {
            winMin.addEventListener('click', () => {
                if (window.runtime && window.runtime.WindowMinimise) {
                    window.runtime.WindowMinimise();
                } else if (window.go && window.go.main && window.go.main.App && window.go.main.App.WindowMinimise) {
                    window.go.main.App.WindowMinimise();
                }
            });
        }

        if (winMax) {
            winMax.addEventListener('click', () => {
                if (window.runtime && window.runtime.WindowToggleMaximise) {
                    window.runtime.WindowToggleMaximise();
                } else if (window.go && window.go.main && window.go.main.App && window.go.main.App.WindowToggleMaximise) {
                    window.go.main.App.WindowToggleMaximise();
                }
            });
        }

        if (winClose) {
            winClose.addEventListener('click', () => {
                if (window.runtime && window.runtime.Quit) {
                    window.runtime.Quit();
                } else if (window.go && window.go.main && window.go.main.App && window.go.main.App.WindowClose) {
                    window.go.main.App.WindowClose();
                } else {
                    window.close();
                }
            });
        }

        const titlebarDrag = document.querySelector('.vgt-titlebar-drag-region');
        if (titlebarDrag) {
            titlebarDrag.addEventListener('dblclick', () => {
                if (window.runtime && window.runtime.WindowToggleMaximise) {
                    window.runtime.WindowToggleMaximise();
                } else if (window.go && window.go.main && window.go.main.App && window.go.main.App.WindowToggleMaximise) {
                    window.go.main.App.WindowToggleMaximise();
                }
            });
        }

        const langBtn = document.getElementById('btn-lang-desktop');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                if (window.VGT_I18N && window.VGT_I18N.showLanguageModal) {
                    window.VGT_I18N.showLanguageModal(false);
                }
            });
        }

        document.addEventListener('vgt:language-changed', () => {
            renderRecentStrip();
            const tool = byId.get(currentToolId);
            if (tool) {
                const toolInfo = (window.VGT_I18N && window.VGT_I18N.getTool) ? window.VGT_I18N.getTool(tool.id) : null;
                const title = toolInfo ? toolInfo.title : tool.title;
                document.title = `${title} — VGT Mediacenter V1.0 Beta`;
                if (window.VGT_I18N && window.VGT_I18N.translateDOM) {
                    window.VGT_I18N.translateDOM(mainContent, tool.id);
                }
            }
        });
    }

    function filterGridTools(query) {
        const cards = document.querySelectorAll('.tool-card, .vgt-command-tool');
        cards.forEach(card => {
            const title = (card.querySelector('.tool-title, strong')?.textContent || '').toLowerCase();
            const desc = (card.querySelector('.tool-desc, p')?.textContent || '').toLowerCase();
            const match = !query || title.includes(query) || desc.includes(query);
            card.style.display = match ? '' : 'none';
        });
    }

    function handleRoute() {
        const hash = window.location.hash || '#/tool/dashboard';
        const match = hash.match(/^#\/tool\/([a-zA-Z0-9_-]+)/);
        const toolId = match ? match[1] : 'dashboard';

        loadTool(toolId);
    }

    async function loadTool(toolId) {
        const tool = byId.get(toolId) || byId.get('dashboard');
        if (!tool) return;

        currentToolId = tool.id;
        const activeCat = tool.cat || 'core';
        document.documentElement.setAttribute('data-tool-cat', activeCat);
        document.body.setAttribute('data-tool-cat', activeCat);

        updateVgtCore();
        recordRecentTool(tool);
        renderRecentStrip();

        const toolInfo = (window.VGT_I18N && window.VGT_I18N.getTool) ? window.VGT_I18N.getTool(tool.id) : null;
        const displayTitle = toolInfo ? toolInfo.title : tool.title;
        document.title = `${displayTitle} — VGT Mediacenter V1.0 Beta`;

        // Clean active tool styles/scripts
        cleanupToolArtifacts();

        try {
            // 1. Enqueue CSS Dependencies (normalized array)
            const cssDeps = Array.isArray(tool.deps_css) ? tool.deps_css : (tool.deps_css && typeof tool.deps_css === 'string' ? [tool.deps_css] : []);
            for (const cssHandle of cssDeps) {
                const file = assets.styles[cssHandle];
                if (file) await loadCss(`assets/vendor/${file}`, `vgt-dep-${cssHandle}`);
            }

            // 2. Enqueue Tool Scoped CSS
            await loadCss(`tools/${tool.path}/style.css`, `vgt-tool-css-${tool.id}`);

            // 3. Load HTML Template (Synchronous in-memory lookup first, fallback to fetch)
            let html = '';
            if (window.VGT_TEMPLATES && window.VGT_TEMPLATES[tool.id]) {
                html = window.VGT_TEMPLATES[tool.id];
            } else {
                const htmlRes = await fetch(`tools/${tool.path}/template.html`);
                if (!htmlRes.ok) throw new Error(`Template nicht gefunden (${htmlRes.status})`);
                html = await htmlRes.text();
            }

            mainContent.innerHTML = html;
            window.vgtCurrentToolId = tool.id;

            // Deep Sovereign I18N DOM Translation Pass
            try {
                if (window.VGT_I18N && window.VGT_I18N.translateDOM) {
                    window.VGT_I18N.translateDOM(mainContent, tool.id);
                }
            } catch (i18nErr) {
                console.warn('VGT_I18N non-fatal notice:', i18nErr);
            }

            // 4. Enqueue JS Dependencies sequentially (normalized array)
            const jsDeps = Array.isArray(tool.deps_js) ? tool.deps_js : (tool.deps_js && typeof tool.deps_js === 'string' ? [tool.deps_js] : []);
            for (const jsHandle of jsDeps) {
                const file = assets.scripts[jsHandle];
                if (file) await loadScript(`assets/vendor/${file}`, `vgt-dep-${jsHandle}`);
            }

            // 5. Enqueue Tool JS Engine
            await loadScript(`tools/${tool.path}/script.js`, `vgt-tool-js-${tool.id}`, true);

            // Dispatch DOMContentLoaded-like event asynchronously for modules waiting for it
            setTimeout(() => {
                try {
                    document.dispatchEvent(new Event('DOMContentLoaded'));
                    if (window.VGT_I18N && window.VGT_I18N.translateDOM) {
                        window.VGT_I18N.translateDOM(mainContent, tool.id);
                    }
                } catch (_) {}
            }, 30);

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error(`Fehler beim Laden von Tool [${tool.id}]:`, err);
            mainContent.innerHTML = `
                <div class="vgt-failsafe">
                    <div class="vgt-failsafe-card">
                        <h2>MODULE_OFFLINE: ${tool.title.toUpperCase()}</h2>
                        <p class="vgt-failsafe-copy">${err.message}</p>
                        <a href="#/tool/dashboard" class="vgt-failsafe-link">Zurück zum System Hub</a>
                    </div>
                </div>
            `;
        }
    }

    function loadCss(href, id) {
        return new Promise((resolve) => {
            if (document.getElementById(id)) return resolve();
            let done = false;
            const finish = () => {
                if (!done) {
                    done = true;
                    resolve();
                }
            };
            const link = document.createElement('link');
            link.id = id;
            link.rel = 'stylesheet';
            link.href = href;
            link.onload = finish;
            link.onerror = () => {
                console.warn('CSS Load Warning:', href);
                finish();
            };
            setTimeout(finish, 400); // 400ms safety timeout
            document.head.appendChild(link);
        });
    }

    function loadScript(src, id, isReloadable = false) {
        return new Promise((resolve) => {
            if (!isReloadable && document.getElementById(id)) return resolve();

            // If reloadable, remove old script element first
            const existing = document.getElementById(id);
            if (existing) existing.remove();

            let done = false;
            const finish = () => {
                if (!done) {
                    done = true;
                    resolve();
                }
            };
            const script = document.createElement('script');
            script.id = id;
            script.src = src;
            script.onload = finish;
            script.onerror = (e) => {
                console.warn('Script Load Warning:', src);
                finish();
            };
            setTimeout(finish, 600); // 600ms safety timeout
            document.body.appendChild(script);
        });
    }

    function cleanupToolArtifacts() {
        document.querySelectorAll('link[id^="vgt-tool-css-"], script[id^="vgt-tool-js-"]').forEach(el => el.remove());
    }

    // Recent Tools Management
    function recordRecentTool(tool) {
        if (!tool || tool.id === 'dashboard') return;
        let list = getRecentTools();
        list = list.filter(item => item.id !== tool.id);
        list.unshift({ id: tool.id, title: tool.title, cat: tool.cat });
        if (list.length > 8) list.pop();
        try {
            localStorage.setItem(recentKey, JSON.stringify(list));
        } catch (_) {}
    }

    function getRecentTools() {
        try {
            const raw = localStorage.getItem(recentKey);
            return raw ? JSON.parse(raw) : [];
        } catch (_) {
            return [];
        }
    }

    function renderRecentStrip() {
        if (!recentStrip) return;
        const list = getRecentTools();
        if (list.length === 0) {
            recentStrip.classList.add('is-empty');
            recentStrip.innerHTML = '';
            return;
        }

        const prefix = (window.VGT_I18N && window.VGT_I18N.t) ? window.VGT_I18N.t('recentPrefix') : 'Zuletzt genutzt:';

        recentStrip.classList.remove('is-empty');
        recentStrip.innerHTML = `
            <span class="vgt-recent-label">${prefix}</span>
            ${list.map(t => {
                const info = (window.VGT_I18N && window.VGT_I18N.getTool) ? window.VGT_I18N.getTool(t.id) : null;
                const title = info ? info.title : t.title;
                return `
                <a href="#/tool/${t.id}" class="vgt-recent-chip" title="${title}">
                    <span class="vgt-tool-marker cat-${t.cat}"></span>
                    <span>${title}</span>
                </a>
                `;
            }).join('')}
        `;
    }

    // Command Palette Modal
    function openCommandPalette() {
        if (!commandLayer) return;
        commandLayer.removeAttribute('aria-hidden');

        const searchPlaceholder = (window.VGT_I18N && window.VGT_I18N.t) ? window.VGT_I18N.t('searchPlaceholder') : 'Tool eingeben oder suchen...';

        commandLayer.innerHTML = `
            <div class="vgt-command-backdrop"></div>
            <div class="vgt-command-dialog" role="dialog" aria-modal="true" aria-label="Tool Navigator">
                <div class="vgt-command-search-wrap">
                    <svg viewBox="0 0 24 24" class="vgt-command-search-icon" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="search" class="vgt-command-input" id="vgt-cmd-input" placeholder="${searchPlaceholder}" autocomplete="off">
                    <kbd>Esc</kbd>
                </div>
                <div class="vgt-command-list" id="vgt-cmd-list">
                    ${tools.map((t, idx) => {
                        const info = (window.VGT_I18N && window.VGT_I18N.getTool) ? window.VGT_I18N.getTool(t.id) : null;
                        const title = info ? info.title : t.title;
                        const desc = info ? info.desc : t.desc;
                        return `
                        <a href="#/tool/${t.id}" class="vgt-command-item ${idx === 0 ? 'is-active' : ''}" data-id="${t.id}">
                            <span class="vgt-tool-marker cat-${t.cat}"></span>
                            <div class="vgt-command-item-info">
                                <strong>${title}</strong>
                                <small>${desc}</small>
                            </div>
                            <span class="vgt-command-tag">${t.cat}</span>
                        </a>
                        `;
                    }).join('')}
                </div>
            </div>
        `;

        const input = document.getElementById('vgt-cmd-input');
        const list = document.getElementById('vgt-cmd-list');
        const backdrop = commandLayer.querySelector('.vgt-command-backdrop');

        if (input) {
            input.focus();
            input.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase().trim();
                const items = list.querySelectorAll('.vgt-command-item');
                let first = true;
                items.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    const match = text.includes(q);
                    item.style.display = match ? 'flex' : 'none';
                    if (match && first) {
                        item.classList.add('is-active');
                        first = false;
                    } else {
                        item.classList.remove('is-active');
                    }
                });
            });

            input.addEventListener('keydown', (e) => {
                const visible = Array.from(list.querySelectorAll('.vgt-command-item')).filter(el => el.style.display !== 'none');
                const activeIdx = visible.findIndex(el => el.classList.contains('is-active'));

                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (visible.length > 0) {
                        if (activeIdx >= 0) visible[activeIdx].classList.remove('is-active');
                        const next = (activeIdx + 1) % visible.length;
                        visible[next].classList.add('is-active');
                        visible[next].scrollIntoView({ block: 'nearest' });
                    }
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (visible.length > 0) {
                        if (activeIdx >= 0) visible[activeIdx].classList.remove('is-active');
                        const prev = (activeIdx - 1 + visible.length) % visible.length;
                        visible[prev].classList.add('is-active');
                        visible[prev].scrollIntoView({ block: 'nearest' });
                    }
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    if (activeIdx >= 0 && visible[activeIdx]) {
                        closeCommandPalette();
                        window.location.hash = visible[activeIdx].getAttribute('href');
                    }
                }
            });
        }

        if (backdrop) backdrop.addEventListener('click', closeCommandPalette);
        commandLayer.querySelectorAll('.vgt-command-item').forEach(item => {
            item.addEventListener('click', () => closeCommandPalette());
        });
    }

    function closeCommandPalette() {
        if (!commandLayer) return;
        commandLayer.setAttribute('aria-hidden', 'true');
        commandLayer.innerHTML = '';
    }

    // Launch
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
