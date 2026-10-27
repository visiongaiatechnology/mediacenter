/**
 * VGT MEDIACENTER - VAULT CRACKER LOGIC
 * STATUS: DIAMANT SUPREME V2.1 (Hardened JS Engine + SVG Namespace Fix)
 * Vektor: DOM-XSS Prevention, Memory Leak Protection & Object Isolation
 * Local ZIP extraction using JSZip & FileSaver.
 *
 * V2.1 FIXES:
 * - SVG namespace bug — innerHTML parsed SVGs in HTML namespace causing
 *   appendChild to fail with null firstElementChild. Now uses createElementNS.
 * - Separated error handling for ZIP errors vs Render errors — no more
 *   misleading "Defektes Archiv" messages when the actual bug was in DOM rendering.
 *
 * V2.0 FIXES (retained):
 * - ArrayBuffer pre-loading before JSZip.loadAsync()
 * - Magic number validation before JSZip
 * - Specific error messages instead of generic catch-all
 * - JSZip dependency timeout (30s) instead of infinite polling
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-zipmaster')) return;

    // Wait for Dependencies (JSZip & FileSaver) with timeout
    let waitAttempts = 0;
    const MAX_WAIT_ATTEMPTS = 300; // 30 seconds at 100ms interval
    
    const ensureLibLoaded = setInterval(() => {
        waitAttempts++;
        
        if (typeof JSZip !== 'undefined' && typeof saveAs !== 'undefined') {
            clearInterval(ensureLibLoaded);
            initVaultEngine();
        } else if (waitAttempts >= MAX_WAIT_ATTEMPTS) {
            clearInterval(ensureLibLoaded);
            console.error('VGT VAULT CRITICAL: JSZip or FileSaver failed to load after 30 seconds.');
            alert('VGT KERNEL ERROR: Kritische Bibliotheken konnten nicht geladen werden. Bitte lade die Seite neu.');
        }
    }, 100);

    function initVaultEngine() {
        // SVG Namespace constant — required for createElementNS
        const SVG_NS = 'http://www.w3.org/2000/svg';
        
        const DOM = {
            dropZone: document.getElementById('zm-dropzone'),
            fileInput: document.getElementById('zm-file-input'),
            workspace: document.getElementById('zm-workspace'),
            archiveName: document.getElementById('zm-archive-name'),
            fileCount: document.getElementById('zm-file-count'),
            fileList: document.getElementById('zm-file-list'),
            loadingBar: document.getElementById('zm-loading-bar'),
            
            btnExtractAll: document.getElementById('zm-btn-extract-all'),
            btnClear: document.getElementById('zm-btn-clear'),
            
            prevEmpty: document.getElementById('zm-preview-empty'),
            prevActive: document.getElementById('zm-preview-active'),
            prevName: document.getElementById('prev-name'),
            prevSize: document.getElementById('prev-size'),
            prevContent: document.getElementById('prev-content-box'),
            btnDownloadSingle: document.getElementById('btn-download-single')
        };

        let currentZipInstance = null;
        let currentZipEntries = [];
        let activeObjectUrl = null;
        let activeBlob = null;
        let activeFilename = '';

        // --- SVGs for File Tree (Static, Safe Vectors) ---
        // V2.1: SVG inner content as raw strings — parsed via createElementNS pipeline
        const icons = {
            folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
            image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
            text: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
            pdf: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path>',
            default: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>'
        };

        /**
         * V2.1 FIX: Build SVG element using proper SVG namespace
         * 
         * The previous implementation used `innerHTML` to inject SVG content into
         * a regular <div>. Browsers parse this content in the HTML namespace,
         * not the SVG namespace, which causes `firstElementChild` to sometimes
         * return null. When that null was passed to appendChild, the entire
         * file tree rendering crashed — and the catch block in handleZip()
         * misleadingly reported "Defektes Archiv".
         * 
         * This function builds the SVG correctly using createElementNS and
         * DOMParser, ensuring proper namespace handling.
         */
        function buildSvgIcon(innerSvgContent, className = 'file-icon') {
            const svg = document.createElementNS(SVG_NS, 'svg');
            svg.setAttribute('class', className);
            svg.setAttribute('viewBox', '0 0 24 24');
            
            // Parse the inner content in proper SVG namespace
            const parser = new DOMParser();
            const wrappedContent = `<svg xmlns="${SVG_NS}">${innerSvgContent}</svg>`;
            const parsedDoc = parser.parseFromString(wrappedContent, 'image/svg+xml');
            
            // Check for parser errors
            const parseError = parsedDoc.querySelector('parsererror');
            if (parseError) {
                console.error('VGT VAULT: SVG parse error', parseError);
                return svg; // Return empty SVG element
            }
            
            // Move all child nodes from parsed SVG to our namespaced SVG element
            const parsedRoot = parsedDoc.documentElement;
            while (parsedRoot.firstChild) {
                svg.appendChild(parsedRoot.firstChild);
            }
            
            return svg;
        }

        // --- UI Interactions ---
        DOM.dropZone.addEventListener('dragover', (e) => { 
            e.preventDefault(); 
            DOM.dropZone.classList.add('dragover'); 
        });
        DOM.dropZone.addEventListener('dragleave', () => DOM.dropZone.classList.remove('dragover'));
        DOM.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            DOM.dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) handleZip(e.dataTransfer.files[0]);
        });
        DOM.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleZip(e.target.files[0]);
            DOM.fileInput.value = '';
        });

        DOM.btnClear.addEventListener('click', resetTool);

        // --- Memory & State Management ---
        const formatBytes = (bytes) => {
            if (bytes === 0 || !bytes) return 'Unknown';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        const cleanupMemory = () => {
            if (activeObjectUrl) {
                URL.revokeObjectURL(activeObjectUrl); // Verhindert RAM-Leaks
                activeObjectUrl = null;
            }
            activeBlob = null;
            activeFilename = '';
            
            // Clean up DOM payload safely
            while (DOM.prevContent.firstChild) {
                DOM.prevContent.removeChild(DOM.prevContent.firstChild);
            }
        };

        function resetTool() {
            cleanupMemory();
            currentZipInstance = null;
            currentZipEntries = [];
            
            DOM.workspace.classList.add('hidden');
            DOM.dropZone.classList.remove('hidden');
            DOM.fileList.innerHTML = '';
            
            DOM.prevActive.classList.add('hidden');
            DOM.prevEmpty.classList.remove('hidden');
        }

        /**
         * Diagnose JSZip errors and return user-friendly message.
         * V2.1: Only used for actual ZIP-loading errors, not render errors.
         */
        function diagnoseZipError(err) {
            if (!err || !err.message) {
                return "Unbekannter Fehler beim Lesen des Archivs.";
            }
            
            const msg = err.message.toLowerCase();
            
            if (msg.includes('encrypted') || msg.includes('password')) {
                return "Archiv ist passwort-geschützt. Lokale Entschlüsselung verschlüsselter ZIPs wird nicht unterstützt.";
            }
            
            if (msg.includes("can't find end of central directory") || 
                msg.includes('end of central directory')) {
                return "Archiv-Header beschädigt. Die Datei ist möglicherweise unvollständig oder kein gültiges ZIP.";
            }
            
            if (msg.includes('corrupted') || msg.includes('invalid signature')) {
                return "Archiv ist beschädigt. Die ZIP-Struktur ist nicht lesbar.";
            }
            
            if (msg.includes('memory') || msg.includes('allocation')) {
                return "Archiv zu groß für lokale Verarbeitung. Bitte verwende eine kleinere Datei.";
            }
            
            if (msg.includes('zip64') || msg.includes('not supported')) {
                return "Archiv-Format wird nicht unterstützt (ZIP64 oder erweiterte Features).";
            }
            
            if (msg.includes("can't read") || msg.includes('failed to fetch')) {
                return "Datei konnte nicht gelesen werden. Möglicherweise wurde die Datei während des Lesens verändert.";
            }
            
            return `Archiv konnte nicht geöffnet werden. Debug: ${err.message}`;
        }

        // --- Ingestion & Tree Building ---
        /**
         * V2.1 FIX: Separated error handling
         * 
         * ZIP loading errors are caught separately from render errors.
         * Previously a render bug would trigger the "Defektes Archiv" message
         * even when the ZIP was perfectly fine.
         */
        async function handleZip(file) {
            // Extension & Type Validation
            const validTypes = ['application/zip', 'application/x-zip-compressed'];
            if (!validTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.zip')) {
                alert("VGT SECURITY BLOCK: Nur reine .zip Archive werden für die Inspektion zugelassen.");
                return;
            }

            DOM.dropZone.classList.add('hidden');
            DOM.workspace.classList.remove('hidden');
            DOM.archiveName.textContent = file.name; // textContent = XSS Safe
            DOM.fileCount.textContent = "Analysiere Header...";
            DOM.loadingBar.classList.remove('hidden');

            // STAGE 1: ZIP Loading
            try {
                // Read file as ArrayBuffer FIRST before passing to JSZip
                let arrayBuffer;
                try {
                    arrayBuffer = await file.arrayBuffer();
                } catch (readErr) {
                    throw new Error("Can't read file: " + readErr.message);
                }
                
                // Validate magic number before JSZip
                const view = new Uint8Array(arrayBuffer.slice(0, 4));
                const magicHex = Array.from(view)
                    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
                    .join('');
                
                const validMagics = ['504B0304', '504B0506', '504B0708'];
                if (!validMagics.includes(magicHex)) {
                    throw new Error(`Invalid signature: Datei beginnt mit 0x${magicHex} statt einer ZIP-Signatur (0x504B0304).`);
                }
                
                const zip = new JSZip();
                currentZipInstance = await zip.loadAsync(arrayBuffer);
                
                currentZipEntries = [];
                currentZipInstance.forEach((relativePath, zipEntry) => {
                    currentZipEntries.push(zipEntry);
                });

                currentZipEntries.sort((a, b) => {
                    if (a.dir && !b.dir) return -1;
                    if (!a.dir && b.dir) return 1;
                    return a.name.localeCompare(b.name);
                });

            } catch (err) {
                console.error("VGT VAULT ZIP ERROR:", err);
                const userMessage = diagnoseZipError(err);
                alert("VGT VAULT: " + userMessage);
                resetTool();
                return; // Stop here — don't try to render
            }

            // STAGE 2: DOM Rendering (separate try/catch — render bugs shouldn't be reported as ZIP errors)
            try {
                renderFileTree();
                
                DOM.fileCount.textContent = `${currentZipEntries.length} Items`;
                DOM.loadingBar.classList.add('hidden');
            } catch (renderErr) {
                console.error("VGT VAULT RENDER ERROR:", renderErr);
                alert("VGT VAULT: Fehler beim Anzeigen des Verzeichnisbaums. Debug: " + (renderErr.message || 'Unknown'));
                resetTool();
            }
        }

        /**
         * V2.1 FIX: Render file tree using proper SVG namespace.
         * No more innerHTML for SVG content — uses buildSvgIcon() helper.
         */
        function renderFileTree() {
            const frag = document.createDocumentFragment();
            DOM.fileList.innerHTML = ''; // Safe flush

            currentZipEntries.forEach((entry) => {
                // Determine icon
                let iconSvg = icons.default;
                const ext = entry.name.split('.').pop().toLowerCase();
                
                if (entry.dir) iconSvg = icons.folder;
                else if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) iconSvg = icons.image;
                else if (['txt', 'md', 'json', 'csv', 'js', 'php', 'html', 'css'].includes(ext)) iconSvg = icons.text;
                else if (ext === 'pdf') iconSvg = icons.pdf;

                // Try to get uncompressed size
                let sizeStr = formatBytes(entry._data ? entry._data.uncompressedSize : 0);
                if (entry.dir) sizeStr = 'Verzeichnis';

                // Display name (handle paths)
                const pathParts = entry.name.split('/').filter(p => p !== '');
                const indent = (pathParts.length - 1) * 1.5; 
                const displayName = pathParts[pathParts.length - 1];

                // Build row element
                const row = document.createElement('div');
                row.className = `file-row ${entry.dir ? 'is-folder' : ''}`;
                row.style.paddingLeft = `calc(1rem + ${indent}rem)`;
                
                // V2.1: Use namespaced SVG builder instead of innerHTML hack
                const svgIcon = buildSvgIcon(iconSvg, 'file-icon');
                
                const detailsWrapper = document.createElement('div');
                detailsWrapper.className = 'file-details';
                
                const nameSpan = document.createElement('span');
                nameSpan.className = 'file-name';
                nameSpan.title = entry.name;
                nameSpan.textContent = displayName; // XSS Safe
                
                const sizeSpan = document.createElement('span');
                sizeSpan.className = 'file-size';
                sizeSpan.textContent = sizeStr; // XSS Safe

                detailsWrapper.appendChild(nameSpan);
                detailsWrapper.appendChild(sizeSpan);
                
                row.appendChild(svgIcon); // V2.1: Direct SVG element, no firstElementChild hack
                row.appendChild(detailsWrapper);

                if (!entry.dir) {
                    row.addEventListener('click', () => {
                        document.querySelectorAll('.file-row').forEach(r => r.classList.remove('active'));
                        row.classList.add('active');
                        loadPreview(entry, displayName, ext);
                    });
                }

                frag.appendChild(row);
            });

            DOM.fileList.appendChild(frag);
        }

        // --- On-Demand Extraction & Preview ---
        async function loadPreview(zipEntry, displayName, ext) {
            cleanupMemory();
            
            DOM.prevEmpty.classList.add('hidden');
            DOM.prevActive.classList.remove('hidden');
            DOM.prevName.textContent = displayName;
            DOM.prevSize.textContent = "Entpacke in RAM...";
            
            // Temporary Loader State
            const loaderDiv = document.createElement('div');
            loaderDiv.style.color = 'var(--vg-text-muted)';
            loaderDiv.style.animation = 'pulseGlow 1.5s infinite';
            loaderDiv.textContent = 'Dekomprimiere Stream...';
            DOM.prevContent.appendChild(loaderDiv);
            
            DOM.loadingBar.classList.remove('hidden');

            try {
                let isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext);
                let isText = ['txt', 'md', 'json', 'csv', 'js', 'php', 'html', 'css'].includes(ext);
                let isPdf = ext === 'pdf';

                if (isImage || isPdf) {
                    activeBlob = await zipEntry.async("blob");
                    activeFilename = displayName;
                    DOM.prevSize.textContent = formatBytes(activeBlob.size);
                    
                    DOM.prevContent.innerHTML = ''; // Flush loader safely
                    
                    if (isImage) {
                        activeObjectUrl = URL.createObjectURL(activeBlob);
                        const img = document.createElement('img');
                        img.src = activeObjectUrl;
                        img.className = 'preview-img';
                        img.alt = displayName;
                        DOM.prevContent.appendChild(img);
                    } else {
                        // PDF
                        renderUnsupportedState('PDF Datei bereit. Klicke auf "Datei Speichern" um sie herunterzuladen.');
                    }
                } else if (isText) {
                    const textContent = await zipEntry.async("string");
                    activeBlob = new Blob([textContent], { type: 'text/plain' });
                    activeFilename = displayName;
                    DOM.prevSize.textContent = formatBytes(activeBlob.size);
                    
                    DOM.prevContent.innerHTML = '';
                    const textarea = document.createElement('textarea');
                    textarea.className = 'preview-text custom-scrollbar';
                    textarea.readOnly = true;
                    textarea.spellcheck = false;
                    textarea.value = textContent; // XSS Safe! Native Value Binding.
                    DOM.prevContent.appendChild(textarea);
                } else {
                    // Binary / Unsupported
                    activeBlob = await zipEntry.async("blob");
                    activeFilename = displayName;
                    DOM.prevSize.textContent = formatBytes(activeBlob.size);
                    
                    renderUnsupportedState(`Binär-Datei (${ext}). Keine visuelle Vorschau möglich. Klicke auf "Datei Speichern" zum Extrahieren.`);
                }

                DOM.loadingBar.classList.add('hidden');

            } catch (err) {
                console.error("Extraction error:", err);
                DOM.prevContent.innerHTML = '';
                const errDiv = document.createElement('div');
                errDiv.style.color = 'rgba(var(--c-pink),1)';
                errDiv.textContent = 'Extrahieren fehlgeschlagen. Archiv möglicherweise beschädigt.';
                DOM.prevContent.appendChild(errDiv);
                
                DOM.loadingBar.classList.add('hidden');
            }
        }

        /**
         * V2.1: Use namespaced SVG builder for the unsupported-state icon too.
         * Previous innerHTML-based version could fail in same way as renderFileTree().
         */
        function renderUnsupportedState(messageText) {
            DOM.prevContent.innerHTML = '';
            const wrap = document.createElement('div');
            wrap.className = 'preview-unsupported';
            
            // V2.1: Build icon via namespaced builder
            const iconSvgContent = '<line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line>';
            const svgIcon = buildSvgIcon(iconSvgContent, 'svg-icon');
            svgIcon.style.width = '3rem';
            svgIcon.style.height = '3rem';
            svgIcon.style.marginBottom = '1rem';
            
            const p = document.createElement('p');
            p.textContent = messageText; // Safe injection
            
            wrap.appendChild(svgIcon);
            wrap.appendChild(p);
            
            DOM.prevContent.appendChild(wrap);
        }

        // --- Downloads ---
        DOM.btnDownloadSingle.addEventListener('click', () => {
            if (!activeBlob || !activeFilename) return;
            // FileSaver.js implementation -> native saveAs
            if (typeof saveAs === 'function') {
                saveAs(activeBlob, activeFilename); 
            } else {
                // Fallback (e.g. standard a-tag download)
                const a = document.createElement('a');
                a.href = activeObjectUrl || URL.createObjectURL(activeBlob);
                a.download = activeFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });

        DOM.btnExtractAll.addEventListener('click', () => {
            if (!currentZipInstance) return;
            // Prevention of RAM overload & Browser Crash (Zip Bomb Protection)
            alert("VGT PROTECT: Massendownloads (Extract All) blockieren den Browser oder können zu Speicherüberläufen führen. Bitte lade einzelne Dateien sicher über die 'Datei Speichern' Schaltfläche herunter.");
        });
    }
});