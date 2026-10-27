<?php
/**
 * VGT MEDIACENTER - TRUTHLENSE ENGINE (DIFF ANALYTICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Diff-Integrity Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: jsdiff (vgt-diff)
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht hochpräzisen Echtzeit-Vergleich von Datenströmen im Browser-RAM.
 */
wp_enqueue_script('vgt-diff');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-truthlense'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('Zurück zum Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper tl-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M12 3v18M4 11h16M7 11l-3 7h6l-3-7zM17 11l-3 7h6l-3-7z"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Truthlense Engine', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Echtzeit-Text- und Code-Vergleich. Identifiziert Anomalien, Hinzufügungen und Löschungen präzise auf Wort- oder Zeilenebene.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body tl-layout">
        
        <!-- Controls Context Bar: Analyse-Parameter -->
        <div class="glass-panel tl-controls">
            <div class="tl-control-group">
                <label class="tl-label"><?php echo esc_html__('Analyse-Modus:', $text_domain); ?></label>
                <div class="tl-toggle-group">
                    <button class="tl-toggle active" data-mode="<?php echo esc_attr('lines'); ?>">
                        <?php echo esc_html__('Zeilen-Level', $text_domain); ?>
                    </button>
                    <button class="tl-toggle" data-mode="<?php echo esc_attr('words'); ?>">
                        <?php echo esc_html__('Wort-Level', $text_domain); ?>
                    </button>
                    <button class="tl-toggle" data-mode="<?php echo esc_attr('chars'); ?>">
                        <?php echo esc_html__('Zeichen-Level', $text_domain); ?>
                    </button>
                </div>
            </div>
            
            <!-- Statistics Cluster: Live-Anomalie-Metrik -->
            <div class="tl-stats" id="<?php echo esc_attr('tl-stats-container'); ?>">
                <div class="stat-pill stat-removed">
                    <svg viewBox="0 0 24 24" class="svg-icon"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span id="<?php echo esc_attr('stat-del'); ?>">0</span> <?php echo esc_html__('Entfernt', $text_domain); ?>
                </div>
                <div class="stat-pill stat-added">
                    <svg viewBox="0 0 24 24" class="svg-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    <span id="<?php echo esc_attr('stat-add'); ?>">0</span> <?php echo esc_html__('Hinzugefügt', $text_domain); ?>
                </div>
            </div>
        </div>

        <!-- Input Grid: Dual-Pane Editor Matrix -->
        <div class="tl-input-grid">
            
            <!-- Source A: Original-Datenstrom -->
            <div class="tl-editor-box">
                <div class="tl-editor-header">
                    <span class="tl-editor-title"><?php echo esc_html__('A: Original-Datensatz', $text_domain); ?></span>
                    <label class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <?php echo esc_html__('Laden', $text_domain); ?>
                        <input type="file" 
                               id="<?php echo esc_attr('tl-file-original'); ?>" 
                               accept="<?php echo esc_attr('.txt,.md,.json,.html,.csv,.js,.php'); ?>" 
                               class="hidden-input">
                    </label>
                </div>
                <textarea 
                    id="<?php echo esc_attr('tl-input-original'); ?>" 
                    class="tl-textarea" 
                    spellcheck="false" 
                    placeholder="<?php echo esc_attr__('Füge den Original-Text hier ein...', $text_domain); ?>"></textarea>
            </div>

            <!-- Source B: Modifizierter Datenstrom -->
            <div class="tl-editor-box">
                <div class="tl-editor-header">
                    <span class="tl-editor-title"><?php echo esc_html__('B: Modifizierter Datensatz', $text_domain); ?></span>
                    <label class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <?php echo esc_html__('Laden', $text_domain); ?>
                        <input type="file" 
                               id="<?php echo esc_attr('tl-file-modified'); ?>" 
                               accept="<?php echo esc_attr('.txt,.md,.json,.html,.csv,.js,.php'); ?>" 
                               class="hidden-input">
                    </label>
                </div>
                <textarea 
                    id="<?php echo esc_attr('tl-input-modified'); ?>" 
                    class="tl-textarea tl-glow-focus" 
                    spellcheck="false" 
                    placeholder="<?php echo esc_attr__('Füge den modifizierten Text hier ein...', $text_domain); ?>"></textarea>
            </div>
        </div>

        <!-- Output Matrix: Unified Diff-View -->
        <div class="tl-output-matrix glass-panel">
            <div class="tl-editor-header output-header">
                <span class="tl-editor-title"><?php echo esc_html__('Diff-Analyse (Unified View)', $text_domain); ?></span>
                <button id="<?php echo esc_attr('tl-btn-clear'); ?>" class="btn-action-small danger" title="<?php echo esc_attr__('Eingaben löschen', $text_domain); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <?php echo esc_html__('Wischen', $text_domain); ?>
                </button>
            </div>
            
            <!-- Mounting Point für die Differentiations-Vektoren -->
            <div id="<?php echo esc_attr('tl-output-content'); ?>" class="tl-output-render tl-mono">
                <div class="tl-placeholder-text">
                    <?php echo esc_html__('Warte auf Dateneingabe für die Anomalie-Erkennung...', $text_domain); ?>
                </div>
            </div>
        </div>

    </div>
</div>