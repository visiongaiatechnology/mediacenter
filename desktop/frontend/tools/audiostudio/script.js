/**
 * VGT MEDIACENTER - AUDIO STUDIO PRO LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: RAM Leak Prevention, DOM-XSS Shielding & AudioContext Optimization
 * Local Audio Processing using WaveSurfer.js and Lame.js.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-audiostudio')) return;

    const AudioStudioEngine = {
        DOM: {},
        State: {
            wavesurfer: null,
            currentFile: null,
            currentObjectUrl: null, // Tracked für sichere Garbage Collection
            audioContext: null,
            targetFormat: 'mp3',
            eqFilters: [],
            isEncoding: false,
            // SVG Caching für XSS-sichere Injektion
            svgPlay: '<svg viewBox="0 0 24 24" class="svg-icon play-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
            svgPause: '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('as-dropzone'),
                fileInput: document.getElementById('as-file-input'),
                workspace: document.getElementById('as-workspace'),
                btnReset: document.getElementById('as-btn-reset'),
                filename: document.getElementById('as-filename'),
                filesize: document.getElementById('as-filesize'),
                
                // Waveform & Controls
                waveform: document.getElementById('waveform'),
                loader: document.getElementById('as-loader'),
                btnPlay: document.getElementById('btn-play-pause'),
                timeCurrent: document.getElementById('time-current'),
                timeTotal: document.getElementById('time-total'),
                sliderVolume: document.getElementById('as-volume'),
                
                // Equalizer
                eqSliders: document.querySelectorAll('.eq-slider'),
                
                // Conversion
                fmtBtns: document.querySelectorAll('.fmt-btn'),
                qualityGroup: document.getElementById('mp3-quality-group'),
                sliderBitrate: document.getElementById('as-bitrate'),
                lblBitrate: document.getElementById('lbl-bitrate'),
                btnExport: document.getElementById('as-btn-export'),
                encodeProgress: document.getElementById('as-encode-progress'),
                encodeFill: document.getElementById('encode-fill'),
                encodeText: document.getElementById('encode-text')
            };
        },

        waitForDependencies() {
            const ensureLibLoaded = setInterval(() => {
                if (typeof WaveSurfer !== 'undefined' && typeof lamejs !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.initAudioContext();
                    this.bindEvents();
                    console.log('VGT AUDIO STUDIO: Digital Signal Processor (DSP) Active.');
                }
            }, 100);
        },

        initAudioContext() {
            // Einheitlicher WebAudio Context für WaveSurfer und Decoder
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.State.audioContext = new AudioContext();
        },

        // --- SAFE DOM MANIPULATION UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString) {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) {
                element.appendChild(svgNode);
            }
        },

        formatBytes(bytes) {
            if (bytes === 0 || !bytes) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        formatTime(seconds) {
            if (isNaN(seconds)) return "00:00";
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        },

        // --- BINDING & INGESTION ---
        bindEvents() {
            // Dropzone
            this.DOM.dropZone.addEventListener('dragover', (e) => { 
                e.preventDefault(); 
                this.DOM.dropZone.classList.add('dragover'); 
            });
            this.DOM.dropZone.addEventListener('dragleave', () => {
                this.DOM.dropZone.classList.remove('dragover');
            });
            this.DOM.dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.dropZone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.handleAudioFile(e.dataTransfer.files[0]);
            });
            
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleAudioFile(e.target.files[0]);
                this.DOM.fileInput.value = ''; // Reset
            });

            // Workspace Reset
            this.DOM.btnReset.addEventListener('click', () => this.resetTool());

            // Format Toggles
            this.DOM.fmtBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.fmtBtns.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.targetFormat = e.currentTarget.getAttribute('data-fmt');
                    
                    if (this.State.targetFormat === 'wav') {
                        this.DOM.qualityGroup.classList.add('hidden');
                    } else {
                        this.DOM.qualityGroup.classList.remove('hidden');
                    }
                });
            });

            // Bitrate Slider
            this.DOM.sliderBitrate.addEventListener('input', (e) => {
                this.DOM.lblBitrate.textContent = `${e.target.value} kbps`;
            });

            // Playback
            this.DOM.btnPlay.addEventListener('click', () => {
                if (this.State.wavesurfer) {
                    // Unlock AudioContext policy if suspended
                    if (this.State.audioContext.state === 'suspended') {
                        this.State.audioContext.resume();
                    }
                    this.State.wavesurfer.playPause();
                }
            });

            this.DOM.sliderVolume.addEventListener('input', (e) => {
                if (this.State.wavesurfer) this.State.wavesurfer.setVolume(parseFloat(e.target.value));
            });

            // EQ
            this.DOM.eqSliders.forEach(slider => {
                slider.addEventListener('input', (e) => {
                    const bandIdx = parseInt(e.target.getAttribute('data-band'), 10);
                    const val = parseFloat(e.target.value);
                    const displayVal = (val > 0 ? '+' : '') + val;
                    
                    const label = document.getElementById(`val-eq-${bandIdx}`);
                    if (label) label.textContent = `${displayVal} dB`; // XSS Safe
                    
                    if (this.State.eqFilters[bandIdx]) {
                        this.State.eqFilters[bandIdx].gain.value = val;
                    }
                });
            });

            // Encoder Trigger
            this.DOM.btnExport.addEventListener('click', () => this.executeExport());
        },

        resetTool() {
            // VGT GC (Garbage Collection): Massive RAM Leak Protection
            if (this.State.wavesurfer) {
                this.State.wavesurfer.pause();
                this.State.wavesurfer.destroy();
                this.State.wavesurfer = null;
            }
            if (this.State.currentObjectUrl) {
                URL.revokeObjectURL(this.State.currentObjectUrl);
                this.State.currentObjectUrl = null;
            }

            this.State.currentFile = null;
            this.State.eqFilters = [];
            
            // Reset EQ Sliders UI
            this.DOM.eqSliders.forEach(slider => {
                slider.value = 0;
                const label = document.getElementById(`val-eq-${slider.getAttribute('data-band')}`);
                if (label) label.textContent = "0 dB";
            });

            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.btnExport.disabled = false;
        },

        handleAudioFile(file) {
            if (!file.type.startsWith('audio/') && !file.type.startsWith('video/')) {
                alert("VGT SECURITY BLOCK: Bitte laden Sie eine gültige Audio-Datei hoch (WAV, MP3, OGG, M4A).");
                return;
            }

            if (file.size > 150 * 1024 * 1024) {
                alert("VGT MEMORY WARNING: Die Datei überschreitet das 150MB Browser-Limit für Client-Side Verarbeitung.");
                return;
            }

            this.resetTool(); // Flush memory vor neuer Injektion

            this.State.currentFile = file;
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');
            this.DOM.loader.classList.remove('hidden');
            
            this.DOM.filename.textContent = file.name; // XSS Safe
            this.DOM.filesize.textContent = this.formatBytes(file.size);

            this.State.currentObjectUrl = URL.createObjectURL(file);
            
            this.setupWaveSurfer();
            this.State.wavesurfer.load(this.State.currentObjectUrl);
        },

        // --- WAVESURFER & DSP ENGINE ---
        setupWaveSurfer() {
            this.State.wavesurfer = WaveSurfer.create({
                container: '#waveform',
                waveColor: 'rgba(244, 114, 182, 0.4)',
                progressColor: 'rgba(244, 114, 182, 1)',
                cursorColor: '#fff',
                barWidth: 3,
                barGap: 2,
                barRadius: 3,
                height: 150,
                normalize: true,
                backend: 'WebAudio',
                audioContext: this.State.audioContext // Re-use our centralized context
            });

            this.State.wavesurfer.on('play', () => {
                this.injectSVG(this.DOM.btnPlay, this.State.svgPause);
            });
            this.State.wavesurfer.on('pause', () => {
                this.injectSVG(this.DOM.btnPlay, this.State.svgPlay);
            });
            
            this.State.wavesurfer.on('audioprocess', () => this.updateTime());
            this.State.wavesurfer.on('seek', () => this.updateTime());
            
            this.State.wavesurfer.on('ready', () => {
                this.DOM.loader.classList.add('hidden');
                this.updateTime();
                this.DOM.timeTotal.textContent = this.formatTime(this.State.wavesurfer.getDuration());

                this.mountEqualizer();
            });
            
            this.State.wavesurfer.on('error', (err) => {
                console.error('WaveSurfer Error:', err);
                alert("Fehler beim Dekodieren der Audiospur. Möglicherweise ist das Format korrupt.");
                this.resetTool();
            });
        },

        updateTime() {
            if (!this.State.wavesurfer) return;
            this.DOM.timeCurrent.textContent = this.formatTime(this.State.wavesurfer.getCurrentTime());
        },

        mountEqualizer() {
            if (!this.State.wavesurfer.backend || !this.State.wavesurfer.backend.ac) return;

            const eqBands = [
                { f: 60, type: 'lowshelf' },
                { f: 230, type: 'peaking' },
                { f: 910, type: 'peaking' },
                { f: 3600, type: 'peaking' },
                { f: 14000, type: 'highshelf' }
            ];

            this.State.eqFilters = eqBands.map((band, i) => {
                const filter = this.State.wavesurfer.backend.ac.createBiquadFilter();
                filter.type = band.type;
                filter.gain.value = 0;
                filter.Q.value = 1;
                filter.frequency.value = band.f;
                return filter;
            });
            
            if (typeof this.State.wavesurfer.backend.setFilters === 'function') {
                this.State.wavesurfer.backend.setFilters(this.State.eqFilters);
            }
        },

        // --- ENCODING ENGINE (MP3 / WAV) ---
        async executeExport() {
            if (!this.State.currentFile || !this.State.audioContext || this.State.isEncoding) return;
            
            this.State.isEncoding = true;
            this.DOM.btnExport.disabled = true;
            this.DOM.encodeProgress.classList.remove('hidden');
            this.DOM.encodeText.textContent = "Lese Audiobuffer in RAM...";
            this.DOM.encodeFill.style.width = '10%';

            try {
                // ArrayBuffer aus der Originaldatei extrahieren
                const arrayBuffer = await this.State.currentFile.arrayBuffer();
                
                // Decode Audio (Achtung: Dies umgeht den Live-EQ, da wir die Rohdatei exportieren)
                const decodedBuffer = await this.State.audioContext.decodeAudioData(arrayBuffer);
                
                this.DOM.encodeFill.style.width = '30%';

                let resultBlob;
                const baseName = this.State.currentFile.name.replace(/\.[^/.]+$/, "");

                if (this.State.targetFormat === 'wav') {
                    this.DOM.encodeText.textContent = "Generiere Lossless WAV...";
                    resultBlob = this.exportWAV(decodedBuffer);
                    this.triggerDownload(resultBlob, `${baseName}_vgt.wav`);
                } else {
                    this.DOM.encodeText.textContent = "Kodiere LameJS MP3...";
                    const kbps = parseInt(this.DOM.sliderBitrate.value, 10) || 192;
                    resultBlob = await this.exportMP3(decodedBuffer, kbps);
                    this.triggerDownload(resultBlob, `${baseName}_vgt_${kbps}k.mp3`);
                }

                this.DOM.encodeFill.style.width = '100%';
                this.DOM.encodeText.textContent = "Export erfolgreich! Vektor gesichert.";

                setTimeout(() => {
                    this.DOM.encodeProgress.classList.add('hidden');
                    this.DOM.btnExport.disabled = false;
                    this.State.isEncoding = false;
                }, 2000);

            } catch (err) {
                console.error("VGT AUDIO ENCODING ERROR:", err);
                alert("Kritischer Fehler bei der Audio-Konvertierung (Out of Memory oder korruptes File).");
                this.DOM.encodeProgress.classList.add('hidden');
                this.DOM.btnExport.disabled = false;
                this.State.isEncoding = false;
            }
        },

        triggerDownload(blob, filename) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // GC: Remove Blob from memory instantly
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        },

        // --- NATIVE ENCODERS ---
        exportWAV(audioBuffer) {
            const numChannels = audioBuffer.numberOfChannels;
            const sampleRate = audioBuffer.sampleRate;
            const format = 1; // PCM
            const bitDepth = 16;
            
            const result = new Float32Array(audioBuffer.length * numChannels);
            
            // Interleave channels
            if (numChannels === 2) {
                const left = audioBuffer.getChannelData(0);
                const right = audioBuffer.getChannelData(1);
                for (let i = 0; i < audioBuffer.length; i++) {
                    result[i * 2] = left[i];
                    result[i * 2 + 1] = right[i];
                }
            } else {
                result.set(audioBuffer.getChannelData(0));
            }

            const dataLength = result.length * (bitDepth / 8);
            const buffer = new ArrayBuffer(44 + dataLength);
            const view = new DataView(buffer);

            const writeString = (view, offset, string) => {
                for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i));
            };

            // WAV Header
            writeString(view, 0, 'RIFF');
            view.setUint32(4, 36 + dataLength, true);
            writeString(view, 8, 'WAVE');
            writeString(view, 12, 'fmt ');
            view.setUint32(16, 16, true);
            view.setUint16(20, format, true);
            view.setUint16(22, numChannels, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
            view.setUint16(32, numChannels * (bitDepth / 8), true);
            view.setUint16(34, bitDepth, true);
            writeString(view, 36, 'data');
            view.setUint32(40, dataLength, true);

            // PCM Data (16-bit)
            let offset = 44;
            for (let i = 0; i < result.length; i++, offset += 2) {
                let s = Math.max(-1, Math.min(1, result[i]));
                view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
            }

            return new Blob([view], { type: 'audio/wav' });
        },

        exportMP3(audioBuffer, kbps) {
            return new Promise((resolve) => {
                const channels = audioBuffer.numberOfChannels;
                const sampleRate = audioBuffer.sampleRate;
                const mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
                const mp3Data = [];

                const sampleBlockSize = 1152; // Lame standard chunk size
                let left = audioBuffer.getChannelData(0);
                let right = channels === 2 ? audioBuffer.getChannelData(1) : left;

                const floatToInt16 = (floatArray) => {
                    const int16Array = new Int16Array(floatArray.length);
                    for (let i = 0; i < floatArray.length; i++) {
                        let s = Math.max(-1, Math.min(1, floatArray[i]));
                        int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                    }
                    return int16Array;
                };

                const leftInt = floatToInt16(left);
                const rightInt = floatToInt16(right);
                const length = leftInt.length;
                let offset = 0;

                // Asynchronous Chunk Processor to prevent UI freezing
                const processChunk = () => {
                    const end = Math.min(offset + sampleBlockSize * 100, length);
                    const leftChunk = leftInt.subarray(offset, end);
                    const rightChunk = rightInt.subarray(offset, end);
                    
                    let mp3buf;
                    if (channels === 2) mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
                    else mp3buf = mp3encoder.encodeBuffer(leftChunk);
                    
                    if (mp3buf.length > 0) mp3Data.push(mp3buf);
                    offset = end;
                    
                    const percent = Math.floor((offset / length) * 60) + 30; // Scale 30% to 90%
                    if (this.DOM.encodeFill) this.DOM.encodeFill.style.width = `${percent}%`;
                    if (this.DOM.encodeText) this.DOM.encodeText.textContent = `Kodiere LameJS... ${percent}%`;

                    if (offset < length) {
                        setTimeout(processChunk, 10);
                    } else {
                        const mp3bufFinal = mp3encoder.flush();
                        if (mp3bufFinal.length > 0) mp3Data.push(mp3bufFinal);
                        resolve(new Blob(mp3Data, { type: 'audio/mp3' }));
                    }
                };

                processChunk();
            });
        }
    };

    AudioStudioEngine.init();
});