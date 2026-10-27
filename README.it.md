<!-- ========================================================
     VGT MEDIACENTER V1.0 BETA — DOCUMENTAZIONE IN ITALIANO
     Standard: VisionGaiaTechnology /vgt-github-pusher
     ======================================================== -->

<div align="center">

# VGT Mediacenter V1.0 Beta

**Workstation Desktop Sovrana ed Ecosistema Blindato per WordPress**  
*Invariante 100% Lato Client • Zero Cloud • Zero Telemetria • 40 Strumenti Integrati*

---

### Selezione della Lingua / Language Selection

[🇩🇪 Deutsch](README.de.md) • [🇬🇧 English](README.md) • [🇷🇺 Русский](README.ru.md) • [🇪🇸 Español](README.es.md) • [🇮🇹 Italiano](README.it.md) • [🇨🇳 简体中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇫🇷 Français](README.fr.md)

---

[![Versione](https://img.shields.io/badge/versione-1.0.0--beta-06b6d4?style=for-the-badge)](https://github.com/VisionGaiaTechnology/VGT-Mediacenter)
[![Licenza](https://img.shields.io/badge/licenza-AGPL--3.0-blue?style=for-the-badge)](LICENSE)
[![Piattaforme](https://img.shields.io/badge/piattaforma-Windows%20%7C%20Linux%20%7C%20WordPress-a855f7?style=for-the-badge)](https://github.com/VisionGaiaTechnology/VGT-Mediacenter)
[![Architettura](https://img.shields.io/badge/architettura-100%25%20Offline%20Sovrana-22c55e?style=for-the-badge)](docs/architecture.md)
[![Privacy](https://img.shields.io/badge/privacy-Zero%20Telemetria-10b981?style=for-the-badge)](SECURITY.md)
[![Strumenti](https://img.shields.io/badge/strumenti-40%20App%20Nate%20Pronte-f59e0b?style=for-the-badge)](#le-40-applicazioni-sovrane)

</div>

> [!WARNING]
> **Stato di Beta Pubblica:** VGT Mediacenter V1.0 Beta è attualmente in fase di beta test attivo. Tutti i 40 moduli operano al 100% in locale senza dipendenze cloud. Feedback della community, verifiche di sicurezza e segnalazioni di bug sono benvenuti.

---

## 🚀 Download rapido e installazione

Scegli la tua piattaforma per scaricare il pacchetto autonomo precompilato:

| Piattaforma | Formato / Pacchetto | Dimensione | Download diretto | Verifica (SHA-256) |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** (x64) | Eseguibile portatile `.exe` | ~61 MB | [⬇️ **Download per Windows**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/VGT-Mediacenter-Supreme-Windows-x64.exe) | `deecfc78ecb9...` |
| **Linux** (x86_64) | Archivio portatile `.tar.gz` | ~22 MB | [⬇️ **Download per Linux**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-linux/VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz) | `4c8246ea4bf6...` |
| **WordPress** | Plugin autonomo `.zip` | ~19 MB | [⬇️ **Download plugin ZIP**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/vgt-mediacenter-wordpress-plugin.zip) | `4d1d1200791a...` |

> [!TIP]
> **Nessuna installazione richiesta:** Le versioni desktop si avviano direttamente senza dipendenze esterne. Per WordPress, carica il file `.zip` in **Plugin > Aggiungi nuovo > Carica plugin**.

---

## Indice dei Contenuti
1. [Introduzione e Filosofia](#introduzione-e-filosofia)
2. [Caratteristiche Principali](#caratteristiche-principali)
3. [Le 40 Applicazioni Sovrane](#le-40-applicazioni-sovrane)
   * [Privacy e Sicurezza (12 App)](#1-privacy-e-sicurezza)
   * [Elaborazione Media e Documenti (6 App)](#2-elaborazione-media-e-documenti)
   * [Sviluppo e Analisi Binaria Forense (9 App)](#3-sviluppo-e-analisi-binaria-forense)
   * [Calcolatori e Utility (3 App)](#4-calcolatori-e-utility)
   * [Creatività e Sintesi Audio (2 App)](#5-creatività-e-sintesi-audio)
   * [Mente e Profilazione Psicologica (3 App)](#6-mente-e-profilazione-psicologica)
   * [Cosmo e Telemetria (3 App)](#7-cosmo-e-telemetria)
   * [Hub di Sistema (2 App)](#8-hub-di-sistema)
4. [Installazione ed Esecuzione](#installazione-ed-esecuzione)
   * [Windows Desktop](#windows-desktop)
   * [Linux Desktop](#linux-desktop)
   * [Plugin WordPress](#plugin-wordpress)
5. [Architettura Multilingue (i18n)](#architettura-multilingue-i18n)
6. [Sicurezza e Principio Zero-Trust](#sicurezza-e-principio-zero-trust)
7. [Licenza (AGPLv3)](#licenza)
8. [Dipendenze di Terze Parti e Ringraziamenti](#dipendenze-di-terze-parti-e-ringraziamenti)

---

## Introduzione e Filosofia

Il software contemporaneo costringe gli utenti a una progressiva sottomissione al cloud, pretendendo connettività costante, abbonamenti ricorrenti e cessione continua di dati a server di telemetria remoti.

**VGT Mediacenter** spezza radicalmente questo schema. È una **workstation locale progettata per la sovranità digitale**, dotata di 40 strumenti di livello professionale per crittografia, analisi documentale forense, sintesi audio, ingegneria del software, calcoli matematici e protezione integrale della privacy.

### Garanzie Architetturali Fondamentali:
* **Zero Cloud:** Nessun server, nessun tracciatore, nessun beacon analitico, nessuna chiamata remota.
* **Elaborazione 100% In-Memory:** I file aperti non abbandonano mai la memoria RAM del dispositivo locale. Calcolo di hash, redazione PDF ed elaborazione audio avvengono tramite API HTML5 e WebAssembly.
* **Portabilità Deterministica:** Stessa esperienza utente garantita come applicazione desktop nativa senza bordi su Windows e Linux, oppure come shortcode protetto per reti intranet basate su WordPress.

---

## Caratteristiche Principali

* **Interfaccia Glass 2100 Sovereign:** Linguaggio visivo Obsidian Glass con sfocatura hardware (`blur(28px)`), layout privo di griglie caotiche ed eleganti riflessi ciano luminescenti.
* **Controlli Finestra Nativi:** Pulsanti su misura (Riduci a icona, Ingrandisci / Ripristina, Chiudi) integrati con Wails v2 e i gestori di finestre di sistema.
* **Avvio Istantaneo (Sub-Secondo):** Manifest precompilati in memoria che azzerano le limitazioni CORS su protocollo `file://`, avviando l'ambiente in meno di 600 ms.
* **Supporto Completo per 8 Lingue:** Deutsch, English, Русский, Español, Italiano, 简体中文, 日本語 e Français — uniforme su tutte le 40 applicazioni.

---

## Le 40 Applicazioni Sovrane

### 1. Privacy e Sicurezza

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Verifica Hash** | `hashchecker` | **Controllo di Integrità Crittografica:** Calcola checksum SHA-1, SHA-256, SHA-384, SHA-512 e MD5 nella memoria del browser tramite `crypto.subtle.digest()`. Esegue il confronto con hash di riferimento per identificare alterazioni. |
| **Cifratura AES** | `aes` | **Caveau Crittografico Locale:** Cifra e decifra testi e file in locale secondo lo standard AES-256-GCM con derivazione PBKDF2 (100.000 iterazioni). Genera vettori di inizializzazione (IV) crittograficamente casuali per ogni sessione. |
| **Caveau Stegano** | `stegano` | **Occultamento Steganografico nei Pixel:** Inserisce payload testuali cifrati nei bit meno significativi (LSB) dei canali RGB dell'immagine. Il file rimane visivamente indistinguibile dall'originale, decifrabile solo con la chiave opportuna. |
| **Pulitore Metadati** | `meta-clean` | **Bonifica Forense dei Metadati:** Analizza i file JPEG, PNG, TIFF e HEIC nei loro header binari nativi. Rimuove metadati EXIF, coordinate geografiche GPS, codici seriali e informazioni sul firmware di scatto. |
| **VisionWhistleBlow** | `whistle` | **Censura Irreversibile di Documenti:** Sfrutta la libreria `pdf-lib` per rimuovere in modo definitivo le stringhe di testo e sovrapporre blocchi neri opachi sulle coordinate selezionate nel DOM del PDF, impedendone il recupero. |
| **Analizzatore Fingerprint** | `fingerprint` | **Audit dell'Entropia del Browser:** Valuta il rendering di Canvas 2D, stringhe WebGL, latenza dell'AudioContext e concorrenza hardware per evidenziare come i network pubblicitari profilano il terminale. |
| **Verifica Password** | `pw-check` | **Stima di Entropia e Attacco Brute-Force:** Valuta l'entropia della stringa ($H = L \cdot \log_2(N)$), confronta le sequenze con dizionari noti e stima i tempi di violazione su cluster GPU senza trasmettere dati all'esterno. |
| **Truthlense Confronto** | `truthlense` | **Motore di Differenze Testuali:** Calcola le discrepanze tra due testi a livello di carattere, parola e linea mediante l'algoritmo diff di Myers. Evidenzia aggiunte, cancellazioni e alterazioni di spaziatura invisibili a occhio nudo. |
| **Scanner Segreti** | `secret-scan` | **Rilevatore di Credenziali Es годов:** Scansiona file di configurazione, script e file di log identificando token AWS, token GitHub PAT, chiavi private e stringhe API tramite regex ed entropia di Shannon. |
| **Pulitore URL Pro** | `url-clean` | **Rimozione Parametri di Tracciamento:** Pulisce i link web da tag UTM, identificatori Facebook (`fbclid`), identificatori Google Ads (`gclid`) e token di affiliazione prima della navigazione. |
| **Analisi Dati Browser HAR** | `har` | **Ispettore dei Dump di Rete:** Analizza dump HTTP Archive (`.har`) in totale riservatezza locale. Visualizza a cascata le richieste, intestazioni, cookie e latenze mediante ApexCharts. |
| **Generatore QR** | `qr` | **Forgia e Scanner di Codici QR Offline:** Genera codici QR ad alta definizione per testi, credenziali Wi-Fi e indirizzi crittografici, leggendo al contempo immagini acquisite via fotocamera. |

### 2. Elaborazione Media e Documenti

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Convertitore Immagini** | `img-conv` | **Transcodifica Formati in Memoria:** Converte immagini tra WebP, PNG, JPEG, BMP e ICO sfruttando la renderizzazione su Canvas HTML5 e la creazione locale di Blob. |
| **Compressore Immagini** | `img-comp` | **Compressione con Ottimizzazione Visiva:** Utilizza algoritmi Pica e ricampionamento bicubico per ridurre il peso delle immagini fino all'85% preservando la fedeltà visiva originale. |
| **Unione PDF** | `pdf-merge` | **Concatenazione Documentale:** Assembla più file PDF distinti in un unico documento continuativo tramite `pdf-lib`, salvaguardando vettori, campi modulo e caratteri incorporati. |
| **Divisione PDF** | `pdf-split` | **Estrazione Pagine e Intervalli:** Scompone documenti PDF multipagina in fogli singoli o intervalli specifici, permettendo il download istantaneo in archivio ZIP locale. |
| **Studio Audio Pro** | `audio-conv` | **Spettrogramma e Motore Sonoro:** Renderizza forme d'onda audio in tempo reale con la WebAudio API, registra tracce microfoniche in WAV/WebM non compresso e analizza la ripartizione in frequenza. |
| **ZIP Master** | `zipmaster` | **Gestione ed Estrazione Archivi ZIP:** Ispeziona ed estrae il contenuto di file ZIP standard nella RAM del browser tramite `JSZip`, consentendo l'accesso ai singoli file senza estrazione sul disco fisso. |

### 3. Sviluppo e Analisi Binaria Forense

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Strumenti JSON** | `json` | **Formattazione e Validazione Strutturale JSON:** Formatta, convalida, corregge sintassi danneggiate ed esplora gerarchie JSON complesse con conteggio token e controllo di schema. |
| **Esploratore CSV** | `cdash` | **Workstation per Dati Tabulari:** Elabora file massivi CSV e TSV mediante PapaParse. Consente filtraggi multi-colonna istantanei, ordinamenti, raggruppamenti e proiezioni su grafici a barre e a linee. |
| **Code Omega** | `coder` | **Confronto Codice e Analisi Sintattica:** Analizzatore di codice sorgente e motore di confronto a colonne parallele compatibile con JavaScript, TypeScript, Python, Go, PHP e SQL. |
| **Cipher-Flow** | `cipherflow` | **Costruttore di Pipeline Crittografiche:** Ambiente a nodi visivi che concatena passaggi multipli di codifica e cifratura (es. Hex $\to$ Base64 $\to$ AES $\to$ SHA-256) in sequenze automatizzate. |
| **Forgia Manifesti** | `manifest` | **Validatore di Integrità Directory:** Scansiona directory caricate e produce un file manifesto formattato con checksum SHA-256 (`manifest.json`) per il controllo di integrità di rilasci software. |
| **Hexmap Ispettore Binario** | `hexmap` | **Visualizzatore Esadecimale a Basso Livello:** Mostra il flusso di byte grezzi, gli offset di memoria, la rappresentazione ASCII e i magic number per identificare e dissezionare file binari. |
| **Packet-Viz** | `packetviz` | **Visualizzatore di Pacchetti di Rete PCAP:** Elabora catture di traffico Wireshark (`.pcap`) in locale. Traccia matrici di conversazione tra nodi IP, istogrammi e gerarchie di protocolli con D3.js. |
| **Git Checker** | `gitleaker` | **Auditing dei Repository Pre-Commit:** Esamina repository Git e diff alla ricerca di chiavi private `.pem`, token di autenticazione o file di grandi dimensioni prima dell'invio a server remoti. |
| **Generatore ReadMe** | `readme` | **Studio per Documentazione Markdown:** Assistente guidato per redigere documenti README standardizzati con badge di stato, istruzioni operative e template per licenze open source MIT/AGPL. |

### 4. Calcolatori e Utility

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Calorie e Macro Pro** | `cal` | **Modellazione Metabolica Nutrizionale:** Calcola il metabolismo basale (BMR) e il consumo calorico giornaliero totale (TDEE) con equazioni Mifflin-St Jeor e Katch-McArdle, calcolando i macronutrienti. |
| **Convertitore Unità** | `unit` | **Trasformatore di Grandezze Fisiche:** Converte con precisione scientifica oltre 80 unità di misura per lunghezza, massa, temperatura, pressione atmosferica, capacità digitale ed energia. |
| **Calcolatore Energetico** | `energy` | **Simulatore di Assorbimento Elettrico:** Modella wattaggio nominale, cicli di esercizio orari e tariffe kWh per stimare la spesa energetica su base giornaliera, mensile e annuale. |

### 5. Creatività e Sintesi Audio

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Studio Frequenze** | `freq` | **Sintetizzatore Acustico di Toni Puri:** Genera battiti binaurali puri, toni isocronici e frequenze Solfeggio ($432\,\text{Hz}, 528\,\text{Hz}$) mediante oscillatori stereofonici WebAudio. |
| **Meditazione e Soundscape** | `med` | **Generatore di Ambienti Rilassanti:** Sintetizza scenari acustici generativi (pioggia, rumore bianco, rumore rosa, moto ondoso) combinati con un misuratore visivo del ritmo respiratorio. |

### 6. Mente e Profilazione Psicologica

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Profilo Personalità Big5** | `big5` | **Modello Psicometrico dei Big Five:** Somministra un questionario standardizzato da 50 quesiti per misurare Apertura, Coscienziosità, Estroversione, Gradevolezza e Nevroticismo. |
| **Archetipi di Jung** | `jung` | **Valutatore di Psicologia Analitica:** Mappa gli archetipi dominanti teorizzati da Carl Jung (Eroe, Saggio, Esploratore, Sovrano) attraverso la ponderazione delle risposte cognitive. |
| **Stress e Concentrazione** | `stress` | **Valutatore del Carico Cognitivo:** Misura la variabilità nei tempi di reazione psicomotori e la stanchezza mentale mediante test interattivi a risposta visiva immediata. |

### 7. Cosmo e Telemetria

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Fasi Lunari** | `moon` | **Effemeridi Astronomiche Lunari:** Determina l'età esatta della Luna, la percentuale di illuminazione, il ciclo delle fasi e la costellazione zodiacale mediante algoritmi basati sul giorno giuliano. |
| **Bioritmo** | `bio` | **Calcolatore di Cicli Sinusoidali:** Calcola e visualizza i cicli biologici a onde sinusoidali (fisico di 23 giorni, emotivo di 28 giorni e intellettuale di 33 giorni) su un grafico temporale. |
| **Stazione Meteo** | `weather` | **Cruscotto Telemetrico Atmosferico:** Mostra pressione barometrica, umidità relativa, conversioni termiche e andamento atmosferico tramite componenti interamente lato client. |

### 8. Hub di Sistema

| Strumento | Identificatore | Scopo e Meccanismo di Funzionamento |
| :--- | :--- | :--- |
| **Dashboard** | `dashboard` | **Centro di Controllo e Window Manager:** Matrice di comando dotata di ricerca in tempo reale, suddivisione per categorie tematiche, storico degli strumenti e passaggio tra modalità griglia e desktop virtuale. |
| **Strumenti Colore** | `color` | **Convertitore di Spazi Cromatici:** Calcola equivalenze e anteprime cromatiche tra HEX, RGB, HSL, HSV e OKLCH con verifica automatica del contrasto di accessibilità WCAG 2.1. |

---

## Installazione ed Esecuzione

### Windows Desktop
Richiede Windows 10/11 (64-bit). Si appoggia al runtime Microsoft Edge WebView2 Evergreen preinstallato.
1. Scarica l'eseguibile `VGT-Mediacenter-Supreme.exe` dalla sezione delle release.
2. Fai doppio clic per avviare. Nessuna installazione o diritto di amministratore richiesto.
3. *In alternativa:* Avvia tramite lo script `launch-windows.bat`.

### Linux Desktop
Compatibile con distribuzioni a 64-bit: Ubuntu 20.04+, Debian 11+, Fedora 38+, Arch Linux, Linux Mint (x86_64).
1. Scarica l'archivio `VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz`.
2. Estrai il contenuto:
   ```bash
   tar -xzf VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz
   cd VGT-Mediacenter-Supreme-Linux
   ```
3. Esegui il launcher di sistema:
   ```bash
   ./launch-linux.sh
   # Oppure avvia direttamente il binario:
   ./VGT-Mediacenter-Supreme
   ```
4. *(Opzionale)* Installa il collegamento sul desktop:
   ```bash
   cp vgt-mediacenter.desktop ~/.local/share/applications/
   ```

### Plugin WordPress
Compatibile con WordPress 6.0+ e PHP 8.1+.
1. Copia la cartella `wordpress/` all'interno della directory dei plugin del tuo server: `wp-content/plugins/vgt-mediacenter/`.
2. Attiva il plugin nella sezione **Bacheca WordPress $\to$ Plugin**.
3. Incorpora l'intera workstation in qualsiasi articolo o pagina tramite lo shortcode:
   ```text
   [vgt_mediacenter]
   ```

---

## Architettura Multilingue (i18n)

VGT Mediacenter include un motore di localizzazione istantaneo residente in RAM ([i18n.js](desktop/frontend/i18n.js)):
* **Finestra di Primo Avvio:** All'apertura iniziale, chiede all'utente la lingua desiderata.
* **Selettore Rapido:** Il pulsante `🌐 [LANG]` nella barra superiore consente di alternare la lingua in qualunque istante.
* **Zero Latenza:** Tutte le traduzioni delle 40 applicazioni, dei pulsanti e delle etichette sono precaricate e si aggiornano in 0 ms senza ricaricare la sessione.

---

## Sicurezza e Principio Zero-Trust

* **Content Security Policy (CSP):** L'applicazione opera con rigide direttive CSP; qualunque tentativo di contatto con domini esterni viene intercettato e respinto.
* **Nessuna Telemetria:** Zero tracciamenti Google Analytics, zero chiamate verso Sentry, zero beacon pubblicitari.
* **Sanitizzazione del DOM:** Qualsiasi inserimento di contenuto HTML/SVG viene bonificato tramite filtri dedicati per neutralizzare ogni rischio di DOM-XSS.

---

## Licenza

VGT Mediacenter è software libero distribuito sotto i termini della licenza **GNU Affero General Public License v3.0 (AGPLv3)**.  
Il testo completo della licenza è disponibile nel file [LICENSE](LICENSE).

---

## Dipendenze di Terze Parti e Ringraziamenti

Tutte le librerie esterne incluse in VGT Mediacenter sono governate da licenze open source permissive (MIT, Apache-2.0, BSD-3-Clause, ISC, SIL OFL 1.1).  
Per consultare l'elenco completo di autori, copyright e note di licenza, fai riferimento al documento [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

<div align="center">

<img src="docs/vgtcode.png" alt="Vision Gaia Technology Logo" width="120" style="border-radius: 12px; margin-top: 2rem;"/>

**Vision Gaia Technology (VGT)**  
*Ingegnerizzato per la Sovranità Digitale • Riservatezza Assoluta • Zero Cloud*

</div>
