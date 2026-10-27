<?php
/**
 * VGT MEDIACENTER - CODER MODULE
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Localization Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Abhängigkeit: jsdiff (Wird vom VGT Core bereitgestellt)
wp_enqueue_script('vgt-diff');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-coder'); ?>">
    
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
            <div class="hero-icon-wrapper cd-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Code Omega 2100', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Hochperformante Dual-Pane IDE. Führe differentielle Code-Analysen durch, extrahiere Deltas (Änderungen) und analysiere Modifikations-Sequenzen in Echtzeit.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body: Hauptbedienelemente -->
    <div class="tool-body cd-layout">
        
        <!-- Action Toolbar: Systemsteuerung -->
        <div class="cd-toolbar glass-panel">
            <div class="tb-status">
                <span class="pulse-dot"></span>
                <span class="status-text"><?php echo esc_html__('SYSTEM_STATUS: OPTIMAL', $text_domain); ?></span>
            </div>
            <div class="tb-actions">
                <button id="<?php echo esc_attr('btn-flush'); ?>" class="btn-action-small danger">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <?php echo esc_html__('FLUSH STREAMS', $text_domain); ?>
                </button>
                <button id="<?php echo esc_attr('btn-toggle-extractor'); ?>" class="btn-action-small highlight-purple">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <?php echo esc_html__('EXTRACTOR', $text_domain); ?>
                </button>
                <button id="<?php echo esc_attr('btn-execute-diff'); ?>" class="btn-prime cyan-glow">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <?php echo esc_html__('EXECUTE (DIFF)', $text_domain); ?>
                </button>
            </div>
        </div>

        <!-- ==================== EDITOR MATRIX ==================== -->
        <div id="<?php echo esc_attr('cd-editor-matrix'); ?>" class="cd-editor-grid">
            
            <!-- Source Alpha (Links) -->
            <div class="cd-editor-panel group-alpha">
                <div class="editor-header">
                    <div class="eh-tag alpha-tag"><?php echo esc_html__('SRC_ALPHA', $text_domain); ?></div>
                    <span class="eh-id"><?php echo esc_html__('ID: 8X-99', $text_domain); ?></span>
                    <div class="eh-line alpha-line"></div>
                </div>
                <div class="editor-container">
                    <div class="editor-corner top-right"></div>
                    <div class="editor-corner bottom-left"></div>
                    <textarea 
                        id="<?php echo esc_attr('cd-input-alpha'); ?>" 
                        class="cd-textarea" 
                        spellcheck="false" 
                        placeholder="<?php echo esc_attr__('// Paste Code Sequence Alpha...', $text_domain); ?>"></textarea>
                    <pre aria-hidden="true" class="cd-highlight"><code id="<?php echo esc_attr('cd-highlight-alpha'); ?>"></code></pre>
                    <span class="editor-watermark"><?php echo esc_html__('INPUT_STREAM_ACTIVE', $text_domain); ?></span>
                </div>
            </div>

            <!-- Source Beta (Rechts) -->
            <div class="cd-editor-panel group-beta">
                <div class="editor-header">
                    <div class="eh-tag beta-tag"><?php echo esc_html__('SRC_BETA', $text_domain); ?></div>
                    <span class="eh-id"><?php echo esc_html__('ID: 8X-100', $text_domain); ?></span>
                    <div class="eh-line beta-line"></div>
                </div>
                <div class="editor-container">
                    <div class="editor-corner top-right"></div>
                    <div class="editor-corner bottom-left"></div>
                    <textarea 
                        id="<?php echo esc_attr('cd-input-beta'); ?>" 
                        class="cd-textarea" 
                        spellcheck="false" 
                        placeholder="<?php echo esc_attr__('// Paste Code Sequence Beta...', $text_domain); ?>"></textarea>
                    <pre aria-hidden="true" class="cd-highlight"><code id="<?php echo esc_attr('cd-highlight-beta'); ?>"></code></pre>
                    <span class="editor-watermark"><?php echo esc_html__('MODIFICATION_LAYER', $text_domain); ?></span>
                </div>
            </div>

        </div>

        <!-- ==================== UNIFIED DIFF VIEW ==================== -->
        <div id="<?php echo esc_attr('cd-diff-view'); ?>" class="cd-diff-panel glass-panel hidden">
            <div class="diff-header">
                <div class="dh-title">
                    <span class="pulse-dot green-pulse"></span>
                    <span><?php echo esc_html__('DIFFERENTIAL_ANALYSIS_MATRIX', $text_domain); ?></span>
                </div>
                <button id="<?php echo esc_attr('btn-close-diff'); ?>" class="btn-action-small danger outline">
                    <?php echo esc_html__('[ TERMINATE VIEW ]', $text_domain); ?>
                </button>
            </div>
            <div id="<?php echo esc_attr('cd-diff-content'); ?>" class="diff-content checkerboard">
                <!-- JS injiziert hier die differenzierten Zeilen -->
            </div>
        </div>

        <!-- ==================== DELTA EXTRACTOR PANEL ==================== -->
        <div id="<?php echo esc_attr('cd-extractor-panel'); ?>" class="cd-extractor glass-panel collapsed">
            <div class="extractor-header" id="<?php echo esc_attr('btn-collapse-extractor'); ?>">
                <div class="ex-title">
                    <div class="ex-diamond"></div>
                    <span><?php echo esc_html__('Delta Extraction Module', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('cd-change-count'); ?>" class="ex-badge hidden"><?php echo esc_html__('0 DETECTED', $text_domain); ?></span>
                </div>
                <svg id="ex-chevron" viewBox="0 0 24 24" class="svg-icon ex-chevron">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            
            <div id="<?php echo esc_attr('cd-extractor-content'); ?>" class="extractor-content">
                <div class="ex-empty-state">
                    <div class="spinner"></div>
                    <span><?php echo esc_html__('// WAITING FOR DATA INPUT STREAMS...', $text_domain); ?></span>
                </div>
            </div>
        </div>

    </div>
</div>