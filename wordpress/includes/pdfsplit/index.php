<?php
/**
 * VGT MEDIACENTER - DOCUMENT SHATTER (PDF SPLITTER)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & RAM-Visual Integrity
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependencies: PDF.js & PDF-Lib 
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht visuelle Extraktion und Shatter-Prozesse direkt im Browser-RAM.
 */
wp_enqueue_script('vgt-pdf');
wp_enqueue_script('vgt-pdf-worker');
wp_enqueue_script('vgt-pdf-lib');
wp_enqueue_script('vgt-filesaver');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-pdfsplit'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper ps-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Document Shatter', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Visuelle PDF-Extraktion. Wähle Seiten direkt über die Inhalts-Vorschau aus. Alle Operationen finden physisch in deinem Browser-RAM statt.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body">
        
        <!-- View 1: Ingestion Zone (Dropzone) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('ps-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Quell-PDF injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Ziehe das Dokument hierher für den Deep-Scan', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Visual Preview Mode Active', $text_domain); ?></div>
            </div>
            <input type="file" id="<?php echo esc_attr('ps-file-input'); ?>" class="hidden-input" accept="<?php echo esc_attr('application/pdf'); ?>" />
        </div>

        <!-- View 2: Workspace Layout (Hidden until load) -->
        <div id="<?php echo esc_attr('ps-workspace'); ?>" class="ps-workspace hidden">
            
            <!-- Side Controls: Parameter-Matrix -->
            <div class="glass-panel ps-controls">
                <div class="controls-header">
                    <span class="panel-label"><?php echo esc_html__('Parameter', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('ps-btn-reset'); ?>" class="btn-action-small danger" title="<?php echo esc_attr__('Abbrechen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div class="ps-file-meta">
                    <div class="meta-row">
                        <span class="meta-key"><?php echo esc_html__('Datei:', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('ps-meta-name'); ?>" class="meta-val">...</span>
                    </div>
                    <div class="meta-row">
                        <span class="meta-key"><?php echo esc_html__('Umfang:', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('ps-meta-pages'); ?>" class="meta-val highlight"><?php echo esc_html__('0 Seiten', $text_domain); ?></span>
                    </div>
                </div>

                <div class="control-group">
                    <label><?php echo esc_html__('Seitenauswahl (Terminal)', $text_domain); ?></label>
                    <div class="terminal-input-wrap">
                        <span class="terminal-prefix">></span>
                        <input type="text" 
                               id="<?php echo esc_attr('ps-range-input'); ?>" 
                               class="ps-terminal-input" 
                               placeholder="<?php echo esc_attr__('z.B. 1, 3-5', $text_domain); ?>">
                    </div>
                    <p class="input-hint">
                        <?php echo esc_html__('Klicke auf die Seiten-Vorschau oder tippe den Bereich manuell ein.', $text_domain); ?>
                    </p>
                </div>

                <div class="ps-stats-box">
                    <span class="stat-lbl"><?php echo esc_html__('Extraktions-Pool:', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('ps-extract-count'); ?>" class="stat-num">0</span>
                </div>

                <!-- Progress Tracker: Asynchroner Shatter-Status -->
                <div class="encoding-progress hidden" id="<?php echo esc_attr('ps-encode-progress'); ?>">
                    <div class="progress-bar">
                        <div class="progress-fill" id="<?php echo esc_attr('encode-fill'); ?>"></div>
                    </div>
                    <span class="progress-text" id="<?php echo esc_attr('encode-text'); ?>">
                        <?php echo esc_html__('Extraktion läuft...', $text_domain); ?>
                    </span>
                </div>

                <button id="<?php echo esc_attr('ps-btn-extract'); ?>" class="btn-prime pink-glow mt-auto" disabled>
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span><?php echo esc_html__('Shatter Process', $text_domain); ?></span>
                </button>
            </div>

            <!-- Main Matrix Area: Visuelle Thumbnail-Engine -->
            <div class="glass-panel ps-matrix-panel">
                <div class="matrix-header">
                    <span class="panel-label"><?php echo esc_html__('Visuelle Seiten-Matrix', $text_domain); ?></span>
                    <div class="matrix-legend">
                        <span class="legend-item"><span class="legend-dot active"></span> <?php echo esc_html__('In Auswahl', $text_domain); ?></span>
                    </div>
                </div>
                
                <!-- Mounting Point für PDF.js Thumbnails -->
                <div class="matrix-container checkerboard" id="<?php echo esc_attr('ps-matrix-grid'); ?>">
                    <!-- Dynamische Injektion der Page-Blocks via JavaScript -->
                </div>
            </div>

        </div>

    </div>
</div>