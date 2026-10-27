/**
 * VGT MEDIACENTER - DASHBOARD LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Native Node Rendering & Object Encapsulation
 * Vollständige Matrix aller 26 Werkzeuge & System-Kategorien.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert das Dashboard-Root?
    if (!document.getElementById('vgt-dashboard-root')) return;

    const DashboardEngine = {
        DOM: {},
        State: {
            isDark: true,
            viewMode: 'grid',
            deskOpenWindows: new Set(),
            deskWindows: new Map(),
            deskIconPositions: new Map(),
            deskZIndex: 20,
            deskStyleSheet: null,
            deskResize: null,
            deskActiveSnapWindowId: ''
        },
        Config: {
            // SVG Core (Full VGT Library)
            icons: {
                'sun': '<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>',
                'moon': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
                'hard-drives': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="4" y="4" width="16" height="6" rx="2" ry="2"></rect><rect x="4" y="14" width="16" height="6" rx="2" ry="2"></rect><line x1="8" y1="7" x2="8.01" y2="7"></line><line x1="8" y1="17" x2="8.01" y2="17"></line></svg>',
                'prohibit': '<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>',
                'shield-check': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>',
                'magnifying-glass': '<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                'eye-slash': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>',
                'eraser': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="m21 21-5.19-5.19M16.5 4.5l3 3L7 19.5 4 16.5 16.5 4.5z"></path></svg>',
                'scan': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"></path></svg>',
                'scales': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 3v18M4 11h16M7 11l-3 7h6l-3-7zM17 11l-3 7h6l-3-7z"></path></svg>',
                'file-lock': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><rect x="9" y="14" width="6" height="4" rx="1"></rect><path d="M10 14v-2a2 2 0 1 1 4 0v2"></path></svg>',
                'image': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
                'arrows-horizontal': '<svg viewBox="0 0 24 24" class="svg-icon"><polyline points="7 16 3 12 7 8"></polyline><line x1="3" y1="12" x2="11" y2="12"></line><polyline points="17 8 21 12 17 16"></polyline><line x1="21" y1="12" x2="13" y2="12"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>',
                'files': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>',
                'scissors': '<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>',
                'speaker-high': '<svg viewBox="0 0 24 24" class="svg-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>',
                'file-archive': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="10" y1="12" x2="14" y2="12"></line><line x1="10" y1="15" x2="14" y2="15"></line></svg>',
                'fingerprint': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6M10 12c0-1.1.9-2 2-2s2 .9 2 2"></path></svg>',
                'users-three': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
                'brain': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M9.5 2h5M12 2v20M17.5 4.5a4.5 4.5 0 0 1 1 8.89V14a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-.61a4.5 4.5 0 0 1 1-8.89"></path></svg>',
                'globe': '<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
                'moon-stars': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path><line x1="18" y1="4" x2="18" y2="6"></line><line x1="17" y1="5" x2="19" y2="5"></line></svg>',
                'wave-sine': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M4 12c2.67-8 5.33-8 8 0s5.33 8 8 0"></path></svg>',
                'lock-key': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
                'qr-code': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="3" height="3"></rect><rect x="18" y="18" width="3" height="3"></rect></svg>',
                'bowl-food': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M2 12h20c0 5.52-4.48 10-10 10S2 17.52 2 12z"></path><path d="M12 2v6"></path><path d="M8 3v5"></path><path d="M16 3v5"></path></svg>',
                'ruler': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="9" width="18" height="6" rx="1" ry="1"></rect><line x1="7" y1="9" x2="7" y2="12"></line><line x1="12" y1="9" x2="12" y2="12"></line><line x1="17" y1="9" x2="17" y2="12"></line></svg>',
                'brackets-curly': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M9 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2M15 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"></path></svg>',
                'palette': '<svg viewBox="0 0 24 24" class="svg-icon"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>',
                'wave-triangle': '<svg viewBox="0 0 24 24" class="svg-icon"><polyline points="2 12 6 4 10 20 14 4 18 20 22 12"></polyline></svg>',
                'flower-lotus': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z"></path><path d="M2 12c0-4 4-6 8-6"></path><path d="M22 12c0-4-4-6-8-6"></path></svg>',
                'file-cloud': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline><path d="M9 16.5a2.5 2.5 0 0 1 0-5 3.5 3.5 0 0 1 6 2.5 2.5 2.5 0 0 1 0 5H9z"></path></svg>',
                'shield': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
                'calculator': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>',
                'code': '<svg viewBox="0 0 24 24" class="svg-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
                'paint-brush': '<svg viewBox="0 0 24 24" class="svg-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
                'default': '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>'
            },
            tools: [
                { id: 'whistle', title: 'VisionWhistleBlow', cat: 'privacy', icon: 'eye-slash', desc: 'Text & PDF sicher schwärzen und anonymisieren.', link: '?vgt_tool=whistle', badge: 'Secure' },
                { id: 'stegano', title: 'VGT Stegano', cat: 'privacy', icon: 'eye-slash', desc: 'Text in Bilder einfügen', link: '?vgt_tool=stegano', badge: 'Secure' },
                { id: 'meta-clean', title: 'Metadata Cleaner', cat: 'privacy', icon: 'eraser', desc: 'GPS, EXIF und Autoren-Daten entfernen.', link: '?vgt_tool=meta-clean' },
                { id: 'fingerprint', title: 'Fingerprint Analyzer', cat: 'privacy', icon: 'scan', desc: 'Verstehe wie Browser-Tracking funktioniert.', link: '?vgt_tool=fingerprint', badge: 'Info' },
                { id: 'truthlense', title: 'Truthlense', cat: 'privacy', icon: 'scales', desc: 'Diff-Checker für Texte und Dokumente.', link: '?vgt_tool=truthlense' },
                { id: 'gitleaker', title: 'Git Checker', cat: 'privacy', icon: 'shield-check', desc: 'Finde Passwörter und Key vor Upload', link: '?vgt_tool=gitleaker' },
                { id: 'cipherflow', title: 'Cipher-Flow', cat: 'privacy', icon: 'code', desc: 'Visual Crypto Lab. Baue komplexe Krypto-Ketten.', link: '?vgt_tool=cipherflow', badge: 'Pro' },
                { id: 'har', title: 'Browserdaten Analyse', cat: 'privacy', icon: 'scales', desc: 'Untersuche deine Browserdaten', link: '?vgt_tool=har' },
                { id: 'hashchecker', title: 'Hashchecker', cat: 'privacy', icon: 'file-lock', desc: 'Datei-Integrität und Manipulation prüfen (SHA256).', link: '?vgt_tool=hashchecker', badge: 'Supremacy' },
                { id: 'secret-scan', title: 'Secret Scanner Pro', cat: 'privacy', icon: 'shield-check', desc: 'Findet API Keys, Tokens und .env-Leaks lokal.', link: '?vgt_tool=secret-scan', badge: 'New' },
                { id: 'url-clean', title: 'URL Cleaner Pro', cat: 'privacy', icon: 'eraser', desc: 'Entfernt Tracking-Parameter und Redirect-Müll lokal.', link: '?vgt_tool=url-clean', badge: 'DSGVO' },
                { id: 'hexmap', title: 'Dateichecker', cat: 'privacy', icon: 'file-lock', desc: 'Sandbox Datei Inspektor.', link: '?vgt_tool=hexmap', badge: 'Supremacy' },
                { id: 'pw-check', title: 'Passwort Check', cat: 'privacy', icon: 'shield-check', desc: 'Wie sicher ist dein Kennwort?', link: '?vgt_tool=pw-check' },
                 { id: 'aes', title: 'Text/Datei Encryption', cat: 'privacy', icon: 'lock-key', desc: 'AES-Verschlüsselung im Browser.', link: '?vgt_tool=aes' },
                { id: 'qr', title: 'QR Generator', cat: 'privacy', icon: 'qr-code', desc: 'Offline QR-Codes erstellen.', link: '?vgt_tool=qr' },
                
                { id: 'img-conv', title: 'Bild Converter', cat: 'media', icon: 'image', desc: 'PNG, JPG, WEBP, AVIF, SVG, HEIC.', link: '?vgt_tool=img-conv', badge: 'Popular' },
                { id: 'img-comp', title: 'Bild Kompressor', cat: 'media', icon: 'arrows-horizontal', desc: 'Dateigröße reduzieren ohne Upload.', link: '?vgt_tool=img-comp' },
                { id: 'pdf-merge', title: 'PDF Merge', cat: 'media', icon: 'files', desc: 'Mehrere PDFs zusammenfügen.', link: '?vgt_tool=pdf-merge' },
                { id: 'pdf-split', title: 'PDF Split', cat: 'media', icon: 'scissors', desc: 'Seiten extrahieren.', link: '?vgt_tool=pdf-split' },
                { id: 'audio-conv', title: 'Audio Studio Pro', cat: 'media', icon: 'speaker-high', desc: 'WAV, MP3, FLAC, OGG.', link: '?vgt_tool=audio-conv' },
                { id: 'zip', title: 'ZIP Entpacker', cat: 'media', icon: 'file-archive', desc: 'Archive lokal öffnen & prüfen.', link: '?vgt_tool=zipmaster' },
                 { id: 'json', title: 'JSON Tools', cat: 'dev', icon: 'brackets-curly', desc: 'Formatieren & Validieren.', link: '?vgt_tool=json' },
                { id: 'cdash', title: 'CSV Explorer', cat: 'dev', icon: 'brackets-curly', desc: 'Live Analyse Dashboard', link: '?vgt_tool=cdash' },
                { id: 'readme', title: 'ReadMe Generator', cat: 'dev', icon: 'brackets-curly', desc: 'Zum erstellen eigener ReadMe für Github', link: '?vgt_tool=readme' },
                { id: 'coder', title: 'Codding Tools', cat: 'dev', icon: 'brackets-curly', desc: 'Abgleichen & Verbessern', link: '?vgt_tool=coder' },
                { id: 'manifest', title: 'Manifest Forge', cat: 'dev', icon: 'file-lock', desc: 'SHA-256 Manifeste für Releases lokal bauen & prüfen.', link: '?vgt_tool=manifest', badge: 'New' },
                { id: 'packetviz', title: 'Netzwerk Analyzer', cat: 'dev', icon: 'brackets-curly', desc: 'Netzwerkanalyse Dashboard', link: '?vgt_tool=packetviz' },
                 { id: 'color', title: 'Farb Tools', cat: 'dev', icon: 'code', desc: 'HEX, RGB, HSL Converter.', link: '?vgt_tool=color' },
                
               
                { id: 'earth-sys', title: 'VisionGaiaEarthSystem', cat: 'cosmos', icon: 'globe', desc: 'Ein System für Echtzeit Erdbeben Daten in 3D', link: '/', badge: '3D Live' },
                { id: 'moon', title: 'Mondphasen', cat: 'cosmos', icon: 'moon-stars', desc: 'Aktuelle Phase & energetische Wirkung.', link: '?vgt_tool=moon', badge: 'Live' },
                { id: 'weather', title: 'Wetter Live', cat: 'cosmos', icon: 'sun', desc: 'Wetter, Luftqualität, Vorschau.', link: '?vgt_tool=weather' },
                { id: 'bio', title: 'Biorhythmus', cat: 'cosmos', icon: 'wave-sine', desc: 'Körperliche & geistige Zyklen.', link: '?vgt_tool=bio' },
                 { id: 'big5', title: 'MBTI Persönlichkeitstest', cat: 'mind', icon: 'fingerprint', desc: 'Wissenschaftlicher Persönlichkeitstest.', link: '?vgt_tool=big5', badge: 'Deep' },
                { id: 'jung', title: 'Archetypen', cat: 'mind', icon: 'users-three', desc: 'Finde deinen archetypischen Charakter.', link: '?vgt_tool=jung' },
                { id: 'stress', title: 'Stress & Fokus', cat: 'mind', icon: 'brain', desc: 'Mentales Level analysieren.', link: '?vgt_tool=stress' },
               
                { id: 'cal', title: 'Kalorien Pro', cat: 'calc', icon: 'bowl-food', desc: 'Bedarfsrechner mit Makros.', link: '?vgt_tool=cal' },
                { id: 'unit', title: 'Einheiten', cat: 'calc', icon: 'ruler', desc: 'Umrechner für alles.', link: '?vgt_tool=unit' },
                { id: 'energy', title: 'Stromrechner', cat: 'calc', icon: 'ruler', desc: 'Berechne deine Kosten.', link: '?vgt_tool=energy' },
               
               
                { id: 'freq', title: 'Frequenzen', cat: 'creative', icon: 'wave-triangle', desc: 'Binaural Beats Generator.', link: '?vgt_tool=freq', badge: 'Audio' },
                { id: 'med', title: 'Meditation', cat: 'creative', icon: 'flower-lotus', desc: 'Timer & Soundscapes.', link: '?vgt_tool=med' }
            ],
            categories: {
                'all': { label: 'Alle', color: 'cyan' },
                'media': { label: 'Media', color: 'cyan', icon: 'file-cloud' },
                'privacy': { label: 'Privacy', color: 'green', icon: 'shield' },
                'calc': { label: 'Calc', color: 'orange', icon: 'calculator' },
                'dev': { label: 'Dev', color: 'pink', icon: 'code' },
                'creative': { label: 'Kreativ', color: 'teal', icon: 'paint-brush' },
                'mind': { label: 'Mind', color: 'purple', icon: 'brain' },
                'cosmos': { label: 'Kosmos', color: 'yellow', icon: 'sun' }
            }
        },

        init() {
            this.cacheDOM();
            this.initStaticIcons();
            this.setupThemeEngine();
            this.renderFilters();
            this.renderGrid();
            this.initDesktopMode();
            this.bindEvents();
            this.checkWelcomeSequence(); // VGT Kognitiver Welcome Guard
            console.log('VGT DASHBOARD: UI Router Initialized.');
        },

        cacheDOM() {
            this.DOM = {
                htmlEl: document.documentElement,
                appWrapper: document.getElementById('vgt-main-wrapper'),
                iconHardDrives: document.getElementById('icon-hard-drives'),
                iconProhibit: document.getElementById('icon-prohibit'),
                iconShieldCheck: document.getElementById('icon-shield-check'),
                iconSearch: document.getElementById('icon-search'),
                btnThemeDesktop: document.getElementById('btn-theme-desktop'),
                btnThemeMobile: document.getElementById('btn-theme-mobile'),
                iconThemeDesktop: document.getElementById('icon-theme-desktop'),
                iconThemeMobile: document.getElementById('icon-theme-mobile'),
                gridEl: document.getElementById('vg-tools-grid'),
                filterContainer: document.getElementById('vg-filter-container'),
                searchInput: document.getElementById('vg-search'),
                gridMode: document.getElementById('vgt-dashboard-grid-mode'),
                deskMode: document.getElementById('vgt-mc-desk'),
                deskStage: document.querySelector('.vgt-mc-desk-stage'),
                deskIcons: document.getElementById('vgt-mc-desk-icons'),
                deskWindows: document.getElementById('vgt-mc-desk-windows'),
                deskDock: document.getElementById('vgt-mc-desk-dock'),
                deskClock: document.getElementById('vgt-mc-desk-clock'),
                modeToggle: document.getElementById('vgt-mc-mode-toggle')
            };
        },

        // --- SAFE DOM MANIPULATION UTILS ---
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
            
            // VGT BUGFIX: parseFromString mit 'text/html' erzwingt den korrekten HTML5 Namespace!
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            
            if (svgNode) {
                element.appendChild(svgNode);
            }
        },

        getIcon(name) {
            return this.Config.icons[name] || this.Config.icons['default'];
        },

        // --- THEME ENGINE & WELCOME MATRIX ---
        setupThemeEngine() {
            this.State.isDark = !this.DOM.htmlEl.classList.contains('light-mode');

            const toggleTheme = () => {
                this.State.isDark = !this.State.isDark;
                if (this.State.isDark) {
                    this.DOM.htmlEl.classList.remove('light-mode');
                } else {
                    this.DOM.htmlEl.classList.add('light-mode');
                }
                this.updateThemeIcons();
            };

            if (this.DOM.btnThemeDesktop) this.DOM.btnThemeDesktop.addEventListener('click', toggleTheme);
            if (this.DOM.btnThemeMobile)  this.DOM.btnThemeMobile.addEventListener('click', toggleTheme);
            
            this.updateThemeIcons();
        },

        updateThemeIcons() {
            const iHTML = this.State.isDark ? this.getIcon('sun') : this.getIcon('moon');
            this.injectSVG(this.DOM.iconThemeDesktop, iHTML);
            this.injectSVG(this.DOM.iconThemeMobile, iHTML);
        },

        renderWelcomeOnboarding(storageKey) {
            if (localStorage.getItem(storageKey)) return;

            const pages = [
                {
                    eyebrow: 'Local Intelligence',
                    title: 'VGT Mediacenter ist bereit',
                    intro: 'Die neue Shell buendelt Suche, Status, Navigation und Command Palette in einem Control Center. Dateien, Texte und Medien bleiben lokal im Browser-Speicher.',
                    cards: [
                        { tone: 'cyan', title: 'Command Palette', body: 'Ctrl K oeffnet die Tool-Matrix sofort. Zuletzt genutzte Module erscheinen direkt unter der Shell.' },
                        { tone: 'green', title: 'Zero Upload Core', body: 'Hashing, Verschluesselung, Metadata Cleanup, ZIP-Analyse und Secret-Scan laufen clientseitig mit lokalen Assets.' }
                    ]
                },
                {
                    eyebrow: 'Security Layer',
                    title: 'Privacy Tools mit echter Tiefe',
                    intro: 'Die Security-Gruppe ist auf forensische Checks, Leak-Erkennung und sichere Ausgabe ausgelegt. Sensible Werte werden maskiert statt offengelegt.',
                    cards: [
                        { tone: 'purple', title: 'Secret Scanner Pro', body: 'Findet API Keys, JWTs, Private Keys, GitHub-, Slack-, Stripe- und Google-Tokens in Dateien, ZIPs und Projektordnern.' },
                        { tone: 'pink', title: 'Hardening Matrix', body: 'Nonce-CSP, lokale Asset-Registry, DOM-sichere Renderpfade und maskierte Reports reduzieren Angriffs- und Datenschutzflaeche.' }
                    ]
                },
                {
                    eyebrow: 'Creative Operations',
                    title: 'Media, Dev, Mind und Cosmos',
                    intro: 'Das Mediacenter bleibt eine kompakte Workstation: Medien verarbeiten, Daten pruefen, Rechner nutzen und Fokus-Tools starten. Auf Smartphones bleiben Datei-Buttons als Fallback aktiv.',
                    cards: [
                        { tone: 'yellow', title: 'Media & Dev', body: 'Bild-, PDF-, Audio-, ZIP-, JSON-, CSV-, Code-, Color- und Packet-Tools sind fuer schnelle lokale Workflows gebaut.' },
                        { tone: 'teal', title: 'Mind & Signal', body: 'Big5, Jung, Stress, Frequenzen, Meditation, Mondphasen, Wetter, Bio, Kalorien und Einheiten geben Kontext und Fokus.' }
                    ]
                }
            ];

            let activePage = 0;

            const overlay = document.createElement('div');
            overlay.className = 'vgt-welcome-overlay';

            const modal = document.createElement('section');
            modal.className = 'vgt-welcome-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'vgt-welcome-title');

            const header = document.createElement('header');
            header.className = 'vgt-welcome-header';

            const icon = document.createElement('div');
            icon.className = 'vgt-welcome-icon';
            this.injectSVG(icon, '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>');

            const headingWrap = document.createElement('div');
            const eyebrow = document.createElement('span');
            eyebrow.className = 'vgt-welcome-eyebrow';
            const title = document.createElement('h2');
            title.id = 'vgt-welcome-title';
            title.className = 'vgt-welcome-title';
            headingWrap.append(eyebrow, title);
            header.append(icon, headingWrap);

            const systemStrip = document.createElement('div');
            systemStrip.className = 'vgt-welcome-system-strip';
            ['CSP Nonce', 'Local Assets', 'Zero Upload'].forEach(label => {
                const chip = document.createElement('span');
                chip.textContent = label;
                systemStrip.appendChild(chip);
            });

            const content = document.createElement('div');
            content.className = 'vgt-welcome-content';

            const intro = document.createElement('p');
            intro.className = 'vgt-welcome-intro';
            const cardList = document.createElement('div');
            cardList.className = 'vgt-welcome-cards';
            content.append(intro, cardList);

            const footer = document.createElement('footer');
            footer.className = 'vgt-welcome-footer';

            const dots = document.createElement('div');
            dots.className = 'vgt-welcome-dots';

            const actions = document.createElement('div');
            actions.className = 'vgt-welcome-actions';

            const prevBtn = document.createElement('button');
            prevBtn.type = 'button';
            prevBtn.className = 'vgt-welcome-btn vgt-welcome-btn-secondary';
            prevBtn.textContent = 'Zurueck';

            const nextBtn = document.createElement('button');
            nextBtn.type = 'button';
            nextBtn.className = 'vgt-welcome-btn vgt-welcome-btn-primary';

            actions.append(prevBtn, nextBtn);
            footer.append(dots, actions);
            modal.append(header, systemStrip, content, footer);
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            const closeModal = () => {
                localStorage.setItem(storageKey, 'true');
                overlay.classList.remove('active');
                overlay.classList.add('closing');
                setTimeout(() => overlay.remove(), 260);
            };

            const renderPage = () => {
                const page = pages[activePage];
                eyebrow.textContent = page.eyebrow;
                title.textContent = page.title;
                intro.textContent = page.intro;
                this.safeClearOutput(cardList);
                this.safeClearOutput(dots);

                page.cards.forEach(card => {
                    const item = document.createElement('article');
                    item.className = `vgt-welcome-card tone-${card.tone}`;

                    const itemTitle = document.createElement('strong');
                    itemTitle.textContent = card.title;

                    const itemBody = document.createElement('span');
                    itemBody.textContent = card.body;

                    item.append(itemTitle, itemBody);
                    cardList.appendChild(item);
                });

                pages.forEach((_, index) => {
                    const dot = document.createElement('span');
                    dot.className = index === activePage ? 'active' : '';
                    dots.appendChild(dot);
                });

                prevBtn.disabled = activePage === 0;
                nextBtn.textContent = activePage === pages.length - 1 ? 'Starten' : 'Weiter';
            };

            prevBtn.addEventListener('click', () => {
                if (activePage === 0) return;
                activePage -= 1;
                renderPage();
            });

            nextBtn.addEventListener('click', () => {
                if (activePage === pages.length - 1) {
                    closeModal();
                    return;
                }

                activePage += 1;
                renderPage();
            });

            renderPage();
            requestAnimationFrame(() => overlay.classList.add('active'));
        },

        checkWelcomeSequence() {
            const storageKey = 'vgt_mc_system_initialized_v5';
            if (localStorage.getItem(storageKey)) return;
            this.renderWelcomeOnboarding(storageKey);
            return;


        },

        initDesktopMode() {
            if (!this.DOM.deskMode || !this.DOM.modeToggle) return;

            this.ensureDeskRuntimeStyle();
            this.loadDeskState();
            this.State.viewMode = localStorage.getItem('vgt_mc_view_mode') === 'desktop' ? 'desktop' : 'grid';
            this.renderDesktopIcons();
            this.restoreDesktopWindows();
            this.renderDesktopDock();
            this.updateDesktopClock();
            setInterval(() => this.updateDesktopClock(), 30000);
            window.addEventListener('resize', () => {
                if (this.State.viewMode === 'desktop') {
                    this.arrangeDesktopIcons(false);
                    this.syncDeskRuntimeStyles();
                }
            });
            this.applyViewMode();

            this.DOM.modeToggle.addEventListener('click', () => {
                this.State.viewMode = this.State.viewMode === 'desktop' ? 'grid' : 'desktop';
                localStorage.setItem('vgt_mc_view_mode', this.State.viewMode);
                this.applyViewMode();
                if (this.State.viewMode === 'desktop') {
                    this.enterDesktopFullscreen();
                } else {
                    this.exitDesktopFullscreen();
                }
            });
        },

        applyViewMode() {
            const isDesktop = this.State.viewMode === 'desktop';

            if (this.DOM.gridMode) {
                this.DOM.gridMode.classList.toggle('is-hidden', isDesktop);
            }

            if (this.DOM.deskMode) {
                this.DOM.deskMode.classList.toggle('is-active', isDesktop);
            }

            if (this.DOM.appWrapper) {
                this.DOM.appWrapper.classList.toggle('vgt-mc-desktop-mode', isDesktop);
            }

            if (this.DOM.modeToggle) {
                this.DOM.modeToggle.setAttribute('aria-pressed', isDesktop ? 'true' : 'false');
                this.DOM.modeToggle.textContent = isDesktop ? 'Grid' : 'Desktop';
            }

            if (isDesktop) {
                requestAnimationFrame(() => {
                    this.arrangeDesktopIcons(false);
                    this.syncDeskRuntimeStyles();
                });
            }
        },

        enterDesktopFullscreen() {
            if (!this.DOM.appWrapper || !document.fullscreenEnabled || document.fullscreenElement) return;

            const requestFullscreen = this.DOM.appWrapper.requestFullscreen;
            if (typeof requestFullscreen === 'function') {
                requestFullscreen.call(this.DOM.appWrapper).catch(() => {});
            }
        },

        exitDesktopFullscreen() {
            if (document.fullscreenElement === this.DOM.appWrapper && typeof document.exitFullscreen === 'function') {
                document.exitFullscreen().catch(() => {});
            }
        },

        ensureDeskRuntimeStyle() {
            let styleNode = document.getElementById('vgt-mc-desk-runtime-style');
            if (!styleNode) {
                styleNode = document.createElement('style');
                styleNode.id = 'vgt-mc-desk-runtime-style';
                if (typeof vgtCore !== 'undefined' && vgtCore.cspNonce) {
                    styleNode.setAttribute('nonce', vgtCore.cspNonce);
                }
                document.head.appendChild(styleNode);
            }
            this.State.deskStyleSheet = styleNode;
        },

        loadDeskState() {
            try {
                const raw = JSON.parse(localStorage.getItem('vgt_mc_desktop_state_v1') || '{}');
                Object.entries(raw.windows || {}).forEach(([id, value]) => {
                    this.State.deskWindows.set(id, value);
                    this.State.deskZIndex = Math.max(this.State.deskZIndex, Number(value.z) || 20);
                });
                Object.entries(raw.icons || {}).forEach(([id, value]) => {
                    this.State.deskIconPositions.set(id, value);
                });
            } catch (_error) {
                this.State.deskWindows.clear();
                this.State.deskIconPositions.clear();
            }
        },

        saveDeskState() {
            const windows = Object.fromEntries(this.State.deskWindows);
            const icons = Object.fromEntries(this.State.deskIconPositions);
            try {
                localStorage.setItem('vgt_mc_desktop_state_v1', JSON.stringify({ windows, icons }));
            } catch (_error) {
                return;
            }
        },

        cssAttr(value) {
            return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        },

        clampDeskNumber(value, min, max) {
            const number = Number(value);
            if (!Number.isFinite(number)) return min;
            return Math.max(min, Math.min(max, number));
        },

        getDeskStageMetrics() {
            const stage = this.DOM.deskStage || this.DOM.deskMode;
            const rect = stage ? stage.getBoundingClientRect() : { width: 960, height: 540, left: 0, top: 0 };
            return {
                left: rect.left,
                top: rect.top,
                width: Math.max(320, rect.width),
                height: Math.max(420, rect.height)
            };
        },

        syncDeskRuntimeStyles() {
            if (!this.State.deskStyleSheet) return;

            const rules = [];
            if (window.innerWidth > 760) {
                const metrics = this.getDeskStageMetrics();
                this.State.deskWindows.forEach((state, id) => {
                    const selector = `.vgt-mc-desk-window[data-window-id="${this.cssAttr(id)}"]`;
                    const transform = state.minimized ? 'transform: scale(0.84) translateY(120px); opacity: 0;' : 'transform: none; opacity: 1;';
                    const width = this.clampDeskNumber(state.width, 320, metrics.width);
                    const height = this.clampDeskNumber(state.height, 240, metrics.height);
                    const left = this.clampDeskNumber(state.left, 0, metrics.width - Math.min(width, metrics.width));
                    const top = this.clampDeskNumber(state.top, 0, metrics.height - Math.min(height, metrics.height));
                    const z = this.clampDeskNumber(state.z, 20, 9999);
                    rules.push(`${selector}{left:${left}px;top:${top}px;width:${width}px;height:${height}px;z-index:${z};${transform}}`);
                });

                this.State.deskIconPositions.forEach((state, id) => {
                    const left = this.clampDeskNumber(state.left, 0, metrics.width - 90);
                    const top = this.clampDeskNumber(state.top, 0, metrics.height - 100);
                    rules.push(`.vgt-mc-desk-icon[data-tool-id="${this.cssAttr(id)}"]{left:${left}px;top:${top}px;}`);
                });
            }

            this.State.deskStyleSheet.textContent = rules.join('\n');
        },

        updateDesktopClock() {
            if (!this.DOM.deskClock) return;

            const now = new Date();
            const formatter = new Intl.DateTimeFormat('de-DE', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit'
            });
            this.DOM.deskClock.textContent = formatter.format(now);
        },

        getDesktopTools() {
            return this.Config.tools.filter(tool => typeof tool.link === 'string' && tool.link.startsWith('?vgt_tool='));
        },

        buildToolFrameUrl(tool) {
            const base = typeof vgtCore !== 'undefined' ? vgtCore.baseUrl : window.location.pathname;
            const rawUrl = tool.link.startsWith('/') ? tool.link : `${base}${tool.link}`;
            const url = new URL(rawUrl, window.location.origin);
            if (url.origin !== window.location.origin) {
                return 'about:blank';
            }
            url.searchParams.set('vgt_iframe', '1');
            return url.toString();
        },

        renderDesktopIcons() {
            if (!this.DOM.deskIcons) return;

            const frag = document.createDocumentFragment();
            this.getDesktopTools().forEach(tool => {
                const category = this.Config.categories[tool.cat] || this.Config.categories.all;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = `vgt-mc-desk-icon color-${category.color}`;
                button.dataset.toolId = tool.id;
                button.setAttribute('aria-label', tool.title);

                const iconWrap = document.createElement('span');
                iconWrap.className = 'vgt-mc-desk-icon-glyph';
                this.injectSVG(iconWrap, this.getIcon(tool.icon));

                const label = document.createElement('span');
                label.className = 'vgt-mc-desk-icon-label';
                label.textContent = tool.title;

                button.append(iconWrap, label);
                button.addEventListener('click', () => {
                    if (button.dataset.dragged === 'true') {
                        button.dataset.dragged = 'false';
                        return;
                    }
                    this.openDeskWindow(tool.id);
                });
                this.makeDeskIconDraggable(button);
                frag.appendChild(button);
            });

            this.safeClearOutput(this.DOM.deskIcons);
            this.DOM.deskIcons.appendChild(frag);
            this.arrangeDesktopIcons(false);
        },

        arrangeDesktopIcons(forceReset) {
            if (!this.DOM.deskIcons) return;

            const metrics = this.getDeskStageMetrics();
            const cellWidth = 100;
            const cellHeight = 112;
            const padding = 18;
            const maxRows = Math.max(1, Math.floor((metrics.height - padding * 2) / cellHeight));

            this.getDesktopTools().forEach((tool, index) => {
                if (forceReset || !this.State.deskIconPositions.has(tool.id)) {
                    const column = Math.floor(index / maxRows);
                    const row = index % maxRows;
                    this.State.deskIconPositions.set(tool.id, {
                        left: padding + column * cellWidth,
                        top: padding + row * cellHeight
                    });
                }
            });

            this.saveDeskState();
            this.syncDeskRuntimeStyles();
        },

        makeDeskIconDraggable(icon) {
            let startX = 0;
            let startY = 0;
            let offsetX = 0;
            let offsetY = 0;
            let moved = false;

            icon.addEventListener('pointerdown', (event) => {
                if (event.button !== 0 || window.innerWidth <= 760) return;
                const toolId = icon.dataset.toolId;
                const pos = this.State.deskIconPositions.get(toolId) || { left: 0, top: 0 };
                const metrics = this.getDeskStageMetrics();
                startX = event.clientX;
                startY = event.clientY;
                offsetX = (event.clientX - metrics.left) - pos.left;
                offsetY = (event.clientY - metrics.top) - pos.top;
                moved = false;
                icon.setPointerCapture(event.pointerId);
                icon.classList.add('is-dragging');
            });

            icon.addEventListener('pointermove', (event) => {
                if (!icon.classList.contains('is-dragging')) return;
                const distance = Math.hypot(event.clientX - startX, event.clientY - startY);
                if (distance < 4 && !moved) return;
                moved = true;
                icon.dataset.dragged = 'true';

                const metrics = this.getDeskStageMetrics();
                const left = this.clampDeskNumber(event.clientX - metrics.left - offsetX, 8, metrics.width - 96);
                const top = this.clampDeskNumber(event.clientY - metrics.top - offsetY, 8, metrics.height - 106);
                this.State.deskIconPositions.set(icon.dataset.toolId, { left, top });
                this.syncDeskRuntimeStyles();
            });

            icon.addEventListener('pointerup', (event) => {
                if (!icon.classList.contains('is-dragging')) return;
                icon.releasePointerCapture(event.pointerId);
                icon.classList.remove('is-dragging');
                if (moved) {
                    this.saveDeskState();
                }
            });
        },

        renderDesktopDock() {
            if (!this.DOM.deskDock) return;

            const pinnedIds = ['secret-scan', 'url-clean', 'manifest', 'hashchecker', 'img-conv', 'json'];
            const openIds = Array.from(this.State.deskWindows.keys()).filter(id => !pinnedIds.includes(id));
            const dockIds = [...pinnedIds, ...openIds];
            const frag = document.createDocumentFragment();

            dockIds
                .map(id => this.Config.tools.find(tool => tool.id === id))
                .filter(Boolean)
                .forEach(tool => {
                    const category = this.Config.categories[tool.cat] || this.Config.categories.all;
                    const button = document.createElement('button');
                    button.type = 'button';
                    button.className = 'vgt-mc-desk-dock-item';
                    button.dataset.toolId = tool.id;
                    button.setAttribute('aria-label', tool.title);

                    const marker = document.createElement('span');
                    marker.className = `vgt-mc-desk-dock-marker color-${category.color}`;
                    this.injectSVG(marker, this.getIcon(tool.icon));

                    const label = document.createElement('span');
                    label.className = 'vgt-mc-desk-dock-label';
                    label.textContent = tool.title;

                    button.append(marker, label);
                    button.addEventListener('click', () => this.handleDeskDockClick(tool.id));
                    frag.appendChild(button);
                });

            this.safeClearOutput(this.DOM.deskDock);
            this.DOM.deskDock.appendChild(frag);
            this.syncDeskDockState();
        },

        restoreDesktopWindows() {
            if (!this.DOM.deskWindows) return;

            this.safeClearOutput(this.DOM.deskWindows);
            this.State.deskWindows.forEach((_state, toolId) => {
                const tool = this.Config.tools.find(item => item.id === toolId);
                if (!tool) {
                    this.State.deskWindows.delete(toolId);
                    return;
                }

                const windowEl = this.createDeskWindowElement(tool);
                if (this.State.deskWindows.get(toolId).minimized) {
                    windowEl.classList.add('is-minimized');
                }
                this.DOM.deskWindows.appendChild(windowEl);
                this.bindDeskWindowEvents(windowEl, toolId);
                this.State.deskOpenWindows.add(toolId);
            });
            this.syncDeskRuntimeStyles();
        },

        handleDeskDockClick(toolId) {
            const windowEl = this.getDeskWindowElement(toolId);
            if (!windowEl) {
                this.openDeskWindow(toolId);
                return;
            }

            const state = this.State.deskWindows.get(toolId);
            if (state && state.minimized) {
                this.restoreDeskWindow(toolId);
            } else if (this.isTopDeskWindow(toolId)) {
                this.minimizeDeskWindow(toolId);
            } else {
                this.focusDeskWindow(toolId);
            }
        },

        getDeskWindowElement(toolId) {
            if (!this.DOM.deskWindows) return null;
            return Array.from(this.DOM.deskWindows.querySelectorAll('[data-window-id]'))
                .find(windowNode => windowNode.dataset.windowId === toolId) || null;
        },

        openDeskWindow(toolId) {
            if (!this.DOM.deskWindows) return;

            const tool = this.Config.tools.find(item => item.id === toolId);
            if (!tool) return;

            const existing = this.getDeskWindowElement(toolId);
            if (existing) {
                this.restoreDeskWindow(toolId);
                return;
            }

            const metrics = this.getDeskStageMetrics();
            const existingCount = this.State.deskWindows.size;
            const width = Math.min(920, metrics.width - 32);
            const height = Math.min(640, metrics.height - 32);
            const left = this.clampDeskNumber(280 + existingCount * 28, 12, metrics.width - width - 12);
            const top = this.clampDeskNumber(58 + existingCount * 24, 12, metrics.height - height - 12);
            this.State.deskZIndex += 1;
            this.State.deskWindows.set(tool.id, {
                left,
                top,
                width,
                height,
                z: this.State.deskZIndex,
                minimized: false,
                maximized: false,
                snap: ''
            });

            const windowEl = this.createDeskWindowElement(tool);
            this.DOM.deskWindows.appendChild(windowEl);
            this.State.deskOpenWindows.add(tool.id);
            this.bindDeskWindowEvents(windowEl, tool.id);
            this.focusDeskWindow(tool.id);
            this.renderDesktopDock();
            this.saveDeskState();
            this.syncDeskRuntimeStyles();
        },

        createDeskWindowElement(tool) {
            const category = this.Config.categories[tool.cat] || this.Config.categories.all;
            const windowEl = document.createElement('article');
            windowEl.className = `vgt-mc-desk-window color-${category.color}`;
            windowEl.dataset.windowId = tool.id;
            windowEl.setAttribute('aria-label', tool.title);

            ['n', 's', 'e', 'w', 'nw', 'ne', 'sw', 'se'].forEach(direction => {
                const handle = document.createElement('button');
                handle.type = 'button';
                handle.className = `vgt-mc-resize-handle vgt-mc-resize-${direction}`;
                handle.dataset.resizeDirection = direction;
                handle.setAttribute('aria-label', `Fenster ${direction} skalieren`);
                windowEl.appendChild(handle);
            });

            const header = document.createElement('header');
            header.className = 'vgt-mc-desk-window-head';

            const controls = document.createElement('div');
            controls.className = 'vgt-mc-desk-window-controls';
            controls.append(
                this.createDeskWindowButton('close', 'Fenster schliessen'),
                this.createDeskWindowButton('min', 'Fenster minimieren'),
                this.createDeskWindowButton('max', 'Fenster maximieren')
            );

            const titleWrap = document.createElement('div');
            titleWrap.className = 'vgt-mc-desk-window-title';
            const title = document.createElement('strong');
            title.textContent = tool.title;
            const meta = document.createElement('span');
            meta.textContent = tool.cat.toUpperCase();
            titleWrap.append(title, meta);
            header.append(controls, titleWrap);

            const body = document.createElement('div');
            body.className = 'vgt-mc-desk-window-body';

            const iconWrap = document.createElement('div');
            iconWrap.className = 'vgt-mc-desk-window-icon';
            this.injectSVG(iconWrap, this.getIcon(tool.icon));

            const frameShell = document.createElement('div');
            frameShell.className = 'vgt-mc-desk-frame-shell';

            const frameLoading = document.createElement('div');
            frameLoading.className = 'vgt-mc-desk-frame-loading';
            frameLoading.textContent = 'Tool wird lokal geladen';

            const frame = document.createElement('iframe');
            frame.className = 'vgt-mc-desk-frame';
            frame.title = tool.title;
            frame.src = this.buildToolFrameUrl(tool);
            frame.loading = 'lazy';
            frame.referrerPolicy = 'same-origin';
            frame.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-downloads allow-modals');
            frame.setAttribute('allow', 'fullscreen');
            frame.allowFullscreen = true;
            frame.addEventListener('load', () => {
                frameShell.classList.add('is-loaded');
            });

            const chips = document.createElement('div');
            chips.className = 'vgt-mc-desk-window-chips';
            ['Iframe', 'Same-Origin', category.label || tool.cat].forEach(labelText => {
                const chip = document.createElement('span');
                chip.textContent = labelText;
                chips.appendChild(chip);
            });

            const actions = document.createElement('div');
            actions.className = 'vgt-mc-desk-window-actions';
            const launch = document.createElement('a');
            launch.className = 'vgt-mc-desk-window-launch';
            launch.href = tool.link.startsWith('/') ? tool.link : (typeof vgtCore !== 'undefined' ? vgtCore.baseUrl : '') + tool.link;
            launch.target = '_blank';
            launch.rel = 'noopener';
            launch.textContent = 'In Tab öffnen';

            const reload = document.createElement('button');
            reload.type = 'button';
            reload.className = 'vgt-mc-desk-window-launch';
            reload.textContent = 'Neu laden';
            reload.addEventListener('click', () => {
                frameShell.classList.remove('is-loaded');
                frame.src = this.buildToolFrameUrl(tool);
            });
            actions.append(reload, launch);

            const frameMeta = document.createElement('div');
            frameMeta.className = 'vgt-mc-desk-frame-meta';
            const frameDesc = document.createElement('p');
            frameDesc.textContent = tool.desc;
            frameMeta.append(frameDesc, chips, actions);

            frameShell.append(frameLoading, frame);
            body.append(iconWrap, frameMeta, frameShell);
            windowEl.append(header, body);
            return windowEl;
        },

        bindDeskWindowEvents(windowEl, toolId) {
            const closeBtn = windowEl.querySelector('.vgt-mc-desk-window-dot.is-close');
            const minBtn = windowEl.querySelector('.vgt-mc-desk-window-dot.is-min');
            const maxBtn = windowEl.querySelector('.vgt-mc-desk-window-dot.is-max');
            const header = windowEl.querySelector('.vgt-mc-desk-window-head');

            closeBtn.addEventListener('click', () => this.closeDeskWindow(toolId));
            minBtn.addEventListener('click', () => this.minimizeDeskWindow(toolId));
            maxBtn.addEventListener('click', () => this.maximizeDeskWindow(toolId));
            header.addEventListener('dblclick', () => this.maximizeDeskWindow(toolId));
            header.addEventListener('pointerdown', event => this.startDeskDrag(event, toolId));
            windowEl.addEventListener('pointerdown', () => this.focusDeskWindow(toolId));

            windowEl.querySelectorAll('.vgt-mc-resize-handle').forEach(handle => {
                handle.addEventListener('pointerdown', event => this.startDeskResize(event, toolId, handle.dataset.resizeDirection));
            });
        },

        createDeskWindowButton(type, label) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `vgt-mc-desk-window-dot is-${type}`;
            button.setAttribute('aria-label', label);
            return button;
        },

        focusDeskWindow(toolId) {
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            this.State.deskZIndex += 1;
            state.z = this.State.deskZIndex;
            state.minimized = false;
            windowEl.classList.remove('is-minimized', 'is-minimizing');
            this.DOM.deskWindows.querySelectorAll('.vgt-mc-desk-window').forEach(win => {
                win.classList.toggle('is-active', win.dataset.windowId === toolId);
            });
            this.syncDeskRuntimeStyles();
            this.syncDeskDockState();
        },

        isTopDeskWindow(toolId) {
            const state = this.State.deskWindows.get(toolId);
            if (!state || state.minimized) return false;
            let highest = 0;
            this.State.deskWindows.forEach(winState => {
                if (!winState.minimized) highest = Math.max(highest, winState.z || 0);
            });
            return state.z === highest;
        },

        closeDeskWindow(toolId) {
            const windowEl = this.getDeskWindowElement(toolId);
            if (windowEl) windowEl.remove();
            this.State.deskWindows.delete(toolId);
            this.State.deskOpenWindows.delete(toolId);
            this.renderDesktopDock();
            this.saveDeskState();
            this.syncDeskRuntimeStyles();
        },

        minimizeDeskWindow(toolId) {
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            state.minimized = true;
            windowEl.classList.add('is-minimizing');
            this.syncDeskRuntimeStyles();
            setTimeout(() => {
                if (state.minimized) windowEl.classList.add('is-minimized');
                windowEl.classList.remove('is-minimizing');
                this.syncDeskDockState();
            }, 220);
            this.saveDeskState();
            this.syncDeskDockState();
        },

        restoreDeskWindow(toolId) {
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            state.minimized = false;
            windowEl.classList.remove('is-minimized', 'is-minimizing');
            this.focusDeskWindow(toolId);
            this.saveDeskState();
        },

        maximizeDeskWindow(toolId) {
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            const metrics = this.getDeskStageMetrics();
            if (state.maximized) {
                Object.assign(state, state.restore || {});
                state.maximized = false;
                state.snap = '';
                windowEl.classList.remove('is-maximized');
            } else {
                state.restore = { left: state.left, top: state.top, width: state.width, height: state.height };
                state.left = 10;
                state.top = 10;
                state.width = Math.max(300, metrics.width - 20);
                state.height = Math.max(280, metrics.height - 20);
                state.maximized = true;
                state.snap = 'top';
                windowEl.classList.add('is-maximized');
            }

            this.focusDeskWindow(toolId);
            this.saveDeskState();
            this.syncDeskRuntimeStyles();
        },

        startDeskDrag(event, toolId) {
            if (event.button !== 0 || window.innerWidth <= 760 || event.target.closest('button')) return;
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            event.preventDefault();
            this.focusDeskWindow(toolId);
            const metrics = this.getDeskStageMetrics();
            const origin = {
                x: event.clientX,
                y: event.clientY,
                left: state.left,
                top: state.top,
                width: state.width,
                height: state.height
            };
            let moved = false;
            let snapZone = '';
            windowEl.setPointerCapture(event.pointerId);
            windowEl.classList.add('is-dragging');

            const move = moveEvent => {
                const dx = moveEvent.clientX - origin.x;
                const dy = moveEvent.clientY - origin.y;
                if (!moved && Math.hypot(dx, dy) < 4) return;
                moved = true;

                if (state.maximized || state.snap) {
                    state.maximized = false;
                    state.snap = '';
                    windowEl.classList.remove('is-maximized');
                    state.width = state.restore ? state.restore.width : origin.width;
                    state.height = state.restore ? state.restore.height : origin.height;
                    state.left = this.clampDeskNumber(moveEvent.clientX - metrics.left - state.width / 2, 8, metrics.width - state.width - 8);
                    state.top = 16;
                } else {
                    state.left = this.clampDeskNumber(origin.left + dx, 8, metrics.width - state.width - 8);
                    state.top = this.clampDeskNumber(origin.top + dy, 8, metrics.height - state.height - 8);
                }

                const localX = moveEvent.clientX - metrics.left;
                const localY = moveEvent.clientY - metrics.top;
                snapZone = localY < 42 ? 'top' : localX < 42 ? 'left' : localX > metrics.width - 42 ? 'right' : '';
                this.showDeskSnapPreview(snapZone);
                this.syncDeskRuntimeStyles();
            };

            const up = upEvent => {
                windowEl.releasePointerCapture(upEvent.pointerId);
                windowEl.classList.remove('is-dragging');
                windowEl.removeEventListener('pointermove', move);
                windowEl.removeEventListener('pointerup', up);
                this.hideDeskSnapPreview();
                if (snapZone) {
                    this.snapDeskWindow(toolId, snapZone);
                }
                this.saveDeskState();
            };

            windowEl.addEventListener('pointermove', move);
            windowEl.addEventListener('pointerup', up);
        },

        startDeskResize(event, toolId, direction) {
            if (event.button !== 0 || window.innerWidth <= 760) return;
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            event.preventDefault();
            this.focusDeskWindow(toolId);
            const origin = {
                x: event.clientX,
                y: event.clientY,
                left: state.left,
                top: state.top,
                width: state.width,
                height: state.height
            };
            const metrics = this.getDeskStageMetrics();
            state.maximized = false;
            state.snap = '';
            windowEl.classList.remove('is-maximized');
            windowEl.setPointerCapture(event.pointerId);
            windowEl.classList.add('is-resizing');

            const move = moveEvent => {
                const dx = moveEvent.clientX - origin.x;
                const dy = moveEvent.clientY - origin.y;
                let nextLeft = origin.left;
                let nextTop = origin.top;
                let nextWidth = origin.width;
                let nextHeight = origin.height;

                if (direction.includes('e')) nextWidth = origin.width + dx;
                if (direction.includes('s')) nextHeight = origin.height + dy;
                if (direction.includes('w')) {
                    nextWidth = origin.width - dx;
                    nextLeft = origin.left + dx;
                }
                if (direction.includes('n')) {
                    nextHeight = origin.height - dy;
                    nextTop = origin.top + dy;
                }

                nextWidth = this.clampDeskNumber(nextWidth, 360, metrics.width - 16);
                nextHeight = this.clampDeskNumber(nextHeight, 260, metrics.height - 16);
                state.left = this.clampDeskNumber(nextLeft, 8, metrics.width - nextWidth - 8);
                state.top = this.clampDeskNumber(nextTop, 8, metrics.height - nextHeight - 8);
                state.width = nextWidth;
                state.height = nextHeight;
                this.syncDeskRuntimeStyles();
            };

            const up = upEvent => {
                windowEl.releasePointerCapture(upEvent.pointerId);
                windowEl.classList.remove('is-resizing');
                windowEl.removeEventListener('pointermove', move);
                windowEl.removeEventListener('pointerup', up);
                this.saveDeskState();
            };

            windowEl.addEventListener('pointermove', move);
            windowEl.addEventListener('pointerup', up);
        },

        showDeskSnapPreview(zone) {
            if (!this.DOM.deskStage) return;
            let preview = this.DOM.deskStage.querySelector('.vgt-mc-snap-preview');
            if (!preview) {
                preview = document.createElement('div');
                preview.className = 'vgt-mc-snap-preview';
                this.DOM.deskStage.appendChild(preview);
            }
            preview.className = zone ? `vgt-mc-snap-preview is-${zone} is-visible` : 'vgt-mc-snap-preview';
        },

        hideDeskSnapPreview() {
            if (!this.DOM.deskStage) return;
            const preview = this.DOM.deskStage.querySelector('.vgt-mc-snap-preview');
            if (preview) preview.className = 'vgt-mc-snap-preview';
        },

        snapDeskWindow(toolId, zone) {
            const state = this.State.deskWindows.get(toolId);
            const windowEl = this.getDeskWindowElement(toolId);
            if (!state || !windowEl) return;

            const metrics = this.getDeskStageMetrics();
            state.restore = { left: state.left, top: state.top, width: state.width, height: state.height };
            state.snap = zone;
            state.maximized = zone === 'top';
            if (zone === 'left') {
                state.left = 10;
                state.top = 10;
                state.width = Math.max(360, Math.floor(metrics.width / 2) - 14);
                state.height = Math.max(280, metrics.height - 20);
            } else if (zone === 'right') {
                state.left = Math.floor(metrics.width / 2) + 4;
                state.top = 10;
                state.width = Math.max(360, Math.floor(metrics.width / 2) - 14);
                state.height = Math.max(280, metrics.height - 20);
            } else {
                state.left = 10;
                state.top = 10;
                state.width = Math.max(360, metrics.width - 20);
                state.height = Math.max(280, metrics.height - 20);
            }
            windowEl.classList.toggle('is-maximized', zone === 'top');
            this.focusDeskWindow(toolId);
            this.saveDeskState();
            this.syncDeskRuntimeStyles();
        },

        syncDeskDockState() {
            if (!this.DOM.deskDock) return;

            this.DOM.deskDock.querySelectorAll('.vgt-mc-desk-dock-item').forEach(button => {
                const toolId = button.dataset.toolId;
                const state = toolId ? this.State.deskWindows.get(toolId) : null;
                button.classList.toggle('is-open', Boolean(state && !state.minimized));
                button.classList.toggle('is-minimized', Boolean(state && state.minimized));
            });
        },

        // --- FILTER & GRID RENDERING ---
        initStaticIcons() {
            this.injectSVG(this.DOM.iconHardDrives, this.getIcon('hard-drives'));
            this.injectSVG(this.DOM.iconProhibit, this.getIcon('prohibit'));
            this.injectSVG(this.DOM.iconShieldCheck, this.getIcon('shield-check'));
            this.injectSVG(this.DOM.iconSearch, this.getIcon('magnifying-glass'));
        },

        renderFilters() {
            const frag = document.createDocumentFragment();

            const btnAll = document.createElement('button');
            btnAll.className = 'filter-btn active';
            btnAll.dataset.cat = 'all';
            btnAll.textContent = 'Alle';
            frag.appendChild(btnAll);

            Object.entries(this.Config.categories).forEach(([key, val]) => {
                if (key === 'all') return;
                
                const btn = document.createElement('button');
                btn.className = 'filter-btn';
                btn.dataset.cat = key;

                // VGT HARDENING: Safe SVG Parsing via HTML parser
                const parser = new DOMParser();
                const doc = parser.parseFromString(this.getIcon(val.icon), 'text/html');
                const svgNode = doc.querySelector('svg');
                if (svgNode) {
                    btn.appendChild(svgNode);
                }
                
                btn.appendChild(document.createTextNode(' ' + val.label));
                frag.appendChild(btn);
            });

            this.safeClearOutput(this.DOM.filterContainer);
            this.DOM.filterContainer.appendChild(frag);
        },

        renderGrid(category = 'all', query = '') {
            const q = query.toLowerCase().trim();
            const frag = document.createDocumentFragment();
            
            const filtered = this.Config.tools.filter(t => {
                const matchC = category === 'all' || t.cat === category;
                const matchQ = !q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q);
                return matchC && matchQ;
            });

            if (filtered.length === 0) {
                const emptyState = document.createElement('div');
                emptyState.className = 'tools-empty-state';
                
                const iconWrap = document.createElement('div');
                iconWrap.className = 'tools-empty-icon';
                this.injectSVG(iconWrap, this.getIcon('default')); // Fallback icon
                
                const msg = document.createElement('p');
                msg.textContent = 'Keine Tools gefunden.';
                
                emptyState.appendChild(iconWrap);
                emptyState.appendChild(msg);
                
                this.safeClearOutput(this.DOM.gridEl);
                this.DOM.gridEl.appendChild(emptyState);
                return;
            }

            filtered.forEach((t, i) => {
                const color = this.Config.categories[t.cat].color;
                const a = document.createElement('a');
                
                if (t.link.startsWith('http') || t.link.startsWith('/')) {
                    a.href = t.link;
                } else {
                    a.href = (typeof vgtCore !== 'undefined' ? vgtCore.baseUrl : '') + t.link; 
                }
                
                a.className = `card color-${color} delay-${Math.min(i, 10)}`;
                
                const header = document.createElement('div');
                header.className = 'card-header';
                
                const iconDiv = document.createElement('div');
                iconDiv.className = 'card-icon';
                this.injectSVG(iconDiv, this.getIcon(t.icon));
                header.appendChild(iconDiv);
                
                if (t.badge) {
                    const badgeSpan = document.createElement('span');
                    badgeSpan.className = 'card-badge';
                    badgeSpan.textContent = t.badge; // XSS Safe
                    header.appendChild(badgeSpan);
                }

                const content = document.createElement('div');
                content.className = 'card-content';
                
                const h3 = document.createElement('h3');
                h3.className = 'card-title';
                h3.textContent = t.title; // XSS Safe
                
                const p = document.createElement('p');
                p.className = 'card-desc';
                p.textContent = t.desc; // XSS Safe
                
                content.appendChild(h3);
                content.appendChild(p);

                a.appendChild(header);
                a.appendChild(content);
                frag.appendChild(a);
            });

            this.safeClearOutput(this.DOM.gridEl);
            this.DOM.gridEl.appendChild(frag);
        },

        bindEvents() {
            this.DOM.filterContainer.addEventListener('click', (e) => {
                const btn = e.target.closest('.filter-btn');
                if (!btn) return;
                
                this.DOM.filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                this.renderGrid(btn.dataset.cat, this.DOM.searchInput.value);
            });

            this.DOM.searchInput.addEventListener('input', (e) => {
                const activeBtn = this.DOM.filterContainer.querySelector('.active');
                this.renderGrid(activeBtn ? activeBtn.dataset.cat : 'all', e.target.value);
            });
        }
    };

    DashboardEngine.init();
});
