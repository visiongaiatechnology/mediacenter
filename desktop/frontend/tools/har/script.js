/**
 * VGT MEDIACENTER - HAR-REACTOR LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Object Encapsulation & Native Rendering
 * O(n) Local Log Parsing and ApexCharts Telemetry Rendering.
 * Checks network traces for plain text auth tokens and tracking cookies.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-har')) return;

    const HarReactorEngine = {
        DOM: {},
        State: {
            charts: { domains: null, types: null },
            isProcessing: false,
            MAX_FILE_SIZE: 50 * 1024 * 1024 // 50MB Soft-Limit für RAM
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('har-dropzone'),
                fileInput: document.getElementById('har-file-input'),
                workspace: document.getElementById('har-workspace'),
                btnReset: document.getElementById('btn-har-reset'),
                
                statReqs: document.getElementById('stat-reqs'),
                statSize: document.getElementById('stat-size'),
                statTime: document.getElementById('stat-time'),
                statThreats: document.getElementById('stat-threats'),
                
                chartDomains: document.getElementById('chart-domains'),
                chartTypes: document.getElementById('chart-types'),
                
                threatList: document.getElementById('threat-list'),
                threatBadge: document.getElementById('threat-badge')
            };
        },

        waitForDependencies() {
            const ensureLibLoaded = setInterval(() => {
                if (typeof ApexCharts !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    console.log('VGT HAR-REACTOR: Network Forensics Engine Active.');
                }
            }, 100);
        },

        bindEvents() {
            // Dropzone Actions
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
                if (e.dataTransfer.files.length) this.handleFile(e.dataTransfer.files[0]);
            });
            
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleFile(e.target.files[0]);
                this.DOM.fileInput.value = ''; // Reset für Re-Selection
            });

            this.DOM.btnReset.addEventListener('click', () => this.resetTool());
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        formatBytes(bytes) {
            if (bytes === 0 || bytes === -1) return '0 B'; // HAR nutzt oft -1 für Caching
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
            return parseFloat((Math.abs(bytes) / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // --- ENGINE LOGIC ---
        resetTool() {
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            
            // Charts via Apex API sauber aus dem RAM werfen
            if (this.State.charts.domains) {
                this.State.charts.domains.destroy();
                this.State.charts.domains = null;
            }
            if (this.State.charts.types) {
                this.State.charts.types.destroy();
                this.State.charts.types = null;
            }

            this.safeClearOutput(this.DOM.threatList);
            this.State.isProcessing = false;
        },

        handleFile(file) {
            if (!file.name.toLowerCase().endsWith('.har') && file.type !== 'application/json') {
                alert("VGT SECURITY BLOCK: Nur reine HTTP-Archive (.har) im JSON Format sind erlaubt.");
                return;
            }

            if (file.size > this.State.MAX_FILE_SIZE) {
                if(!confirm(`VGT PERFORMANCE WARNING: Diese HAR Datei ist extrem groß (${this.formatBytes(file.size)}). Das lokale Parsing im Browser-RAM kann kurzzeitig zu Lags führen. Fortfahren?`)) {
                    return;
                }
            }

            this.State.isProcessing = true;
            this.DOM.dropZone.classList.add('hidden');
            
            // Temporary Loading Indicator inside Workspace could be added here
            this.DOM.workspace.classList.remove('hidden');

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    if (!data.log || !data.log.entries) throw new Error("Kein valides HAR Struktur-Format (log.entries fehlt).");
                    this.analyzeTraffic(data.log.entries);
                } catch (err) {
                    console.error("VGT HAR PARSER ERROR:", err);
                    alert("Kritischer Fehler: Datei ist kein valides HTTP Archive oder defekt.");
                    this.resetTool();
                }
            };
            reader.onerror = () => {
                alert("I/O Systemfehler beim Lesen der Datei.");
                this.resetTool();
            };
            
            reader.readAsText(file);
        },

        analyzeTraffic(entries) {
            let totalSize = 0;
            let totalTime = 0;
            
            // Nutzung von ES6 Maps (Schutz vor Prototype Pollution)
            let domainMap = new Map();
            let typeMap = new Map();
            let threats = [];

            entries.forEach(entry => {
                // Time & Size
                totalTime += entry.time || 0;
                const reqSize = Math.max(0, entry.request.bodySize || 0);
                const resSize = Math.max(0, entry.response.bodySize || 0);
                totalSize += (reqSize + resSize);

                // Domain Analysis
                try {
                    const url = new URL(entry.request.url);
                    const domain = url.hostname;
                    domainMap.set(domain, (domainMap.get(domain) || 0) + 1);
                } catch(e) {
                    // Ignore unparseable URLs
                }

                // MimeType Analysis
                const mime = entry.response.content.mimeType || 'unknown';
                const cleanMime = mime.split(';')[0].trim(); // Remove charset appendings
                typeMap.set(cleanMime, (typeMap.get(cleanMime) || 0) + 1);

                // Threat Scan (Headers & Query)
                let entryThreats = [];
                
                // Scan Request Headers
                if (entry.request.headers && Array.isArray(entry.request.headers)) {
                    entry.request.headers.forEach(h => {
                        const name = (h.name || '').toLowerCase();
                        if (name === 'authorization') {
                            entryThreats.push({ type: 'AUTH_LEAK', key: 'Authorization Header', val: h.value });
                        }
                        if (name === 'cookie') {
                            entryThreats.push({ type: 'COOKIE_BROADCAST', key: 'Cookie Data', val: h.value });
                        }
                    });
                }

                // Scan Queries for Tokens
                if (entry.request.queryString && Array.isArray(entry.request.queryString)) {
                    entry.request.queryString.forEach(q => {
                        const n = (q.name || '').toLowerCase();
                        if (n.includes('token') || n.includes('auth') || n.includes('session')) {
                            entryThreats.push({ type: 'URL_TOKEN_LEAK', key: `Query: ${q.name}`, val: q.value });
                        }
                    });
                }

                if (entryThreats.length > 0) {
                    threats.push({ url: entry.request.url, items: entryThreats });
                }
            });

            // Update UI Stats natively
            this.DOM.statReqs.textContent = entries.length.toLocaleString('de-DE');
            this.DOM.statSize.textContent = this.formatBytes(totalSize);
            this.DOM.statTime.textContent = `${Math.round(totalTime).toLocaleString('de-DE')} ms`;
            this.DOM.statThreats.textContent = threats.length.toLocaleString('de-DE');

            this.renderCharts(domainMap, typeMap);
            this.renderThreats(threats);
            this.State.isProcessing = false;
        },

        // --- RENDER ENGINES ---
        renderCharts(domainMap, typeMap) {
            // Sort & Slice Top 10 Domains
            const domData = [...domainMap.entries()].sort((a,b) => b[1] - a[1]).slice(0, 10);
            const domLabels = domData.map(i => i[0]);
            const domValues = domData.map(i => i[1]);

            // Sort & Slice Top 7 Types
            const typeData = [...typeMap.entries()].sort((a,b) => b[1] - a[1]).slice(0, 7);
            const typeLabels = typeData.map(i => i[0]);
            const typeValues = typeData.map(i => i[1]);

            const themeColor = 'rgba(34, 211, 238, 1)'; // Cyan

            // Chart 1: Domains (Bar)
            if (this.State.charts.domains) this.State.charts.domains.destroy();
            this.State.charts.domains = new ApexCharts(this.DOM.chartDomains, {
                series: [{ name: 'Requests', data: domValues }],
                chart: { type: 'bar', height: '100%', background: 'transparent', toolbar: { show: false } },
                colors: [themeColor],
                plotOptions: { bar: { borderRadius: 4, horizontal: true } },
                dataLabels: { enabled: false },
                xaxis: { categories: domLabels, labels: { style: { colors: '#9ca3af' } } },
                yaxis: { labels: { style: { colors: '#9ca3af', fontFamily: 'monospace' } } },
                theme: { mode: 'dark' }
            });
            this.State.charts.domains.render();

            // Chart 2: Types (Pie)
            if (this.State.charts.types) this.State.charts.types.destroy();
            this.State.charts.types = new ApexCharts(this.DOM.chartTypes, {
                series: typeValues,
                labels: typeLabels,
                chart: { type: 'donut', height: '100%', background: 'transparent' },
                colors: [themeColor, '#bc13fe', '#00ff9d', '#ffb700', '#ff0055', '#3b82f6', '#6b7280'],
                stroke: { width: 0 },
                dataLabels: { enabled: false },
                legend: { position: 'bottom', labels: { colors: '#9ca3af' } },
                theme: { mode: 'dark' }
            });
            this.State.charts.types.render();
        },

        renderThreats(threats) {
            this.safeClearOutput(this.DOM.threatList);
            
            if (threats.length === 0) {
                this.DOM.threatBadge.textContent = 'SYSTEM SECURE';
                this.DOM.threatBadge.className = 'status-badge safe';
                
                const emptyState = document.createElement('div');
                emptyState.style.cssText = 'padding: 2rem; text-align: center; color: var(--vg-text-muted); font-family: var(--font-mono);';
                emptyState.textContent = 'Keine offensichtlichen Leaks in den Headern gefunden.';
                this.DOM.threatList.appendChild(emptyState);
                return;
            }

            this.DOM.threatBadge.textContent = `${threats.length.toLocaleString('de-DE')} LEAKS GEFUNDEN`;
            this.DOM.threatBadge.className = 'status-badge danger';

            const frag = document.createDocumentFragment();

            // Render max 50 to prevent DOM overload & freezing
            threats.slice(0, 50).forEach(t => {
                // VGT DOM HARDENING: Strict Native Nodes
                const card = document.createElement('div');
                card.className = 'threat-card';

                // Header
                const header = document.createElement('div');
                header.className = 'tc-header';
                
                const spanDomain = document.createElement('span');
                spanDomain.className = 'tc-domain';
                try {
                    spanDomain.textContent = new URL(t.url).hostname || 'Unknown'; // XSS Safe
                } catch(e) {
                    spanDomain.textContent = 'Unknown Domain';
                }

                const spanType = document.createElement('span');
                spanType.className = 'tc-type';
                spanType.textContent = 'EXPOSED';
                
                header.appendChild(spanDomain);
                header.appendChild(spanType);

                // Body
                const body = document.createElement('div');
                body.className = 'tc-body';

                t.items.forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'tc-row';
                    
                    const spanKey = document.createElement('span');
                    spanKey.className = 'tc-key';
                    spanKey.textContent = `${item.key} [${item.type}]`; // XSS Safe
                    
                    const spanVal = document.createElement('span');
                    spanVal.className = 'tc-val';
                    spanVal.textContent = item.val; // Absolute XSS Immunity for raw header data
                    
                    row.appendChild(spanKey);
                    row.appendChild(spanVal);
                    body.appendChild(row);
                });

                card.appendChild(header);
                card.appendChild(body);
                frag.appendChild(card);
            });

            this.DOM.threatList.appendChild(frag);

            if (threats.length > 50) {
                const warning = document.createElement('div');
                warning.style.cssText = 'padding: 1rem; text-align: center; color: rgba(var(--c-pink), 1); font-size: 12px;';
                warning.textContent = `... und ${threats.length - 50} weitere Leaks. (Ansicht aus RAM-Schutzgründen limitiert).`;
                this.DOM.threatList.appendChild(warning);
            }
        }
    };

    HarReactorEngine.init();
});