/**
 * VGT MEDIACENTER - CHROMATIC ENGINE LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Native Rendering & Object Encapsulation
 * 100% Native Color Math (Hex/RGB/HSL), Real-Time Canvas Extraction & WCAG Contrast.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-color')) return;

    const ChromaticEngine = {
        DOM: {},
        State: {
            currentHSL: { h: 217, s: 90, l: 60 }, // Default VGT Blue
            ctxExtract: null,
            extractImg: new Image(),
            originalCopyBtnContents: {},
            
            // XSS Safe SVG Cache
            svgCopyCheck: '<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:rgba(var(--c-teal),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        },

        init() {
            this.cacheDOM();
            this.setupCanvas();
            this.bindEvents();
            this.updateSynthesisUI();
            console.log('VGT CHROMATIC ENGINE: Spectral Analysis Matrix Active.');
        },

        cacheDOM() {
            this.DOM = {
                modeTabs: document.querySelectorAll('.mode-tab'),
                viewSynth: document.getElementById('workspace-synth'),
                viewExtract: document.getElementById('workspace-extract'),
                
                // --- Synthesis Mode ---
                masterSwatch: document.getElementById('ce-master-swatch'),
                nativePicker: document.getElementById('ce-native-picker'),
                btnPicker: document.getElementById('btn-picker-trigger'),
                
                valHex: document.getElementById('ce-val-hex'),
                valRgb: document.getElementById('ce-val-rgb'),
                valHsl: document.getElementById('ce-val-hsl'),
                btnCopySmall: document.querySelectorAll('.btn-copy-small'),
                
                sliderH: document.getElementById('ce-slider-h'),
                sliderS: document.getElementById('ce-slider-s'),
                sliderL: document.getElementById('ce-slider-l'),
                lblH: document.getElementById('lbl-h'),
                lblS: document.getElementById('lbl-s'),
                lblL: document.getElementById('lbl-l'),
                
                cbWhite: document.getElementById('cb-white'),
                cbBlack: document.getElementById('cb-black'),
                ctWhite: document.getElementById('ct-white'),
                ctBlack: document.getElementById('ct-black'),
                badgeWhiteAa: document.getElementById('cb-white-aa'),
                badgeWhiteAaa: document.getElementById('cb-white-aaa'),
                badgeBlackAa: document.getElementById('cb-black-aa'),
                badgeBlackAaa: document.getElementById('cb-black-aaa'),
                lblRatio: document.getElementById('ce-contrast-ratio'),
                
                harmComp: document.getElementById('harm-comp'),
                harmAnalog: document.getElementById('harm-analog'),
                harmTriad: document.getElementById('harm-triad'),
                harmSplit: document.getElementById('harm-split'),

                // --- Extractor Mode ---
                dropzone: document.getElementById('ce-dropzone'),
                fileInput: document.getElementById('ce-file-input'),
                extractWorkspace: document.getElementById('ce-extractor-workspace'),
                btnResetExtract: document.getElementById('btn-reset-extract'),
                
                canvasWrap: document.getElementById('ce-canvas-wrap'),
                canvas: document.getElementById('ce-image-canvas'),
                crosshair: document.getElementById('ce-crosshair'),
                
                pickedSwatch: document.getElementById('ce-picked-color'),
                pickedHex: document.getElementById('ce-picked-hex'),
                domPalette: document.getElementById('ce-dominant-palette'),
                domStatus: document.getElementById('ce-dom-status')
            };

            // Sicherung der originalen Button-Nodes für XSS-sicheres Kopier-Feedback
            if (this.DOM.btnCopySmall) {
                this.DOM.btnCopySmall.forEach((btn, idx) => {
                    btn.setAttribute('data-btn-id', idx);
                    this.State.originalCopyBtnContents[idx] = Array.from(btn.childNodes).map(n => n.cloneNode(true));
                });
            }
        },

        setupCanvas() {
            if (this.DOM.canvas) {
                this.State.ctxExtract = this.DOM.canvas.getContext('2d', { willReadFrequently: true });
            }
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            if (!element) return;
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString) {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) {
                element.appendChild(svgNode);
            }
        },

        // ==========================================
        // MATH ENGINES (RGB <-> HSL <-> HEX)
        // ==========================================
        hslToRgb(h, s, l) {
            s /= 100; l /= 100;
            const k = n => (n + h / 30) % 12;
            const a = s * Math.min(l, 1 - l);
            const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
            return {
                r: Math.round(255 * f(0)),
                g: Math.round(255 * f(8)),
                b: Math.round(255 * f(4))
            };
        },

        rgbToHex(r, g, b) {
            r = Math.max(0, Math.min(255, Math.round(r)));
            g = Math.max(0, Math.min(255, Math.round(g)));
            b = Math.max(0, Math.min(255, Math.round(b)));
            return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
        },

        hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        },

        rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const l = Math.max(r, g, b);
            const s = l - Math.min(r, g, b);
            const h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
            return {
                h: Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
                s: Math.round(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
                l: Math.round((100 * (2 * l - s)) / 2)
            };
        },

        getLuminance(r, g, b) {
            const a = [r, g, b].map((v) => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
        },

        getContrastRatio(rgb1, rgb2) {
            const lum1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
            const lum2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);
            const brightest = Math.max(lum1, lum2);
            const darkest = Math.min(lum1, lum2);
            return (brightest + 0.05) / (darkest + 0.05);
        },

        // ==========================================
        // SYNTHESIS ENGINE
        // ==========================================
        updateSynthesisUI() {
            const rgb = this.hslToRgb(this.State.currentHSL.h, this.State.currentHSL.s, this.State.currentHSL.l);
            const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);

            if (this.DOM.masterSwatch) this.DOM.masterSwatch.style.backgroundColor = hex;
            if (this.DOM.nativePicker) this.DOM.nativePicker.value = hex;

            if (document.activeElement !== this.DOM.valHex && this.DOM.valHex) this.DOM.valHex.value = hex;
            if (document.activeElement !== this.DOM.valRgb && this.DOM.valRgb) this.DOM.valRgb.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            if (document.activeElement !== this.DOM.valHsl && this.DOM.valHsl) this.DOM.valHsl.value = `hsl(${this.State.currentHSL.h}, ${this.State.currentHSL.s}%, ${this.State.currentHSL.l}%)`;

            if (this.DOM.sliderH) this.DOM.sliderH.value = this.State.currentHSL.h;
            if (this.DOM.sliderS) this.DOM.sliderS.value = this.State.currentHSL.s;
            if (this.DOM.sliderL) this.DOM.sliderL.value = this.State.currentHSL.l;
            if (this.DOM.lblH) this.DOM.lblH.textContent = `${this.State.currentHSL.h}°`; // Safe text assignment
            if (this.DOM.lblS) this.DOM.lblS.textContent = `${this.State.currentHSL.s}%`;
            if (this.DOM.lblL) this.DOM.lblL.textContent = `${this.State.currentHSL.l}%`;

            if (this.DOM.sliderS) this.DOM.sliderS.style.background = `linear-gradient(to right, hsl(${this.State.currentHSL.h}, 0%, ${this.State.currentHSL.l}%), hsl(${this.State.currentHSL.h}, 100%, ${this.State.currentHSL.l}%))`;
            if (this.DOM.sliderL) this.DOM.sliderL.style.background = `linear-gradient(to right, hsl(${this.State.currentHSL.h}, ${this.State.currentHSL.s}%, 0%), hsl(${this.State.currentHSL.h}, ${this.State.currentHSL.s}%, 50%), hsl(${this.State.currentHSL.h}, ${this.State.currentHSL.s}%, 100%))`;

            const ratioWhite = this.getContrastRatio(rgb, {r:255, g:255, b:255});
            const ratioBlack = this.getContrastRatio(rgb, {r:0, g:0, b:0});
            
            if (this.DOM.ctWhite) this.DOM.ctWhite.style.color = hex;
            if (this.DOM.ctBlack) this.DOM.ctBlack.style.color = hex;
            
            if (this.DOM.badgeWhiteAa)  this.DOM.badgeWhiteAa.className  = `c-badge ${ratioWhite >= 4.5 ? 'pass' : 'fail'}`;
            if (this.DOM.badgeWhiteAaa) this.DOM.badgeWhiteAaa.className = `c-badge ${ratioWhite >= 7.0 ? 'pass' : 'fail'}`;
            if (this.DOM.badgeBlackAa)  this.DOM.badgeBlackAa.className  = `c-badge ${ratioBlack >= 4.5 ? 'pass' : 'fail'}`;
            if (this.DOM.badgeBlackAaa) this.DOM.badgeBlackAaa.className = `c-badge ${ratioBlack >= 7.0 ? 'pass' : 'fail'}`;

            if (this.DOM.lblRatio) this.DOM.lblRatio.textContent = `W-Ratio: ${ratioWhite.toFixed(2)}`;

            this.renderHarmonies();
        },

        buildSwatchNode(hue) {
            const nh = hue % 360;
            const rgb = this.hslToRgb(nh, this.State.currentHSL.s, this.State.currentHSL.l);
            const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
            
            const div = document.createElement('div');
            div.className = 'h-swatch';
            div.style.backgroundColor = hex;
            div.setAttribute('data-hex', hex);
            
            div.addEventListener('click', (e) => {
                navigator.clipboard.writeText(hex);
                div.style.transform = 'scale(0.9)';
                setTimeout(() => div.style.transform = 'scale(1)', 150);
            });
            
            return div;
        },

        renderHarmonies() {
            const h = this.State.currentHSL.h;

            if (this.DOM.harmComp) {
                this.safeClearOutput(this.DOM.harmComp);
                this.DOM.harmComp.appendChild(this.buildSwatchNode(h));
                this.DOM.harmComp.appendChild(this.buildSwatchNode(h + 180));
            }
            if (this.DOM.harmAnalog) {
                this.safeClearOutput(this.DOM.harmAnalog);
                this.DOM.harmAnalog.appendChild(this.buildSwatchNode(h + 330));
                this.DOM.harmAnalog.appendChild(this.buildSwatchNode(h));
                this.DOM.harmAnalog.appendChild(this.buildSwatchNode(h + 30));
            }
            if (this.DOM.harmTriad) {
                this.safeClearOutput(this.DOM.harmTriad);
                this.DOM.harmTriad.appendChild(this.buildSwatchNode(h));
                this.DOM.harmTriad.appendChild(this.buildSwatchNode(h + 120));
                this.DOM.harmTriad.appendChild(this.buildSwatchNode(h + 240));
            }
            if (this.DOM.harmSplit) {
                this.safeClearOutput(this.DOM.harmSplit);
                this.DOM.harmSplit.appendChild(this.buildSwatchNode(h));
                this.DOM.harmSplit.appendChild(this.buildSwatchNode(h + 150));
                this.DOM.harmSplit.appendChild(this.buildSwatchNode(h + 210));
            }
        },

        // ==========================================
        // EXTRACTOR ENGINE (Image Analysis)
        // ==========================================
        handleExtractFile(file) {
            if (!file.type.startsWith('image/')) {
                return alert("VGT SECURITY BLOCK: Nur reine Bilddateien erlaubt.");
            }
            
            if (this.DOM.dropzone) this.DOM.dropzone.classList.add('hidden');
            if (this.DOM.extractWorkspace) this.DOM.extractWorkspace.classList.remove('hidden');
            
            if (this.DOM.domStatus) {
                this.DOM.domStatus.textContent = "Extrahiere Pixel...";
                this.DOM.domStatus.className = "status-badge";
            }
            
            const url = URL.createObjectURL(file);
            this.State.extractImg.onload = () => {
                if (this.DOM.canvas && this.State.ctxExtract) {
                    this.DOM.canvas.width = this.State.extractImg.width;
                    this.DOM.canvas.height = this.State.extractImg.height;
                    this.State.ctxExtract.drawImage(this.State.extractImg, 0, 0);
                }
                
                setTimeout(() => this.calculateDominantPalette(), 50); 
                URL.revokeObjectURL(url); // Verhindert RAM Leaks
            };
            this.State.extractImg.src = url;
        },

        calculateDominantPalette() {
            if (!this.State.extractImg.width || !this.DOM.domPalette) return;

            const offCanvas = document.createElement('canvas');
            const offCtx = offCanvas.getContext('2d');
            const maxSize = 150; // Performance Resize (Downsampling)
            let w = this.State.extractImg.width;
            let h = this.State.extractImg.height;
            
            if (w > h) {
                if (w > maxSize) { h *= maxSize / w; w = maxSize; }
            } else {
                if (h > maxSize) { w *= maxSize / h; h = maxSize; }
            }
            
            offCanvas.width = Math.round(w);
            offCanvas.height = Math.round(h);
            offCtx.drawImage(this.State.extractImg, 0, 0, offCanvas.width, offCanvas.height);
            
            const imgData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height).data;
            const colorCounts = {};
            let totalPixels = 0;

            const bucketSize = 32;

            for (let i = 0; i < imgData.length; i += 4) {
                if (imgData[i+3] < 128) continue; // Ignore transparent
                
                const r = Math.round(imgData[i] / bucketSize) * bucketSize;
                const g = Math.round(imgData[i+1] / bucketSize) * bucketSize;
                const b = Math.round(imgData[i+2] / bucketSize) * bucketSize;
                
                const key = `${r},${g},${b}`;
                colorCounts[key] = (colorCounts[key] || 0) + 1;
                totalPixels++;
            }

            const sortedColors = Object.entries(colorCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5); // Top 5

            // VGT HARDENING: Native DOM Assembly statt innerHTML Concatenation
            const frag = document.createDocumentFragment();

            sortedColors.forEach(([rgbStr, count]) => {
                const parts = rgbStr.split(',');
                const hex = this.rgbToHex(parseInt(parts[0], 10), parseInt(parts[1], 10), parseInt(parts[2], 10));
                const pct = ((count / totalPixels) * 100).toFixed(1);
                
                const row = document.createElement('div');
                row.className = 'dom-row';
                row.setAttribute('data-hex', hex);
                
                const domColor = document.createElement('div');
                domColor.className = 'dom-color';
                domColor.style.backgroundColor = hex;
                
                const domMeta = document.createElement('div');
                domMeta.className = 'dom-meta';
                
                const spanHex = document.createElement('span');
                spanHex.className = 'dom-hex';
                spanHex.textContent = hex; // XSS Safe
                
                const spanPct = document.createElement('span');
                spanPct.className = 'dom-percent';
                spanPct.textContent = `${pct}% Abdeckung`;
                
                domMeta.appendChild(spanHex);
                domMeta.appendChild(spanPct);
                row.appendChild(domColor);
                row.appendChild(domMeta);
                
                row.addEventListener('click', (e) => {
                    navigator.clipboard.writeText(e.currentTarget.getAttribute('data-hex'));
                    if (this.DOM.domStatus) {
                        this.DOM.domStatus.textContent = "Kopiert!";
                        setTimeout(() => { 
                            if (this.DOM.domStatus) this.DOM.domStatus.textContent = "Palette generiert"; 
                        }, 1000);
                    }
                });

                frag.appendChild(row);
            });

            this.safeClearOutput(this.DOM.domPalette);
            this.DOM.domPalette.appendChild(frag);
            
            if (this.DOM.domStatus) this.DOM.domStatus.textContent = "Palette generiert";
        },

        // ==========================================
        // BINDINGS & EVENT DELEGATION
        // ==========================================
        bindEvents() {
            // Tab Switching
            this.DOM.modeTabs?.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    this.DOM.modeTabs.forEach(t => t.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    if (e.currentTarget.dataset.mode === 'synth') {
                        if(this.DOM.viewExtract) {
                            this.DOM.viewExtract.classList.remove('active-workspace');
                            this.DOM.viewExtract.classList.add('hidden');
                        }
                        if(this.DOM.viewSynth) {
                            this.DOM.viewSynth.classList.remove('hidden');
                            this.DOM.viewSynth.classList.add('active-workspace');
                        }
                    } else {
                        if(this.DOM.viewSynth) {
                            this.DOM.viewSynth.classList.remove('active-workspace');
                            this.DOM.viewSynth.classList.add('hidden');
                        }
                        if(this.DOM.viewExtract) {
                            this.DOM.viewExtract.classList.remove('hidden');
                            this.DOM.viewExtract.classList.add('active-workspace');
                        }
                    }
                });
            });

            // Synthesis Inputs
            if (this.DOM.btnPicker) this.DOM.btnPicker.addEventListener('click', () => this.DOM.nativePicker?.click());
            if (this.DOM.nativePicker) {
                this.DOM.nativePicker.addEventListener('input', (e) => {
                    const rgb = this.hexToRgb(e.target.value);
                    if (rgb) {
                        this.State.currentHSL = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
                        this.updateSynthesisUI();
                    }
                });
            }

            [this.DOM.sliderH, this.DOM.sliderS, this.DOM.sliderL].forEach(slider => {
                if (slider) {
                    slider.addEventListener('input', () => {
                        this.State.currentHSL.h = parseInt(this.DOM.sliderH.value, 10);
                        this.State.currentHSL.s = parseInt(this.DOM.sliderS.value, 10);
                        this.State.currentHSL.l = parseInt(this.DOM.sliderL.value, 10);
                        this.updateSynthesisUI();
                    });
                }
            });

            // Copy Feedback System (XSS Safe Injection)
            if (this.DOM.btnCopySmall) {
                this.DOM.btnCopySmall.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const input = document.getElementById(btn.getAttribute('data-target'));
                        if (input) {
                            input.select();
                            document.execCommand('copy');
                            
                            this.injectSVG(btn, this.State.svgCopyCheck);
                            
                            setTimeout(() => {
                                this.safeClearOutput(btn);
                                const btnId = btn.getAttribute('data-btn-id');
                                if (this.State.originalCopyBtnContents[btnId]) {
                                    this.State.originalCopyBtnContents[btnId].forEach(node => {
                                        btn.appendChild(node.cloneNode(true));
                                    });
                                }
                            }, 1500);
                        }
                    });
                });
            }

            // Extractor Ingestion
            window.addEventListener('dragover', (e) => {
                if (this.DOM.viewExtract && this.DOM.viewExtract.classList.contains('active-workspace')) {
                    e.preventDefault();
                    if (this.DOM.dropzone) this.DOM.dropzone.classList.add('dragover');
                }
            });
            
            window.addEventListener('drop', (e) => {
                if (this.DOM.viewExtract && this.DOM.viewExtract.classList.contains('active-workspace')) {
                    e.preventDefault();
                    if (this.DOM.dropzone) this.DOM.dropzone.classList.remove('dragover');
                    if (e.dataTransfer?.files.length) {
                        this.handleExtractFile(e.dataTransfer.files[0]);
                    }
                }
            });

            window.addEventListener('dragleave', (e) => {
                if (e.target === document.documentElement || e.clientX === 0 || e.clientY === 0) {
                    if (this.DOM.dropzone) this.DOM.dropzone.classList.remove('dragover');
                }
            });

            if (this.DOM.dropzone) this.DOM.dropzone.addEventListener('click', () => this.DOM.fileInput?.click());
            if (this.DOM.canvasWrap) this.DOM.canvasWrap.addEventListener('click', () => this.DOM.fileInput?.click());
            
            if (this.DOM.fileInput) {
                this.DOM.fileInput.addEventListener('change', (e) => {
                    if (e.target.files.length) this.handleExtractFile(e.target.files[0]);
                    this.DOM.fileInput.value = '';
                });
            }

            if (this.DOM.btnResetExtract) {
                this.DOM.btnResetExtract.addEventListener('click', () => {
                    if (this.DOM.extractWorkspace) this.DOM.extractWorkspace.classList.add('hidden');
                    if (this.DOM.dropzone) this.DOM.dropzone.classList.remove('hidden');
                });
            }

            // Extractor Pipette
            if (this.DOM.canvasWrap && this.DOM.canvas) {
                // VGT FIX: Event-Listener auf den Wrapper legen, damit das Kreuz 
                // den gesamten Bereich abdeckt und nicht nur das Bild
                this.DOM.canvasWrap.addEventListener('mousemove', (e) => {
                    if (!this.State.ctxExtract) return;
                    
                    const wrapRect = this.DOM.canvasWrap.getBoundingClientRect();
                    const canvasRect = this.DOM.canvas.getBoundingClientRect();

                    // 1. Visuelles Fadenkreuz (Relativ zum Container/Wrapper positionieren)
                    if (this.DOM.crosshair) {
                        const visualX = e.clientX - wrapRect.left;
                        const visualY = e.clientY - wrapRect.top;
                        
                        this.DOM.crosshair.style.left = `${visualX}px`;
                        this.DOM.crosshair.style.top = `${visualY}px`;
                        // Fixiert die exakte Mitte des Fadenkreuzes auf die Mausspitze
                        this.DOM.crosshair.style.transform = 'translate(-50%, -50%)'; 
                        this.DOM.crosshair.classList.remove('hidden');
                    }

                    // 2. Mathematische Pixel-Extraktion (Nur wenn die Maus wirklich über dem Bild ist)
                    if (e.clientX >= canvasRect.left && e.clientX <= canvasRect.right &&
                        e.clientY >= canvasRect.top && e.clientY <= canvasRect.bottom) {
                        
                        const scaleX = this.DOM.canvas.width / canvasRect.width;
                        const scaleY = this.DOM.canvas.height / canvasRect.height;
                        const x = (e.clientX - canvasRect.left) * scaleX;
                        const y = (e.clientY - canvasRect.top) * scaleY;

                        try {
                            const pixel = this.State.ctxExtract.getImageData(x, y, 1, 1).data;
                            const hex = this.rgbToHex(pixel[0], pixel[1], pixel[2]);
                            
                            if (this.DOM.pickedSwatch) this.DOM.pickedSwatch.style.backgroundColor = hex;
                            if (this.DOM.pickedHex) this.DOM.pickedHex.value = hex;
                        } catch(err) {
                            // Handle cross-origin taint silently
                        }
                    }
                });

                this.DOM.canvasWrap.addEventListener('mouseleave', () => {
                    if (this.DOM.crosshair) this.DOM.crosshair.classList.add('hidden');
                });
            }
        }
    };

    ChromaticEngine.init();
});