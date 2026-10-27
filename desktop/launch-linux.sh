#!/usr/bin/env bash
# VGT Mediacenter V1.0 Beta — Sovereign Linux Desktop Launcher
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

echo "========================================================"
echo "   VGT MEDIACENTER V1.0 BETA — LINUX DESKTOP WORKSTATION"
echo "   100% Lokales Tool-Ökosystem. Zero Cloud. Privacy First."
echo "========================================================"
echo ""

if [ -f "$DIR/VGT-Mediacenter-Supreme" ]; then
    chmod +x "$DIR/VGT-Mediacenter-Supreme" 2>/dev/null || true
    echo "Starte native Wails Frameless Linux Desktop Workstation..."
    exec "$DIR/VGT-Mediacenter-Supreme" "$@"
fi

if [ -f "$DIR/build/bin/VGT-Mediacenter-Supreme" ]; then
    chmod +x "$DIR/build/bin/VGT-Mediacenter-Supreme" 2>/dev/null || true
    echo "Starte native Wails Frameless Linux Desktop Workstation..."
    exec "$DIR/build/bin/VGT-Mediacenter-Supreme" "$@"
fi

if command -v xdg-open > /dev/null; then
    xdg-open "$DIR/frontend/index.html" || xdg-open "$DIR/index.html"
elif command -v gnome-open > /dev/null; then
    gnome-open "$DIR/frontend/index.html" || gnome-open "$DIR/index.html"
else
    echo "Bitte öffne frontend/index.html in deinem bevorzugten Webbrowser."
fi
