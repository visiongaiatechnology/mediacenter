<?php
/**
 * VGT MEDIACENTER - JSON ARCHITECT (IDE & ANALYTICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & IDE Structure Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Zero Dependencies - 100% Native JS JSON Parser im Frontend.
 * Nutzt hochperformante kognitive Algorithmen zur Baum-Struktur-Analyse.
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-json'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper js-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M9 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h2M15 3h2a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-2"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT JSON Architect', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Entwickler-Terminal zur Formatierung, Validierung und Baum-Struktur-Analyse von komplexen JSON-Datenströmen. 100% lokales Parsing.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body js-layout">
        
        <!-- Control Strip (Top): System-Aktionen -->
        <div class="glass-panel js-toolbar">
            <div class="tb-group">
                <button id="<?php echo esc_attr('js-btn-format'); ?>" class="btn-action">
                    <svg viewBox="0 0 24 24" class="svg-icon"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>
                    <?php echo esc_html__('Formatieren (Beautify)', $text_domain); ?>
                </button>
                <button id="<?php echo esc_attr('js-btn-minify'); ?>" class="btn-action">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                    <?php echo esc_html__('Minify (Kompakt)', $text_domain); ?>
                </button>
            </div>

            <div class="tb-group center-status">
                <span class="status-badge" id="<?php echo esc_attr('js-status'); ?>">
                    <span class="pulse-dot"></span> 
                    <span id="<?php echo esc_attr('js-status-text'); ?>"><?php echo esc_html__('Bereit für Datenstrom', $text_domain); ?></span>
                </span>
            </div>

            <div class="tb-group end">
                <label class="btn-action outline">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <?php echo esc_html__('Datei laden', $text_domain); ?>
                    <input type="file" id="<?php echo esc_attr('js-file-in'); ?>" class="hidden-input" accept=".json,application/json">
                </label>
                <button id="<?php echo esc_attr('js-btn-clear'); ?>" class="btn-action danger">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <?php echo esc_html__('Wischen', $text_domain); ?>
                </button>
            </div>
        </div>

        <!-- Main IDE Grid: Input & Visualization -->
        <div class="js-ide-grid">
            
            <!-- Left: Raw Input (Editor) -->
            <div class="glass-panel js-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Raw Input (Editor)', $text_domain); ?></span>
                    <button class="btn-icon-small" id="<?php echo esc_attr('js-btn-paste'); ?>" title="<?php echo esc_attr__('Einfügen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                    </button>
                </div>
                <div class="editor-wrap">
                    <textarea 
                        id="<?php echo esc_attr('js-input'); ?>" 
                        class="js-textarea" 
                        placeholder="<?php echo esc_attr__("{\n  \"vgt_status\": \"ready\",\n  \"input_required\": true\n}", $text_domain); ?>"></textarea>
                </div>
                
                <!-- Metrics Bar: Live-Telemetrie -->
                <div class="metrics-bar">
                    <div class="metric">
                        <span class="m-val" id="<?php echo esc_attr('met-size'); ?>">0 B</span>
                        <span class="m-lbl"><?php echo esc_html__('Größe', $text_domain); ?></span>
                    </div>
                    <div class="metric">
                        <span class="m-val" id="<?php echo esc_attr('met-keys'); ?>">0</span>
                        <span class="m-lbl"><?php echo esc_html__('Keys', $text_domain); ?></span>
                    </div>
                    <div class="metric">
                        <span class="m-val" id="<?php echo esc_attr('met-objs'); ?>">0</span>
                        <span class="m-lbl"><?php echo esc_html__('Objects', $text_domain); ?></span>
                    </div>
                    <div class="metric">
                        <span class="m-val" id="<?php echo esc_attr('met-arrs'); ?>">0</span>
                        <span class="m-lbl"><?php echo esc_html__('Arrays', $text_domain); ?></span>
                    </div>
                </div>
            </div>

            <!-- Right: Visualizer Output -->
            <div class="glass-panel js-panel">
                <div class="panel-header">
                    <div class="js-view-toggles">
                        <button class="view-toggle active" data-view="<?php echo esc_attr('highlight'); ?>"><?php echo esc_html__('Syntax-Code', $text_domain); ?></button>
                        <button class="view-toggle" data-view="<?php echo esc_attr('tree'); ?>"><?php echo esc_html__('Data-Tree', $text_domain); ?></button>
                    </div>
                    <div class="action-group">
                        <button class="btn-icon-small" id="<?php echo esc_attr('js-btn-copy'); ?>" title="<?php echo esc_attr__('Ergebnis kopieren', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                        <button class="btn-icon-small" id="<?php echo esc_attr('js-btn-download'); ?>" title="<?php echo esc_attr__('Als .json speichern', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        </button>
                    </div>
                </div>

                <div class="visualizer-wrap" id="<?php echo esc_attr('js-output-wrap'); ?>">
                    
                    <!-- Highlight View: Syntax Highlighting -->
                    <pre id="<?php echo esc_attr('view-highlight'); ?>" class="js-code-view active-view"><code id="<?php echo esc_attr('js-highlight-code'); ?>" class="language-json"><span style="color:var(--vg-text-muted); font-style:italic;"><?php echo esc_html__('// Analysiertes JSON erscheint hier...', $text_domain); ?></span></code></pre>
                    
                    <!-- Tree View: Interaktive Objekt-Matrix -->
                    <div id="<?php echo esc_attr('view-tree'); ?>" class="js-tree-view">
                        <div class="tree-placeholder" id="<?php echo esc_attr('tree-placeholder'); ?>">
                            <?php echo esc_html__('Warte auf validen JSON-Code.', $text_domain); ?>
                        </div>
                        <ul class="vgt-json-tree" id="<?php echo esc_attr('js-tree-root'); ?>"></ul>
                    </div>

                    <!-- Error Overlay: Kognitive Crash-Abwehr -->
                    <div id="<?php echo esc_attr('js-error-overlay'); ?>" class="error-overlay hidden">
                        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        <h4 style="margin: 0.5rem 0 0.25rem 0;"><?php echo esc_html__('Syntax Error (Parser Crash)', $text_domain); ?></h4>
                        <p id="<?php echo esc_attr('js-error-msg'); ?>"><?php echo esc_html__("Unexpected token ' in JSON at position 42", $text_domain); ?></p>
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>