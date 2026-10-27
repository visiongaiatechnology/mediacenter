/**
 * VGT LUNAR TELEMETRY LOGIC (DIAMANT SUPREME)
 * SunCalc based Engine.
 * Features: High-Precision Live Orbit Score & Dynamic CSS Moon Shadowing.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-moon')) return;

    // Wait for SunCalc
    const ensureLibLoaded = setInterval(() => {
        if (typeof SunCalc !== 'undefined') {
            clearInterval(ensureLibLoaded);
            initLunarEngine();
        }
    }, 100);

    function initLunarEngine() {
        const DOM = {
            phaseName: document.getElementById('mn-phase-name'),
            phaseDesc: document.getElementById('mn-phase-desc'),
            
            scoreInt: document.getElementById('score-int'),
            scoreDec: document.getElementById('score-dec'),
            scoreBar: document.getElementById('illumination-bar'),
            
            trendBadge: document.getElementById('mn-trend-badge'),
            trendIcon: document.getElementById('trend-icon'),
            trendText: document.getElementById('trend-text'),
            
            countdown: document.getElementById('mn-countdown'),
            countdownTarget: document.getElementById('countdown-target'),
            
            angle: document.getElementById('mn-angle'),
            
            energyTitle: document.getElementById('energy-title'),
            energyDesc: document.getElementById('energy-desc'),
            
            moonShadow: document.getElementById('moon-phase-shadow')
        };

        // Phase Lore Dictionary
        const phaseLore = [
            { id: 'new', name: 'Neumond', range: [0, 0.03], desc: 'Der Mond steht zwischen Erde und Sonne. Die beleuchtete Seite zeigt von uns weg.', energy: 'Manifestation & Neubeginn', edesc: 'Die perfekte Zeit, um neue Intentionen zu setzen. Säe die Samen für Projekte, die im kommenden Zyklus wachsen sollen. Die Energie ist rein und formbar.' },
            { id: 'waxing_crescent', name: 'Zunehmende Sichel', range: [0.03, 0.22], desc: 'Die sichtbare Fläche beginnt von rechts an zu wachsen.', energy: 'Wachstum & Momentum', edesc: 'Die Energie baut sich auf. Fokussiere dich auf Aktion und sammle Ressourcen, um deine Neumond-Ziele zu materialisieren.' },
            { id: 'first_quarter', name: 'Erstes Viertel (Halbmond)', range: [0.22, 0.28], desc: 'Genau die halbe Mondscheibe ist beleuchtet.', energy: 'Herausforderung & Entscheidung', edesc: 'Erste Hindernisse tauchen auf. Triff klare Entscheidungen und durchbreche Widerstände mit aktiver Handlungskraft.' },
            { id: 'waxing_gibbous', name: 'Zunehmender Mond', range: [0.28, 0.47], desc: 'Die Beleuchtung nimmt weiter zu und nähert sich der Vollendung.', energy: 'Feinjustierung & Analyse', edesc: 'Beobachte deine Fortschritte. Justiere Details nach und bereite dich auf den energetischen Höhepunkt vor.' },
            { id: 'full', name: 'Vollmond', range: [0.47, 0.53], desc: 'Erde befindet sich zwischen Sonne und Mond. Volle Illumination.', energy: 'Ernte, Höhepunkt & Loslassen', edesc: 'Die Energie ist maximal. Dinge kommen ans Licht. Feiere Erfolge und nutze die Kraft, um Toxisches aktiv loszulassen.' },
            { id: 'waning_gibbous', name: 'Abnehmender Mond', range: [0.53, 0.72], desc: 'Die sichtbare Fläche beginnt von rechts aus zu schwinden.', energy: 'Dankbarkeit & Erkenntnis', edesc: 'Teile dein Wissen. Integriere die Lektionen des Vollmonds und beginne, äußere Aktivitäten langsam zurückzufahren.' },
            { id: 'last_quarter', name: 'Letztes Viertel (Halbmond)', range: [0.72, 0.78], desc: 'Wieder ist genau die halbe Mondscheibe beleuchtet, nun die linke Seite.', energy: 'Vergebung & Umstrukturierung', edesc: 'Räume auf. Physisch und mental. Beseitige Altlasten und vergebe dir selbst und anderen, um Platz für Neues zu schaffen.' },
            { id: 'waning_crescent', name: 'Abnehmende Sichel', range: [0.78, 1.0], desc: 'Nur noch ein schmaler Streifen ist beleuchtet, kurz vor dem neuen Zyklus.', energy: 'Ruhe, Reflexion & Vorbereitung', edesc: 'Rückzug. Schone deine Ressourcen. Reflektiere den vergangenen Zyklus und ruhe dich aus, bevor der Kreislauf von vorn beginnt.' }
        ];

        let targetEventDate = null;
        let isWaxingGlobal = true;

        // --- Core Calculation Loop ---
        const tick = () => {
            const now = new Date();
            const lunarData = SunCalc.getMoonIllumination(now);
            
            // lunarData.fraction (0.0 - 1.0) -> Illumination
            // lunarData.phase (0.0 - 1.0) -> Phase
            // lunarData.angle -> Midpoint angle
            
            // 1. Live Score (High Precision)
            const percentRaw = lunarData.fraction * 100;
            const percentStr = percentRaw.toFixed(6); // e.g. 87.123456
            const parts = percentStr.split('.');
            
            DOM.scoreInt.textContent = parts[0];
            DOM.scoreDec.textContent = '.' + parts[1];
            DOM.scoreBar.style.width = `${percentRaw}%`;

            // 2. Trend & Phase Match
            const phase = lunarData.phase;
            const isWaxing = phase < 0.5;
            isWaxingGlobal = isWaxing;

            if (isWaxing) {
                DOM.trendBadge.className = 'trend-badge up';
                DOM.trendIcon.innerHTML = '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>';
                DOM.trendText.textContent = "Zunehmend";
            } else {
                DOM.trendBadge.className = 'trend-badge down';
                DOM.trendIcon.innerHTML = '<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline>';
                DOM.trendText.textContent = "Abnehmend";
            }

            // Find Lore
            let activeLore = phaseLore[0];
            for (let lore of phaseLore) {
                if (phase >= lore.range[0] && phase <= lore.range[1]) {
                    activeLore = lore;
                    break;
                }
            }

            DOM.phaseName.textContent = activeLore.name;
            DOM.phaseDesc.textContent = activeLore.desc;
            DOM.energyTitle.textContent = activeLore.energy;
            DOM.energyDesc.textContent = activeLore.edesc;

            // 3. Dynamic Moon Shadow (CSS Renderer)
            renderMoonShadow(phase);

            // 4. Geocentric Angle
            // We use browser geolocation if available, else fallback to Cologne (50.9, 6.9)
            // To not spam the API, we use fallback immediately, and update if geo succeeds once.
            renderPosition(now);

            // Request next frame for buttery smooth 60fps tick
            requestAnimationFrame(tick);
        };

        // --- CSS Moon Shadow Engine ---
        const renderMoonShadow = (phase) => {
            // Phase: 0 = New, 0.5 = Full, 1.0 = New.
            // This is a highly complex CSS trick to simulate a 3D shadow on a 2D circle.
            const shadow = DOM.moonShadow;
            
            if (phase < 0.5) {
                // Waxing (Zunehmend): Shadow starts full, shrinks to right, becomes crescent
                // 0 to 0.25 (New to Half): Shadow is convex, covers right side.
                // 0.25 to 0.5 (Half to Full): Shadow is concave, moves to right edge.
                
                if (phase <= 0.25) {
                    // Right half is covered by shadow, left half is exposed slightly
                    const widthPercent = 100 - (phase * 4 * 50); // 100% to 50%
                    shadow.style.width = `${widthPercent}%`;
                    shadow.style.left = '0';
                    shadow.style.right = 'auto';
                    shadow.style.borderRadius = '50% 0 0 50%';
                } else {
                    // Shadow shrinks to 0% on the right edge
                    const widthPercent = 50 - ((phase - 0.25) * 4 * 50); // 50% to 0%
                    shadow.style.width = `${widthPercent}%`;
                    shadow.style.left = 'auto';
                    shadow.style.right = '0';
                    shadow.style.borderRadius = '50%';
                }
            } else {
                // Waning (Abnehmend)
                if (phase <= 0.75) {
                    // Full to Half
                    const widthPercent = ((phase - 0.5) * 4 * 50); // 0% to 50%
                    shadow.style.width = `${widthPercent}%`;
                    shadow.style.left = '0';
                    shadow.style.right = 'auto';
                    shadow.style.borderRadius = '50%';
                } else {
                    // Half to New
                    const widthPercent = 50 + ((phase - 0.75) * 4 * 50); // 50% to 100%
                    shadow.style.width = `${widthPercent}%`;
                    shadow.style.left = 'auto';
                    shadow.style.right = '0';
                    shadow.style.borderRadius = '0 50% 50% 0';
                }
            }
        };

        // --- Hardware Geo-Location & Position ---
        let userLat = 50.9375; // Cologne default
        let userLng = 6.9603;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => { userLat = pos.coords.latitude; userLng = pos.coords.longitude; },
                (err) => { console.log("Geo blocked, using default."); }
            );
        }

        const renderPosition = (date) => {
            const pos = SunCalc.getMoonPosition(date, userLat, userLng);
            const altitudeDeg = (pos.altitude * 180 / Math.PI).toFixed(2);
            DOM.angle.textContent = `${altitudeDeg}°`;
        };

        // --- Cosmic Event Countdown ---
        // SunCalc does not provide "next full moon" date natively. 
        // We approximate it algorithmically.
        const calculateNextEvent = () => {
            const now = new Date();
            const currentPhase = SunCalc.getMoonIllumination(now).phase;
            const lunarCycleDays = 29.53058770576; // Synodic month
            
            let daysToEvent = 0;
            let targetLabel = "";

            if (currentPhase < 0.5) {
                // Next is Full Moon
                daysToEvent = (0.5 - currentPhase) * lunarCycleDays;
                targetLabel = "Nächster Vollmond";
            } else {
                // Next is New Moon
                daysToEvent = (1.0 - currentPhase) * lunarCycleDays;
                targetLabel = "Nächster Neumond";
            }

            DOM.countdownTarget.textContent = targetLabel;
            
            // Set Target Date
            targetEventDate = new Date(now.getTime() + (daysToEvent * 24 * 60 * 60 * 1000));
        };

        const updateCountdown = () => {
            if (!targetEventDate) return;
            
            const now = new Date().getTime();
            const distance = targetEventDate.getTime() - now;

            if (distance < 0) {
                // Event reached, recalculate
                calculateNextEvent();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            DOM.countdown.innerHTML = `
                ${days.toString().padStart(2, '0')}<span class="cd-unit">d</span> 
                ${hours.toString().padStart(2, '0')}<span class="cd-unit">h</span> 
                ${minutes.toString().padStart(2, '0')}<span class="cd-unit">m</span> 
                ${seconds.toString().padStart(2, '0')}<span class="cd-unit">s</span>
            `;
        };

        // Calculate next event once, then update UI every second
        calculateNextEvent();
        setInterval(updateCountdown, 1000);
        updateCountdown();

        // Start High-FPS Render Loop
        requestAnimationFrame(tick);
    }
});