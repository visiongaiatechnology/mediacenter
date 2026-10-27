/**
 * VGT COGNITIVE LOAD ANALYZER LOGIC (DIAMANT SUPREME)
 * Real-time biometric simulation & Chart.js Telemetry.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-stress')) return;

    const DOM = {
        // Sensors
        sliders: document.querySelectorAll('.vgt-thermal-slider'),
        valSpeed: document.getElementById('val-speed'),
        valDistract: document.getElementById('val-distract'),
        valTension: document.getElementById('val-tension'),
        valFatigue: document.getElementById('val-fatigue'),
        btnReset: document.getElementById('cl-btn-reset'),
        
        // Telemetry
        outStress: document.getElementById('out-stress'),
        outFocus: document.getElementById('out-focus'),
        sysPill: document.getElementById('sys-status-pill'),
        loadVal: document.getElementById('out-load'),
        
        // Diagnosis
        diagBox: document.getElementById('diag-box'),
        diagTitle: document.getElementById('diag-title'),
        diagDesc: document.getElementById('diag-desc'),
        diagAction: document.getElementById('diag-action')
    };

    let chartInstance = null;

    // --- Semantic Label Mappings ---
    const getSemanticLabel = (val, type) => {
        const v = parseInt(val);
        if (type === 'speed') {
            if (v < 30) return "Ruhig/Zentriert";
            if (v < 70) return "Aktiv/Vernetzt";
            return "Rasend/Chaotisch";
        }
        if (type === 'distract') {
            if (v < 30) return "Laser-Fokus";
            if (v < 70) return "Sprunghaft";
            return "Fragmentiert";
        }
        if (type === 'tension') {
            if (v < 30) return "Gelöst";
            if (v < 70) return "Angespannt";
            return "Verkrampft";
        }
        if (type === 'fatigue') {
            if (v < 30) return "Wach/Klar";
            if (v < 70) return "Ermüdet";
            return "Burnout-Level";
        }
    };

    // --- Core Algorithm ---
    const calculateTelemetry = () => {
        const speed = parseInt(document.getElementById('sens-speed').value);
        const distract = parseInt(document.getElementById('sens-distract').value);
        const tension = parseInt(document.getElementById('sens-tension').value);
        const fatigue = parseInt(document.getElementById('sens-fatigue').value);

        // Update Labels with specific colors based on heat
        updateLabelUI(DOM.valSpeed, speed, 'speed');
        updateLabelUI(DOM.valDistract, distract, 'distract');
        updateLabelUI(DOM.valTension, tension, 'tension');
        updateLabelUI(DOM.valFatigue, fatigue, 'fatigue');

        // Math: Stress is a combination of speed, tension and fatigue
        let stressScore = Math.round((speed * 0.3) + (tension * 0.5) + (fatigue * 0.2));
        
        // Math: Focus is destroyed by distraction and fatigue, but moderate speed is good.
        let focusDrain = (distract * 0.5) + (fatigue * 0.4) + (speed > 80 ? (speed-80)*1.5 : 0);
        let focusScore = Math.max(0, Math.round(100 - focusDrain));

        // Math: Overall Cognitive Load
        let loadScore = Math.round((stressScore + (100 - focusScore)) / 2);

        updateDashboard(stressScore, focusScore, loadScore);
    };

    const updateLabelUI = (el, val, type) => {
        el.textContent = getSemanticLabel(val, type);
        // Color mapping: 0 = Blue, 50 = Purple, 100 = Orange
        if (val < 40) {
            el.style.color = 'rgba(var(--c-blue), 1)';
            el.style.borderColor = 'rgba(var(--c-blue), 0.3)';
        } else if (val < 75) {
            el.style.color = 'rgba(var(--c-purple), 1)';
            el.style.borderColor = 'rgba(var(--c-purple), 0.3)';
        } else {
            el.style.color = 'rgba(var(--c-orange), 1)';
            el.style.borderColor = 'rgba(var(--c-orange), 0.3)';
        }
    };

    const updateDashboard = (stress, focus, load) => {
        // Numbers
        DOM.outStress.textContent = stress;
        DOM.outFocus.textContent = focus;

        // Number Colors
        DOM.outStress.className = 'readout-val ' + (stress > 70 ? 'highlight-orange' : (stress > 40 ? 'highlight-purple' : 'highlight-blue'));
        DOM.outFocus.className = 'readout-val ' + (focus < 40 ? 'highlight-orange' : (focus < 70 ? 'highlight-purple' : 'highlight-blue'));

        // Load Label
        if (load < 35) { DOM.loadVal.textContent = "OPTIMAL"; DOM.loadVal.style.color = 'rgba(var(--c-blue), 1)'; }
        else if (load < 75) { DOM.loadVal.textContent = "MODERATE"; DOM.loadVal.style.color = 'rgba(var(--c-purple), 1)'; }
        else { DOM.loadVal.textContent = "CRITICAL"; DOM.loadVal.style.color = 'rgba(var(--c-orange), 1)'; }

        // Diagnosis AI & Status Pill
        if (stress < 40 && focus > 75) {
            DOM.sysPill.className = 'status-pill safe';
            DOM.sysPill.textContent = 'FLOW STATE';
            DOM.diagBox.style.borderLeftColor = 'rgba(var(--c-blue), 1)';
            DOM.diagTitle.textContent = "Flow State detektiert.";
            DOM.diagDesc.textContent = "Dein System arbeitet hochgradig effizient. Kognitiver Nebel ist minimal. Nutze diesen Zustand für tiefe, komplexe Arbeit.";
            DOM.diagAction.innerHTML = `<a href="#/tool/freq" class="btn-action-small"><svg viewBox="0 0 24 24" class="svg-icon"><polyline points="2 12 6 4 10 20 14 4 18 20 22 12"></polyline></svg> Neural Sync: Alpha (Maintain)</a>`;
        } 
        else if (stress > 75) {
            DOM.sysPill.className = 'status-pill danger';
            DOM.sysPill.textContent = 'OVERLOAD';
            DOM.diagBox.style.borderLeftColor = 'rgba(var(--c-orange), 1)';
            DOM.diagTitle.textContent = "Kritische Cortisol-Level.";
            DOM.diagDesc.textContent = "System-Überlastung. Akute Burnout-Gefahr durch anhaltende Anspannung und mentalen Overdrive. Sofortige Regulation erforderlich.";
            DOM.diagAction.innerHTML = `<a href="#/tool/med" class="btn-action-small" style="border-color: rgba(var(--c-orange),0.4); color:rgba(var(--c-orange),1)"><svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z"></path></svg> Emergency Meditation starten</a>`;
        }
        else if (focus < 40) {
            DOM.sysPill.className = 'status-pill warn';
            DOM.sysPill.textContent = 'BRAIN FOG';
            DOM.diagBox.style.borderLeftColor = 'rgba(var(--c-purple), 1)';
            DOM.diagTitle.textContent = "Kognitiver Nebel (Brain Fog).";
            DOM.diagDesc.textContent = "Erschöpfung und Ablenkung überwiegen. Dein Präfrontaler Kortex ist depletiert. Keine kritischen Entscheidungen treffen.";
            DOM.diagAction.innerHTML = `<a href="#/tool/freq" class="btn-action-small"><svg viewBox="0 0 24 24" class="svg-icon"><polyline points="2 12 6 4 10 20 14 4 18 20 22 12"></polyline></svg> Neural Sync: Delta (Recovery)</a>`;
        }
        else {
            DOM.sysPill.className = 'status-pill safe';
            DOM.sysPill.textContent = 'STABIL';
            DOM.diagBox.style.borderLeftColor = 'var(--vg-border-hover)';
            DOM.diagTitle.textContent = "Basis-Level operativ.";
            DOM.diagDesc.textContent = "Das System ist stabil, aber nicht im Peak-State. Routinetätigkeiten können problemlos ausgeführt werden.";
            DOM.diagAction.innerHTML = ``;
        }

        updateChart(stress, focus, load);
    };

    // --- Chart.js Rendering ---
    const updateChart = (stress, focus, load) => {
        const checkChart = setInterval(() => {
            if (typeof Chart !== 'undefined') {
                clearInterval(checkChart);
                
                const canvas = document.getElementById('cognitive-chart');
                
                // Color mapping logic for chart
                let loadColor = 'rgba(96, 165, 250, 1)'; // Blue
                if (load >= 35) loadColor = 'rgba(168, 85, 247, 1)'; // Purple
                if (load >= 75) loadColor = 'rgba(251, 146, 60, 1)'; // Orange

                if (!chartInstance) {
                    Chart.defaults.color = '#9ca3af';
                    Chart.defaults.font.family = 'system-ui, -apple-system, sans-serif';

                    chartInstance = new Chart(canvas, {
                        type: 'doughnut',
                        data: {
                            labels: ['Cognitive Load', 'Free Capacity'],
                            datasets: [{
                                data: [load, 100 - load],
                                backgroundColor: [loadColor, 'rgba(255,255,255,0.05)'],
                                borderWidth: 0,
                                borderRadius: 5,
                                cutout: '85%'
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: { enabled: false }
                            },
                            animation: { duration: 400, easing: 'easeOutQuart' }
                        }
                    });
                } else {
                    // Fast Update
                    chartInstance.data.datasets[0].data = [load, 100 - load];
                    chartInstance.data.datasets[0].backgroundColor[0] = loadColor;
                    chartInstance.update();
                }
            }
        }, 50);
    };

    // --- Listeners ---
    DOM.sliders.forEach(slider => {
        slider.addEventListener('input', () => {
            // requestAnimationFrame is used for buttery smooth 60fps Chart updates
            window.requestAnimationFrame(calculateTelemetry);
        });
    });

    DOM.btnReset.addEventListener('click', () => {
        document.getElementById('sens-speed').value = 20;
        document.getElementById('sens-distract').value = 30;
        document.getElementById('sens-tension').value = 10;
        document.getElementById('sens-fatigue').value = 15;
        window.requestAnimationFrame(calculateTelemetry);
    });

    // Init
    calculateTelemetry();
});
