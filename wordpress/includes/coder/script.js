/**
 * VGT MEDIACENTER - CODE OMEGA 2100 LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Object Isolation & Native Rendering
 * Zero-Dependency Regex Syntax Highlighter & Native jsdiff Integration.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if(!document.getElementById('vgt-coder')) return;

    const CodeOmegaEngine = {
        DOM: {},
        State: {
            isExtractorOpen: false,
            // Pre-compile Regex for performance and ReDoS prevention
            kwRegex: new RegExp(`\\b(?:function|const|let|var|if|else|return|class|new|import|export|from|this|switch|case|break|default|await|async|try|catch)\\b`, 'g'),
            numRegex: /\b\d+(?:\.\d+)?\b/g,
            fnRegex: /\b[a-zA-Z_$][a-zA-Z0-9_$]*\s*(?=\()/g,
            strRegex: /(['"`])(?:\\.|[^\\])*?\1/g,
            comRegex: /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                // Main Controls
                btnFlush: document.getElementById('btn-flush'),
                btnExtractor: document.getElementById('btn-toggle-extractor'),
                btnExecute: document.getElementById('btn-execute-diff'),
                editorMatrix: document.getElementById('cd-editor-matrix'),
                
                // Editors
                inAlpha: document.getElementById('cd-input-alpha'),
                hlAlpha: document.getElementById('cd-highlight-alpha'),
                inBeta: document.getElementById('cd-input-beta'),
                hlBeta: document.getElementById('cd-highlight-beta'),
                
                // Diff View
                diffView: document.getElementById('cd-diff-view'),
                diffContent: document.getElementById('cd-diff-content'),
                btnCloseDiff: document.getElementById('btn-close-diff'),
                
                // Extractor
                extPanel: document.getElementById('cd-extractor-panel'),
                extContent: document.getElementById('cd-extractor-content'),
                changeCount: document.getElementById('cd-change-count'),
                btnCollapseExtractor: document.getElementById('btn-collapse-extractor')
            };
        },

        waitForDependencies() {
            const ensureLib = setInterval(() => {
                if (typeof Diff !== 'undefined') {
                    clearInterval(ensureLib);
                    this.bindEvents();
                    this.initDemoData();
                    console.log('VGT CODE OMEGA 2100: Differential Matrix Active & Secured.');
                }
            }, 100);
        },

        bindEvents() {
            this.bindEditor(this.DOM.inAlpha, this.DOM.hlAlpha);
            this.bindEditor(this.DOM.inBeta, this.DOM.hlBeta);

            this.DOM.btnExecute.addEventListener('click', () => this.executeDiff());
            
            this.DOM.btnCloseDiff.addEventListener('click', () => {
                this.DOM.diffView.classList.add('hidden');
                this.DOM.editorMatrix.classList.remove('hidden');
            });

            this.DOM.btnExtractor.addEventListener('click', () => this.toggleExtractor());
            if (this.DOM.btnCollapseExtractor) {
                this.DOM.btnCollapseExtractor.addEventListener('click', () => this.toggleExtractor());
            }

            this.DOM.btnFlush.addEventListener('click', () => this.flushData());
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        escapeHtml(unsafe) {
            return unsafe ? unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;") : "";
        },

        // --- HIGHLIGHTER ENGINE ---
        highlightCode(text) {
            if (!text) return '';
            
            // Basic HTML Escape (Base Security)
            let html = this.escapeHtml(text);

            // 1. Strings (Single, Double, Backticks)
            html = html.replace(this.State.strRegex, '<span class="syn-str">$&</span>');
            
            // 2. Comments
            html = html.replace(this.State.comRegex, '<span class="syn-com">$&</span>');
            
            const isInsideSpan = (str, offset) => {
                const before = str.substring(0, offset);
                const openTags = (before.match(/<span/g) || []).length;
                const closeTags = (before.match(/<\/span>/g) || []).length;
                return openTags > closeTags;
            };

            // 3. Keywords
            html = html.replace(this.State.kwRegex, (match, offset, string) => {
                if (isInsideSpan(string, offset)) return match;
                return `<span class="syn-kw">${match}</span>`;
            });

            // 4. Numbers
            html = html.replace(this.State.numRegex, (match, offset, string) => {
                if (isInsideSpan(string, offset)) return match;
                return `<span class="syn-num">${match}</span>`;
            });

            // 5. Functions
            html = html.replace(this.State.fnRegex, (match, offset, string) => {
                if (isInsideSpan(string, offset)) return match;
                const word = match.trim();
                if (['if', 'switch', 'while', 'for', 'catch'].includes(word)) return match;
                return `<span class="syn-fn">${match}</span>`;
            });

            return html;
        },

        syncHighlight(inputEl, highlightEl) {
            let val = inputEl.value;
            // Scroll-Fix: Eine leere Zeile am Ende zwingt das <pre> Tag dazu, synchron zu bleiben
            if (val.endsWith('\n')) val += ' '; 
            
            // VGT DOM HARDENING: DOMParser for secure injection of the highlighted code
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<div>${this.highlightCode(val)}</div>`, 'text/html');
            
            this.safeClearOutput(highlightEl);
            
            // Move safe nodes over
            Array.from(doc.body.firstChild.childNodes).forEach(node => {
                highlightEl.appendChild(node);
            });
        },

        bindEditor(inputEl, highlightEl) {
            inputEl.addEventListener('input', () => this.syncHighlight(inputEl, highlightEl));
            
            inputEl.addEventListener('scroll', () => {
                if (highlightEl.parentElement) {
                    highlightEl.parentElement.scrollTop = inputEl.scrollTop;
                    highlightEl.parentElement.scrollLeft = inputEl.scrollLeft;
                }
            });
            
            inputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = inputEl.selectionStart;
                    const end = inputEl.selectionEnd;
                    inputEl.value = inputEl.value.substring(0, start) + "    " + inputEl.value.substring(end);
                    inputEl.selectionStart = inputEl.selectionEnd = start + 4;
                    this.syncHighlight(inputEl, highlightEl);
                }
            });
        },

        // --- DIFF ENGINE (DIAMANT SUPREME RENDERING) ---
        executeDiff() {
            const left = this.DOM.inAlpha.value;
            const right = this.DOM.inBeta.value;

            if (!left && !right) return;

            const diffs = Diff.diffLines(left, right);
            
            this.renderVisualDiff(diffs);
            this.renderExtraction(diffs);
            
            this.DOM.editorMatrix.classList.add('hidden');
            this.DOM.diffView.classList.remove('hidden');
        },

        renderVisualDiff(diffs) {
            const frag = document.createDocumentFragment();

            diffs.forEach(part => {
                let rowClass = 'd-eq';
                let marker = '\u00A0'; // &nbsp;
                if (part.added) { rowClass = 'd-add'; marker = '+'; }
                if (part.removed) { rowClass = 'd-rem'; marker = '-'; }

                const lines = part.value.split('\n');
                if (lines.length > 0 && lines[lines.length - 1] === '') lines.pop(); 

                lines.forEach(line => {
                    // VGT HARDENING: Native Elements instead of innerHTML (XSS Impossible)
                    const row = document.createElement('div');
                    row.className = `diff-line-row ${rowClass}`;
                    
                    const spanMarker = document.createElement('span');
                    spanMarker.className = 'd-marker';
                    spanMarker.textContent = marker;
                    
                    const spanText = document.createElement('span');
                    spanText.className = 'd-text';
                    spanText.textContent = line; // Completely XSS Safe!

                    row.appendChild(spanMarker);
                    row.appendChild(spanText);
                    frag.appendChild(row);
                });
            });

            this.safeClearOutput(this.DOM.diffContent);
            this.DOM.diffContent.appendChild(frag);
        },

        renderExtraction(diffs) {
            this.safeClearOutput(this.DOM.extContent);
            let changeGroups = [];
            
            for (let i = 0; i < diffs.length; i++) {
                const part = diffs[i];
                if (part.added || part.removed) {
                    if (part.removed && diffs[i+1] && diffs[i+1].added) {
                        changeGroups.push({ type: 'MOD', before: part.value, after: diffs[i+1].value });
                        i++; 
                    } else if (part.added) {
                        changeGroups.push({ type: 'INS', before: null, after: part.value });
                    } else if (part.removed) {
                        changeGroups.push({ type: 'DEL', before: part.value, after: null });
                    }
                }
            }

            this.DOM.changeCount.textContent = `${changeGroups.length} DELTAS`;
            this.DOM.changeCount.classList.remove('hidden');

            if (changeGroups.length === 0) {
                const msg = document.createElement('div');
                msg.className = 'sync-msg';
                msg.textContent = 'SYSTEM SYNCHRONIZED. NO DEVIATIONS DETECTED.';
                this.DOM.extContent.appendChild(msg);
                return;
            }

            const frag = document.createDocumentFragment();

            changeGroups.forEach((group, index) => {
                // Native DOM Assembly für den Delta-Extractor (XSS-Safe)
                const card = document.createElement('div');
                card.className = 'delta-card';
                
                const hashBytes = new Uint8Array(4);
                crypto.getRandomValues(hashBytes);
                const hash = Array.from(hashBytes, b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
                
                const header = document.createElement('div');
                header.className = 'dc-header';
                
                const typeSpan = document.createElement('span');
                const hashSpan = document.createElement('span');
                hashSpan.className = 'dc-hash';
                hashSpan.textContent = `HASH: ${hash}`;

                const body = document.createElement('div');

                if (group.type === 'MOD') {
                    typeSpan.className = 'dc-type-mod';
                    typeSpan.textContent = `■ MODIFICATION_SEQUENCE_0${index+1}`;
                    
                    body.className = 'dc-body split';
                    
                    const colLeft = this.createDeltaCol('Previous_State', 'bg-red-dim', group.before, 'rem');
                    const colRight = this.createDeltaCol('Current_State', 'bg-green-dim', group.after, 'add');
                    
                    body.appendChild(colLeft);
                    body.appendChild(colRight);
                } else if (group.type === 'INS') {
                    typeSpan.className = 'dc-type-ins';
                    typeSpan.textContent = `■ INSERTION_SEQUENCE_0${index+1}`;
                    
                    body.className = 'dc-body';
                    body.appendChild(this.createDeltaCol('New_Data_Block', 'bg-green-dim', group.after, 'add'));
                } else {
                    typeSpan.className = 'dc-type-del';
                    typeSpan.textContent = `■ DELETION_SEQUENCE_0${index+1}`;
                    
                    body.className = 'dc-body';
                    body.appendChild(this.createDeltaCol('Removed_Data_Block', 'bg-red-dim', group.before, 'rem'));
                }

                header.appendChild(typeSpan);
                header.appendChild(hashSpan);
                
                card.appendChild(header);
                card.appendChild(body);
                frag.appendChild(card);
            });

            this.DOM.extContent.appendChild(frag);
        },

        createDeltaCol(labelTxt, labelClass, codeContent, codeClass) {
            const col = document.createElement('div');
            col.className = 'dc-col';
            
            const label = document.createElement('div');
            label.className = `dc-col-label ${labelClass}`;
            label.textContent = labelTxt;
            
            const pre = document.createElement('pre');
            pre.className = `dc-code ${codeClass}`;
            pre.textContent = codeContent; // VGT DOM HARDENING: Strict textContent assign!

            col.appendChild(label);
            col.appendChild(pre);
            return col;
        },

        // --- SYSTEM ACTIONS ---
        toggleExtractor() {
            this.State.isExtractorOpen = !this.State.isExtractorOpen;
            if (this.State.isExtractorOpen) {
                this.DOM.extPanel.classList.remove('collapsed');
                this.DOM.btnExtractor.classList.add('active');
            } else {
                this.DOM.extPanel.classList.add('collapsed');
                this.DOM.btnExtractor.classList.remove('active');
            }
        },

        flushData() {
            const body = document.querySelector('.tool-body');
            if (body) {
                body.classList.add('flash-effect');
                setTimeout(() => body.classList.remove('flash-effect'), 500);
            }

            this.DOM.inAlpha.value = '';
            this.DOM.inBeta.value = '';
            this.syncHighlight(this.DOM.inAlpha, this.DOM.hlAlpha);
            this.syncHighlight(this.DOM.inBeta, this.DOM.hlBeta);
            
            this.DOM.btnCloseDiff.click();
            if (this.State.isExtractorOpen) this.toggleExtractor();
            
            this.safeClearOutput(this.DOM.extContent);
            
            const emptyState = document.createElement('div');
            emptyState.className = 'ex-empty-state';
            
            // Safe SVG Injection
            const svgString = `<svg viewBox="0 0 24 24" class="svg-icon spinner"><circle cx="12" cy="12" r="10" stroke-dasharray="30" stroke-linecap="round"></circle></svg>`;
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'image/svg+xml');
            
            const span = document.createElement('span');
            span.textContent = '// WAITING FOR DATA INPUT STREAMS...';
            
            emptyState.appendChild(doc.documentElement);
            emptyState.appendChild(span);

            this.DOM.extContent.appendChild(emptyState);
            
            this.DOM.changeCount.classList.add('hidden');
        },

        initDemoData() {
            const demoLeft = `function initiateHyperDrive(core) {\n  if (core.temp > 4000) {\n    return "CRITICAL FAILURE";\n  }\n  return core.activate();\n}`;
            const demoRight = `function initiateHyperDrive(core) {\n  // Patch 2100: Quantum Cooling\n  if (core.temp > 9000) {\n    system.vent("nitrogen");\n  }\n  return core.activate({ mode: "silent" });\n}`;
            
            this.DOM.inAlpha.value = demoLeft;
            this.DOM.inBeta.value = demoRight;
            this.syncHighlight(this.DOM.inAlpha, this.DOM.hlAlpha);
            this.syncHighlight(this.DOM.inBeta, this.DOM.hlBeta);
        }
    };

    CodeOmegaEngine.init();
});
