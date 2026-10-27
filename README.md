<!-- ========================================================
     VGT MEDIACENTER V1.0 BETA — MASTER REPOSITORY README
     Standard: VisionGaiaTechnology /vgt-github-pusher
     ======================================================== -->

<div align="center">

# VGT Mediacenter V1.0 Beta

**Sovereign Local Desktop Workstation & Hardened WordPress Ecosystem**  
*100% Client-Side Invariant • Zero Cloud • Zero Telemetry • 40 Built-in Apps*


<img width="2007" height="1150" alt="image" src="https://github.com/user-attachments/assets/9ea1ab58-c1c5-4f43-a925-130b778b2400" />


---

### Language Selection / Sprachauswahl

[🇩🇪 Deutsch](README.de.md) • [🇬🇧 English](README.md) • [🇷🇺 Русский](README.ru.md) • [🇪🇸 Español](README.es.md) • [🇮🇹 Italiano](README.it.md) • [🇨🇳 简体中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇫🇷 Français](README.fr.md)

---

[![Version](https://img.shields.io/badge/version-1.0.0--beta-06b6d4?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![License](https://img.shields.io/badge/license-AGPL--3.0-blue?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20WordPress-a855f7?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![Architecture](https://img.shields.io/badge/architecture-100%25%20Offline%20Sovereign-22c55e?style=for-the-badge)](docs/architecture.md)
[![Privacy](https://img.shields.io/badge/privacy-Zero%20Telemetry-10b981?style=for-the-badge)](SECURITY.md)
[![Tools](https://img.shields.io/badge/tools-40%20Built--in%20Apps-f59e0b?style=for-the-badge)](#the-40-sovereign-applications)
[![Support](https://img.shields.io/badge/💛%20Support-Digital%20Sovereignty-eab308?style=for-the-badge)](#-support)

<br/>

👉 **[💛 Support Digital Sovereignty / Unterstütze Digitale Souveränität](#-support)** 👈

</div>

> [!WARNING]
> **Public Beta Status:** VGT Mediacenter V1.0 Beta is currently in active beta testing. All 40 core modules operate 100% locally with zero cloud dependencies. Public community feedback, security peer reviews, and bug reports are welcome.

---

## 🚀 Quick Download & Installation

Choose your platform to get the pre-compiled, sovereign offline build:

| Platform | Format / Package | Size | Direct Download | SHA-256 Checksum |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** (x64) | Standalone Portable `.exe` | ~61 MB | [⬇️ **Download for Windows**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/VGT-Mediacenter-Supreme-Windows-x64.exe) | `deecfc78ecb9...` |
| **Linux** (x86_64) | Portable Bundle `.tar.gz` | ~22 MB | [⬇️ **Download for Linux**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-linux/VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz) | `4c8246ea4bf6...` |
| **WordPress** | Self-Hosted Plugin `.zip` | ~19 MB | [⬇️ **Download Plugin ZIP**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/vgt-mediacenter-wordpress-plugin.zip) | `4d1d1200791a...` |

> [!TIP]
> **Zero Installation Required:** The desktop versions run completely standalone without external dependencies or administrative installers. For WordPress, upload the `.zip` file under **Plugins > Add New > Upload Plugin** and activate it.

---

## Table of Contents
1. [Introduction & Philosophy](#introduction--philosophy)
2. [Key Features](#key-features)
3. [The 40 Sovereign Applications](#the-40-sovereign-applications)
   * [Privacy & Security (12 Apps)](#1-privacy--security)
   * [Media & Document Processing (6 Apps)](#2-media--document-processing)
   * [Development & Binary Forensics (9 Apps)](#3-development--binary-forensics)
   * [Calculators & Utilities (3 Apps)](#4-calculators--utilities)
   * [Creative & Audio Synthesis (2 Apps)](#5-creative--audio-synthesis)
   * [Mind & Psychological Analysis (3 Apps)](#6-mind--psychological-analysis)
   * [Cosmos & Telemetry (3 Apps)](#7-cosmos--telemetry)
   * [System Core (2 Apps)](#8-system-core)
4. [Installation & Execution](#installation--execution)
   * [Windows Desktop Workstation](#windows-desktop)
   * [Linux Desktop Workstation](#linux-desktop)
   * [WordPress Plugin Deployment](#wordpress-plugin)
5. [Multilingual Architecture (i18n)](#multilingual-architecture-i18n)
6. [Security & Zero-Trust Invariant](#security--zero-trust-invariant)
7. [Licensing (AGPLv3)](#licensing)
8. [Vendored Dependencies & Acknowledgments](#vendored-dependencies--acknowledgments)

9. [💛 Support](#-support)

---

## Introduction & Philosophy

Modern software environments increasingly force users into cloud monopolies, requiring continuous internet connectivity, recurring subscriptions, and surrendering private data to remote telemetry servers.

**VGT Mediacenter** radically rejects this paradigm. It is an **offline-first, sovereign workstation** containing 40 industrial-grade tools for cryptography, document forensics, audio analysis, development, calculations, and privacy preservation.

### Core Architectural Guarantees:
* **Zero Cloud:** No servers, no tracking beacons, no analytics pings, no remote API calls.
* **100% In-Memory Processing:** Files dropped into tools never touch external networks; cryptographic hashes, PDF redaction, and audio processing occur in local CPU/GPU memory space via HTML5 Web APIs and WebAssembly.
* **Deterministic Portability:** Identical user experience whether deployed as a native frameless desktop app on Windows and Linux, or as an internal WordPress shortcode on intranet web servers.

---

## Key Features

* **Glass 2100 Sovereign Interface:** Custom Obsidian Glass design language with backdrop filters (`blur(28px)`), zero distracting grid patterns, and refined cyan glowing accents.
* **Frameless Native Windows & Linux Controls:** Custom-rendered window controls (Minimize, Maximize / Restore, Close) integrated with Wails v2 and OS window managers.
* **Sub-Second Instant Startup:** In-memory precompiled manifests eliminate all file-protocol CORS overhead, loading the workstation in under 600 ms.
* **Full Multilingual Support (8 Languages):** Deutsch, English, Русский, Español, Italiano, 简体中文, 日本語, and Français — constant and seamless across all 40 applications.

---

## The 40 Sovereign Applications

### 1. Privacy & Security

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Hashchecker** | `hashchecker` | **Cryptographic Integrity Verification:** Computes SHA-1, SHA-256, SHA-384, SHA-512, and MD5 checksums directly in browser memory via `crypto.subtle.digest()`. Compares against reference hashes to detect file tampering or transmission corruption. |
| **AES Encryption** | `aes` | **High-Grade Cryptographic Vault:** Encrypts and decrypts text and files locally using AES-256-GCM and PBKDF2 key derivation (100,000 iterations). Generates cryptographically random initialization vectors (IV) for each session. |
| **Stegano Vault** | `stegano` | **Steganographic Image Concealment:** Encodes encrypted text payloads into the least significant bits (LSB) of RGB image pixels. Visually indistinguishable from original graphics, decodable only with the correct passkey. |
| **Metadata Cleaner** | `meta-clean` | **Forensic Metadata Stripping:** Parses JPEG, PNG, TIFF, and HEIC files using local binary readers. Strips EXIF headers, GPS coordinates, device serial numbers, and camera firmware tags before re-exporting. |
| **VisionWhistleBlow** | `whistle` | **Irreversible Document Redaction:** Uses `pdf-lib` to permanently strip redacted text and draw opaque black boxes over sensitive PDF coordinates, clearing underlying text streams from the document DOM. |
| **Fingerprint Analyzer** | `fingerprint` | **Browser Entropy Auditor:** Evaluates Canvas 2D rendering, WebGL renderer strings, AudioContext latency, and hardware concurrency to demonstrate what tracking networks can identify. |
| **Password Check** | `pw-check` | **Entropy & Brute-Force Estimator:** Evaluates string entropy ($H = L \cdot \log_2(N)$), checks against common dictionary sequences, and calculates offline cracking times on GPU clusters without transmitting the password. |
| **Truthlense** | `truthlense` | **Document & Text Diff Engine:** Computes character, word, and line-level diffs between two texts using Myers' diff algorithm. Highlights additions, deletions, and subtle whitespace modifications. |
| **Secret Scanner Pro** | `secret-scan` | **Credential Leak Detector:** Scans configuration files, scripts, and logs for API keys, AWS access tokens, GitHub PATs, and private keys using regex pattern matching and Shannon entropy scoring. |
| **URL Cleaner Pro** | `url-clean` | **Tracking Probe Stripper:** Strips UTM tags, Facebook Click IDs (`fbclid`), Google Click IDs (`gclid`), affiliate redirects, and telemetry tokens from web links before navigation. |
| **HAR Browser Analysis** | `har` | **Network Archive Inspector:** Parses HTTP Archive (`.har`) dumps locally. Visualizes request waterfalls, headers, cookies, and timing metrics using ApexCharts without uploading sensitive session data. |
| **QR Code Forge** | `qr` | **Offline QR Matrix Generator & Reader:** Encodes text, Wi-Fi keys, and cryptographic addresses into high-resolution QR codes, and decodes uploaded camera captures in-memory. |

### 2. Media & Document Processing

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Image Converter** | `img-conv` | **In-Memory Format Transcoder:** Converts images between WebP, PNG, JPEG, BMP, and ICO formats utilizing HTML5 Canvas rendering and client-side Blob generation. |
| **Image Compressor** | `img-comp` | **Lossless & Lossy Compression:** Employs Pica interpolation and bi-cubic resampling to reduce image payload sizes up to 85% while preserving visual fidelity. |
| **PDF Merge** | `pdf-merge` | **Document Concatenator:** Merges multiple independent PDF documents into a single document stream using `pdf-lib`, preserving vector paths, form fields, and embedded fonts. |
| **PDF Split** | `pdf-split` | **Page Range Extractor:** Splits multi-page PDF archives into individual pages or custom-extracted page intervals with instant local zip downloads. |
| **Audio Studio Pro** | `audio-conv` | **Spectrum Visualizer & Audio Engine:** Visualizes audio waveforms in real time via WebAudio API, records microphone streams directly into lossless WAV/WebM, and analyzes frequency spectrums. |
| **ZIP Master** | `zipmaster` | **Archive Inspector & Extractor:** Reads and uncompresses standard ZIP files directly in browser RAM via `JSZip`, allowing selective extraction of individual files without filesystem overhead. |

### 3. Development & Binary Forensics

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **JSON Inspector & Format** | `json` | **JSON Tree & Syntax Engine:** Formats, validates, repairs, and traverses nested JSON data with syntax highlighting, token counting, and schema validation. |
| **CSV / Data Explorer** | `cdash` | **Tabular Data Workstation:** Parses large CSV and TSV files via PapaParse. Provides instant multi-column filtering, sorting, aggregations, and visual bar/line chart projections. |
| **Code Omega** | `coder` | **Code Diff & Syntax Sandbox:** Multi-language syntax analyzer and side-by-side diff comparison engine for JavaScript, TypeScript, Python, Go, PHP, and SQL. |
| **Cipher-Flow** | `cipherflow` | **Cryptographic Pipeline Builder:** Visual node interface that chains multiple encoding and encryption stages (e.g. Hex $\to$ Base64 $\to$ AES $\to$ SHA-256) into automated transformations. |
| **Manifest Forge** | `manifest` | **Directory Integrity Builder:** Recursively scans uploaded folder structures and compiles a standardized SHA-256 checksum manifest file (`manifest.json`) for auditing software integrity. |
| **Hexmap** | `hexmap` | **Low-Level Binary Hex Viewer:** Displays raw byte streams, byte offsets, ASCII interpretations, and binary magic numbers to inspect file signatures and reverse-engineer formats. |
| **Packet-Viz** | `packetviz` | **PCAP Network Visualizer:** Analyzes Wireshark `.pcap` packet captures locally. Plots IP conversation matrices, packet size distributions, and protocol hierarchies using D3.js. |
| **Git Checker** | `gitleaker` | **Pre-Commit Repository Auditor:** Audits Git repositories and diff snapshots for accidental inclusions of private `.pem` keys, tokens, or large binary blobs before pushing upstream. |
| **ReadMe Generator** | `readme` | **Markdown Documentation Studio:** Interactive form that drafts clean, standard-compliant project README files with badges, usage instructions, and MIT/AGPL license templates. |

### 4. Calculators & Utilities

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Calorie & Macro Calc** | `cal` | **Metabolic Intake Modeler:** Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) via Mifflin-St Jeor and Katch-McArdle formulas, yielding targeted macronutrient splits. |
| **Unit Converter** | `unit` | **Scientific Magnitude Transformer:** Converts over 80 physical units across length, mass, temperature, pressure, digital storage, and energy with high precision. |
| **Energy & Power Calc** | `energy` | **Device Power Consumption Simulator:** Models electrical device wattage, duty cycles, and energy rates into daily, monthly, and annual operational costs. |

### 5. Creative & Audio Synthesis

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Binaural Frequency Studio** | `freq` | **Acoustic Synthesizer:** Generates pure sine binaural beats, isochronic tones, and Solfeggio frequencies ($432\,\text{Hz}, 528\,\text{Hz}$) using dual WebAudio stereo oscillators. |
| **Meditation Soundscapes** | `med` | **Focus & Ambient Generator:** Synthesizes generative soundscapes (rain, white noise, pink noise, ocean drift) alongside structured breathing pacing clocks. |

### 6. Mind & Psychological Analysis

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Big5 Personality Profiler** | `big5` | **Five-Factor Psychometric Model:** Administers an empirical 50-item psychometric inventory measuring Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. |
| **Jungian Archetypes** | `jung` | **Analytical Psychology Evaluator:** Calculates dominant Carl Jung archetypes (Hero, Sage, Explorer, Ruler) based on cognitive response weighting. |
| **Stress & Focus Analyzer** | `stress` | **Cognitive Fatigue Assessor:** Measures reaction time variability and cognitive load through interactive visual psychomotor response tests. |

### 7. Cosmos & Telemetry

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Lunar Telemetry** | `moon` | **Astronomical Ephemeris Engine:** Calculates exact moon age, illumination percentage, lunar phase names, and zodiac constellations based on Julian date algorithms. |
| **Biorhythm Engine** | `bio` | **Sine-Wave Cycle Calculator:** Computes 23-day physical, 28-day emotional, and 33-day intellectual sine cycles projected onto dynamic timeline canvases. |
| **Weather Station** | `weather` | **Atmospheric Telemetry Dashboard:** Displays ambient pressure, humidity, temperature conversions, and atmospheric conditions through clean client-side widgets. |

### 8. System Core

| Tool | Identifier | Purpose & How It Works |
| :--- | :--- | :--- |
| **Dashboard** | `dashboard` | **System Hub & Window Manager:** Central command matrix featuring instant search, category filters, recent tool history, and switching between Grid Mode and Virtual Desktop Mode. |
| **Color Suite Pro** | `color` | **Color Space Converter:** Converts and previews color values between HEX, RGB, HSL, HSV, and OKLCH with built-in WCAG 2.1 contrast ratio calculators. |

---

## Installation & Execution

### Windows Desktop
Requires Windows 10/11 (64-bit). Uses Microsoft Edge WebView2 Evergreen runtime.
1. Download `VGT-Mediacenter-Supreme.exe` from the latest release.
2. Double click to launch. No installer or admin privileges required.
3. *Alternative:* Run `launch-windows.bat`.

### Linux Desktop
Compatible with Ubuntu 20.04+, Debian 11+, Fedora 38+, Arch Linux, Linux Mint (x86_64).
1. Download `VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz`.
2. Extract the archive:
   ```bash
   tar -xzf VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz
   cd VGT-Mediacenter-Supreme-Linux
   ```
3. Run the launcher:
   ```bash
   ./launch-linux.sh
   # Or execute the binary directly:
   ./VGT-Mediacenter-Supreme
   ```
4. *(Optional)* Install desktop integration:
   ```bash
   cp vgt-mediacenter.desktop ~/.local/share/applications/
   ```

### WordPress Plugin
Compatible with WordPress 6.0+ and PHP 8.1+.
1. Copy the `wordpress/` folder into your WordPress installation: `wp-content/plugins/vgt-mediacenter/`.
2. Activate the plugin in **WordPress Admin $\to$ Plugins**.
3. Embed the full sovereign workstation into any page or post using the shortcode:
   ```text
   [vgt_mediacenter]
   ```

---

## Multilingual Architecture (i18n)

VGT Mediacenter features a complete in-memory translation subsystem ([i18n.js](desktop/frontend/i18n.js)):
* **First-Run Modal:** Prompts new users to select their preferred language immediately on first launch.
* **Header Selector:** Click the `🌐 [LANG]` button in the top navigation bar at any time to switch languages.
* **Zero Latency:** Translations for all 40 tools, badges, categories, and system dialogs are bundled in RAM and update in 0 ms without reloading.

---

## Security & Zero-Trust Invariant

* **Content Security Policy (CSP):** The application runs with strict CSP restrictions; external domains cannot be contacted.
* **No Telemetry / No Phone-Home:** Zero Google Analytics, zero Sentry tracking, zero telemetry beacons.
* **Safe DOM Sanitization:** InnerHTML injections pass through rigorous SVG and HTML sanitization guards to prevent DOM-XSS attacks.

---

## Licensing

VGT Mediacenter is free software licensed under the **GNU Affero General Public License v3.0 (AGPLv3)**.  
See the full license text in [LICENSE](LICENSE).

---

## Vendored Dependencies & Acknowledgments

All third-party libraries included in VGT Mediacenter are licensed under permissive open-source licenses (MIT, Apache-2.0, BSD-3-Clause, ISC, SIL OFL 1.1).  
For the complete directory of authors, copyrights, and license notices, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

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
*Engineered for Sovereignty • Privacy First • Zero Cloud*

</div>
