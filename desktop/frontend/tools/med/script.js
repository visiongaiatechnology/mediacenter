/**
 * VGT NEURAL RESET LOGIC (DIAMANT SUPREME)
 * 100% Native WebAudio Ambient Synthesis & JS Timer Architecture.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-med')) return;

    const DOM = {
        // Timer & UI
        timeLeft: document.getElementById('med-time-left'),
        auraRing: document.getElementById('med-aura-ring'),
        phaseText: document.getElementById('med-phase-text'),
        phaseTimer: document.getElementById('med-phase-timer'),
        
        btnStart: document.getElementById('btn-med-start'),
        btnStop: document.getElementById('btn-med-stop'),
        btnText: document.getElementById('med-btn-text'),
        
        // Toggles
        breathBtns: document.querySelectorAll('.breath-btn'),
        timeBtns: document.querySelectorAll('.time-btn'),
        
        // Audio
        soundToggles: document.querySelectorAll('.sound-toggle'),
        volSliders: document.querySelectorAll('.vol-slider'),
        ambientStatus: document.getElementById('ambient-status'),
        ambientPulse: document.getElementById('ambient-pulse')
    };

    // --- State Management ---
    let sessionActive = false;
    let timerInterval = null;
    let breathTimeout = null;
    let remainingSeconds = 600; // Default 10 min
    
    let activeProtocol = 'box'; // 'box', 'relax', 'coherent'
    
    // Breathing Protocols (in milliseconds)
    const protocols = {
        'box': [
            { name: 'EINATMEN', duration: 4000, scale: 2.2 },
            { name: 'HALTEN', duration: 4000, scale: 2.2 },
            { name: 'AUSATMEN', duration: 4000, scale: 1.0 },
            { name: 'HALTEN', duration: 4000, scale: 1.0 }
        ],
        'relax': [
            { name: 'EINATMEN', duration: 4000, scale: 2.2 },
            { name: 'HALTEN', duration: 7000, scale: 2.2 },
            { name: 'AUSATMEN', duration: 8000, scale: 1.0 }
        ],
        'coherent': [
            { name: 'EINATMEN', duration: 5500, scale: 2.2 },
            { name: 'AUSATMEN', duration: 5500, scale: 1.0 }
        ]
    };

    let currentPhaseIndex = 0;

    // --- Web Audio Engine (Generative) ---
    let audioCtx = null;
    let masterGain = null;
    let nodes = {
        drone: { active: false, gain: null, osc1: null, osc2: null },
        brown: { active: false, gain: null, source: null },
        pink: { active: false, gain: null, source: null }
    };

    const initAudioEngine = () => {
        if (audioCtx) return;
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.connect(audioCtx.destination);
    };

    const checkAmbientStatus = () => {
        const anyActive = nodes.drone.active || nodes.brown.active || nodes.pink.active;
        if (anyActive) {
            DOM.ambientStatus.classList.add('active');
            DOM.ambientStatus.innerHTML = '<span class="pulse-dot"></span> Online';
        } else {
            DOM.ambientStatus.classList.remove('active');
            DOM.ambientStatus.innerHTML = '<span class="pulse-dot hidden"></span> Offline';
        }
    };

    // Synthesize Brown Noise
    const createBrownNoise = () => {
        const bufferSize = audioCtx.sampleRate * 2; // 2 seconds buffer
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; // Compensate for low gain
        }
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        return source;
    };

    // Synthesize Pink Noise
    const createPinkNoise = () => {
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11; // Compensate gain
            b6 = white * 0.115926;
        }
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        return source;
    };

    // Synthesize Binaural Drone (432Hz Base, 4Hz Beat)
    const startDrone = (vol) => {
        nodes.drone.gain = audioCtx.createGain();
        nodes.drone.gain.gain.value = vol;
        nodes.drone.gain.connect(masterGain);

        nodes.drone.osc1 = audioCtx.createOscillator();
        nodes.drone.osc2 = audioCtx.createOscillator();
        
        const pan1 = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : audioCtx.createPanner();
        const pan2 = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : audioCtx.createPanner();

        nodes.drone.osc1.type = 'sine';
        nodes.drone.osc2.type = 'sine';
        nodes.drone.osc1.frequency.value = 430; // Left Ear
        nodes.drone.osc2.frequency.value = 434; // Right Ear (4Hz difference = Theta state)

        if (audioCtx.createStereoPanner) {
            pan1.pan.value = -1;
            pan2.pan.value = 1;
        } else {
            pan1.setPosition(-1, 0, 0);
            pan2.setPosition(1, 0, 0);
        }

        nodes.drone.osc1.connect(pan1);
        nodes.drone.osc2.connect(pan2);
        pan1.connect(nodes.drone.gain);
        pan2.connect(nodes.drone.gain);

        nodes.drone.osc1.start();
        nodes.drone.osc2.start();
    };

    const stopDrone = () => {
        if(nodes.drone.osc1) { nodes.drone.osc1.stop(); nodes.drone.osc1.disconnect(); }
        if(nodes.drone.osc2) { nodes.drone.osc2.stop(); nodes.drone.osc2.disconnect(); }
        if(nodes.drone.gain) nodes.drone.gain.disconnect();
    };

    const toggleNoise = (type, isActive, vol) => {
        if (isActive) {
            nodes[type].gain = audioCtx.createGain();
            nodes[type].gain.gain.value = vol;
            nodes[type].gain.connect(masterGain);
            
            nodes[type].source = type === 'brown' ? createBrownNoise() : createPinkNoise();
            nodes[type].source.connect(nodes[type].gain);
            nodes[type].source.start();
        } else {
            if(nodes[type].source) { nodes[type].source.stop(); nodes[type].source.disconnect(); }
            if(nodes[type].gain) nodes[type].gain.disconnect();
        }
    };

    // Audio Event Listeners
    DOM.soundToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            if (!audioCtx) initAudioEngine();
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const type = e.target.getAttribute('data-type');
            const isActive = e.target.checked;
            const volSlider = document.querySelector(`.vol-slider[data-target="${type}"]`);
            const vol = parseFloat(volSlider.value);

            nodes[type].active = isActive;
            const trackDiv = e.target.closest('.ambient-track');
            
            if (isActive) {
                trackDiv.classList.add('playing');
                if (type === 'drone') startDrone(vol);
                else toggleNoise(type, true, vol);
            } else {
                trackDiv.classList.remove('playing');
                if (type === 'drone') stopDrone();
                else toggleNoise(type, false, vol);
            }
            checkAmbientStatus();
        });
    });

    DOM.volSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const type = e.target.getAttribute('data-target');
            if (nodes[type].active && nodes[type].gain) {
                // Smooth volume change
                nodes[type].gain.gain.setTargetAtTime(parseFloat(e.target.value), audioCtx.currentTime, 0.1);
            }
        });
    });

    // --- Format & Time Utilities ---
    const formatTime = (secs) => {
        const m = Math.floor(secs / 60);
        const s = secs % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // --- UI Setup Listeners ---
    DOM.timeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (sessionActive) return; // Prevent change during session
            DOM.timeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            remainingSeconds = parseInt(btn.getAttribute('data-time'));
            DOM.timeLeft.textContent = formatTime(remainingSeconds);
        });
    });

    DOM.breathBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (sessionActive) return;
            DOM.breathBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeProtocol = btn.getAttribute('data-protocol');
        });
    });

    // --- Breathing Engine ---
    const executeBreathPhase = () => {
        if (!sessionActive) return;

        const protocol = protocols[activeProtocol];
        const phase = protocol[currentPhaseIndex];

        // UI Update
        DOM.phaseText.textContent = phase.name;
        DOM.phaseTimer.textContent = `${phase.duration / 1000}s`;
        
        if (phase.name === 'EINATMEN' || phase.name === 'AUSATMEN') {
            DOM.phaseText.style.color = 'rgba(var(--c-teal), 1)';
        } else {
            DOM.phaseText.style.color = '#ffffff';
        }

        // CSS Transition Engine
        DOM.auraRing.style.transitionDuration = `${phase.duration}ms`;
        DOM.auraRing.style.transform = `scale(${phase.scale})`;

        // Schedule next phase
        breathTimeout = setTimeout(() => {
            currentPhaseIndex++;
            if (currentPhaseIndex >= protocol.length) currentPhaseIndex = 0; // Loop
            executeBreathPhase();
        }, phase.duration);
    };

    // --- Session Master Control ---
    const stopSession = () => {
        sessionActive = false;
        clearInterval(timerInterval);
        clearTimeout(breathTimeout);
        
        // Reset Aura
        DOM.auraRing.style.transitionDuration = `1000ms`;
        DOM.auraRing.style.transform = `scale(1)`;
        DOM.phaseText.textContent = "BEREIT";
        DOM.phaseText.style.color = '#ffffff';
        DOM.phaseTimer.classList.add('hidden');

        // Reset UI
        DOM.btnStop.classList.add('hidden');
        DOM.btnStart.classList.remove('hidden');
        DOM.timeLeft.style.color = 'rgba(var(--c-teal), 1)';
        
        // Refresh timer based on active button
        const activeTimeBtn = document.querySelector('.time-btn.active');
        remainingSeconds = parseInt(activeTimeBtn.getAttribute('data-time'));
        DOM.timeLeft.textContent = formatTime(remainingSeconds);

        // Turn off sound automatically when session stops
        DOM.soundToggles.forEach(t => {
            if (t.checked) {
                t.checked = false;
                t.dispatchEvent(new Event('change')); // Triggers off
            }
        });
    };

    DOM.btnStart.addEventListener('click', () => {
        sessionActive = true;
        
        // Init Audio Context (Must be triggered by user gesture)
        if (!audioCtx) initAudioEngine();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // UI Switch
        DOM.btnStart.classList.add('hidden');
        DOM.btnStop.classList.remove('hidden');
        DOM.phaseTimer.classList.remove('hidden');
        DOM.timeLeft.style.color = 'var(--vg-text)';

        // Start Core Loops
        currentPhaseIndex = 0;
        executeBreathPhase();

        timerInterval = setInterval(() => {
            remainingSeconds--;
            DOM.timeLeft.textContent = formatTime(remainingSeconds);

            if (remainingSeconds <= 0) {
                stopSession();
                // Optional: Play a singing bowl sound here if you want to extend it
                DOM.phaseText.textContent = "SESSION BEENDET";
            }
        }, 1000);
    });

    DOM.btnStop.addEventListener('click', stopSession);

    // Initial setup
    DOM.timeLeft.textContent = formatTime(remainingSeconds);
});