# VGT Mediacenter V1.0 Beta — Linux Edition

100% lokales, autarkes Desktop-Tool-Ökosystem (40 Werkzeuge für Privacy, Krypto, Forensik, Audio, Media & Dev).
Zero Cloud • Zero Telemetry • 100% Offline Sovereign.
Mehrsprachig / Multilingual: Deutsch, English, Русский, Español, Italiano, 简体中文, 日本語, Français.

## Schnellstart

### Option 1: Direkt im Terminal starten
```bash
chmod +x launch-linux.sh VGT-Mediacenter-Supreme
./launch-linux.sh
```

Oder direkt:
```bash
./VGT-Mediacenter-Supreme
```

### Option 2: Als Desktop-App integrieren
Kopiere `vgt-mediacenter.desktop` in deinen Anwendungsordner:
```bash
cp vgt-mediacenter.desktop ~/.local/share/applications/
```

## Voraussetzungen
* Jede moderne 64-Bit Linux-Distribution (Ubuntu 20.04+, Debian 11+, Fedora, Arch, Linux Mint, etc.)
* Standard-Bibliotheken: `gtk3` und `webkit2gtk-4.1` (oder `webkit2gtk-4.0`), standardmäßig auf fast allen Linux-Desktops vorinstalliert.
  * Ubuntu / Debian / Mint: `sudo apt install libwebkit2gtk-4.1-0` (falls nicht vorhanden)
  * Fedora: `sudo dnf install webkit2gtk4.1`
  * Arch Linux: `sudo pacman -S webkit2gtk-4.1`
