/**
 * VGT MEDIACENTER V1.0 BETA — MULTILINGUAL ENGINE (i18n)
 * STATUS: DIAMANT VGT SUPREME
 * Languages: DE, EN, RU, ES, IT, ZH, JA, FR (100% Constant Offline)
 */
"use strict";

(function() {
    const STORAGE_KEY = 'vgt_desktop_lang';

    const LANGUAGES = [
        { code: 'de', flag: '🇩🇪', name: 'Deutsch', native: 'Deutsch' },
        { code: 'en', flag: '🇬🇧', name: 'Englisch', native: 'English' },
        { code: 'ru', flag: '🇷🇺', name: 'Russisch', native: 'Русский' },
        { code: 'es', flag: '🇪🇸', name: 'Spanisch', native: 'Español' },
        { code: 'it', flag: '🇮🇹', name: 'Italienisch', native: 'Italiano' },
        { code: 'zh', flag: '🇨🇳', name: 'Chinesisch', native: '简体中文' },
        { code: 'ja', flag: '🇯🇵', name: 'Japanisch', native: '日本語' },
        { code: 'fr', flag: '🇫🇷', name: 'Französisch', native: 'Français' }
    ];

    const UI_TRANSLATIONS = {
        titlebarBrand: {
            de: 'VGT Mediacenter V1.0 Beta',
            en: 'VGT Mediacenter V1.0 Beta',
            ru: 'VGT Mediacenter V1.0 Beta',
            es: 'VGT Mediacenter V1.0 Beta',
            it: 'VGT Mediacenter V1.0 Beta',
            zh: 'VGT Mediacenter V1.0 Beta',
            ja: 'VGT Mediacenter V1.0 Beta',
            fr: 'VGT Mediacenter V1.0 Beta'
        },
        titlebarBadge: {
            de: 'SOUVERÄNE WORKSTATION',
            en: 'SOVEREIGN WORKSTATION',
            ru: 'СУВЕРЕННАЯ СТАНЦИЯ',
            es: 'ESTACIÓN SOBERANA',
            it: 'WORKSTATION SOVRANA',
            zh: '主权桌面工作站',
            ja: 'ソブリン・ワークステーション',
            fr: 'STATION DE TRAVAIL SOUVERAINE'
        },
        winMin: {
            de: 'Minimieren',
            en: 'Minimize',
            ru: 'Свернуть',
            es: 'Minimizar',
            it: 'Riduci a icona',
            zh: '最小化',
            ja: '最小化',
            fr: 'Réduire'
        },
        winMax: {
            de: 'Maximieren / Wiederherstellen',
            en: 'Maximize / Restore',
            ru: 'Развернуть / Восстановить',
            es: 'Maximizar / Restaurar',
            it: 'Massimizza / Ripristina',
            zh: '最大化 / 还原',
            ja: '最大化 / 元に戻す',
            fr: 'Agrandir / Restaurer'
        },
        winClose: {
            de: 'Schließen',
            en: 'Close',
            ru: 'Закрыть',
            es: 'Cerrar',
            it: 'Chiudi',
            zh: '关闭',
            ja: '閉じる',
            fr: 'Fermer'
        },
        shellTitle: {
            de: 'VGT Mediacenter',
            en: 'VGT Mediacenter',
            ru: 'VGT Mediacenter',
            es: 'VGT Mediacenter',
            it: 'VGT Mediacenter',
            zh: 'VGT Mediacenter',
            ja: 'VGT Mediacenter',
            fr: 'VGT Mediacenter'
        },
        shellSubtitle: {
            de: 'V1.0 Beta • Sovereign Desktop Workstation',
            en: 'V1.0 Beta • Sovereign Desktop Workstation',
            ru: 'V1.0 Beta • Суверенная рабочая станция',
            es: 'V1.0 Beta • Estación de trabajo soberana',
            it: 'V1.0 Beta • Workstation desktop sovrana',
            zh: 'V1.0 Beta • 主权离线桌面工作站',
            ja: 'V1.0 Beta • ソブリン・デスクトップ・ワークステーション',
            fr: 'V1.0 Beta • Station de travail autonome'
        },
        badgeLocal: {
            de: '100% Lokal',
            en: '100% Local',
            ru: '100% Локально',
            es: '100% Local',
            it: '100% Locale',
            zh: '100% 本地运行',
            ja: '100% ローカル',
            fr: '100% Local'
        },
        badgeZeroCloud: {
            de: 'Zero Cloud',
            en: 'Zero Cloud',
            ru: 'Без облака',
            es: 'Sin Nube',
            it: 'Zero Cloud',
            zh: '零云端依赖',
            ja: 'ゼロクラウド',
            fr: 'Zéro Cloud'
        },
        badgePrivacy: {
            de: 'Privacy First',
            en: 'Privacy First',
            ru: 'Приватность',
            es: 'Privacidad Primero',
            it: 'Privacy Prima',
            zh: '隐私优先',
            ja: 'プライバシー優先',
            fr: 'Confidentialité'
        },
        searchPlaceholder: {
            de: 'Tools suchen (z. B. PDF, AES, Hash, PCAP)...',
            en: 'Search tools (e.g. PDF, AES, Hash, PCAP)...',
            ru: 'Поиск инструментов (напр. PDF, AES, Hash, PCAP)...',
            es: 'Buscar herramientas (ej. PDF, AES, Hash, PCAP)...',
            it: 'Cerca strumenti (es. PDF, AES, Hash, PCAP)...',
            zh: '搜索工具 (例如 PDF, AES, 哈希, PCAP)...',
            ja: 'ツールを検索 (例: PDF, AES, ハッシュ, PCAP)...',
            fr: 'Rechercher des outils (ex. PDF, AES, Hash, PCAP)...'
        },
        btnTools: {
            de: 'Tools',
            en: 'Tools',
            ru: 'Инструменты',
            es: 'Herramientas',
            it: 'Strumenti',
            zh: '工具箱',
            ja: 'ツール',
            fr: 'Outils'
        },
        modeDesktop: {
            de: 'Desktop',
            en: 'Desktop',
            ru: 'Рабочий стол',
            es: 'Escritorio',
            it: 'Desktop',
            zh: '桌面视图',
            ja: 'デスクトップ',
            fr: 'Bureau'
        },
        modeGrid: {
            de: 'Grid',
            en: 'Grid',
            ru: 'Сетка',
            es: 'Cuadrícula',
            it: 'Griglia',
            zh: '网格视图',
            ja: 'グリッド',
            fr: 'Grille'
        },
        statusActive: {
            de: 'Lokal aktiv',
            en: 'Locally Active',
            ru: 'Активен локально',
            es: 'Activo local',
            it: 'Attivo in locale',
            zh: '本地已就绪',
            ja: 'ローカル稼働中',
            fr: 'Actif localement'
        },
        footerText: {
            de: 'VGT Mediacenter V1.0 Beta — Sovereign Desktop Edition',
            en: 'VGT Mediacenter V1.0 Beta — Sovereign Desktop Edition',
            ru: 'VGT Mediacenter V1.0 Beta — Суверенное настольное издание',
            es: 'VGT Mediacenter V1.0 Beta — Edición de escritorio soberana',
            it: 'VGT Mediacenter V1.0 Beta — Edizione desktop sovrana',
            zh: 'VGT Mediacenter V1.0 Beta — 主权离线桌面版',
            ja: 'VGT Mediacenter V1.0 Beta — ソブリン・デスクトップ・エディション',
            fr: 'VGT Mediacenter V1.0 Beta — Édition de bureau autonome'
        },
        footerSub: {
            de: 'Zero Telemetry • Zero External Network Calls • 100% Offline Autark',
            en: 'Zero Telemetry • Zero External Network Calls • 100% Offline Sovereign',
            ru: 'Нулевая телеметрия • Без внешних сетевых вызовов • 100% Автономно',
            es: 'Cero Telemetría • Cero Llamadas de Red Externas • 100% Autónomo Offline',
            it: 'Zero Telemetria • Nessuna Chiamata di Rete Esterna • 100% Autonomo Offline',
            zh: '零遥测数据 • 零外部网络请求 • 100% 离线自主',
            ja: 'テレメトリ完全排除 • 外部通信ゼロ • 100% オフライン自律動作',
            fr: 'Zéro Télémétrie • Zéro Appel Réseau Externe • 100% Autonome Hors Ligne'
        },
        recentPrefix: {
            de: 'Zuletzt verwendet:',
            en: 'Recently used:',
            ru: 'Недавние:',
            es: 'Recientes:',
            it: 'Usati di recente:',
            zh: '最近使用:',
            ja: '最近使用したツール:',
            fr: 'Récemment utilisés:'
        },
        categories: {
            all: {
                de: 'Alle Tools',
                en: 'All Tools',
                ru: 'Все инструменты',
                es: 'Todas las herramientas',
                it: 'Tutti gli strumenti',
                zh: '全部工具',
                ja: 'すべてのツール',
                fr: 'Tous les outils'
            },
            core: {
                de: 'System Hub',
                en: 'System Hub',
                ru: 'Системный хаб',
                es: 'Centro del Sistema',
                it: 'Hub di Sistema',
                zh: '系统中心',
                ja: 'システムハブ',
                fr: 'Hub Système'
            },
            privacy: {
                de: 'Privatsphäre & Security',
                en: 'Privacy & Security',
                ru: 'Приватность и защита',
                es: 'Privacidad y Seguridad',
                it: 'Privacy e Sicurezza',
                zh: '隐私与安全',
                ja: 'プライバシーとセキュリティ',
                fr: 'Vie Privée & Sécurité'
            },
            media: {
                de: 'Medien & Files',
                en: 'Media & Files',
                ru: 'Медиа и файлы',
                es: 'Medios y Archivos',
                it: 'Media e File',
                zh: '媒体与文件',
                ja: 'メディアとファイル',
                fr: 'Médias et Fichiers'
            },
            calc: {
                de: 'Rechner & Calc',
                en: 'Calculators & Utility',
                ru: 'Калькуляторы',
                es: 'Calculadoras',
                it: 'Calcolatori',
                zh: '计算与换算',
                ja: '計算・ユーティリティ',
                fr: 'Calculateurs'
            },
            dev: {
                de: 'Entwicklung & Dev',
                en: 'Development & Dev',
                ru: 'Разработка',
                es: 'Desarrollo y Código',
                it: 'Sviluppo e Codice',
                zh: '开发者工具',
                ja: '開発・コード',
                fr: 'Développement'
            },
            creative: {
                de: 'Kreativ & Audio',
                en: 'Creative & Audio',
                ru: 'Творчество и аудио',
                es: 'Creatividad y Audio',
                it: 'Creatività e Audio',
                zh: '创意与音频',
                ja: 'クリエイティブ・音声',
                fr: 'Créatif & Audio'
            },
            mind: {
                de: 'Psyche & Fokus',
                en: 'Mind & Focus',
                ru: 'Психика и фокус',
                es: 'Mente y Enfoque',
                it: 'Mente e Concentrazione',
                zh: '心理与专注',
                ja: 'マインド・集中',
                fr: 'Esprit & Focus'
            },
            cosmos: {
                de: 'Kosmos & Bio',
                en: 'Cosmos & Bio',
                ru: 'Космос и био',
                es: 'Cosmos y Bio',
                it: 'Cosmo e Bio',
                zh: '宇宙与生物节律',
                ja: '宇宙とバイオリズム',
                fr: 'Cosmos & Bio'
            }
        },
        langModal: {
            title: {
                de: 'Sprache auswählen / Choose Language',
                en: 'Choose Your Language',
                ru: 'Выберите язык интерфейса',
                es: 'Selecciona tu idioma',
                it: 'Scegli la tua lingua',
                zh: '选择系统语言',
                ja: '表示言語を選択してください',
                fr: 'Choisissez votre langue'
            },
            subtitle: {
                de: 'Wähle deine bevorzugte Sprache für das VGT Mediacenter V1.0 Beta. Kann jederzeit oben geändert werden.',
                en: 'Select your preferred language for VGT Mediacenter V1.0 Beta. You can change this anytime from the top bar.',
                ru: 'Выберите язык для VGT Mediacenter V1.0 Beta. Вы можете изменить его в любое время в верхней панели.',
                es: 'Selecciona tu idioma para VGT Mediacenter V1.0 Beta. Puedes cambiarlo en cualquier momento arriba.',
                it: 'Seleziona la tua lingua per VGT Mediacenter V1.0 Beta. Puoi modificarla in qualsiasi momento in alto.',
                zh: '请为 VGT Mediacenter V1.0 Beta 选择系统语言。您可以随时在顶部导航栏中更改此设置。',
                ja: 'VGT Mediacenter V1.0 Betaの言語を選択してください。上部バーからいつでも変更可能です。',
                fr: 'Sélectionnez votre langue pour VGT Mediacenter V1.0 Beta. Modifiable à tout moment dans la barre supérieure.'
            },
            confirm: {
                de: 'Sprache aktivieren',
                en: 'Apply Language',
                ru: 'Применить язык',
                es: 'Aplicar idioma',
                it: 'Applica lingua',
                zh: '应用语言设置',
                ja: '言語を適用する',
                fr: 'Appliquer la langue'
            }
        },
        failsafe: {
            offlineTitle: {
                de: 'MODUL OFFLINE',
                en: 'MODULE OFFLINE',
                ru: 'МОДУЛЬ ОФФЛАЙН',
                es: 'MÓDULO DESCONECTADO',
                it: 'MODULO OFFLINE',
                zh: '模块离线',
                ja: 'モジュールオフライン',
                fr: 'MODULE HORS LIGNE'
            },
            backHub: {
                de: 'Zurück zum System Hub',
                en: 'Back to System Hub',
                ru: 'Вернуться в System Hub',
                es: 'Volver al Centro del Sistema',
                it: 'Torna al System Hub',
                zh: '返回系统中心',
                ja: 'システムハブに戻る',
                fr: 'Retour au Hub Système'
            }
        }
    };

    // Translations for all 40 Tools (Titles & Descriptions)
    const TOOL_TRANSLATIONS = {
        'dashboard': {
            title: { de: 'Dashboard', en: 'Dashboard', ru: 'Панель управления', es: 'Panel Principal', it: 'Dashboard', zh: '仪表盘', ja: 'ダッシュボード', fr: 'Tableau de bord' },
            desc: { de: 'System-Hub und Tool-Matrix', en: 'System Hub and Tool Matrix', ru: 'Системный хаб и матрица инструментов', es: 'Centro de sistema y matriz de herramientas', it: 'Hub di sistema e matrice degli strumenti', zh: '系统中心与工具矩阵', ja: 'システムハブとツールマトリックス', fr: 'Hub système et matrice d’outils' }
        },
        'hashchecker': {
            title: { de: 'Hashchecker', en: 'Hash Checker', ru: 'Проверка хеша', es: 'Comprobador de Hash', it: 'Verifica Hash', zh: '哈希校验器', ja: 'ハッシュチェッカー', fr: 'Vérificateur de Hash' },
            desc: { de: 'Datei-Integrität mit SHA-Prüfung', en: 'File integrity with SHA verification', ru: 'Проверка целостности файлов по SHA', es: 'Integridad de archivos con verificación SHA', it: 'Integrità file con verifica SHA', zh: '基于 SHA 的本地文件完整性校验', ja: 'SHA検証によるファイル整合性確認', fr: 'Intégrité des fichiers par vérification SHA' }
        },
        'har': {
            title: { de: 'Browserdaten Analyse', en: 'HAR Browser Analysis', ru: 'Анализ HAR файлов', es: 'Análisis de Navegador HAR', it: 'Analisi Dati Browser HAR', zh: 'HAR 浏览器数据分析', ja: 'HARブラウザ解析', fr: 'Analyse de Données HAR' },
            desc: { de: 'HAR-Dateien lokal auswerten', en: 'Analyze HAR archive files locally', ru: 'Локальный анализ дампов браузера HAR', es: 'Evalúa archivos HAR de forma local', it: 'Analizza i file HAR localmente', zh: '本地离线分析网络 HAR 抓包', ja: 'HARファイルをローカルで解析', fr: 'Analyser les fichiers HAR localement' }
        },
        'stegano': {
            title: { de: 'Stegano Vault', en: 'Stegano Vault', ru: 'Стеганохранилище', es: 'Bóveda Esteganográfica', it: 'Caveau Stegano', zh: '隐写密室 (Stegano)', ja: 'ステガノ・ヴォールト', fr: 'Coffre Stéganographique' },
            desc: { de: 'Nachrichten in Bilder einbetten', en: 'Conceal secret messages inside images', ru: 'Внедрение скрытых сообщений в изображения', es: 'Oculta mensajes secretos dentro de imágenes', it: 'Incorpora messaggi segreti nelle immagini', zh: '将隐秘数据隐藏嵌入图像像素中', ja: '画像内に秘密メッセージを埋め込み', fr: 'Dissimuler des messages secrets dans des images' }
        },
        'truthlense': {
            title: { de: 'Truthlense', en: 'Truthlense Diff', ru: 'Truthlense (Сравнение)', es: 'Truthlense Comparador', it: 'Truthlense Confronto', zh: '真实之镜 (文本比对)', ja: 'トゥルースレンズ (差分検出)', fr: 'Truthlense Diff' },
            desc: { de: 'Text- und Dokument-Diffs prüfen', en: 'Inspect text and document differences', ru: 'Анализ различий текстов и документов', es: 'Inspecciona diferencias en texto y documentos', it: 'Verifica le differenze tra testi e documenti', zh: '高精度比对文本与文档差异', ja: 'テキストや文書の差分を厳密に検出', fr: 'Inspecter les différences de textes et documents' }
        },
        'whistle': {
            title: { de: 'VisionWhistleBlow', en: 'VisionWhistleBlow', ru: 'VisionWhistleBlow', es: 'VisionWhistleBlow', it: 'VisionWhistleBlow', zh: '机密脱敏器 (WhistleBlow)', ja: '機密黒塗り (WhistleBlow)', fr: 'VisionWhistleBlow' },
            desc: { de: 'Text und PDF sicher schwärzen', en: 'Securely redact text and PDF documents', ru: 'Безопасное цензурирование текста и PDF', es: 'Censura de forma segura texto y PDF', it: 'Oscura in modo sicuro testi e PDF', zh: '对文本和 PDF 文档进行永久不可逆脱敏', ja: 'テキストとPDFを安全に黒塗り・機密保護', fr: 'Biffer et caviarder textes et PDF en toute sécurité' }
        },
        'meta-clean': {
            title: { de: 'Metadata Cleaner', en: 'Metadata Cleaner', ru: 'Очистка метаданных', es: 'Limpiador de Metadatos', it: 'Pulitore Metadati', zh: '元数据净化器', ja: 'メタデータ・クリーナー', fr: 'Nettoyeur de Métadonnées' },
            desc: { de: 'EXIF- und GPS-Spuren entfernen', en: 'Strip EXIF and GPS tracking traces', ru: 'Удаление скрытых меток EXIF и GPS', es: 'Elimina rastros EXIF y coordenadas GPS', it: 'Rimuovi tracce EXIF e coordinate GPS', zh: '彻底剥离照片中的 EXIF 与 GPS 痕迹', ja: 'EXIFやGPS位置情報の痕跡を完全削除', fr: 'Supprimer les traces EXIF et coordonnées GPS' }
        },
        'fingerprint': {
            title: { de: 'Fingerprint Analyzer', en: 'Fingerprint Analyzer', ru: 'Анализатор фингерпринта', es: 'Analizador de Huella Digital', it: 'Analizzatore Fingerprint', zh: '浏览器指纹分析器', ja: 'フィンガープリント解析', fr: 'Analyseur d’Empreinte' },
            desc: { de: 'Browser-Fingerprint sichtbar machen', en: 'Inspect and visualize browser fingerprints', ru: 'Визуализация параметров отпечатка браузера', es: 'Visualiza la huella de tu navegador', it: 'Rendi visibile il fingerprint del browser', zh: '深度探测并可视化浏览器硬件指纹特征', ja: 'ブラウザの指紋情報を可視化・監査', fr: 'Révéler et analyser l’empreinte de votre navigateur' }
        },
        'pw-check': {
            title: { de: 'Passwort Check', en: 'Password Checker', ru: 'Проверка паролей', es: 'Verificador de Contraseñas', it: 'Verifica Password', zh: '密码强度评估器', ja: 'パスワード強度診断', fr: 'Audit de Mots de Passe' },
            desc: { de: 'Passwortstärke lokal bewerten', en: 'Evaluate password entropy locally', ru: 'Локальная оценка энтропии и стойкости паролей', es: 'Evalúa la robustez de contraseñas localmente', it: 'Valuta la robustezza delle password in locale', zh: '纯离线计算密码熵与破解所需算力', ja: 'パスワードの強度とエントロピーをローカル診断', fr: 'Évaluer la robustesse des mots de passe hors ligne' }
        },
        'aes': {
            title: { de: 'AES Encryption', en: 'AES Encryption', ru: 'Шифрование AES', es: 'Cifrado AES', it: 'Cifratura AES', zh: 'AES 高强度加密', ja: 'AES暗号化', fr: 'Chiffrement AES' },
            desc: { de: 'Text und Dateien lokal verschlüsseln', en: 'Encrypt text and files locally with AES-256', ru: 'Локальное шифрование файлов и текстов (AES-256)', es: 'Cifra texto y archivos localmente con AES-256', it: 'Cifra testi e file localmente con AES-256', zh: '基于 AES-256 的本地文本与文件极速加解密', ja: 'AES-256によるテキストおよびファイルのローカル暗号化', fr: 'Chiffrer textes et fichiers localement avec AES-256' }
        },
        'qr': {
            title: { de: 'QR Generator', en: 'QR Code Forge', ru: 'Генератор QR', es: 'Generador QR', it: 'Generatore QR', zh: '离线 QR 码工坊', ja: 'QRコード生成', fr: 'Générateur de QR Code' },
            desc: { de: 'Offline QR-Codes erstellen & scannen', en: 'Generate and scan offline QR codes', ru: 'Создание и сканирование QR-кодов без сети', es: 'Crea y escanea códigos QR sin conexión', it: 'Crea e scansiona codici QR offline', zh: '零联网生成高精度 QR 码并解析图像', ja: 'オフラインでQRコードを生成・スキャン', fr: 'Créer et scanner des codes QR 100% hors ligne' }
        },
        'secret-scan': {
            title: { de: 'Secret Scanner Pro', en: 'Secret Scanner Pro', ru: 'Сканер секретов', es: 'Escáner de Secretos', it: 'Scanner Segreti', zh: '机密泄露扫描器', ja: 'シークレット・スキャナー', fr: 'Scanner de Secrets Pro' },
            desc: { de: 'Keys, Tokens und .env-Leaks lokal finden', en: 'Detect API keys, tokens and env leaks', ru: 'Поиск API ключей, токенов и утечек .env', es: 'Detecta claves API, tokens y fugas en archivos', it: 'Trova chiavi API, token e leak di configurazione', zh: '扫描代码与配置文件中的 API 密钥与敏感凭据', ja: 'APIキー、トークン、環境変数の流出をローカル検知', fr: 'Détecter clés API, jetons et fuites sensibles' }
        },
        'url-clean': {
            title: { de: 'URL Cleaner Pro', en: 'URL Cleaner Pro', ru: 'Очиститель URL', es: 'Limpiador de URL', it: 'Pulitore URL Pro', zh: 'URL 跟踪参数剥离器', ja: 'URLクリーナー', fr: 'Nettoyeur d’URL Pro' },
            desc: { de: 'Tracking-Parameter lokal entfernen', en: 'Strip tracking parameters from URLs', ru: 'Удаление UTM и трекинг-параметров из ссылок', es: 'Elimina parámetros de seguimiento de enlaces', it: 'Rimuovi i parametri di tracciamento dagli URL', zh: '清除链接中的 UTM、FBCLID 等跟踪探针', ja: 'URLからトラッキング・分析用パラメータを除去', fr: 'Épurer les URLs de tous paramètres de pistage' }
        },
        'img-conv': {
            title: { de: 'Bild Converter', en: 'Image Converter', ru: 'Конвертер изображений', es: 'Conversor de Imágenes', it: 'Convertitore Immagini', zh: '图像格式转换器', ja: '画像フォーマット変換', fr: 'Convertisseur d’Images' },
            desc: { de: 'Bilder lokal konvertieren (WebP, PNG, JPG)', en: 'Convert images locally (WebP, PNG, JPG)', ru: 'Локальное преобразование WebP, PNG, JPG', es: 'Convierte imágenes localmente a WebP, PNG, JPG', it: 'Converti immagini localmente (WebP, PNG, JPG)', zh: '本地极速转换 WebP、PNG、JPG 与 AVIF', ja: '画像をローカルで一括変換 (WebP, PNG, JPG)', fr: 'Convertir vos images localement (WebP, PNG, JPG)' }
        },
        'img-comp': {
            title: { de: 'Bild Kompressor', en: 'Image Compressor', ru: 'Сжатие изображений', es: 'Compresor de Imágenes', it: 'Compressore Immagini', zh: '智能图像压缩器', ja: '画像コンプレッサー', fr: 'Compresseur d’Images' },
            desc: { de: 'Bildgrößen lokal ohne Qualitätsverlust reduzieren', en: 'Losslessly reduce image file sizes locally', ru: 'Локальное сжатие графики без потери качества', es: 'Reduce el tamaño de imágenes sin perder calidad', it: 'Riduci le dimensioni delle immagini senza perdita', zh: '在保留视觉细节的前提下大幅压缩文件体积', ja: '品質を維持したまま画像サイズを強力圧縮', fr: 'Réduire le poids des images sans perte visuelle' }
        },
        'pdf-merge': {
            title: { de: 'PDF Merge', en: 'PDF Merger', ru: 'Объединение PDF', es: 'Fusionar PDF', it: 'Unione PDF', zh: 'PDF 合并工坊', ja: 'PDF結合', fr: 'Fusionneur de PDF' },
            desc: { de: 'PDFs lokal zusammenführen', en: 'Merge multiple PDF files into one locally', ru: 'Локальное объединение нескольких PDF документов', es: 'Une varios archivos PDF de forma local', it: 'Unisci più file PDF localmente in uno solo', zh: '在本地内存中将多份 PDF 文档无缝合并', ja: '複数のPDFファイルをローカルで1つに結合', fr: 'Fusionner plusieurs documents PDF localement' }
        },
        'pdf-split': {
            title: { de: 'PDF Split', en: 'PDF Splitter', ru: 'Разделение PDF', es: 'Dividir PDF', it: 'Divisione PDF', zh: 'PDF 页面分割器', ja: 'PDF分割・抽出', fr: 'Diviseur de PDF' },
            desc: { de: 'PDF-Seiten lokal extrahieren', en: 'Extract pages from PDF files locally', ru: 'Извлечение отдельных страниц из PDF документов', es: 'Extrae páginas seleccionadas de archivos PDF', it: 'Estrai pagine singole dai file PDF in locale', zh: '自由提取、拆分与裁切指定 PDF 页面', ja: 'PDFから特定のページをローカル抽出・分離', fr: 'Extraire des pages spécifiques de fichiers PDF' }
        },
        'audio-conv': {
            title: { de: 'Audio Studio Pro', en: 'Audio Studio Pro', ru: 'Аудиостудия Pro', es: 'Estudio de Audio Pro', it: 'Studio Audio Pro', zh: '音频工作站 Pro', ja: 'オーディオ・スタジオ Pro', fr: 'Studio Audio Pro' },
            desc: { de: 'Audio lokal analysieren und konvertieren', en: 'Analyze, inspect and convert audio files locally', ru: 'Локальный спектральный анализ и конвертация звука', es: 'Analiza, edita y convierte audio localmente', it: 'Analizza e converti file audio localmente', zh: '本地频谱可视化、无损录音与音频转码', ja: 'ローカルで音声ファイルの波形解析・変換', fr: 'Analyser, inspecter et convertir l’audio en local' }
        },
        'zipmaster': {
            title: { de: 'ZIP Master', en: 'ZIP Master', ru: 'ZIP Мастер', es: 'ZIP Master', it: 'ZIP Master', zh: 'ZIP 归档大师', ja: 'ZIPマスター', fr: 'ZIP Master' },
            desc: { de: 'Archive lokal prüfen und entpacken', en: 'Inspect, verify and extract zip archives locally', ru: 'Локальная проверка и распаковка ZIP-архивов', es: 'Inspecciona y descomprime archivos ZIP localmente', it: 'Ispeziona ed estrai archivi ZIP localmente', zh: '离线检视、打包与解压 ZIP 压缩档案', ja: 'ZIPアーカイブの安全な検証・展開・作成', fr: 'Inspecter et extraire des archives ZIP localement' }
        },
        'big5': {
            title: { de: 'Big5 Profiling', en: 'Big5 Personality Profiler', ru: 'Профиль личности Big5', es: 'Perfil de Personalidad Big5', it: 'Profilo Personalità Big5', zh: '大五人格测定 (Big Five)', ja: 'ビッグファイブ性格診断', fr: 'Profil Psychologique Big5' },
            desc: { de: 'Persönlichkeitsprofil wissenschaftlich visualisieren', en: 'Scientifically evaluate the Big Five traits', ru: 'Научный анализ пяти факторов личности', es: 'Evalúa científicamente los rasgos del modelo Big Five', it: 'Valutazione scientifica dei tratti di personalità Big5', zh: '基于现代心理学五大维度全方位透视个体特质', ja: '心理学に基づく主要5因子の性格特性を詳細判定', fr: 'Analyser les 5 grands traits de personnalité humaine' }
        },
        'jung': {
            title: { de: 'Archetypen', en: 'Jungian Archetypes', ru: 'Архетипы Юнга', es: 'Arquetipos de Jung', it: 'Archetipi di Jung', zh: '荣格原型深度测试', ja: 'ユング原型分析', fr: 'Archétypes Jungiens' },
            desc: { de: 'Jung-Matrix lokal berechnen', en: 'Compute Carl Jung psychological archetypes', ru: 'Вычисление матрицы архетипов Карла Юнга', es: 'Calcula tu matriz de arquetipos psicológicos', it: 'Calcola la tua matrice degli archetipi di Jung', zh: '探索潜意识模式，计算十二种原型能量分布', ja: 'ユング心理学に基づく原型マトリックスを算出', fr: 'Calculer la matrice des archétypes de Carl Jung' }
        },
        'stress': {
            title: { de: 'Stress & Fokus', en: 'Stress & Focus Analyzer', ru: 'Стресс и фокус', es: 'Estrés y Enfoque', it: 'Stress e Concentrazione', zh: '压力与认知负荷分析', ja: 'ストレス＆フォーカス', fr: 'Stress & Concentration' },
            desc: { de: 'Mentale Last und kognitiven Zustand bewerten', en: 'Evaluate cognitive load and mental stress levels', ru: 'Оценка когнитивной нагрузки и стресса', es: 'Evalúa la carga cognitiva y el nivel de estrés', it: 'Valuta il carico cognitivo e i livelli di stress', zh: '科学度量认知负担，提供专注力调优建议', ja: '認知負荷とストレス状態を客観的に評価', fr: 'Évaluer la charge cognitive et le niveau de stress' }
        },
        'moon': {
            title: { de: 'Mondphasen', en: 'Lunar Telemetry', ru: 'Лунный календарь', es: 'Fases Lunares', it: 'Fasi Lunari', zh: '月相与天文遥测', ja: '月相・月齢テレメトリ', fr: 'Phases Lunaires' },
            desc: { de: 'Lunare Telemetrie und Ephemeriden berechnen', en: 'Compute lunar ephemeris and exact orbital phase', ru: 'Вычисление лунных эфемерид и фаз орбиты', es: 'Calcula efemérides lunares y fases orbitales', it: 'Calcola le effemeridi lunari e le fasi esatte', zh: '高精度计算月球公转轨迹、照亮比例与日历', ja: '月齢、軌道座標、月相サイクルを精密計算', fr: 'Calculer les éphémérides et phases de la Lune' }
        },
        'weather': {
            title: { de: 'Wetter Live', en: 'Weather Station', ru: 'Метеостанция', es: 'Estación Meteorológica', it: 'Stazione Meteo', zh: '气象站', ja: 'ウェザーステーション', fr: 'Station Météo' },
            desc: { de: 'Wetterdaten abrufen', en: 'Weather telemetry and atmospheric forecasts', ru: 'Атмосферные данные и прогнозы погоды', es: 'Datos meteorológicos y previsiones atmosféricas', it: 'Dati meteorologici e previsioni atmosferiche', zh: '获取大气压、湿度与未来天气动向', ja: '気象データと大気予報の観測', fr: 'Données météo et prévisions atmosphériques' }
        },
        'bio': {
            title: { de: 'Biorhythmus', en: 'Biorhythm Engine', ru: 'Биоритмы', es: 'Biorritmos', it: 'Bioritmo', zh: '生物节律周期推演', ja: 'バイオリズム・エンジン', fr: 'Biorythmes' },
            desc: { de: 'Physische, emotionale & geistige Zyklen berechnen', en: 'Calculate physical, emotional and mental sine cycles', ru: 'Расчет физических, эмоциональных и ментальных циклов', es: 'Calcula ciclos físicos, emocionales e intelectuales', it: 'Calcola i cicli fisici, emotivi e intellettuali', zh: '精确推算体力、情绪与智力三重正弦波动曲线', ja: '身体・感情・知性のサイン波サイクルを精密算出', fr: 'Calculer les cycles physiques, émotionnels et mentaux' }
        },
        'cal': {
            title: { de: 'Kalorien Pro', en: 'Calorie & Macro Calc', ru: 'Калькулятор калорий', es: 'Calorías y Macros', it: 'Calorie e Macro Pro', zh: '能量与营养摄入计算器', ja: 'カロリー＆PFCバランス', fr: 'Calculateur de Calories' },
            desc: { de: 'Kalorien und Makronährstoffe berechnen', en: 'Compute BMR, TDEE and target macronutrient splits', ru: 'Расчет метаболизма (BMR, TDEE) и белков/жиров/углеводов', es: 'Calcula tasa metabólica, TDEE y distribución de macros', it: 'Calcola metabolismo basale (BMR), TDEE e macronutrienti', zh: '测算基础代谢率 (BMR)、每日总消耗 (TDEE) 与三大营养素', ja: '基礎代謝量(BMR)と活動量(TDEE)から三大栄養素を算出', fr: 'Calculer le métabolisme de base, TDEE et macros' }
        },
        'unit': {
            title: { de: 'Einheiten', en: 'Unit Converter', ru: 'Конвертер единиц', es: 'Conversor de Unidades', it: 'Convertitore Unità', zh: '万能单位换算器', ja: '単位コンバーター', fr: 'Convertisseur d’Unités' },
            desc: { de: 'Einheiten lokal umrechnen (Länge, Druck, Energie)', en: 'Convert units locally (length, pressure, energy)', ru: 'Преобразование физических величин без сети', es: 'Convierte magnitudes físicas y unidades al instante', it: 'Converti unità di misura (lunghezza, pressione, energia)', zh: '本地极速换算长度、面积、压强、能量与数据单位', ja: '長さ、圧力、エネルギー、データ量を即座に換算', fr: 'Convertir les unités (longueur, pression, énergie)' }
        },
        'json': {
            title: { de: 'JSON Tools', en: 'JSON Inspector & Format', ru: 'JSON Инспектор', es: 'Herramientas JSON', it: 'Strumenti JSON', zh: 'JSON 深度格式化与校验', ja: 'JSONフォーマッター＆検証', fr: 'Outils JSON' },
            desc: { de: 'JSON formatieren, validieren und reparieren', en: 'Format, validate, repair and traverse JSON payloads', ru: 'Форматирование, валидация и исправление JSON', es: 'Formatea, valida y repara estructuras JSON', it: 'Formatta, valida e ripara carichi utili JSON', zh: '格式化、语法纠错、压缩并可视化 JSON 结构树', ja: 'JSONの整形・構文検証・修復および階層展開', fr: 'Formater, valider et réparer vos structures JSON' }
        },
        'cdash': {
            title: { de: 'CSV Explorer', en: 'CSV / Data Explorer', ru: 'CSV Эксплорер', es: 'Explorador CSV', it: 'Esploratore CSV', zh: 'CSV / 数据透视面板', ja: 'CSVデータ・エクスプローラー', fr: 'Explorateur CSV' },
            desc: { de: 'CSV/JSON lokal visualisieren und filtern', en: 'Visualize, sort and filter tabular datasets locally', ru: 'Локальная визуализация и фильтрация таблиц CSV/JSON', es: 'Visualiza, ordena y filtra datos tabulares localmente', it: 'Visualizza e filtra dataset tabulari in locale', zh: '纯前端渲染大型表格数据，支持动态排序与统计', ja: 'CSVや表形式データをローカルで可視化・検索・抽出', fr: 'Visualiser, trier et filtrer des tableaux CSV localement' }
        },
        'coder': {
            title: { de: 'Code Omega', en: 'Code Omega Sandbox', ru: 'Code Omega', es: 'Code Omega', it: 'Code Omega', zh: 'Code Omega 代码分析器', ja: 'コード・オメガ (Code Omega)', fr: 'Code Omega' },
            desc: { de: 'Code-Diffs und Syntax lokal analysieren', en: 'Inspect code diffs, tokens and AST syntax locally', ru: 'Локальный анализ синтаксиса и диффов исходного кода', es: 'Analiza código, sintaxis y diferencias en local', it: 'Analizza differenze di codice e sintassi in locale', zh: '多语言代码高亮对比、语法高频词解析与结构审视', ja: 'コード差分や構文トークンをローカルで高速解析', fr: 'Analyser la syntaxe et les diffs de code en local' }
        },
        'cipherflow': {
            title: { de: 'Cipher-Flow', en: 'Cipher-Flow Studio', ru: 'Cipher-Flow', es: 'Cipher-Flow', it: 'Cipher-Flow', zh: '密码流水线 (Cipher-Flow)', ja: 'サイファー・フロー (Cipher-Flow)', fr: 'Cipher-Flow' },
            desc: { de: 'Krypto-Pipelines bauen und verketten', en: 'Design, chain and execute cryptographic pipelines', ru: 'Построение цепочек шифрования и преобразований', es: 'Diseña y encadena pipelines criptográficos complejos', it: 'Progetta e concatena pipeline crittografiche', zh: '自由拼接 Base64、Hex、AES 与散列算法执行链路', ja: '暗号化・復号化の多段パイプラインを自由に構築', fr: 'Concevoir et enchaîner des pipelines cryptographiques' }
        },
        'manifest': {
            title: { de: 'Manifest Forge', en: 'Manifest Forge', ru: 'Кузница манифестов', es: 'Forja de Manifiestos', it: 'Forgia Manifesti', zh: '数字清单工坊 (Manifest)', ja: 'マニフェスト・フォージ', fr: 'Forge de Manifestes' },
            desc: { de: 'SHA-256 Datei-Manifeste bauen und prüfen', en: 'Build and verify cryptographic SHA-256 file manifests', ru: 'Создание и сверка SHA-256 манифестов целостности', es: 'Genera y verifica manifiestos criptográficos SHA-256', it: 'Crea e verifica manifesti SHA-256 per directory', zh: '为整个目录批量生成与验证 SHA-256 完整性清单', ja: 'ファイル群のSHA-256整合性マニフェストを作成・監査', fr: 'Générer et vérifier des manifestes SHA-256 de fichiers' }
        },
        'hexmap': {
            title: { de: 'Hexmap', en: 'Hexmap Binary Inspector', ru: 'Hexmap инспектор', es: 'Hexmap Inspector Binario', it: 'Hexmap Ispettore Binario', zh: 'Hexmap 二进制探针', ja: 'ヘックスマップ (Hexmap)', fr: 'Inspecteur Binaire Hexmap' },
            desc: { de: 'Dateien binär und hexadezimal inspizieren', en: 'Inspect raw byte streams and hex dump offsets', ru: 'Низкоуровневый шестнадцатеричный анализ байтов', es: 'Inspecciona volcados hexadecimales y streams de bytes', it: 'Ispeziona dump esadecimali e byte grezzi', zh: '深入字节流底层，检视文件魔数、偏移量与十六进制表', ja: '生バイト列、マジックナンバー、ヘックスダンプを精査', fr: 'Inspecter les flux d’octets et dumps hexadécimaux' }
        },
        'packetviz': {
            title: { de: 'Packet-Viz', en: 'Packet-Viz PCAP', ru: 'Packet-Viz', es: 'Packet-Viz', it: 'Packet-Viz', zh: '网络数据包可视化 (Packet-Viz)', ja: 'パケット解析 (Packet-Viz)', fr: 'Packet-Viz PCAP' },
            desc: { de: 'PCAP-Daten lokal visualisieren', en: 'Visualize PCAP network captures and traffic nodes', ru: 'Визуализация дампов трафика PCAP без отправки в сеть', es: 'Visualiza capturas de red PCAP de forma privada', it: 'Visualizza pacchetti di rete PCAP in totale privacy', zh: '将 Wireshark / PCAP 抓包文件转化为拓扑热力与节点流', ja: 'PCAPキャプチャファイルを安全に可視化・トラフィック分析', fr: 'Visualiser des captures réseau PCAP en toute confidentialité' }
        },
        'gitleaker': {
            title: { de: 'Git Checker', en: 'Git Checker', ru: 'Git Checker', es: 'Git Checker', it: 'Git Checker', zh: 'Git 仓库安全卫士', ja: 'Gitチェッカー', fr: 'Vérificateur Git' },
            desc: { de: 'Leaks vor dem Push in Commits finden', en: 'Catch credentials and secrets before git push', ru: 'Поиск паролей и токенов перед отправкой коммита', es: 'Detecta credenciales antes de hacer git push', it: 'Rileva credenziali prima di effettuare il push', zh: '在代码推送到远端之前捕获凭证与意外包含的大文件', ja: 'Gitプッシュ前に秘密鍵や機密情報の混入を未然防止', fr: 'Intercepter identifiants et secrets avant le push' }
        },
        'readme': {
            title: { de: 'ReadMe Generator', en: 'ReadMe Generator', ru: 'Генератор ReadMe', es: 'Generador de ReadMe', it: 'Generatore ReadMe', zh: '工程 ReadMe 锻造引擎', ja: 'ReadMeジェネレーター', fr: 'Générateur de ReadMe' },
            desc: { de: 'Projekt-Readmes strukturiert bauen', en: 'Draft professional markdown project documentation', ru: 'Создание профессиональной документации в Markdown', es: 'Genera documentación profesional en Markdown', it: 'Crea documentazione di progetto professionale in Markdown', zh: '快速构建符合工业标准的开源项目 Markdown 说明文档', ja: '構造化された美しいMarkdown形式のドキュメントを即座に作成', fr: 'Générer une documentation Markdown de projet professionnelle' }
        },
        'color': {
            title: { de: 'Farb Tools', en: 'Color Suite Pro', ru: 'Инструменты цвета', es: 'Suite de Color', it: 'Strumenti Colore', zh: '色彩空间调控台', ja: 'カラースイート Pro', fr: 'Outils Couleur' },
            desc: { de: 'Farbräume konvertieren (HEX, RGB, HSL, OKLCH)', en: 'Convert between HEX, RGB, HSL and OKLCH color spaces', ru: 'Преобразование цветовых пространств HEX, RGB, OKLCH', es: 'Convierte espacios de color HEX, RGB, HSL y OKLCH', it: 'Converti spazi colore tra HEX, RGB, HSL e OKLCH', zh: '在 HEX、RGB、HSL、OKLCH 间无缝转换并测试对比度', ja: 'HEX, RGB, HSL, OKLCH間の色空間変換とコントラスト比検証', fr: 'Convertir les espaces colorimétriques HEX, RGB, HSL, OKLCH' }
        },
        'freq': {
            title: { de: 'Frequenzen', en: 'Binaural Frequency Studio', ru: 'Генератор частот', es: 'Estudio de Frecuencias', it: 'Studio Frequenze', zh: '双耳节拍与声学振荡器', ja: '周波数スタジオ', fr: 'Générateur de Fréquences' },
            desc: { de: 'Binaural Beats und Solfeggio generieren', en: 'Synthesize pure sine binaural beats and Solfeggio tones', ru: 'Генерация бинауральных ритмов и сольфеджио', es: 'Sintetiza ondas binaurales y tonos Solfeggio puros', it: 'Genera battiti binaurali puri e toni Solfeggio', zh: '纯数学计算合成双耳节拍、舒曼波与索尔费吉奥疗愈音频', ja: '高精度正弦波によるバイノーラルビートやソルフェジオ周波数生成', fr: 'Générer des battements binauraux et fréquences Solfeggio' }
        },
        'energy': {
            title: { de: 'Stromrechner', en: 'Energy & Power Calc', ru: 'Калькулятор электричества', es: 'Calculadora de Energía', it: 'Calcolatore Energetico', zh: '电力能耗与电费核算器', ja: '電力・電気料金計算機', fr: 'Calculateur d’Énergie' },
            desc: { de: 'Kosten und Stromverbrauch berechnen', en: 'Compute device electricity consumption and annual costs', ru: 'Расчет энергопотребления и годовых расходов', es: 'Calcula el consumo de energía y coste acumulado', it: 'Calcola il consumo energetico e i costi annuali', zh: '精准核算各类设备运行能耗、瞬时功率与年度电费账单', ja: '機器の消費電力、稼働時間、年間電気料金を即座にシミュレーション', fr: 'Calculer la consommation électrique et les coûts annuels' }
        },
        'med': {
            title: { de: 'Meditation', en: 'Meditation Soundscapes', ru: 'Медитация и звуки', es: 'Meditación y Paisajes Sonoros', it: 'Meditazione e Soundscape', zh: '冥想与声景座舱', ja: 'メディテーション・音響空間', fr: 'Méditation & Ambiances' },
            desc: { de: 'Fokus-Timer und generative Soundscapes starten', en: 'Focus timer, breathing pacer and generative ambient soundscapes', ru: 'Таймер медитации, дыхательный метроном и эмбиент', es: 'Temporizador de foco, guía de respiración y paisajes sonoros', it: 'Timer di concentrazione, guida al respiro e paesaggi sonori', zh: '呼吸节拍器、正念计时器与纯本地合成的自然白噪音', ja: '呼吸ガイダンス、集中タイマー、生成アンビエント音響の再生', fr: 'Minuteur de concentration, guide respiratoire et ambiances' }
        }
    };

    let currentLang = 'de';

    function initLanguage() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && LANGUAGES.some(l => l.code === saved)) {
            currentLang = saved;
        } else {
            // First time opening the application!
            // Try to detect user browser language if matching one of our 8
            const nav = (navigator.language || navigator.userLanguage || 'de').toLowerCase();
            const matched = LANGUAGES.find(l => nav.startsWith(l.code));
            currentLang = matched ? matched.code : 'de';

            // Show first-launch prompt
            setTimeout(() => {
                showLanguageModal(true);
            }, 250);
        }
        applyLanguage(currentLang);
        setupMutationObserver();
    }

    function setLanguage(code) {
        if (!LANGUAGES.some(l => l.code === code)) return;
        currentLang = code;
        localStorage.setItem(STORAGE_KEY, code);
        applyLanguage(code);
        closeLanguageModal();
    }

    function applyLanguage(code) {
        document.documentElement.lang = code;

        // 1. Update Titlebar Brand & Badge
        const titlebarBrand = document.querySelector('.vgt-titlebar-title');
        if (titlebarBrand) titlebarBrand.textContent = UI_TRANSLATIONS.titlebarBrand[code] || 'VGT Mediacenter V1.0 Beta';

        const titlebarBadge = document.querySelector('.vgt-titlebar-badge');
        if (titlebarBadge) titlebarBadge.textContent = UI_TRANSLATIONS.titlebarBadge[code] || 'SOVEREIGN WORKSTATION';

        // 2. Update Window Buttons
        const winMin = document.getElementById('vgt-win-min');
        if (winMin) {
            winMin.title = UI_TRANSLATIONS.winMin[code];
            winMin.setAttribute('aria-label', UI_TRANSLATIONS.winMin[code]);
        }
        const winMax = document.getElementById('vgt-win-max');
        if (winMax) {
            winMax.title = UI_TRANSLATIONS.winMax[code];
            winMax.setAttribute('aria-label', UI_TRANSLATIONS.winMax[code]);
        }
        const winClose = document.getElementById('vgt-win-close');
        if (winClose) {
            winClose.title = UI_TRANSLATIONS.winClose[code];
            winClose.setAttribute('aria-label', UI_TRANSLATIONS.winClose[code]);
        }

        // 3. Update System Shell
        const shellTitle = document.querySelector('.vgt-shell-title');
        if (shellTitle) shellTitle.textContent = UI_TRANSLATIONS.shellTitle[code] || 'VGT Mediacenter';

        const shellSubtitle = document.querySelector('.vgt-shell-subtitle');
        if (shellSubtitle) shellSubtitle.textContent = UI_TRANSLATIONS.shellSubtitle[code] || 'V1.0 Beta • Sovereign Desktop Workstation';

        const badgeGreen = document.querySelector('.vgt-shell-badge.tone-green');
        if (badgeGreen) {
            const svg = badgeGreen.querySelector('svg');
            badgeGreen.innerHTML = '';
            if (svg) badgeGreen.appendChild(svg);
            badgeGreen.appendChild(document.createTextNode(' ' + UI_TRANSLATIONS.badgeLocal[code]));
        }

        const badgeBlue = document.querySelector('.vgt-shell-badge.tone-blue');
        if (badgeBlue) {
            const svg = badgeBlue.querySelector('svg');
            badgeBlue.innerHTML = '';
            if (svg) badgeBlue.appendChild(svg);
            badgeBlue.appendChild(document.createTextNode(' ' + UI_TRANSLATIONS.badgeZeroCloud[code]));
        }

        const badgePurple = document.querySelector('.vgt-shell-badge.tone-purple');
        if (badgePurple) {
            const svg = badgePurple.querySelector('svg');
            badgePurple.innerHTML = '';
            if (svg) badgePurple.appendChild(svg);
            badgePurple.appendChild(document.createTextNode(' ' + UI_TRANSLATIONS.badgePrivacy[code]));
        }

        const searchInput = document.getElementById('vg-search');
        if (searchInput) searchInput.placeholder = UI_TRANSLATIONS.searchPlaceholder[code];

        const cmdBtn = document.getElementById('vgt-command-open');
        if (cmdBtn) {
            const span = cmdBtn.querySelector('span');
            if (span) span.textContent = UI_TRANSLATIONS.btnTools[code];
        }

        const statusSpan = document.querySelector('.vgt-shell-status');
        if (statusSpan) statusSpan.textContent = UI_TRANSLATIONS.statusActive[code];

        // 4. Update Global Footer
        const footerTitle = document.querySelector('.vgt-global-footer > span:first-child');
        if (footerTitle) footerTitle.textContent = UI_TRANSLATIONS.footerText[code];

        const footerSub = document.querySelector('.vgt-global-footer .footer-links .tone-muted');
        if (footerSub) footerSub.textContent = UI_TRANSLATIONS.footerSub[code];

        // 5. Update Language Switcher in Header
        updateLanguageButton(code);

        // 6. Deep DOM Translation for active tool view
        const mainContent = document.getElementById('vgt-main-content');
        if (mainContent) {
            translateDOM(mainContent, window.vgtCurrentToolId || null);
        }

        // 7. Broadcast event so Dashboard re-renders cards with translated titles & descriptions
        document.dispatchEvent(new CustomEvent('vgt:language-changed', { detail: { lang: code } }));
    }

    function updateLanguageButton(code) {
        let btn = document.getElementById('btn-lang-desktop');
        if (!btn) {
            const actions = document.querySelector('.vgt-shell-actions');
            if (actions) {
                btn = document.createElement('button');
                btn.type = 'button';
                btn.id = 'btn-lang-desktop';
                btn.className = 'vgt-shell-icon-btn vgt-lang-btn';
                btn.title = 'Sprache / Language / Язык / Idioma';
                btn.setAttribute('aria-label', 'Sprache wechseln');
                btn.addEventListener('click', () => showLanguageModal(false));
                // Insert before theme toggle or at start of actions
                const themeBtn = document.getElementById('btn-theme-desktop');
                if (themeBtn) {
                    actions.insertBefore(btn, themeBtn);
                } else {
                    actions.appendChild(btn);
                }
            }
        }
        if (btn) {
            const currentObj = LANGUAGES.find(l => l.code === code) || LANGUAGES[0];
            btn.innerHTML = `<span class="vgt-lang-flag">${currentObj.flag}</span>`;
            btn.title = `${currentObj.native} (${currentObj.name})`;
            btn.setAttribute('aria-label', currentObj.native);
        }
    }

    let domObserver = null;
    let isTranslating = false;
    let observerTimeout = null;

    function translateDOM(container, toolId) {
        if (!container) return;
        try {
            const code = currentLang;
            const dict = window.VGT_DICTIONARY || {};

            // 1. Tool Header translation (title & desc)
            if (toolId && TOOL_TRANSLATIONS[toolId]) {
                const entry = TOOL_TRANSLATIONS[toolId];
                const titleEl = container.querySelector('.tool-title, .vgt-tool-header h1, .vgt-tool-header h2, .vgt-tool-title');
                if (titleEl && entry.title) {
                    if (!titleEl._vgtOrigTitle) titleEl._vgtOrigTitle = titleEl.textContent.trim();
                    titleEl.textContent = entry.title[code] || entry.title['de'] || titleEl._vgtOrigTitle;
                }
                const descEl = container.querySelector('.tool-desc, .vgt-tool-header p, .vgt-tool-desc');
                if (descEl && entry.desc) {
                    if (!descEl._vgtOrigDesc) descEl._vgtOrigDesc = descEl.textContent.trim();
                    descEl.textContent = entry.desc[code] || entry.desc['de'] || descEl._vgtOrigDesc;
                }
            }

            // 2. TreeWalker for all text nodes
            const walker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        if (!node || !node.parentElement) return NodeFilter.FILTER_REJECT;
                        const tag = node.parentElement.tagName.toLowerCase();
                        if (tag === 'script' || tag === 'style' || tag === 'textarea' || tag === 'code' || tag === 'pre' || tag === 'svg' || tag === 'path') {
                            return NodeFilter.FILTER_REJECT;
                        }
                        const text = node.textContent.trim();
                        if (!text || text.length < 2) return NodeFilter.FILTER_SKIP;
                        if (/^[0-9\.,:\-_/\\#%°±€\$\s]+$/.test(text)) return NodeFilter.FILTER_SKIP;
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            let node;
            while ((node = walker.nextNode())) {
                const text = node.textContent.trim();
                if (!node._vgtOrig) {
                    node._vgtOrig = text;
                }
                const orig = node._vgtOrig;
                if (dict[orig]) {
                    const trans = dict[orig][code] || dict[orig]['de'];
                    if (trans && trans !== text) {
                        const matchLeading = node.textContent.match(/^\s*/);
                        const matchTrailing = node.textContent.match(/\s*$/);
                        const lead = matchLeading ? matchLeading[0] : '';
                        const trail = matchTrailing ? matchTrailing[0] : '';
                        node.textContent = lead + trans + trail;
                    }
                }
            }

            // 3. Scan attributes: placeholder, title, aria-label, button values
            const attrElements = container.querySelectorAll('[placeholder], [title], [aria-label], input[type="button"], input[type="submit"]');
            attrElements.forEach(el => {
                if (!el._vgtOrigAttrs) el._vgtOrigAttrs = {};
                ['placeholder', 'title', 'aria-label'].forEach(attr => {
                    if (el.hasAttribute(attr)) {
                        const val = el.getAttribute(attr).trim();
                        if (!el._vgtOrigAttrs[attr]) {
                            el._vgtOrigAttrs[attr] = val;
                        }
                        const orig = el._vgtOrigAttrs[attr];
                        if (dict[orig]) {
                            const trans = dict[orig][code] || dict[orig]['de'];
                            if (trans) el.setAttribute(attr, trans);
                        }
                    }
                });

                if (el.tagName.toLowerCase() === 'input' && (el.type === 'button' || el.type === 'submit')) {
                    const val = el.value.trim();
                    if (!el._vgtOrigAttrs['value']) {
                        el._vgtOrigAttrs['value'] = val;
                    }
                    const orig = el._vgtOrigAttrs['value'];
                    if (dict[orig]) {
                        const trans = dict[orig][code] || dict[orig]['de'];
                        if (trans) el.value = trans;
                    }
                }
            });
        } catch (err) {
            console.warn('VGT_I18N.translateDOM warning:', err);
        }
    }

    function setupMutationObserver() {
        const mainContent = document.getElementById('vgt-main-content');
        if (!mainContent) return;
        if (domObserver) domObserver.disconnect();

        domObserver = new MutationObserver(() => {
            if (isTranslating) return;
            if (observerTimeout) clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                if (isTranslating) return;
                isTranslating = true;
                try {
                    translateDOM(mainContent, window.vgtCurrentToolId || null);
                } finally {
                    isTranslating = false;
                }
            }, 60);
        });

        domObserver.observe(mainContent, {
            childList: true,
            subtree: true,
            characterData: false
        });
    }

    function showLanguageModal(isFirstLaunch = false) {
        let modal = document.getElementById('vgt-lang-modal-layer');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'vgt-lang-modal-layer';
            modal.className = 'vgt-modal-layer';
            document.body.appendChild(modal);
        }

        const currentObj = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];
        const t = UI_TRANSLATIONS.langModal;

        modal.innerHTML = `
            <div class="vgt-modal-backdrop"></div>
            <div class="vgt-modal-card glass-panel-glow" role="dialog" aria-modal="true">
                <div class="vgt-modal-header">
                    <div class="vgt-modal-badge">V1.0 BETA</div>
                    <h2 class="vgt-modal-title">${t.title[currentLang] || t.title.de}</h2>
                    <p class="vgt-modal-subtitle">${t.subtitle[currentLang] || t.subtitle.de}</p>
                </div>
                <div class="vgt-lang-grid">
                    ${LANGUAGES.map(l => `
                        <button type="button" class="vgt-lang-card ${l.code === currentLang ? 'is-active' : ''}" data-code="${l.code}">
                            <span class="vgt-lang-card-flag">${l.flag}</span>
                            <div class="vgt-lang-card-info">
                                <span class="vgt-lang-card-name">${l.native}</span>
                                <span class="vgt-lang-card-sub">${l.name}</span>
                            </div>
                            <span class="vgt-lang-card-check">✓</span>
                        </button>
                    `).join('')}
                </div>
                <div class="vgt-modal-footer">
                    <button type="button" class="vgt-modal-btn-confirm" id="vgt-modal-confirm-lang">
                        ${t.confirm[currentLang] || t.confirm.de}
                    </button>
                </div>
            </div>
        `;

        modal.classList.add('is-open');

        let selected = currentLang;

        const cards = modal.querySelectorAll('.vgt-lang-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                cards.forEach(c => c.classList.remove('is-active'));
                card.classList.add('is-active');
                selected = card.dataset.code;

                // Live Instant Translation Preview
                currentLang = selected;
                applyLanguage(selected);

                // Update modal header & confirm button texts in real time
                const modalTitle = modal.querySelector('.vgt-modal-title');
                const modalSub = modal.querySelector('.vgt-modal-subtitle');
                const confirmBtn = document.getElementById('vgt-modal-confirm-lang');
                const t = UI_TRANSLATIONS.langModal;
                if (modalTitle) modalTitle.textContent = t.title[selected] || t.title.de;
                if (modalSub) modalSub.textContent = t.subtitle[selected] || t.subtitle.de;
                if (confirmBtn) confirmBtn.textContent = t.confirm[selected] || t.confirm.de;
            });
        });

        const confirmBtn = document.getElementById('vgt-modal-confirm-lang');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                setLanguage(selected);
            });
        }

        const backdrop = modal.querySelector('.vgt-modal-backdrop');
        if (backdrop && !isFirstLaunch) {
            backdrop.addEventListener('click', closeLanguageModal);
        }
    }

    function closeLanguageModal() {
        const modal = document.getElementById('vgt-lang-modal-layer');
        if (modal) {
            modal.classList.remove('is-open');
            modal.innerHTML = '';
        }
    }

    // Public API
    window.VGT_I18N = {
        LANGUAGES,
        getLanguage: () => currentLang,
        setLanguage,
        t: (key) => {
            const entry = UI_TRANSLATIONS[key];
            if (!entry) return key;
            return entry[currentLang] || entry['de'] || key;
        },
        getCategoryName: (catKey) => {
            const cat = UI_TRANSLATIONS.categories[catKey];
            if (!cat) return catKey;
            return cat[currentLang] || cat['de'] || catKey;
        },
        getTool: (toolId) => {
            const entry = TOOL_TRANSLATIONS[toolId];
            if (!entry) return null;
            return {
                title: entry.title[currentLang] || entry.title['de'],
                desc: entry.desc[currentLang] || entry.desc['de']
            };
        },
        showLanguageModal,
        translateDOM,
        setupMutationObserver,
        init: initLanguage
    };

    // Auto-launch on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage, { once: true });
    } else {
        initLanguage();
    }
})();
