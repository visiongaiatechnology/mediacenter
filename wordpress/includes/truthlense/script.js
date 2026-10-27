/**
 * VGT MEDIACENTER - TRUTHLENSE LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Strict Rendering & Architecture Encapsulation
 * High-Performance Diff-Engine Wrapper for diff.js
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-truthlense')) return;

    const TruthlenseEngine = {
        DOM: {},
        State: {
            currentMode: 'lines', // 'lines', 'words', 'chars'
            debounceTimer: null,
            MAX_FILE_SIZE: 2097152 // 2MB Limit zur RAM-Sicherung
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                inputOrig: document.getElementById('tl-input-original'),
                inputMod:  document.getElementById('tl-input-modified'),
                outputBox: document.getElementById('tl-output-content'),
                toggles:   document.querySelectorAll('.tl-toggle'),
                btnClear:  document.getElementById('tl-btn-clear'),
                fileOrig:  document.getElementById('tl-file-original'),
                fileMod:   document.getElementById('tl-file-modified'),
                statDel:   document.getElementById('stat-del'),
                statAdd:   document.getElementById('stat-add')
            };
        },

        waitForDependencies() {
            // Warten auf die externe Diff Bibliothek (via SRI im Core geladen)
            const ensureDiffLoaded = setInterval(() => {
                if (typeof Diff !== 'undefined') {
                    clearInterval(ensureDiffLoaded);
                    this.bindEvents();
                    console.log('VGT TRUTHLENSE: Forensic Diff Engine Active & Secured.');
                }
            }, 100);
        },

        bindEvents() {
            // Debounced Input (Verhindert Thread-Locking bei extrem großen Texten)
            const handleInput = () => {
                clearTimeout(this.State.debounceTimer);
                this.State.debounceTimer = setTimeout(() => this.performAnalysis(), 300);
            };

            this.DOM.inputOrig.addEventListener('input', handleInput);
            this.DOM.inputMod.addEventListener('input', handleInput);

            // Mode Toggles (Zeilen, Wörter, Zeichen)
            this.DOM.toggles.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.DOM.toggles.forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                    this.State.currentMode = e.currentTarget.getAttribute('data-mode');
                    this.performAnalysis(); // Re-trigger
                });
            });

            // UI Actions
            this.DOM.btnClear.addEventListener('click', () => {
                this.DOM.inputOrig.value = '';
                this.DOM.inputMod.value = '';
                this.performAnalysis();
            });

            // File Upload Handlers
            this.DOM.fileOrig.addEventListener('change', (e) => this.handleFileUpload(e.target, this.DOM.inputOrig));
            this.DOM.fileMod.addEventListener('change',  (e) => this.handleFileUpload(e.target, this.DOM.inputMod));
        },

        // --- SAFE DOM MANIPULATION ---
        safeClearOutput() {
            // Löscht alle Child-Nodes effizient und RAM-schonend (vermeidet .innerHTML = '')
            while (this.DOM.outputBox.firstChild) {
                this.DOM.outputBox.removeChild(this.DOM.outputBox.firstChild);
            }
        },

        renderMessage(text, isError = false) {
            this.safeClearOutput();
            const div = document.createElement('div');
            
            // VGT HARDENING: Native textContent Injektion
            div.textContent = text; 
            
            if (isError) {
                div.style.color = 'rgba(var(--c-pink), 1)';
                div.style.fontWeight = 'bold';
            } else {
                div.className = 'tl-placeholder-text';
            }
            
            this.DOM.outputBox.appendChild(div);
        },

        // --- CORE ANALYSIS ENGINE ---
        performAnalysis() {
            // Textarea Werte sind per default sicher vor XSS-Ausführung
            const textA = this.DOM.inputOrig.value;
            const textB = this.DOM.inputMod.value;

            // Empty state check
            if (!textA && !textB) {
                this.renderMessage('Warte auf Dateneingabe für die Anomalie-Erkennung...');
                this.updateStats(0, 0);
                return;
            }

            let diffResult;
            try {
                if (this.State.currentMode === 'words') {
                    diffResult = Diff.diffWords(textA, textB);
                } else if (this.State.currentMode === 'chars') {
                    diffResult = Diff.diffChars(textA, textB);
                } else {
                    diffResult = Diff.diffLines(textA, textB);
                }
            } catch (e) {
                console.error("VGT DIFF ERROR:", e);
                this.renderMessage('Systemfehler bei der Diff-Berechnung. Limit oder Speicherkapazität überschritten.', true);
                return;
            }

            this.renderDiff(diffResult);
        },

        renderDiff(diffArray) {
            const fragment = document.createDocumentFragment();
            let countAdded = 0;
            let countRemoved = 0;

            diffArray.forEach(part => {
                const span = document.createElement('span');
                
                // VGT DOM HARDENING: Verhindert XSS Execution durch strikte Text-Evaluation
                span.textContent = part.value;

                if (part.added) {
                    span.className = this.State.currentMode === 'lines' ? 'diff-line diff-added' : 'diff-added';
                    countAdded += this.State.currentMode === 'lines' ? part.count : part.value.trim().split(/\s+/).length;
                } else if (part.removed) {
                    span.className = this.State.currentMode === 'lines' ? 'diff-line diff-removed' : 'diff-removed';
                    countRemoved += this.State.currentMode === 'lines' ? part.count : part.value.trim().split(/\s+/).length;
                } else {
                    span.className = this.State.currentMode === 'lines' ? 'diff-line diff-unchanged' : 'diff-unchanged';
                }

                fragment.appendChild(span);
            });

            // Update DOM
            this.safeClearOutput();
            this.DOM.outputBox.appendChild(fragment);

            this.updateStats(countRemoved, countAdded);
        },

        updateStats(del, add) {
            this.DOM.statDel.textContent = del;
            this.DOM.statAdd.textContent = add;
            
            // Visual Pop Animation
            if (del > 0) {
                this.DOM.statDel.parentElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    if (this.DOM.statDel.parentElement) this.DOM.statDel.parentElement.style.transform = 'scale(1)';
                }, 200);
            }
            if (add > 0) {
                this.DOM.statAdd.parentElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    if (this.DOM.statAdd.parentElement) this.DOM.statAdd.parentElement.style.transform = 'scale(1)';
                }, 200);
            }
        },

        handleFileUpload(fileInput, targetTextarea) {
            const file = fileInput.files[0];
            if (!file) return;

            // Memory Crash Prevention
            if (file.size > this.State.MAX_FILE_SIZE) {
                alert('VGT SECURITY GUARD: Truthlense ist für eine RAM-schonende Analyse auf Dateien < 2MB optimiert. Größere Datensätze können Browser-Instabilitäten auslösen.');
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                targetTextarea.value = e.target.result; // Textarea value binding ist XSS safe
                this.performAnalysis();
            };
            reader.onerror = () => {
                alert("VGT ERROR: Systemfehler beim Lesen der Datei. Möglicherweise korrupt oder gesperrt.");
            };
            reader.readAsText(file);
            
            // Reset input, allowing same file re-selection
            fileInput.value = ''; 
        }
    };

    TruthlenseEngine.init();
});