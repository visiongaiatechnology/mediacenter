/**
 * VGT MEDIACENTER - UNIVERSAL MEDIA FORGE LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: RAM Leak Prevention, DOM-XSS Shielding & Object Encapsulation
 * Local Image Processing using Canvas API.
 * Supports HEIC Interception, Aspect-Ratio Lock, and Alpha-Matte background fills.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-imgconv')) return;

    const MediaForgeEngine = {
        DOM: {},
        State: {
            currentFile: null,
            loadedImage: new Image(),
            originalObjectUrl: null,
            targetFormat: 'image/jpeg',
            targetExt: 'jpg',
            aspectLock: true,
            imageRatio: 1,
            bgColor: 'transparent',
            isProcessing: false,
            
            // SVG Cache für XSS-sichere Injektion
            svgLock: '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
            svgUnlock: '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>',
            svgConvertOrig: null
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT MEDIA FORGE: Canvas Matrix Active.');
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('icv-dropzone'),
                fileInput: document.getElementById('icv-file-input'),
                workspace: document.getElementById('icv-workspace'),
                btnReset: document.getElementById('icv-btn-reset'),
                
                // Controls
                fmtBtns: document.querySelectorAll('.fmt-btn'),
                groupQuality: document.getElementById('group-quality'),
                sliderQuality: document.getElementById('icv-quality'),
                lblQuality: document.getElementById('lbl-quality'),
                
                inWidth: document.getElementById('icv-width'),
                inHeight: document.getElementById('icv-height'),
                btnLockRatio: document.getElementById('btn-lock-ratio'),
                
                groupBg: document.getElementById('group-background'),
                bgBtns: document.querySelectorAll('.bg-btn'),
                
                btnConvert: document.getElementById('icv-btn-convert'),
                
                // Preview
                origName: document.getElementById('icv-orig-name'),
                origSize: document.getElementById('icv-orig-size'),
                origRes: document.getElementById('icv-orig-res'),
                targetName: document.getElementById('icv-target-name'),
                targetRes: document.getElementById('icv-target-res'),
                
                previewImg: document.getElementById('icv-preview-img'),
                loader: document.getElementById('icv-loader'),
                loaderText: document.getElementById('loader-text')
            };

            if (this.DOM.btnConvert) {
                // Sichern der originalen Button-Nodes für sicheres Reset
                this.State.svgConvertOrig = Array.from(this.DOM.btnConvert.childNodes).map(n => n.cloneNode(true));
            }
        },

        // --- SAFE DOM MANIPULATION UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString, textAppend = '') {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) {
                element.appendChild(svgNode);
            }
            if (textAppend) {
                element.appendChild(document.createTextNode(textAppend));
            }
        },

        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // --- MEMORY & STATE MANAGEMENT ---
        cleanupMemory() {
            if (this.State.originalObjectUrl) {
                URL.revokeObjectURL(this.State.originalObjectUrl);
                this.State.originalObjectUrl = null;
            }
            this.State.loadedImage.src = '';
        },

        resetTool() {
            this.cleanupMemory();
            this.State.currentFile = null;
            this.DOM.fileInput.value = '';
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.previewImg.src = '';
        },

        resetProcessingUI() {
            this.DOM.loader.classList.add('hidden');
            this.DOM.btnConvert.disabled = false;
            this.State.isProcessing = false;
            
            // XSS Safe Restore
            this.safeClearOutput(this.DOM.btnConvert);
            this.State.svgConvertOrig.forEach(node => {
                this.DOM.btnConvert.appendChild(node.cloneNode(true));
            });
        },

        // --- BINDING & INGESTION ---
        bindEvents() {
            // Dropzone
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
                if (e.dataTransfer.files.length) this.handleImageFile(e.dataTransfer.files[0]);
            });
            
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleImageFile(e.target.files[0]);
                this.DOM.fileInput.value = ''; // Reset
            });

            this.DOM.btnReset.addEventListener('click', () => this.resetTool());

            // Format Toggles
            this.DOM.fmtBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.fmtBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.targetFormat = e.currentTarget.getAttribute('data-fmt');
                    this.State.targetExt = e.currentTarget.getAttribute('data-ext');
                    this.updateTargetUI();
                });
            });

            // Quality Control
            this.DOM.sliderQuality.addEventListener('input', (e) => {
                this.DOM.lblQuality.textContent = `${e.target.value}%`;
            });

            // Dimension / Ratio Lock
            this.DOM.btnLockRatio.addEventListener('click', () => {
                this.State.aspectLock = !this.State.aspectLock;
                if (this.State.aspectLock) {
                    this.DOM.btnLockRatio.classList.add('active');
                    this.injectSVG(this.DOM.btnLockRatio, this.State.svgLock);
                    
                    if (this.DOM.inWidth.value) {
                        this.DOM.inHeight.value = Math.round(parseInt(this.DOM.inWidth.value, 10) / this.State.imageRatio);
                        this.updateTargetUI();
                    }
                } else {
                    this.DOM.btnLockRatio.classList.remove('active');
                    this.injectSVG(this.DOM.btnLockRatio, this.State.svgUnlock);
                }
            });

            // Smart Resizing
            this.DOM.inWidth.addEventListener('input', (e) => {
                const w = parseInt(e.target.value, 10);
                if (this.State.aspectLock && w > 0) {
                    this.DOM.inHeight.value = Math.round(w / this.State.imageRatio);
                }
                this.updateTargetUI();
            });

            this.DOM.inHeight.addEventListener('input', (e) => {
                const h = parseInt(e.target.value, 10);
                if (this.State.aspectLock && h > 0) {
                    this.DOM.inWidth.value = Math.round(h * this.State.imageRatio);
                }
                this.updateTargetUI();
            });

            // Background Matte (Alpha handling for JPG)
            this.DOM.bgBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.bgBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.bgColor = e.currentTarget.getAttribute('data-color');
                });
            });

            // Execution
            this.DOM.btnConvert.addEventListener('click', () => this.executeConversion());
        },

        async handleImageFile(file) {
            if (!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.heic')) {
                alert("VGT SECURITY BLOCK: Das System akzeptiert nur Bildformate.");
                return;
            }

            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');
            this.DOM.loader.classList.remove('hidden');
            this.DOM.loaderText.textContent = "Lade in RAM..."; // XSS Safe
            
            this.State.currentFile = file;

            // HEIC Intercept Strategy (Apple Format Failsafe)
            if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                if (typeof heic2any !== 'undefined') {
                    this.DOM.loaderText.textContent = "HEIC Dekodierung (Intensiv)...";
                    try {
                        const convertedBlob = await heic2any({ blob: file, toType: "image/png" });
                        this.State.currentFile = new File([convertedBlob], file.name.replace(/\.[^/.]+$/, ".png"), { type: "image/png" });
                    } catch(e) {
                        alert("VGT ERROR: HEIC Konvertierung fehlgeschlagen. Das Bild ist möglicherweise beschädigt.");
                        this.resetTool();
                        return;
                    }
                } else {
                    alert("VGT KERNEL ALERT: HEIC-Modul fehlt. Kann nicht nativ gelesen werden.");
                    this.resetTool();
                    return;
                }
            }

            // Load into Image Object to get native dimensions
            this.cleanupMemory();
            this.State.originalObjectUrl = URL.createObjectURL(this.State.currentFile);
            
            this.State.loadedImage.onload = () => {
                this.State.imageRatio = this.State.loadedImage.width / this.State.loadedImage.height;
                
                // Populate UI
                this.DOM.origName.textContent = file.name; // XSS Safe
                this.DOM.origSize.textContent = this.formatBytes(file.size);
                this.DOM.origRes.textContent = `${this.State.loadedImage.width} x ${this.State.loadedImage.height} px`;
                
                this.DOM.inWidth.value = this.State.loadedImage.width;
                this.DOM.inHeight.value = this.State.loadedImage.height;
                
                this.DOM.previewImg.src = this.State.originalObjectUrl;
                
                this.updateTargetUI();
                this.DOM.loader.classList.add('hidden');
            };
            
            this.State.loadedImage.onerror = () => {
                alert("VGT PARSER ERROR: Bild konnte nicht gerendert werden. Defektes Format.");
                this.resetTool();
            };

            this.State.loadedImage.src = this.State.originalObjectUrl;
        },

        updateTargetUI() {
            if (!this.State.currentFile) return;

            const baseName = this.State.currentFile.name.replace(/\.[^/.]+$/, "");
            this.DOM.targetName.textContent = `${baseName}_vgt.${this.State.targetExt}`; // XSS Safe
            this.DOM.targetRes.textContent = `${this.DOM.inWidth.value || 0} x ${this.DOM.inHeight.value || 0} px`;

            // Logic toggles
            if (this.State.targetFormat === 'image/png' || this.State.targetFormat === 'image/svg+xml') {
                this.DOM.groupQuality.classList.add('hidden');
            } else {
                this.DOM.groupQuality.classList.remove('hidden');
            }
        },

        // --- CORE CANVAS RENDER & EXPORT ---
        async executeConversion() {
            if (!this.State.currentFile || !this.State.loadedImage.width || this.State.isProcessing) return;

            const targetW = parseInt(this.DOM.inWidth.value, 10);
            const targetH = parseInt(this.DOM.inHeight.value, 10);

            if (!targetW || !targetH || targetW < 1 || targetH < 1) {
                alert("VGT SECURITY BLOCK: Dimensionen ungültig.");
                return;
            }

            this.State.isProcessing = true;
            this.DOM.btnConvert.disabled = true;
            this.DOM.loader.classList.remove('hidden');
            this.DOM.loaderText.textContent = "Berechne Canvas Matrix...";
            
            const spinSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
            this.injectSVG(this.DOM.btnConvert, spinSvg, ' Konvertiere...');

            // Small timeout to allow UI update before heavy CPU operation
            setTimeout(() => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = targetW;
                    canvas.height = targetH;
                    const ctx = canvas.getContext('2d', { willReadFrequently: true });

                    // Step 1: Draw Background Matte if requested (or if format doesn't support alpha)
                    if (this.State.bgColor !== 'transparent' || this.State.targetFormat === 'image/jpeg') {
                        ctx.fillStyle = this.State.bgColor === 'transparent' ? '#ffffff' : this.State.bgColor; // Default JPG fallback to white
                        ctx.fillRect(0, 0, targetW, targetH);
                    }

                    // Step 2: Draw Image with Smoothing
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(this.State.loadedImage, 0, 0, targetW, targetH);

                    // Step 3: Export to Blob
                    const qualityParam = parseInt(this.DOM.sliderQuality.value, 10) / 100;
                    
                    canvas.toBlob((blob) => {
                        // VGT GARBAGE COLLECTION: RAM sofort wieder freigeben
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        canvas.width = 0;
                        canvas.height = 0;

                        if (!blob) {
                            alert("VGT SYSTEM ERROR: Konvertierung auf dieser Plattform/Browser nicht unterstützt.");
                            this.resetProcessingUI();
                            return;
                        }

                        // Trigger Download
                        const blobUrl = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.style.display = 'none';
                        a.href = blobUrl;
                        a.download = this.DOM.targetName.textContent; // XSS Safe
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        
                        // Revoke memory safely
                        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);

                        // Reset UI State
                        this.DOM.loaderText.textContent = "Export erfolgreich!";
                        setTimeout(() => this.resetProcessingUI(), 1500);

                    }, this.State.targetFormat, qualityParam);

                } catch (err) {
                    console.error("VGT CONVERSION ERROR:", err);
                    alert("Kritischer Fehler bei der Canvas-Verarbeitung.");
                    this.resetProcessingUI();
                }
            }, 50);
        }
    };

    MediaForgeEngine.init();
});