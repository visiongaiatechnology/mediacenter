<!-- ========================================================
     VGT MEDIACENTER V1.0 BETA — DEUTSCHE DOKUMENTATION
     Standard: VisionGaiaTechnology /vgt-github-pusher
     ======================================================== -->

<div align="center">

# VGT Mediacenter V1.0 Beta

**Souveräne lokale Desktop-Workstation & gehärtetes WordPress-Ökosystem**  
*100% Client-Side Invariante • Zero Cloud • Zero Telemetrie • 40 Autarke Werkzeuge*


<img width="2007" height="1150" alt="image" src="https://github.com/user-attachments/assets/9ea1ab58-c1c5-4f43-a925-130b778b2400" />

---

### Sprachauswahl / Language Selection

[🇩🇪 Deutsch](README.de.md) • [🇬🇧 English](README.md) • [🇷🇺 Русский](README.ru.md) • [🇪🇸 Español](README.es.md) • [🇮🇹 Italiano](README.it.md) • [🇨🇳 简体中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇫🇷 Français](README.fr.md)

---

[![Version](https://img.shields.io/badge/version-1.0.0--beta-06b6d4?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![Lizenz](https://img.shields.io/badge/lizenz-AGPL--3.0-blue?style=for-the-badge)](LICENSE)
[![Plattform](https://img.shields.io/badge/plattform-Windows%20%7C%20Linux%20%7C%20WordPress-a855f7?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![Architektur](https://img.shields.io/badge/architektur-100%25%20Offline%20Souver%C3%A4n-22c55e?style=for-the-badge)](docs/architecture.md)
[![Datenschutz](https://img.shields.io/badge/datenschutz-Zero%20Telemetrie-10b981?style=for-the-badge)](SECURITY.md)
[![Werkzeuge](https://img.shields.io/badge/werkzeuge-40%20Integrierte%20Apps-f59e0b?style=for-the-badge)](#die-40-autarken-werkzeuge)
[![Support](https://img.shields.io/badge/💛%20Support-Digital%20Sovereignty-eab308?style=for-the-badge)](#-support)

<br/>

👉 **[💛 Unterstütze Digitale Souveränität](#-support)** 👈

</div>

> [!WARNING]
> **Öffentlicher Beta-Status:** VGT Mediacenter V1.0 Beta befindet sich im aktiven Betatest. Alle 40 Kernmodule arbeiten 100 % lokal ohne Cloud-Abhängigkeiten. Feedback, Sicherheitsprüfungen und Fehlerberichte sind ausdrücklich erwünscht.

---

## 🚀 Schnelldownload & Installation

Wähle deine Plattform für das vorkompilierte, 100% autarke Offline-Paket:

| Plattform | Format / Paket | Größe | Direkt-Download | Prüfsumme (SHA-256) |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** (x64) | Standalone Portable `.exe` | ~61 MB | [⬇️ **Download für Windows**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/VGT-Mediacenter-Supreme-Windows-x64.exe) | `deecfc78ecb9...` |
| **Linux** (x86_64) | Portables Bundle `.tar.gz` | ~22 MB | [⬇️ **Download für Linux**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-linux/VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz) | `4c8246ea4bf6...` |
| **WordPress** | Autarkes Plugin `.zip` | ~19 MB | [⬇️ **Download Plugin ZIP**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/vgt-mediacenter-wordpress-plugin.zip) | `4d1d1200791a...` |

> [!TIP]
> **Keine Installation notwendig:** Die Desktop-Versionen starten direkt ohne externe Abhängigkeiten oder Administrator-Rechte. Für WordPress einfach die `.zip`-Datei unter **Plugins > Installieren > Plugin hochladen** auswählen und aktivieren.

---

## Inhaltsverzeichnis
1. [Einführung & Philosophie](#einführung--philosophie)
2. [Hauptmerkmale](#hauptmerkmale)
3. [Die 40 autarken Werkzeuge](#die-40-autarken-werkzeuge)
   * [Privatsphäre & Sicherheit (12 Apps)](#1-privatsphäre--sicherheit)
   * [Medien- & Dokumentenverarbeitung (6 Apps)](#2-medien--und-dokumentenverarbeitung)
   * [Entwicklung & Binärforensik (9 Apps)](#3-entwicklung--binärforensik)
   * [Rechner & Dienstprogramme (3 Apps)](#4-rechner--dienstprogramme)
   * [Kreativität & Audio-Synthese (2 Apps)](#5-kreativität--audio-synthese)
   * [Psyche & Psychologische Analyse (3 Apps)](#6-psyche--psychologische-analyse)
   * [Kosmos & Telemetrie (3 Apps)](#7-kosmos--telemetrie)
   * [Systemkern (2 Apps)](#8-systemkern)
4. [Installation & Ausführung](#installation--ausführung)
   * [Windows Desktop](#windows-desktop)
   * [Linux Desktop](#linux-desktop)
   * [WordPress Plugin](#wordpress-plugin)
5. [Mehrsprachige Architektur (i18n)](#mehrsprachige-architektur-i18n)
6. [Sicherheit & Zero-Trust-Prinzip](#sicherheit--zero-trust-prinzip)
7. [Lizenzierung (AGPLv3)](#lizenzierung)
8. [Eingebettete Abhängigkeiten & Danksagung](#eingebettete-abhängigkeiten--danksagung)

9. [💛 Support](#-support)

---

## Einführung & Philosophie

Moderne Software zwingt Nutzer zunehmend in Cloud-Monopole, erfordert ständige Internetverbindungen, wiederkehrende Abonnements und die Übertragung privater Daten an externe Telemetrieserver.

Das **VGT Mediacenter** bricht radikal mit diesem Paradigma. Es ist eine **Offline-First-Workstation** mit 40 Werkzeugen für Kryptografie, Dokumentenforensik, Audioanalyse, Softwareentwicklung, Berechnungen und Datenschutz.

### Architektonische Garantien:
* **Zero Cloud:** Keine Server, keine Tracking-Beacons, keine Analytik-Pings, keine externen API-Aufrufe.
* **100% In-Memory Verarbeitung:** In Werkzeuge geladene Dateien verlassen niemals den lokalen Speicher des Rechners. Hashing, PDF-Schwärzung und Audioverarbeitung finden im lokalen RAM statt.
* **Deterministische Portabilität:** Einheitliche Bedienung – ob als native rahmenlose Desktop-App unter Windows und Linux oder als abgesichertes WordPress-Plugin im Intranet.

---

## Hauptmerkmale

* **Glass 2100 Sovereign Interface:** Obsidian-Glass-Design mit Backdrop-Filtern (`blur(28px)`), ohne störende Rastermuster, veredelt mit sanften Cyan-Leuchtakzenten.
* **Rahmenlose native Windows- & Linux-Steuerung:** Eigene Fensterelemente (Minimieren, Maximieren / Wiederherstellen, Schließen) mit Wails v2 Integration.
* **Startzeit unter einer Sekunde:** Vorkompilierte Manifeste eliminieren CORS-Ladeverzögerungen und starten die App in unter 600 ms.
* **Vollständige Mehrsprachigkeit (8 Sprachen):** Deutsch, Englisch, Russisch, Spanisch, Italienisch, Chinesisch, Japanisch und Französisch – konsistent über alle 40 Werkzeuge.

---

## Die 40 autarken Werkzeuge

### 1. Privatsphäre & Sicherheit

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Hashchecker** | `hashchecker` | **Kryptografische Integritätsprüfung:** Berechnet SHA-1, SHA-256, SHA-384, SHA-512 und MD5 Prüfsummen direkt im RAM via `crypto.subtle.digest()`. Vergleicht mit Referenzwerten zur Erkennung von Manipulationen. |
| **AES Verschlüsselung** | `aes` | **Militärtauglicher Krypto-Tresor:** Ver- und entschlüsselt Texte und Dateien lokal mit AES-256-GCM und PBKDF2-Schlüsselableitung (100.000 Runden). Erzeugt kryptografisch zufällige Initialisierungsvektoren (IV). |
| **Stegano Vault** | `stegano` | **Steganografische Bildverschleierung:** Bettet verschlüsselte Textnachrichten in die niederwertigsten Bits (LSB) von RGB-Bildpixeln ein. Optisch unsichtbar, nur mit Passphrase entschlüsselbar. |
| **Metadata Cleaner** | `meta-clean` | **Forensische Metadaten-Bereinigung:** Analysiert JPEG, PNG, TIFF und HEIC Dateien lokal. Entfernt EXIF-Tags, GPS-Koordinaten, Geräteseriennummern und Firmware-Informationen. |
| **VisionWhistleBlow** | `whistle` | **Irreversible Dokumentenschwärzung:** Entfernt sensible Textstellen dauerhaft aus PDF-Dateien und überdeckt Koordinaten mit opaken Boxen via `pdf-lib`, ohne Textfragmente im DOM zu hinterlassen. |
| **Fingerprint Analyzer** | `fingerprint` | **Browser-Entropie-Prüfung:** Untersucht Canvas-2D, WebGL-Renderer, AudioContext-Latenzen und Hardware-Threads, um zu visualisieren, was Tracking-Netzwerke identifizieren können. |
| **Passwort Check** | `pw-check` | **Entropie- & Brute-Force-Rechner:** Berechnet Passwortentropie ($H = L \cdot \log_2(N)$), prüft Wörterbuchmuster und ermittelt lokale GPU-Knackzeiten ohne Übertragung. |
| **Truthlense** | `truthlense` | **Text- & Dokument-Diff:** Ermittelt Zeichen-, Wort- und Zeilenunterschiede zweier Texte nach dem Myers-Diff-Algorithmus. Markiert Modifikationen farblich. |
| **Secret Scanner Pro** | `secret-scan` | **Schlüssel- & Token-Detektor:** Durchsucht Konfigurationsdateien und Quelltexte nach versehentlich hinterlegten API-Keys, AWS-Tokens, GitHub-PATs und privaten Schlüsseln. |
| **URL Cleaner Pro** | `url-clean` | **Tracking-Parameter-Entferner:** Befreit Weblinks lokal von UTM-Tags, Facebook-Click-IDs (`fbclid`), Google-IDs (`gclid`) und Weiterleitungs-Tokens. |
| **HAR Browser Analyse** | `har` | **Netzwerk-Dump-Auswertung:** Liest HTTP-Archive (`.har`) lokal ein. Visualisiert Anfrage-Wasserfälle, Header, Cookies und Zeitachsen mittels ApexCharts ohne Datenübertragung. |
| **QR Generator** | `qr` | **Offline-QR-Code-Schmiede:** Erzeugt und scannt QR-Codes für Texte, WLAN-Zugangsdaten und Krypto-Adressen komplett offline. |

### 2. Medien- und Dokumentenverarbeitung

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Bild Converter** | `img-conv` | **Lokale Bildformat-Konvertierung:** Konvertiert Bilder zwischen WebP, PNG, JPEG, BMP und ICO im HTML5-Canvas-Speicher. |
| **Bild Kompressor** | `img-comp` | **Verlustfreie & verlustbehaftete Kompression:** Nutzt Pica-Interpolation zur Reduktion von Bilddateigrößen um bis zu 85 % bei Erhalt der visuellen Details. |
| **PDF Merge** | `pdf-merge` | **Dokumentenzusammenführung:** Verbindet mehrere eigenständige PDF-Dateien via `pdf-lib` zu einem Gesamtdokument unter Erhalt aller Vektorpfade und Schriften. |
| **PDF Split** | `pdf-split` | **Seitenextraktion:** Teilt mehrseitige PDFs in Einzelseiten oder benutzerdefinierte Seitenintervalle mit direktem ZIP-Download auf. |
| **Audio Studio Pro** | `audio-conv` | **Echtzeit-Wellenform & Aufnahmegerät:** Visualisiert Audiosignale über die WebAudio API, nimmt Mikrofonströme verlustfrei auf und analysiert Frequenzspektren. |
| **ZIP Master** | `zipmaster` | **Archiv-Prüfung & Entpackung:** Inspiziert und entpackt ZIP-Dateien direkt im Arbeitsspeicher über `JSZip` ohne Festplatten-Zwischenspeicherung. |

### 3. Entwicklung & Binärforensik

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **JSON Tools** | `json` | **Formatierung & Strukturbaum:** Formatiert, repariert und traversiert verschachtelte JSON-Objekte mit Syntaxprüfung und Tokenzählung. |
| **CSV Explorer** | `cdash` | **Tabellendaten-Arbeitsplatz:** Parst große CSV- und TSV-Dateien via PapaParse. Ermöglicht Mehrspalten-Filterung, Sortierung und Chart-Visualisierungen. |
| **Code Omega** | `coder` | **Code-Vergleich & Syntax-Sandbox:** Mehrsprachiger Syntax-Prüfer und Side-by-Side-Diff-Viewer für JS, TS, Python, Go, PHP und SQL. |
| **Cipher-Flow** | `cipherflow` | **Krypto-Pipeline-Baukasten:** Visuelle Pipeline-Kette zur sequenziellen Verknüpfung von Algorithmen (z. B. Hex $\to$ Base64 $\to$ AES $\to$ SHA-256). |
| **Manifest Forge** | `manifest` | **Verzeichnis-Integritäts-Builder:** Erstellt aus Ordnerstrukturen eine kryptografische SHA-256 Manifest-Datei (`manifest.json`) zur Software-Prüfung. |
| **Hexmap** | `hexmap` | **Binärer Hexadezimal-Inspektor:** Zeigt rohe Byte-Streams, Adressoffsets und Dateisignaturen zur manuellen Dateiformat-Analyse an. |
| **Packet-Viz** | `packetviz` | **PCAP-Netzwerkanalyse:** Visualisiert Wireshark-PCAP-Mitschnitte lokal. Stellt Gesprächsmatrizen und Protokollhierarchien mit D3.js dar. |
| **Git Checker** | `gitleaker` | **Pre-Commit-Sicherheitsprüfung:** Sucht in Repositories vor dem Git-Push nach versehentlich enthaltenen Passwörtern oder Zertifikatsdateien. |
| **ReadMe Generator** | `readme` | **Markdown-Dokumentations-Studio:** Formularbasierter Generator für saubere, standardkonforme READMEs inklusive Lizenz- und Badgetexten. |

### 4. Rechner & Dienstprogramme

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Kalorien Pro** | `cal` | **Stoffwechsel-Rechner:** Berechnet Grundumsatz (BMR) und Gesamtenergiebedarf (TDEE) nach Mifflin-St Jeor mit individueller Makronährstoff-Verteilung. |
| **Einheiten** | `unit` | **Wissenschaftlicher Einheiten-Konverter:** Rechnet über 80 physikalische Maßeinheiten (Länge, Masse, Druck, Temperatur, Datengrößen) präzise um. |
| **Stromrechner** | `energy` | **Stromkosten-Simulator:** Ermittelt Verbrauch und Betriebskosten elektrischer Verbraucher auf Tages-, Monats- und Jahresbasis. |

### 5. Kreativität & Audio-Synthese

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Frequenzen** | `freq` | **Akustischer Signalgenerator:** Erzeugt reine Sinus-Binaural-Beats, isochrone Töne und Solfeggio-Frequenzen ($432\,\text{Hz}, 528\,\text{Hz}$) über zwei Stereo-Oszillatoren. |
| **Meditation** | `med` | **Fokus-Timer & Klangwelten:** Generiert beruhigende Audio-Klangkulissen (Regen, Meeresrauschen, weißes Rauschen) mit geführten Atemtakten. |

### 6. Psyche & Psychologische Analyse

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Big5 Profiling** | `big5` | **Fünf-Faktoren-Persönlichkeitsmodell:** Empirischer Fragebogen mit 50 Fragen zur Erfassung von Offenheit, Gewissenhaftigkeit, Extraversion, Verträglichkeit und Neurotizismus. |
| **Archetypen** | `jung` | **Analytische Psychologie nach C.G. Jung:** Berechnet die Ausprägung dominanter Archetypen (Held, Weiser, Entdecker, Herrscher). |
| **Stress & Fokus** | `stress` | **Kognitive Belastungsprüfung:** Misst Reaktionszeitvariabilitäten und geistige Ermüdung durch psychomotorische Reaktionsinteraktionen. |

### 7. Kosmos & Telemetrie

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Mondphasen** | `moon` | **Astronomische Ephemeriden:** Berechnet Mondalter, Erleuchtungsgrad, Mondphase und Tierkreisposition nach julianischen Datumsalgorithmen. |
| **Biorhythmus** | `bio` | **Sinus-Rhythmus-Berechnung:** Ermittelt den 23-tägigen körperlichen, 28-tägigen seelischen und 33-tägigen geistigen Rhythmus mit interaktiver Zeitleiste. |
| **Wetter Live** | `weather` | **Atmosphärische Telemetrie:** Zeigt Luftdruck, Luftfeuchtigkeit und Wetterdaten in clientseitigen Anzeigen an. |

### 8. Systemkern

| Werkzeug | Kennung | Zweck & Funktionsweise |
| :--- | :--- | :--- |
| **Dashboard** | `dashboard` | **System-Hub & Fenstermanager:** Zentrale Werkzeugmatrix mit Sofortsuche, Kategoriefiltern, Verlauf und Umschaltung zwischen Raster- und virtuellem Desktop-Modus. |
| **Farb Tools** | `color` | **Farbraum-Labor:** Wandelt Farbcodes zwischen HEX, RGB, HSL, HSV und OKLCH um und prüft Kontrastverhältnisse nach WCAG 2.1. |

---

## Installation & Ausführung

### Windows Desktop
Benötigt Windows 10/11 (64-Bit). Nutzt die Microsoft Edge WebView2 Evergreen Laufzeitumgebung.
1. `VGT-Mediacenter-Supreme.exe` herunterladen.
2. Doppelklicken zum Starten. Keine Installation oder Administratorrechte nötig.
3. *Alternativ:* `launch-windows.bat` ausführen.

### Linux Desktop
Kompatibel mit Ubuntu 20.04+, Debian 11+, Fedora 38+, Arch Linux, Linux Mint (x86_64).
1. `VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz` herunterladen.
2. Entpacken:
   ```bash
   tar -xzf VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz
   cd VGT-Mediacenter-Supreme-Linux
   ```
3. Starten:
   ```bash
   ./launch-linux.sh
   # Oder Binärdatei direkt starten:
   ./VGT-Mediacenter-Supreme
   ```
4. *(Optional)* Desktop-Verknüpfung einrichten:
   ```bash
   cp vgt-mediacenter.desktop ~/.local/share/applications/
   ```

### WordPress Plugin
Kompatibel mit WordPress 6.0+ und PHP 8.1+.
1. Den Ordner `wordpress/` in das Verzeichnis `wp-content/plugins/vgt-mediacenter/` kopieren.
2. Im Administrationsbereich unter **Plugins** aktivieren.
3. Per Shortcode auf einer beliebigen Seite einbetten:
   ```text
   [vgt_mediacenter]
   ```

---

## Mehrsprachige Architektur (i18n)

Das VGT Mediacenter verfügt über eine native In-Memory Übersetzungs-Engine ([i18n.js](desktop/frontend/i18n.js)):
* **Erststart-Auswahl:** Beim ersten Öffnen fordert ein Dialog zur Sprachauswahl auf.
* **Sprachwähler in der Menüleiste:** Ein Klick auf `🌐 [SPRACHE]` öffnet die Sprachauswahl jederzeit erneut.
* **Keine Ladezeiten:** Übersetzungen aller 40 Werkzeuge, Kategorien und Dialoge befinden sich im RAM und schalten ohne Seiten-Reload in 0 ms um.

---

## Sicherheit & Zero-Trust-Prinzip

* **Strikte CSP:** Externe Skriptinjektionen und Netzwerkzugriffe werden strukturell unterbunden.
* **Keine Telemetrie:** 100 % werbe-, tracking- und telemetriefrei.
* **Sichere DOM-Bereinigung:** Alle Ausgaben durchlaufen Bereinigungsfilter gegen DOM-XSS.

---

## Lizenzierung

VGT Mediacenter ist freie Software unter der **GNU Affero General Public License v3.0 (AGPLv3)**.  
Vollständiger Lizenztext: [LICENSE](LICENSE).

---

## Eingebettete Abhängigkeiten & Danksagung

Alle mitgelieferten Bibliotheken Dritter unterliegen freien, permissiven Open-Source-Lizenzen (MIT, Apache-2.0, BSD-3-Clause, ISC, SIL OFL 1.1).  
Die vollständige Übersicht aller Autoren und Lizenztexte befindet sich in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## 💛 Support

Independent development is funded by people who want this stack to exist. If you want to support the work:

| Method | Address / Link |
| :--- | :--- |
| **PayPal** | [paypal.me/dergoldenelotus](https://paypal.me/dergoldenelotus) |
| **Bitcoin** | `bc1q3ue5gq822tddmkdrek79adlkm36fatat3lz0dm` |
| **ETH / USDT (ERC-20)** | `0xD37DEfb09e07bD775EaaE9ccDaFE3a5b2348Fe85` |

---

<div align="center">

<img src="docs/vgtcode.png" alt="Vision Gaia Technology Logo" width="120" style="border-radius: 12px; margin-top: 2rem;"/>

**Vision Gaia Technology (VGT)**  
*Entwickelt für Souveränität • Privacy First • Zero Cloud*

</div>
