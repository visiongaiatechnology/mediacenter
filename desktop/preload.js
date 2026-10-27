/**
 * VGT MEDIACENTER SUPREME - DESKTOP PRELOAD SCRIPT
 * STATUS: DIAMANT VGT SUPREME
 * Hardened Bridge: Exposes only safe desktop environment meta-information.
 */
"use strict";

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('vgtDesktopBridge', {
    platform: process.platform,
    version: '1.0.0',
    isDesktop: true
});
