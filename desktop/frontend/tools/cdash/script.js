/**
 * VGT MEDIACENTER - DATA CORE LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Prototype Pollution Defense & Memory Safe Aggregation
 * Client-Side CSV/JSON parsing via PapaParse & ApexCharts rendering.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-datacore')) return;

    const DataCoreEngine = {
        DOM: {},
        State: {
            rawData: null,
            headers: [],
            numericCols: [],
            categoricalCols: [],
            chartInstance: null,
            currentChartType: 'bar',
            isProcessing: false,
            MAX_FILE_SIZE: 10485760 // 10MB Soft-Limit für RAM
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('dc-drop-zone'),
                dropText: document.getElementById('dc-drop-text'),
                fileInput: document.getElementById('dc-file-input'),
                
                configPanel: document.getElementById('dc-config-panel'),
                statsPanel: document.getElementById('dc-stats-panel'),
                
                selectX: document.getElementById('dc-select-x'),
                selectY: document.getElementById('dc-select-y'),
                typeBtns: document.querySelectorAll('.dc-type-btn'),
                btnRender: document.getElementById('dc-btn-render'),
                
                tabBtns: document.querySelectorAll('.dc-tab-btn'),
                views: document.querySelectorAll('.dc-view'),
                
                chartCanvas: document.getElementById('dc-chart-canvas'),
                chartEmpty: document.getElementById('dc-chart-empty'),
                
                tableHead: document.getElementById('dc-table-head'),
                tableBody: document.getElementById('dc-table-body'),
                statRows: document.getElementById('dc-stat-rows'),
                statCols: document.getElementById('dc-stat-cols')
            };
        },

        waitForDependencies() {
            const ensureLibs = setInterval(() => {
                // PapaParse und ApexCharts werden via SRI vom Core bereitgestellt
                if (typeof Papa !== 'undefined' && typeof ApexCharts !== 'undefined') {
                    clearInterval(ensureLibs);
                    this.bindEvents();
                    console.log('VGT DATA CORE: Analytical Nexus Active.');
                }
            }, 100);
        },

        bindEvents() {
            // --- Drag & Drop Ingestion ---
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
                if (e.dataTransfer.files.length) this.processFile(e.dataTransfer.files[0]);
            });
            
            // Click Upload
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.processFile(e.target.files[0]);
                this.DOM.fileInput.value = ''; // Reset für erneute Auswahl
            });

            // --- UI Tabs & Toggles ---
            this.DOM.tabBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.tabBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    
                    const targetId = e.currentTarget.getAttribute('data-target');
                    this.DOM.views.forEach(v => {
                        v.classList.add('hidden');
                        v.classList.remove('active');
                    });
                    
                    const targetView = document.getElementById(targetId);
                    if (targetView) {
                        targetView.classList.remove('hidden');
                        targetView.classList.add('active');
                    }
                });
            });

            this.DOM.typeBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.typeBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.currentChartType = e.currentTarget.getAttribute('data-type');
                });
            });

            this.DOM.btnRender.addEventListener('click', () => this.computeVisuals());
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVGIcon(element, svgString, appendText = '') {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'image/svg+xml');
            element.appendChild(doc.documentElement);
            if (appendText) {
                const textNode = document.createTextNode(appendText);
                element.appendChild(textNode);
            }
        },

        // --- INGESTION ENGINE ---
        processFile(file) {
            if (this.State.isProcessing) return;

            if (file.size > this.State.MAX_FILE_SIZE) {
                if (!confirm("VGT PERFORMANCE WARNING:\nDie Datei ist größer als 10MB. Die Verarbeitung im Browser-RAM kann zu temporären Lags führen. Fortsetzen?")) {
                    return;
                }
            }

            const ext = file.name.split('.').pop().toLowerCase();
            this.State.isProcessing = true;
            this.DOM.dropText.textContent = 'Analysiere Datenmatrix...';

            if (ext === 'csv') {
                Papa.parse(file, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    worker: true, // Nutzt WebWorker um den Main-Thread nicht zu blockieren
                    complete: (results) => this.handleParsedData(results.data, results.meta.fields),
                    error: (error) => {
                        alert(`VGT PARSER ERROR: ${error.message}`);
                        this.resetIngestionUI();
                    }
                });
            } else if (ext === 'json') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (Array.isArray(data) && data.length > 0 && typeof data[0] === 'object') {
                            const headers = Object.keys(data[0]);
                            this.handleParsedData(data, headers);
                        } else {
                            throw new Error("Invalid Array-of-Objects structure");
                        }
                    } catch (err) {
                        alert('VGT JSON ERROR: Datensatz muss ein valides Array von Objekten sein.');
                        this.resetIngestionUI();
                    }
                };
                reader.readAsText(file);
            } else {
                alert('VGT SECURITY BLOCK: Nur CSV oder JSON Formate sind zugelassen.');
                this.resetIngestionUI();
            }
        },

        handleParsedData(data, fields) {
            if (!data || data.length === 0 || !fields) {
                alert('VGT DATA ERROR: Der Datensatz ist leer oder fehlerhaft formatiert.');
                this.resetIngestionUI();
                return;
            }

            this.State.rawData = data;
            this.State.headers = fields;
            
            this.analyzeDataTypes();
            this.populateSelectors();
            this.renderTablePreview();
            this.updateGlobalStats();

            this.DOM.configPanel.classList.remove('hidden');
            this.DOM.statsPanel.classList.remove('hidden');

            this.resetIngestionUI(`Erfolgreich geladen: ${data.length.toLocaleString('de-DE')} Datensätze`);
            this.State.isProcessing = false;
        },

        analyzeDataTypes() {
            this.State.numericCols = [];
            this.State.categoricalCols = [];
            
            const sampleRow = this.State.rawData[0];
            
            this.State.headers.forEach(header => {
                const val = sampleRow[header];
                if (typeof val === 'number' && !isNaN(val)) {
                    this.State.numericCols.push(header);
                } else {
                    this.State.categoricalCols.push(header);
                }
            });
            
            // Fallbacks if data is highly uniform
            if (this.State.categoricalCols.length === 0) this.State.categoricalCols = this.State.headers;
            if (this.State.numericCols.length === 0) this.State.numericCols = this.State.headers;
        },

        resetIngestionUI(msg = 'CSV / JSON hier ablegen') {
            this.DOM.dropText.textContent = msg; // XSS Safe!
            this.State.isProcessing = false;
        },

        // --- DOM RENDER ENGINE ---
        populateSelectors() {
            this.safeClearOutput(this.DOM.selectX);
            this.safeClearOutput(this.DOM.selectY);

            // Populate X-Axis (Categories/Dimensions)
            this.State.headers.forEach(header => {
                const opt = document.createElement('option');
                opt.value = header;
                opt.textContent = header;
                this.DOM.selectX.appendChild(opt);
            });

            // Populate Y-Axis (Metrics/Numbers)
            this.State.numericCols.forEach(header => {
                const opt = document.createElement('option');
                opt.value = header;
                opt.textContent = `${header} (Num)`;
                this.DOM.selectY.appendChild(opt);
            });
        },

        updateGlobalStats() {
            this.DOM.statRows.textContent = this.State.rawData.length.toLocaleString('de-DE');
            this.DOM.statCols.textContent = this.State.headers.length.toLocaleString('de-DE');
        },

        renderTablePreview() {
            this.safeClearOutput(this.DOM.tableHead);
            this.safeClearOutput(this.DOM.tableBody);

            // Header Row
            const trHead = document.createElement('tr');
            this.State.headers.forEach(h => {
                const th = document.createElement('th');
                th.textContent = h; // XSS Safe
                trHead.appendChild(th);
            });
            this.DOM.tableHead.appendChild(trHead);

            // Data Rows (Limited to 100 for RAM protection)
            const limit = Math.min(this.State.rawData.length, 100);
            const fragment = document.createDocumentFragment();

            for (let i = 0; i < limit; i++) {
                const row = this.State.rawData[i];
                const tr = document.createElement('tr');
                
                this.State.headers.forEach(h => {
                    const td = document.createElement('td');
                    // XSS Safe: textContent ensures HTML tags inside CSV cells are rendered as string, not executed.
                    td.textContent = (row[h] !== null && row[h] !== undefined) ? String(row[h]) : '-';
                    tr.appendChild(td);
                });
                fragment.appendChild(tr);
            }
            this.DOM.tableBody.appendChild(fragment);
        },

        // --- VISUALIZATION ENGINE (APEXCHARTS) ---
        computeVisuals() {
            const xCol = this.DOM.selectX.value;
            const yCol = this.DOM.selectY.value;

            if (!xCol || !yCol) return;

            // Visual Processing Feedback
            const spinnerSvg = `<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`;
            this.injectSVGIcon(this.DOM.btnRender, spinnerSvg, ' Computing...');

            // Timeout allows UI to paint the loading state
            setTimeout(() => {
                // VGT HARDENING: Using ES6 Map to prevent Prototype Pollution via malicious CSV keys
                const aggregated = new Map();
                
                this.State.rawData.forEach(row => {
                    const xVal = String(row[xCol] || 'Unknown');
                    const yVal = parseFloat(row[yCol]) || 0;
                    
                    if (!aggregated.has(xVal)) {
                        aggregated.set(xVal, 0);
                    }
                    aggregated.set(xVal, aggregated.get(xVal) + yVal);
                });

                // Sort and limit to Top 50 to prevent chart rendering crash
                const sortedEntries = [...aggregated.entries()]
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 50);

                const labels = sortedEntries.map(e => e[0]);
                const seriesData = sortedEntries.map(e => e[1]);

                this.renderChart(labels, seriesData, xCol, yCol);

                // Restore Button UI
                const checkSvg = `<svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
                this.injectSVGIcon(this.DOM.btnRender, checkSvg, ' Compute Visuals');
            }, 50);
        },

        renderChart(labels, seriesData, xName, yName) {
            // Garbage Collection for old chart
            if (this.State.chartInstance) {
                this.State.chartInstance.destroy();
            }
            this.DOM.chartEmpty.style.display = 'none';

            const isPie = this.State.currentChartType === 'pie';
            const colorPurple = 'rgba(168, 85, 247, 1)';
            const colorCyan = 'rgba(34, 211, 238, 1)';
            const pieColors = [colorPurple, colorCyan, '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#eab308'];

            const options = {
                series: isPie ? seriesData : [{ name: yName, data: seriesData }],
                chart: {
                    type: this.State.currentChartType,
                    height: '100%',
                    background: 'transparent',
                    toolbar: { show: true, tools: { download: true, selection: true, zoom: true, pan: true } },
                    fontFamily: 'inherit',
                    animations: { enabled: true, easing: 'easeinout', speed: 800 }
                },
                colors: isPie ? pieColors : [colorPurple],
                plotOptions: {
                    bar: { borderRadius: 4, columnWidth: '60%' }
                },
                dataLabels: { enabled: false },
                stroke: { curve: 'smooth', width: isPie ? 0 : 2 },
                xaxis: {
                    categories: isPie ? [] : labels,
                    labels: {
                        style: { colors: '#9ca3af', fontFamily: 'monospace' },
                        formatter: (val) => val && String(val).length > 15 ? String(val).substring(0, 15) + '...' : val
                    },
                    axisBorder: { show: false },
                    axisTicks: { show: false }
                },
                yaxis: {
                    labels: {
                        style: { colors: '#9ca3af', fontFamily: 'monospace' },
                        formatter: (val) => val.toLocaleString('de-DE', { maximumFractionDigits: 2 })
                    }
                },
                labels: isPie ? labels : [], 
                grid: {
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                    strokeDashArray: 4,
                    yaxis: { lines: { show: !isPie } }
                },
                theme: { mode: 'dark' },
                tooltip: {
                    theme: 'dark',
                    y: { formatter: (val) => val.toLocaleString('de-DE') + " " + yName }
                }
            };

            this.State.chartInstance = new ApexCharts(this.DOM.chartCanvas, options);
            this.State.chartInstance.render();
        }
    };

    DataCoreEngine.init();
});