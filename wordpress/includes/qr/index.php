<?php
/**
 * VGT MEDIACENTER - MATRIX FORGER (QR-CODE STUDIO)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Canvas-Integrity Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: qrcode.js
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht 100% lokales Rendering von Matrix-Codes im Browser-RAM.
 */
wp_enqueue_script('vgt-qrcode');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-qr'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper qr-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                    <rect x="14" y="14" width="3" height="3"></rect>
                    <rect x="18" y="18" width="3" height="3"></rect>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Matrix Forger', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Hochauflösendes QR-Code Studio. Generiere maschinenlesbare Matrix-Codes mit benutzerdefinierten RGB-Farbprofilen und zentralen Logo-Injektionen. 100% Offline-Rendering.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body qr-layout">
        
        <!-- Left: Configuration Panel (Eingabemaske) -->
        <div class="qr-config-panel">
            
            <!-- Payload Input: Der zu kodierende Datenstrom -->
            <div class="glass-panel config-card">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('1. Datenstrom (Payload)', $text_domain); ?></span>
                </div>
                <textarea 
                    id="<?php echo esc_attr('qr-input-text'); ?>" 
                    class="qr-textarea" 
                    placeholder="<?php echo esc_attr__('URL, Text, Krypto-Adresse oder Datensatz hier eingeben...', $text_domain); ?>"></textarea>
            </div>

            <!-- Color Engine: RGB-Vektoren für die Matrix -->
            <div class="glass-panel config-card">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('2. RGB Farb-Profil', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('btn-reset-colors'); ?>" class="btn-icon-small" title="<?php echo esc_attr__('Farben zurücksetzen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                    </button>
                </div>
                
                <div class="color-grid">
                    <div class="color-control">
                        <span class="color-label"><?php echo esc_html__('Matrix (Vordergrund)', $text_domain); ?></span>
                        <div class="color-picker-wrap">
                            <input type="color" id="<?php echo esc_attr('qr-color-fg'); ?>" class="vgt-color-picker" value="#000000">
                            <span class="color-hex-display" id="<?php echo esc_attr('hex-fg'); ?>">#000000</span>
                        </div>
                    </div>
                    
                    <div class="color-control">
                        <span class="color-label"><?php echo esc_html__('Canvas (Hintergrund)', $text_domain); ?></span>
                        <div class="color-picker-wrap">
                            <input type="color" id="<?php echo esc_attr('qr-color-bg'); ?>" class="vgt-color-picker" value="#ffffff">
                            <span class="color-hex-display" id="<?php echo esc_attr('hex-bg'); ?>">#FFFFFF</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Logo Injector: Branding-Vektor -->
            <div class="glass-panel config-card">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('3. Marken-Injektion (Logo)', $text_domain); ?></span>
                    <span class="status-badge" id="<?php echo esc_attr('logo-status'); ?>">
                        <?php echo esc_html__('H-Level Error Correction', $text_domain); ?>
                    </span>
                </div>

                <div class="logo-dropzone" id="<?php echo esc_attr('qr-logo-dropzone'); ?>">
                    <input type="file" id="<?php echo esc_attr('qr-logo-input'); ?>" class="hidden-input" accept="image/png, image/jpeg, image/svg+xml">
                    <div class="logo-preview-area hidden" id="<?php echo esc_attr('logo-preview-area'); ?>">
                        <img id="<?php echo esc_attr('qr-logo-preview'); ?>" src="" alt="<?php echo esc_attr__('Logo Preview', $text_domain); ?>">
                        <button id="<?php echo esc_attr('btn-remove-logo'); ?>" class="btn-remove-logo">
                            <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="logo-prompt" id="<?php echo esc_attr('logo-prompt'); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        <span><?php echo esc_html__('Logo hier ablegen', $text_domain); ?></span>
                    </div>
                </div>

                <div class="control-group mt-4 hidden" id="<?php echo esc_attr('logo-size-group'); ?>">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('Logo Skalierung', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('lbl-logo-size'); ?>" class="val-badge">20%</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('slider-logo-size'); ?>" class="vgt-slider teal-slider" min="10" max="35" value="20" step="1">
                    <div class="range-marks">
                        <span><?php echo esc_html__('Dezent', $text_domain); ?></span>
                        <span style="color: rgba(var(--c-pink), 1)"><?php echo esc_html__('Kritisch (>30%)', $text_domain); ?></span>
                    </div>
                </div>
            </div>

        </div>

        <!-- Right: Render Engine & High-Res Export -->
        <div class="qr-render-panel">
            
            <div class="glass-panel render-workspace">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Live Matrix Vorschau', $text_domain); ?></span>
                    <span class="live-indicator"><span class="pulse-dot"></span> <?php echo esc_html__('Sync', $text_domain); ?></span>
                </div>

                <div class="canvas-stage checkerboard" id="<?php echo esc_attr('canvas-stage'); ?>">
                    <div class="qr-placeholder" id="<?php echo esc_attr('qr-placeholder'); ?>">
                        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="3" height="3"></rect><rect x="18" y="18" width="3" height="3"></rect></svg>
                        <p><?php echo esc_html__('Warte auf Datenstrom...', $text_domain); ?></p>
                    </div>
                    <!-- Master Canvas: Hochauflösende Pixel-Manipulation -->
                    <canvas id="<?php echo esc_attr('qr-master-canvas'); ?>" class="hidden"></canvas>
                </div>

                <div class="render-meta mt-4">
                    <div class="meta-row">
                        <span><?php echo esc_html__('Generierte Pixel:', $text_domain); ?></span>
                        <span class="terminal-text" id="<?php echo esc_attr('meta-res'); ?>">1024 x 1024 px</span>
                    </div>
                    <div class="meta-row">
                        <span><?php echo esc_html__('Redundanz (Fehlerkorrektur):', $text_domain); ?></span>
                        <span class="terminal-text highlight-teal" id="<?php echo esc_attr('meta-ecl'); ?>">Level H (30%)</span>
                    </div>
                </div>

                <div class="action-bar mt-4">
                    <button id="<?php echo esc_attr('btn-export-png'); ?>" class="btn-prime teal-glow" disabled>
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <?php echo esc_html__('Als High-Res PNG speichern', $text_domain); ?>
                    </button>
                </div>
            </div>

        </div>

    </div>
</div>

<!-- Hidden DOM-Vault: Isolierter Container für qrcode.js Basis-Generierung -->
<div id="<?php echo esc_attr('qr-raw-container'); ?>" style="display:none;"></div>