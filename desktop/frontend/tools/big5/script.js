/**
 * VGT NEURAL PROFILER LOGIC (DIAMANT SUPREME)
 * Psychometric Engine: OCEAN Model with precise MBTI Mapping.
 * High-End Chart.js Radar integration and Matrix-Processing UI.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-big5')) return;

    // --- Psychometrische Matrix (OCEAN) ---
    // 20 validierte Items, abwechselnde Polarität
    const questions = [
        { text: "Ich bin oft derjenige, der Gespräche beginnt.", trait: "E" },
        { text: "Ich neige dazu, Fehler bei anderen zu suchen.", trait: "A", reverse: true },
        { text: "Ich arbeite sehr systematisch und gründlich.", trait: "C" },
        { text: "Ich mache mir oft Sorgen um Dinge, die schiefgehen könnten.", trait: "N" },
        { text: "Ich habe ein tiefes Verständnis für Kunst und Ästhetik.", trait: "O" },
        { text: "Ich ziehe es vor, im Hintergrund zu bleiben.", trait: "E", reverse: true },
        { text: "Ich habe ein weiches Herz und fühle mit anderen mit.", trait: "A" },
        { text: "Ich bin manchmal etwas unorganisiert.", trait: "C", reverse: true },
        { text: "Ich bleibe ruhig, auch wenn die Situation extrem stressig wird.", trait: "N", reverse: true },
        { text: "Ich bin fasziniert von abstrakten, komplexen Ideen.", trait: "O" },
        { text: "Ich lade meine Energie auf, wenn ich von vielen Menschen umgeben bin.", trait: "E" },
        { text: "Ich kann sehr direkt und unnachgiebig sein, wenn es nötig ist.", trait: "A", reverse: true },
        { text: "Wenn ich etwas anfange, bringe ich es auch zu Ende.", trait: "C" },
        { text: "Meine Stimmung schwankt manchmal sehr schnell.", trait: "N" },
        { text: "Ich probiere gerne neue, unkonventionelle Wege aus.", trait: "O" },
        { text: "Ich bin nach sozialen Events oft erschöpft und brauche Ruhe.", trait: "E", reverse: true },
        { text: "Ich glaube grundsätzlich an das Gute im Menschen.", trait: "A" },
        { text: "Ich verliere manchmal den Fokus bei langfristigen Projekten.", trait: "C", reverse: true },
        { text: "Ich fühle mich selten deprimiert oder niedergeschlagen.", trait: "N", reverse: true },
        { text: "Ich hinterfrage traditionelle Werte und Routinen oft.", trait: "O" }
    ];

    const MBTI_ARCHETYPES = {
        "INTJ": "Der Architekt", "INTP": "Der Logiker", "ENTJ": "Der Kommandeur", "ENTP": "Der Debattierer",
        "INFJ": "Der Advokat", "INFP": "Der Mediator", "ENFJ": "Der Protagonist", "ENFP": "Der Kämpfer",
        "ISTJ": "Der Logistiker", "ISFJ": "Der Verteidiger", "ESTJ": "Der Exekutive", "ESFJ": "Der Konsul",
        "ISTP": "Der Virtuose", "ISFP": "Der Abenteurer", "ESTP": "Der Unternehmer", "ESFP": "Der Entertainer"
    };

    const DOM = {
        stateIntro: document.getElementById('state-intro'),
        stateQuiz: document.getElementById('state-quiz'),
        stateProc: document.getElementById('state-processing'),
        stateResult: document.getElementById('state-result'),
        
        btnStart: document.getElementById('btn-start-quiz'),
        btnRestart: document.getElementById('btn-restart-quiz'),
        
        qContent: document.getElementById('question-content'),
        qText: document.getElementById('active-question-text'),
        qStep: document.getElementById('quiz-current-step'),
        qPercent: document.getElementById('quiz-percent'),
        qProgress: document.getElementById('quiz-progress-fill'),
        neuralBtns: document.querySelectorAll('.neural-node'),
        
        procLog: document.getElementById('proc-log'),
        matrixCode: document.getElementById('matrix-code'),
        
        mbtiType: document.getElementById('mbti-type'),
        mbtiArchetype: document.getElementById('mbti-archetype'),
        breakdownList: document.getElementById('ocean-breakdown')
    };

    let currentStep = 0;
    // 4 Fragen pro Trait. Skala 1-5. Max Score = 20. Min = 4.
    let scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
    let chartInstance = null;

    // --- State Machine ---
    const switchState = (newState) => {
        [DOM.stateIntro, DOM.stateQuiz, DOM.stateProc, DOM.stateResult].forEach(el => el.classList.add('hidden'));
        newState.classList.remove('hidden');
    };

    const startQuiz = () => {
        currentStep = 0;
        scores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
        switchState(DOM.stateQuiz);
        loadQuestionData();
    };

    const loadQuestionData = () => {
        const q = questions[currentStep];
        DOM.qText.textContent = q.text;
        DOM.qStep.textContent = `Fragment ${currentStep + 1} / ${questions.length}`;
        const percent = Math.round((currentStep / questions.length) * 100);
        DOM.qPercent.textContent = `${percent}%`;
        DOM.qProgress.style.width = `${percent}%`;
        
        DOM.qContent.className = 'question-content slide-in';
    };

    const handleAnswer = (val) => {
        // Visual Feedback to UI
        DOM.qContent.className = 'question-content slide-out';
        
        // Logic
        const q = questions[currentStep];
        let score = parseInt(val);
        if (q.reverse) score = 6 - score; // 5->1, 4->2, etc.
        
        scores[q.trait] += score;
        
        // Delay next question to allow slide-out animation
        setTimeout(() => {
            currentStep++;
            if (currentStep < questions.length) {
                loadQuestionData();
            } else {
                initProcessingState();
            }
        }, 300);
    };

    // --- Processing Simulator ---
    const initProcessingState = () => {
        switchState(DOM.stateProc);
        
        // Final Progress Bar Update
        DOM.qPercent.textContent = `100%`;
        DOM.qProgress.style.width = `100%`;

        const logs = [
            "Extrahiere Big-Five Parameter...",
            "Normalisiere Neurotizismus-Faktor...",
            "Berechne kognitive Extraversions-Werte...",
            "Kompiliere Myers-Briggs Typologie...",
            "Generiere visuelle Radar-Matrix..."
        ];
        
        let logStep = 0;
        const logInterval = setInterval(() => {
            logStep++;
            if(logStep < logs.length) {
                DOM.procLog.textContent = logs[logStep];
            }
        }, 600);

        // Matrix Code Effect
        const chars = '0123456789ABCDEF';
        const matrixInterval = setInterval(() => {
            let str = '';
            for(let i=0; i<60; i++) str += chars[Math.floor(Math.random()*chars.length)] + (i%8===0?' ':'');
            DOM.matrixCode.textContent = str;
        }, 50);

        // Finish
        setTimeout(() => {
            clearInterval(logInterval);
            clearInterval(matrixInterval);
            finalizeResults();
        }, 3000);
    };

    // --- Analysis Engine ---
    const finalizeResults = () => {
        switchState(DOM.stateResult);
        
        // Max Score per trait is 20 (4 questions * max 5 pts). Min is 4.
        // Calculate percentages based on the absolute scale (4-20 -> 0-100%)
        const calcPercent = (score) => Math.max(0, Math.min(100, ((score - 4) / 16) * 100));

        const finalData = {
            O: calcPercent(scores.O),
            C: calcPercent(scores.C),
            E: calcPercent(scores.E),
            A: calcPercent(scores.A),
            N: calcPercent(scores.N)
        };

        generateMBTI(finalData);
        renderBreakdown(finalData);

        // Delayed Chart render for animation effect
        setTimeout(() => renderRadar(finalData), 100);
    };

    const generateMBTI = (data) => {
        // VGT Mapping Algorithm (Big 5 to MBTI)
        let type = "";
        type += data.E >= 50 ? "E" : "I";
        type += data.O >= 50 ? "N" : "S";
        type += data.A >= 50 ? "F" : "T";
        type += data.C >= 50 ? "J" : "P";
        
        // Assertive / Turbulent modifier based on Neuroticism
        const modifier = data.N >= 50 ? "-T" : "-A";
        
        DOM.mbtiType.textContent = type + modifier;
        DOM.mbtiArchetype.textContent = MBTI_ARCHETYPES[type] || "Unbekanntes Protokoll";
    };

    const renderBreakdown = (data) => {
        const labels = {
            O: 'Offenheit (Neugier, Kreativität)',
            C: 'Gewissenhaftigkeit (Disziplin, Ordnung)',
            E: 'Extraversion (Geselligkeit, Energie)',
            A: 'Verträglichkeit (Empathie, Kooperation)',
            N: 'Neurotizismus (Empfindsamkeit, Stress)'
        };

        let html = '';
        Object.entries(data).forEach(([key, val]) => {
            html += `
                <div class="ocean-trait">
                    <div class="trait-meta">
                        <span class="trait-name"></span>
                        <span class="trait-val"></span>
                    </div>
                    <div class="trait-bar-bg">
                        <div class="trait-bar-fill" style="width: 0%" data-target="${val}"></div>
                    </div>
                </div>
            `;
        });
        DOM.breakdownList.innerHTML = html;

        const traitRows = DOM.breakdownList.querySelectorAll('.ocean-trait');
        Object.entries(data).forEach(([key, val], index) => {
            const row = traitRows[index];
            if (!row) return;

            row.querySelector('.trait-name').textContent = labels[key];
            row.querySelector('.trait-val').textContent = `${val.toFixed(0)}%`;
        });

        // Animate Bars
        setTimeout(() => {
            document.querySelectorAll('.trait-bar-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-target') + '%';
            });
        }, 100);
    };

    const renderRadar = (data) => {
        const checkChart = setInterval(() => {
            if (typeof Chart !== 'undefined') {
                clearInterval(checkChart);
                
                const canvas = document.getElementById('personality-chart');
                if (chartInstance) chartInstance.destroy();

                Chart.defaults.color = '#9ca3af';
                Chart.defaults.font.family = 'system-ui, -apple-system, sans-serif';

                chartInstance = new Chart(canvas, {
                    type: 'radar',
                    data: {
                        labels: ['Offenheit', 'Gewissenhaftigkeit', 'Extraversion', 'Verträglichkeit', 'Neurotizismus'],
                        datasets: [{
                            label: 'Neural-Signatur',
                            data: [data.O, data.C, data.E, data.A, data.N],
                            backgroundColor: 'rgba(168, 85, 247, 0.25)',
                            borderColor: 'rgba(168, 85, 247, 1)',
                            borderWidth: 2,
                            pointBackgroundColor: 'rgba(244, 114, 182, 1)', // Pink dots
                            pointBorderColor: '#fff',
                            pointHoverBackgroundColor: '#fff',
                            pointHoverBorderColor: 'rgba(244, 114, 182, 1)',
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                angleLines: { color: 'rgba(255,255,255,0.1)' },
                                grid: { color: 'rgba(255,255,255,0.1)', circular: true },
                                pointLabels: { color: '#ffffff', font: { size: 11, weight: '700' } },
                                ticks: { display: false, stepSize: 20 },
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: 'rgba(10, 10, 18, 0.9)',
                                titleColor: '#fff',
                                bodyColor: 'rgba(168, 85, 247, 1)',
                                borderColor: 'rgba(255,255,255,0.1)',
                                borderWidth: 1,
                                displayColors: false,
                                callbacks: {
                                    label: function(context) { return Math.round(context.raw) + '% Ausprägung'; }
                                }
                            }
                        }
                    }
                });
            }
        }, 100);
    };

    // --- UI Listeners ---
    DOM.btnStart.addEventListener('click', startQuiz);
    DOM.btnRestart.addEventListener('click', startQuiz);

    DOM.neuralBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const val = e.currentTarget.dataset.val;
            handleAnswer(val);
        });
    });

});
