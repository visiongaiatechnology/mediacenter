/**
 * VGT MEDIACENTER - ATMOSPHERIC RADAR LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention (API Poisoning), Native Rendering & Object Isolation
 * Utilizes Open-Meteo API (No-Tracking) and Leaflet.js.
 * Handles Geolocation, Map Rendering, and WMO Weather Code Translation natively.
 * VGT UPDATE: Routed Map-Tiles & API calls through local PHP Proxy to bypass COEP and anonymize User IP.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-weather')) return;

    const AtmosphericRadarEngine = {
        DOM: {},
        State: {
            map: null,
            marker: null,
            searchTimeout: null,
            
            // Dynamische Proxy-Basis URL ermitteln (Berücksichtigt Permalinks & URL-Parameter)
            getProxyUrl() {
                const baseUrl = (typeof vgtCore !== 'undefined' && vgtCore.baseUrl) ? vgtCore.baseUrl : window.location.pathname;
                const connector = baseUrl.includes('?') ? '&' : '?';
                return `${baseUrl}${connector}vgt_tool=weather&vgt_weather_proxy=`;
            },
            
            // WMO Weather Lore Dictionary (WMO Codes -> SVG Vektoren)
            wmoMap: {
                0:  { desc: 'Klarer Himmel', icon: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M5 5l1.5 1.5"></path><path d="M17.5 17.5L19 19"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M5 19l1.5-1.5"></path><path d="M17.5 6.5L19 5"></path>' },
                1:  { desc: 'Überwiegend Klar', icon: '<path d="M17 18a5 5 0 0 0-10 0"></path><line x1="12" y1="2" x2="12" y2="4"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>' },
                2:  { desc: 'Leicht Bewölkt', icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>' },
                3:  { desc: 'Stark Bewölkt', icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>' },
                45: { desc: 'Nebel', icon: '<line x1="8" y1="19" x2="16" y2="19"></line><line x1="8" y1="23" x2="16" y2="23"></line><line x1="8" y1="15" x2="16" y2="15"></line><path d="M17.5 11H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>' },
                48: { desc: 'Raureifnebel', icon: '<line x1="8" y1="19" x2="16" y2="19"></line><line x1="8" y1="23" x2="16" y2="23"></line><line x1="8" y1="15" x2="16" y2="15"></line><path d="M17.5 11H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>' },
                51: { desc: 'Leichter Nieselregen', icon: '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="21" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>' },
                53: { desc: 'Mäßiger Nieselregen', icon: '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="21" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>' },
                55: { desc: 'Dichter Nieselregen', icon: '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="21" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>' },
                61: { desc: 'Leichter Regen', icon: '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="21" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>' },
                63: { desc: 'Mäßiger Regen', icon: '<line x1="8" y1="19" x2="8" y2="21"></line><line x1="16" y1="19" x2="16" y2="21"></line><line x1="12" y1="21" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>' },
                65: { desc: 'Starker Regen', icon: '<line x1="16" y1="13" x2="16" y2="21"></line><line x1="8" y1="13" x2="8" y2="21"></line><line x1="12" y1="15" x2="12" y2="23"></line><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>' },
                71: { desc: 'Leichter Schneefall', icon: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>' },
                73: { desc: 'Mäßiger Schneefall', icon: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>' },
                75: { desc: 'Starker Schneefall', icon: '<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="8" y1="20" x2="8.01" y2="20"></line><line x1="12" y1="18" x2="12.01" y2="18"></line><line x1="12" y1="22" x2="12.01" y2="22"></line><line x1="16" y1="16" x2="16.01" y2="16"></line><line x1="16" y1="20" x2="16.01" y2="20"></line>' },
                95: { desc: 'Gewitter', icon: '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>' },
                96: { desc: 'Gewitter mit Hagel', icon: '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>' },
                99: { desc: 'Schweres Gewitter', icon: '<path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path><polyline points="13 11 9 17 15 17 11 23"></polyline>' }
            }
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                statusText: document.getElementById('ar-status-text'),
                statusBadge: document.getElementById('ar-sync-status'),
                searchInput: document.getElementById('ar-search-input'),
                btnGeolocate: document.getElementById('btn-geolocate'),
                searchResults: document.getElementById('ar-search-results'),
                
                mapLoader: document.getElementById('ar-map-loader'),
                valCoords: document.getElementById('val-coords'),
                valElevation: document.getElementById('val-elevation'),
                
                cwIcon: document.getElementById('cw-icon'),
                cwLocation: document.getElementById('cw-location'),
                cwTemp: document.getElementById('cw-temp'),
                cwDesc: document.getElementById('cw-desc'),
                
                metHumidity: document.getElementById('met-humidity'),
                metWind: document.getElementById('met-wind'),
                metPressure: document.getElementById('met-pressure'),
                metUV: document.getElementById('met-uv'),
                
                aqiBadge: document.getElementById('aqi-badge'),
                aqiStatusText: document.getElementById('aqi-status-text'),
                aqiPm25: document.getElementById('aqi-pm25'),
                aqiPm10: document.getElementById('aqi-pm10'),
                aqiNo2: document.getElementById('aqi-no2'),
                
                forecastContainer: document.getElementById('forecast-container')
            };
        },

        waitForDependencies() {
            // Await Leaflet (Loaded via Core SRI)
            const ensureLibLoaded = setInterval(() => {
                if (typeof L !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    // Initial Boot (Cologne Fallback)
                    this.fetchTelemetry(50.9375, 6.9603, "Köln");
                    console.log('VGT RADAR: Geolocation Engine Active (IP-Masked Proxy Mode).');
                }
            }, 100);
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            if (!element) return;
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString) {
            if (!element) return;
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(`<svg viewBox="0 0 24 24">${svgString}</svg>`, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) {
                element.appendChild(svgNode);
            }
        },

        getWmoData(code) {
            return this.State.wmoMap[code] || { desc: 'Unbekanntes Muster', icon: this.State.wmoMap[0].icon };
        },

        // --- MAP ENGINE (Leaflet Dark Matter + VGT Proxy) ---
        initMap(lat, lng) {
            if (this.State.map) {
                this.State.map.setView([lat, lng], 10);
                if (this.State.marker) this.State.marker.setLatLng([lat, lng]);
                return;
            }

            this.State.map = L.map('ar-map', { zoomControl: false, attributionControl: false }).setView([lat, lng], 10);
            
            // VGT OMEGA UPGRADE: COEP-Bypass & Anonymisierungs-Proxy
            // Der Browser lädt nicht mehr direkt von OpenStreetMap, sondern schickt den Request
            // durch unsere lokale PHP-Pipeline (index.php?vgt_weather_proxy=tile). 
            // Resultat: Kein IP-Leak der Nutzer an OSM & COEP/CORS-Kompatibilität!
            
            const tileProxyUrl = this.State.getProxyUrl() + 'tile&z={z}&x={x}&y={y}';

            L.tileLayer(tileProxyUrl, {
                maxZoom: 19,
                className: 'vgt-dark-tiles' // CSS inverts this to match Dark Mode
            }).addTo(this.State.map);

            const vgtIcon = L.divIcon({
                className: 'custom-vgt-marker',
                html: `<svg viewBox="0 0 24 24" style="width:2rem;height:2rem;stroke:rgba(34, 211, 238, 1);fill:rgba(10,10,18,0.8);stroke-width:2;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });

            this.State.marker = L.marker([lat, lng], {icon: vgtIcon}).addTo(this.State.map);
            if (this.DOM.mapLoader) this.DOM.mapLoader.classList.add('hidden');
        },

        setStatus(msg, isError = false) {
            if (!this.DOM.statusText) return;
            this.DOM.statusText.textContent = msg; // XSS Safe
            
            if (isError) {
                this.DOM.statusBadge.classList.add('error');
            } else {
                this.DOM.statusBadge.classList.remove('error');
            }
        },

        evaluateAQI(aqi) {
            if (aqi <= 20) return { text: 'AQI: Sehr Gut', class: 'aqi-good' };
            if (aqi <= 40) return { text: 'AQI: Gut', class: 'aqi-fair' };
            if (aqi <= 60) return { text: 'AQI: Mäßig', class: 'aqi-moderate' };
            if (aqi <= 80) return { text: 'AQI: Schlecht', class: 'aqi-poor' };
            return { text: 'AQI: Kritisch (Toxisch)', class: 'aqi-toxic' };
        },

        // --- TELEMETRY ENGINE (VGT PHP Proxy Fetch) ---
        async fetchTelemetry(lat, lng, locationName) {
            this.setStatus("Satelliten-Uplink aktiv...");
            if (this.DOM.aqiStatusText) this.DOM.aqiStatusText.textContent = "Analysiere Partikel...";
            
            // Update Meta UI Safely
            if (this.DOM.valCoords) this.DOM.valCoords.textContent = `LAT ${lat.toFixed(4)} | LNG ${lng.toFixed(4)}`;
            if (this.DOM.cwLocation) this.DOM.cwLocation.textContent = locationName;

            this.initMap(lat, lng);

            try {
                // Fetch API Daten über den sicheren lokalen PHP RAM-Proxy
                const forecastUrl = `${this.State.getProxyUrl()}forecast&lat=${lat}&lng=${lng}`;
                const aqiUrl = `${this.State.getProxyUrl()}aqi&lat=${lat}&lng=${lng}`;
                
                const [response, aqiResponse] = await Promise.all([
                    fetch(forecastUrl),
                    fetch(aqiUrl)
                ]);

                // Verify that we received valid JSON
                let data, aqiData;
                try {
                    data = await response.json();
                    aqiData = await aqiResponse.json();
                } catch (e) {
                    throw new Error("VGT Proxy Error: Invalid JSON response.");
                }

                if (data.error || aqiData.error) {
                    throw new Error(data.error || aqiData.error);
                }

                // 1. Populate Current Weather
                const cur = data.current;
                if (!cur) throw new Error("Invalid Weather Data format");
                
                const wmo = this.getWmoData(cur.weather_code);
                
                if (this.DOM.cwTemp) this.DOM.cwTemp.textContent = Math.round(cur.temperature_2m);
                if (this.DOM.cwDesc) this.DOM.cwDesc.textContent = wmo.desc;
                
                this.injectSVG(this.DOM.cwIcon, wmo.icon); // XSS Safe injection
                
                if (this.DOM.metHumidity) this.DOM.metHumidity.textContent = `${cur.relative_humidity_2m}%`;
                if (this.DOM.metWind) this.DOM.metWind.textContent = `${Math.round(cur.wind_speed_10m)} km/h`;
                if (this.DOM.metPressure) this.DOM.metPressure.textContent = `${Math.round(cur.pressure_msl)} hPa`;
                
                const uvMax = data.daily && data.daily.uv_index_max ? data.daily.uv_index_max[0] : null;
                if (this.DOM.metUV) this.DOM.metUV.textContent = uvMax ? uvMax.toFixed(1) : '--';
                if (this.DOM.valElevation) this.DOM.valElevation.textContent = `${data.elevation || 0} m ü. NN`;

                // 2. Populate Air Quality Data
                if (aqiData.current) {
                    const cAqi = aqiData.current;
                    const aqiEval = this.evaluateAQI(cAqi.european_aqi);
                    
                    if (this.DOM.aqiStatusText) this.DOM.aqiStatusText.textContent = aqiEval.text;
                    if (this.DOM.aqiBadge) this.DOM.aqiBadge.className = `status-badge ${aqiEval.class}`;
                    
                    if (this.DOM.aqiPm25) this.DOM.aqiPm25.textContent = cAqi.pm2_5 ? cAqi.pm2_5.toFixed(1) : '--';
                    if (this.DOM.aqiPm10) this.DOM.aqiPm10.textContent = cAqi.pm10 ? cAqi.pm10.toFixed(1) : '--';
                    if (this.DOM.aqiNo2) this.DOM.aqiNo2.textContent = cAqi.nitrogen_dioxide ? cAqi.nitrogen_dioxide.toFixed(1) : '--';
                }

                // 3. Populate 7-Day Forecast Grid (VGT DOM HARDENING)
                const daily = data.daily;
                if (daily && daily.time) {
                    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
                    const frag = document.createDocumentFragment();

                    for (let i = 0; i < 7 && i < daily.time.length; i++) {
                        const dateObj = new Date(daily.time[i]);
                        const dayName = i === 0 ? 'Heute' : days[dateObj.getDay()];
                        const fWmo = this.getWmoData(daily.weather_code[i]);
                        const tMax = Math.round(daily.temperature_2m_max[i]);
                        const tMin = Math.round(daily.temperature_2m_min[i]);
                        
                        const card = document.createElement('div');
                        card.className = `fc-card ${i === 0 ? 'today' : ''}`;
                        
                        const spanDay = document.createElement('span');
                        spanDay.className = 'fc-day';
                        spanDay.textContent = dayName;
                        
                        const svgWrap = document.createElement('div');
                        svgWrap.className = 'fc-icon';
                        this.injectSVG(svgWrap, fWmo.icon);

                        const tempsWrap = document.createElement('div');
                        tempsWrap.className = 'fc-temps';
                        
                        const spanMax = document.createElement('span');
                        spanMax.className = 'fc-max';
                        spanMax.textContent = `${tMax}°`;

                        const spanMin = document.createElement('span');
                        spanMin.className = 'fc-min';
                        spanMin.textContent = `${tMin}°`;

                        tempsWrap.appendChild(spanMax);
                        tempsWrap.appendChild(spanMin);

                        card.appendChild(spanDay);
                        card.appendChild(svgWrap);
                        card.appendChild(tempsWrap);
                        
                        frag.appendChild(card);
                    }

                    this.safeClearOutput(this.DOM.forecastContainer);
                    this.DOM.forecastContainer.appendChild(frag);
                }

                this.setStatus("Synchronisiert.");

            } catch (err) {
                console.error("Telemetry Error:", err);
                this.setStatus("Verbindung fehlgeschlagen.", true);
                if (this.DOM.cwDesc) this.DOM.cwDesc.textContent = "Offline";
                if (this.DOM.aqiStatusText) this.DOM.aqiStatusText.textContent = "Sensor-Ausfall";
                if (this.DOM.aqiBadge) this.DOM.aqiBadge.className = "status-badge error";
            }
        },

        // --- GEOCODING SEARCH ENGINE (VGT PHP Proxy Fetch) ---
        async searchLocation(query) {
            if (!query || query.length < 2) {
                this.DOM.searchResults.classList.add('hidden');
                return;
            }

            try {
                // Suche über lokalen Proxy umleiten (IP Maskierung)
                const geocodeUrl = `${this.State.getProxyUrl()}geocode&query=${encodeURIComponent(query)}`;
                const res = await fetch(geocodeUrl);
                
                let data;
                try {
                    data = await res.json();
                } catch (e) {
                    throw new Error("VGT Proxy Error: Geocoding endpoint did not return valid JSON.");
                }

                if (data.error) {
                    throw new Error(data.error);
                }

                this.safeClearOutput(this.DOM.searchResults);

                if (!data.results || data.results.length === 0) {
                    const emptyItem = document.createElement('div');
                    emptyItem.className = 'search-item';
                    emptyItem.style.color = 'var(--vg-text-muted)';
                    emptyItem.textContent = 'Keine Koordinaten gefunden.';
                    this.DOM.searchResults.appendChild(emptyItem);
                    this.DOM.searchResults.classList.remove('hidden');
                    return;
                }

                // VGT DOM HARDENING: Strict Node Creation (API Poisoning Defense)
                const frag = document.createDocumentFragment();

                data.results.forEach(loc => {
                    let sub = [];
                    if(loc.admin1) sub.push(loc.admin1);
                    if(loc.country) sub.push(loc.country);
                    
                    const item = document.createElement('div');
                    item.className = 'search-item';
                    item.setAttribute('data-lat', loc.latitude);
                    item.setAttribute('data-lng', loc.longitude);
                    item.setAttribute('data-name', loc.name);

                    const spanName = document.createElement('span');
                    spanName.textContent = loc.name; // XSS Immune

                    const spanSub = document.createElement('span');
                    spanSub.className = 'search-item-sub';
                    spanSub.textContent = sub.join(', '); // XSS Immune

                    item.appendChild(spanName);
                    item.appendChild(spanSub);

                    // Attach click logic natively
                    item.addEventListener('click', (e) => {
                        const lat = parseFloat(e.currentTarget.getAttribute('data-lat'));
                        const lng = parseFloat(e.currentTarget.getAttribute('data-lng'));
                        const name = e.currentTarget.getAttribute('data-name');
                        
                        this.DOM.searchInput.value = name;
                        this.DOM.searchResults.classList.add('hidden');
                        this.fetchTelemetry(lat, lng, name);
                    });

                    frag.appendChild(item);
                });

                this.DOM.searchResults.appendChild(frag);
                this.DOM.searchResults.classList.remove('hidden');

            } catch (err) {
                console.error("Geocoding Error:", err);
            }
        },

        bindEvents() {
            // Search Input Debouncing
            this.DOM.searchInput.addEventListener('input', (e) => {
                clearTimeout(this.State.searchTimeout);
                this.State.searchTimeout = setTimeout(() => {
                    this.searchLocation(e.target.value.trim());
                }, 400);
            });

            // Hide dropdown on outside click
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.ar-search-console')) {
                    if (this.DOM.searchResults) this.DOM.searchResults.classList.add('hidden');
                }
            });

            // Hardware GPS Integration
            if (this.DOM.btnGeolocate) {
                this.DOM.btnGeolocate.addEventListener('click', () => {
                    this.setStatus("Orte GPS Signal...");
                    this.DOM.btnGeolocate.classList.add('active');

                    if (!navigator.geolocation) {
                        this.setStatus("GPS nicht unterstützt.", true);
                        this.DOM.btnGeolocate.classList.remove('active');
                        return;
                    }

                    navigator.geolocation.getCurrentPosition(
                        async (pos) => {
                            const lat = pos.coords.latitude;
                            const lng = pos.coords.longitude;
                            this.DOM.btnGeolocate.classList.remove('active');
                            
                            this.DOM.searchInput.value = "Lokale Position";
                            this.fetchTelemetry(lat, lng, "Lokales GPS");
                        },
                        (err) => {
                            this.setStatus("GPS Zugriff verweigert.", true);
                            this.DOM.btnGeolocate.classList.remove('active');
                        }
                    );
                });
            }
        }
    };

    AtmosphericRadarEngine.init();
});