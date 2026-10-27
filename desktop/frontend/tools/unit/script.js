/**
 * VGT UNIVERSAL CONVERTER LOGIC (DIAMANT SUPREME)
 * O(1) Matrix Transformation Engine.
 * Handles complex non-linear conversions (Temp) and standard vector multipliers.
 */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    if(!document.getElementById('vgt-unit')) return;

    const DOM = {
        catBtns: document.querySelectorAll('.cat-btn'),
        valFrom: document.getElementById('val-from'),
        valTo: document.getElementById('val-to'),
        selFrom: document.getElementById('sel-from'),
        selTo: document.getElementById('sel-to'),
        btnSwap: document.getElementById('btn-swap'),
        btnCopy: document.getElementById('btn-copy-res'),
        formula: document.getElementById('formula-display')
    };

    // --- Definition der physikalischen Matrizen ---
    // Multiplikatoren relativ zur Base-Unit der jeweiligen Kategorie.
    const units = {
        length: {
            base: 'm',
            items: {
                'm': { name: 'Meter', rate: 1 },
                'km': { name: 'Kilometer', rate: 1000 },
                'cm': { name: 'Zentimeter', rate: 0.01 },
                'mm': { name: 'Millimeter', rate: 0.001 },
                'mi': { name: 'Meilen', rate: 1609.344 },
                'yd': { name: 'Yards', rate: 0.9144 },
                'ft': { name: 'Fuß (ft)', rate: 0.3048 },
                'in': { name: 'Zoll (in)', rate: 0.0254 },
                'nm': { name: 'Seemeilen', rate: 1852 }
            },
            defaultFrom: 'km',
            defaultTo: 'mi'
        },
        mass: {
            base: 'g',
            items: {
                'kg': { name: 'Kilogramm', rate: 1000 },
                'g': { name: 'Gramm', rate: 1 },
                'mg': { name: 'Milligramm', rate: 0.001 },
                't': { name: 'Tonnen', rate: 1000000 },
                'lb': { name: 'Pfund (lbs)', rate: 453.59237 },
                'oz': { name: 'Unzen (oz)', rate: 28.34952 }
            },
            defaultFrom: 'kg',
            defaultTo: 'lb'
        },
        temp: {
            // Temperature uses specific formulas instead of simple rates
            base: 'c',
            items: {
                'c': { name: 'Celsius (°C)' },
                'f': { name: 'Fahrenheit (°F)' },
                'k': { name: 'Kelvin (K)' }
            },
            defaultFrom: 'c',
            defaultTo: 'f'
        },
        data: {
            base: 'b',
            items: {
                'b': { name: 'Bytes (B)', rate: 1 },
                'kb': { name: 'Kilobytes (KB)', rate: 1024 },
                'mb': { name: 'Megabytes (MB)', rate: Math.pow(1024, 2) },
                'gb': { name: 'Gigabytes (GB)', rate: Math.pow(1024, 3) },
                'tb': { name: 'Terabytes (TB)', rate: Math.pow(1024, 4) },
                'pb': { name: 'Petabytes (PB)', rate: Math.pow(1024, 5) }
            },
            defaultFrom: 'gb',
            defaultTo: 'mb'
        },
        speed: {
            base: 'mps',
            items: {
                'kmh': { name: 'km/h', rate: 1/3.6 },
                'mps': { name: 'm/s', rate: 1 },
                'mph': { name: 'mph', rate: 0.44704 },
                'kn': { name: 'Knoten (kn)', rate: 0.514444 }
            },
            defaultFrom: 'kmh',
            defaultTo: 'mph'
        },
        area: {
            base: 'sqm',
            items: {
                'sqkm': { name: 'Quadratkilometer', rate: 1000000 },
                'ha': { name: 'Hektar', rate: 10000 },
                'sqm': { name: 'Quadratmeter', rate: 1 },
                'sqcm': { name: 'Quadratzentimeter', rate: 0.0001 },
                'acre': { name: 'Acres', rate: 4046.85642 },
                'sqft': { name: 'Square Feet', rate: 0.092903 },
                'sqin': { name: 'Square Inches', rate: 0.00064516 }
            },
            defaultFrom: 'sqm',
            defaultTo: 'sqft'
        }
    };

    let activeCat = 'length';

    // --- Boot & Populate ---
    const populateDropdowns = (cat) => {
        const matrix = units[cat];
        let optionsHtml = '';
        
        Object.entries(matrix.items).forEach(([key, val]) => {
            optionsHtml += `<option value="${key}">${val.name}</option>`;
        });

        DOM.selFrom.innerHTML = optionsHtml;
        DOM.selTo.innerHTML = optionsHtml;

        DOM.selFrom.value = matrix.defaultFrom;
        DOM.selTo.value = matrix.defaultTo;
    };

    // --- Math Engine ---
    const calculate = (triggerSource = 'from') => {
        const matrix = units[activeCat];
        const valFrom = parseFloat(DOM.valFrom.value);
        const valTo = parseFloat(DOM.valTo.value);
        const uFrom = DOM.selFrom.value;
        const uTo = DOM.selTo.value;

        // Failsafe empty
        if (triggerSource === 'from' && isNaN(valFrom)) {
            DOM.valTo.value = '';
            DOM.formula.textContent = 'Warte auf Vektor-Input...';
            return;
        }
        if (triggerSource === 'to' && isNaN(valTo)) {
            DOM.valFrom.value = '';
            return;
        }

        let result = 0;
        let formulaText = '';

        // --- TEMPERATURE HANDLING (Non-Linear) ---
        if (activeCat === 'temp') {
            if (triggerSource === 'from') {
                if (uFrom === uTo) { result = valFrom; formulaText = 'x = y'; }
                else if (uFrom === 'c' && uTo === 'f') { result = (valFrom * 9/5) + 32; formulaText = '°C × 9/5 + 32 = °F'; }
                else if (uFrom === 'c' && uTo === 'k') { result = valFrom + 273.15; formulaText = '°C + 273.15 = K'; }
                else if (uFrom === 'f' && uTo === 'c') { result = (valFrom - 32) * 5/9; formulaText = '(°F - 32) × 5/9 = °C'; }
                else if (uFrom === 'f' && uTo === 'k') { result = (valFrom - 32) * 5/9 + 273.15; formulaText = '(°F - 32) × 5/9 + 273.15 = K'; }
                else if (uFrom === 'k' && uTo === 'c') { result = valFrom - 273.15; formulaText = 'K - 273.15 = °C'; }
                else if (uFrom === 'k' && uTo === 'f') { result = (valFrom - 273.15) * 9/5 + 32; formulaText = '(K - 273.15) × 9/5 + 32 = °F'; }
                DOM.valTo.value = formatResult(result);
            } else {
                // Reverse Calculate
                if (uFrom === uTo) { result = valTo; }
                else if (uTo === 'c' && uFrom === 'f') { result = (valTo * 9/5) + 32; }
                else if (uTo === 'c' && uFrom === 'k') { result = valTo + 273.15; }
                else if (uTo === 'f' && uFrom === 'c') { result = (valTo - 32) * 5/9; }
                else if (uTo === 'f' && uFrom === 'k') { result = (valTo - 32) * 5/9 + 273.15; }
                else if (uTo === 'k' && uFrom === 'c') { result = valTo - 273.15; }
                else if (uTo === 'k' && uFrom === 'f') { result = (valTo - 273.15) * 9/5 + 32; }
                DOM.valFrom.value = formatResult(result);
            }
        } 
        // --- STANDARD MULTIPLIER HANDLING ---
        else {
            const rateFrom = matrix.items[uFrom].rate;
            const rateTo = matrix.items[uTo].rate;

            if (triggerSource === 'from') {
                // Convert to base, then to target
                const baseVal = valFrom * rateFrom;
                result = baseVal / rateTo;
                DOM.valTo.value = formatResult(result);
            } else {
                const baseVal = valTo * rateTo;
                result = baseVal / rateFrom;
                DOM.valFrom.value = formatResult(result);
            }

            // Generate Formula Text
            const conversionFactor = rateFrom / rateTo;
            const fromName = matrix.items[uFrom].name;
            const toName = matrix.items[uTo].name;
            
            if (conversionFactor === 1) {
                formulaText = `1 ${fromName} = 1 ${toName}`;
            } else if (conversionFactor > 1) {
                formulaText = `1 ${fromName} = ${formatResult(conversionFactor)} ${toName}`;
            } else {
                formulaText = `1 ${toName} = ${formatResult(1/conversionFactor)} ${fromName}`;
            }
        }

        if (triggerSource === 'from') DOM.formula.textContent = formulaText;
    };

    const formatResult = (num) => {
        // Prevent JS floating point madness (e.g. 0.3000000000004)
        // Limits to max 8 decimal places and removes trailing zeros
        return parseFloat(num.toFixed(8)).toString();
    };

    // --- UI Interactions ---
    DOM.catBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            DOM.catBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            activeCat = e.currentTarget.dataset.cat;
            populateDropdowns(activeCat);
            DOM.valFrom.value = '1';
            calculate('from');
        });
    });

    DOM.valFrom.addEventListener('input', () => calculate('from'));
    DOM.valTo.addEventListener('input', () => calculate('to'));
    DOM.selFrom.addEventListener('change', () => calculate('from'));
    DOM.selTo.addEventListener('change', () => calculate('from'));

    DOM.btnSwap.addEventListener('click', () => {
        // Swap units
        const tempUnit = DOM.selFrom.value;
        DOM.selFrom.value = DOM.selTo.value;
        DOM.selTo.value = tempUnit;
        
        // Swap values
        const tempVal = DOM.valFrom.value;
        DOM.valFrom.value = DOM.valTo.value;
        DOM.valTo.value = tempVal;
        
        // Recalculate to ensure formula updates
        calculate('from');
    });

    DOM.btnCopy.addEventListener('click', () => {
        const val = DOM.valTo.value;
        if (!val) return;
        
        navigator.clipboard.writeText(val).then(() => {
            const orig = DOM.btnCopy.innerHTML;
            DOM.btnCopy.innerHTML = '<svg viewBox="0 0 24 24" style="stroke:rgba(var(--c-orange),1)"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => DOM.btnCopy.innerHTML = orig, 1000);
        });
    });

    // --- Initialization ---
    populateDropdowns(activeCat);
    calculate('from');
});