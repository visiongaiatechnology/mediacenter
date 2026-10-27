/**
 * VGT MEDIACENTER - TRACE SCANNER LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, API-Isolation & Object Encapsulation
 * 100% Vanilla JS Exploitation Engine.
 * Extracts Canvas, WebGL, AudioContext, and Hardware Telemetry asynchronously.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-fingerprint')) return;

    const TraceScannerEngine = {
        DOM: {},
        State: {
            isScanning: false,
            // SVG Caching für XSS-sichere DOM-Injektionen
            svgBtnNormal: '<svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
            svgBtnActive: '<svg viewBox="0 0 24 24" class="svg-icon" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>'
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT TRACE SCANNER: Hardware Forensics Engine Active.');
        },

        cacheDOM() {
            this.DOM = {
                btnStart: document.getElementById('btn-start-scan'),
                radarSweep: document.querySelector('.radar-sweep'),
                statusText: document.getElementById('fg-status-text'),
                threatMeter: document.getElementById('fg-threat-meter'),
                entropyScore: document.getElementById('fg-entropy-score'),
                
                // Card Wrappers
                cards: {
                    canvas: document.getElementById('card-canvas'),
                    webgl: document.getElementById('card-webgl'),
                    audio: document.getElementById('card-audio'),
                    hw: document.getElementById('card-hardware')
                },

                // Canvas Data
                cvsImg: document.getElementById('fg-canvas-img'),
                cvsPh: document.getElementById('ph-canvas'),
                valCvsHash: document.getElementById('val-canvas-hash'),
                
                // WebGL Data
                valWglVendor: document.getElementById('val-webgl-vendor'),
                valWglRenderer: document.getElementById('val-webgl-renderer'),
                
                // Audio Data
                valAudioHash: document.getElementById('val-audio-hash'),
                
                // HW Data
                valHwCores: document.getElementById('val-hw-cores'),
                valHwRam: document.getElementById('val-hw-ram'),
                valHwOs: document.getElementById('val-hw-os'),
                valHwScreen: document.getElementById('val-hw-screen')
            };
        },

        bindEvents() {
            if (this.DOM.btnStart) {
                this.DOM.btnStart.addEventListener('click', () => this.executeMasterSequence());
            }
        },

        // --- SAFE DOM MANIPULATION UTILS ---
        safeClearOutput(element) {
            if (!element) return;
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString, textAppend = '') {
            if (!element) return;
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            
            if (svgNode) {
                element.appendChild(svgNode);
            }
            if (textAppend) {
                element.appendChild(document.createTextNode(' ' + textAppend));
            }
        },

        async typeWriter(element, text, speed = 30) {
            if (!element) return;
            element.textContent = ''; // Strict textContent prevents XSS
            for (let i = 0; i < text.length; i++) {
                element.textContent += text.charAt(i);
                await new Promise(r => setTimeout(r, speed));
            }
        },

        setCardLoading(cardId, isLoading) {
            const card = this.DOM.cards[cardId];
            if (!card) return;
            const spinner = card.querySelector('.metric-status');
            
            if (isLoading) {
                if(spinner) spinner.classList.remove('hidden');
                card.classList.remove('scanned');
            } else {
                if(spinner) spinner.classList.add('hidden');
                card.classList.add('scanned');
            }
        },

        // --- FAST VANILLA HASH (Cyrb53) ---
        // Zero Dependency - Ultra-Fast non-cryptographic hash for fingerprint generation
        cyrb53(str, seed = 0) {
            let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for (let i = 0, ch; i < str.length; i++) {
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
            h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
            return 4294967296 * (2097151 & h2) + (h1 >>> 0);
        },

        // --- EXTRACTION ENGINES ---
        extractCanvas() {
            this.setCardLoading('canvas', true);
            
            return new Promise(resolve => {
                setTimeout(() => {
                    const canvas = document.getElementById('fg-hidden-canvas');
                    if (!canvas) {
                        this.typeWriter(this.DOM.valCvsHash, "Engine Failure", 20);
                        this.setCardLoading('canvas', false);
                        return resolve(null);
                    }

                    const ctx = canvas.getContext('2d');
                    
                    // Draw complex geometries and text with anti-aliasing to force GPU differences
                    ctx.textBaseline = "top";
                    ctx.font = "14px 'Arial'";
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125, 1, 62, 20);
                    
                    ctx.fillStyle = "#069";
                    ctx.fillText("VGT.Supreme.Fingerprint", 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
                    ctx.fillText("VGT.Supreme.Fingerprint", 4, 17);
                    
                    try {
                        const dataURL = canvas.toDataURL();
                        const hash = this.cyrb53(dataURL).toString(16); // Hex string

                        // UI Update
                        if (this.DOM.cvsPh) this.DOM.cvsPh.classList.add('hidden');
                        if (this.DOM.cvsImg) {
                            this.DOM.cvsImg.src = dataURL;
                            this.DOM.cvsImg.classList.remove('hidden');
                        }
                        this.typeWriter(this.DOM.valCvsHash, hash, 20);

                        this.setCardLoading('canvas', false);
                        resolve(hash);
                    } catch (e) {
                        // Failsafe for strict privacy browsers (e.g. Tor/Brave) blocking Canvas read
                        this.typeWriter(this.DOM.valCvsHash, "Canvas Read Blocked (Secure)", 20);
                        this.setCardLoading('canvas', false);
                        resolve("Blocked");
                    }
                }, 600); // Artificial delay for scanner UX
            });
        },

        extractWebGL() {
            this.setCardLoading('webgl', true);
            
            return new Promise(resolve => {
                setTimeout(() => {
                    const canvas = document.createElement('canvas');
                    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                    let vendor = 'Unknown';
                    let renderer = 'Unknown';

                    if (gl) {
                        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                        if (debugInfo) {
                            vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || 'Masked/Unknown';
                            renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'Masked/Unknown';
                        } else {
                            vendor = gl.getParameter(gl.VENDOR) || 'Unknown';
                            renderer = gl.getParameter(gl.RENDERER) || 'Unknown';
                        }
                    } else {
                        vendor = 'WebGL not supported';
                        renderer = 'WebGL not supported';
                    }

                    // VGT Memory Cleanup
                    canvas.width = 0;
                    canvas.height = 0;

                    this.typeWriter(this.DOM.valWglVendor, vendor, 10);
                    this.typeWriter(this.DOM.valWglRenderer, renderer, 10);

                    this.setCardLoading('webgl', false);
                    resolve({vendor, renderer});
                }, 800);
            });
        },

        extractAudio() {
            this.setCardLoading('audio', true);
            
            return new Promise(resolve => {
                // Audio fingerprinting requires generating a sound and checking how the OS/Hardware calculates it
                try {
                    const OfflineAudioCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                    if (!OfflineAudioCtx) throw new Error("OfflineAudioContext missing");

                    const audioCtx = new OfflineAudioCtx(1, 44100, 44100);
                    const oscillator = audioCtx.createOscillator();
                    oscillator.type = 'triangle';
                    oscillator.frequency.setValueAtTime(10000, audioCtx.currentTime);
                    
                    const compressor = audioCtx.createDynamicsCompressor();
                    compressor.threshold.value = -50;
                    compressor.knee.value = 40;
                    compressor.ratio.value = 12;
                    compressor.attack.value = 0;
                    compressor.release.value = 0.25;

                    oscillator.connect(compressor);
                    compressor.connect(audioCtx.destination);
                    oscillator.start(0);
                    
                    audioCtx.oncomplete = (event) => {
                        const samples = event.renderedBuffer.getChannelData(0);
                        let hash = 0;
                        for (let i = 4500; i < 5000; i++) {
                            hash += Math.abs(samples[i]);
                        }
                        const finalHash = this.cyrb53(hash.toString()).toString(16);
                        
                        this.typeWriter(this.DOM.valAudioHash, finalHash, 20);
                        this.setCardLoading('audio', false);
                        resolve(finalHash);
                    };
                    
                    audioCtx.startRendering();

                } catch (e) {
                    this.typeWriter(this.DOM.valAudioHash, "AudioContext Blocked/Missing", 20);
                    this.setCardLoading('audio', false);
                    resolve("Blocked");
                }
            });
        },

        extractHardware() {
            this.setCardLoading('hw', true);
            
            return new Promise(resolve => {
                setTimeout(() => {
                    const cores = navigator.hardwareConcurrency || 'Unknown / Blocked';
                    const ram = navigator.deviceMemory ? `>= ${navigator.deviceMemory} GB` : 'Unknown / Blocked';
                    const os = navigator.platform || 'Unknown / Blocked';
                    
                    let screenRes = 'Unknown';
                    if (window.screen) {
                        screenRes = `${window.screen.width}x${window.screen.height} (${window.screen.colorDepth}-bit)`;
                    }

                    this.typeWriter(this.DOM.valHwCores, cores.toString(), 10);
                    this.typeWriter(this.DOM.valHwRam, ram, 10);
                    this.typeWriter(this.DOM.valHwOs, os, 10);
                    this.typeWriter(this.DOM.valHwScreen, screenRes, 10);

                    this.setCardLoading('hw', false);
                    resolve({cores, ram, os, screenRes});
                }, 400);
            });
        },

        // --- MASTER SEQUENCE ---
        async executeMasterSequence() {
            if (this.State.isScanning) return;
            this.State.isScanning = true;

            // UI Lock & Feedback
            this.DOM.btnStart.disabled = true;
            this.injectSVG(this.DOM.btnStart, this.State.svgBtnActive, 'Scan läuft...');
            
            if (this.DOM.radarSweep) this.DOM.radarSweep.classList.add('active');
            if (this.DOM.threatMeter) this.DOM.threatMeter.classList.add('hidden');
            
            // Reset old data states
            document.querySelectorAll('.metric-card').forEach(c => c.classList.remove('scanned'));

            // Await consecutive engines
            if (this.DOM.statusText) this.DOM.statusText.textContent = "Extrahiere WebGL Subsystem...";
            await this.extractWebGL();
            
            if (this.DOM.statusText) this.DOM.statusText.textContent = "Analysiere Canvas Pixel-Rendering...";
            await this.extractCanvas();

            if (this.DOM.statusText) this.DOM.statusText.textContent = "Lese Audio DSP Resonanz aus...";
            await this.extractAudio();

            if (this.DOM.statusText) this.DOM.statusText.textContent = "Erfasse Hardware Telemetrie...";
            await this.extractHardware();

            if (this.DOM.statusText) this.DOM.statusText.textContent = "Scan abgeschlossen. Profil generiert.";
            
            // Finish Sequence
            if (this.DOM.radarSweep) this.DOM.radarSweep.classList.remove('active');
            this.injectSVG(this.DOM.btnStart, this.State.svgBtnNormal, 'Deep Scan Erneut Starten');
            this.DOM.btnStart.disabled = false;
            this.State.isScanning = false;

            // Calculate fake but realistic Entropy representation for UX
            if (this.DOM.threatMeter) this.DOM.threatMeter.classList.remove('hidden');
            let entropy = 0;
            const targetEntropy = 98 + (Math.random() * 1.9); // E.g. 99.4%
            
            const interval = setInterval(() => {
                entropy += 1.5;
                if(entropy >= targetEntropy) {
                    entropy = targetEntropy;
                    clearInterval(interval);
                }
                if (this.DOM.entropyScore) {
                    this.DOM.entropyScore.textContent = entropy.toFixed(2);
                }
            }, 30);
        }
    };

    TraceScannerEngine.init();
});