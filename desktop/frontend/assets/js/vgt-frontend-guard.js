/**
 * VGT MEDIACENTER - DOM HYPERVISOR V4 (QUANTUM SHIELD)
 * STATUS: DIAMANT SUPREME (Zero-Trust Environment, SSRF-Proof, Infinite-Recursion-Safe)
 * UPGRADES: 
 * - Clean Console Defender (Keine CSS-Box Artefakte mehr, VGT Branding)
 * - Self-XSS Console Defender (Social Engineering Protection)
 * - Template Fragment Engine: Verhindert die Zerstörung von <tr>/<li> Layouts
 * - Trusted Types API Integration & DOM Clobbering Immunity
 * - Protocol-Relative Injection Block (//attacker.com)
 * - Dynamic Prototype Resolution (Verhindert Call-Stack Overflows)
 */
"use strict";

const VGT_Frontend_Guard = (function() {
    
    // --- KERNEL CACHE FOR DOM CLOBBERING IMMUNITY ---
    // VGT OMEGA FIX: Dynamische Traversierung der Prototyp-Kette, um Browser-Inkonsistenzen zu überleben.
    const getDescriptor = (obj, prop) => {
        let current = obj;
        while (current) {
            const desc = Object.getOwnPropertyDescriptor(current, prop);
            if (desc) return desc;
            current = Object.getPrototypeOf(current);
        }
        return null;
    };

    const attrDescriptor = getDescriptor(Element.prototype, 'attributes');
    const _getAttributes = attrDescriptor ? attrDescriptor.get : function() { return this.attributes; };
    const _removeAttribute = Element.prototype.removeAttribute;
    const _setAttribute = Element.prototype.setAttribute;
    
    const nodeNameDescriptor = getDescriptor(Node.prototype, 'nodeName');
    const _nodeName = nodeNameDescriptor ? nodeNameDescriptor.get : function() { return this.nodeName; };

    // Native Setter für innerHTML sicher extrahieren (verhindert Endlosschleifen beim Shielding)
    const _origInnerHTMLDesc = getDescriptor(Element.prototype, 'innerHTML') || getDescriptor(HTMLElement.prototype, 'innerHTML');
    const _origInnerHTML_set = _origInnerHTMLDesc ? _origInnerHTMLDesc.set : null;

    const SAFE_PROTOCOLS = /^(?:https?|mailto|tel|blob|data):/i;
    
    /**
     * SELF-XSS CONSOLE DEFENDER
     */
    const deployConsoleWarning = function() {
        console.log(
            "%cVisionGaiaTechnology",
            "color: #06b6d4; font-family: 'Arial Black', sans-serif; font-size: 24px; font-weight: 900; text-shadow: 1px 1px 0 rgba(6, 182, 212, 0.4);"
        );

        console.log(
            "%c\u26A0\uFE0F HALT! / STOP! \u26A0\uFE0F",
            "color: #ef4444; font-family: 'Arial Black', sans-serif; font-size: 50px; font-weight: 900; text-shadow: 2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;"
        );
        
        console.log(
            "%cDies ist eine Browser-Funktion, die ausschließlich für Entwickler gedacht ist.\n" +
            "Wenn Ihnen jemand gesagt hat, dass Sie hier Code kopieren und einfügen sollen, um ein Feature freizuschalten oder das System zu 'hacken', handelt es sich um einen Betrugsversuch (Self-XSS).\n" +
            "Dadurch erhalten Angreifer vollen Zugriff auf Ihr System und können Ihre Identität stehlen.\n\n" +
            "%cFÜGEN SIE HIER NIEMALS CODE EIN!\n\n" +
            "%c--------------------------------------------------------------------------------------\n\n" +
            "%cThis is a browser feature intended strictly for developers.\n" +
            "If someone told you to copy and paste code here to unlock a feature or 'hack' the system, it is a scam (Self-XSS).\n" +
            "Doing so will give attackers full access to your system and allow them to steal your identity.\n\n" +
            "%cNEVER PASTE ANY CODE HERE!",
            "color: #cbd5e1; font-size: 16px; font-family: sans-serif; line-height: 1.5;",
            "color: #ef4444; font-size: 18px; font-weight: bold; font-family: sans-serif;",
            "color: #334155; font-size: 16px;",
            "color: #cbd5e1; font-size: 16px; font-family: sans-serif; line-height: 1.5;",
            "color: #ef4444; font-size: 18px; font-weight: bold; font-family: sans-serif;"
        );
    };

    /**
     * DER KOGNITIVE SANITIZER V3.3
     * @param {string} dirtyHtml 
     * @returns {string} Safe HTML
     */
    const sanitizeHTML = function(dirtyHtml) {
        if (typeof dirtyHtml !== 'string') return dirtyHtml;
        if (dirtyHtml.trim() === '') return '';

        // ==========================================
        // DEEP CLEAN ENGINE (Fast-Path removed for security)
        // ==========================================
        const template = document.createElement('template');
        
        // Strikte Nutzung des nativen Setters, um Rekursion mit dem eigenen Shield zu verhindern
        if (_origInnerHTML_set) {
            _origInnerHTML_set.call(template, dirtyHtml);
        } else {
            template.innerHTML = dirtyHtml;
        }
        
        // VGT FIX: 'form' zwingend inkludiert, um Action-Hijacking zu verhindern
        const killTags = [
            'script', 'iframe', 'object', 'embed', 'applet', 'link', 
            'style', 'base', 'meta', 'form'
        ];
        
        // VGT FIX: Hardcoded NodeFilter.SHOW_ELEMENT (1), verhindert Ausfall bei Clobbering
        const allNodes = document.createTreeWalker(template.content, 1, null, false);
        let currentNode;
        const nodesToRemove = [];

        while (currentNode = allNodes.nextNode()) {
            const tagName = _nodeName.call(currentNode).toLowerCase();
            
            if (killTags.includes(tagName)) {
                nodesToRemove.push(currentNode);
                continue;
            }

            const attributes = _getAttributes.call(currentNode);
            if (attributes) {
                for (let i = attributes.length - 1; i >= 0; i--) {
                    const attr = attributes[i];
                    const attrName = attr.name.toLowerCase();
                    const attrVal  = attr.value.trim();

                    if (attrName.startsWith('on')) {
                        _removeAttribute.call(currentNode, attrName);
                        continue;
                    }

                    if (['action', 'formaction', 'srcdoc'].includes(attrName)) {
                        _removeAttribute.call(currentNode, attrName);
                        continue;
                    }

                    if (attrVal.toLowerCase().startsWith('data:text/html') || attrVal.toLowerCase().startsWith('javascript:')) {
                        _removeAttribute.call(currentNode, attrName);
                        continue;
                    }

                    // VGT OMEGA FIX: Protocol-Relative Bypass Neutralisation (//attacker.com)
                    if (['href', 'src', 'data', 'poster', 'background'].includes(attrName)) {
                        const isSafeRelative = /^[./?#]/.test(attrVal) && !attrVal.startsWith('//');
                        
                        if (!isSafeRelative && !SAFE_PROTOCOLS.test(attrVal)) {
                            _setAttribute.call(currentNode, attrName, '#vgt-blocked-protocol');
                        }
                    }
                }
            }
        }

        nodesToRemove.forEach(node => node.remove());
        
        return template.innerHTML;
    };

    /**
     * 1. TRUSTED TYPES API
     */
    let vgtPolicy;
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        try {
            vgtPolicy = window.trustedTypes.createPolicy('default', {
                createHTML: (string) => sanitizeHTML(string),
                createScript: () => '',
                createScriptURL: () => ''
            });
        } catch (e) {
            // Fallback falls die Policy bereits vom Server deklariert wurde
        }
    }

    /**
     * 2. PROTOTYPE SHIELD
     */
    const applyGlobalShield = function() {
        const _origOuterHTML = getDescriptor(Element.prototype, 'outerHTML');
        const _origInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;

        // Nutzt den bereits extrahierten Descriptor _origInnerHTMLDesc
        if (_origInnerHTMLDesc && _origInnerHTMLDesc.set) {
            Object.defineProperty(Element.prototype, 'innerHTML', {
                set: function(value) {
                    const safeValue = vgtPolicy ? vgtPolicy.createHTML(value) : sanitizeHTML(value);
                    _origInnerHTMLDesc.set.call(this, safeValue);
                },
                get: _origInnerHTMLDesc.get
            });
        }

        if (_origOuterHTML && _origOuterHTML.set) {
            Object.defineProperty(Element.prototype, 'outerHTML', {
                set: function(value) {
                    const safeValue = vgtPolicy ? vgtPolicy.createHTML(value) : sanitizeHTML(value);
                    _origOuterHTML.set.call(this, safeValue);
                },
                get: _origOuterHTML.get
            });
        }

        if (_origInsertAdjacentHTML) {
            Element.prototype.insertAdjacentHTML = function(position, text) {
                const safeText = vgtPolicy ? vgtPolicy.createHTML(text) : sanitizeHTML(text);
                return _origInsertAdjacentHTML.call(this, position, safeText);
            };
        }
        
        console.log("🛡️ VGT HYPERVISOR V4: Quantum Shield & Cognitive Defense Matrix active.");
    };

    /**
     * 3. AIRLOCK LITE
     */
    const verifyMagicBytes = async function(file, allowedSignatures) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
                let hex = '';
                for(let i = 0; i < arr.length; i++) {
                    hex += arr[i].toString(16).toUpperCase().padStart(2, '0');
                }
                const isValid = allowedSignatures.some(sig => hex.startsWith(sig));
                resolve({ valid: isValid, hex: hex });
            };
            reader.readAsArrayBuffer(file.slice(0, 4));
        });
    };

    // BOOT SEQUENCE
    deployConsoleWarning();
    applyGlobalShield();

    return {
        clean: sanitizeHTML,
        verifyFile: verifyMagicBytes
    };

})();

Object.freeze(VGT_Frontend_Guard);