/**
 * VGT MEDIACENTER - CIPHER LOGIC (DIAMANT SUPREME TRIAD)
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Memory Sandbox & Object Encapsulation
 * Native WebCrypto API. AES-256-GCM + PBKDF2. Zero Crypto Overhead.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-cipher')) return;

    const CipherEngine = {
        DOM: {},
        State: {
            cryptoEnabled: !!(window.crypto && window.crypto.subtle),
            algoMode: 'aes',
            textDirection: 'encrypt',
            fileDirection: 'encrypt',
            activeFile: null,
            finalBlobUrl: null,
            finalFileName: '',
            MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB RAM Limit
            originalCopyBtnHtml: null
        },

        init() {
            this.cacheDOM();
            this.verifyEnvironment();
            this.bindEvents();
            this.updateTextUI();
            console.log("🔒 VGT Cipher Engine: KERNEL ONLINE [Diamant Supreme]");
        },

        cacheDOM() {
            this.DOM = {
                inputKey: document.getElementById('cipher-key'),
                btnToggleKey: document.getElementById('btn-toggle-key'),
                algoToggles: document.querySelectorAll('.algo-btn'),
                modeTabs: document.querySelectorAll('.mode-tab'),
                
                viewText: document.getElementById('workspace-text'),
                viewFile: document.getElementById('workspace-file'),
                
                dirBtnsTxt: document.querySelectorAll('.dir-btn-txt'),
                labelTxtIn: document.getElementById('label-txt-in'),
                labelTxtOut: document.getElementById('label-txt-out'),
                txtInput: document.getElementById('cipher-text-input'),
                txtOutput: document.getElementById('cipher-text-output'),
                btnExecTxt: document.getElementById('btn-exec-text'),
                execTxtLbl: document.getElementById('exec-txt-label'),
                btnCopy: document.getElementById('btn-copy'),
                btnPaste: document.getElementById('btn-paste'),
                statusBadgeTxt: document.getElementById('status-badge-text'),
                matrixOverlay: document.getElementById('matrix-overlay'),
                matrixStream: document.getElementById('matrix-stream'),
                
                fileDropzone: document.getElementById('file-dropzone'),
                fileInput: document.getElementById('file-input'),
                fileProcessor: document.getElementById('file-processor'),
                fpModeLabel: document.getElementById('fp-mode-label'),
                fpName: document.getElementById('fp-name'),
                fpSize: document.getElementById('fp-size'),
                btnResetFile: document.getElementById('btn-reset-file'),
                btnExecFile: document.getElementById('btn-exec-file'),
                execFileLbl: document.getElementById('exec-file-label'),
                btnDownloadFile: document.getElementById('btn-download-file'),
                dlFileLbl: document.getElementById('dl-file-label'),
                fileProgWrap: document.getElementById('file-progress-wrap'),
                fileProgFill: document.getElementById('file-progress-fill'),
                fileProgText: document.getElementById('file-progress-text'),
                dropTitle: document.getElementById('drop-title-file'),
                dropDesc: document.getElementById('drop-desc-file')
            };

            if (this.DOM.btnCopy) {
                // Cache the original button nodes for safe restoration
                this.State.originalCopyBtnHtml = Array.from(this.DOM.btnCopy.childNodes).map(n => n.cloneNode(true));
            }
        },

        verifyEnvironment() {
            if (!this.State.cryptoEnabled) {
                console.error("VGT SECURITY ALERT: WebCrypto API ist offline. (SSL/HTTPS erforderlich!)");
                const warnBanner = document.getElementById('crypto-warning');
                if (warnBanner) warnBanner.classList.remove('hidden');
                this.showToast('VGT SECURITY ALERT: WebCrypto API offline. System gesperrt.', true);
            }
        },

        // --- CUSTOM TOAST MESSAGE BOX (NO ALERT) ---
        showToast(message, isError = false) {
            const toast = document.createElement('div');
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '50%';
            toast.style.transform = 'translateX(-50%) translateY(20px)';
            toast.style.backgroundColor = isError ? '#ef4444' : '#10b981';
            toast.style.color = '#fff';
            toast.style.padding = '12px 24px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
            toast.style.zIndex = '9999';
            toast.style.fontFamily = 'monospace';
            toast.style.fontSize = '14px';
            toast.style.opacity = '0';
            toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            toast.textContent = message; // Safe assignment

            document.body.appendChild(toast);

            // Trigger animation
            setTimeout(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateX(-50%) translateY(0)';
            }, 10);

            // Auto-remove
            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateX(-50%) translateY(20px)';
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        },

        bindEvents() {
            // Mode Tabs
            this.DOM.modeTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    this.DOM.modeTabs.forEach(t => t.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    const mode = e.currentTarget.getAttribute('data-mode');
                    if (mode === 'text') {
                        this.DOM.viewFile.classList.add('hidden');
                        this.DOM.viewFile.classList.remove('active-workspace');
                        this.DOM.viewText.classList.remove('hidden');
                        this.DOM.viewText.classList.add('active-workspace');
                    } else {
                        this.DOM.viewText.classList.add('hidden');
                        this.DOM.viewText.classList.remove('active-workspace');
                        this.DOM.viewFile.classList.remove('hidden');
                        this.DOM.viewFile.classList.add('active-workspace');
                    }
                });
            });

            // Algorithm Toggles
            this.DOM.algoToggles.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.algoToggles.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.algoMode = e.currentTarget.getAttribute('data-val');
                    this.updateTextUI();
                });
            });

            // Direction Toggles (Text)
            this.DOM.dirBtnsTxt.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.dirBtnsTxt.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.textDirection = e.currentTarget.getAttribute('data-dir');
                    this.updateTextUI();
                });
            });

            // Key Visibility Toggle
            if (this.DOM.btnToggleKey) {
                this.DOM.btnToggleKey.addEventListener('click', () => {
                    if (!this.DOM.inputKey) return;
                    const type = this.DOM.inputKey.getAttribute('type') === 'password' ? 'text' : 'password';
                    this.DOM.inputKey.setAttribute('type', type);
                    
                    // Safe SVG Injection
                    while (this.DOM.btnToggleKey.firstChild) {
                        this.DOM.btnToggleKey.removeChild(this.DOM.btnToggleKey.firstChild);
                    }

                    const svgString = type === 'text' 
                        ? '<svg viewBox="0 0 24 24" class="svg-icon eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
                        : '<svg viewBox="0 0 24 24" class="svg-icon eye-on"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                    
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(svgString, 'image/svg+xml');
                    this.DOM.btnToggleKey.appendChild(doc.documentElement);

                    this.DOM.inputKey.style.color = type === 'text' ? 'var(--vg-text)' : 'rgba(var(--c-pink), 1)';
                });
            }

            // Text Execute
            if (this.DOM.btnExecTxt) {
                this.DOM.btnExecTxt.addEventListener('click', () => this.executeTextProcessing());
            }

            // Copy & Paste
            if (this.DOM.btnCopy) {
                this.DOM.btnCopy.addEventListener('click', () => this.copyToClipboard());
            }
            if (this.DOM.btnPaste) {
                this.DOM.btnPaste.addEventListener('click', async () => {
                    try {
                        const text = await navigator.clipboard.readText();
                        if (this.DOM.txtInput) this.DOM.txtInput.value = text;
                    } catch(err) {
                        this.showToast('Clipboard-Zugriff verweigert (Strg+V nutzen).', true);
                    }
                });
            }

            // File Dropzone
            if (this.DOM.fileDropzone && this.DOM.fileInput) {
                this.DOM.fileDropzone.addEventListener('click', () => this.DOM.fileInput.click());
                this.DOM.fileDropzone.addEventListener('dragover', (e) => { 
                    e.preventDefault(); 
                    this.DOM.fileDropzone.classList.add('dragover');
                });
                this.DOM.fileDropzone.addEventListener('dragleave', () => { 
                    this.DOM.fileDropzone.classList.remove('dragover');
                });
                this.DOM.fileDropzone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    this.DOM.fileDropzone.classList.remove('dragover');
                    if (e.dataTransfer.files.length) this.handleFileSelect(e.dataTransfer.files[0]);
                });
                this.DOM.fileInput.addEventListener('change', (e) => {
                    if (e.target.files.length) this.handleFileSelect(e.target.files[0]);
                });
            }

            // File Execution
            if (this.DOM.btnResetFile) {
                this.DOM.btnResetFile.addEventListener('click', () => this.resetFileTool());
            }
            if (this.DOM.btnExecFile) {
                this.DOM.btnExecFile.addEventListener('click', () => this.executeFileProcessing());
            }
            if (this.DOM.btnDownloadFile) {
                this.DOM.btnDownloadFile.addEventListener('click', () => this.downloadProcessedFile());
            }
        },

        updateTextUI() {
            if (!this.DOM.txtInput || !this.DOM.txtOutput) return;
            
            this.DOM.txtInput.value = '';
            this.DOM.txtOutput.value = '';
            if (this.DOM.statusBadgeTxt) this.DOM.statusBadgeTxt.classList.add('hidden');

            if (this.State.textDirection === 'encrypt') {
                if(this.DOM.labelTxtIn) this.DOM.labelTxtIn.textContent = 'Plaintext Eingabe';
                if(this.DOM.labelTxtOut) this.DOM.labelTxtOut.textContent = this.State.algoMode === 'triad' ? 'Triad Ciphertext (Base64)' : 'AES Ciphertext (Base64)';
                if(this.DOM.txtInput) this.DOM.txtInput.placeholder = 'Geheime Nachricht hier eingeben...';
                if(this.DOM.btnExecTxt) this.DOM.btnExecTxt.className = 'btn-execute encrypt-state';
                if(this.DOM.execTxtLbl) this.DOM.execTxtLbl.textContent = this.State.algoMode === 'triad' ? 'VGT Triade Verschlüsseln' : 'AES Verschlüsseln';
            } else {
                if(this.DOM.labelTxtIn) this.DOM.labelTxtIn.textContent = this.State.algoMode === 'triad' ? 'Triad Ciphertext (Base64)' : 'AES Ciphertext (Base64)';
                if(this.DOM.labelTxtOut) this.DOM.labelTxtOut.textContent = 'Entschlüsselter Plaintext';
                if(this.DOM.txtInput) this.DOM.txtInput.placeholder = 'U2FsdGVkX1... (Ciphertext einfügen)';
                if(this.DOM.btnExecTxt) this.DOM.btnExecTxt.className = 'btn-execute decrypt-state';
                if(this.DOM.execTxtLbl) this.DOM.execTxtLbl.textContent = 'Datenstrom Entschlüsseln';
            }
        },

        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'], i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        runMatrixEffect(duration) {
            return new Promise(resolve => {
                if (this.DOM.matrixOverlay) this.DOM.matrixOverlay.classList.remove('hidden');
                
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
                let interval = setInterval(() => {
                    let stream = '';
                    for (let i=0; i<300; i++) stream += chars.charAt(Math.floor(Math.random() * chars.length));
                    if (this.DOM.matrixStream) this.DOM.matrixStream.textContent = stream;
                }, 30);

                setTimeout(() => {
                    clearInterval(interval);
                    if (this.DOM.matrixOverlay) this.DOM.matrixOverlay.classList.add('hidden');
                    resolve();
                }, duration);
            });
        },

        // --- DIAMANT SUPREME Crypto Core Engine ---
        vgtCrypto: {
            async deriveKey(password, salt, isTriad) {
                const enc = new TextEncoder();
                const keyMaterial = await window.crypto.subtle.importKey(
                    "raw", enc.encode(password), {name: "PBKDF2"}, false, ["deriveKey"]
                );
                const iterations = isTriad ? 1000000 : 250000;
                return await window.crypto.subtle.deriveKey(
                    {name: "PBKDF2", salt: salt, iterations: iterations, hash: "SHA-256"},
                    keyMaterial, {name: "AES-GCM", length: 256}, false, ["encrypt", "decrypt"]
                );
            },
            async encrypt(dataBuffer, password, isTriad) {
                const salt = window.crypto.getRandomValues(new Uint8Array(16));
                const iv = window.crypto.getRandomValues(new Uint8Array(12));
                const key = await this.deriveKey(password, salt, isTriad);
                const cipherBuffer = await window.crypto.subtle.encrypt({name: "AES-GCM", iv: iv}, key, dataBuffer);
                const packed = new Uint8Array(16 + 12 + cipherBuffer.byteLength);
                packed.set(salt, 0); packed.set(iv, 16); packed.set(new Uint8Array(cipherBuffer), 28);
                return packed;
            },
            async decrypt(packedBuffer, password, isTriad) {
                const packed = new Uint8Array(packedBuffer);
                if (packed.length < 28) throw new Error("Invalid payload.");
                const salt = packed.slice(0, 16), iv = packed.slice(16, 28), data = packed.slice(28);
                const key = await this.deriveKey(password, salt, isTriad);
                return await window.crypto.subtle.decrypt({name: "AES-GCM", iv: iv}, key, data);
            },
            bufferToBase64(buffer) {
                const bytes = new Uint8Array(buffer);
                let binary = '';
                for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
                return window.btoa(binary);
            },
            base64ToBuffer(base64) {
                const binary = window.atob(base64);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
                return bytes;
            }
        },

        // --- TEXT PROCESSING ---
        async executeTextProcessing() {
            if (!this.State.cryptoEnabled) {
                this.showToast('Kryptografie-Engine blockiert. HTTPS erforderlich.', true);
                return;
            }

            const data = this.DOM.txtInput.value.trim();
            const key = this.DOM.inputKey.value;

            if (!data || !key) {
                this.showToast('Eingabe oder Master Key fehlt.', true);
                return;
            }

            this.DOM.txtOutput.value = '';
            if (this.DOM.statusBadgeTxt) this.DOM.statusBadgeTxt.classList.add('hidden');
            this.DOM.btnExecTxt.disabled = true;
            
            await this.runMatrixEffect(600);

            try {
                const isTriad = this.State.algoMode === 'triad';
                if (this.State.textDirection === 'encrypt') {
                    const dataBuffer = new TextEncoder().encode(data);
                    const packedBuffer = await this.vgtCrypto.encrypt(dataBuffer, key, isTriad);
                    
                    this.DOM.txtOutput.value = this.vgtCrypto.bufferToBase64(packedBuffer);
                    
                    if (this.DOM.statusBadgeTxt) {
                        this.DOM.statusBadgeTxt.textContent = 'SECURE';
                        this.DOM.statusBadgeTxt.style.color = 'rgba(var(--c-purple),1)';
                        this.DOM.statusBadgeTxt.classList.remove('hidden');
                    }
                } else {
                    const packedBuffer = this.vgtCrypto.base64ToBuffer(data);
                    const decryptedBuffer = await this.vgtCrypto.decrypt(packedBuffer, key, isTriad);
                    
                    this.DOM.txtOutput.value = new TextDecoder().decode(decryptedBuffer);
                    
                    if (this.DOM.statusBadgeTxt) {
                        this.DOM.statusBadgeTxt.textContent = 'UNLOCKED';
                        this.DOM.statusBadgeTxt.style.color = 'rgba(var(--c-green),1)';
                        this.DOM.statusBadgeTxt.classList.remove('hidden');
                    }
                }
            } catch (err) {
                this.DOM.txtOutput.value = "ENTKRYPTION FEHLGESCHLAGEN.\n\nUrsache: Inkorrekter Key oder defekter Ciphertext.";
                if (this.DOM.statusBadgeTxt) {
                    this.DOM.statusBadgeTxt.textContent = 'ACCESS DENIED';
                    this.DOM.statusBadgeTxt.style.color = '#ff4d4d';
                    this.DOM.statusBadgeTxt.classList.remove('hidden');
                }
                this.showToast('Zugriff verweigert. Inkorrekter Key.', true);
            }
            this.DOM.btnExecTxt.disabled = false;
        },

        copyToClipboard() {
            if (!this.DOM.txtOutput.value) return;
            
            this.DOM.txtOutput.select();
            document.execCommand('copy');
            
            // XSS Safe Node Replacement
            while (this.DOM.btnCopy.firstChild) {
                this.DOM.btnCopy.removeChild(this.DOM.btnCopy.firstChild);
            }

            const svgString = '<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:rgba(var(--c-green),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'image/svg+xml');
            
            this.DOM.btnCopy.appendChild(doc.documentElement);
            this.DOM.btnCopy.appendChild(document.createTextNode(' Copied'));

            setTimeout(() => {
                while (this.DOM.btnCopy.firstChild) {
                    this.DOM.btnCopy.removeChild(this.DOM.btnCopy.firstChild);
                }
                this.State.originalCopyBtnHtml.forEach(node => {
                    this.DOM.btnCopy.appendChild(node.cloneNode(true));
                });
            }, 1500);
        },

        // --- FILE PROCESSING ---
        resetFileTool() {
            this.State.activeFile = null;
            if (this.State.finalBlobUrl) {
                URL.revokeObjectURL(this.State.finalBlobUrl);
                this.State.finalBlobUrl = null;
            }
            if (this.DOM.fileInput) this.DOM.fileInput.value = '';
            
            if (this.DOM.fileProcessor) this.DOM.fileProcessor.classList.add('hidden');
            if (this.DOM.fileDropzone) this.DOM.fileDropzone.classList.remove('hidden');
            
            if (this.DOM.btnExecFile) {
                this.DOM.btnExecFile.classList.remove('hidden');
                this.DOM.btnExecFile.disabled = false;
            }
            if (this.DOM.btnDownloadFile) this.DOM.btnDownloadFile.classList.add('hidden');
            if (this.DOM.fileProgWrap) this.DOM.fileProgWrap.classList.add('hidden');
        },

        handleFileSelect(file) {
            if (file.size > this.State.MAX_FILE_SIZE) {
                this.showToast(`RAM Limit: Maximal 50MB erlaubt. (${this.formatBytes(file.size)})`, true);
                return;
            }
            
            this.State.activeFile = file;
            if (this.DOM.fpName) this.DOM.fpName.textContent = file.name; // XSS Safe
            if (this.DOM.fpSize) this.DOM.fpSize.textContent = this.formatBytes(file.size);
            
            if (file.name.endsWith('.vgt')) {
                this.State.fileDirection = 'decrypt';
                if (this.DOM.fpModeLabel) this.DOM.fpModeLabel.textContent = 'Datei-Tresor Entschlüsseln';
                if (this.DOM.execFileLbl) this.DOM.execFileLbl.textContent = '.vgt Container öffnen';
                if (this.DOM.dropTitle) this.DOM.dropTitle.textContent = '.vgt Container ablegen';
                if (this.DOM.btnExecFile) this.DOM.btnExecFile.className = 'btn-execute decrypt-state';
            } else {
                this.State.fileDirection = 'encrypt';
                if (this.DOM.fpModeLabel) this.DOM.fpModeLabel.textContent = 'Datei-Tresor Versiegeln';
                if (this.DOM.execFileLbl) this.DOM.execFileLbl.textContent = 'In .vgt Container verschlüsseln';
                if (this.DOM.dropTitle) this.DOM.dropTitle.textContent = 'Datei zum Verschlüsseln ablegen';
                if (this.DOM.btnExecFile) this.DOM.btnExecFile.className = 'btn-execute encrypt-state';
            }
            
            if (this.DOM.fileDropzone) this.DOM.fileDropzone.classList.add('hidden');
            if (this.DOM.fileProcessor) this.DOM.fileProcessor.classList.remove('hidden');
        },

        executeFileProcessing() {
            if (!this.State.cryptoEnabled) {
                this.showToast('System blockiert: Kryptografie-Engine in dieser Umgebung nicht verfügbar.', true);
                return;
            }

            const key = this.DOM.inputKey.value;
            if (!key) {
                this.showToast('Master Key wird zwingend benötigt!', true);
                return;
            }
            
            this.DOM.btnExecFile.disabled = true;
            if (this.DOM.fileProgWrap) this.DOM.fileProgWrap.classList.remove('hidden');
            if (this.DOM.fileProgFill) this.DOM.fileProgFill.style.width = '10%';
            if (this.DOM.fileProgText) {
                this.DOM.fileProgText.textContent = "Allokiere RAM Buffer...";
                this.DOM.fileProgText.style.color = "rgba(var(--c-purple), 1)";
            }

            const reader = new FileReader();
            
            reader.onload = async (e) => {
                const dataPayload = e.target.result; 
                
                if (this.DOM.fileProgFill) this.DOM.fileProgFill.style.width = '50%';
                if (this.DOM.fileProgText) this.DOM.fileProgText.textContent = "Verarbeite Krypto-Matrix...";

                try {
                    const isTriad = this.State.algoMode === 'triad';
                    let blob;

                    if (this.State.fileDirection === 'encrypt') {
                        // Verschlüsselt als DataURL String. Dies erhält den MimeType perfekt.
                        const dataBuffer = new TextEncoder().encode(dataPayload);
                        const resultBuffer = await this.vgtCrypto.encrypt(dataBuffer, key, isTriad);
                        blob = new Blob([resultBuffer], { type: 'application/octet-stream' });
                        this.State.finalFileName = this.State.activeFile.name + '.vgt';
                        
                        if (this.DOM.dlFileLbl) this.DOM.dlFileLbl.textContent = "Safe Container (.vgt) speichern";
                    } else {
                        // ArrayBuffer verarbeiten
                        const decryptedBuffer = await this.vgtCrypto.decrypt(dataPayload, key, isTriad);
                        const decryptedStr = new TextDecoder().decode(decryptedBuffer); 
                        
                        // Parse the DataURL to reconstruct the raw file
                        const arr = decryptedStr.split(',');
                        if (arr.length < 2) throw new Error("Invalid format");
                        
                        const mimeString = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
                        const byteString = atob(arr[1]);
                        const ab = new ArrayBuffer(byteString.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        
                        blob = new Blob([ab], { type: mimeString });
                        this.State.finalFileName = this.State.activeFile.name.replace('.vgt', '');
                        
                        if (this.DOM.dlFileLbl) this.DOM.dlFileLbl.textContent = "Entschlüsselte Datei speichern";
                    }

                    if (this.State.finalBlobUrl) {
                        URL.revokeObjectURL(this.State.finalBlobUrl);
                    }
                    this.State.finalBlobUrl = URL.createObjectURL(blob);

                    if (this.DOM.fileProgFill) { 
                        this.DOM.fileProgFill.style.width = '100%'; 
                        this.DOM.fileProgFill.style.background = "rgba(var(--c-green), 1)"; 
                    }
                    if (this.DOM.fileProgText) {
                        this.DOM.fileProgText.textContent = "Operation erfolgreich!";
                        this.DOM.fileProgText.style.color = "rgba(var(--c-green), 1)";
                    }
                    
                    if (this.DOM.btnExecFile) this.DOM.btnExecFile.classList.add('hidden');
                    if (this.DOM.btnDownloadFile) this.DOM.btnDownloadFile.classList.remove('hidden');

                } catch (err) {
                    console.error("VGT CIPHER ERROR:", err);
                    if (this.DOM.fileProgFill) this.DOM.fileProgFill.style.background = "#ff4d4d";
                    if (this.DOM.fileProgText) {
                        this.DOM.fileProgText.textContent = "Zugriff verweigert / Daten inkonsistent.";
                        this.DOM.fileProgText.style.color = "#ff4d4d";
                    }
                    if (this.DOM.btnExecFile) this.DOM.btnExecFile.disabled = false;
                    this.showToast('Entschlüsselung fehlgeschlagen. Falscher Key.', true);
                }
            };

            reader.onerror = () => { 
                this.showToast('I/O Error beim Laden der Datei.', true);
                if (this.DOM.btnExecFile) this.DOM.btnExecFile.disabled = false; 
            };

            if (this.State.fileDirection === 'encrypt') {
                reader.readAsDataURL(this.State.activeFile);
            } else {
                reader.readAsArrayBuffer(this.State.activeFile);
            }
        },

        downloadProcessedFile() {
            if (!this.State.finalBlobUrl) return;
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = this.State.finalBlobUrl;
            a.download = this.State.finalFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    CipherEngine.init();
});