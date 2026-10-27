/**
 * VGT MEDIACENTER - QUANTUM SQUEEZE LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: RAM Leak Prevention, DOM-XSS Shielding & Object Encapsulation
 * O(1) Local Image Compression using compressor.js.
 * Implements strict debouncing to prevent UI thread locking during slider interaction.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-imgcomp')) return;

    const QuantumSqueezeEngine = {
        DOM: {},
        State: {
            currentFile: null,
            currentCompressedBlob: null,
            originalObjectUrl: null,
            compressedObjectUrl: null,
            targetFormat: 'auto', // 'auto', 'image/jpeg', 'image/webp', 'image/png'
            debounceTimer: null,
            isProcessing: false
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('ic-dropzone'),
                fileInput: document.getElementById('ic-file-input'),
                workspace: document.getElementById('ic-workspace'),
                btnReset: document.getElementById('ic-btn-reset'),
                btnDownload: document.getElementById('ic-btn-download'),
                
                // Controls
                qSlider: document.getElementById('ic-quality'),
                lblQuality: document.getElementById('lbl-quality'),
                inMaxWidth: document.getElementById('ic-max-width'),
                inMaxHeight: document.getElementById('ic-max-height'),
                fmtBtns: document.querySelectorAll('.fmt-btn'),
                
                // Displays
                imgOrig: document.getElementById('ic-img-original'),
                imgComp: document.getElementById('ic-img-compressed'),
                statOrig: document.getElementById('stat-orig-size'),
                statComp: document.getElementById('stat-comp-size'),
                statSavingsVal: document.querySelector('.savings-val'),
                lblProcessing: document.getElementById('lbl-processing')
            };
        },

        waitForDependencies() {
            // Warten auf die externe Compressor-Bibliothek (via SRI geladen)
            const ensureLibLoaded = setInterval(() => {
                if (typeof Compressor !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    console.log('VGT QUANTUM SQUEEZE: Compression Matrix Active.');
                }
            }, 100);
        },

        // --- MATH & FORMATTING UTILS ---
        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        calcSavings(orig, comp) {
            if (comp >= orig) return { percent: "+0%", isLoss: true };
            const saved = orig - comp;
            const percent = ((saved / orig) * 100).toFixed(1);
            return { percent: `-${percent}%`, isLoss: false };
        },

        // --- MEMORY MANAGEMENT ---
        cleanupMemory() {
            if (this.State.originalObjectUrl) {
                URL.revokeObjectURL(this.State.originalObjectUrl);
                this.State.originalObjectUrl = null;
            }
            if (this.State.compressedObjectUrl) {
                URL.revokeObjectURL(this.State.compressedObjectUrl);
                this.State.compressedObjectUrl = null;
            }
        },

        resetTool() {
            this.cleanupMemory();
            this.State.currentFile = null;
            this.State.currentCompressedBlob = null;
            
            this.DOM.fileInput.value = '';
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.imgOrig.src = '';
            this.DOM.imgComp.src = '';
        },

        // --- EVENT BINDING ---
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
                if (e.dataTransfer.files.length) this.handleIngestion(e.dataTransfer.files[0]);
            });
            
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleIngestion(e.target.files[0]);
                this.DOM.fileInput.value = ''; // File Input flushen
            });

            this.DOM.btnReset.addEventListener('click', () => this.resetTool());

            // Realtime Controls (Debounced)
            const handleControlChange = () => {
                clearTimeout(this.State.debounceTimer);
                // 250ms Throttle verhindert UI Freezes beim schnellen Schieben
                this.State.debounceTimer = setTimeout(() => this.executeCompression(), 250); 
            };

            this.DOM.qSlider.addEventListener('input', (e) => {
                this.DOM.lblQuality.textContent = `${e.target.value}%`; // XSS Safe (Native Zuweisung)
                handleControlChange();
            });

            this.DOM.inMaxWidth.addEventListener('input', handleControlChange);
            this.DOM.inMaxHeight.addEventListener('input', handleControlChange);

            this.DOM.fmtBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.fmtBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.targetFormat = e.currentTarget.getAttribute('data-fmt');
                    this.executeCompression();
                });
            });

            // Action
            this.DOM.btnDownload.addEventListener('click', () => this.downloadImage());
        },

        // --- INGESTION PIPELINE ---
        handleIngestion(file) {
            if (!file.type.startsWith('image/')) {
                alert("VGT SECURITY BLOCK: Nur reine Bilddateien werden für die Kompression unterstützt.");
                return;
            }

            this.State.currentFile = file;
            
            // View Transition
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');
            
            this.DOM.statOrig.textContent = this.formatBytes(file.size);
            
            // RAM Leak Protection
            this.cleanupMemory();
            this.State.originalObjectUrl = URL.createObjectURL(file);
            this.DOM.imgOrig.src = this.State.originalObjectUrl;

            this.executeCompression();
        },

        // --- COMPRESSION ENGINE ---
        executeCompression() {
            if (!this.State.currentFile || this.State.isProcessing) return;

            this.State.isProcessing = true;
            this.DOM.lblProcessing.classList.remove('hidden');
            this.DOM.lblProcessing.textContent = 'Rechne...';
            this.DOM.lblProcessing.style.color = 'var(--vg-text-muted)'; // Reset color fallback

            const quality = parseInt(this.DOM.qSlider.value, 10) / 100;
            const maxWidth = parseInt(this.DOM.inMaxWidth.value, 10) || undefined;
            const maxHeight = parseInt(this.DOM.inMaxHeight.value, 10) || undefined;

            let mimeType = this.State.currentFile.type;
            if (this.State.targetFormat !== 'auto') {
                mimeType = this.State.targetFormat;
            }

            // Engine Reference für asynchrone Callbacks
            const engine = this;

            new Compressor(this.State.currentFile, {
                quality: quality,
                maxWidth: maxWidth,
                maxHeight: maxHeight,
                mimeType: mimeType,
                success(resultBlob) {
                    engine.State.currentCompressedBlob = resultBlob;

                    if (engine.State.compressedObjectUrl) {
                        URL.revokeObjectURL(engine.State.compressedObjectUrl);
                    }
                    
                    engine.State.compressedObjectUrl = URL.createObjectURL(resultBlob);
                    engine.DOM.imgComp.src = engine.State.compressedObjectUrl;

                    engine.DOM.statComp.textContent = engine.formatBytes(resultBlob.size);
                    
                    const savings = engine.calcSavings(engine.State.currentFile.size, resultBlob.size);
                    engine.DOM.statSavingsVal.textContent = savings.percent;
                    
                    if (savings.isLoss) {
                        engine.DOM.statSavingsVal.style.color = 'rgba(var(--c-pink), 1)';
                        engine.DOM.statSavingsVal.style.textShadow = '0 0 20px rgba(var(--c-pink), 0.4)';
                    } else {
                        engine.DOM.statSavingsVal.style.color = 'rgba(var(--c-green), 1)';
                        engine.DOM.statSavingsVal.style.textShadow = '0 0 20px rgba(var(--c-green), 0.4)';
                    }

                    engine.DOM.lblProcessing.classList.add('hidden');
                    engine.State.isProcessing = false;
                },
                error(err) {
                    console.error('VGT COMPRESSION ERROR:', err.message);
                    engine.DOM.lblProcessing.textContent = 'Fehler!';
                    engine.DOM.lblProcessing.style.color = 'rgba(var(--c-pink), 1)';
                    engine.State.isProcessing = false;
                }
            });
        },

        // --- EXPORT MECHANISMUS ---
        downloadImage() {
            if (!this.State.currentCompressedBlob) return;
            
            const originalName = this.State.currentFile.name;
            const dotIndex = originalName.lastIndexOf('.');
            const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
            
            let ext = originalName.substring(dotIndex);
            if (this.State.currentCompressedBlob.type === 'image/jpeg') ext = '.jpg';
            if (this.State.currentCompressedBlob.type === 'image/webp') ext = '.webp';
            if (this.State.currentCompressedBlob.type === 'image/png')  ext = '.png';

            // VGT HARDENING: Sanitize filename to prevent directory traversal exploits
            // Bsp: "../../etc/passwd" -> "etcpasswd"
            const safeBaseName = baseName.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim() || 'vgt_image';
            const newName = `${safeBaseName}_vgt_min${ext}`;

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = this.State.compressedObjectUrl;
            a.download = newName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    QuantumSqueezeEngine.init();
});