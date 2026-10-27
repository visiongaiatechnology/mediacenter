/**
 * VGT ENERGY CORE LOGIC (DIAMANT SUPREME)
 * O(1) Real-time Math Engine for Power Consumption.
 * Client-Side CSV Parsing via PapaParse & ApexCharts Visualization.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-energy')) return;

    // Await Dependencies
    const ensureLibs = setInterval(() => {
        if (typeof Papa !== 'undefined' && typeof ApexCharts !== 'undefined') {
            clearInterval(ensureLibs);
            initEnergyEngine();
        }
    }, 100);

    function initEnergyEngine() {
        const DOM = {
            inPrice: document.getElementById('en-price-input'),
            modeTabs: document.querySelectorAll('.mode-tab'),
            viewManual: document.getElementById('mode-manual'),
            viewCsv: document.getElementById('mode-csv'),
            
            // Manual Mode
            inName: document.getElementById('dev-name'),
            inWatt: document.getElementById('dev-watt'),
            inHours: document.getElementById('dev-hours'),
            btnAddDev: document.getElementById('btn-add-device'),
            devList: document.getElementById('device-list'),
            
            statCostDay: document.getElementById('stat-cost-day'),
            statCostMonth: document.getElementById('stat-cost-month'),
            statCostYear: document.getElementById('stat-cost-year'),
            statKwhDay: document.getElementById('stat-kwh-day'),
            statKwhMonth: document.getElementById('stat-kwh-month'),
            statKwhYear: document.getElementById('stat-kwh-year'),
            
            chartDevEmpty: document.getElementById('chart-devices-empty'),
            chartDevCanvas: document.getElementById('chart-devices'),
            
            // CSV Mode
            dropZone: document.getElementById('csv-dropzone'),
            fileInput: document.getElementById('csv-file-input'),
            csvWorkspace: document.getElementById('csv-workspace'),
            csvFilename: document.getElementById('csv-filename'),
            btnCsvReset: document.getElementById('btn-csv-reset'),
            
            csvStatKwh: document.getElementById('csv-stat-kwh'),
            csvStatCost: document.getElementById('csv-stat-cost'),
            csvStatRows: document.getElementById('csv-stat-rows'),
            chartCsvCanvas: document.getElementById('chart-csv')
        };

        // --- State ---
        let state = {
            priceKwh: 0.30,
            devices: [],
            csvDataRaw: [],
            csvDataParsed: { labels: [], values: [] },
            chartManual: null,
            chartCsv: null
        };

        // Initialize price from DOM
        state.priceKwh = parseFloat(DOM.inPrice.value) || 0.30;

        // --- Global Config Listeners ---
        DOM.inPrice.addEventListener('input', (e) => {
            let p = parseFloat(e.target.value);
            if (p >= 0) {
                state.priceKwh = p;
                updateManualDashboard();
                if (state.csvDataParsed.values.length > 0) updateCsvDashboard();
            }
        });

        DOM.modeTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                DOM.modeTabs.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                const targetId = e.currentTarget.getAttribute('data-target');
                if (targetId === 'mode-manual') {
                    DOM.viewCsv.classList.add('hidden');
                    DOM.viewManual.classList.remove('hidden');
                } else {
                    DOM.viewManual.classList.add('hidden');
                    DOM.viewCsv.classList.remove('hidden');
                }
            });
        });

        // ==========================================
        // MODE 1: MANUAL DEVICES
        // ==========================================
        
        let fallbackIdCounter = 0;
        const generateId = () => {
            if (window.crypto && crypto.getRandomValues) {
                const bytes = new Uint8Array(12);
                crypto.getRandomValues(bytes);
                return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
            }

            fallbackIdCounter += 1;
            return `local-${Date.now().toString(36)}-${fallbackIdCounter.toString(36)}`;
        };

        const clearNode = (node) => {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        };

        const createRemoveIcon = () => {
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');

            const lineA = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineA.setAttribute('x1', '18');
            lineA.setAttribute('y1', '6');
            lineA.setAttribute('x2', '6');
            lineA.setAttribute('y2', '18');

            const lineB = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            lineB.setAttribute('x1', '6');
            lineB.setAttribute('y1', '6');
            lineB.setAttribute('x2', '18');
            lineB.setAttribute('y2', '18');

            svg.append(lineA, lineB);
            return svg;
        };

        const formatEuro = (num) => num.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
        const formatKwh = (num) => num.toLocaleString('de-DE', { maximumFractionDigits: 2 }) + ' kWh';

        DOM.btnAddDev.addEventListener('click', () => {
            const name = DOM.inName.value.trim();
            const watt = parseFloat(DOM.inWatt.value);
            const hours = parseFloat(DOM.inHours.value);

            if (!name || isNaN(watt) || isNaN(hours)) {
                alert("Bitte alle Felder korrekt ausfüllen.");
                return;
            }

            // Daily consumption: (Watt * Hours) / 1000 = kWh
            const kwhDay = (watt * hours) / 1000;
            const costDay = kwhDay * state.priceKwh;

            state.devices.push({
                id: generateId(),
                name, watt, hours, kwhDay, costDay
            });

            // Reset Inputs
            DOM.inName.value = '';
            DOM.inWatt.value = '';
            DOM.inHours.value = '';
            DOM.inName.focus();

            renderDeviceList();
            updateManualDashboard();
        });

        const removeDevice = (id) => {
            state.devices = state.devices.filter(d => d.id !== id);
            renderDeviceList();
            updateManualDashboard();
        };

        const renderDeviceList = () => {
            DOM.devList.innerHTML = '';
            if (state.devices.length === 0) {
                DOM.devList.innerHTML = '<div class="empty-state">Keine Geräte in der Matrix.</div>';
                return;
            }

            const frag = document.createDocumentFragment();
            state.devices.forEach(d => {
                const row = document.createElement('div');
                row.className = 'dev-row';
                
                // Recalculate cost in case price changed
                d.costDay = d.kwhDay * state.priceKwh;
                const costMonth = d.costDay * 30;

                row.innerHTML = `
                    <div class="dev-info">
                        <span class="dev-name"></span>
                        <span class="dev-meta">${d.watt}W • ${d.hours}h/Tag • ${formatKwh(d.kwhDay*30)}/Monat</span>
                    </div>
                    <span class="dev-cost">${formatEuro(costMonth)}</span>
                    <button class="btn-remove" data-id="${d.id}"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                `;
                
                row.querySelector('.dev-name').textContent = d.name;
                row.querySelector('.btn-remove').addEventListener('click', () => removeDevice(d.id));
                frag.appendChild(row);
            });
            DOM.devList.appendChild(frag);
        };

        const updateManualDashboard = () => {
            let sumKwhDay = 0;
            let sumCostDay = 0;

            state.devices.forEach(d => {
                d.costDay = d.kwhDay * state.priceKwh; // Update state if price changed
                sumKwhDay += d.kwhDay;
                sumCostDay += d.costDay;
            });

            // Update UI Numbers
            DOM.statKwhDay.textContent = formatKwh(sumKwhDay);
            DOM.statCostDay.textContent = formatEuro(sumCostDay);
            
            DOM.statKwhMonth.textContent = formatKwh(sumKwhDay * 30);
            DOM.statCostMonth.textContent = formatEuro(sumCostDay * 30);
            
            DOM.statKwhYear.textContent = formatKwh(sumKwhDay * 365);
            DOM.statCostYear.textContent = formatEuro(sumCostDay * 365);

            // Re-render list to reflect potential price changes
            if(state.devices.length > 0) renderDeviceList();

            // Update Chart
            renderManualChart();
        };

        const renderManualChart = () => {
            if (state.devices.length === 0) {
                if (state.chartManual) {
                    state.chartManual.destroy();
                    state.chartManual = null;
                }
                DOM.chartDevEmpty.style.display = 'flex';
                return;
            }

            DOM.chartDevEmpty.style.display = 'none';

            const labels = state.devices.map(d => d.name);
            const data = state.devices.map(d => parseFloat((d.kwhDay * 30).toFixed(2))); // Monthly kWh
            
            // Custom Color Palette
            const colors = ['#facc15', '#22d3ee', '#bc13fe', '#4ade80', '#ff0055', '#3b82f6'];

            if (!state.chartManual) {
                const options = {
                    series: data,
                    labels: labels,
                    chart: { type: 'donut', height: '100%', background: 'transparent' },
                    colors: colors,
                    stroke: { width: 0 },
                    dataLabels: { enabled: false },
                    legend: { position: 'bottom', labels: { colors: '#9ca3af' } },
                    theme: { mode: 'dark' },
                    tooltip: {
                        theme: 'dark',
                        y: { formatter: (val) => val + " kWh/Monat" }
                    }
                };
                state.chartManual = new ApexCharts(DOM.chartDevCanvas, options);
                state.chartManual.render();
            } else {
                state.chartManual.updateOptions({ labels: labels, series: data });
            }
        };

        // ==========================================
        // MODE 2: SMART METER CSV
        // ==========================================
        
        DOM.dropZone.addEventListener('dragover', (e) => { e.preventDefault(); DOM.dropZone.classList.add('dragover'); });
        DOM.dropZone.addEventListener('dragleave', () => DOM.dropZone.classList.remove('dragover'));
        DOM.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            DOM.dropZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) handleCsvFile(e.dataTransfer.files[0]);
        });
        DOM.dropZone.addEventListener('click', () => DOM.fileInput.click());
        DOM.fileInput.addEventListener('change', (e) => {
            if (e.target.files.length) handleCsvFile(e.target.files[0]);
            DOM.fileInput.value = '';
        });

        DOM.btnCsvReset.addEventListener('click', () => {
            state.csvDataRaw = [];
            state.csvDataParsed = { labels: [], values: [] };
            DOM.csvWorkspace.classList.add('hidden');
            DOM.dropZone.classList.remove('hidden');
            if (state.chartCsv) {
                state.chartCsv.destroy();
                state.chartCsv = null;
            }
        });

        const handleCsvFile = (file) => {
            if (!file.name.toLowerCase().endsWith('.csv')) {
                alert("Sicherheitsblockade: Bitte lade ein CSV-Format hoch.");
                return;
            }

            DOM.csvFilename.textContent = file.name;
            
            // Failsafe: German CSVs often use semi-colons and comma for decimals.
            // PapaParse tries to auto-detect delimiter. We will pre-process the text to fix commas in numbers if needed.
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                
                Papa.parse(text, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        processSmartMeterData(results.data, results.meta.fields);
                    },
                    error: (err) => {
                        alert("Fehler beim Parsen der CSV.");
                    }
                });
            };
            reader.readAsText(file);
        };

        const processSmartMeterData = (data, headers) => {
            if (!data || data.length === 0 || headers.length < 2) {
                alert("CSV-Struktur nicht erkannt. Mindestens 2 Spalten (Datum/Zeit & Verbrauch) erforderlich.");
                return;
            }

            // Heuristic Auto-Detection:
            // Find the first column that looks like a date/time (or just use col 0).
            // Find the first column that contains numerical data for consumption.
            let timeCol = headers[0];
            let valCol = headers[1];

            // Attempt to find a column with "verbrauch", "kwh", "wert" in name
            for (let h of headers) {
                const hl = h.toLowerCase();
                if (hl.includes('kwh') || hl.includes('verbrauch') || hl.includes('wert') || hl.includes('menge')) {
                    valCol = h;
                }
                if (hl.includes('datum') || hl.includes('zeit') || hl.includes('date') || hl.includes('time')) {
                    timeCol = h;
                }
            }

            const cleanValue = (val) => {
                if (typeof val === 'number') return val;
                if (typeof val === 'string') {
                    // German format fix: "12,5" -> "12.5"
                    let cleaned = val.replace(',', '.');
                    // Remove non-numeric chars except dot and minus
                    cleaned = cleaned.replace(/[^0-9.-]/g, '');
                    return parseFloat(cleaned) || 0;
                }
                return 0;
            };

            let labels = [];
            let values = [];

            data.forEach(row => {
                let x = row[timeCol] || '';
                let y = cleanValue(row[valCol]);
                
                if (x !== '') {
                    labels.push(x.toString());
                    values.push(y);
                }
            });

            if (values.length === 0) {
                alert("Konnte keine numerischen Verbrauchsdaten auslesen. Bitte CSV-Format prüfen.");
                return;
            }

            state.csvDataParsed = { labels, values };
            
            DOM.dropZone.classList.add('hidden');
            DOM.csvWorkspace.classList.remove('hidden');

            updateCsvDashboard();
            renderCsvChart();
        };

        const updateCsvDashboard = () => {
            const values = state.csvDataParsed.values;
            const totalKwh = values.reduce((sum, val) => sum + val, 0);
            const totalCost = totalKwh * state.priceKwh;

            DOM.csvStatKwh.textContent = formatKwh(totalKwh);
            DOM.csvStatCost.textContent = formatEuro(totalCost);
            DOM.csvStatRows.textContent = values.length.toLocaleString('de-DE');
        };

        const renderCsvChart = () => {
            const { labels, values } = state.csvDataParsed;

            if (state.chartCsv) state.chartCsv.destroy();

            const options = {
                series: [{ name: 'Verbrauch (kWh)', data: values }],
                chart: { 
                    type: 'area', 
                    height: '100%', 
                    background: 'transparent',
                    toolbar: { show: true, tools: { download: true, selection: true, zoom: true, pan: true } },
                    fontFamily: 'inherit'
                },
                colors: ['#facc15'], // VGT Yellow
                fill: {
                    type: 'gradient',
                    gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 100] }
                },
                dataLabels: { enabled: false },
                stroke: { curve: 'smooth', width: 2 },
                xaxis: { 
                    categories: labels,
                    labels: { style: { colors: '#9ca3af', fontFamily: 'monospace' } },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    tickAmount: Math.min(labels.length, 10) // Prevent label crowding
                },
                yaxis: { 
                    labels: { 
                        style: { colors: '#9ca3af', fontFamily: 'monospace' },
                        formatter: (val) => val.toFixed(2)
                    } 
                },
                grid: { borderColor: 'rgba(255, 255, 255, 0.05)', strokeDashArray: 4 },
                theme: { mode: 'dark' },
                tooltip: {
                    theme: 'dark',
                    y: { formatter: (val) => val.toLocaleString('de-DE', { maximumFractionDigits: 3 }) + " kWh" }
                }
            };

            state.chartCsv = new ApexCharts(DOM.chartCsvCanvas, options);
            state.chartCsv.render();
        };

    }
});
