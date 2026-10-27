/**
 * VGT MEDIACENTER - PASSWORD SENTINEL LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: Object Encapsulation, DOM-XSS Prevention & Quantum Math Resilience
 * Math-based Entropy calculation, Classical vs. Quantum Hardware benchmarks.
 * Uses window.crypto for secure random generation.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-pwcheck')) return;

    const PasswordSentinelEngine = {
        DOM: {},
        State: {
            originalCopyNodes: [],
            // Hardware Hash Rates (Estimates for modern GPU Clusters - Hashes per Second)
            RATES: {
                MD5: 100 * 1000000000,    // 100 Giga-Hashes/s
                SHA256: 10 * 1000000000,  // 10 Giga-Hashes/s
                BCRYPT: 10000,            // 10 Kilo-Hashes/s (Cost 12)
                QUANTUM: 100000000        // 100 Mega-Q-Hashes/s (Optimistic Quantum Rate)
            },
            svgCopySuccess: '<svg viewBox="0 0 24 24" class="svg-icon" style="stroke:rgba(var(--c-green),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            this.resetUI();
            console.log('VGT PASSWORD SENTINEL: Quantum-Resilience Analytics Active.');
        },

        cacheDOM() {
            this.DOM = {
                inputPw: document.getElementById('pw-input'),
                btnCopy: document.getElementById('btn-pw-copy'),
                
                statusText: document.getElementById('pw-status-text'),
                meterFill: document.getElementById('pw-meter-fill'),
                
                genLen: document.getElementById('gen-length'),
                genLenVal: document.getElementById('gen-len-val'),
                genUc: document.getElementById('gen-uc'),
                genLc: document.getElementById('gen-lc'),
                genNum: document.getElementById('gen-num'),
                genSym: document.getElementById('gen-sym'),
                btnGen: document.getElementById('btn-generate'),
                
                statEntropy: document.getElementById('stat-entropy'),
                statSpace: document.getElementById('stat-space'),
                
                timeMd5C: document.getElementById('time-md5-c'),
                timeMd5Q: document.getElementById('time-md5-q'),
                timeShaC: document.getElementById('time-sha-c'),
                timeShaQ: document.getElementById('time-sha-q'),
                timeBcryptC: document.getElementById('time-bcrypt-c'),
                timeBcryptQ: document.getElementById('time-bcrypt-q')
            };

            if (this.DOM.btnCopy) {
                // Sichern der originalen Child-Nodes für sicheres UI-Feedback
                this.State.originalCopyNodes = Array.from(this.DOM.btnCopy.childNodes).map(n => n.cloneNode(true));
            }
        },

        bindEvents() {
            this.DOM.inputPw.addEventListener('input', () => this.analyzePassword());
            this.DOM.btnGen.addEventListener('click', () => this.generatePassword());
            
            this.DOM.genLen.addEventListener('input', (e) => {
                this.DOM.genLenVal.textContent = e.target.value; // Native XSS-Sicherheit
            });

            this.DOM.btnCopy.addEventListener('click', () => this.copyToClipboard());
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

        // --- MATH & FORMATTING ENGINE ---
        calculateEntropy(pw) {
            let pool = 0;
            if (/[a-z]/.test(pw)) pool += 26;
            if (/[A-Z]/.test(pw)) pool += 26;
            if (/[0-9]/.test(pw)) pool += 10;
            if (/[^A-Za-z0-9]/.test(pw)) pool += 32;

            if (pool === 0) return { entropy: 0, space: 0 };

            const entropy = pw.length * Math.log2(pool);
            const space = Math.pow(pool, pw.length);
            
            return { entropy, space, pool };
        },

        formatTime(seconds) {
            if (seconds < 0.001) return "Instant";
            if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
            if (seconds < 60) return `${seconds.toFixed(1)} s`;
            
            let m = seconds / 60;
            if (m < 60) return `${m.toFixed(1)} Min`;
            
            let h = m / 60;
            if (h < 24) return `${h.toFixed(1)} Std`;
            
            let d = h / 24;
            if (d < 365) return `${d.toFixed(1)} Tage`;
            
            let y = d / 365;
            if (y < 100) return `${y.toFixed(1)} Jahre`;
            if (y < 1000) return `${(y/100).toFixed(1)} Jahrh.`;
            if (y < 1000000) return `${(y/1000).toFixed(1)} Jtsnd.`;
            
            // Beyond human comprehension
            if (y < 1e9) return `${(y/1e6).toFixed(1)} Mio Jahre`;
            if (y < 1e12) return `${(y/1e9).toFixed(1)} Mrd Jahre`;
            
            return `Unerreichbar`;
        },

        formatScientific(num) {
            if (num === Infinity) return "10^∞";
            if (num < 1000000) return num.toLocaleString('de-DE');
            return num.toExponential(2).replace('e+', ' × 10^');
        },

        // --- ANALYSIS ENGINE ---
        analyzePassword() {
            const pw = this.DOM.inputPw.value;
            if (!pw) {
                this.resetUI();
                return;
            }

            const data = this.calculateEntropy(pw);
            const E = data.entropy;

            // UI: Stats
            this.DOM.statEntropy.textContent = E.toFixed(1);
            this.DOM.statSpace.textContent = this.formatScientific(data.space);

            // Classify Strength (Colors)
            let stateClass = '';
            let label = '';
            let width = Math.min(100, (E / 120) * 100); // 120 bits is Supreme

            if (E < 40) { stateClass = 'weak'; label = 'Kritisch'; }
            else if (E < 60) { stateClass = 'med'; label = 'Schwach'; }
            else if (E < 80) { stateClass = 'good'; label = 'Solide'; }
            else { stateClass = 'sup'; label = 'VGT Supreme'; }

            this.DOM.statusText.textContent = label;
            this.DOM.statusText.className = `meter-status state-${stateClass}`;
            this.DOM.meterFill.className = `meter-fill bg-${stateClass}`;
            this.DOM.meterFill.style.width = `${width}%`;

            // Calculate Classical Times (2^E / HashRate)
            const combs = Math.pow(2, E);
            
            const tMd5_c = combs / this.State.RATES.MD5;
            const tSha_c = combs / this.State.RATES.SHA256;
            const tBcrypt_c = combs / this.State.RATES.BCRYPT;

            this.DOM.timeMd5C.textContent = this.formatTime(tMd5_c);
            this.DOM.timeShaC.textContent = this.formatTime(tSha_c);
            this.DOM.timeBcryptC.textContent = this.formatTime(tBcrypt_c);

            // Calculate Quantum Times (Grover's Algo -> reduces combinations from N to sqrt(N))
            // Comb space drops from 2^E to 2^(E/2)
            const qCombs = Math.pow(2, E / 2);
            
            const tMd5_q = qCombs / this.State.RATES.QUANTUM;
            const tSha_q = qCombs / this.State.RATES.QUANTUM;
            const tBcrypt_q = qCombs / this.State.RATES.QUANTUM;

            this.DOM.timeMd5Q.textContent = this.formatTime(tMd5_q);
            this.DOM.timeShaQ.textContent = this.formatTime(tSha_q);
            this.DOM.timeBcryptQ.textContent = this.formatTime(tBcrypt_q);
        },

        resetUI() {
            this.DOM.statEntropy.textContent = '0';
            this.DOM.statSpace.textContent = '0';
            this.DOM.statusText.textContent = 'Warte auf Input...';
            this.DOM.statusText.className = 'meter-status';
            this.DOM.meterFill.className = 'meter-fill';
            this.DOM.meterFill.style.width = '0%';
            
            const dashes = '--';
            this.DOM.timeMd5C.textContent = dashes; 
            this.DOM.timeMd5Q.textContent = dashes;
            this.DOM.timeShaC.textContent = dashes; 
            this.DOM.timeShaQ.textContent = dashes;
            this.DOM.timeBcryptC.textContent = dashes; 
            this.DOM.timeBcryptQ.textContent = dashes;
        },

        // --- SYNTHESIS ENGINE (Native window.crypto) ---
        generatePassword() {
            const len = parseInt(this.DOM.genLen.value, 10);
            const useUc = this.DOM.genUc.checked;
            const useLc = this.DOM.genLc.checked;
            const useNum = this.DOM.genNum.checked;
            const useSym = this.DOM.genSym.checked;

            if (!useUc && !useLc && !useNum && !useSym) {
                alert("VGT SECURITY ALERT: Bitte wähle mindestens einen Zeichensatz aus.");
                this.DOM.genLc.checked = true;
                return;
            }

            const chars = {
                uc: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                lc: "abcdefghijklmnopqrstuvwxyz",
                num: "0123456789",
                sym: "!@#$%^&*()_+-=[]{}|;:,.<>?"
            };

            let pool = "";
            if (useUc) pool += chars.uc;
            if (useLc) pool += chars.lc;
            if (useNum) pool += chars.num;
            if (useSym) pool += chars.sym;

            let password = "";
            const randomValues = new Uint32Array(len);
            
            // VGT HARDENING: Strict usage of Web Crypto API for cryptographic randomness
            window.crypto.getRandomValues(randomValues);

            for (let i = 0; i < len; i++) {
                password += pool[randomValues[i] % pool.length];
            }

            this.DOM.inputPw.value = password; // Safe value assignment
            this.analyzePassword();
        },

        // --- SYSTEM ACTIONS ---
        copyToClipboard() {
            if(!this.DOM.inputPw.value) return;
            
            this.DOM.inputPw.select();
            document.execCommand('copy');
            
            // XSS Safe Node Replacement for UX Feedback
            this.injectSVG(this.DOM.btnCopy, this.State.svgCopySuccess);

            setTimeout(() => {
                this.safeClearOutput(this.DOM.btnCopy);
                this.State.originalCopyNodes.forEach(node => {
                    this.DOM.btnCopy.appendChild(node.cloneNode(true));
                });
            }, 1500);
        }
    };

    PasswordSentinelEngine.init();
});