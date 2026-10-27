/**
 * VGT ARCHETYPE MATRIX LOGIC (DIAMANT SUPREME EXTENDED)
 * Vector-Distance Algorithm for Jungian Archetypes.
 * Real-time mapping of 4-dimensional inputs to Primary and Secondary (Wing) archetypes.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-jung')) return;

    // --- Expanded Archetype Data Dictionary (Deep Lore) ---
    // Coordinates [Order/Chaos, Ego/Social, Logic/Vision, Risk/Protect] (Scale 0-100)
    const archetypes = [
        { 
            id: 'ruler', name: 'Der Herrscher', coords: [10, 20, 30, 20], 
            motto: 'Macht ist nicht alles, sie ist das Einzige.', 
            desire: 'Kontrolle ausüben und strukturierte, erfolgreiche Gemeinschaften erschaffen.', 
            fear: 'Chaos, gestürzt zu werden, Kontrollverlust.', 
            strategy: 'Führung übernehmen, klare Regeln durchsetzen.',
            strengths: 'Verantwortung, Führungskompetenz, Systemdenken, Stabilität.',
            weaknesses: 'Autoritarismus, Inflexibilität, Paranoia, Unfähigkeit zu delegieren.'
        },
        { 
            id: 'creator', name: 'Der Schöpfer', coords: [40, 20, 80, 70], 
            motto: 'Wenn du es dir vorstellen kannst, kannst du es bauen.', 
            desire: 'Dinge von bleibendem Wert erschaffen; die Vision materialisieren.', 
            fear: 'Mittelmaß, fehlende Vision, kreative Blockaden.', 
            strategy: 'Künstlerische Kontrolle, ständige Innovation und Verfeinerung.',
            strengths: 'Vorstellungskraft, Ästhetik, Ausdrucksstärke, Nonkonformismus.',
            weaknesses: 'Perfektionismus, Melancholie, Realitätsflucht, nie fertig werden.'
        },
        { 
            id: 'sage', name: 'Der Weise', coords: [30, 60, 10, 30], 
            motto: 'Die Wahrheit wird dich befreien.', 
            desire: 'Die Wahrheit finden und die Komplexität der Welt entschlüsseln.', 
            fear: 'Täuschung, Ignoranz, auf Illusionen hereinzufallen.', 
            strategy: 'Informationen sammeln, tiefe Analyse, objektive Distanz.',
            strengths: 'Weisheit, Objektivität, analytischer Verstand, Ruhe.',
            weaknesses: 'Dogmatismus, emotionale Kälte, Inaktivität durch Überanalyse ("Paralysis by Analysis").'
        },
        { 
            id: 'innocent', name: 'Der Unschuldige', coords: [20, 80, 40, 10], 
            motto: 'Frei und glücklich sein.', 
            desire: 'Das Paradies erleben und das Richtige tun.', 
            fear: 'Bestraft zu werden für Fehler, Korruption der Seele.', 
            strategy: 'Den moralisch richtigen Weg wählen, reines Gewissen bewahren.',
            strengths: 'Optimismus, unerschütterliches Vertrauen, Loyalität, Reinheit.',
            weaknesses: 'Naivität, Verleugnung von Problemen, Abhängigkeit, Realitätsfremdheit.'
        },
        { 
            id: 'explorer', name: 'Der Entdecker', coords: [80, 20, 60, 90], 
            motto: 'Sperrt mich nicht ein.', 
            desire: 'Die Welt und sich selbst erforschen; ein authentisches Leben führen.', 
            fear: 'Innere Leere, Konformität, gefangen zu sein.', 
            strategy: 'Reisen, ausbrechen, neue Erfahrungen suchen, Routinen meiden.',
            strengths: 'Autonomie, Ambition, Anpassungsfähigkeit, Mut zum Unbekannten.',
            weaknesses: 'Ziellosigkeit, Unfähigkeit zur Bindung, ewige Unzufriedenheit, Isolation.'
        },
        { 
            id: 'rebel', name: 'Der Rebell', coords: [90, 30, 50, 80], 
            motto: 'Regeln sind dazu da, gebrochen zu werden.', 
            desire: 'Was nicht funktioniert, muss zerstört werden. Rache / Revolution.', 
            fear: 'Machtlosigkeit, Bedeutungslosigkeit, Unterdrückung.', 
            strategy: 'Zerstören, stören, schockieren, Tabus brechen.',
            strengths: 'Befreiung, Radikalität, Katalysator für notwendigen Wandel.',
            weaknesses: 'Zerstörungswut, Zynismus, Anarchismus, Unfähigkeit neu aufzubauen.'
        },
        { 
            id: 'hero', name: 'Der Held', coords: [60, 30, 20, 80], 
            motto: 'Wo ein Wille ist, ist ein Weg.', 
            desire: 'Den eigenen Wert durch mutige, schwierige Taten beweisen.', 
            fear: 'Schwäche, Feigheit, Verletzlichkeit.', 
            strategy: 'Stark und kompetent werden, Herausforderungen direkt angreifen.',
            strengths: 'Mut, Disziplin, Energie, Fokussierung auf Meisterschaft.',
            weaknesses: 'Arroganz, Burnout, immer einen "Feind" suchen, Konfliktsucht.'
        },
        { 
            id: 'magician', name: 'Der Magier', coords: [70, 40, 90, 70], 
            motto: 'Ich mache Visionen zur Realität.', 
            desire: 'Die fundamentalen Gesetze des Universums verstehen und formen.', 
            fear: 'Unbeabsichtigte negative Konsequenzen, schwarze Magie.', 
            strategy: 'Eine Vision entwickeln, tiefes esoterisches/technisches Wissen anwenden.',
            strengths: 'Transformation, Charisma, ganzheitliches Denken, Problemlösung.',
            weaknesses: 'Manipulation, Hybris, Realitätsverlust, Geheimniskrämerei.'
        },
        { 
            id: 'jester', name: 'Der Narr', coords: [80, 70, 70, 60], 
            motto: 'Du lebst nur einmal.', 
            desire: 'Im Moment leben, Freude haben und die Welt erhellen.', 
            fear: 'Langeweile, selbst langweilig zu sein.', 
            strategy: 'Spielen, Witze machen, Konventionen durch Humor entlarven.',
            strengths: 'Humor, absolute Präsenz, Perspektivenwechsel, Unbeschwertheit.',
            weaknesses: 'Frivolität, Zeitverschwendung, Unfähigkeit ernst zu bleiben, Verantwortungslosigkeit.'
        },
        { 
            id: 'regular', name: 'Der Jedermann', coords: [40, 90, 40, 20], 
            motto: 'Alle Menschen sind gleich.', 
            desire: 'Dazugehören und eine echte Verbindung zu anderen spüren.', 
            fear: 'Ausgestoßen zu werden, arrogant zu wirken.', 
            strategy: 'Sich anpassen, solide Werte pflegen, den "Common Sense" leben.',
            strengths: 'Empathie, Realismus, Erdung, Gemeinschaftssinn.',
            weaknesses: 'Konformität, Selbstaufgabe, Angst vor Exzellenz, Mittelmaß.'
        },
        { 
            id: 'lover', name: 'Der Liebende', coords: [50, 90, 80, 40], 
            motto: 'Du bist der Einzige für mich.', 
            desire: 'Tiefe Intimität und sinnliche Erfahrung erlangen.', 
            fear: 'Einsamkeit, unsichtbar sein, ungewollt zu sein.', 
            strategy: 'Attraktiv werden – physisch, emotional und spirituell.',
            strengths: 'Leidenschaft, Hingabe, Wertschätzung für Schönheit, emotionale Tiefe.',
            weaknesses: 'Eifersucht, emotionale Abhängigkeit, Identitätsverlust in Beziehungen.'
        },
        { 
            id: 'caregiver', name: 'Der Betreuer', coords: [30, 90, 30, 10], 
            motto: 'Liebe deinen Nächsten wie dich selbst.', 
            desire: 'Andere vor Schaden bewahren und pflegen.', 
            fear: 'Egoismus, Undankbarkeit, dass den Liebsten etwas zustößt.', 
            strategy: 'Dinge für andere tun, die eigenen Bedürfnisse zurückstellen.',
            strengths: 'Mitgefühl, Großzügigkeit, Altruismus, unglaubliche Belastbarkeit.',
            weaknesses: 'Märtyrertum, Ausbeutbarkeit, manipulatives "Helfen-Syndrom" (Guilt-Tripping).'
        }
    ];

    const DOM = {
        faders: document.querySelectorAll('.vgt-fader'),
        grid: document.getElementById('jg-grid-view'),
        resultCard: document.getElementById('jg-result-card'),
        btnLock: document.getElementById('btn-lock-archetype'),
        btnUnlock: document.getElementById('btn-unlock'),
        syncStatus: document.getElementById('jg-sync-status'),
        
        // Result Fields
        acName: document.getElementById('ac-name'),
        acMotto: document.getElementById('ac-motto'),
        acDesire: document.getElementById('ac-desire'),
        acFear: document.getElementById('ac-fear'),
        acStrategy: document.getElementById('ac-strategy'),
        acStrengths: document.getElementById('ac-strengths'),
        acWeaknesses: document.getElementById('ac-weaknesses'),
        
        // Secondary Wing Fields
        acSecName: document.getElementById('ac-sec-name'),
        acSecMatch: document.getElementById('ac-sec-match')
    };

    let currentDominant = null;
    let currentSecondary = null;

    // --- Vector Math Engine ---
    const calculateDistance = (v1, v2) => {
        let sum = 0;
        for (let i = 0; i < 4; i++) sum += Math.pow(v1[i] - v2[i], 2);
        return Math.sqrt(sum);
    };

    const calculateMatches = () => {
        const userVector = [
            parseInt(document.getElementById('axis-order').value),
            parseInt(document.getElementById('axis-ego').value),
            parseInt(document.getElementById('axis-logic').value),
            parseInt(document.getElementById('axis-risk').value)
        ];

        const maxDist = 200;

        archetypes.forEach(arch => {
            const dist = calculateDistance(userVector, arch.coords);
            let matchScore = 100 - ((dist / maxDist) * 100);
            matchScore = Math.min(99.9, matchScore * 1.2); 
            arch.currentScore = matchScore;
        });

        // Sort to find Top 1 and Top 2
        const sorted = [...archetypes].sort((a, b) => b.currentScore - a.currentScore);
        
        currentDominant = sorted[0];
        currentSecondary = sorted[1]; // The Wing / Shadow

        // UI Update
        DOM.syncStatus.textContent = `Sync: ${currentDominant.currentScore.toFixed(1)}%`;
        renderGrid(sorted);
    };

    // --- UI Render Engine ---
    const renderGrid = (sortedArray) => {
        const frag = document.createDocumentFragment();

        sortedArray.forEach(arch => {
            const isDominant = arch.id === currentDominant.id;
            
            const node = document.createElement('div');
            node.className = `arch-node ${isDominant ? 'dominant' : ''}`;
            
            node.innerHTML = `
                <svg viewBox="0 0 24 24" class="arch-icon"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="12"></line><line x1="22" y1="8.5" x2="12" y2="12"></line><line x1="2" y1="8.5" x2="12" y2="12"></line></svg>
                <h3 class="arch-name"></h3>
                <span class="arch-match"></span>
            `;

            node.querySelector('.arch-name').textContent = arch.name;
            node.querySelector('.arch-match').textContent = `${arch.currentScore.toFixed(1)}% Match`;

            frag.appendChild(node);
        });

        DOM.grid.innerHTML = '';
        DOM.grid.appendChild(frag);
    };

    // --- Interactions ---
    DOM.faders.forEach(fader => {
        fader.addEventListener('input', calculateMatches);
    });

    DOM.btnLock.addEventListener('click', () => {
        if (!currentDominant || !currentSecondary) return;

        // Populate Main Card
        DOM.acName.textContent = currentDominant.name;
        DOM.acMotto.textContent = `"${currentDominant.motto}"`;
        DOM.acDesire.textContent = currentDominant.desire;
        DOM.acFear.textContent = currentDominant.fear;
        DOM.acStrategy.textContent = currentDominant.strategy;
        DOM.acStrengths.textContent = currentDominant.strengths;
        DOM.acWeaknesses.textContent = currentDominant.weaknesses;

        // Populate Secondary Wing
        DOM.acSecName.textContent = currentSecondary.name;
        DOM.acSecMatch.textContent = `${currentSecondary.currentScore.toFixed(1)}% Sub-Routinen`;
        
        // View Transition
        DOM.grid.classList.add('hidden');
        DOM.resultCard.classList.remove('hidden');
        
        // Lock sliders visually
        DOM.faders.forEach(f => f.disabled = true);
        DOM.btnLock.disabled = true;
    });

    DOM.btnUnlock.addEventListener('click', () => {
        DOM.resultCard.classList.add('hidden');
        DOM.grid.classList.remove('hidden');
        
        // Unlock sliders
        DOM.faders.forEach(f => f.disabled = false);
        DOM.btnLock.disabled = false;
    });

    // --- Init ---
    calculateMatches();

});
