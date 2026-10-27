/**
 * VGT MEDIACENTER - FORENSIC HEX-MAP LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Strict Rendering & Memory Isolation
 * O(1) Memory Sandbox Architecture via FileReader & ArrayBuffer.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-hexmap')) return;

    const HexMapEngine = {
        DOM: {},
        State: {
            currentFile: null,
            currentBuffer: null, // Uint8Array for current chunk
            CHUNK_SIZE: 4096,    // 4KB per Page to prevent DOM/RAM lagging
            currentOffset: 0,
            
            // Forensic Signatures (Magic Numbers)
            MAGIC_NUMBERS: [
                { hex: '4D5A', type: 'Executable (EXE/DLL)', ext: ['exe', 'dll', 'sys'] },
                { hex: 'FFD8FF', type: 'JPEG Image', ext: ['jpg', 'jpeg'] },
                { hex: '89504E47', type: 'PNG Image', ext: ['png'] },
                { hex: '47494638', type: 'GIF Image', ext: ['gif'] },
                { hex: '25504446', type: 'PDF Document', ext: ['pdf'] },
                { hex: '504B0304', type: 'ZIP Archive (ZIP/DOCX)', ext: ['zip', 'docx', 'xlsx', 'pptx', 'apk', 'jar'] },
                { hex: '52617221', type: 'RAR Archive', ext: ['rar'] },
                { hex: '7B5C727466', type: 'RTF Document', ext: ['rtf'] },
                { hex: '494433', type: 'MP3 Audio', ext: ['mp3'] },
                { hex: 'FFF1', type: 'AAC Audio', ext: ['aac', 'm4a'] },
                { hex: '52494646', type: 'WAV/AVI Media', ext: ['wav', 'avi'] },
                { hex: '7F454C46', type: 'ELF Executable (Linux)', ext: ['elf', 'bin', 'so'] }
            ]
        },

        init() {
            this.cacheDOM();
            this.bindEvents();
            console.log('VGT HEX-MAP: Forensic Binary Sandbox Active.');
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('hm-dropzone'),
                fileInput: document.getElementById('hm-file-input'),
                workspace: document.getElementById('hm-workspace'),
                
                fileName: document.getElementById('hm-filename'),
                fileSize: document.getElementById('hm-filesize'),
                btnReset: document.getElementById('btn-hm-reset'),
                
                cardMagic: document.getElementById('card-magic'),
                badgeMagic: document.getElementById('badge-magic'),
                valMagicHex: document.getElementById('val-magic-hex'),
                valMagicType: document.getElementById('val-magic-type'),
                valMagicExt: document.getElementById('val-magic-ext'),
                magicVerdict: document.getElementById('magic-verdict'),

                valEntropy: document.getElementById('val-entropy'),
                entropyFill: document.getElementById('entropy-fill'),
                entropyDesc: document.getElementById('entropy-desc'),
                
                btnStrings: document.getElementById('btn-hm-strings'),
                modalStrings: document.getElementById('hm-modal-strings'),
                btnCloseStrings: document.getElementById('btn-close-strings'),
                stringsOutput: document.getElementById('hm-strings-output'),
                
                btnPrev: document.getElementById('btn-hex-prev'),
                btnNext: document.getElementById('btn-hex-next'),
                lblOffset: document.getElementById('lbl-offset'),
                hexTbody: document.getElementById('hex-tbody')
            };
        },

        bindEvents() {
            // Reset
            this.DOM.btnReset.addEventListener('click', () => this.resetTool());

            // Ingestion (Dropzone & Input)
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
                if (e.dataTransfer.files.length) this.handleFile(e.dataTransfer.files[0]);
            });
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleFile(e.target.files[0]);
            });

            // Pagination (Hex View)
            this.DOM.btnPrev.addEventListener('click', () => {
                this.State.currentOffset = Math.max(0, this.State.currentOffset - this.State.CHUNK_SIZE);
                this.loadChunk(this.State.currentOffset);
            });
            this.DOM.btnNext.addEventListener('click', () => {
                if (this.State.currentOffset + this.State.CHUNK_SIZE < this.State.currentFile.size) {
                    this.State.currentOffset += this.State.CHUNK_SIZE;
                    this.loadChunk(this.State.currentOffset);
                }
            });

            // Strings Extractor Modal
            this.DOM.btnStrings.addEventListener('click', () => this.extractStrings());
            this.DOM.btnCloseStrings.addEventListener('click', () => {
                this.DOM.modalStrings.classList.add('hidden');
            });
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        formatBytes(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024, sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        padHex(num, length) {
            return num.toString(16).toUpperCase().padStart(length, '0');
        },

        // --- CORE ENGINE ---
        resetTool() {
            this.State.currentFile = null;
            this.State.currentBuffer = null;
            this.State.currentOffset = 0;
            
            this.DOM.fileInput.value = '';
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.cardMagic.className = 'glass-panel analytics-card';
            
            this.safeClearOutput(this.DOM.hexTbody);
            this.DOM.stringsOutput.textContent = '';
        },

        handleFile(file) {
            this.State.currentFile = file;
            this.State.currentOffset = 0;
            
            this.DOM.fileName.textContent = file.name; // textContent = XSS Safe
            this.DOM.fileSize.textContent = this.formatBytes(file.size);
            
            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');

            this.loadChunk(this.State.currentOffset, true);
        },

        loadChunk(offset, isInitial = false) {
            const reader = new FileReader();
            const slice = this.State.currentFile.slice(offset, offset + this.State.CHUNK_SIZE);
            
            reader.onload = (e) => {
                this.State.currentBuffer = new Uint8Array(e.target.result);
                
                if (isInitial) {
                    this.analyzeMagicNumber(this.State.currentBuffer, this.State.currentFile.name);
                }
                
                this.calculateEntropy(this.State.currentBuffer);
                this.renderHexGrid(this.State.currentBuffer, offset);
                
                // Pagination UI
                this.DOM.lblOffset.textContent = `0x${this.padHex(offset, 8)}`;
                this.DOM.btnPrev.disabled = offset === 0;
                this.DOM.btnNext.disabled = offset + this.State.CHUNK_SIZE >= this.State.currentFile.size;
            };

            reader.onerror = () => alert("VGT KERNEL ERROR: Sandbox Memory Access Denied.");
            reader.readAsArrayBuffer(slice);
        },

        analyzeMagicNumber(buffer, filename) {
            if (buffer.length < 8) return; 

            // Extract first 8 bytes as HEX string
            const hexHeader = Array.from(buffer.slice(0, 8))
                .map(b => this.padHex(b, 2))
                .join('');

            this.DOM.valMagicHex.textContent = hexHeader.substring(0, 8) + '...';

            let detectedType = null;
            let detectedExts = [];

            for (let magic of this.State.MAGIC_NUMBERS) {
                if (hexHeader.startsWith(magic.hex)) {
                    detectedType = magic.type;
                    detectedExts = magic.ext;
                    break;
                }
            }

            const actualExt = filename.split('.').pop().toLowerCase();
            this.DOM.valMagicExt.textContent = `.${actualExt}`;
            this.DOM.cardMagic.className = 'glass-panel analytics-card'; // Reset

            if (detectedType) {
                this.DOM.valMagicType.textContent = detectedType;
                
                if (detectedExts.includes(actualExt)) {
                    // VERIFIED
                    this.DOM.badgeMagic.textContent = "VERIFIED";
                    this.DOM.badgeMagic.className = "status-badge badge-safe";
                    this.DOM.magicVerdict.textContent = "Die binäre Signatur stimmt mit der Dateiendung überein.";
                    this.DOM.magicVerdict.className = "card-footer safe";
                } else {
                    // MISMATCH = THREAT
                    this.DOM.badgeMagic.textContent = "CRITICAL THREAT";
                    this.DOM.badgeMagic.className = "status-badge badge-danger";
                    this.DOM.magicVerdict.textContent = `ANOMALIE ERKANNT: Die Datei tarnt sich als .${actualExt}, ist aber binär eine ${detectedType}!`;
                    this.DOM.magicVerdict.className = "card-footer danger";
                    this.DOM.cardMagic.classList.add('threat');
                }
            } else {
                // UNKNOWN
                this.DOM.valMagicType.textContent = "Unbekannte Binärstruktur";
                this.DOM.badgeMagic.textContent = "UNKNOWN";
                this.DOM.badgeMagic.className = "status-badge badge-warn";
                this.DOM.magicVerdict.textContent = "Keine standardisierte Magic-Number erkannt.";
                this.DOM.magicVerdict.className = "card-footer";
            }
        },

        calculateEntropy(buffer) {
            if (buffer.length === 0) return;

            const frequencies = new Array(256).fill(0);
            for (let i = 0; i < buffer.length; i++) {
                frequencies[buffer[i]]++;
            }

            let entropy = 0;
            for (let i = 0; i < 256; i++) {
                if (frequencies[i] > 0) {
                    const p = frequencies[i] / buffer.length;
                    entropy -= p * Math.log2(p);
                }
            }

            // Update UI safely
            this.DOM.valEntropy.textContent = entropy.toFixed(2);
            const pct = (entropy / 8) * 100;
            this.DOM.entropyFill.style.width = `${pct}%`;
            
            if (entropy > 7.5) {
                this.DOM.valEntropy.style.color = 'rgba(var(--c-pink), 1)';
                this.DOM.entropyFill.style.backgroundColor = 'rgba(var(--c-pink), 1)';
                this.DOM.entropyFill.style.boxShadow = '0 0 10px rgba(var(--c-pink), 0.5)';
                this.DOM.entropyDesc.textContent = "Extrem hoch. Vermutlich verschlüsselt (Ransomware?) oder komprimiert (Archiv).";
            } else if (entropy < 4.0) {
                this.DOM.valEntropy.style.color = 'rgba(var(--c-green), 1)';
                this.DOM.entropyFill.style.backgroundColor = 'rgba(var(--c-green), 1)';
                this.DOM.entropyFill.style.boxShadow = '0 0 10px rgba(var(--c-green), 0.5)';
                this.DOM.entropyDesc.textContent = "Niedrig. Klartext, unkomprimierte Bitmaps oder stark redundante Daten.";
            } else {
                this.DOM.valEntropy.style.color = 'rgba(var(--c-cyan), 1)';
                this.DOM.entropyFill.style.backgroundColor = 'rgba(var(--c-cyan), 1)';
                this.DOM.entropyFill.style.boxShadow = '0 0 10px rgba(var(--c-cyan), 0.5)';
                this.DOM.entropyDesc.textContent = "Moderat. Standard Programm-Code oder proprietäre Formate.";
            }
        },

        renderHexGrid(buffer, startOffset) {
            const frag = document.createDocumentFragment();
            const rows = Math.ceil(buffer.length / 16);

            for (let i = 0; i < rows; i++) {
                const rowOffset = startOffset + (i * 16);
                const slice = buffer.slice(i * 16, i * 16 + 16);
                
                const tr = document.createElement('tr');

                // Column 1: Offset
                const tdOffset = document.createElement('td');
                tdOffset.className = 'col-offset';
                tdOffset.textContent = this.padHex(rowOffset, 8);
                tr.appendChild(tdOffset);

                // Column 2: HEX Matrix
                const tdHex = document.createElement('td');
                tdHex.className = 'col-hex';
                
                // Column 3: ASCII Representation
                const tdAscii = document.createElement('td');
                tdAscii.className = 'col-ascii';
                
                let asciiStr = '';

                for (let j = 0; j < 16; j++) {
                    const spanHex = document.createElement('span');
                    
                    if (j < slice.length) {
                        const byte = slice[j];
                        spanHex.textContent = this.padHex(byte, 2) + ' ';

                        if (byte === 0) spanHex.className = 'byte-null';
                        else if (byte >= 32 && byte <= 126) spanHex.className = 'byte-print';
                        else if (byte > 127) spanHex.className = 'byte-high';

                        // ASCII Parsing
                        if (byte >= 32 && byte <= 126) {
                            asciiStr += String.fromCharCode(byte);
                        } else {
                            asciiStr += '.';
                        }
                    } else {
                        spanHex.textContent = '   '; // Padding for empty bytes
                    }
                    tdHex.appendChild(spanHex);
                }

                tdAscii.textContent = asciiStr; // textContent renders <, > safely without HTML execution
                
                tr.appendChild(tdHex);
                tr.appendChild(tdAscii);
                frag.appendChild(tr);
            }

            // VGT HARDENING: Native DOM Update (No innerHTML string parsing)
            this.safeClearOutput(this.DOM.hexTbody);
            this.DOM.hexTbody.appendChild(frag);
        },

        extractStrings() {
            if (!this.State.currentBuffer) return;
            
            let extracted = '';
            let currentString = '';
            const MIN_LENGTH = 4;

            // XSS Safe Extraction Loop
            for (let i = 0; i < this.State.currentBuffer.length; i++) {
                const byte = this.State.currentBuffer[i];
                if (byte >= 32 && byte <= 126) {
                    currentString += String.fromCharCode(byte);
                } else {
                    if (currentString.length >= MIN_LENGTH) {
                        extracted += currentString + '\n';
                    }
                    currentString = '';
                }
            }
            if (currentString.length >= MIN_LENGTH) {
                extracted += currentString + '\n';
            }

            // VGT DOM HARDENING: Strict textContent assign. Prevents RCE via UI.
            this.DOM.stringsOutput.textContent = extracted || '// Keine verwertbaren ASCII-Strings im aktuellen Datenblock gefunden.';
            this.DOM.modalStrings.classList.remove('hidden');
        }
    };

    HexMapEngine.init();
});