/**
 * VGT NEURAL SYNC LOGIC (DIAMANT SUPREME)
 * 100% Native WebAudio API Implementation.
 * Dual-Oscillator Architecture with Stereo Panning and Real-Time Canvas Oszilloskop.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-freq')) return;

    const DOM = {
        wrapper: document.querySelector('.freq-engine-panel'),
        btnToggle: document.getElementById('btn-toggle-engine'),
        btnText: document.getElementById('engine-btn-text'),
        statusBadge: document.querySelector('.vis-status'),
        statusText: document.getElementById('engine-status'),
        
        sliderBase: document.getElementById('slider-base'),
        lblBase: document.getElementById('lbl-base'),
        sliderBeat: document.getElementById('slider-beat'),
        lblBeat: document.getElementById('lbl-beat'),
        sliderVol: document.getElementById('slider-volume'),
        
        readoutL: document.getElementById('readout-l'),
        readoutR: document.getElementById('readout-r'),
        
        canvas: document.getElementById('freq-canvas'),
        presets: document.querySelectorAll('.preset-btn')
    };

    const ctx = DOM.canvas.getContext('2d');
    
    // WebAudio Engine Core
    let audioCtx = null;
    let oscLeft = null;
    let oscRight = null;
    let masterGain = null;
    let analyser = null;
    
    let isPlaying = false;
    let animationId = null;

    // --- Engine Initialization ---
    const initEngine = () => {
        if (audioCtx) return; // Prevent duplicate contexts
        
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        masterGain = audioCtx.createGain();
        masterGain.gain.value = 0; // Start muted
        
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048; // Resolution of oscilloscope
        
        // Routing: Master -> Analyser -> Speakers
        masterGain.connect(analyser);
        analyser.connect(audioCtx.destination);
    };

    const startOscillators = () => {
        const baseFreq = parseFloat(DOM.sliderBase.value);
        const beatFreq = parseFloat(DOM.sliderBeat.value);
        
        // Calculate asymmetric frequencies
        const freqLeft = baseFreq - (beatFreq / 2);
        const freqRight = baseFreq + (beatFreq / 2);

        // Create Nodes
        oscLeft = audioCtx.createOscillator();
        oscRight = audioCtx.createOscillator();
        
        const panLeft = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : audioCtx.createPanner();
        const panRight = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : audioCtx.createPanner();

        // Configure Nodes
        oscLeft.type = 'sine';
        oscRight.type = 'sine';
        oscLeft.frequency.value = freqLeft;
        oscRight.frequency.value = freqRight;

        // Hard Panning (-1 = 100% Left, 1 = 100% Right)
        if (audioCtx.createStereoPanner) {
            panLeft.pan.value = -1;
            panRight.pan.value = 1;
        } else {
            // Fallback for older Safari
            panLeft.setPosition(-1, 0, 0);
            panRight.setPosition(1, 0, 0);
        }

        // Connect
        oscLeft.connect(panLeft);
        oscRight.connect(panRight);
        panLeft.connect(masterGain);
        panRight.connect(masterGain);

        oscLeft.start();
        oscRight.start();
        
        updateReadouts(freqLeft, freqRight);
    };

    const updateFrequencies = () => {
        if (!isPlaying || !oscLeft || !oscRight) return;
        
        const baseFreq = parseFloat(DOM.sliderBase.value);
        const beatFreq = parseFloat(DOM.sliderBeat.value);
        
        const freqLeft = baseFreq - (beatFreq / 2);
        const freqRight = baseFreq + (beatFreq / 2);

        // Smooth transition (prevents popping)
        const time = audioCtx.currentTime + 0.1;
        oscLeft.frequency.exponentialRampToValueAtTime(freqLeft, time);
        oscRight.frequency.exponentialRampToValueAtTime(freqRight, time);
        
        updateReadouts(freqLeft, freqRight);
    };

    const updateReadouts = (left, right) => {
        DOM.readoutL.textContent = `${left.toFixed(1)} Hz (L)`;
        DOM.readoutR.textContent = `${right.toFixed(1)} Hz (R)`;
    };

    // --- Visualizer (Oszilloskop) ---
    const resizeCanvas = () => {
        const parent = DOM.canvas.parentElement;
        DOM.canvas.width = parent.clientWidth;
        DOM.canvas.height = parent.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawVisualizer = () => {
        if (!isPlaying || !analyser) return;

        animationId = requestAnimationFrame(drawVisualizer);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(dataArray);

        ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)'; // Cyan Line
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';

        ctx.beginPath();

        const sliceWidth = DOM.canvas.width * 1.0 / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = v * DOM.canvas.height / 2;

            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            x += sliceWidth;
        }

        ctx.lineTo(DOM.canvas.width, DOM.canvas.height / 2);
        ctx.stroke();
    };

    // --- UI Event Handlers ---
    const toggleEngine = () => {
        if (!audioCtx) initEngine();
        
        // Resume context if suspended (Browser Autoplay Policy)
        if (audioCtx.state === 'suspended') audioCtx.resume();

        isPlaying = !isPlaying;

        if (isPlaying) {
            // Boot Sequence
            DOM.wrapper.classList.add('engine-active');
            DOM.btnToggle.classList.add('engine-on');
            DOM.btnToggle.innerHTML = '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg><span id="engine-btn-text">Neural Sync Pausieren</span>';
            
            DOM.statusBadge.classList.add('active');
            DOM.statusText.textContent = "Engine Online & Synchronisiert";

            startOscillators();
            
            // Fade In Volume (100ms)
            const targetVol = parseFloat(DOM.sliderVol.value);
            masterGain.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.1);
            
            drawVisualizer();

        } else {
            // Shutdown Sequence
            DOM.wrapper.classList.remove('engine-active');
            DOM.btnToggle.classList.remove('engine-on');
            DOM.btnToggle.innerHTML = '<svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span id="engine-btn-text">Neural Sync Initiieren</span>';
            
            DOM.statusBadge.classList.remove('active');
            DOM.statusText.textContent = "Engine Offline";

            // Fade Out Volume before stopping (100ms) to prevent clicks
            masterGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
            
            setTimeout(() => {
                if (oscLeft) { oscLeft.stop(); oscLeft.disconnect(); }
                if (oscRight) { oscRight.stop(); oscRight.disconnect(); }
                cancelAnimationFrame(animationId);
                ctx.clearRect(0, 0, DOM.canvas.width, DOM.canvas.height);
                DOM.readoutL.textContent = "0.0 Hz";
                DOM.readoutR.textContent = "0.0 Hz";
            }, 150);
        }
    };

    DOM.btnToggle.addEventListener('click', toggleEngine);

    // Sliders
    DOM.sliderBase.addEventListener('input', (e) => {
        DOM.lblBase.textContent = `${e.target.value} Hz`;
        updateFrequencies();
    });

    DOM.sliderBeat.addEventListener('input', (e) => {
        DOM.lblBeat.textContent = `${e.target.value} Hz`;
        updateFrequencies();
    });

    DOM.sliderVol.addEventListener('input', (e) => {
        if (isPlaying && masterGain) {
            masterGain.gain.setTargetAtTime(parseFloat(e.target.value), audioCtx.currentTime, 0.1);
        }
    });

    // Presets
    DOM.presets.forEach(btn => {
        btn.addEventListener('click', () => {
            DOM.presets.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            DOM.sliderBase.value = btn.getAttribute('data-base');
            DOM.sliderBeat.value = btn.getAttribute('data-beat');
            
            DOM.lblBase.textContent = `${DOM.sliderBase.value} Hz`;
            DOM.lblBeat.textContent = `${DOM.sliderBeat.value} Hz`;
            
            updateFrequencies();
            
            // Auto-start if offline
            if(!isPlaying) toggleEngine();
        });
    });
});