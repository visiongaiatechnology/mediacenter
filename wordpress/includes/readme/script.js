/**
 * VGT MEDIACENTER - README ARCHITECT LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Native Node Rendering & Object Delegation
 * State-to-Markdown & State-to-HTML Dual Rendering Engine.
 * O(1) Real-time parsing without external Markdown libraries.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-readme')) return;

    const ReadmeArchitectEngine = {
        DOM: {},
        State: {
            blocks: [],
            debounceTimer: null,
            draggedBlockIndex: null,
            
            SHIELD_COLORS: ['blue', 'brightgreen', 'green', 'yellowgreen', 'yellow', 'orange', 'red', 'lightgrey', 'blueviolet', '000000', '00f3ff'],
            
            // Safe SVG Caches
            svgDragHandle: '<svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>',
            svgTrash: '<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
            svgCopy: '<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:rgba(var(--c-cyan),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>',
            originalCopyNodes: []
        },

        init() {
            this.cacheDOM();
            this.initDefaultState();
            this.bindEvents();
            this.renderEditor();
            this.triggerCompile();
            console.log('VGT README ARCHITECT: State-to-Markdown Engine Active.');
        },

        cacheDOM() {
            this.DOM = {
                canvas: document.getElementById('rm-editor-canvas'),
                rawOutput: document.getElementById('rm-md-output'),
                htmlOutput: document.getElementById('rm-html-output'),
                
                tabBtns: document.querySelectorAll('.rm-tab-btn'),
                views: document.querySelectorAll('.rm-view-content'),
                
                btnCopy: document.getElementById('btn-rm-copy'),
                btnDownload: document.getElementById('btn-rm-download'),
                addBtns: document.querySelectorAll('[data-add]')
            };

            if (this.DOM.btnCopy) {
                this.State.originalCopyNodes = Array.from(this.DOM.btnCopy.childNodes).map(n => n.cloneNode(true));
            }
        },

        initDefaultState() {
            this.State.blocks = [
                { id: this.generateId(), type: 'header', content: { level: 1, text: 'VGT CYBER PROJECT' } },
                { id: this.generateId(), type: 'shield_group', content: { shields: [
                    { id: this.generateId(), label: 'System', message: 'Online', color: 'brightgreen', logo: 'linux' },
                    { id: this.generateId(), label: 'VGT', message: 'Secured', color: '00f3ff', logo: '' }
                ]}},
                { id: this.generateId(), type: 'text', content: { text: 'Dies ist eine VGT-ReadMe, die in Echtzeit gerendert wird. 100% Native Node Architecture. Keine externen Parser.' } },
                { id: this.generateId(), type: 'code', content: { language: 'bash', code: 'npm install vgt-core\nvgt start --mode=cyberpunk' } }
            ];
        },

        // --- SAFE DOM UTILS ---
        generateId() {
            const bytes = new Uint8Array(8);
            crypto.getRandomValues(bytes);
            return 'rm_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
        },

        safeClearOutput(element) {
            if (!element) return;
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString, appendText = '') {
            if (!element) return;
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) element.appendChild(svgNode);
            if (appendText) {
                element.appendChild(document.createTextNode(' ' + appendText));
            }
        },

        createEl(tag, className = '', attributes = {}) {
            const el = document.createElement(tag);
            if (className) el.className = className;
            for (const [key, val] of Object.entries(attributes)) {
                el.setAttribute(key, val);
            }
            return el;
        },

        // --- SHIELD ENGINE (ZERO-TRUST LOCAL RENDER) ---
        getBadgeColor(c) {
            const map = {
                blue: '#007ec6', brightgreen: '#4c1', green: '#97ca00', yellowgreen: '#a4a61d',
                yellow: '#dfb317', orange: '#fe7d37', red: '#e05d44', lightgrey: '#9f9f9f',
                blueviolet: '#8a2be2', '000000': '#000000', '00f3ff': '#00f3ff'
            };
            return map[c] || '#007ec6';
        },

        formatShieldUrlText(text) {
            return encodeURIComponent((text || '').replace(/-/g, '--').replace(/_/g, '__').replace(/ /g, '_'));
        },

        createLocalBadgeUrl(label, message, color) {
            // Escape strings for SVG injection to prevent XML breakage
            const escapeXml = (unsafe) => (unsafe || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            const safeLabel = escapeXml(label || '').toUpperCase();
            const safeMsg = escapeXml(message || '').toUpperCase();
            const hexColor = this.getBadgeColor(color);
            
            const charWidth = 7.5; 
            const padding = 20;
            const leftWidth = Math.max(20, Math.round(safeLabel.length * charWidth + padding));
            const rightWidth = Math.max(20, Math.round(safeMsg.length * charWidth + padding));
            const totalWidth = leftWidth + rightWidth;

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img">
                <g shape-rendering="crispEdges">
                    <rect width="${leftWidth}" height="28" fill="#555"/>
                    <rect x="${leftWidth}" width="${rightWidth}" height="28" fill="${hexColor}"/>
                </g>
                <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="10" font-weight="bold">
                    <text x="${leftWidth / 2}" y="18">${safeLabel}</text>
                    <text x="${leftWidth + rightWidth / 2}" y="18">${safeMsg}</text>
                </g>
            </svg>`;

            return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
        },

        // --- EDITOR RENDER ENGINE (NATIVE DOM BUILDER) ---
        renderEditor() {
            this.safeClearOutput(this.DOM.canvas);
            
            if (this.State.blocks.length === 0) {
                const empty = this.createEl('div', '', { style: 'padding: 3rem; text-align: center; color: var(--vg-text-muted); font-family: var(--font-mono);' });
                empty.textContent = 'Keine Architektur-Blöcke vorhanden. Wähle ein Element aus der Toolbar.';
                this.DOM.canvas.appendChild(empty);
                return;
            }

            const frag = document.createDocumentFragment();

            this.State.blocks.forEach((block, index) => {
                const el = this.createEl('div', 'rm-block');
                el.draggable = true; 
                
                // Drag & Drop Bindings
                this.attachDragEvents(el, index);

                // Build Header
                const header = this.createEl('div', 'rm-block-header');
                const headerLeft = this.createEl('div', '', { style: 'display:flex; align-items:center; gap:0.75rem;' });
                
                const dragHandle = this.createEl('div', 'drag-handle', { title: 'Block verschieben' });
                this.injectSVG(dragHandle, this.State.svgDragHandle);
                
                const blockTypeSpan = this.createEl('span', 'rm-block-type');
                const blockIdSpan = this.createEl('span', 'rm-block-id');
                blockIdSpan.textContent = `ID: ${block.id}`;

                headerLeft.appendChild(dragHandle);
                headerLeft.appendChild(blockTypeSpan);
                headerLeft.appendChild(blockIdSpan);

                const btnDel = this.createEl('button', 'btn-action-small danger outline', { 'data-act': 'del', 'data-id': block.id, title: 'Block löschen' });
                this.injectSVG(btnDel, this.State.svgTrash, 'Löschen');

                header.appendChild(headerLeft);
                header.appendChild(btnDel);

                // Build Content
                const contentWrapper = this.createEl('div', 'rm-block-content');

                if (block.type === 'header') {
                    blockTypeSpan.textContent = 'Überschrift';
                    
                    const row = this.createEl('div', '', { style: 'display:flex; gap:0.5rem;' });
                    
                    const select = this.createEl('select', 'vgt-select', { 'data-id': block.id, 'data-key': 'level' });
                    [1,2,3,4,5,6].forEach(i => {
                        const opt = this.createEl('option', '', { value: i });
                        opt.textContent = `H${i}`;
                        if (block.content.level == i) opt.selected = true;
                        select.appendChild(opt);
                    });

                    const input = this.createEl('input', 'vgt-input', { type: 'text', style: 'flex:1;', 'data-id': block.id, 'data-key': 'text', placeholder: 'Überschrift Text...' });
                    input.value = block.content.text || ''; // XSS Safe Value Assignment

                    row.appendChild(select);
                    row.appendChild(input);
                    contentWrapper.appendChild(row);
                } 
                else if (block.type === 'text') {
                    blockTypeSpan.textContent = 'Markdown Text';
                    const textarea = this.createEl('textarea', 'vgt-input', { style: 'width:100%; min-height:100px; resize:vertical;', 'data-id': block.id, 'data-key': 'text', placeholder: 'Guten Tag...' });
                    textarea.value = block.content.text || '';
                    contentWrapper.appendChild(textarea);
                }
                else if (block.type === 'code') {
                    blockTypeSpan.textContent = 'Code Block';
                    const input = this.createEl('input', 'vgt-input', { type: 'text', style: 'width:200px; margin-bottom:0.5rem;', 'data-id': block.id, 'data-key': 'language', placeholder: 'Sprache (z.B. javascript)' });
                    input.value = block.content.language || '';
                    
                    const textarea = this.createEl('textarea', 'vgt-input', { style: 'width:100%; min-height:120px; resize:vertical; font-family:var(--font-mono); color:rgba(var(--c-cyan),1);', 'data-id': block.id, 'data-key': 'code', placeholder: "console.log('VGT');" });
                    textarea.value = block.content.code || '';
                    
                    contentWrapper.appendChild(input);
                    contentWrapper.appendChild(document.createElement('br'));
                    contentWrapper.appendChild(textarea);
                }
                else if (block.type === 'shield_group') {
                    blockTypeSpan.textContent = 'Shields / Badges';
                    const listWrap = this.createEl('div', '', { style: 'display:flex; flex-direction:column;' });
                    
                    block.content.shields.forEach(s => {
                        const row = this.createEl('div', '', { style: 'display:flex; gap:0.5rem; margin-bottom:0.5rem; align-items:center;' });
                        
                        const iLbl = this.createEl('input', 'vgt-input', { type: 'text', style: 'width:100px;', 'data-id': block.id, 'data-sid': s.id, 'data-skey': 'label', placeholder: 'Label' });
                        iLbl.value = s.label;
                        
                        const iMsg = this.createEl('input', 'vgt-input', { type: 'text', style: 'width:120px;', 'data-id': block.id, 'data-sid': s.id, 'data-skey': 'message', placeholder: 'Message' });
                        iMsg.value = s.message;

                        const sColor = this.createEl('select', 'vgt-select', { 'data-id': block.id, 'data-sid': s.id, 'data-skey': 'color' });
                        this.State.SHIELD_COLORS.forEach(c => {
                            const opt = this.createEl('option', '', { value: c });
                            opt.textContent = c;
                            if (s.color === c) opt.selected = true;
                            sColor.appendChild(opt);
                        });

                        const iLogo = this.createEl('input', 'vgt-input', { type: 'text', style: 'width:80px;', 'data-id': block.id, 'data-sid': s.id, 'data-skey': 'logo', placeholder: 'Logo (z.B. react)' });
                        iLogo.value = s.logo || '';

                        const btnDelShield = this.createEl('button', 'btn-action-small danger outline', { 'data-act': 'del-shield', 'data-id': block.id, 'data-sid': s.id });
                        btnDelShield.textContent = 'X';

                        row.appendChild(iLbl);
                        row.appendChild(iMsg);
                        row.appendChild(sColor);
                        row.appendChild(iLogo);
                        row.appendChild(btnDelShield);
                        listWrap.appendChild(row);
                    });

                    const btnAddShield = this.createEl('button', 'btn-action-small', { 'data-act': 'add-shield', 'data-id': block.id, style: 'width:max-content; margin-top:0.5rem;' });
                    btnAddShield.textContent = '+ Shield hinzufügen';
                    
                    listWrap.appendChild(btnAddShield);
                    contentWrapper.appendChild(listWrap);
                }
                else if (block.type === 'table') {
                    blockTypeSpan.textContent = 'Tabelle';
                    const wrap = this.createEl('div', '', { style: 'display:flex; gap:0.5rem; margin-bottom:0.5rem;' });
                    
                    const btnAddRow = this.createEl('button', 'btn-action-small', { 'data-act': 'add-row', 'data-id': block.id });
                    btnAddRow.textContent = '+ Zeile';
                    const btnAddCol = this.createEl('button', 'btn-action-small', { 'data-act': 'add-col', 'data-id': block.id });
                    btnAddCol.textContent = '+ Spalte';
                    
                    wrap.appendChild(btnAddRow);
                    wrap.appendChild(btnAddCol);
                    contentWrapper.appendChild(wrap);

                    if (block.content.rows && block.content.rows.length > 0) {
                        const tableWrap = this.createEl('div', '', { style: 'overflow-x:auto;' });
                        const table = this.createEl('table', '', { style: 'border-collapse:collapse; width:100%;' });

                        block.content.rows.forEach((row, rIdx) => {
                            const tr = document.createElement('tr');
                            const isHeader = (rIdx === 0);
                            
                            row.forEach((cell, cIdx) => {
                                const td = this.createEl('td', '', { style: 'border:1px solid var(--vg-border); padding:0.25rem;' });
                                const styleStr = `width:100%; border:none; background:transparent; ${isHeader ? 'font-weight:bold;color:rgba(var(--c-cyan),1);' : ''}`;
                                const input = this.createEl('input', 'vgt-input', { type: 'text', style: styleStr, 'data-id': block.id, 'data-r': rIdx, 'data-c': cIdx, placeholder: 'Cell' });
                                input.value = cell || '';
                                td.appendChild(input);
                                tr.appendChild(td);
                            });

                            if (block.content.rows.length > 1) {
                                const tdAction = this.createEl('td', '', { style: 'width:40px; text-align:center;' });
                                const btnDelRow = this.createEl('button', 'btn-action-small danger outline', { 'data-act': 'del-row', 'data-id': block.id, 'data-r': rIdx });
                                btnDelRow.textContent = 'X';
                                tdAction.appendChild(btnDelRow);
                                tr.appendChild(tdAction);
                            }
                            table.appendChild(tr);
                        });
                        tableWrap.appendChild(table);
                        contentWrapper.appendChild(tableWrap);
                    }
                }

                el.appendChild(header);
                el.appendChild(contentWrapper);
                frag.appendChild(el);
            });

            this.DOM.canvas.appendChild(frag);
        },

        attachDragEvents(el, index) {
            el.addEventListener('dragstart', (e) => {
                this.State.draggedBlockIndex = index;
                e.dataTransfer.effectAllowed = 'move';
                setTimeout(() => el.classList.add('dragging'), 0);
            });
            el.addEventListener('dragover', (e) => {
                e.preventDefault();
                if(this.State.draggedBlockIndex === index) return;
                const bounding = el.getBoundingClientRect();
                const offset = bounding.y + (bounding.height / 2);
                if (e.clientY - offset > 0) {
                    el.classList.add('drag-over-bottom');
                    el.classList.remove('drag-over-top');
                } else {
                    el.classList.add('drag-over-top');
                    el.classList.remove('drag-over-bottom');
                }
            });
            el.addEventListener('dragleave', () => {
                el.classList.remove('drag-over-top', 'drag-over-bottom');
            });
            el.addEventListener('drop', (e) => {
                e.preventDefault();
                el.classList.remove('drag-over-top', 'drag-over-bottom');
                if (this.State.draggedBlockIndex === null || this.State.draggedBlockIndex === index) return;

                const bounding = el.getBoundingClientRect();
                const offset = bounding.y + (bounding.height / 2);
                let dropIndex = index;
                
                if (e.clientY - offset > 0) dropIndex++;
                if (this.State.draggedBlockIndex < dropIndex) dropIndex--;

                const item = this.State.blocks.splice(this.State.draggedBlockIndex, 1)[0];
                this.State.blocks.splice(dropIndex, 0, item);
                
                this.renderEditor();
                this.triggerCompile();
            });
            el.addEventListener('dragend', () => {
                el.classList.remove('dragging');
                this.State.draggedBlockIndex = null;
            });
        },

        bindEvents() {
            // Add Buttons
            this.DOM.addBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const type = e.currentTarget.dataset.add;
                    const newBlock = { id: this.generateId(), type, content: {} };
                    
                    if (type === 'header') newBlock.content = { level: 2, text: 'Neue Überschrift' };
                    if (type === 'text') newBlock.content = { text: '' };
                    if (type === 'code') newBlock.content = { language: 'bash', code: '' };
                    if (type === 'shield_group') newBlock.content = { shields: [{ id: this.generateId(), label: 'VGT', message: 'Ready', color: '00f3ff', logo: '' }] };
                    if (type === 'table') newBlock.content = { rows: [['Kopf 1', 'Kopf 2'], ['Wert 1', 'Wert 2']] };
                    
                    this.State.blocks.push(newBlock);
                    this.renderEditor();
                    this.triggerCompile(); 
                    setTimeout(() => this.DOM.canvas.scrollTo({ top: this.DOM.canvas.scrollHeight, behavior: 'smooth' }), 50);
                });
            });

            // VGT DELEGATION ENGINE: O(1) Memory Event Binding
            // Alle Inputs, Selects und Buttons im Canvas werden hier zentral abgefangen!
            this.DOM.canvas.addEventListener('input', (e) => {
                const t = e.target;
                const id = t.dataset.id;
                if (!id) return;
                
                const block = this.State.blocks.find(b => b.id === id);
                if (!block) return;

                if (t.dataset.key) {
                    block.content[t.dataset.key] = t.value;
                } else if (t.dataset.skey) {
                    const shield = block.content.shields.find(s => s.id === t.dataset.sid);
                    if(shield) shield[t.dataset.skey] = t.value;
                } else if (t.hasAttribute('data-r')) {
                    const r = parseInt(t.dataset.r, 10);
                    const c = parseInt(t.dataset.c, 10);
                    block.content.rows[r][c] = t.value;
                }
                
                this.triggerCompile();
            });

            this.DOM.canvas.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-act]');
                if (!btn) return;

                const act = btn.dataset.act;
                const id = btn.dataset.id;
                const idx = this.State.blocks.findIndex(b => b.id === id);
                if (idx === -1) return;

                if (act === 'del') {
                    this.State.blocks.splice(idx, 1);
                } else if (act === 'add-shield') {
                    this.State.blocks[idx].content.shields.push({ id: this.generateId(), label: 'Label', message: 'Msg', color: 'blue', logo: '' });
                } else if (act === 'del-shield') {
                    this.State.blocks[idx].content.shields = this.State.blocks[idx].content.shields.filter(s => s.id !== btn.dataset.sid);
                } else if (act === 'add-row') {
                    const cols = this.State.blocks[idx].content.rows[0].length;
                    this.State.blocks[idx].content.rows.push(new Array(cols).fill(''));
                } else if (act === 'add-col') {
                    this.State.blocks[idx].content.rows = this.State.blocks[idx].content.rows.map(r => [...r, '']);
                } else if (act === 'del-row') {
                    const r = parseInt(btn.dataset.r, 10);
                    if(this.State.blocks[idx].content.rows.length > 1) {
                        this.State.blocks[idx].content.rows.splice(r, 1);
                    }
                }
                
                this.renderEditor();
                this.triggerCompile();
            });

            // Tabs & Export
            this.DOM.tabBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.tabBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    const target = e.currentTarget.dataset.target;
                    this.DOM.views.forEach(v => v.classList.add('hidden'));
                    document.getElementById(target).classList.remove('hidden');
                });
            });

            this.DOM.btnCopy.addEventListener('click', () => {
                const md = this.DOM.rawOutput.value;
                if (!md) return;
                navigator.clipboard.writeText(md).then(() => {
                    this.injectSVG(this.DOM.btnCopy, this.State.svgCopy, 'Copied');
                    setTimeout(() => {
                        this.safeClearOutput(this.DOM.btnCopy);
                        this.State.originalCopyNodes.forEach(node => {
                            this.DOM.btnCopy.appendChild(node.cloneNode(true));
                        });
                    }, 1500);
                });
            });

            this.DOM.btnDownload.addEventListener('click', () => {
                const md = this.DOM.rawOutput.value;
                if (!md) return;
                const blob = new Blob([md], { type: 'text/markdown' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `VGT_README_${new Date().getTime()}.md`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        },

        // --- COMPILATION ENGINE ---
        triggerCompile() {
            clearTimeout(this.State.debounceTimer);
            this.State.debounceTimer = setTimeout(() => {
                this.DOM.rawOutput.value = this.exportMarkdown();
                this.renderHTMLPreview();
            }, 100);
        },

        exportMarkdown() {
            return this.State.blocks.map(b => {
                switch (b.type) {
                    case 'header': return `${'#'.repeat(b.content.level)} ${b.content.text}`;
                    case 'text': return b.content.text;
                    case 'code': return `\`\`\`${b.content.language}\n${b.content.code}\n\`\`\``;
                    case 'shield_group':
                        return b.content.shields.map(s => 
                            `![${s.label}](https://img.shields.io/badge/${this.formatShieldUrlText(s.label)}-${this.formatShieldUrlText(s.message)}-${s.color}?style=for-the-badge${s.logo ? `&logo=${s.logo}` : ''})`
                        ).join(' ');
                    case 'table':
                        if (!b.content.rows || b.content.rows.length === 0) return '';
                        let md = '';
                        const headers = b.content.rows[0];
                        md += '| ' + headers.join(' | ') + ' |\n';
                        md += '| ' + headers.map(() => '---').join(' | ') + ' |\n';
                        for (let i = 1; i < b.content.rows.length; i++) {
                            md += '| ' + b.content.rows[i].join(' | ') + ' |\n';
                        }
                        return md.trim();
                    default: return '';
                }
            }).join('\n\n');
        },

        // VGT KOGNITIVER PARSER: Erzeugt natives HTML aus Markdown (100% XSS Immune)
        parseInlineMarkdown(text, containerElement) {
            if (!text) return;
            // Split by markdown delimiters (Bold, Italic, Code, Newline) preserving the delimiters
            const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\n)/g);
            
            parts.forEach(part => {
                if (!part) return;
                
                if (part === '\n') {
                    containerElement.appendChild(document.createElement('br'));
                } else if (part.startsWith('**') && part.endsWith('**')) {
                    const strong = document.createElement('strong');
                    strong.textContent = part.slice(2, -2);
                    containerElement.appendChild(strong);
                } else if (part.startsWith('*') && part.endsWith('*')) {
                    const em = document.createElement('em');
                    em.textContent = part.slice(1, -1);
                    containerElement.appendChild(em);
                } else if (part.startsWith('`') && part.endsWith('`')) {
                    const code = document.createElement('code');
                    code.textContent = part.slice(1, -1);
                    containerElement.appendChild(code);
                } else {
                    containerElement.appendChild(document.createTextNode(part));
                }
            });
        },

        renderHTMLPreview() {
            const htmlContainer = document.getElementById('rm-html-output');
            if (!htmlContainer) return;
            
            this.safeClearOutput(htmlContainer);
            const frag = document.createDocumentFragment();

            this.State.blocks.forEach(b => {
                switch (b.type) {
                    case 'header': 
                        const h = this.createEl('h' + b.content.level);
                        h.textContent = b.content.text;
                        frag.appendChild(h);
                        break;
                    case 'text': 
                        const p = this.createEl('p');
                        this.parseInlineMarkdown(b.content.text, p);
                        frag.appendChild(p);
                        break;
                    case 'code': 
                        const pre = this.createEl('pre');
                        const code = this.createEl('code');
                        code.textContent = b.content.code; // XSS Safe
                        pre.appendChild(code);
                        frag.appendChild(pre);
                        break;
                    case 'shield_group':
                        const shieldWrap = this.createEl('div');
                        b.content.shields.forEach(s => {
                            const url = this.createLocalBadgeUrl(s.label, s.message, s.color);
                            const img = this.createEl('img', 'shield-img', { src: url, alt: s.label });
                            shieldWrap.appendChild(img);
                        });
                        frag.appendChild(shieldWrap);
                        break;
                    case 'table':
                        if (!b.content.rows || b.content.rows.length === 0) break;
                        const table = this.createEl('table');
                        const thead = this.createEl('thead');
                        const tbody = this.createEl('tbody');
                        
                        const headRow = this.createEl('tr');
                        b.content.rows[0].forEach(cell => {
                            const th = this.createEl('th');
                            th.textContent = cell;
                            headRow.appendChild(th);
                        });
                        thead.appendChild(headRow);
                        
                        for (let i = 1; i < b.content.rows.length; i++) {
                            const tr = this.createEl('tr');
                            b.content.rows[i].forEach(cell => {
                                const td = this.createEl('td');
                                this.parseInlineMarkdown(cell, td);
                                tr.appendChild(td);
                            });
                            tbody.appendChild(tr);
                        }
                        
                        table.appendChild(thead);
                        table.appendChild(tbody);
                        frag.appendChild(table);
                        break;
                }
            });

            htmlContainer.appendChild(frag);
        }
    };

    ReadmeArchitectEngine.init();
});
