#!/usr/bin/env bash
# VGT Mediacenter Supreme — Sovereign macOS Desktop Launcher
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "========================================================"
echo "   VGT MEDIACENTER SUPREME — MACOS DESKTOP WORKSTATION"
echo "   100% Lokales Tool-Ökosystem. Zero Cloud. Privacy First."
echo "========================================================"
echo ""

if [ -d "$DIR/build/bin/VGT-Mediacenter-Supreme.app" ]; then
    echo "Starte native Wails Frameless macOS Desktop Workstation..."
    open "$DIR/build/bin/VGT-Mediacenter-Supreme.app"
    exit 0
fi

if [ -f "$DIR/frontend/index.html" ]; then
    open "$DIR/frontend/index.html"
else
    open "$DIR/index.html"
fi
