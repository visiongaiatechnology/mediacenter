/**
 * VGT COSMIC BIORHYTHM LOGIC (DIAMANT SUPREME)
 * Advanced Sine-Wave Mathematics augmented with SunCalc.js Cosmic Telemetry.
 * PATCH: Stabilisierte Chart.js Plugin-Engine & Try/Catch Failsafe.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-bio')) return;

    // Await dependencies
    const ensureLibs = setInterval(() => {
        if (typeof Chart !== 'undefined' && typeof SunCalc !== 'undefined') {
            clearInterval(ensureLibs);
            initBioEngine();
        }
    }, 100);

    function initBioEngine() {
        const DOM = {
            inputDob: document.getElementById('bio-dob-input'),
            btnSync: document.getElementById('btn-sync-bio'),
            cosmicPanel: document.getElementById('cosmic-panel'),
            mainPanel: document.getElementById('bio-main'),
            
            // Cosmic Data
            cMoonPhase: document.getElementById('c-moon-phase'),
            cMoonMod: document.getElementById('c-moon-mod'),
            cZodiac: document.getElementById('c-zodiac'),
            cZodiacMod: document.getElementById('c-zodiac-mod'),
            cSeason: document.getElementById('c-season'),
            cSeasonMod: document.getElementById('c-season-mod'),
            
            // Today's Telemetry
            todayDate: document.getElementById('bio-today-date'),
            valPhy: document.getElementById('val-phy'),
            valEmo: document.getElementById('val-emo'),
            valInt: document.getElementById('val-int'),
            valSpi: document.getElementById('val-spi'),
            barPhy: document.getElementById('bar-phy'),
            barEmo: document.getElementById('bar-emo'),
            barInt: document.getElementById('bar-int'),
            barSpi: document.getElementById('bar-spi'),
            descPhy: document.getElementById('desc-phy'),
            descEmo: document.getElementById('desc-emo'),
            descInt: document.getElementById('desc-int'),
            descSpi: document.getElementById('desc-spi'),
            
            critWarning: document.getElementById('critical-warning'),
            critText: document.getElementById('critical-text')
        };

        let chartInstance = null;

        // Custom Chart.js Plugin for "TODAY" Vertical Line (Safeguarded)
        const todayLinePlugin = {
            id: 'todayLine',
            beforeDraw: chart => {
                // Safeguard: Prüfen ob Tooltip existiert, um Absturz zu verhindern
                if (chart.tooltip && chart.tooltip._active && chart.tooltip._active.length) return; 
                
                const ctx = chart.ctx;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                
                if (!xAxis || !yAxis) return; // Safety check
                
                // Find index of "Heute"
                const todayIndex = chart.data.labels.findIndex(l => l.includes('Heute'));
                if (todayIndex !== -1) {
                    const x = xAxis.getPixelForTick(todayIndex);
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, yAxis.top);
                    ctx.lineTo(x, yAxis.bottom);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                    ctx.setLineDash([5, 5]);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        };

        // --- Core Math Engine ---
        // Formula: sin(2 * PI * (t / P)) * 100
        const calculateBioValue = (daysLived, period) => {
            return Math.sin((2 * Math.PI * daysLived) / period) * 100;
        };

        const getDaysDiff = (start, end) => {
            const msPerDay = 1000 * 60 * 60 * 24;
            // UTC to ignore daylight saving shifts
            const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
            const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
            return Math.floor((utcEnd - utcStart) / msPerDay);
        };

        // --- Cosmic Lore Engines ---
        const getZodiac = (date) => {
            const d = date.getDate();
            const m = date.getMonth() + 1; // 1-12
            
            if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return { name: 'Widder', element: 'Feuer (Physisch / Energie)' };
            if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return { name: 'Stier', element: 'Erde (Stabilität / Pragmatismus)' };
            if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return { name: 'Zwillinge', element: 'Luft (Intellekt / Logik)' };
            if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return { name: 'Krebs', element: 'Wasser (Emotion / Intuition)' };
            if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return { name: 'Löwe', element: 'Feuer (Physisch / Energie)' };
            if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return { name: 'Jungfrau', element: 'Erde (Stabilität / Pragmatismus)' };
            if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return { name: 'Waage', element: 'Luft (Intellekt / Logik)' };
            if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return { name: 'Skorpion', element: 'Wasser (Emotion / Intuition)' };
            if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return { name: 'Schütze', element: 'Feuer (Physisch / Energie)' };
            if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return { name: 'Steinbock', element: 'Erde (Stabilität / Pragmatismus)' };
            if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return { name: 'Wassermann', element: 'Luft (Intellekt / Logik)' };
            return { name: 'Fische', element: 'Wasser (Emotion / Intuition)' };
        };

        const getSeason = (date) => {
            const m = date.getMonth() + 1;
            if (m >= 3 && m <= 5) return { name: 'Frühling', mod: 'Regeneration ++' };
            if (m >= 6 && m <= 8) return { name: 'Sommer', mod: 'Physischer Output ++' };
            if (m >= 9 && m <= 11) return { name: 'Herbst', mod: 'Kognitive Ernte ++' };
            return { name: 'Winter', mod: 'Spirituelle Reflexion ++' };
        };

        const getMoonData = (date) => {
            const phase = SunCalc.getMoonIllumination(date).phase;
            if (phase < 0.05 || phase > 0.95) return { name: 'Neumond', mod: 'Emotionen komprimiert (Neustart)' };
            if (phase > 0.45 && phase < 0.55) return { name: 'Vollmond', mod: 'Emotionen maximiert (+20% Volatilität)' };
            if (phase > 0.05 && phase < 0.5) return { name: 'Zunehmend', mod: 'Aufbauende emotionale Kraft' };
            return { name: 'Abnehmend', mod: 'Entladende emotionale Kraft' };
        };

        // --- Execution Sequence ---
        DOM.btnSync.addEventListener('click', () => {
            const dobStr = DOM.inputDob.value;
            if (!dobStr) {
                alert("Bitte initialisiere deinen Nullpunkt (Geburtsdatum).");
                return;
            }

            const dob = new Date(dobStr);
            const today = new Date();
            
            if (dob > today) {
                alert("Geburtsdatum liegt in der Zukunft. Zeitparadoxon blockiert.");
                return;
            }

            // Sync Button FX
            DOM.btnSync.innerHTML = '<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> Berechne Vektoren...';
            DOM.btnSync.disabled = true;

            setTimeout(() => {
                try {
                    executeAnalysis(dob, today);
                    
                    // UI Reset
                    DOM.btnSync.innerHTML = '<svg viewBox="0 0 24 24" class="svg-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg> Matrix Aktualisiert';
                    DOM.btnSync.disabled = false;
                    
                    DOM.cosmicPanel.classList.remove('hidden');
                    DOM.mainPanel.classList.remove('hidden');
                    
                    // Scroll to main
                    DOM.mainPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } catch (e) {
                    console.error("VGT Biorhythm Engine Error:", e);
                    DOM.btnSync.innerHTML = 'Kritischer Fehler (Console prüfen)';
                    DOM.btnSync.disabled = false;
                    alert("Es gab einen Fehler beim Berechnen der Matrix. Bitte lade die Seite neu.");
                }
            }, 600); // Artificial delay for processing feel
        });

        const executeAnalysis = (dob, today) => {
            // 1. Cosmic Data for Today
            const moon = getMoonData(today);
            const zodiac = getZodiac(today);
            const season = getSeason(today);

            DOM.cMoonPhase.textContent = moon.name;
            DOM.cMoonMod.textContent = moon.mod;
            DOM.cZodiac.textContent = zodiac.name;
            DOM.cZodiacMod.textContent = zodiac.element;
            DOM.cSeason.textContent = season.name;
            DOM.cSeasonMod.textContent = season.mod;

            // 2. Format Today's Date
            DOM.todayDate.textContent = today.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });

            // 3. Generate Chart Data (-7 to +14 days)
            const labels = [];
            const dataPhy = [];
            const dataEmo = [];
            const dataInt = [];
            const dataSpi = [];

            const daysSinceBirthToday = getDaysDiff(dob, today);
            let todayPhy = 0, todayEmo = 0, todayInt = 0, todaySpi = 0;
            let criticalFlags = [];

            for (let i = -7; i <= 14; i++) {
                const targetDate = new Date(today);
                targetDate.setDate(today.getDate() + i);
                
                let labelStr = `${targetDate.getDate()}.${targetDate.getMonth() + 1}.`;
                if (i === 0) labelStr = `Heute`;
                labels.push(labelStr);

                const daysLived = daysSinceBirthToday + i;
                
                const p = calculateBioValue(daysLived, 23);
                const e = calculateBioValue(daysLived, 28);
                const int = calculateBioValue(daysLived, 33);
                const s = calculateBioValue(daysLived, 53);

                dataPhy.push(p);
                dataEmo.push(e);
                dataInt.push(int);
                dataSpi.push(s);

                if (i === 0) {
                    todayPhy = p; todayEmo = e; todayInt = int; todaySpi = s;
                    
                    if (Math.abs(p) < 10) criticalFlags.push("Physisch");
                    if (Math.abs(e) < 10) criticalFlags.push("Emotional");
                    if (Math.abs(int) < 10) criticalFlags.push("Intellektuell");
                    if (Math.abs(s) < 10) criticalFlags.push("Spirituell");
                }
            }

            renderChart(labels, dataPhy, dataEmo, dataInt, dataSpi);
            updateTodayCards(todayPhy, todayEmo, todayInt, todaySpi, criticalFlags);
        };

        const updateTodayCards = (p, e, int, s, criticalFlags) => {
            const formatVal = (val) => {
                const prefix = val > 0 ? '+' : '';
                return `${prefix}${val.toFixed(1)}%`;
            };

            // Set Values
            DOM.valPhy.textContent = formatVal(p);
            DOM.valEmo.textContent = formatVal(e);
            DOM.valInt.textContent = formatVal(int);
            DOM.valSpi.textContent = formatVal(s);

            // Render Center-Origin Bars
            const setBar = (barEl, val) => {
                const absPercent = Math.min(100, Math.abs(val));
                const visualWidth = (absPercent / 100) * 50; 
                barEl.style.width = `${visualWidth}%`;
                
                if (val >= 0) {
                    barEl.style.left = '50%';
                    barEl.style.right = 'auto';
                } else {
                    barEl.style.right = '50%';
                    barEl.style.left = 'auto';
                }
            };

            setBar(DOM.barPhy, p);
            setBar(DOM.barEmo, e);
            setBar(DOM.barInt, int);
            setBar(DOM.barSpi, s);

            // Semantic Descriptions
            DOM.descPhy.textContent = p > 50 ? "Exzellente Vitalität. Guter Tag für hartes Training." : (p < -50 ? "Regenerationsphase. Überlastung vermeiden." : "Stabile Energie-Level.");
            DOM.descEmo.textContent = e > 50 ? "Hohe Empathie und emotionale Resilienz. Gut für Konfliktlösungen." : (e < -50 ? "Dünnhäutig. Vermeide toxische Situationen." : "Emotional zentriert.");
            DOM.descInt.textContent = int > 50 ? "Laser-Fokus. Komplexe Probleme lassen sich leicht knacken." : (int < -50 ? "Kognitiver Nebel. Fokus auf Routinetätigkeiten." : "Klare, analytische Kapazität.");
            DOM.descSpi.textContent = s > 50 ? "Hohe Intuition. Synchronizitäten wahrscheinlich." : (s < -50 ? "Verstärktes Ego, fehlende kosmische Anbindung." : "Neutrale innere Stimme.");

            // Critical Warning UI
            if (criticalFlags.length > 0) {
                DOM.critWarning.classList.remove('hidden');
                DOM.critText.textContent = `Eine deiner Hauptkurven durchschneidet heute die Null-Linie (${criticalFlags.join(' & ')}). Hohes Potenzial für Instabilität. Vorsicht walten lassen.`;
            } else {
                DOM.critWarning.classList.add('hidden');
            }
        };

        const renderChart = (labels, p, e, int, s) => {
            const canvas = document.getElementById('biorhythm-chart');
            
            // Failsafe: Chart.js interne Canvas-Registrierung bereinigen
            const existingChart = Chart.getChart(canvas);
            if (existingChart) existingChart.destroy();
            
            if (chartInstance) chartInstance.destroy();

            Chart.defaults.color = '#9ca3af';
            Chart.defaults.font.family = 'system-ui, -apple-system, sans-serif';

            chartInstance = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        { label: 'Physisch', data: p, borderColor: 'rgba(244, 114, 182, 1)', backgroundColor: 'rgba(244, 114, 182, 0.1)', tension: 0.4, borderWidth: 2, pointRadius: 0, fill: true },
                        { label: 'Emotional', data: e, borderColor: 'rgba(96, 165, 250, 1)', backgroundColor: 'rgba(96, 165, 250, 0.1)', tension: 0.4, borderWidth: 2, pointRadius: 0 },
                        { label: 'Intellektuell', data: int, borderColor: 'rgba(74, 222, 128, 1)', backgroundColor: 'rgba(74, 222, 128, 0.1)', tension: 0.4, borderWidth: 2, pointRadius: 0 },
                        { label: 'Spirituell', data: s, borderColor: 'rgba(168, 85, 247, 1)', backgroundColor: 'rgba(168, 85, 247, 0.1)', tension: 0.4, borderWidth: 2, pointRadius: 0 }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: 'index', intersect: false },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            backgroundColor: 'rgba(10, 10, 18, 0.9)',
                            titleColor: '#fff',
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1,
                            callbacks: {
                                label: function(context) { return `${context.dataset.label}: ${context.raw.toFixed(1)}%`; }
                            }
                        }
                    },
                    scales: {
                        y: {
                            min: -100, max: 100,
                            grid: { color: 'rgba(255,255,255,0.05)', zeroLineColor: 'rgba(255,255,255,0.3)', zeroLineWidth: 2 },
                            ticks: { stepSize: 50, callback: function(value) { return value + '%'; } }
                        },
                        x: {
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { 
                                color: function(context) {
                                    const label = labels[context.index] || '';
                                    return label.includes('Heute') ? 'rgba(255, 255, 255, 1)' : '#9ca3af';
                                },
                                font: function(context) {
                                    const label = labels[context.index] || '';
                                    return { weight: label.includes('Heute') ? 'bold' : 'normal' };
                                }
                            }
                        }
                    }
                },
                plugins: [todayLinePlugin] // <--- SICHER: Plugin direkt der Instanz zugewiesen
            });
        };

    }
});