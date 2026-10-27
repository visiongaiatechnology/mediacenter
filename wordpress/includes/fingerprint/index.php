<?php
/**
 * VGT MEDIACENTER - TRACE SCANNER (FINGERPRINTING)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Zero Dependencies - 100% Vanilla JS Browser API Exploitation
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-fingerprint'); ?>">
    
    <!-- Hero Header: Navigations- und Titelbereich -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper fg-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6M10 12c0-1.1.9-2 2-2s2 .9 2 2"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Trace Scanner', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Analysiert deinen digitalen Browser-Fingerabdruck. Cookies löschen reicht nicht – WebGL, Audio-Chips und Canvas-Rendering verraten deine exakte Hardware-Signatur.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body fg-layout">
        
        <!-- Scanner Control Panel: Radar & Master Toggle -->
        <div class="glass-panel fg-control-panel">
            <div class="radar-container" id="<?php echo esc_attr('fg-radar'); ?>">
                <div class="radar-sweep"></div>
                <div class="radar-core">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10"></path>
                        <path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6"></path>
                        <path d="M10 12c0-1.1.9-2 2-2s2 .9 2 2"></path>
                    </svg>
                </div>
            </div>
            
            <div class="scan-status">
                <span class="status-label"><?php echo esc_html__('System-Status', $text_domain); ?></span>
                <h3 class="status-value" id="<?php echo esc_attr('fg-status-text'); ?>">
                    <?php echo esc_html__('Standby. Bereit für Tiefen-Scan.', $text_domain); ?>
                </h3>
            </div>

            <button id="<?php echo esc_attr('btn-start-scan'); ?>" class="btn-prime green-glow">
                <svg viewBox="0 0 24 24" class="svg-icon">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <?php echo esc_html__('Deep Scan Initiieren', $text_domain); ?>
            </button>

            <!-- Overall Threat Metric: Anomalie-Score -->
            <div class="threat-meter hidden" id="<?php echo esc_attr('fg-threat-meter'); ?>">
                <span class="threat-label"><?php echo esc_html__('Digitale Einzigartigkeit (Entropie)', $text_domain); ?></span>
                <div class="threat-val-wrap">
                    <span class="threat-val" id="<?php echo esc_attr('fg-entropy-score'); ?>">0</span>
                    <span class="threat-unit">%</span>
                </div>
                <p class="threat-desc">
                    <?php echo esc_html__('Je höher der Wert, desto leichter bist du im Netz trackingbar, selbst mit VPN.', $text_domain); ?>
                </p>
            </div>
        </div>

        <!-- Metrics Matrix: Die verschiedenen Fingerprinting-Vektoren -->
        <div class="fg-matrix">
            
            <!-- Canvas Fingerprint: Grafik-Hardware Signatur -->
            <div class="glass-panel metric-card" id="<?php echo esc_attr('card-canvas'); ?>">
                <div class="metric-header">
                    <span class="metric-title"><?php echo esc_html__('Canvas Image Rendering', $text_domain); ?></span>
                    <div class="metric-status spinner hidden"></div>
                </div>
                <div class="metric-content">
                    <div class="canvas-preview-box checkerboard">
                        <!-- Hidden Canvas for bitwise analysis -->
                        <canvas id="<?php echo esc_attr('fg-hidden-canvas'); ?>" width="200" height="50" style="display:none;"></canvas>
                        <!-- Rendered UI Placeholder -->
                        <img id="<?php echo esc_attr('fg-canvas-img'); ?>" src="" alt="<?php echo esc_attr__('Awaiting Scan...', $text_domain); ?>" class="hidden">
                        <span class="placeholder-text" id="<?php echo esc_attr('ph-canvas'); ?>">
                            <?php echo esc_html__('Awaiting Engine...', $text_domain); ?>
                        </span>
                    </div>
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('Hash-Signatur:', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-canvas-hash'); ?>">---------</span>
                    </div>
                </div>
            </div>

            <!-- WebGL Fingerprint: GPU & Treiber Details -->
            <div class="glass-panel metric-card" id="<?php echo esc_attr('card-webgl'); ?>">
                <div class="metric-header">
                    <span class="metric-title"><?php echo esc_html__('WebGL GPU Extraction', $text_domain); ?></span>
                    <div class="metric-status spinner hidden"></div>
                </div>
                <div class="metric-content">
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('Vendor:', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-webgl-vendor'); ?>">---------</span>
                    </div>
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('Renderer:', $text_domain); ?></span>
                        <span class="data-val terminal-text highlight-green" id="<?php echo esc_attr('val-webgl-renderer'); ?>">---------</span>
                    </div>
                </div>
            </div>

            <!-- Audio Context Fingerprint: Soundchip-Varianz -->
            <div class="glass-panel metric-card" id="<?php echo esc_attr('card-audio'); ?>">
                <div class="metric-header">
                    <span class="metric-title"><?php echo esc_html__('Audio DSP Resonance', $text_domain); ?></span>
                    <div class="metric-status spinner hidden"></div>
                </div>
                <div class="metric-content">
                    <p class="metric-desc">
                        <?php echo esc_html__('AudioContext erzeugt einen versteckten Ton. Abweichungen in der Soundkarte erzeugen einzigartige Hashes.', $text_domain); ?>
                    </p>
                    <div class="data-row mt-auto">
                        <span class="data-key"><?php echo esc_html__('DSP-Hash:', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-audio-hash'); ?>">---------</span>
                    </div>
                </div>
            </div>

            <!-- Hardware & OS: Klassische System-Telemetrie -->
            <div class="glass-panel metric-card" id="<?php echo esc_attr('card-hardware'); ?>">
                <div class="metric-header">
                    <span class="metric-title"><?php echo esc_html__('Hardware Telemetrie', $text_domain); ?></span>
                    <div class="metric-status spinner hidden"></div>
                </div>
                <div class="metric-content list-layout">
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('CPU Kerne:', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-hw-cores'); ?>">---------</span>
                    </div>
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('Device RAM:', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-hw-ram'); ?>">---------</span>
                    </div>
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('Plattform (OS):', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-hw-os'); ?>">---------</span>
                    </div>
                    <div class="data-row">
                        <span class="data-key"><?php echo esc_html__('Screen Res:', $text_domain); ?></span>
                        <span class="data-val terminal-text" id="<?php echo esc_attr('val-hw-screen'); ?>">---------</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>