/**
 * STATUS: PLATIN
 * VGT Mediacenter Global Shell
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const config = window.vgtCore || {};
    const tools = Array.isArray(config.tools) ? config.tools : [];
    const currentTool = typeof config.currentTool === "string" ? config.currentTool : "dashboard";
    const baseUrl = typeof config.baseUrl === "string" ? config.baseUrl : "";
    const recentKey = "vgt_recent_tools_v1";

    const layer = document.getElementById("vgt-command-layer");
    const openButton = document.getElementById("vgt-command-open");
    const recentStrip = document.getElementById("vgt-recent-strip");
    const shellSearch = document.getElementById("vg-search");
    const themeButton = document.getElementById("btn-theme-desktop");
    const themeIcon = document.getElementById("icon-theme-desktop");
    const dashboardRoot = document.getElementById("vgt-dashboard-root");
    const shell = document.querySelector(".vgt-system-shell");
    const mobileToggle = document.getElementById("vgt-shell-mobile-toggle");
    const shellPanel = document.getElementById("vgt-shell-panel");
    const modeButton = document.getElementById("vgt-mc-mode-toggle");

    if (!layer || !openButton || tools.length === 0) {
        return;
    }

    const byId = new Map(tools.map((tool) => [tool.id, tool]));

    const activeToolObj = tools.find((tool) => tool.id === currentTool);
    const activeCat = (activeToolObj && activeToolObj.cat) ? activeToolObj.cat : 'core';
    document.documentElement.setAttribute('data-tool-cat', activeCat);
    document.body.setAttribute('data-tool-cat', activeCat);
    const icons = {
        sun: {
            circle: [["cx", "12"], ["cy", "12"], ["r", "5"]],
            lines: [["12", "1", "12", "3"], ["12", "21", "12", "23"], ["4.22", "4.22", "5.64", "5.64"], ["18.36", "18.36", "19.78", "19.78"], ["1", "12", "3", "12"], ["21", "12", "23", "12"], ["4.22", "19.78", "5.64", "18.36"], ["18.36", "5.64", "19.78", "4.22"]]
        },
        moon: {
            path: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        }
    };

    const createSvg = (name) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("class", "svg-icon");
        svg.setAttribute("aria-hidden", "true");

        if (name === "moon") {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", icons.moon.path);
            svg.appendChild(path);
            return svg;
        }

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        icons.sun.circle.forEach(([key, value]) => circle.setAttribute(key, value));
        svg.appendChild(circle);

        icons.sun.lines.forEach(([x1, y1, x2, y2]) => {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            svg.appendChild(line);
        });

        return svg;
    };

    const buildUrl = (tool) => {
        if (!tool || typeof tool.url !== "string") {
            return `${baseUrl}?vgt_tool=dashboard`;
        }

        if (tool.url.startsWith("http") || tool.url.startsWith("/")) {
            return tool.url;
        }

        return `${baseUrl}${tool.url}`;
    };

    const clear = (node) => {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    const updateThemeIcon = () => {
        if (!themeIcon) {
            return;
        }

        clear(themeIcon);
        themeIcon.appendChild(createSvg(document.documentElement.classList.contains("light-mode") ? "moon" : "sun"));
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle("light-mode");
        updateThemeIcon();
    };

    const setShellOpen = (isOpen) => {
        if (!shell || !mobileToggle || !shellPanel) {
            return;
        }

        shell.classList.toggle("is-shell-open", isOpen);
        mobileToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    };

    const readRecent = () => {
        try {
            const parsed = JSON.parse(localStorage.getItem(recentKey) || "[]");
            return Array.isArray(parsed) ? parsed.filter((id) => byId.has(id)).slice(0, 6) : [];
        } catch (_error) {
            return [];
        }
    };

    const writeRecent = (ids) => {
        try {
            localStorage.setItem(recentKey, JSON.stringify(ids.slice(0, 6)));
        } catch (_error) {
            return;
        }
    };

    const rememberCurrentTool = () => {
        if (!byId.has(currentTool) || currentTool === "dashboard") {
            return;
        }

        const next = [currentTool, ...readRecent().filter((id) => id !== currentTool)];
        writeRecent(next);
    };

    const makeToolLink = (tool, className, tagName = "a") => {
        const link = document.createElement(tagName);
        link.className = className;
        if (tagName === "a") {
            link.href = buildUrl(tool);
        }

        const marker = document.createElement("span");
        marker.className = `vgt-tool-marker cat-${tool.cat || "tool"}`;
        marker.setAttribute("aria-hidden", "true");

        const copy = document.createElement("span");
        copy.className = "vgt-tool-copy";

        const title = document.createElement("strong");
        title.textContent = tool.title || tool.id;

        const desc = document.createElement("small");
        desc.textContent = tool.desc || "Lokales Browser-Tool";

        copy.append(title, desc);
        link.append(marker, copy);
        return link;
    };

    const renderRecent = () => {
        if (!recentStrip) {
            return;
        }

        const ids = readRecent();
        clear(recentStrip);

        if (ids.length === 0) {
            recentStrip.classList.add("is-empty");
            return;
        }

        recentStrip.classList.remove("is-empty");

        const label = document.createElement("span");
        label.className = "vgt-recent-label";
        label.textContent = "Zuletzt";
        recentStrip.appendChild(label);

        ids.forEach((id) => {
            const tool = byId.get(id);
            if (tool) {
                recentStrip.appendChild(makeToolLink(tool, "vgt-recent-chip"));
            }
        });
    };

    let input = null;
    let list = null;
    let isOpen = false;

    const navigateTo = (tool) => {
        if (!tool) {
            return;
        }

        window.location.href = buildUrl(tool);
    };

    const renderResults = (query = "") => {
        if (!list) {
            return;
        }

        const q = query.trim().toLowerCase();
        const filtered = tools
            .filter((tool) => {
                const haystack = `${tool.title || ""} ${tool.desc || ""} ${tool.cat || ""}`.toLowerCase();
                return !q || haystack.includes(q);
            })
            .slice(0, 12);

        clear(list);

        if (filtered.length === 0) {
            const empty = document.createElement("p");
            empty.className = "vgt-command-empty";
            empty.textContent = "Kein lokales Tool gefunden.";
            list.appendChild(empty);
            return;
        }

        filtered.forEach((tool, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "vgt-command-item";
            button.dataset.toolId = tool.id;

            const key = document.createElement("kbd");
            key.textContent = String(index + 1);

            const linkVisual = makeToolLink(tool, "vgt-command-tool", "span");

            button.append(linkVisual, key);
            button.addEventListener("click", () => navigateTo(tool));
            list.appendChild(button);
        });
    };

    function closePalette() {
        isOpen = false;
        layer.classList.remove("active");
        layer.setAttribute("aria-hidden", "true");
        openButton.focus();
    }

    const buildPalette = () => {
        clear(layer);

        const backdrop = document.createElement("button");
        backdrop.type = "button";
        backdrop.className = "vgt-command-backdrop";
        backdrop.setAttribute("aria-label", "Command Palette schliessen");

        const modal = document.createElement("section");
        modal.className = "vgt-command-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "vgt-command-title");

        const header = document.createElement("header");
        header.className = "vgt-command-header";

        const title = document.createElement("h2");
        title.id = "vgt-command-title";
        title.textContent = "Tool Matrix";

        const hint = document.createElement("span");
        hint.textContent = "Esc";

        header.append(title, hint);

        input = document.createElement("input");
        input.className = "vgt-command-search";
        input.type = "search";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.placeholder = "Tool, Kategorie oder Aufgabe suchen";

        list = document.createElement("div");
        list.className = "vgt-command-list";

        input.addEventListener("input", () => renderResults(input ? input.value : ""));
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                const firstButton = list ? list.querySelector(".vgt-command-item") : null;
                const toolId = firstButton instanceof HTMLElement ? firstButton.dataset.toolId : "";
                navigateTo(toolId ? byId.get(toolId) : null);
            }
        });

        backdrop.addEventListener("click", closePalette);
        modal.append(header, input, list);
        layer.append(backdrop, modal);
        renderResults();
    };

    function openPalette() {
        if (!input || !list) {
            buildPalette();
        }

        isOpen = true;
        layer.classList.add("active");
        layer.setAttribute("aria-hidden", "false");

        requestAnimationFrame(() => {
            if (input) {
                if (shellSearch && !dashboardRoot) {
                    input.value = shellSearch.value;
                    renderResults(input.value);
                }
                input.focus();
                input.select();
            }
        });
    }

    openButton.addEventListener("click", openPalette);
    if (mobileToggle && shellPanel) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = mobileToggle.getAttribute("aria-expanded") === "true";
            setShellOpen(!isOpen);
        });
    }
    if (themeButton && !dashboardRoot) {
        themeButton.addEventListener("click", toggleTheme);
        updateThemeIcon();
    }
    if (modeButton && !dashboardRoot) {
        modeButton.addEventListener("click", () => {
            try {
                localStorage.setItem("vgt_mc_view_mode", "desktop");
            } catch (_error) {
                return;
            }

            const dashboardUrl = modeButton.dataset.dashboardUrl || "?vgt_tool=dashboard";
            window.location.href = dashboardUrl.startsWith("?") ? `${baseUrl}${dashboardUrl}` : dashboardUrl;
        });
    }
    if (shellSearch && !dashboardRoot) {
        shellSearch.addEventListener("focus", openPalette);
        shellSearch.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                openPalette();
            }
        });
    }
    document.addEventListener("keydown", (event) => {
        const isCommand = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
        if (isCommand) {
            event.preventDefault();
            openPalette();
            return;
        }

        if (event.key === "Escape" && isOpen) {
            closePalette();
        }
    });

    rememberCurrentTool();
    renderRecent();
});
