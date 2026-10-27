/**
 * VGT MEDIACENTER - MATRIX FORGER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: RAM Leak Prevention, Native DOM Builder & Object Isolation
 * High-Res Canvas Rendering with RGB Pixel-Injection and Logo-Overlay.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-qr')) return;

    const MatrixForgerEngine = {
        DOM: {},
        State: {
            RESOLUTION: 1024, // High-Res Export Canvas Base
            payload: '',
            fg: '#000000',
            bg: '#ffffff',
            logoBlobUrl: null, // RAM-Safe Object URL (no Base64 strings)
            logoScale: 0.2,    // 20%
            debounceTimer: null,
            isRendering: false,
            
            // Safe SVG Cache
            svgExportNormal: '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
            svgExportActive: '<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>'
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                inputPayload: document.getElementById('qr-input-text'),
                
                // Colors
                inColorFg: document.getElementById('qr-color-fg'),
                lblHexFg: document.getElementById('hex-fg'),
                inColorBg: document.getElementById('qr-color-bg'),
                lblHexBg: document.getElementById('hex-bg'),
                btnResetColors: document.getElementById('btn-reset-colors'),
                
                // Logo
                logoDropzone: document.getElementById('qr-logo-dropzone'),
                logoInput: document.getElementById('qr-logo-input'),
                logoPrompt: document.getElementById('logo-prompt'),
                logoPreviewArea: document.getElementById('logo-preview-area'),
                logoImg: document.getElementById('qr-logo-preview'),
                btnRemoveLogo: document.getElementById('btn-remove-logo'),
                
                logoSizeGroup: document.getElementById('logo-size-group'),
                sliderLogoSize: document.getElementById('slider-logo-size'),
                lblLogoSize: document.getElementById('lbl-logo-size'),
                
                // Render Output
                placeholder: document.getElementById('qr-placeholder'),
                masterCanvas: document.getElementById('qr-master-canvas'),
                btnExport: document.getElementById('btn-export-png'),
                rawContainer: document.getElementById('qr-raw-container')
            };
        },

        waitForDependencies() {
            // Warten auf die externe QRCode Bibliothek (via SRI im Core geladen)
            const ensureLibLoaded = setInterval(() => {
                if (typeof QRCode !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    console.log('VGT MATRIX FORGER: Canvas Rendering Engine Active.');
                }
            }, 100);
        },

        // --- SAFE DOM UTILS ---
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
                element.appendChild(document.createTextNode(' ' + textAppend));
            }
        },

        // --- COLOR & SHAPE MATH UTILS ---
        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        },

        roundRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        },

        // --- BINDINGS ---
        bindEvents() {
            // Input Handlers (Debounced)
            this.DOM.inputPayload.addEventListener('input', (e) => {
                this.State.payload = e.target.value;
                this.triggerRender();
            });

            this.DOM.inColorFg.addEventListener('input', (e) => {
                this.State.fg = e.target.value;
                this.DOM.lblHexFg.textContent = this.State.fg.toUpperCase();
                this.triggerRender();
            });

            this.DOM.inColorBg.addEventListener('input', (e) => {
                this.State.bg = e.target.value;
                this.DOM.lblHexBg.textContent = this.State.bg.toUpperCase();
                this.triggerRender();
            });

            this.DOM.btnResetColors.addEventListener('click', () => {
                this.State.fg = '#000000';
                this.State.bg = '#ffffff';
                this.DOM.inColorFg.value = this.State.fg;
                this.DOM.lblHexFg.textContent = this.State.fg;
                this.DOM.inColorBg.value = this.State.bg;
                this.DOM.lblHexBg.textContent = this.State.bg;
                this.triggerRender();
            });

            // Logo Dropzone
            this.DOM.logoDropzone.addEventListener('dragover', (e) => { 
                e.preventDefault(); 
                this.DOM.logoDropzone.classList.add('dragover'); 
            });
            this.DOM.logoDropzone.addEventListener('dragleave', () => {
                this.DOM.logoDropzone.classList.remove('dragover');
            });
            this.DOM.logoDropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.logoDropzone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.handleLogo(e.dataTransfer.files[0]);
            });
            
            // Klick auf Dropzone (ohne den Remove Button) triggert Input
            this.DOM.logoDropzone.addEventListener('click', (e) => {
                if (e.target.closest('#btn-remove-logo')) return;
                this.DOM.logoInput.click();
            });

            this.DOM.logoInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleLogo(e.target.files[0]);
                this.DOM.logoInput.value = ''; 
            });

            this.DOM.btnRemoveLogo.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeLogo();
            });

            this.DOM.sliderLogoSize.addEventListener('input', (e) => {
                const val = parseInt(e.target.value, 10);
                this.DOM.lblLogoSize.textContent = `${val}%`;
                
                if (val > 30) {
                    this.DOM.lblLogoSize.style.color = 'rgba(var(--c-pink), 1)';
                } else {
                    this.DOM.lblLogoSize.style.color = 'var(--vg-text)';
                }

                this.State.logoScale = val / 100;
                this.triggerRender();
            });

            // Export
            this.DOM.btnExport.addEventListener('click', () => this.exportMatrix());
        },

        // --- INGESTION ---
        handleLogo(file) {
            if (!file.type.startsWith('image/')) {
                alert("VGT SECURITY BLOCK: Logo muss eine gültige Bilddatei (PNG, JPG, SVG) sein.");
                return;
            }

            // VGT Memory Cleanup: Alte BlobUrl zerstören, bevor neue generiert wird
            if (this.State.logoBlobUrl) {
                URL.revokeObjectURL(this.State.logoBlobUrl);
            }

            // Sicherer RAM-Pointer anstatt riesigem Base64-String (Verhindert DOM Lockups)
            this.State.logoBlobUrl = URL.createObjectURL(file);
            
            this.DOM.logoPrompt.classList.add('hidden');
            this.DOM.logoImg.src = this.State.logoBlobUrl;
            this.DOM.logoPreviewArea.classList.remove('hidden');
            this.DOM.logoSizeGroup.classList.remove('hidden');

            this.triggerRender();
        },

        removeLogo() {
            if (this.State.logoBlobUrl) {
                URL.revokeObjectURL(this.State.logoBlobUrl);
                this.State.logoBlobUrl = null;
            }
            this.DOM.logoPreviewArea.classList.add('hidden');
            this.DOM.logoImg.src = '';
            this.DOM.logoPrompt.classList.remove('hidden');
            this.DOM.logoSizeGroup.classList.add('hidden');
            
            this.triggerRender();
        },

        // --- RENDER ENGINE ---
        triggerRender() {
            clearTimeout(this.State.debounceTimer);
            this.State.debounceTimer = setTimeout(() => this.renderMatrix(), 150);
        },

        renderMatrix() {
            if (!this.State.payload.trim()) {
                this.DOM.masterCanvas.classList.add('hidden');
                this.DOM.placeholder.classList.remove('hidden');
                this.DOM.btnExport.disabled = true;
                return;
            }

            this.DOM.placeholder.classList.add('hidden');
            this.DOM.masterCanvas.classList.remove('hidden');
            this.DOM.btnExport.disabled = false;

            // 1. Generate Raw QR using library (Hidden Container)
            this.safeClearOutput(this.DOM.rawContainer);
            
            // Forced High 'H' correction level is vital for logo overlays
            const qrCore = new QRCode(this.DOM.rawContainer, {
                text: this.State.payload,
                width: this.State.RESOLUTION,
                height: this.State.RESOLUTION,
                colorDark: "#000000",   // Baseline force for pixel injection
                colorLight: "#ffffff",  
                correctLevel: QRCode.CorrectLevel.H
            });

            // 2. Await library internal canvas rendering
            setTimeout(() => {
                const rawCanvas = this.DOM.rawContainer.querySelector('canvas');
                if (!rawCanvas) return; // Failsafe

                // 3. VGT Master Canvas Pixel Manipulation
                const mCtx = this.DOM.masterCanvas.getContext('2d', { willReadFrequently: true });
                this.DOM.masterCanvas.width = this.State.RESOLUTION;
                this.DOM.masterCanvas.height = this.State.RESOLUTION;

                mCtx.drawImage(rawCanvas, 0, 0);
                
                if (this.State.fg !== '#000000' || this.State.bg !== '#ffffff') {
                    const imgData = mCtx.getImageData(0, 0, this.State.RESOLUTION, this.State.RESOLUTION);
                    const data = imgData.data;
                    
                    const rgbFg = this.hexToRgb(this.State.fg);
                    const rgbBg = this.hexToRgb(this.State.bg);

                    for (let i = 0; i < data.length; i += 4) {
                        // QR pixels generated as strictly black (<128 threshold)
                        if (data[i] < 128) {
                            data[i]     = rgbFg.r;
                            data[i + 1] = rgbFg.g;
                            data[i + 2] = rgbFg.b;
                        } else {
                            data[i]     = rgbBg.r;
                            data[i + 1] = rgbBg.g;
                            data[i + 2] = rgbBg.b;
                        }
                    }
                    mCtx.putImageData(imgData, 0, 0);
                }

                // 4. Logo Injection (Non-Destructive Background Masking)
                if (this.State.logoBlobUrl) {
                    const img = new Image();
                    img.onload = () => {
                        const logoSize = this.State.RESOLUTION * this.State.logoScale;
                        const aspectRatio = img.width / img.height;
                        
                        let drawWidth = logoSize;
                        let drawHeight = logoSize;

                        if (aspectRatio > 1) {
                            drawHeight = logoSize / aspectRatio;
                        } else {
                            drawWidth = logoSize * aspectRatio;
                        }

                        const xPos = (this.State.RESOLUTION - drawWidth) / 2;
                        const yPos = (this.State.RESOLUTION - drawHeight) / 2;

                        // Shielding Pad: White box behind logo to prevent barcode collision
                        mCtx.fillStyle = this.State.bg;
                        const padding = this.State.RESOLUTION * 0.02; // 2% dynamic padding
                        
                        this.roundRect(mCtx, xPos - padding, yPos - padding, drawWidth + padding*2, drawHeight + padding*2, 10);
                        mCtx.fill();

                        // Core Logo
                        mCtx.drawImage(img, xPos, yPos, drawWidth, drawHeight);
                    };
                    img.src = this.State.logoBlobUrl;
                }
            }, 50); 
        },

        // --- HIGH-RES EXPORT ---
        exportMatrix() {
            if (!this.State.payload.trim() || this.State.isRendering) return;

            this.State.isRendering = true;
            this.DOM.btnExport.disabled = true;
            this.injectSVG(this.DOM.btnExport, this.State.svgExportActive, 'Generiere PNG...');

            setTimeout(() => {
                // VGT HARDENING: Native Blob Export for RAM Safety instead of DataURL Strings
                this.DOM.masterCanvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `VGT_Matrix_${new Date().getTime()}.png`;
                    
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    
                    // Revoke memory
                    URL.revokeObjectURL(url);

                    // Reset Button UI
                    this.injectSVG(this.DOM.btnExport, this.State.svgExportNormal, 'Als High-Res PNG speichern');
                    this.DOM.btnExport.disabled = false;
                    this.State.isRendering = false;

                }, 'image/png');
            }, 500); // UI Feedback Delay
        }
    };

    MatrixForgerEngine.init();
});