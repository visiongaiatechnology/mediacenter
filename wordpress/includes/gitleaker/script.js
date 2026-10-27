/**
 * VGT MEDIACENTER - GIT-LEAKER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Async Batch Hardening & Object Isolation
 * Local Repository Secret Scanner.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-gitleaker')) return;

    const GitLeakerEngine = {
        DOM: {},
        State: {
            fileQueue: [],
            totalFiles: 0,
            processedFiles: 0,
            ignoredFiles: 0,
            foundThreats: [],
            isScanning: false,
            
            // Threat Signatures (ECMAScript-konform)
            SIGNATURES: [
                { id: 'RSA Private Key', regex: /-----BEGIN (RSA|OPENSSH|DSA|EC|PGP) PRIVATE KEY-----/i, level: 'critical' },
                { id: 'AWS Access Key', regex: /(A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/, level: 'critical' },
                { id: 'AWS Secret Key', regex: /aws_secret_access_key\s*[:=]\s*['"]?[a-zA-Z0-9\/+]{40}['"]?/i, level: 'critical' },
                { id: 'GitHub Token', regex: /(ghp|gho|ghu|ghs|ghr)_[a-zA-Z0-9]{36}/, level: 'critical' },
                { id: 'Slack Token', regex: /xox[baprs]-[0-9]{12}-[0-9]{12}-[a-zA-Z0-9]{24}/, level: 'critical' },
                { id: 'Google/GCP API Key', regex: /AIza[0-9A-Za-z\-_]{35}/, level: 'critical' },
                { id: 'Stripe Secret Key', regex: /sk_live_[0-9a-zA-Z]{24}/, level: 'critical' },
                { id: 'Stripe Restricted Key', regex: /rk_live_[0-9a-zA-Z]{24}/, level: 'critical' },
                { id: 'Discord Bot Token', regex: /xoxb-[0-9]{11}-[a-zA-Z0-9]{24}/, level: 'critical' },
                { id: 'Firebase URL', regex: /.*firebaseio\.com/i, level: 'warning' },
                { id: 'Generic Password/Secret', regex: /(?:password|passwd|pwd|secret|api[_-]?key|token)\s*[:=]\s*['"]?([a-zA-Z0-9\-_!@#$%^&*]{16,})['"]?/i, level: 'warning' }
            ],
            
            IGNORE_EXTS: new Set(['.jpg', '.jpeg', '.png', '.gif', '.ico', '.svg', '.mp4', '.mp3', '.wav', '.pdf', '.zip', '.tar', '.gz', '.exe', '.dll', '.bin', '.woff', '.woff2', '.ttf', '.eot', '.lock', '.jar']),
            IGNORE_PATHS: ['.git/', 'node_modules/', 'vendor/', 'dist/', 'build/', '.idea/']
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT GIT-LEAKER: Secret Analysis Engine initialized.');
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('gl-dropzone'),
                dirInput: document.getElementById('gl-dir-input'),
                zipInput: document.getElementById('gl-zip-input'),
                btnSelDir: document.getElementById('btn-gl-select-dir'),
                btnSelZip: document.getElementById('btn-gl-select-zip'),
                
                workspace: document.getElementById('gl-workspace'),
                btnReset: document.getElementById('btn-gl-reset'),
                btnExport: document.getElementById('btn-gl-export'),
                
                statFiles: document.getElementById('gl-stat-files'),
                statIgnored: document.getElementById('gl-stat-ignored'),
                statThreats: document.getElementById('gl-stat-threats'),
                
                scannerStatus: document.getElementById('gl-scanner-status'),
                currentFile: document.getElementById('gl-current-file'),
                progressBar: document.getElementById('gl-progress-bar'),
                
                tableBody: document.getElementById('gl-table-body')
            };
        },

        bindEvents() {
            this.DOM.btnReset.addEventListener('click', () => this.resetEngine());
            this.DOM.btnSelDir.addEventListener('click', () => this.DOM.dirInput.click());
            this.DOM.btnSelZip.addEventListener('click', () => this.DOM.zipInput.click());

            // Dropzone Handlers
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
                this.handleDrop(e);
            });

            this.DOM.dirInput.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) this.prepareDirectoryScan(files);
                this.DOM.dirInput.value = '';
            });

            this.DOM.zipInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) this.handleZip(e.target.files[0]);
                this.DOM.zipInput.value = '';
            });

            this.DOM.btnExport.addEventListener('click', () => this.exportResultsAsCSV());
        },

        // --- DOM & UI UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        updateStatus(type, labelText) {
            this.DOM.scannerStatus.className = `status-badge ${type}`;
            this.safeClearOutput(this.DOM.scannerStatus);
            
            // Safe SVG/Element Injection (Zero innerHTML)
            if (type === 'scanning') {
                const dot = document.createElement('span');
                dot.className = 'pulse-dot';
                this.DOM.scannerStatus.appendChild(dot);
            } else if (type === 'done') {
                const parser = new DOMParser();
                const svg = parser.parseFromString('<svg viewBox="0 0 24 24" style="width:1rem;height:1rem;stroke:currentColor;fill:none;stroke-width:2;"><polyline points="20 6 9 17 4 12"></polyline></svg>', 'image/svg+xml');
                this.DOM.scannerStatus.appendChild(svg.documentElement);
            }
            
            const textNode = document.createTextNode(' ' + labelText);
            this.DOM.scannerStatus.appendChild(textNode);
        },

        // --- INGESTION ENGINE ---
        async handleDrop(e) {
            const items = e.dataTransfer.items;
            if (!items || items.length === 0) return;

            const entryFile = items[0].getAsFile();
            const isZip = entryFile && entryFile.name.toLowerCase().endsWith('.zip');
            
            if (isZip) {
                this.handleZip(entryFile);
                return;
            }

            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');
            this.DOM.currentFile.textContent = 'Mappe Dateisystem (Resolving Tree)...';

            let allFiles = [];
            for (let i = 0; i < items.length; i++) {
                const item = items[i].webkitGetAsEntry();
                if (item) {
                    const files = await this.traverseDirectoryAsync(item);
                    allFiles = allFiles.concat(files);
                }
            }
            this.prepareDirectoryScan(allFiles);
        },

        async traverseDirectoryAsync(entry, path = "") {
            if (entry.isFile) {
                return new Promise(resolve => {
                    entry.file(f => resolve([{ file: f, fullPath: path + f.name }]));
                });
            } else if (entry.isDirectory) {
                const dirReader = entry.createReader();
                const entries = await this.readDirectoryEntries(dirReader);
                const nestedPromises = entries.map(e => this.traverseDirectoryAsync(e, path + entry.name + "/"));
                const results = await Promise.all(nestedPromises);
                return results.flat();
            }
            return [];
        },

        readDirectoryEntries(dirReader) {
            let entries = [];
            const readChunk = () => {
                return new Promise((resolve, reject) => {
                    dirReader.readEntries(results => {
                        if (results.length) {
                            entries = entries.concat(results);
                            readChunk().then(resolve).catch(reject);
                        } else {
                            resolve(entries);
                        }
                    }, reject);
                });
            };
            return readChunk();
        },

        prepareDirectoryScan(filesArray) {
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');

            filesArray.forEach(item => {
                const f = item.file ? item.file : item;
                const path = item.fullPath ? item.fullPath : (f.webkitRelativePath || f.name);
                
                if (this.shouldIgnore(path)) {
                    this.State.ignoredFiles++;
                } else {
                    this.State.fileQueue.push({ type: 'file', data: f, path: path });
                }
            });

            this.initScanCycle();
        },

        async handleZip(file) {
            if (typeof JSZip === 'undefined') {
                alert("VGT SYSTEMFEHLER: JSZip Bibliothek ist lokal nicht verfügbar. Bitte lade den Ordner direkt hoch.");
                return;
            }

            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');
            this.DOM.currentFile.textContent = 'Entpacke ZIP Archiv im RAM...'; // Safe text injection

            try {
                const zip = new JSZip();
                const zipContent = await zip.loadAsync(file);
                
                zipContent.forEach((relativePath, zipEntry) => {
                    if (!zipEntry.dir) {
                        if (this.shouldIgnore(relativePath)) {
                            this.State.ignoredFiles++;
                        } else {
                            this.State.fileQueue.push({ type: 'zip', data: zipEntry, path: relativePath });
                        }
                    }
                });

                this.initScanCycle();
            } catch(e) {
                console.error("VGT ZIP ERROR:", e);
                alert("Kritischer Fehler beim Entpacken der ZIP-Datei im Speicher.");
                this.resetEngine();
            }
        },

        shouldIgnore(path) {
            const p = path.toLowerCase();
            if (this.State.IGNORE_PATHS.some(ip => p.includes(ip))) return true;
            const extMatch = p.match(/\.[^.]+$/);
            if (extMatch && this.State.IGNORE_EXTS.has(extMatch[0])) return true;
            return false;
        },

        // --- SCANNER KERNEL ---
        initScanCycle() {
            this.State.totalFiles = this.State.fileQueue.length;
            this.DOM.statIgnored.textContent = this.State.ignoredFiles;
            this.DOM.statFiles.textContent = `0 / ${this.State.totalFiles}`;
            
            if (this.State.totalFiles === 0) {
                this.finishScan();
                return;
            }
            
            this.State.isScanning = true;
            this.updateStatus('scanning', 'SCANNING');
            
            // Asynchrone Batches starten (Verhindert Browser-Lockup)
            requestAnimationFrame(() => this.executeScanBatch());
        },

        async executeScanBatch() {
            if (!this.State.isScanning) return;

            const BATCH_SIZE = 15; // Balanciert RAM vs Performance
            let currentBatch = this.State.fileQueue.splice(0, BATCH_SIZE);

            for (const item of currentBatch) {
                this.DOM.currentFile.textContent = item.path; // textContent = XSS Safe
                
                try {
                    let textContent = '';
                    if (item.type === 'file') {
                        textContent = await item.data.text();
                    } else if (item.type === 'zip') {
                        textContent = await item.data.async("string");
                    }
                    this.analyzeContent(textContent, item.path);
                } catch(e) {
                    this.State.ignoredFiles++;
                }

                this.State.processedFiles++;
            }

            this.DOM.statFiles.textContent = `${this.State.processedFiles} / ${this.State.totalFiles}`;
            this.DOM.progressBar.style.width = `${(this.State.processedFiles / this.State.totalFiles) * 100}%`;

            if (this.State.fileQueue.length > 0) {
                setTimeout(() => requestAnimationFrame(() => this.executeScanBatch()), 0);
            } else {
                this.finishScan();
            }
        },

        analyzeContent(content, path) {
            const lines = content.split('\n');
            let fileThreats = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.length > 1500) continue; // Skip minified binary-blobs in text wrappers

                for (const sig of this.State.SIGNATURES) {
                    const match = line.match(sig.regex);
                    if (match) {
                        // Entropy Guard für generische Passwörter (Verhindert False Positives bei 'password: ""')
                        if (sig.id === 'Generic Password/Secret' && match[1]) {
                            if (this.calculateEntropy(match[1]) < 3.8) continue;
                        }
                        
                        fileThreats.push({
                            path: path,
                            lineNum: i + 1,
                            type: sig.id,
                            level: sig.level,
                            snippet: line.trim()
                        });
                    }
                }
            }

            if (fileThreats.length > 0) {
                this.State.foundThreats = this.State.foundThreats.concat(fileThreats);
                this.DOM.statThreats.textContent = this.State.foundThreats.length;
                this.injectThreatsToUI(fileThreats);
            }
        },

        // --- UI INJECTION (DIAMANT HARDENING) ---
        injectThreatsToUI(threats) {
            const emptyRow = document.getElementById('gl-empty-row');
            if (emptyRow) emptyRow.remove();

            const frag = document.createDocumentFragment();
            
            for (const t of threats) {
                // Native Erstellung (Verhindert DOM-XSS über manipulierte Repositories)
                const tr = document.createElement('tr');
                
                // Column 1: Badge
                const tdBadge = document.createElement('td');
                const badge = document.createElement('span');
                badge.className = `threat-badge ${t.level === 'critical' ? 'threat-critical' : 'threat-warning'}`;
                badge.textContent = t.level;
                tdBadge.appendChild(badge);
                
                // Column 2: Path & Line
                const tdPath = document.createElement('td');
                tdPath.className = 'path-col';
                const lineNum = document.createElement('span');
                lineNum.className = 'line-num';
                lineNum.textContent = `L${t.lineNum}`;
                tdPath.appendChild(lineNum);
                tdPath.appendChild(document.createTextNode(' ' + t.path)); // XSS-Safe Path
                
                // Column 3: Threat Type
                const tdType = document.createElement('td');
                tdType.style.fontWeight = '700';
                tdType.style.color = 'var(--vg-text)';
                tdType.textContent = t.type;
                
                // Column 4: Snippet (Most dangerous part - Safely injected)
                const tdSnippet = document.createElement('td');
                const snippetBox = document.createElement('div');
                snippetBox.className = 'snippet-box';
                snippetBox.textContent = t.snippet; // VGT SECURE: Kein HTML Parsing!
                tdSnippet.appendChild(snippetBox);
                
                tr.appendChild(tdBadge);
                tr.appendChild(tdPath);
                tr.appendChild(tdType);
                tr.appendChild(tdSnippet);
                
                frag.appendChild(tr);
            }
            
            this.DOM.tableBody.appendChild(frag);
        },

        finishScan() {
            this.State.isScanning = false;
            this.updateStatus('done', 'FINISHED');
            
            this.DOM.currentFile.textContent = 'Scan-Zyklus abgeschlossen.';
            this.DOM.progressBar.style.backgroundColor = 'rgba(var(--c-green), 1)';
            this.DOM.progressBar.style.boxShadow = '0 0 10px rgba(var(--c-green), 0.5)';

            if (this.State.foundThreats.length === 0) {
                this.safeClearOutput(this.DOM.tableBody);
                
                const tr = document.createElement('tr');
                tr.id = 'gl-empty-row';
                const td = document.createElement('td');
                td.className = 'empty-cell';
                td.colSpan = 4;
                td.style.color = 'rgba(var(--c-green), 1)';
                td.textContent = 'System sauber. Keine kompromittierten Secrets gefunden.';
                tr.appendChild(td);
                
                this.DOM.tableBody.appendChild(tr);
            } else {
                this.DOM.btnExport.classList.remove('hidden');
            }
        },

        resetEngine() {
            // Memory Flush
            this.State.fileQueue = [];
            this.State.foundThreats = [];
            this.State.processedFiles = 0;
            this.State.ignoredFiles = 0;
            this.State.isScanning = false;
            
            // UI Flush
            this.DOM.statFiles.textContent = '0';
            this.DOM.statIgnored.textContent = '0';
            this.DOM.statThreats.textContent = '0';
            this.DOM.currentFile.textContent = 'Warte auf Engine...';
            this.DOM.progressBar.style.width = '0%';
            this.DOM.progressBar.style.backgroundColor = '';
            this.DOM.progressBar.style.boxShadow = '';
            
            this.safeClearOutput(this.DOM.tableBody);
            
            const tr = document.createElement('tr');
            tr.id = 'gl-empty-row';
            const td = document.createElement('td');
            td.className = 'empty-cell';
            td.colSpan = 4;
            td.textContent = 'Scanner bereit. Bisher keine Leaks gefunden.';
            tr.appendChild(td);
            this.DOM.tableBody.appendChild(tr);
            
            this.DOM.btnExport.classList.add('hidden');
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            
            this.updateStatus('scanning', 'READY');
        },

        exportResultsAsCSV() {
            if (this.State.foundThreats.length === 0) return;

            let csvContent = "Level,Type,Path,Line,Snippet\n";
            this.State.foundThreats.forEach(t => {
                const safeSnippet = t.snippet.replace(/"/g, '""');
                csvContent += `"${t.level}","${t.type}","${t.path}",${t.lineNum},"${safeSnippet}"\n`;
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `VGT_GitLeak_Report_${new Date().getTime()}.csv`;
            document.body.appendChild(a);
            a.click();
            
            // Memory Cleanup
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        },

        // --- MATH UTILS ---
        calculateEntropy(str) {
            const freq = {};
            for (let i = 0; i < str.length; i++) {
                freq[str[i]] = (freq[str[i]] || 0) + 1;
            }
            let e = 0;
            for (const key in freq) {
                const p = freq[key] / str.length;
                e -= p * Math.log2(p);
            }
            return e;
        }
    };

    GitLeakerEngine.init();
});