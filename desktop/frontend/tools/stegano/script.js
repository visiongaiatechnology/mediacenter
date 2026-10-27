/**
 * VGT MEDIACENTER - STEGANO-VAULT LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Memory Leak Protection & Object Isolation
 * O(n) Canvas Manipulation & CryptoJS AES-256 Integration.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-stegano')) return;

    const SteganoEngine = {
        DOM: {},
        State: {
            VGT_SIGNATURE: "VGT_STEG:",
            VGT_TERMINATOR: "$$VGT_END$$",
            encImgData: null,
            encMaxChars: 0,
            encObjectUrl: null,
            decImgData: null,
            decObjectUrl: null
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT STEGANO-VAULT: Cryptographic Matrix initialized.');
        },

        cacheDOM() {
            this.DOM = {
                modeTabs: document.querySelectorAll('.mode-tab'),
                viewEncode: document.getElementById('sg-workspace-encode'),
                viewDecode: document.getElementById('sg-workspace-decode'),
                
                // Encode Nodes
                encDropzone: document.getElementById('enc-dropzone'),
                encFileInput: document.getElementById('enc-file-input'),
                encPreviewBox: document.getElementById('enc-preview-box'),
                encPreviewImg: document.getElementById('enc-preview-img'),
                btnEncReset: document.getElementById('btn-enc-reset'),
                encPayload: document.getElementById('enc-payload-text'),
                encPass: document.getElementById('enc-password'),
                btnEncToggleVis: document.getElementById('btn-enc-toggle-vis'),
                encCapVal: document.getElementById('enc-capacity-val'),
                encCapFill: document.getElementById('enc-cap-fill'),
                encProgWrap: document.getElementById('enc-progress-wrap'),
                encProgFill: document.getElementById('enc-progress-fill'),
                encProgText: document.getElementById('enc-progress-text'),
                btnEncode: document.getElementById('btn-enc-execute'),
                
                // Decode Nodes
                decDropzone: document.getElementById('dec-dropzone'),
                decFileInput: document.getElementById('dec-file-input'),
                decPreviewBox: document.getElementById('dec-preview-box'),
                decPreviewImg: document.getElementById('dec-preview-img'),
                btnDecReset: document.getElementById('btn-dec-reset'),
                decPass: document.getElementById('dec-password'),
                btnDecToggleVis: document.getElementById('btn-dec-toggle-vis'),
                btnDecode: document.getElementById('btn-dec-execute'),
                decProgWrap: document.getElementById('dec-progress-wrap'),
                decProgFill: document.getElementById('dec-progress-fill'),
                decProgText: document.getElementById('dec-progress-text'),
                decOutput: document.getElementById('dec-payload-output'),
                btnDecCopy: document.getElementById('btn-dec-copy'),
                
                // Hidden Core Canvas
                hiddenCanvas: document.getElementById('steg-hidden-canvas')
            };
        },

        bindEvents() {
            // Tab Switching
            this.DOM.modeTabs.forEach(tab => {
                tab.addEventListener('click', (e) => this.switchMode(e.currentTarget));
            });

            // Password Vis Toggles
            this.DOM.btnEncToggleVis.addEventListener('click', () => this.togglePassVis(this.DOM.encPass, this.DOM.btnEncToggleVis));
            this.DOM.btnDecToggleVis.addEventListener('click', () => this.togglePassVis(this.DOM.decPass, this.DOM.btnDecToggleVis));

            // Encode Dropzone & Input
            this.DOM.encDropzone.addEventListener('dragover', (e) => { e.preventDefault(); this.DOM.encDropzone.classList.add('dragover'); });
            this.DOM.encDropzone.addEventListener('dragleave', () => this.DOM.encDropzone.classList.remove('dragover'));
            this.DOM.encDropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.encDropzone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.handleEncImage(e.dataTransfer.files[0]);
            });
            this.DOM.encDropzone.addEventListener('click', () => this.DOM.encFileInput.click());
            this.DOM.encFileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleEncImage(e.target.files[0]);
            });

            // Encode UI Actions
            this.DOM.btnEncReset.addEventListener('click', () => this.resetEncodeWorkspace());
            this.DOM.encPayload.addEventListener('input', () => this.updateCapacityMeter());
            this.DOM.encPass.addEventListener('input', () => this.updateCapacityMeter());
            this.DOM.btnEncode.addEventListener('click', () => this.executeEncoding());

            // Decode Dropzone & Input
            this.DOM.decDropzone.addEventListener('dragover', (e) => { e.preventDefault(); this.DOM.decDropzone.classList.add('dragover'); });
            this.DOM.decDropzone.addEventListener('dragleave', () => this.DOM.decDropzone.classList.remove('dragover'));
            this.DOM.decDropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.decDropzone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.handleDecImage(e.dataTransfer.files[0]);
            });
            this.DOM.decDropzone.addEventListener('click', () => this.DOM.decFileInput.click());
            this.DOM.decFileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleDecImage(e.target.files[0]);
            });

            // Decode UI Actions
            this.DOM.btnDecReset.addEventListener('click', () => this.resetDecodeWorkspace());
            this.DOM.btnDecode.addEventListener('click', () => this.executeDecoding());
            this.DOM.btnDecCopy.addEventListener('click', () => this.copyDecodedText());
        },

        // --- UI & Memory Management ---
        switchMode(tabElement) {
            this.DOM.modeTabs.forEach(t => t.classList.remove('active'));
            tabElement.classList.add('active');
            
            if (tabElement.dataset.mode === 'encode') {
                this.DOM.viewDecode.classList.remove('active-workspace');
                this.DOM.viewDecode.classList.add('hidden');
                this.DOM.viewEncode.classList.remove('hidden');
                this.DOM.viewEncode.classList.add('active-workspace');
            } else {
                this.DOM.viewEncode.classList.remove('active-workspace');
                this.DOM.viewEncode.classList.add('hidden');
                this.DOM.viewDecode.classList.remove('hidden');
                this.DOM.viewDecode.classList.add('active-workspace');
            }
        },

        togglePassVis(inputEl, btnEl) {
            const type = inputEl.getAttribute('type') === 'password' ? 'text' : 'password';
            inputEl.setAttribute('type', type);
            
            // VGT HARDENING: Safe SVG Injection via DOMParser instead of innerHTML
            while (btnEl.firstChild) {
                btnEl.removeChild(btnEl.firstChild);
            }

            const svgString = type === 'text' 
                ? '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>'
                : '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'image/svg+xml');
            btnEl.appendChild(doc.documentElement);
        },

        // --- ENCODING ENGINE ---
        handleEncImage(file) {
            if (!file.type.startsWith('image/')) {
                alert("VGT SECURITY BLOCK: Nur reine Bilddateien (JPG/PNG) sind als Trägermedium zugelassen.");
                return;
            }
            
            this.resetEncodeWorkspace(); // Memory flush old image
            
            this.State.encObjectUrl = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                const ctx = this.DOM.hiddenCanvas.getContext('2d', { willReadFrequently: true });
                this.DOM.hiddenCanvas.width = img.width;
                this.DOM.hiddenCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                // Extract raw pixel data
                this.State.encImgData = ctx.getImageData(0, 0, img.width, img.height);
                
                // Capacity: (width * height * 3 channels) bits / 8 = bytes (chars)
                this.State.encMaxChars = Math.floor((img.width * img.height * 3) / 8);
                
                // UI Update
                this.DOM.encPreviewImg.src = this.State.encObjectUrl;
                this.DOM.encDropzone.classList.add('hidden');
                this.DOM.encPreviewBox.classList.remove('hidden');
                this.DOM.btnEncReset.classList.remove('hidden');
                this.DOM.btnEncode.disabled = false;
                
                this.updateCapacityMeter();
            };
            img.src = this.State.encObjectUrl;
        },

        resetEncodeWorkspace() {
            if (this.State.encObjectUrl) {
                URL.revokeObjectURL(this.State.encObjectUrl);
                this.State.encObjectUrl = null;
            }
            this.State.encImgData = null;
            this.State.encMaxChars = 0;
            
            this.DOM.encFileInput.value = '';
            this.DOM.encPreviewBox.classList.add('hidden');
            this.DOM.btnEncReset.classList.add('hidden');
            this.DOM.encDropzone.classList.remove('hidden');
            this.DOM.encPayload.value = '';
            this.DOM.encPreviewImg.src = '';
            
            const ctx = this.DOM.hiddenCanvas.getContext('2d');
            ctx.clearRect(0, 0, this.DOM.hiddenCanvas.width, this.DOM.hiddenCanvas.height);

            this.updateCapacityMeter();
        },

        updateCapacityMeter() {
            if (!this.State.encImgData) return;
            const text = this.DOM.encPayload.value;
            const pass = this.DOM.encPass.value;
            
            // Rough estimation: AES adds base64 overhead + IV + headers
            let estimatedBytes = text.length;
            if (pass) estimatedBytes = Math.ceil(text.length * 1.4) + 64; 
            
            estimatedBytes += this.State.VGT_SIGNATURE.length + this.State.VGT_TERMINATOR.length;

            this.DOM.encCapVal.textContent = `${estimatedBytes.toLocaleString('de-DE')} / ${this.State.encMaxChars.toLocaleString('de-DE')} Bytes`;
            
            const pct = Math.min(100, (estimatedBytes / this.State.encMaxChars) * 100);
            this.DOM.encCapFill.style.width = `${pct}%`;
            
            if (pct > 95) {
                this.DOM.encCapFill.classList.add('overload');
                this.DOM.encCapVal.style.color = 'rgba(var(--c-pink), 1)';
                this.DOM.btnEncode.disabled = true;
            } else {
                this.DOM.encCapFill.classList.remove('overload');
                this.DOM.encCapVal.style.color = 'rgba(var(--c-cyan), 1)';
                this.DOM.btnEncode.disabled = false;
            }
        },

        executeEncoding() {
            if (!this.State.encImgData) return alert("VGT ERROR: Trägerbild fehlt im Speicher.");
            const rawText = this.DOM.encPayload.value;
            if (!rawText) return alert("VGT ERROR: Payload-Matrix ist leer.");

            this.DOM.btnEncode.disabled = true;
            this.DOM.encProgWrap.classList.remove('hidden');
            this.DOM.encProgFill.style.width = '10%';
            this.DOM.encProgText.textContent = "Kryptographische Versiegelung...";

            // Yield execution to allow UI update
            setTimeout(() => {
                let finalPayload = rawText;
                
                // 1. AES Encryption
                const pass = this.DOM.encPass.value;
                if (pass) {
                    if (typeof CryptoJS === 'undefined') return alert("VGT CRITICAL: CryptoJS Engine offline.");
                    finalPayload = CryptoJS.AES.encrypt(rawText, pass).toString();
                }

                // 2. Signature Merging
                const fullMessage = this.State.VGT_SIGNATURE + finalPayload + this.State.VGT_TERMINATOR;
                
                // 3. Binary Conversion
                this.DOM.encProgText.textContent = "Kompiliere Binär-Vektor...";
                const binaryMsg = this.strToBin(fullMessage);

                if (binaryMsg.length > (this.State.encImgData.width * this.State.encImgData.height * 3)) {
                    alert("VGT CAPACITY ERROR: Die Nachricht überschreitet die physischen Pixel des Trägerbildes.");
                    this.DOM.btnEncode.disabled = false;
                    this.DOM.encProgWrap.classList.add('hidden');
                    return;
                }

                // 4. LSB Pixel Injection (O(n))
                this.DOM.encProgFill.style.width = '40%';
                this.DOM.encProgText.textContent = "Injiziere Daten in Pixel-Matrix (LSB)...";

                setTimeout(() => {
                    const data = this.State.encImgData.data;
                    let binIndex = 0;
                    
                    for (let i = 0; i < data.length; i++) {
                        if ((i + 1) % 4 === 0) {
                            // Alpha Channel: Opaque zwingen, um PNG Kompressions-Verluste zu blockieren
                            data[i] = 255;
                            continue; 
                        }
                        
                        if (binIndex < binaryMsg.length) {
                            const bit = parseInt(binaryMsg[binIndex], 10);
                            data[i] = (data[i] & ~1) | bit;
                            binIndex++;
                        } else {
                            break; // Injection complete
                        }
                    }

                    // 5. Final Render & Export
                    this.DOM.encProgFill.style.width = '80%';
                    this.DOM.encProgText.textContent = "Rendere PNG Master-File...";

                    const ctx = this.DOM.hiddenCanvas.getContext('2d');
                    ctx.putImageData(this.State.encImgData, 0, 0);

                    // Export lossless PNG
                    this.DOM.hiddenCanvas.toBlob((blob) => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = url;
                        a.download = `VGT_Stego_${new Date().getTime()}.png`;
                        document.body.appendChild(a);
                        a.click();
                        
                        // Security: Immediate Cleanup
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);

                        this.DOM.encProgFill.style.width = '100%';
                        this.DOM.encProgText.textContent = "Erfolgreich versiegelt!";
                        
                        setTimeout(() => {
                            this.DOM.encProgWrap.classList.add('hidden');
                            this.DOM.btnEncode.disabled = false;
                        }, 2000);

                    }, 'image/png');

                }, 50);
            }, 50);
        },

        // --- DECODING ENGINE ---
        handleDecImage(file) {
            if (file.type !== 'image/png' && file.type !== 'image/bmp') {
                alert("VGT WARNING: LSB-Steganographie überlebt Kompression nicht. Eine Extraktion aus JPG schlägt garantiert fehl. Nur PNG/BMP verarbeiten.");
            }

            this.resetDecodeWorkspace(); // Flush old

            this.State.decObjectUrl = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => {
                const ctx = this.DOM.hiddenCanvas.getContext('2d', { willReadFrequently: true });
                this.DOM.hiddenCanvas.width = img.width;
                this.DOM.hiddenCanvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                this.State.decImgData = ctx.getImageData(0, 0, img.width, img.height);
                
                this.DOM.decPreviewImg.src = this.State.decObjectUrl;
                this.DOM.decDropzone.classList.add('hidden');
                this.DOM.decPreviewBox.classList.remove('hidden');
                this.DOM.btnDecReset.classList.remove('hidden');
                this.DOM.btnDecode.disabled = false;
                this.DOM.decOutput.value = '';
                this.DOM.btnDecCopy.classList.add('hidden');
            };
            img.src = this.State.decObjectUrl;
        },

        resetDecodeWorkspace() {
            if (this.State.decObjectUrl) {
                URL.revokeObjectURL(this.State.decObjectUrl);
                this.State.decObjectUrl = null;
            }
            this.State.decImgData = null;
            this.DOM.decFileInput.value = '';
            this.DOM.decPreviewBox.classList.add('hidden');
            this.DOM.btnDecReset.classList.add('hidden');
            this.DOM.decDropzone.classList.remove('hidden');
            this.DOM.btnDecode.disabled = true;
            this.DOM.decOutput.value = '';
            this.DOM.decPreviewImg.src = '';
            this.DOM.btnDecCopy.classList.add('hidden');
        },

        executeDecoding() {
            if (!this.State.decImgData) return;

            this.DOM.btnDecode.disabled = true;
            this.DOM.decProgWrap.classList.remove('hidden');
            this.DOM.decProgFill.style.width = '20%';
            this.DOM.decProgFill.style.backgroundColor = "rgba(var(--c-purple), 1)"; // Reset color
            this.DOM.decProgText.textContent = "Scanne Pixel LSB...";
            this.DOM.decOutput.value = '';
            this.DOM.btnDecCopy.classList.add('hidden');

            setTimeout(() => {
                const data = this.State.decImgData.data;
                let extractedMessage = null;
                let currentByte = '';
                let fullStr = '';

                for (let i = 0; i < data.length; i++) {
                    if ((i + 1) % 4 === 0) continue; // Skip Alpha
                    
                    currentByte += (data[i] & 1).toString();
                    
                    if (currentByte.length === 8) {
                        const charCode = parseInt(currentByte, 2);
                        
                        // Anti-Freeze Guard: Breche ab, wenn nur 0en kommen und keine VGT Signatur da ist
                        if (charCode === 0 && fullStr.length > 0 && !fullStr.includes(this.State.VGT_SIGNATURE)) {
                            break;
                        }
                        
                        fullStr += String.fromCharCode(charCode);
                        currentByte = '';

                        if (fullStr.endsWith(this.State.VGT_TERMINATOR)) {
                            extractedMessage = fullStr;
                            break;
                        }
                    }
                }

                this.DOM.decProgFill.style.width = '60%';
                this.DOM.decProgText.textContent = "Analysiere Signatur...";

                setTimeout(() => {
                    if (!extractedMessage || !extractedMessage.startsWith(this.State.VGT_SIGNATURE)) {
                        this.DOM.decProgFill.style.backgroundColor = "rgba(var(--c-pink), 1)";
                        this.DOM.decProgText.textContent = "Scan beendet: Keine VGT-Signatur gefunden.";
                        this.DOM.decOutput.value = "/// KEINE VERSTECKTEN DATEN GEFUNDEN ///\nEntweder das Bild enthält keine Daten, oder das Format wurde komprimiert (z.B. über WhatsApp gesendet), was die Pixelstruktur zerstört hat.";
                        this.DOM.btnDecode.disabled = false;
                        return;
                    }

                    this.DOM.decProgFill.style.width = '80%';
                    this.DOM.decProgText.textContent = "Extrahiere Payload...";

                    let payload = extractedMessage.substring(this.State.VGT_SIGNATURE.length, extractedMessage.length - this.State.VGT_TERMINATOR.length);
                    const pass = this.DOM.decPass.value;

                    // AES Decryption
                    if (pass) {
                        if (typeof CryptoJS === 'undefined') return alert("VGT CRITICAL: CryptoJS offline.");
                        try {
                            this.DOM.decProgText.textContent = "AES Entschlüsselung läuft...";
                            const bytes = CryptoJS.AES.decrypt(payload, pass);
                            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                            
                            if (!decrypted) throw new Error("Decryption Key Invalid");
                            payload = decrypted;
                        } catch(e) {
                            this.DOM.decProgFill.style.backgroundColor = "rgba(var(--c-pink), 1)";
                            this.DOM.decProgText.textContent = "Fehler: Passwort inkorrekt oder Vektor beschädigt.";
                            this.DOM.decOutput.value = "/// ZUGRIFF VERWEIGERT ///\nDas Entschlüsseln schlug fehl. Hast du das richtige AES-Passwort eingegeben?";
                            this.DOM.btnDecode.disabled = false;
                            return;
                        }
                    } else {
                        // Fix UTF-8 for unencrypted payloads
                        try {
                            payload = decodeURIComponent(escape(payload));
                        } catch(e) {
                            console.warn("VGT UTF8 Decode Failure:", e);
                        }
                    }

                    // Native Value Injection (XSS Safe)
                    this.DOM.decOutput.value = payload;
                    this.DOM.btnDecCopy.classList.remove('hidden');

                    this.DOM.decProgFill.style.width = '100%';
                    this.DOM.decProgFill.style.backgroundColor = "rgba(var(--c-purple), 1)";
                    this.DOM.decProgText.textContent = "Daten erfolgreich extrahiert!";
                    
                    setTimeout(() => {
                        this.DOM.decProgWrap.classList.add('hidden');
                        this.DOM.btnDecode.disabled = false;
                    }, 2000);

                }, 50);
            }, 50);
        },

        copyDecodedText() {
            if(!this.DOM.decOutput.value) return;
            this.DOM.decOutput.select();
            document.execCommand('copy');
            
            // XSS Safe Text Update
            const orig = this.DOM.btnDecCopy.textContent;
            this.DOM.btnDecCopy.textContent = 'Kopiert!';
            setTimeout(() => this.DOM.btnDecCopy.textContent = orig, 1500);
        },

        // --- MATH UTILS ---
        strToBin(str) {
            const encoder = new TextEncoder();
            const bytes = encoder.encode(str);
            let bin = '';
            for (let i = 0; i < bytes.length; i++) {
                bin += bytes[i].toString(2).padStart(8, '0');
            }
            return bin;
        }
    };

    SteganoEngine.init();
});