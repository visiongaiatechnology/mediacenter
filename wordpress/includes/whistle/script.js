/**
 * VGT MEDIACENTER - VISION WHISTLEBLOW LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Canvas Memory Leak Protection & Object Isolation
 * Destroys PDF text layers completely via Canvas Re-Encoding.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-whistle')) return;

    const WhistleBlowEngine = {
        DOM: {},
        State: {
            pdfDoc: null,
            pageNum: 1,
            pageIsRendering: false,
            pageNumPending: null,
            currentScale: 1.5, // Display scale (UI)
            redactions: {},    // { page1: [{rx, ry, rw, rh}], ... }
            isDrawing: false,
            startX: 0,
            startY: 0,
            ctxPdf: null,
            ctxDraw: null,
            originalCopyBtnContent: null
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            this.initPDFWorker();
            console.log('VGT WHISTLEBLOW: Forensic Redaction Engine Active.');
        },

        cacheDOM() {
            this.DOM = {
                modeBtns: document.querySelectorAll('.mode-btn'),
                viewText: document.getElementById('wb-mode-text'),
                viewPdf:  document.getElementById('wb-mode-pdf'),
                
                // Text Mode
                txtInput:   document.getElementById('wb-text-input'),
                txtOutput:  document.getElementById('wb-text-output'),
                txtRegex:   document.getElementById('wb-regex-input'),
                btnCopyTxt: document.getElementById('wb-btn-copy-text'),
                
                // PDF Mode
                pdfDropzone:  document.getElementById('wb-pdf-dropzone'),
                pdfInput:     document.getElementById('wb-pdf-input'),
                pdfWorkspace: document.getElementById('wb-pdf-workspace'),
                
                btnPrev:    document.getElementById('wb-pdf-prev'),
                btnNext:    document.getElementById('wb-pdf-next'),
                lblPageCur: document.getElementById('wb-page-current'),
                lblPageTot: document.getElementById('wb-page-total'),
                
                btnUndo:   document.getElementById('wb-btn-undo'),
                btnClose:  document.getElementById('wb-btn-close-pdf'),
                btnExport: document.getElementById('wb-btn-export'),
                
                canvasLoader: document.getElementById('wb-canvas-loader'),
                pdfCanvas:    document.getElementById('wb-pdf-canvas'),
                drawCanvas:   document.getElementById('wb-draw-canvas'),
                
                progressWrap: document.getElementById('wb-export-progress'),
                progressFill: document.getElementById('wb-progress-fill'),
                progressText: document.getElementById('wb-progress-text')
            };

            if (this.DOM.pdfCanvas && this.DOM.drawCanvas) {
                this.State.ctxPdf  = this.DOM.pdfCanvas.getContext('2d');
                this.State.ctxDraw = this.DOM.drawCanvas.getContext('2d');
            }
            if (this.DOM.btnCopyTxt) {
                // Sichern des originalen DOM-Knotens für sicheres Zurücksetzen ohne innerHTML
                this.State.originalCopyBtnContent = Array.from(this.DOM.btnCopyTxt.childNodes);
            }
        },

        bindEvents() {
            // Mode Switcher
            this.DOM.modeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.modeBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    const mode = e.currentTarget.getAttribute('data-mode');
                    if (mode === 'text') {
                        this.DOM.viewPdf.classList.add('hidden');
                        this.DOM.viewText.classList.remove('hidden');
                    } else {
                        this.DOM.viewText.classList.add('hidden');
                        this.DOM.viewPdf.classList.remove('hidden');
                    }
                });
            });

            // Text Sanitizer Events
            this.DOM.txtInput.addEventListener('input', () => this.sanitizeText());
            this.DOM.txtRegex.addEventListener('input', () => this.sanitizeText());
            this.DOM.btnCopyTxt.addEventListener('click', () => this.copySanitizedText());

            // PDF Ingestion Events
            this.DOM.pdfDropzone.addEventListener('dragover', (e) => { 
                e.preventDefault(); 
                this.DOM.pdfDropzone.classList.add('dragover'); 
            });
            this.DOM.pdfDropzone.addEventListener('dragleave', () => {
                this.DOM.pdfDropzone.classList.remove('dragover');
            });
            this.DOM.pdfDropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.pdfDropzone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.loadPdf(e.dataTransfer.files[0]);
            });
            this.DOM.pdfInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.loadPdf(e.target.files[0]);
            });

            // PDF Control Events
            this.DOM.btnClose.addEventListener('click', () => this.closePdf());
            this.DOM.btnPrev.addEventListener('click', () => {
                if (this.State.pageNum <= 1) return;
                this.State.pageNum--;
                this.queueRenderPage(this.State.pageNum);
            });
            this.DOM.btnNext.addEventListener('click', () => {
                if (this.State.pageNum >= this.State.pdfDoc.numPages) return;
                this.State.pageNum++;
                this.queueRenderPage(this.State.pageNum);
            });
            this.DOM.btnUndo.addEventListener('click', () => {
                if (this.State.redactions[this.State.pageNum] && this.State.redactions[this.State.pageNum].length > 0) {
                    this.State.redactions[this.State.pageNum].pop(); // Entfernt den letzten Zensurblock
                    this.redrawRedactions();
                }
            });

            // Drawing Engine Events
            this.DOM.drawCanvas.addEventListener('mousedown', (e) => this.startDrawing(e));
            this.DOM.drawCanvas.addEventListener('mousemove', (e) => this.draw(e));
            this.DOM.drawCanvas.addEventListener('mouseup',   (e) => this.stopDrawing(e));
            this.DOM.drawCanvas.addEventListener('mouseout',  (e) => { if(this.State.isDrawing) this.stopDrawing(e); });

            // Export Event
            this.DOM.btnExport.addEventListener('click', () => this.initiateExport());
        },

        initPDFWorker() {
            const checkPdfJs = setInterval(() => {
                if (typeof pdfjsLib !== 'undefined') {
                    clearInterval(checkPdfJs);
                    if (typeof vgtCore !== 'undefined') {
                        // Nutze SRI/lokale Pfade statt CDNs für Worker
                        pdfjsLib.GlobalWorkerOptions.workerSrc = vgtCore.assetsUrl + 'pdf.worker.min.js';
                    }
                }
            }, 100);
        },

        // ==========================================
        // TEXT SANITIZER ENGINE
        // ==========================================
        sanitizeText() {
            // Textarea value is safe from HTML execution
            const source = this.DOM.txtInput.value;
            const rawKeys = this.DOM.txtRegex.value.split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            if (rawKeys.length === 0) {
                this.DOM.txtOutput.value = source;
                return;
            }

            let redacted = source;
            rawKeys.forEach(key => {
                // Escaping Control Characters to prevent ReDoS/Regex Crash
                const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`\\b${safeKey}\\b`, 'gi');
                
                redacted = redacted.replace(regex, (match) => {
                    return '█'.repeat(match.length); // Physische Maskierung
                });
            });
            
            this.DOM.txtOutput.value = redacted;
        },

        copySanitizedText() {
            if (!this.DOM.txtOutput.value) return;
            
            this.DOM.txtOutput.select();
            document.execCommand('copy'); // Fallback to execCommand for broad compatibility inside iFrames/Sandboxes
            
            // VGT HARDENING: DOM Manipulation without innerHTML
            this.DOM.btnCopyTxt.textContent = 'Copied!';
            
            setTimeout(() => {
                this.DOM.btnCopyTxt.textContent = '';
                this.State.originalCopyBtnContent.forEach(node => {
                    this.DOM.btnCopyTxt.appendChild(node.cloneNode(true));
                });
            }, 1500);
        },

        // ==========================================
        // PDF INGESTION & RENDERING
        // ==========================================
        loadPdf(file) {
            const ext = file.name.split('.').pop().toLowerCase();
            if (file.type !== 'application/pdf' && ext !== 'pdf') {
                alert("VGT SECURITY BLOCK: Ungültiges Dateiformat. Nur reine PDF-Archive erlaubt.");
                return;
            }

            this.DOM.pdfDropzone.classList.add('hidden');
            this.DOM.pdfWorkspace.classList.remove('hidden');
            this.DOM.canvasLoader.classList.remove('hidden');

            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const typedarray = new Uint8Array(e.target.result);
                
                pdfjsLib.getDocument(typedarray).promise.then(pdf => {
                    this.State.pdfDoc = pdf;
                    this.DOM.lblPageTot.textContent = pdf.numPages; // textContent = XSS Safe
                    this.State.redactions = {}; 
                    this.State.pageNum = 1;
                    this.renderPage(this.State.pageNum);
                }).catch(err => {
                    console.error("VGT PDF PARSE ERROR:", err);
                    alert("Kritischer Fehler beim Dekodieren (Möglicherweise verschlüsselt oder korrupt).");
                    this.closePdf();
                });
            };
            fileReader.readAsArrayBuffer(file);
        },

        closePdf() {
            this.State.pdfDoc = null;
            this.DOM.pdfInput.value = '';
            this.DOM.pdfWorkspace.classList.add('hidden');
            this.DOM.pdfDropzone.classList.remove('hidden');
            // Canvas Clearing for memory
            this.State.ctxPdf.clearRect(0, 0, this.DOM.pdfCanvas.width, this.DOM.pdfCanvas.height);
            this.State.ctxDraw.clearRect(0, 0, this.DOM.drawCanvas.width, this.DOM.drawCanvas.height);
        },

        renderPage(num) {
            this.State.pageIsRendering = true;
            this.DOM.canvasLoader.classList.remove('hidden');

            this.State.pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: this.State.currentScale });
                
                this.DOM.pdfCanvas.height = viewport.height;
                this.DOM.pdfCanvas.width  = viewport.width;
                this.DOM.drawCanvas.height = viewport.height;
                this.DOM.drawCanvas.width  = viewport.width;

                const renderContext = {
                    canvasContext: this.State.ctxPdf,
                    viewport: viewport
                };

                page.render(renderContext).promise.then(() => {
                    this.State.pageIsRendering = false;
                    this.DOM.canvasLoader.classList.add('hidden');
                    
                    this.redrawRedactions();

                    if (this.State.pageNumPending !== null) {
                        this.renderPage(this.State.pageNumPending);
                        this.State.pageNumPending = null;
                    }
                });
            });

            this.DOM.lblPageCur.textContent = num;
            this.DOM.btnPrev.disabled = num <= 1;
            this.DOM.btnNext.disabled = num >= this.State.pdfDoc.numPages;
        },

        queueRenderPage(num) {
            if (this.State.pageIsRendering) {
                this.State.pageNumPending = num;
            } else {
                this.renderPage(num);
            }
        },

        // ==========================================
        // DRAWING ENGINE (REDACTIONS)
        // ==========================================
        startDrawing(e) {
            this.State.isDrawing = true;
            const rect = this.DOM.drawCanvas.getBoundingClientRect();
            this.State.startX = e.clientX - rect.left;
            this.State.startY = e.clientY - rect.top;
        },

        draw(e) {
            if (!this.State.isDrawing) return;
            const rect = this.DOM.drawCanvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            
            const w = currentX - this.State.startX;
            const h = currentY - this.State.startY;

            this.redrawRedactions();
            
            // Visual Preview Block
            this.State.ctxDraw.fillStyle = 'rgba(0, 0, 0, 0.8)'; 
            this.State.ctxDraw.fillRect(this.State.startX, this.State.startY, w, h);
            
            this.State.ctxDraw.strokeStyle = 'rgba(244, 114, 182, 1)'; // Pink Frame
            this.State.ctxDraw.lineWidth = 2;
            this.State.ctxDraw.strokeRect(this.State.startX, this.State.startY, w, h);
        },

        stopDrawing(e) {
            if (!this.State.isDrawing) return;
            this.State.isDrawing = false;
            
            const rect = this.DOM.drawCanvas.getBoundingClientRect();
            const endX = e.clientX - rect.left;
            const endY = e.clientY - rect.top;

            // Berechne RELATIVE Koordinaten (Zero-Trust Skalierung)
            const rw = Math.abs(endX - this.State.startX) / this.DOM.drawCanvas.width;
            const rh = Math.abs(endY - this.State.startY) / this.DOM.drawCanvas.height;
            const rx = Math.min(this.State.startX, endX) / this.DOM.drawCanvas.width;
            const ry = Math.min(this.State.startY, endY) / this.DOM.drawCanvas.height;

            // Mikro-Klicks filtern
            if (rw > 0.01 && rh > 0.01) {
                if (!this.State.redactions[this.State.pageNum]) {
                    this.State.redactions[this.State.pageNum] = [];
                }
                this.State.redactions[this.State.pageNum].push({ rx, ry, rw, rh });
            }

            this.redrawRedactions();
        },

        redrawRedactions() {
            this.State.ctxDraw.clearRect(0, 0, this.DOM.drawCanvas.width, this.DOM.drawCanvas.height);
            const pageReds = this.State.redactions[this.State.pageNum];
            if (!pageReds) return;

            this.State.ctxDraw.fillStyle = '#000000'; // Absolutes Schwarz
            pageReds.forEach(r => {
                const x = r.rx * this.DOM.drawCanvas.width;
                const y = r.ry * this.DOM.drawCanvas.height;
                const w = r.rw * this.DOM.drawCanvas.width;
                const h = r.rh * this.DOM.drawCanvas.height;
                this.State.ctxDraw.fillRect(x, y, w, h);
            });
        },

        // ==========================================
        // FORENSIC EXPORT ENGINE (RASTERIZATION)
        // ==========================================
        async initiateExport() {
            if (!this.State.pdfDoc) return;
            
            this.DOM.btnExport.disabled = true;
            this.DOM.progressWrap.classList.remove('hidden');
            this.DOM.progressFill.style.width = '5%';
            this.DOM.progressText.textContent = "Initialisiere Raster-Engine..."; // textContent = XSS Safe

            try {
                // Check PDF-Lib Injection
                const ensureLibLoaded = setInterval(async () => {
                    if (typeof PDFLib !== 'undefined') {
                        clearInterval(ensureLibLoaded);
                        await this.executeRasterization();
                    }
                }, 100);
            } catch (e) {
                alert("Kritischer System-Fehler beim PDF-Export.");
                this.resetExportUI();
            }
        },

        async executeRasterization() {
            const { PDFDocument } = PDFLib;
            const newPdf = await PDFDocument.create();
            
            const totalPages = this.State.pdfDoc.numPages;
            const renderScale = 2.0; // High Res für Zerstörung der Text-Metadaten

            for (let i = 1; i <= totalPages; i++) {
                this.DOM.progressText.textContent = `Rastere Vektoren von Seite ${i}/${totalPages}...`;
                this.DOM.progressFill.style.width = `${((i - 0.5) / totalPages) * 100}%`;

                // 1. Rendere die PDF-Seite auf ein unsichtbares Canvas
                const page = await this.State.pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: renderScale });
                
                const offscreenCanvas = document.createElement('canvas');
                const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
                offscreenCanvas.width = viewport.width;
                offscreenCanvas.height = viewport.height;

                await page.render({ canvasContext: offCtx, viewport: viewport }).promise;

                // 2. Brenne die Zensurblöcke (Redactions) direkt in die Pixel-Matrix
                if (this.State.redactions[i]) {
                    offCtx.fillStyle = '#000000';
                    this.State.redactions[i].forEach(r => {
                        const x = r.rx * viewport.width;
                        const y = r.ry * viewport.height;
                        const w = r.rw * viewport.width;
                        const h = r.rh * viewport.height;
                        offCtx.fillRect(x, y, w, h);
                    });
                }

                // 3. Destruktive JPG-Kompression: Zerstört jegliche Text/Vector Layer vollständig
                const imgData = offscreenCanvas.toDataURL('image/jpeg', 0.95);
                
                // VGT HARDENING: Memory Leak Protection
                // Leere das Canvas manuell aus, bevor der Garbage Collector aufräumt
                offCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
                offscreenCanvas.width = 0;
                offscreenCanvas.height = 0;

                // 4. Einbettung der abgeflachten Pixel in das finale, forensisch sichere PDF
                const jpgImage = await newPdf.embedJpg(imgData);
                const newPage = newPdf.addPage([viewport.width, viewport.height]);
                newPage.drawImage(jpgImage, {
                    x: 0,
                    y: 0,
                    width: viewport.width,
                    height: viewport.height,
                });

                this.DOM.progressFill.style.width = `${(i / totalPages) * 100}%`;
                this.DOM.progressText.textContent = `Rendere & zerstöre Text-Layer: Seite ${i} von ${totalPages}...`;
                await new Promise(r => requestAnimationFrame(r));
            }

            // 5. Finalisierung
            this.DOM.progressText.textContent = "Kompiliere sicheres Master-File...";
            const pdfBytes = await newPdf.save();
            
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `VGT_Classified_Redacted_${new Date().getTime()}.pdf`;
            document.body.appendChild(a);
            a.click();
            
            // VGT HARDENING: Blob-URL sofort zerstören (RAM-Sicherheit)
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.DOM.progressText.textContent = "Export erfolgreich! Text-Layer physisch zerstört.";
            setTimeout(() => this.resetExportUI(), 3000);
        },

        resetExportUI() {
            this.DOM.progressWrap.classList.add('hidden');
            this.DOM.btnExport.disabled = false;
        }
    };

    WhistleBlowEngine.init();
});