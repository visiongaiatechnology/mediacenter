/**
 * VGT MEDIACENTER - CIPHER-FLOW LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: Attribute-Injection Prevention, Native DOM Builder & Object Isolation
 * Modular pipeline architecture for cryptographic chains. Built on CryptoJS.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-cipherflow')) return;

    const CipherFlowEngine = {
        DOM: {},
        State: {
            pipeline: [],
            debounceTimer: null,
            originalCopyBtnNodes: []
        },
        Config: {
            OPERATIONS: {
                'b64_enc': { label: 'Base64 Encode', needsArg: false },
                'b64_dec': { label: 'Base64 Decode', needsArg: false },
                'hex_enc': { label: 'Hex Encode', needsArg: false },
                'hex_dec': { label: 'Hex Decode', needsArg: false },
                'url_enc': { label: 'URL Encode', needsArg: false },
                'url_dec': { label: 'URL Decode', needsArg: false },
                'aes_enc': { label: 'AES-256 Encrypt', needsArg: true, argPlaceholder: 'Passwort (Key)' },
                'aes_dec': { label: 'AES-256 Decrypt', needsArg: true, argPlaceholder: 'Passwort (Key)' },
                'md5':     { label: 'MD5 Hash', needsArg: false },
                'sha1':    { label: 'SHA-1 Hash', needsArg: false },
                'sha256':  { label: 'SHA-256 Hash', needsArg: false },
                'sha512':  { label: 'SHA-512 Hash', needsArg: false }
            }
        },

        init() {
            this.cacheDOM();
            this.State.pipeline.push({ id: this.generateId(), type: 'b64_enc', arg: '' }); // Initial Node
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                container: document.querySelector('.cf-pipeline-container'),
                input: document.getElementById('cf-input'),
                output: document.getElementById('cf-output'),
                nodeContainer: document.getElementById('cf-node-container'),
                btnAddNode: document.getElementById('cf-btn-add-node'),
                btnCopy: document.getElementById('cf-btn-copy'),
                statusBadge: document.getElementById('cf-pipeline-status')
            };

            if (this.DOM.btnCopy) {
                this.State.originalCopyBtnNodes = Array.from(this.DOM.btnCopy.childNodes).map(n => n.cloneNode(true));
            }
        },

        waitForDependencies() {
            const ensureLibLoaded = setInterval(() => {
                if (typeof CryptoJS !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    this.renderPipeline();
                    console.log('VGT CIPHER-FLOW: Krypto-Matrix & Pipeline Active.');
                }
            }, 100);
        },

        generateId() {
            const bytes = new Uint8Array(8);
            crypto.getRandomValues(bytes);
            return 'vgt_' + Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString, textContent = '') {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) element.appendChild(svgNode);
            
            if (textContent) {
                element.appendChild(document.createTextNode(' ' + textContent));
            }
        },

        // --- PIPELINE RENDERING ENGINE (XSS SAFE) ---
        renderPipeline() {
            const frag = document.createDocumentFragment();

            this.State.pipeline.forEach((node, index) => {
                const opInfo = this.Config.OPERATIONS[node.type];
                
                // Native DOM Assembly (No innerHTML)
                const nodeEl = document.createElement('div');
                nodeEl.className = 'cf-node';
                nodeEl.id = `node-${node.id}`;
                
                // 1. Header
                const header = document.createElement('div');
                header.className = 'node-header';
                
                const indexSpan = document.createElement('span');
                indexSpan.className = 'node-index';
                indexSpan.textContent = `MODUL_0${index + 1}`;
                
                const btnRemove = document.createElement('button');
                btnRemove.className = 'btn-remove-node';
                btnRemove.setAttribute('data-id', node.id);
                btnRemove.title = 'Modul entfernen';
                
                const trashSvg = `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                const parser = new DOMParser();
                const trashDoc = parser.parseFromString(trashSvg, 'text/html');
                if (trashDoc.querySelector('svg')) btnRemove.appendChild(trashDoc.querySelector('svg'));

                btnRemove.addEventListener('click', (e) => this.removeNode(e.currentTarget.getAttribute('data-id')));

                header.appendChild(indexSpan);
                header.appendChild(btnRemove);

                // 2. Controls
                const controls = document.createElement('div');
                controls.className = 'node-controls';

                const selectWrap = document.createElement('div');
                selectWrap.className = 'select-wrap';
                
                const select = document.createElement('select');
                select.className = 'vgt-select node-select';
                select.setAttribute('data-id', node.id);

                Object.entries(this.Config.OPERATIONS).forEach(([key, val]) => {
                    const opt = document.createElement('option');
                    opt.value = key;
                    opt.textContent = val.label;
                    if (node.type === key) opt.selected = true;
                    select.appendChild(opt);
                });

                select.addEventListener('change', (e) => this.updateNodeType(e.currentTarget));
                selectWrap.appendChild(select);
                
                const selIconDoc = parser.parseFromString(`<svg viewBox="0 0 24 24" class="select-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>`, 'text/html');
                if (selIconDoc.querySelector('svg')) selectWrap.appendChild(selIconDoc.querySelector('svg'));

                controls.appendChild(selectWrap);

                // 3. Argument Input (XSS Immune via .value)
                if (opInfo.needsArg) {
                    const argWrap = document.createElement('div');
                    argWrap.className = 'input-wrap';
                    
                    const argIconDoc = parser.parseFromString(`<svg viewBox="0 0 24 24" class="input-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`, 'text/html');
                    if (argIconDoc.querySelector('svg')) argWrap.appendChild(argIconDoc.querySelector('svg'));

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.className = 'node-input';
                    input.setAttribute('data-id', node.id);
                    input.placeholder = opInfo.argPlaceholder;
                    
                    // VGT SECURE INJECTION: Das Setzen via Property neutralisiert Code-Injektionen restlos.
                    input.value = node.arg; 
                    
                    input.addEventListener('input', (e) => this.updateNodeArg(e.currentTarget));
                    argWrap.appendChild(input);
                    controls.appendChild(argWrap);
                }

                nodeEl.appendChild(header);
                nodeEl.appendChild(controls);
                frag.appendChild(nodeEl);
            });

            this.safeClearOutput(this.DOM.nodeContainer);
            this.DOM.nodeContainer.appendChild(frag);

            this.triggerExecution();
        },

        // --- PIPELINE MUTATIONS ---
        removeNode(id) {
            this.State.pipeline = this.State.pipeline.filter(n => n.id !== id);
            this.renderPipeline();
        },

        updateNodeType(selectElement) {
            const id = selectElement.getAttribute('data-id');
            const node = this.State.pipeline.find(n => n.id === id);
            if (!node) return;

            node.type = selectElement.value;
            // Clear arg if switching to a type that doesn't need one to keep state clean
            if (!this.Config.OPERATIONS[node.type].needsArg) {
                node.arg = '';
            }
            this.renderPipeline();
        },

        updateNodeArg(inputElement) {
            const id = inputElement.getAttribute('data-id');
            const node = this.State.pipeline.find(n => n.id === id);
            if (node) {
                node.arg = inputElement.value;
                this.triggerExecution();
            }
        },

        addNode() {
            this.State.pipeline.push({ id: this.generateId(), type: 'b64_enc', arg: '' });
            this.renderPipeline();
        },

        bindEvents() {
            this.DOM.btnAddNode.addEventListener('click', () => this.addNode());
            this.DOM.input.addEventListener('input', () => this.triggerExecution());
            this.DOM.btnCopy.addEventListener('click', () => this.copyResult());
        },

        // --- CRYPTO EXECUTION ENGINE ---
        triggerExecution() {
            clearTimeout(this.State.debounceTimer);
            if (this.DOM.container) this.DOM.container.classList.add('active-flow');
            
            this.DOM.statusBadge.className = 'status-badge';
            const spinSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-dasharray="30" stroke-linecap="round"></circle></svg>`;
            this.injectSVG(this.DOM.statusBadge, spinSvg, 'Processing...');
            
            // Remove error states
            document.querySelectorAll('.cf-node').forEach(n => n.classList.remove('error'));
            if (this.DOM.output) this.DOM.output.classList.remove('error');

            this.State.debounceTimer = setTimeout(() => {
                this.executePipeline();
                if (this.DOM.container) this.DOM.container.classList.remove('active-flow');
            }, 300);
        },

        executePipeline() {
            if (typeof CryptoJS === 'undefined') {
                this.setErrorState(-1, "VGT CRITICAL: CryptoJS Offline");
                return;
            }

            let currentData = this.DOM.input.value;

            if (!currentData) {
                this.DOM.output.value = '';
                this.DOM.statusBadge.className = 'status-badge';
                const idleSvg = `<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
                this.injectSVG(this.DOM.statusBadge, idleSvg, 'Pipeline Idle');
                return;
            }

            for (let i = 0; i < this.State.pipeline.length; i++) {
                const node = this.State.pipeline[i];
                
                try {
                    switch (node.type) {
                        case 'b64_enc':
                            currentData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(currentData));
                            break;
                        case 'b64_dec':
                            const parsedB64 = CryptoJS.enc.Base64.parse(currentData);
                            currentData = CryptoJS.enc.Utf8.stringify(parsedB64);
                            if(!currentData) throw new Error("Malformed Base64");
                            break;
                        case 'hex_enc':
                            currentData = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(currentData));
                            break;
                        case 'hex_dec':
                            const parsedHex = CryptoJS.enc.Hex.parse(currentData);
                            currentData = CryptoJS.enc.Utf8.stringify(parsedHex);
                            if(!currentData) throw new Error("Malformed Hex");
                            break;
                        case 'url_enc':
                            currentData = encodeURIComponent(currentData);
                            break;
                        case 'url_dec':
                            currentData = decodeURIComponent(currentData);
                            break;
                        case 'aes_enc':
                            if(!node.arg) throw new Error("Key required");
                            currentData = CryptoJS.AES.encrypt(currentData, node.arg).toString();
                            break;
                        case 'aes_dec':
                            if(!node.arg) throw new Error("Key required");
                            const bytes = CryptoJS.AES.decrypt(currentData, node.arg);
                            currentData = bytes.toString(CryptoJS.enc.Utf8);
                            if(!currentData) throw new Error("Invalid Key or Corrupt Ciphertext");
                            break;
                        case 'md5':
                            currentData = CryptoJS.MD5(currentData).toString(CryptoJS.enc.Hex);
                            break;
                        case 'sha1':
                            currentData = CryptoJS.SHA1(currentData).toString(CryptoJS.enc.Hex);
                            break;
                        case 'sha256':
                            currentData = CryptoJS.SHA256(currentData).toString(CryptoJS.enc.Hex);
                            break;
                        case 'sha512':
                            currentData = CryptoJS.SHA512(currentData).toString(CryptoJS.enc.Hex);
                            break;
                    }
                } catch (err) {
                    this.setErrorState(node.id, `CRITICAL FAIL: Modul 0${i+1} (${this.Config.OPERATIONS[node.type].label})\nUrsache: Invalider Input oder falscher Key.`);
                    return; // Stop execution on error
                }
            }

            // Pipeline Success
            this.DOM.output.value = currentData;
            this.DOM.statusBadge.className = 'status-badge success';
            
            const successSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:currentColor;fill:none;stroke-width:2;"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            this.injectSVG(this.DOM.statusBadge, successSvg, 'SUCCESS');
        },

        setErrorState(nodeId, msg) {
            this.DOM.output.value = msg; // .value handles string safely without executing
            this.DOM.output.classList.add('error');
            
            this.DOM.statusBadge.className = 'status-badge error';
            const errorSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:currentColor;fill:none;stroke-width:2;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
            this.injectSVG(this.DOM.statusBadge, errorSvg, 'DATA CORRUPTION');
            
            if (nodeId !== -1) {
                const faultNode = document.getElementById(`node-${nodeId}`);
                if(faultNode) faultNode.classList.add('error');
            }
        },

        // --- SYSTEM ACTIONS ---
        copyResult() {
            if(!this.DOM.output.value || this.DOM.output.classList.contains('error')) return;
            
            this.DOM.output.select();
            document.execCommand('copy');
            
            const checkSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:rgba(var(--c-green),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            this.injectSVG(this.DOM.btnCopy, checkSvg, 'Copied');

            setTimeout(() => {
                this.safeClearOutput(this.DOM.btnCopy);
                this.State.originalCopyBtnNodes.forEach(node => {
                    this.DOM.btnCopy.appendChild(node.cloneNode(true));
                });
            }, 1500);
        }
    };

    CipherFlowEngine.init();
});
