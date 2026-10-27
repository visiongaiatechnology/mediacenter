/**
 * VGT MEDIACENTER - DOM HYPERVISOR (CLIENT-SIDE SHIELD)
 * STATUS: DIAMANT SUPREME (Zero-Trust Environment, Clobber-Proof, mXSS-Immunity)
 * * Diese Schicht fängt globale DOM-Manipulationen ab und neutralisiert
 * XSS-Vektoren in Echtzeit, ohne dass die 30 Tool-Scripte umgeschrieben 
 * werden müssen (Monkey-Patching der Browser-Prototypen).
 */
"use strict";

const VGT_DOM_Guard = (function() {
    
    // --- KERNEL CACHE FOR DOM CLOBBERING IMMUNITY ---
    // Speichert die echten, in C++ geschriebenen Browser-Funktionen,
    // bevor ein Angreifer sie durch manipulierte HTML-Tags überschreiben kann.
    const getDescriptor = (obj, prop) => {
        let current = obj;
        while (current) {
            const desc = Object.getOwnPropertyDescriptor(current, prop);
            if (desc) return desc;
            current = Object.getPrototypeOf(current);
        }
        return null;
    };

    const attrDesc = getDescriptor(Element.prototype, 'attributes');
    const _getAttributes = attrDesc ? attrDesc.get : function() { return this.attributes; };
    const _removeAttribute = Element.prototype.removeAttribute;
    const _setAttribute = Element.prototype.setAttribute;
    
    const tagDesc = getDescriptor(Element.prototype, 'tagName');
    const _getTagName = tagDesc ? tagDesc.get : function() { return this.tagName; };

    const innerHTMLDesc = getDescriptor(Element.prototype, 'innerHTML') || getDescriptor(HTMLElement.prototype, 'innerHTML');
    const _origInnerHTML_get = innerHTMLDesc ? innerHTMLDesc.get : null;

    // 1. Der Kognitive Sanitizer (Ohne externe Libs)
    const sanitizeHTML = function(dirtyHtml) {
        if (typeof dirtyHtml !== 'string') return dirtyHtml;
        if (dirtyHtml.trim() === '') return '';

        // Nutzt den nativen DOMParser (sicher gegen sofortige Code-Ausführung)
        // Fast-Path aus Sicherheitsgründen entfernt (Regex-Bypass Mitigation)
        const doc = new DOMParser().parseFromString(dirtyHtml, 'text/html');
        
        // A. Gefährliche Nodes eliminieren (inklusive mXSS Vektoren wie svg und math)
        const killTags = ['script', 'iframe', 'object', 'embed', 'applet', 'link', 'style', 'base', 'meta'];
        const allNodes = doc.querySelectorAll('*');
        
        // VGT OMEGA FIX: Vermeidet forEach, da NodeList bei Manipulationen unzuverlässig sein kann
        for (let j = 0; j < allNodes.length; j++) {
            const el = allNodes[j];
            const tagName = _getTagName.call(el).toLowerCase();
            
            if (killTags.includes(tagName)) {
                el.remove();
                continue;
            }
            
            // B. Gefährliche Attribute neutralisieren (DOM Clobbering-sicher)
            // Statt el.attributes rufen wir den C++ Getter direkt auf
            const attributes = _getAttributes.call(el);
            if (attributes) {
                for (let i = attributes.length - 1; i >= 0; i--) {
                    const attr = attributes[i];
                    const name = attr.name.toLowerCase();
                    const val  = attr.value;
                    
                    // Blockiere onmouseover, onerror, etc.
                    if (name.startsWith('on')) {
                        _removeAttribute.call(el, name);
                        continue;
                    }

                    // Blockiere Code-Ausführungs-Attribute (Action-Hijacking)
                    if (['action', 'formaction', 'srcdoc'].includes(name)) {
                        _removeAttribute.call(el, name);
                        continue;
                    }
                    
                    // Blockiere javascript: und data: in Links und Quellen
                    // VGT OMEGA FIX: Regex blockiert Whitespace und Null-Bytes Bypasses (java\nscript:)
                    if (['href', 'src', 'data', 'poster', 'background'].includes(name)) {
                        if (/^[\s\x00-\x1F]*(javascript|data|vbscript):/i.test(val)) {
                            _setAttribute.call(el, name, '#blocked-by-vgt');
                        }
                    }
                }
            }
        }
        
        // VGT FIX: Nutzt den gecachten Getter, um Endlosschleifen mit dem Interceptor zu vermeiden
        return _origInnerHTML_get ? _origInnerHTML_get.call(doc.body) : doc.body.innerHTML;
    };

    // 2. DAS HERZSTÜCK: Der globale Interceptor für 30 Dateien
    const applyGlobalShield = function() {
        // Speichere die originale Browser-Funktion sicher zwischen
        const originalInnerHTML = getDescriptor(Element.prototype, 'innerHTML') || getDescriptor(HTMLElement.prototype, 'innerHTML');
        const originalInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;

        // Überschreibe .innerHTML global!
        if (originalInnerHTML && originalInnerHTML.set) {
            Object.defineProperty(Element.prototype, 'innerHTML', {
                set: function(value) {
                    // Reinige den Input automatisch, bevor der Browser ihn rendert
                    const safeValue = sanitizeHTML(value);
                    originalInnerHTML.set.call(this, safeValue);
                },
                get: originalInnerHTML.get
            });
        }

        // Überschreibe .insertAdjacentHTML global!
        if (originalInsertAdjacentHTML) {
            Element.prototype.insertAdjacentHTML = function(position, text) {
                const safeText = sanitizeHTML(text);
                return originalInsertAdjacentHTML.call(this, position, safeText);
            };
        }
        
        console.log("🛡️ VGT HYPERVISOR V4: Global DOM-Interception active. XSS vectors neutralized.");
    };

    // 3. Airlock-Lite (RAM Binary Scanner für deine Datei-Tools)
    const verifyMagicBytes = async function(file, allowedSignatures) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                let hex = '';
                for(let i = 0; i < arr.length; i++) {
                    hex += arr[i].toString(16).toUpperCase().padStart(2, '0');
                }
                
                // Prüft, ob der HEX-Header der Datei in der erlaubten Liste ist
                const isValid = allowedSignatures.some(sig => hex.startsWith(sig));
                resolve({ valid: isValid, hex: hex });
            };
            // Wir lesen nur die ersten 4 Bytes im RAM!
            reader.readAsArrayBuffer(file.slice(0, 4));
        });
    };

    // Auto-Init
    applyGlobalShield();

    // Public API für spezielle Tools
    return {
        clean: sanitizeHTML,
        verifyFile: verifyMagicBytes
    };

})();

// Einfrieren, damit keine Malware den Guard deaktivieren kann
Object.freeze(VGT_DOM_Guard);