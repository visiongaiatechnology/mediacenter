<?php
/**
 * VGT MEDIACENTER - README ARCHITECT (MARKDOWN ENGINE)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Live-Render Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Zero Dependencies - Dual Render Engine (MD + HTML) im Frontend.
 * Nutzt die kognitive VGT State-to-Markdown Logik für professionelle Dokumentationen.
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-readme'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper rm-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT ReadMe Architect', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Visuelle State-to-Markdown Engine. Baue professionelle Dokumentationen über modulare Blöcke und kompiliere sie in Echtzeit zu Raw-Markdown und GitHub-ähnlichem HTML.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body rm-layout">
        
        <!-- Left: Modular Editor Canvas -->
        <div class="rm-editor-panel glass-panel">
            
            <div class="panel-header" style="margin-bottom: 1rem;">
                <span class="panel-label"><?php echo esc_html__('Architektur-Blöcke', $text_domain); ?></span>
            </div>

            <!-- Toolbar: Block-Injektions-Vektoren -->
            <div class="rm-toolbar">
                <button class="btn-action-small" data-add="<?php echo esc_attr('header'); ?>">
                    <svg viewBox="0 0 24 24"><path d="M4 12h16M4 18V6M20 18V6"></path></svg> 
                    <?php echo esc_html__('Header', $text_domain); ?>
                </button>
                <button class="btn-action-small" data-add="<?php echo esc_attr('shield_group'); ?>">
                    <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 
                    <?php echo esc_html__('Shields', $text_domain); ?>
                </button>
                <button class="btn-action-small" data-add="<?php echo esc_attr('text'); ?>">
                    <svg viewBox="0 0 24 24"><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="12" x2="9" y2="12"></line><line x1="21" y1="18" x2="7" y2="18"></line></svg> 
                    <?php echo esc_html__('Text', $text_domain); ?>
                </button>
                <button class="btn-action-small" data-add="<?php echo esc_attr('code'); ?>">
                    <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> 
                    <?php echo esc_html__('Code', $text_domain); ?>
                </button>
                <button class="btn-action-small" data-add="<?php echo esc_attr('table'); ?>">
                    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg> 
                    <?php echo esc_html__('Tabelle', $text_domain); ?>
                </button>
            </div>

            <!-- Editor-Canvas: Mounting-Point für dynamische Blöcke -->
            <div id="<?php echo esc_attr('rm-editor-canvas'); ?>" class="rm-canvas custom-scrollbar mt-4">
                <!-- Dynamische Injektion der Editoren via JavaScript Engine -->
            </div>

        </div>

        <!-- Right: Compiled Output Matrix -->
        <div class="rm-output-panel">
            
            <!-- Output Tabs & Export Actions -->
            <div class="rm-tabs glass-panel">
                <button class="rm-tab-btn active" data-target="<?php echo esc_attr('rm-view-preview'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <?php echo esc_html__('Live Vorschau', $text_domain); ?>
                </button>
                <button class="rm-tab-btn" data-target="<?php echo esc_attr('rm-view-raw'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                    <?php echo esc_html__('Raw Markdown', $text_domain); ?>
                </button>
                
                <div class="rm-actions ml-auto">
                    <button id="<?php echo esc_attr('btn-rm-copy'); ?>" class="btn-action-small highlight-cyan">
                        <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <?php echo esc_html__('Copy MD', $text_domain); ?>
                    </button>
                    <button id="<?php echo esc_attr('btn-rm-download'); ?>" class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <?php echo esc_html__('.md Datei', $text_domain); ?>
                    </button>
                </div>
            </div>

            <!-- View 1: HTML Preview (GitHub Aesthetic) -->
            <div id="<?php echo esc_attr('rm-view-preview'); ?>" class="glass-panel rm-view-content custom-scrollbar active">
                <div id="<?php echo esc_attr('rm-html-output'); ?>" class="markdown-body">
                    <!-- Gerendertes HTML via Frontend Guard sanitized -->
                </div>
            </div>

            <!-- View 2: Raw Markdown Source -->
            <div id="<?php echo esc_attr('rm-view-raw'); ?>" class="glass-panel rm-view-content hidden p-0">
                <textarea 
                    id="<?php echo esc_attr('rm-md-output'); ?>" 
                    readonly 
                    spellcheck="false" 
                    class="rm-raw-textarea custom-scrollbar"></textarea>
            </div>

        </div>

    </div>
</div>