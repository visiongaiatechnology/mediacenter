/**
 * VGT MEDIACENTER - JSON ARCHITECT LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Recursive Node Shielding & Object Encapsulation
 * O(n) Local Parsing, Native Regex Highlighting & DOM Tree Builder.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-json')) return;

    const JsonArchitectEngine = {
        DOM: {},
        State: {
            currentJsonObj: null,
            debounceTimer: null,
            originalCopyNodes: []
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            this.resetUI();
            console.log('VGT JSON ARCHITECT: Cognitive Parsing Matrix Active.');
        },

        cacheDOM() {
            this.DOM = {
                input: document.getElementById('js-input'),
                fileIn: document.getElementById('js-file-in'),
                
                btnFormat: document.getElementById('js-btn-format'),
                btnMinify: document.getElementById('js-btn-minify'),
                btnClear: document.getElementById('js-btn-clear'),
                btnPaste: document.getElementById('js-btn-paste'),
                btnCopy: document.getElementById('js-btn-copy'),
                btnDownload: document.getElementById('js-btn-download'),
                
                statusBadge: document.getElementById('js-status'),
                statusText: document.getElementById('js-status-text'),
                
                metSize: document.getElementById('met-size'),
                metKeys: document.getElementById('met-keys'),
                metObjs: document.getElementById('met-objs'),
                metArrs: document.getElementById('met-arrs'),
                
                viewToggles: document.querySelectorAll('.view-toggle'),
                viewHighlight: document.getElementById('view-highlight'),
                viewTree: document.getElementById('view-tree'),
                
                codeOutput: document.getElementById('js-highlight-code'),
                treeRoot: document.getElementById('js-tree-root'),
                treePh: document.getElementById('tree-placeholder'),
                
                errorOverlay: document.getElementById('js-error-overlay'),
                errorMsg: document.getElementById('js-error-msg')
            };

            // Safely cache original button SVGs for copy-feedback
            if (this.DOM.btnCopy) {
                this.State.originalCopyNodes = Array.from(this.DOM.btnCopy.childNodes).map(n => n.cloneNode(true));
            }
        },

        bindEvents() {
            // Input Handlers
            this.DOM.input.addEventListener('input', () => this.handleInput());
            
            this.DOM.fileIn.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;

                if (file.size > 20 * 1024 * 1024) {
                    alert('VGT SECURITY ALERT: Sehr große Datei (>20MB). Die lokale O(n) Verarbeitung kann kurzzeitig CPU-Ressourcen binden.');
                }

                const reader = new FileReader();
                reader.onload = (ev) => {
                    this.DOM.input.value = ev.target.result; // .value ist nativ XSS-sicher
                    this.parseJSON(ev.target.result);
                };
                reader.onerror = () => alert("Systemfehler beim Lesen der Datei.");
                reader.readAsText(file);
                this.DOM.fileIn.value = ''; 
            });

            this.DOM.btnPaste.addEventListener('click', async () => {
                try {
                    const text = await navigator.clipboard.readText();
                    this.DOM.input.value = text;
                    this.parseJSON(text);
                } catch(err) {
                    alert('VGT PERMISSION ERROR: Clipboard-Zugriff verweigert. Nutze Strg+V / Cmd+V im Textfeld.');
                }
            });

            // Formatter Actions
            this.DOM.btnFormat.addEventListener('click', () => {
                if (!this.State.currentJsonObj) return;
                const formatted = JSON.stringify(this.State.currentJsonObj, null, 4);
                this.DOM.input.value = formatted;
                this.renderHighlight(formatted);
            });

            this.DOM.btnMinify.addEventListener('click', () => {
                if (!this.State.currentJsonObj) return;
                const minified = JSON.stringify(this.State.currentJsonObj);
                this.DOM.input.value = minified;
                this.renderHighlight(minified);
            });

            this.DOM.btnClear.addEventListener('click', () => {
                this.DOM.input.value = '';
                this.resetUI();
            });

            // Output Actions
            this.DOM.btnCopy.addEventListener('click', () => this.copyToClipboard());
            
            this.DOM.btnDownload.addEventListener('click', () => {
                const text = this.DOM.input.value;
                if(!text) return;

                const blob = new Blob([text], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `vgt_architect_${new Date().getTime()}.json`;
                document.body.appendChild(a);
                a.click();
                
                // GC Cleanup
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });

            // View Toggles
            this.DOM.viewToggles.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.viewToggles.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    const view = e.currentTarget.getAttribute('data-view');
                    if (view === 'highlight') {
                        this.DOM.viewTree.classList.remove('active-view');
                        this.DOM.viewHighlight.classList.add('active-view');
                    } else {
                        this.DOM.viewHighlight.classList.remove('active-view');
                        this.DOM.viewTree.classList.add('active-view');
                    }
                });
            });
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        escapeHtml(unsafe) {
            return unsafe ? String(unsafe).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
        },

        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // --- CORE PARSER ---
        resetUI() {
            this.State.currentJsonObj = null;
            this.DOM.errorOverlay.classList.add('hidden');
            this.DOM.statusBadge.className = 'status-badge';
            this.DOM.statusText.textContent = 'Bereit für Datenstrom'; // XSS Safe
            
            this.DOM.metSize.textContent = '0 B';
            this.DOM.metKeys.textContent = '0';
            this.DOM.metObjs.textContent = '0';
            this.DOM.metArrs.textContent = '0';
            
            this.safeClearOutput(this.DOM.codeOutput);
            const placeholderSpan = document.createElement('span');
            placeholderSpan.style.color = 'var(--vg-text-muted)';
            placeholderSpan.style.fontStyle = 'italic';
            placeholderSpan.textContent = '// Analysiertes JSON erscheint hier...';
            this.DOM.codeOutput.appendChild(placeholderSpan);
            
            this.safeClearOutput(this.DOM.treeRoot);
            this.DOM.treePh.classList.remove('hidden');
        },

        handleInput() {
            clearTimeout(this.State.debounceTimer);
            this.State.debounceTimer = setTimeout(() => {
                this.parseJSON(this.DOM.input.value);
            }, 400); // Prevent UI freeze on extreme payloads
        },

        parseJSON(rawString) {
            if (!rawString.trim()) {
                this.resetUI();
                return false;
            }

            try {
                // Native Parser (Fastest and safest baseline check)
                const parsed = JSON.parse(rawString);
                this.State.currentJsonObj = parsed;
                
                // Valid State
                this.DOM.errorOverlay.classList.add('hidden');
                this.DOM.statusBadge.className = 'status-badge';
                this.DOM.statusText.textContent = 'JSON Valide & Geparst';
                
                this.updateMetrics(parsed, rawString);
                this.renderHighlight(rawString); 
                this.renderTree(parsed);
                
                return true;
            } catch (err) {
                this.State.currentJsonObj = null;
                
                // Error State
                this.DOM.errorOverlay.classList.remove('hidden');
                this.DOM.errorMsg.textContent = err.message; // Safe Injection
                this.DOM.statusBadge.className = 'status-badge error';
                this.DOM.statusText.textContent = 'Syntax Error';
                
                this.safeClearOutput(this.DOM.codeOutput);
                this.safeClearOutput(this.DOM.treeRoot);
                this.DOM.treePh.classList.remove('hidden');
                
                return false;
            }
        },

        updateMetrics(obj, rawString) {
            let keys = 0, objs = 0, arrs = 0;
            
            const countData = (item) => {
                if (Array.isArray(item)) {
                    arrs++;
                    for (let i = 0; i < item.length; i++) countData(item[i]);
                } else if (typeof item === 'object' && item !== null) {
                    objs++;
                    for (let k in item) {
                        keys++;
                        countData(item[k]);
                    }
                }
            };
            
            countData(obj);
            
            this.DOM.metKeys.textContent = keys.toLocaleString('de-DE');
            this.DOM.metObjs.textContent = objs.toLocaleString('de-DE');
            this.DOM.metArrs.textContent = arrs.toLocaleString('de-DE');
            
            const bytes = new Blob([rawString]).size;
            this.DOM.metSize.textContent = this.formatBytes(bytes);
        },

        // --- RENDER ENGINES ---
        renderHighlight(jsonString) {
            // 1. Fully Escape HTML
            let str = this.escapeHtml(jsonString);
            
            // 2. Syntax Group Wrapping (Safe because malicious tags are escaped into &lt;)
            str = str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
                let cls = 'json-number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'json-key';
                    } else {
                        cls = 'json-string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean';
                } else if (/null/.test(match)) {
                    cls = 'json-null';
                }
                return `<span class="${cls}">${match}</span>`;
            });

            // VGT HARDENING: DOMParser converts syntax-string into real nodes safely
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<div>${str}</div>`, 'text/html');
            
            this.safeClearOutput(this.DOM.codeOutput);
            Array.from(doc.body.firstChild.childNodes).forEach(node => {
                this.DOM.codeOutput.appendChild(node);
            });
        },

        renderTree(obj) {
            this.DOM.treePh.classList.add('hidden');
            this.safeClearOutput(this.DOM.treeRoot);
            
            const treeDOM = this.buildTreeNode(obj, 'root', true);
            this.DOM.treeRoot.appendChild(treeDOM);
        },

        // VGT OMEGA UPGRADE: 100% Native Node Generation (Absolute XSS Immunity)
        buildTreeNode(data, key, isRoot = false) {
            const li = document.createElement('li');
            const isObj = typeof data === 'object' && data !== null;
            const isArr = Array.isArray(data);
            
            // Reusable Key/Separator Fragment
            const keyFrag = document.createDocumentFragment();
            if (!isRoot) {
                const kSpan = document.createElement('span');
                kSpan.className = 'tree-key';
                kSpan.textContent = `"${key}"`; // XSS Safe
                
                const sepSpan = document.createElement('span');
                sepSpan.className = 'tree-separator';
                sepSpan.textContent = ':';
                
                keyFrag.appendChild(kSpan);
                keyFrag.appendChild(sepSpan);
            }
            
            if (isObj) {
                const keys = Object.keys(data);
                const size = keys.length;
                const isEmpty = size === 0;
                
                const openBr = isArr ? '[' : '{';
                const closeBr = isArr ? ']' : '}';
                
                li.className = isEmpty ? '' : 'collapsible';
                
                const caret = document.createElement('div');
                caret.className = `tree-caret ${isEmpty ? 'empty' : 'expanded'}`;

                const nodeWrap = document.createElement('div');
                nodeWrap.className = 'tree-node';
                
                const contentWrap = document.createElement('div');
                contentWrap.className = 'tree-content';
                contentWrap.appendChild(keyFrag);
                
                const bracketStart = document.createElement('span');
                bracketStart.className = 'tree-bracket';
                bracketStart.textContent = openBr;
                contentWrap.appendChild(bracketStart);

                if (!isEmpty) {
                    const sizeSpan = document.createElement('span');
                    sizeSpan.className = 'tree-size';
                    sizeSpan.textContent = `${size} items`;
                    contentWrap.appendChild(sizeSpan);

                    const toggleFold = (e) => {
                        li.classList.toggle('collapsed');
                        caret.classList.toggle('expanded');
                        if(e) e.stopPropagation();
                    };

                    caret.addEventListener('click', toggleFold);
                    bracketStart.addEventListener('click', toggleFold);
                }

                nodeWrap.appendChild(caret);
                nodeWrap.appendChild(contentWrap);
                li.appendChild(nodeWrap);

                if (!isEmpty) {
                    const ul = document.createElement('ul');
                    for (let i = 0; i < size; i++) {
                        const childKey = keys[i];
                        const childNode = this.buildTreeNode(data[childKey], childKey);
                        
                        if (i < size - 1) {
                            const comma = document.createElement('span');
                            comma.textContent = ',';
                            comma.style.color = 'var(--vg-text)';
                            childNode.querySelector('.tree-content').appendChild(comma);
                        }
                        ul.appendChild(childNode);
                    }
                    li.appendChild(ul);
                }
                
                const closeWrap = document.createElement('div');
                closeWrap.className = 'tree-bracket end';
                closeWrap.style.marginLeft = '1rem';
                closeWrap.textContent = closeBr;
                li.appendChild(closeWrap);

            } else {
                // Primitive Values
                const type = data === null ? 'null' : typeof data;
                let valStr = String(data);
                let cls = `json-${type}`;
                
                if (type === 'string') {
                    valStr = `"${valStr}"`; // No HTML escaping needed here, textContent shields it
                }
                
                const nodeWrap = document.createElement('div');
                nodeWrap.className = 'tree-node';
                
                const cCaret = document.createElement('div');
                cCaret.className = 'tree-caret empty';
                nodeWrap.appendChild(cCaret);

                const contentWrap = document.createElement('div');
                contentWrap.className = 'tree-content';
                contentWrap.appendChild(keyFrag);

                const valSpan = document.createElement('span');
                valSpan.className = `tree-value ${cls}`;
                valSpan.textContent = valStr; // VGT SECURE INJECTION
                
                contentWrap.appendChild(valSpan);
                nodeWrap.appendChild(contentWrap);
                li.appendChild(nodeWrap);
            }
            
            return li;
        },

        copyToClipboard() {
            const text = this.DOM.input.value;
            if(!text) return;
            
            navigator.clipboard.writeText(text).then(() => {
                this.safeClearOutput(this.DOM.btnCopy);
                
                const checkSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:rgba(var(--c-green),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                const parser = new DOMParser();
                const doc = parser.parseFromString(checkSvg, 'image/svg+xml');
                this.DOM.btnCopy.appendChild(doc.documentElement);

                setTimeout(() => {
                    this.safeClearOutput(this.DOM.btnCopy);
                    this.State.originalCopyNodes.forEach(node => {
                        this.DOM.btnCopy.appendChild(node.cloneNode(true));
                    });
                }, 1500);
            }).catch(() => {
                alert("VGT OS: Clipboard Permission denied.");
            });
        }
    };

    JsonArchitectEngine.init();
});