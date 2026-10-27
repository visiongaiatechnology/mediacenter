@echo off
title VGT Mediacenter V1.0 Beta — Sovereign Desktop Edition
cd /d "%~dp0"

echo ========================================================
echo    VGT MEDIACENTER V1.0 BETA — DESKTOP WORKSTATION
echo    100%% Lokales Tool-Oekosystem. Zero Cloud. Privacy First.
echo ========================================================
echo.

if exist "VGT-Mediacenter-Supreme.exe" (
    echo Starte native Wails Frameless Desktop Workstation...
    start "" "VGT-Mediacenter-Supreme.exe"
    exit /b
)

if exist "VGT-Mediacenter.exe" (
    echo Starte native Windows Desktop App...
    start "" "VGT-Mediacenter.exe"
    exit /b
)

if exist "frontend\index.html" (
    echo Starte portable Desktop-Ansicht im Standard-Browser...
    start "" "frontend\index.html"
    exit /b
)
