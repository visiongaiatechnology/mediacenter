<?php
/**
 * VGT MEDIACENTER - VISION WHISTLEBLOW (REDACTION ENGINE)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Forensic Redaction Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependencies: PDF.js & PDF-Lib
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht die physische Zerstörung von Text-Layern direkt im Browser-RAM.
 */
wp_enqueue_script('vgt-pdf');
wp_enqueue_script('vgt-pdf-worker');
wp_enqueue_script('vgt-pdf-lib');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-whistle'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper wb-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VisionWhistleBlow', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Militärische Dokumenten-Schwärzung. Zerstört versteckte Text-Layer und Metadaten physisch durch Rasterisierung. 100% lokal und sicher für Whistleblower.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body wb-layout">
        
        <!-- Mode Selector: Strategische Wahl der Zensur-Methode -->
        <div class="wb-mode-selector glass-panel">
            <button class="mode-btn active" data-mode="<?php echo esc_attr('pdf'); ?>">
                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                <?php echo esc_html__('PDF-Shredder (Visuell)', $text_domain); ?>
            </button>
            <button class="mode-btn" data-mode="<?php echo esc_attr('text'); ?>">
                <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                <?php echo esc_html__('Text-Sanitizer (Regex)', $text_domain); ?>
            </button>
        </div>

        <!-- ==================== MODE: TEXT SANITIZER ==================== -->
        <div id="<?php echo esc_attr('wb-mode-text'); ?>" class="wb-mode-view hidden">
            <div class="wb-grid">
                <div class="glass-panel wb-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Original Datensatz', $text_domain); ?></span>
                        <div class="action-group">
                            <input type="text" 
                                   id="<?php echo esc_attr('wb-regex-input'); ?>" 
                                   class="vgt-input small" 
                                   placeholder="<?php echo esc_attr__('Zu schwärzende Worte (Komma getrennt)...', $text_domain); ?>">
                        </div>
                    </div>
                    <textarea id="<?php echo esc_attr('wb-text-input'); ?>" class="wb-textarea" placeholder="<?php echo esc_attr__('Kopiere deinen geheimen Text hier hinein...', $text_domain); ?>"></textarea>
                </div>
                
                <div class="glass-panel wb-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Sanitized Output', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('wb-btn-copy-text'); ?>" class="btn-action-small">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            <?php echo esc_html__('Copy', $text_domain); ?>
                        </button>
                    </div>
                    <textarea id="<?php echo esc_attr('wb-text-output'); ?>" class="wb-textarea output" readonly placeholder="<?php echo esc_attr__('Geschwärzter Text erscheint hier...', $text_domain); ?>"></textarea>
                </div>
            </div>
        </div>

        <!-- ==================== MODE: PDF SHREDDER ==================== -->
        <div id="<?php echo esc_attr('wb-mode-pdf'); ?>" class="wb-mode-view">
            
            <!-- Ingestion Zone (Dropzone) -->
            <div class="glass-panel drop-zone" id="<?php echo esc_attr('wb-pdf-dropzone'); ?>">
                <div class="drop-content">
                    <div class="drop-icon-glow pink"></div>
                    <svg viewBox="0 0 24 24" class="drop-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    <h3 class="drop-title"><?php echo esc_html__('PDF injizieren', $text_domain); ?></h3>
                    <p class="drop-subtitle"><?php echo esc_html__('Ziehe ein Dokument hierher zur visuellen Zensur', $text_domain); ?></p>
                    <div class="drop-badge"><?php echo esc_html__('Lokale Render-Engine', $text_domain); ?></div>
                </div>
                <input type="file" id="<?php echo esc_attr('wb-pdf-input'); ?>" class="hidden-input" accept="<?php echo esc_attr('application/pdf'); ?>" />
            </div>

            <!-- PDF Workspace (Hidden until load) -->
            <div id="<?php echo esc_attr('wb-pdf-workspace'); ?>" class="wb-pdf-layout hidden">
                
                <!-- Toolbar: Navigations- und Korrektur-Matrix -->
                <div class="glass-panel wb-toolbar">
                    <div class="toolbar-nav">
                        <button id="<?php echo esc_attr('wb-pdf-prev'); ?>" class="btn-nav" disabled><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                        <span class="page-indicator"><?php echo esc_html__('Seite', $text_domain); ?> <span id="<?php echo esc_attr('wb-page-current'); ?>">1</span> / <span id="<?php echo esc_attr('wb-page-total'); ?>">?</span></span>
                        <button id="<?php echo esc_attr('wb-pdf-next'); ?>" class="btn-nav"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                    
                    <div class="toolbar-actions">
                        <button id="<?php echo esc_attr('wb-btn-undo'); ?>" class="btn-action-small">
                            <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
                            <?php echo esc_html__('Rückgängig (Seite)', $text_domain); ?>
                        </button>
                        <button id="<?php echo esc_attr('wb-btn-close-pdf'); ?>" class="btn-action-small danger">
                            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <?php echo esc_html__('Verwerfen', $text_domain); ?>
                        </button>
                    </div>
                </div>

                <!-- Main Canvas Container: Forensische Manipulations-Fläche -->
                <div class="wb-canvas-container checkerboard" id="<?php echo esc_attr('wb-canvas-wrapper'); ?>">
                    <div class="canvas-loading" id="<?php echo esc_attr('wb-canvas-loader'); ?>">
                        <div class="spinner"></div>
                        <span><?php echo esc_html__('Rendere Vektoren...', $text_domain); ?></span>
                    </div>
                    
                    <!-- Background Canvas: PDF-Signatur-Render -->
                    <canvas id="<?php echo esc_attr('wb-pdf-canvas'); ?>"></canvas>
                    
                    <!-- Foreground Canvas: Aktive Zensur-Layer (Drawing) -->
                    <canvas id="<?php echo esc_attr('wb-draw-canvas'); ?>"></canvas>
                </div>

                <!-- Export Panel: Destruktive Finalisierung -->
                <div class="glass-panel wb-export-panel">
                    <div class="export-warning">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span><?php echo esc_html__('Hinweis: Das Master-PDF wird als Bild gerastert, um die Text-Layer unter den Zensurblöcken physisch und unwiderruflich zu zerstören.', $text_domain); ?></span>
                    </div>
                    
                    <!-- Progress Tracker -->
                    <div class="encoding-progress hidden" id="<?php echo esc_attr('wb-export-progress'); ?>">
                        <div class="progress-bar">
                            <div class="progress-fill pink-fill" id="<?php echo esc_attr('wb-progress-fill'); ?>"></div>
                        </div>
                        <span class="progress-text" id="<?php echo esc_attr('wb-progress-text'); ?>">
                            <?php echo esc_html__('Rastere Seite 1...', $text_domain); ?>
                        </span>
                    </div>

                    <button id="<?php echo esc_attr('wb-btn-export'); ?>" class="btn-prime pink-glow">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <?php echo esc_html__('Sicheres Zensur-PDF Exportieren', $text_domain); ?>
                    </button>
                </div>

            </div>

        </div>

    </div>
</div>