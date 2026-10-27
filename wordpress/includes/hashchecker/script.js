/**
 * VGT MEDIACENTER - HASHCHECKER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Memory Isolation & Object Encapsulation
 * O(n) Stream-Worker with Advanced UI State Management.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-hashchecker')) return;

    const HashCheckerEngine = {
        DOM: {},
        State: {
            chunkSize: 1024 * 1024 * 5, // 5MB Chunks für optimale RAM-Nutzung
            fileSize: 0,
            offset: 0,
            algos: {},
            originalCopyContents: {} // Caching für sichere SVG-Wiederherstellung (ohne innerHTML)
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT HASHCHECKER: Cryptographic Stream-Worker Active.');
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('hash-dropzone'),
                fileInput: document.getElementById('hash-file-input'),
                resultsArea: document.getElementById('hash-results'),
                btnReset: document.getElementById('btn-reset'),
                metaName: document.getElementById('meta-name'),
                metaSize: document.getElementById('meta-size'),
                progressContainer: document.getElementById('hash-progress-container'),
                progressFill: document.getElementById('hash-progress-fill'),
                progressStatus: document.getElementById('hash-status-text'),
                copyBtns: document.querySelectorAll('.btn-copy'),
                inputs: {
                    md5: document.getElementById('val-md5'),
                    sha1: document.getElementById('val-sha1'),
                    sha256: document.getElementById('val-sha256'),
                    sha512: document.getElementById('val-sha512')
                }
            };

            // Safely cache original button SVGs to prevent innerHTML usage later
            this.DOM.copyBtns.forEach((btn, index) => {
                btn.setAttribute('data-btn-id', index);
                this.State.originalCopyContents[index] = Array.from(btn.childNodes).map(n => n.cloneNode(true));
            });
        },

        bindEvents() {
            // Ingestion Zone
            this.DOM.dropZone.addEventListener('dragover', (e) => { 
                e.preventDefault(); 
                this.DOM.dropZone.classList.add('dragover'); 
            });
            this.DOM.dropZone.addEventListener('dragleave', () => {
                this.DOM.dropZone.classList.remove('dragover');
            });
            this.DOM.dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.dropZone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.triggerEngine(e.dataTransfer.files[0]);
            });
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.triggerEngine(e.target.files[0]);
            });

            // Control Actions
            this.DOM.btnReset.addEventListener('click', () => this.resetTool());

            // UX Copy Handlers
            this.DOM.copyBtns.forEach(btn => {
                btn.addEventListener('click', (e) => this.copyToClipboard(e.currentTarget));
            });
        },

        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        resetTool() {
            // Memory Cleanup
            this.State.algos = {};
            this.State.offset = 0;
            this.State.fileSize = 0;
            
            // UI Reset
            this.DOM.resultsArea.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.fileInput.value = '';
            
            Object.values(this.DOM.inputs).forEach(input => {
                if (input) input.value = '';
            });
        },

        triggerEngine(file) {
            if (typeof CryptoJS === 'undefined') {
                alert("VGT CRITICAL: Krypto-Engine (CryptoJS) nicht geladen oder blockiert.");
                return;
            }

            // State Transition
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.resultsArea.classList.remove('hidden');
            this.DOM.progressContainer.style.opacity = '1';
            
            // Populate Meta safely via textContent
            this.DOM.metaName.textContent = file.name;
            this.DOM.metaSize.textContent = this.formatBytes(file.size);
            
            // Reset Terminals
            Object.values(this.DOM.inputs).forEach(input => {
                if (input) input.value = "Initialisiere Stream...";
            });

            // Initialize Cryptographic State
            this.State.fileSize = file.size;
            this.State.offset = 0;
            this.State.algos = {
                md5: CryptoJS.algo.MD5.create(),
                sha1: CryptoJS.algo.SHA1.create(),
                sha256: CryptoJS.algo.SHA256.create(),
                sha512: CryptoJS.algo.SHA512.create()
            };

            const reader = new FileReader();

            reader.onload = (e) => {
                // VGT HARDENING: Native WordArray Conversion
                const wordArray = CryptoJS.lib.WordArray.create(e.target.result);
                
                this.State.algos.md5.update(wordArray);
                this.State.algos.sha1.update(wordArray);
                this.State.algos.sha256.update(wordArray);
                this.State.algos.sha512.update(wordArray);

                this.State.offset += e.target.result.byteLength;
                
                // Progress UI Update
                const percent = ((this.State.offset / this.State.fileSize) * 100).toFixed(1);
                this.DOM.progressFill.style.width = `${percent}%`;
                this.DOM.progressStatus.textContent = `Berechne Entropie... ${percent}%`; // XSS Safe

                if (this.State.offset < this.State.fileSize) {
                    this.readNextChunk(file, reader);
                } else {
                    this.finalizeEngine();
                }
            };

            reader.onerror = () => {
                this.DOM.progressStatus.textContent = "VGT ERROR: I/O Sandbox Blockade beim Dateizugriff.";
                this.DOM.progressFill.style.backgroundColor = "rgba(var(--c-pink), 1)";
            };

            this.readNextChunk(file, reader); // Ignition
        },

        readNextChunk(file, reader) {
            const slice = file.slice(this.State.offset, this.State.offset + this.State.chunkSize);
            reader.readAsArrayBuffer(slice);
        },

        finalizeEngine() {
            this.DOM.progressStatus.textContent = "Signaturen verifiziert.";
            setTimeout(() => this.DOM.progressContainer.style.opacity = '0', 1000);

            // Print Output (XSS Safe by default on input.value)
            if (this.DOM.inputs.md5) this.DOM.inputs.md5.value = this.State.algos.md5.finalize().toString(CryptoJS.enc.Hex);
            if (this.DOM.inputs.sha1) this.DOM.inputs.sha1.value = this.State.algos.sha1.finalize().toString(CryptoJS.enc.Hex);
            if (this.DOM.inputs.sha256) this.DOM.inputs.sha256.value = this.State.algos.sha256.finalize().toString(CryptoJS.enc.Hex);
            if (this.DOM.inputs.sha512) this.DOM.inputs.sha512.value = this.State.algos.sha512.finalize().toString(CryptoJS.enc.Hex);
            
            // Cleanup Memory
            this.State.algos = {}; 
        },

        copyToClipboard(btn) {
            const targetId = btn.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (!input || input.value.includes('...')) return;

            input.select();
            input.setSelectionRange(0, 99999); // Mobile
            document.execCommand('copy');
            
            // VGT HARDENING: Safe SVG Injection without innerHTML
            btn.classList.add('copied');
            while (btn.firstChild) {
                btn.removeChild(btn.firstChild);
            }
            
            const checkSvg = '<svg viewBox="0 0 24 24" class="svg-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            const parser = new DOMParser();
            const doc = parser.parseFromString(checkSvg, 'image/svg+xml');
            btn.appendChild(doc.documentElement);
            
            // Revert back to original cached nodes
            setTimeout(() => {
                btn.classList.remove('copied');
                while (btn.firstChild) {
                    btn.removeChild(btn.firstChild);
                }
                const btnId = btn.getAttribute('data-btn-id');
                if (this.State.originalCopyContents[btnId]) {
                    this.State.originalCopyContents[btnId].forEach(node => {
                        btn.appendChild(node.cloneNode(true));
                    });
                }
            }, 1500);
        }
    };

    HashCheckerEngine.init();
});