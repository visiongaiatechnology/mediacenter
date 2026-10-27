/**
 * VGT MEDIACENTER - DOCUMENT SHATTER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Advanced GC (Garbage Collection) & Object Isolation
 * O(n) Array Parsing and Local Buffer Extraction via pdf-lib.
 * Real-Time Visual Page Matrix Rendering with PDF.js Thumbnails.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-pdfsplit')) return;

    const DocumentShatterEngine = {
        DOM: {},
        State: {
            currentPdfLibDoc: null,
            currentPdfJsDoc: null,
            originalFileName: '',
            totalPages: 0,
            activeIndices: [],
            MAX_RENDER_PAGES: 200 // Verhindert RAM-Crash bei extrem großen PDFs
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('ps-dropzone'),
                fileInput: document.getElementById('ps-file-input'),
                workspace: document.getElementById('ps-workspace'),
                btnReset: document.getElementById('ps-btn-reset'),
                
                metaName: document.getElementById('ps-meta-name'),
                metaPages: document.getElementById('ps-meta-pages'),
                
                inputRange: document.getElementById('ps-range-input'),
                extractCount: document.getElementById('ps-extract-count'),
                matrixGrid: document.getElementById('ps-matrix-grid'),
                
                btnExtract: document.getElementById('ps-btn-extract'),
                btnText: document.getElementById('ps-btn-text'),
                
                progressWrap: document.getElementById('ps-encode-progress'),
                progressFill: document.getElementById('encode-fill'),
                progressText: document.getElementById('encode-text')
            };
        },

        waitForDependencies() {
            const checkPdfJs = setInterval(() => {
                if (typeof pdfjsLib !== 'undefined' && typeof PDFLib !== 'undefined') {
                    clearInterval(checkPdfJs);
                    if (typeof vgtCore !== 'undefined') {
                        // Nutze lokale Pfade für Worker (SRI-kompatibel)
                        pdfjsLib.GlobalWorkerOptions.workerSrc = vgtCore.assetsUrl + 'pdf.worker.min.js';
                    }
                    this.bindEvents();
                    console.log('VGT DOCUMENT SHATTER: Extractor Engine initialized.');
                }
            }, 100);
        },

        bindEvents() {
            // Dropzone Ingestion
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
                if (e.dataTransfer.files.length) this.handlePdf(e.dataTransfer.files[0]);
            });
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handlePdf(e.target.files[0]);
            });

            // UI Actions
            this.DOM.btnReset.addEventListener('click', () => this.resetTool());
            this.DOM.inputRange.addEventListener('input', () => this.parseInputRange());
            this.DOM.btnExtract.addEventListener('click', () => this.executeExtraction());
        },

        // --- MEMORY & DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        resetTool() {
            // Memory Cleanup (Garbage Collection Enforcement)
            if (this.State.currentPdfJsDoc) {
                this.State.currentPdfJsDoc.destroy();
            }
            this.State.currentPdfLibDoc = null;
            this.State.currentPdfJsDoc = null;
            this.State.originalFileName = '';
            this.State.totalPages = 0;
            this.State.activeIndices = [];
            
            // UI Reset
            this.DOM.fileInput.value = '';
            this.DOM.inputRange.value = '';
            this.DOM.extractCount.textContent = '0';
            this.safeClearOutput(this.DOM.matrixGrid);
            
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.btnExtract.disabled = true;
        },

        // --- CORE INGESTION ---
        async handlePdf(file) {
            if (file.type !== 'application/pdf') {
                alert("VGT SECURITY BLOCK: Nur reine PDF-Archive erlaubt.");
                return;
            }

            this.resetTool(); // Flush memory vor neuem Load

            this.State.originalFileName = file.name;
            this.DOM.metaName.textContent = this.State.originalFileName; // XSS Safe
            this.DOM.metaPages.textContent = "Dekodiere Vektoren...";
            
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');

            try {
                const arrayBuffer = await file.arrayBuffer();
                
                // 1. Engine for Extraction (PDF-Lib)
                this.State.currentPdfLibDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                this.State.totalPages = this.State.currentPdfLibDoc.getPageCount();
                
                // 2. Engine for Previews (PDF.js)
                const typedarray = new Uint8Array(arrayBuffer);
                this.State.currentPdfJsDoc = await pdfjsLib.getDocument(typedarray).promise;
                
                this.DOM.metaPages.textContent = `${this.State.totalPages} Seiten`;
                
                this.buildVisualMatrix();
                this.renderAllThumbnails();

            } catch (err) {
                console.error("VGT PDF PARSE ERROR:", err);
                alert("Dokument konnte nicht analysiert werden. Möglicherweise passwortgeschützt oder defekt.");
                this.resetTool();
            }
        },

        // --- VISUAL MATRIX ENGINE ---
        buildVisualMatrix() {
            const frag = document.createDocumentFragment();
            // Limit thumbnail rendering to prevent DOM/Memory crash
            const displayCount = Math.min(this.State.totalPages, this.State.MAX_RENDER_PAGES);

            for (let i = 1; i <= displayCount; i++) {
                // VGT DOM HARDENING: Strict Native Creation (No innerHTML)
                const block = document.createElement('div');
                block.className = 'page-block';
                block.id = `pb-${i}`;
                
                const skeleton = document.createElement('div');
                skeleton.className = 'thumb-skeleton';
                
                const canvas = document.createElement('canvas');
                canvas.id = `canvas-p-${i}`;
                
                const badge = document.createElement('span');
                badge.className = 'page-num-badge';
                badge.textContent = i;
                
                const indicator = document.createElement('div');
                indicator.className = 'selection-indicator';
                
                block.appendChild(skeleton);
                block.appendChild(canvas);
                block.appendChild(badge);
                block.appendChild(indicator);
                
                block.addEventListener('click', () => this.togglePageFromMatrix(i));
                frag.appendChild(block);
            }

            this.safeClearOutput(this.DOM.matrixGrid);
            this.DOM.matrixGrid.appendChild(frag);

            if (this.State.totalPages > this.State.MAX_RENDER_PAGES) {
                const warning = document.createElement('div');
                warning.style.gridColumn = '1 / -1';
                warning.style.padding = '10px';
                warning.style.color = 'var(--vg-text-muted)';
                warning.style.textAlign = 'center';
                warning.style.fontSize = '12px';
                warning.textContent = `Aus RAM-Sicherheitsgründen werden nur die ersten ${this.State.MAX_RENDER_PAGES} Thumbnails gerendert. Über das Terminal können alle ${this.State.totalPages} Seiten ausgewählt werden.`;
                this.DOM.matrixGrid.appendChild(warning);
            }
        },

        async renderAllThumbnails() {
            if (!this.State.currentPdfJsDoc) return;
            
            const displayCount = Math.min(this.State.totalPages, this.State.MAX_RENDER_PAGES);
            
            for (let i = 1; i <= displayCount; i++) {
                if (!this.State.currentPdfJsDoc) break; // Check for early reset
                
                try {
                    await this.renderThumbnail(i);
                } catch (e) {
                    console.warn(`VGT RENDER WARNING: Could not render thumbnail for page ${i}`, e);
                }
            }
        },

        async renderThumbnail(pageNum) {
            const page = await this.State.currentPdfJsDoc.getPage(pageNum);
            const canvas = document.getElementById(`canvas-p-${pageNum}`);
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Low-Res Rendering (RAM Optimization)
            const viewport = page.getViewport({ scale: 0.3 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            await page.render(renderContext).promise;
            
            // UI Update
            const block = document.getElementById(`pb-${pageNum}`);
            if (block) {
                const skeleton = block.querySelector('.thumb-skeleton');
                if(skeleton) skeleton.remove();
                canvas.classList.add('ready');
            }
        },

        // --- SELECTION TERMINAL ENGINE ---
        togglePageFromMatrix(pageNum) {
            let currentVal = this.DOM.inputRange.value.trim();
            const pageStr = pageNum.toString();
            
            // Escaped string replacement
            const regex = new RegExp(`\\b${pageStr}\\b`, 'g');
            
            if (regex.test(currentVal)) {
                // Remove
                currentVal = currentVal.replace(regex, '').replace(/,,/g, ',').replace(/^,|,$/g, '').trim();
            } else {
                // Add
                currentVal = currentVal ? `${currentVal}, ${pageNum}` : `${pageNum}`;
            }
            
            // Cleanup commas
            currentVal = currentVal.split(',').map(s => s.trim()).filter(s => s.length > 0).join(', ');
            this.DOM.inputRange.value = currentVal;
            
            this.parseInputRange();
        },

        parseInputRange() {
            const raw = this.DOM.inputRange.value;
            this.State.activeIndices = []; 

            if (!raw.trim()) {
                this.updateMatrixUI();
                return;
            }

            // Safe parsing of numbers and ranges
            const parts = raw.split(',');
            
            parts.forEach(part => {
                const cleanPart = part.trim();
                if (!cleanPart) return;

                if (cleanPart.includes('-')) {
                    const range = cleanPart.split('-');
                    if (range.length === 2) {
                        const start = parseInt(range[0], 10);
                        const end = parseInt(range[1], 10);
                        if (!isNaN(start) && !isNaN(end) && start > 0 && end <= this.State.totalPages && start <= end) {
                            for (let i = start; i <= end; i++) this.State.activeIndices.push(i - 1);
                        }
                    }
                } else {
                    const num = parseInt(cleanPart, 10);
                    if (!isNaN(num) && num > 0 && num <= this.State.totalPages) {
                        this.State.activeIndices.push(num - 1);
                    }
                }
            });

            this.updateMatrixUI();
        },

        updateMatrixUI() {
            // Reset Blocks natively
            document.querySelectorAll('.page-block').forEach(b => {
                b.classList.remove('active');
                const orderBadge = b.querySelector('.selection-order');
                if (orderBadge) orderBadge.remove();
            });

            this.State.activeIndices.forEach((zeroIndex, seqOrder) => {
                const pageNum = zeroIndex + 1;
                const block = document.getElementById(`pb-${pageNum}`);
                
                if (block) {
                    block.classList.add('active');
                    let orderBadge = block.querySelector('.selection-order');
                    if (!orderBadge) {
                        orderBadge = document.createElement('div');
                        orderBadge.className = 'selection-order';
                        block.appendChild(orderBadge);
                    }
                    orderBadge.textContent = seqOrder + 1;
                }
            });

            this.DOM.extractCount.textContent = this.State.activeIndices.length;
            this.DOM.btnExtract.disabled = this.State.activeIndices.length === 0;
        },

        // --- EXECUTION ENGINE ---
        async executeExtraction() {
            if (!this.State.currentPdfLibDoc || this.State.activeIndices.length === 0) return;

            this.DOM.btnExtract.disabled = true;
            this.DOM.progressWrap.classList.remove('hidden');
            this.DOM.progressFill.style.width = '10%';
            this.DOM.progressText.textContent = "Initialisiere Nexus-Matrix...";

            try {
                const { PDFDocument } = PDFLib;
                const newPdf = await PDFDocument.create();
                
                this.DOM.progressFill.style.width = '40%';
                this.DOM.progressText.textContent = "Kopiere Vektor-Layer...";

                const copiedPages = await newPdf.copyPages(this.State.currentPdfLibDoc, this.State.activeIndices);
                copiedPages.forEach((page) => newPdf.addPage(page));

                this.DOM.progressFill.style.width = '80%';
                this.DOM.progressText.textContent = "Kompiliere Master-File...";

                const pdfBytes = await newPdf.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                
                const baseName = this.State.originalFileName.replace(/\.[^/.]+$/, "");
                
                // FileSaver.js Call
                if (typeof saveAs === 'function') {
                    saveAs(blob, `${baseName}_vgt_extract.pdf`);
                } else {
                    // Fallback
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = `${baseName}_vgt_extract.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }

                this.DOM.progressFill.style.width = '100%';
                this.DOM.progressText.textContent = "Export erfolgreich!";

                setTimeout(() => {
                    this.DOM.progressWrap.classList.add('hidden');
                    this.DOM.btnExtract.disabled = false;
                }, 2000);

            } catch (err) {
                console.error("VGT EXTRACTION ERROR:", err);
                alert("Kritischer Fehler bei der PDF-Sektion. Dokument ist möglicherweise defekt.");
                this.DOM.progressWrap.classList.add('hidden');
                this.DOM.btnExtract.disabled = false;
            }
        }
    };

    DocumentShatterEngine.init();
});