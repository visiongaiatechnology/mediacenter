/**
 * VGT METABOLIC ENGINE LOGIC (DIAMANT SUPREME)
 * Real-time Mifflin-St. Jeor BMR & TDEE calculation.
 * Dynamic Macro Partitioning via Chart.js.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-cal')) return;

    // Check Dependency
    const ensureChart = setInterval(() => {
        if (typeof Chart !== 'undefined') {
            clearInterval(ensureChart);
            initMetabolicEngine();
        }
    }, 100);

    function initMetabolicEngine() {
        const DOM = {
            // Inputs
            btnReset: document.getElementById('cal-btn-reset'),
            genderBtns: document.querySelectorAll('.cal-gender-btn'),
            inAge: document.getElementById('cal-age'),
            inHeight: document.getElementById('cal-height'),
            inWeight: document.getElementById('cal-weight'),
            selActivity: document.getElementById('cal-activity'),
            goalBtns: document.querySelectorAll('.cal-goal-btn'),
            macroBtns: document.querySelectorAll('.cal-macro-btn'),
            allTriggers: document.querySelectorAll('.cal-trigger'),
            
            // Outputs
            outTarget: document.getElementById('out-target-kcal'),
            outBmr: document.getElementById('out-bmr'),
            outActivity: document.getElementById('out-activity'),
            statusText: document.getElementById('cal-status-text'),
            
            // Macros
            proPct: document.getElementById('pct-pro'),
            proG: document.getElementById('g-pro'),
            proKcal: document.getElementById('kcal-pro'),
            proBar: document.getElementById('bar-pro'),
            
            carbPct: document.getElementById('pct-carb'),
            carbG: document.getElementById('g-carb'),
            carbKcal: document.getElementById('kcal-carb'),
            carbBar: document.getElementById('bar-carb'),
            
            fatPct: document.getElementById('pct-fat'),
            fatG: document.getElementById('g-fat'),
            fatKcal: document.getElementById('kcal-fat'),
            fatBar: document.getElementById('bar-fat'),
            
            canvas: document.getElementById('cal-macro-chart')
        };

        let chartInstance = null;
        let debounceTimer;

        // State Definitions
        let state = {
            gender: 'male', // male, female
            goalOffset: 0, // kcal offset (+/-)
            macroProfile: 'balanced' // balanced, high_protein, low_carb, keto
        };

        const macroProfiles = {
            'balanced':     { p: 0.30, c: 0.40, f: 0.30 },
            'high_protein': { p: 0.40, c: 0.30, f: 0.30 },
            'low_carb':     { p: 0.40, c: 0.20, f: 0.40 },
            'keto':         { p: 0.25, c: 0.05, f: 0.70 }
        };

        // UI Event Listeners
        DOM.genderBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                DOM.genderBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.gender = btn.getAttribute('data-val');
                triggerCalculation();
            });
        });

        DOM.goalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                DOM.goalBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.goalOffset = parseInt(btn.getAttribute('data-val'));
                triggerCalculation();
            });
        });

        DOM.macroBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                DOM.macroBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.macroProfile = btn.getAttribute('data-val');
                triggerCalculation();
            });
        });

        DOM.allTriggers.forEach(input => {
            input.addEventListener('input', triggerCalculation);
            input.addEventListener('change', triggerCalculation);
        });

        DOM.btnReset.addEventListener('click', () => {
            DOM.inAge.value = 30;
            DOM.inHeight.value = 180;
            DOM.inWeight.value = 80;
            DOM.selActivity.value = "1.375";
            triggerCalculation();
        });

        // --- Core Math Engine ---
        // VGT Patch: Nutzung von 'function' für automatischen JS-Hoisting.
        function triggerCalculation() {
            clearTimeout(debounceTimer);
            DOM.statusText.textContent = "Berechne Vektoren...";
            
            debounceTimer = setTimeout(() => {
                executeMetabolicMath();
            }, 150); // Small debounce for fluid UX without crashing
        }

        function executeMetabolicMath() {
            const age = parseFloat(DOM.inAge.value) || 0;
            const height = parseFloat(DOM.inHeight.value) || 0;
            const weight = parseFloat(DOM.inWeight.value) || 0;
            const pal = parseFloat(DOM.selActivity.value) || 1.2;

            if(age === 0 || height === 0 || weight === 0) return;

            // 1. Mifflin-St. Jeor BMR Calculation
            // Male: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5
            // Female: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161
            let bmr = (10 * weight) + (6.25 * height) - (5 * age);
            bmr += (state.gender === 'male') ? 5 : -161;

            // Failsafe for absurd inputs
            if (bmr < 500) bmr = 500;

            // 2. TDEE & Target
            const tdee = bmr * pal;
            const activeBurn = tdee - bmr; // How much is burned through activity
            
            // Apply Goal Offset (Cut/Bulk)
            let targetKcal = tdee + state.goalOffset;
            
            // Hard safety limit (never recommend below BMR - 200)
            if (targetKcal < bmr - 200) targetKcal = bmr - 200;

            // 3. Macro Partitioning
            const profile = macroProfiles[state.macroProfile];
            
            // Kcal per Macro
            const kcalPro = targetKcal * profile.p;
            const kcalCarb = targetKcal * profile.c;
            const kcalFat = targetKcal * profile.f;

            // Grams per Macro (Protein: 4kcal/g, Carbs: 4kcal/g, Fat: 9kcal/g)
            const gPro = kcalPro / 4;
            const gCarb = kcalCarb / 4;
            const gFat = kcalFat / 9;

            // 4. Update UI DOM
            updateDashboard(
                Math.round(targetKcal), 
                Math.round(bmr), 
                Math.round(activeBurn),
                profile,
                { g: Math.round(gPro), kcal: Math.round(kcalPro) },
                { g: Math.round(gCarb), kcal: Math.round(kcalCarb) },
                { g: Math.round(gFat), kcal: Math.round(kcalFat) }
            );

            DOM.statusText.textContent = "Synchronisiert";
        }

        function updateDashboard(target, bmr, activity, pct, pro, carb, fat) {
            
            // Animation Number Counter Logic (Simple)
            DOM.outTarget.textContent = target;
            DOM.outBmr.textContent = `${bmr} kcal`;
            DOM.outActivity.textContent = `${activity} kcal`;

            // Protein
            DOM.proPct.textContent = `${(pct.p * 100).toFixed(0)}%`;
            DOM.proG.textContent = `${pro.g}g`;
            DOM.proKcal.textContent = `${pro.kcal} kcal`;
            DOM.proBar.style.width = `${(pct.p * 100)}%`;

            // Carbs
            DOM.carbPct.textContent = `${(pct.c * 100).toFixed(0)}%`;
            DOM.carbG.textContent = `${carb.g}g`;
            DOM.carbKcal.textContent = `${carb.kcal} kcal`;
            DOM.carbBar.style.width = `${(pct.c * 100)}%`;

            // Fat
            DOM.fatPct.textContent = `${(pct.f * 100).toFixed(0)}%`;
            DOM.fatG.textContent = `${fat.g}g`;
            DOM.fatKcal.textContent = `${fat.kcal} kcal`;
            DOM.fatBar.style.width = `${(pct.f * 100)}%`;

            // Chart Update
            updateChart([pct.p * 100, pct.c * 100, pct.f * 100]);
        }

        function updateChart(dataArr) {
            if (!chartInstance) {
                Chart.defaults.color = '#9ca3af';
                Chart.defaults.font.family = 'system-ui, -apple-system, sans-serif';

                chartInstance = new Chart(DOM.canvas, {
                    type: 'doughnut',
                    data: {
                        labels: ['Protein', 'Carbs', 'Fett'],
                        datasets: [{
                            data: dataArr,
                            backgroundColor: [
                                'rgba(34, 211, 238, 1)',  // Cyan (Protein)
                                'rgba(74, 222, 128, 1)',  // Green (Carbs)
                                'rgba(251, 146, 60, 1)'   // Orange (Fat)
                            ],
                            borderWidth: 0,
                            borderRadius: 4,
                            cutout: '80%',
                            hoverOffset: 10
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(10, 10, 18, 0.9)',
                                titleColor: '#fff',
                                bodyFont: { size: 14, weight: 'bold' },
                                padding: 12,
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderWidth: 1,
                                callbacks: {
                                    label: function(context) { return ` ${context.raw.toFixed(0)}% Energieanteil`; }
                                }
                            }
                        },
                        animation: {
                            animateScale: true,
                            animateRotate: true,
                            duration: 500,
                            easing: 'easeOutQuart'
                        }
                    }
                });
            } else {
                chartInstance.data.datasets[0].data = dataArr;
                chartInstance.update();
            }
        }

        // Ignite the Engine initially
        executeMetabolicMath();
    }
});