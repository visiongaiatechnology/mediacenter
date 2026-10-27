/**
 * VGT MEDIACENTER - METADATA CLEANER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, RAM Leak Protection & EXIF Object Isolation
 * Extracts EXIF via exif.js, completely purges it via Canvas Deep-Re-Encoding.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-metaclean')) return;

    const MetadataCleanerEngine = {
        DOM: {},
        State: {
            currentFile: null,
            previewBlobUrl: null,
            cleanBlobUrl: null,
            THREAT_KEYS: ['GPSLatitude', 'GPSLongitude', 'Make', 'Model', 'DateTimeOriginal', 'Software'],
            originalCleanBtnHtml: null
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT METADATA CLEANER: Forensic EXIF Engine Active.');
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('mc-dropzone'),
                fileInput: document.getElementById('mc-file-input'),
                analysisView: document.getElementById('mc-analysis-view'),
                previewImg: document.getElementById('mc-preview-img'),
                btnReset: document.getElementById('mc-btn-reset'),
                btnClean: document.getElementById('mc-btn-clean'),
                btnDownload: document.getElementById('mc-btn-download'),
                exifList: document.getElementById('mc-exif-list'),
                threatBadge: document.getElementById('mc-threat-level'),
                metaName: document.getElementById('mc-meta-name'),
                metaSize: document.getElementById('mc-meta-size'),
                scrubber: document.getElementById('mc-scrubber')
            };

            if (this.DOM.btnClean) {
                // Sichern der originalen Child-Nodes für sicheres Resetten ohne innerHTML
                this.State.originalCleanBtnHtml = Array.from(this.DOM.btnClean.childNodes).map(n => n.cloneNode(true));
            }
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
                if (e.dataTransfer.files.length) this.initAnalysis(e.dataTransfer.files[0]);
            });
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.initAnalysis(e.target.files[0]);
                this.DOM.fileInput.value = ''; // Reset
            });

            // UI Actions
            this.DOM.btnReset.addEventListener('click', () => this.resetTool());
            this.DOM.btnClean.addEventListener('click', () => this.executeScrubbing());
            this.DOM.btnDownload.addEventListener('click', () => this.downloadCleanedAsset());
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString, textSpanContent = '') {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'image/svg+xml');
            element.appendChild(doc.documentElement);
            
            if (textSpanContent) {
                const span = document.createElement('span');
                span.textContent = textSpanContent;
                element.appendChild(span);
            }
        },

        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // --- MEMORY & STATE MANAGEMENT ---
        resetTool() {
            this.State.currentFile = null;
            
            // Garbage Collection für RAM
            if (this.State.cleanBlobUrl) {
                URL.revokeObjectURL(this.State.cleanBlobUrl);
                this.State.cleanBlobUrl = null;
            }
            if (this.State.previewBlobUrl) {
                URL.revokeObjectURL(this.State.previewBlobUrl);
                this.State.previewBlobUrl = null;
            }

            this.DOM.previewImg.src = '';
            this.DOM.analysisView.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            
            this.DOM.btnClean.classList.remove('hidden');
            this.DOM.btnDownload.classList.add('hidden');
            this.DOM.previewImg.style.filter = 'none';

            // Reset Buttons
            this.safeClearOutput(this.DOM.btnClean);
            this.State.originalCleanBtnHtml.forEach(node => {
                this.DOM.btnClean.appendChild(node.cloneNode(true));
            });
            this.DOM.btnClean.style.pointerEvents = 'auto';
        },

        // --- INGESTION & ANALYSIS ENGINE ---
        async initAnalysis(file) {
            // Format Validation
            if (!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.heic')) {
                alert("VGT SECURITY BLOCK: Format wird nicht unterstützt. Nur Bilddateien erlaubt.");
                return;
            }

            this.resetTool(); // Flush memory before new ingest
            this.State.currentFile = file;
            
            // HEIC Intercept Logic (Failsafe for Apple Formats)
            if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                if (typeof heic2any !== 'undefined') {
                    this.DOM.threatBadge.textContent = 'Konvertiere HEIC...';
                    this.DOM.threatBadge.className = 'mc-badge warning';
                    
                    this.DOM.dropZone.classList.add('hidden');
                    this.DOM.analysisView.classList.remove('hidden');
                    
                    try {
                        const convertedBlob = await heic2any({ blob: file, toType: "image/jpeg" });
                        this.State.currentFile = new File([convertedBlob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" });
                    } catch(e) {
                        alert("HEIC Konvertierung fehlgeschlagen. Datei möglicherweise defekt.");
                        this.resetTool();
                        return;
                    }
                } else {
                    alert("HEIC-Modul nicht geladen. Bitte JPG/PNG/WEBP verwenden.");
                    this.resetTool();
                    return;
                }
            }

            // Memory-Safe Blob Routing
            this.State.previewBlobUrl = URL.createObjectURL(this.State.currentFile);

            // Setup View
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.analysisView.classList.remove('hidden');
            
            this.DOM.metaName.textContent = this.State.currentFile.name; // XSS Safe
            this.DOM.metaSize.textContent = this.formatBytes(this.State.currentFile.size);
            this.DOM.previewImg.src = this.State.previewBlobUrl;
            
            this.extractMetadata(this.State.currentFile);
        },

        extractMetadata(file) {
            const loadingSvg = `<svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`;
            
            const emptyState = document.createElement('div');
            emptyState.className = 'mc-empty-state';
            this.injectSVG(emptyState, loadingSvg, ' Scanne Header...');
            
            this.safeClearOutput(this.DOM.exifList);
            this.DOM.exifList.appendChild(emptyState);
            
            if (typeof EXIF === 'undefined') {
                emptyState.style.color = 'rgba(var(--c-pink), 1)';
                emptyState.lastChild.textContent = ' EXIF Engine offline. Bereinigung kann dennoch blind forciert werden.';
                
                this.DOM.threatBadge.textContent = 'ENGINE OFFLINE';
                this.DOM.threatBadge.className = 'mc-badge danger';
                return;
            }

            const engine = this;
            EXIF.getData(file, function() {
                const allMetaData = EXIF.getAllTags(this);
                engine.renderMetadataList(allMetaData);
            });
        },

        renderMetadataList(data) {
            let threatCount = 0;
            let totalCount = 0;

            // Filter out thumbnail data arrays which clog the UI
            const filteredData = Object.entries(data).filter(([key, val]) => {
                if (key === 'thumbnail' || key === 'MakerNote' || key === 'UserComment') return false;
                if (typeof val === 'object' && val !== null && !val.toString) return false;
                return true;
            });

            this.safeClearOutput(this.DOM.exifList);

            if (filteredData.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'mc-empty-state';
                emptyState.style.color = 'rgba(var(--c-green), 1)';
                
                const safeSvg = `<svg class="svg-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
                this.injectSVG(emptyState, safeSvg, ' Das Bild enthält keine lesbaren EXIF-Daten. Es ist bereits anonym.');
                
                this.DOM.exifList.appendChild(emptyState);
                
                this.DOM.threatBadge.textContent = 'CLEAN';
                this.DOM.threatBadge.className = 'mc-badge safe';
                
                const btnSvg = `<svg viewBox="0 0 24 24" class="svg-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
                this.injectSVG(this.DOM.btnClean, btnSvg, ' Dennoch Re-Encoden');
                return;
            }

            const frag = document.createDocumentFragment();

            filteredData.forEach(([key, val]) => {
                totalCount++;
                let stringVal = val.toString();
                // Format arrays gracefully
                if (Array.isArray(val)) stringVal = val.join(', ');
                
                const isThreat = this.State.THREAT_KEYS.includes(key);
                if (isThreat) threatCount++;

                // VGT DOM HARDENING: Native Creation (Prevents XSS if EXIF is malicious)
                const itemDiv = document.createElement('div');
                itemDiv.className = `mc-exif-item ${isThreat ? 'danger' : ''}`;
                
                const keySpan = document.createElement('span');
                keySpan.className = 'mc-exif-key';
                keySpan.textContent = key;
                
                const valSpan = document.createElement('span');
                valSpan.className = 'mc-exif-val';
                valSpan.title = stringVal; // Safe
                valSpan.textContent = stringVal.length > 40 ? stringVal.substring(0,40) + '...' : stringVal; // Safe text insertion
                
                itemDiv.appendChild(keySpan);
                itemDiv.appendChild(valSpan);
                frag.appendChild(itemDiv);
            });

            this.DOM.exifList.appendChild(frag);

            if (threatCount > 0) {
                this.DOM.threatBadge.textContent = `CRITICAL (${threatCount} THREATS)`;
                this.DOM.threatBadge.className = 'mc-badge danger';
            } else {
                this.DOM.threatBadge.textContent = `${totalCount} METATAGS`;
                this.DOM.threatBadge.className = 'mc-badge warning';
            }
        },

        // --- SCRUBBING ENGINE (Zero-Trust Canvas) ---
        async executeScrubbing() {
            if (!this.State.currentFile) return;

            // UI Transition to Scrubbing State
            const spinSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
            this.injectSVG(this.DOM.btnClean, spinSvg, ' Scrubbing...');
            
            this.DOM.btnClean.style.pointerEvents = 'none';
            this.DOM.scrubber.classList.add('active');
            this.DOM.previewImg.style.filter = 'grayscale(100%) contrast(120%)';

            try {
                const cleanedBlob = await new Promise((resolve) => {
                    const img = new Image();
                    
                    // Temp URL for canvas processing
                    const tempUrl = URL.createObjectURL(this.State.currentFile);
                    
                    img.onload = () => {
                        URL.revokeObjectURL(tempUrl); // Free memory immediately

                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        
                        // Drawing directly to canvas strips all EXIF headers naturally
                        ctx.drawImage(img, 0, 0);
                        
                        // Maintain original type, default to high-quality JPEG
                        const exportType = this.State.currentFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
                        const quality = exportType === 'image/jpeg' ? 0.95 : undefined;
                        
                        canvas.toBlob((blob) => {
                            // Empty canvas to force immediate GC
                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                            canvas.width = 0;
                            canvas.height = 0;
                            resolve(blob);
                        }, exportType, quality);
                    };
                    img.src = tempUrl;
                });

                // Process Finished
                if (this.State.cleanBlobUrl) URL.revokeObjectURL(this.State.cleanBlobUrl);
                this.State.cleanBlobUrl = URL.createObjectURL(cleanedBlob);
                
                // UI Success State
                setTimeout(() => {
                    this.DOM.scrubber.classList.remove('active');
                    this.DOM.previewImg.style.filter = 'none';
                    
                    const successState = document.createElement('div');
                    successState.className = 'mc-empty-state';
                    successState.style.color = 'rgba(var(--c-green), 1)';
                    
                    const checkSvg = `<svg class="svg-icon" viewBox="0 0 24 24" style="width:3rem; height:3rem; margin-bottom:1rem;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
                    this.injectSVG(successState, checkSvg);
                    
                    const title = document.createElement('h3');
                    title.style.cssText = 'margin:0; color:var(--vg-text)';
                    title.textContent = 'Bild erfolgreich anonymisiert';
                    
                    const p = document.createElement('p');
                    p.style.cssText = 'margin:0; opacity:0.8';
                    p.textContent = 'Alle Meta-Signaturen wurden physisch durch Re-Encoding zerstört.';
                    
                    successState.appendChild(title);
                    successState.appendChild(p);

                    this.safeClearOutput(this.DOM.exifList);
                    this.DOM.exifList.appendChild(successState);
                    
                    this.DOM.threatBadge.textContent = 'SECURE';
                    this.DOM.threatBadge.className = 'mc-badge safe';
                    
                    this.DOM.metaSize.textContent = `${this.formatBytes(this.State.currentFile.size)} ➔ ${this.formatBytes(cleanedBlob.size)}`;
                    this.DOM.metaSize.style.color = 'rgba(var(--c-green), 1)';

                    this.DOM.btnClean.classList.add('hidden');
                    this.DOM.btnClean.style.pointerEvents = 'auto'; // Reset for future usage
                    this.DOM.btnDownload.classList.remove('hidden');
                }, 800); // Artificial delay to emphasize processing

            } catch (err) {
                console.error("VGT SCRUB ERROR:", err);
                alert('Fehler beim Bereinigen: Das Bildformat wird vom Canvas nicht unterstützt oder ist korrupt.');
                this.resetTool();
            }
        },

        downloadCleanedAsset() {
            if (!this.State.cleanBlobUrl) return;
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = this.State.cleanBlobUrl;
            
            // Safe File Naming Append
            const dotIndex = this.State.currentFile.name.lastIndexOf('.');
            const cleanName = dotIndex !== -1 
                ? this.State.currentFile.name.substring(0, dotIndex) + '_vgt_clean' + this.State.currentFile.name.substring(dotIndex)
                : this.State.currentFile.name + '_vgt_clean.jpg';
                
            a.download = cleanName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    MetadataCleanerEngine.init();
});