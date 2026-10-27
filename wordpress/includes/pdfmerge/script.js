/**
 * VGT MEDIACENTER - NEXUS BINDER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Object Encapsulation & Secure Drag-and-Drop
 * Local PDF manipulation using pdf-lib.js in O(n) linear buffer mapping.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-pdfmerge')) return;

    const NexusBinderEngine = {
        DOM: {},
        State: {
            pdfFiles: [], // Array of File objects
            draggedIndex: null
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('pm-dropzone'),
                fileInput: document.getElementById('pm-file-input'),
                workspace: document.getElementById('pm-workspace'),
                fileList: document.getElementById('pm-file-list'),
                fileCount: document.getElementById('pm-file-count'),
                btnClear: document.getElementById('pm-btn-clear'),
                btnMerge: document.getElementById('pm-btn-merge'),
                btnMergeText: document.getElementById('pm-btn-text')
            };
        },

        waitForDependencies() {
            const ensureLibLoaded = setInterval(() => {
                if (typeof PDFLib !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    console.log('VGT NEXUS BINDER: PDF-Lib Engine Active.');
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
                if (e.dataTransfer.files.length) this.handleFiles(e.dataTransfer.files);
            });
            this.DOM.fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
                this.DOM.fileInput.value = ''; // Reset for re-selection
            });

            // Global Actions
            this.DOM.btnClear.addEventListener('click', () => this.clearWorkspace());
            this.DOM.btnMerge.addEventListener('click', () => this.executeMerge());
        },

        // --- MEMORY & DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        clearWorkspace() {
            this.State.pdfFiles = [];
            this.renderList();
        },

        // --- INGESTION ENGINE ---
        handleFiles(files) {
            let added = 0;
            Array.from(files).forEach(file => {
                if (file.type === 'application/pdf') {
                    this.State.pdfFiles.push(file);
                    added++;
                }
            });

            if (added > 0) {
                this.DOM.workspace.classList.remove('hidden');
                this.renderList();
            } else if (files.length > 0) {
                alert("VGT SECURITY BLOCK: Nur reine PDF-Dokumente werden vom Nexus-Binder akzeptiert.");
            }
        },

        // --- RENDER ENGINE & DRAG/DROP LOGIC ---
        renderList() {
            this.safeClearOutput(this.DOM.fileList);
            
            this.DOM.fileCount.textContent = `${this.State.pdfFiles.length} Datei${this.State.pdfFiles.length !== 1 ? 'en' : ''}`; // XSS Safe

            if (this.State.pdfFiles.length === 0) {
                this.DOM.workspace.classList.add('hidden');
                return;
            }

            const frag = document.createDocumentFragment();

            this.State.pdfFiles.forEach((file, index) => {
                // VGT DOM HARDENING: Strict Native Creation (No user-data via innerHTML)
                const card = document.createElement('div');
                card.className = 'pm-card';
                card.draggable = true;
                card.dataset.index = index;

                const leftPane = document.createElement('div');
                leftPane.className = 'pm-card-left';

                // Static SVGs are safe to inject via innerHTML (No user input)
                const dragHandle = document.createElement('div');
                dragHandle.className = 'drag-handle';
                dragHandle.innerHTML = `<svg viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>`;

                const docIconWrap = document.createElement('div');
                docIconWrap.innerHTML = `<svg class="doc-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>`;
                const docIcon = docIconWrap.firstElementChild;

                const docInfo = document.createElement('div');
                docInfo.className = 'doc-info';

                // XSS Defense: textContent neutralizes malicious filenames
                const docName = document.createElement('span');
                docName.className = 'doc-name';
                docName.title = file.name; 
                docName.textContent = file.name; 

                const docSize = document.createElement('span');
                docSize.className = 'doc-size';
                docSize.textContent = this.formatBytes(file.size);

                docInfo.appendChild(docName);
                docInfo.appendChild(docSize);
                
                leftPane.appendChild(dragHandle);
                leftPane.appendChild(docIcon);
                leftPane.appendChild(docInfo);

                // Remove Button
                const btnRm = document.createElement('button');
                btnRm.className = 'btn-remove';
                btnRm.setAttribute('aria-label', 'Entfernen');
                btnRm.innerHTML = `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
                
                btnRm.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent drag interference
                    this.State.pdfFiles.splice(index, 1);
                    this.renderList();
                });

                card.appendChild(leftPane);
                card.appendChild(btnRm);

                this.attachDragEvents(card, index);

                frag.appendChild(card);
            });

            this.DOM.fileList.appendChild(frag);
        },

        attachDragEvents(card, index) {
            card.addEventListener('dragstart', (e) => {
                this.State.draggedIndex = index;
                e.dataTransfer.effectAllowed = 'move';
                // Timeout ensures the visual card stays in DOM while dragging the ghost
                setTimeout(() => card.classList.add('dragging'), 0);
            });

            card.addEventListener('dragover', (e) => {
                e.preventDefault();
                if(this.State.draggedIndex === index) return;
                
                const bounding = card.getBoundingClientRect();
                const offset = bounding.y + (bounding.height / 2);
                
                if (e.clientY - offset > 0) {
                    card.classList.add('drag-over-bottom');
                    card.classList.remove('drag-over-top');
                } else {
                    card.classList.add('drag-over-top');
                    card.classList.remove('drag-over-bottom');
                }
            });

            card.addEventListener('dragleave', () => {
                card.classList.remove('drag-over-top', 'drag-over-bottom');
            });

            card.addEventListener('drop', (e) => {
                e.preventDefault();
                card.classList.remove('drag-over-top', 'drag-over-bottom');
                
                if (this.State.draggedIndex === null || this.State.draggedIndex === index) return;

                const bounding = card.getBoundingClientRect();
                const offset = bounding.y + (bounding.height / 2);
                let dropIndex = index;
                
                // Adjust drop index based on top/bottom half
                if (e.clientY - offset > 0) dropIndex++;
                if (this.State.draggedIndex < dropIndex) dropIndex--;

                // Array Mutation
                const item = this.State.pdfFiles.splice(this.State.draggedIndex, 1)[0];
                this.State.pdfFiles.splice(dropIndex, 0, item);
                
                this.renderList();
            });

            card.addEventListener('dragend', () => {
                card.classList.remove('dragging');
                this.State.draggedIndex = null;
            });
        },

        // --- EXECUTION ENGINE ---
        async executeMerge() {
            if (this.State.pdfFiles.length < 2) {
                alert("VGT HINWEIS: Bitte lade mindestens 2 PDFs in die Matrix, um sie zu verschmelzen.");
                return;
            }

            // UI Loading State
            this.DOM.btnMerge.classList.add('processing');
            this.DOM.btnMergeText.textContent = "Nexus kompiliert Master-Dokument..."; // XSS Safe
            
            try {
                const { PDFDocument } = PDFLib;
                const mergedPdf = await PDFDocument.create();

                // Sequential Array Buffer processing
                for (let i = 0; i < this.State.pdfFiles.length; i++) {
                    const file = this.State.pdfFiles[i];
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await PDFDocument.load(arrayBuffer);
                    
                    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                    copiedPages.forEach((page) => {
                        mergedPdf.addPage(page);
                    });
                }

                // Finalize and Download
                const mergedPdfBytes = await mergedPdf.save();
                const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = `VGT_Master_Nexus_${new Date().getTime()}.pdf`;
                document.body.appendChild(a);
                a.click();
                
                // Memory Cleanup
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                // Success Feedback
                this.DOM.btnMergeText.textContent = "Erfolgreich fusioniert!";
                setTimeout(() => {
                    this.DOM.btnMergeText.textContent = "PDFs zu Master-File verschmelzen";
                    this.DOM.btnMerge.classList.remove('processing');
                }, 3000);

            } catch (err) {
                console.error("VGT PDF MERGE ERROR: ", err);
                alert("Kritischer Fehler bei der Verschmelzung. Eines der Dokumente ist möglicherweise durch Verschlüsselung/Passwortschutz gesperrt oder beschädigt.");
                this.DOM.btnMergeText.textContent = "PDFs zu Master-File verschmelzen";
                this.DOM.btnMerge.classList.remove('processing');
            }
        }
    };

    NexusBinderEngine.init();
});