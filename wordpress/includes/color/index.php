<?php
/**
 * VGT MEDIACENTER - CHROMATIC ENGINE (SPECTRUM LAB)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & UI-State Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Zero Dependencies - 100% Native VGT Color Math im Frontend
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-color'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper ce-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <circle cx="13.5" cy="6.5" r=".5"></circle>
                    <circle cx="17.5" cy="10.5" r=".5"></circle>
                    <circle cx="8.5" cy="7.5" r=".5"></circle>
                    <circle cx="6.5" cy="12.5" r=".5"></circle>
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Chromatic Engine', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Hochpräzises Spektral-Labor. Berechne Farbvektoren, validiere WCAG-Kontraste in Echtzeit oder extrahiere die dominanten Farb-Signaturen aus komplexem Bildmaterial.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body ce-layout">

        <!-- MASSIVE MODE TABS -->
        <div class="cipher-mode-tabs">
            <button class="mode-tab active" data-mode="<?php echo esc_attr('synth'); ?>">
                <svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>
                <div class="mt-text">
                    <span class="mt-title"><?php echo esc_html__('Spektral-Synthese', $text_domain); ?></span>
                    <span class="mt-sub"><?php echo esc_html__('Vektoren, Harmonien & WCAG Contrast', $text_domain); ?></span>
                </div>
            </button>
            <button class="mode-tab" data-mode="<?php echo esc_attr('extract'); ?>">
                <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <div class="mt-text">
                    <span class="mt-title"><?php echo esc_html__('Photonen-Extraktion', $text_domain); ?></span>
                    <span class="mt-sub"><?php echo esc_html__('Dominante Bild-Paletten analysieren', $text_domain); ?></span>
                </div>
            </button>
        </div>

        <!-- ==================== MODE 1: SYNTHESIS ==================== -->
        <div id="<?php echo esc_attr('workspace-synth'); ?>" class="workspace-area active-workspace">
            
            <div class="ce-synth-grid">
                
                <!-- Left: Master Control -->
                <div class="ce-master-control glass-panel">
                    
                    <!-- Primary Color Swatch -->
                    <div class="master-swatch-wrap checkerboard">
                        <div class="master-swatch" id="<?php echo esc_attr('ce-master-swatch'); ?>" style="background-color: #3b82f6;"></div>
                        <input type="color" id="<?php echo esc_attr('ce-native-picker'); ?>" class="hidden-input">
                        <button class="btn-picker-trigger" id="<?php echo esc_attr('btn-picker-trigger'); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                        </button>
                    </div>

                    <!-- Output Terminals -->
                    <div class="terminal-outputs mt-4">
                        <div class="terminal-box">
                            <span class="terminal-lbl"><?php echo esc_html__('HEX', $text_domain); ?></span>
                            <div class="terminal-val-wrap">
                                <input type="text" id="<?php echo esc_attr('ce-val-hex'); ?>" class="terminal-input" value="#3B82F6">
                                <button class="btn-copy-small" data-target="<?php echo esc_attr('ce-val-hex'); ?>"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                            </div>
                        </div>
                        <div class="terminal-box">
                            <span class="terminal-lbl"><?php echo esc_html__('RGB', $text_domain); ?></span>
                            <div class="terminal-val-wrap">
                                <input type="text" id="<?php echo esc_attr('ce-val-rgb'); ?>" class="terminal-input" value="rgb(59, 130, 246)">
                                <button class="btn-copy-small" data-target="<?php echo esc_attr('ce-val-rgb'); ?>"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                            </div>
                        </div>
                        <div class="terminal-box">
                            <span class="terminal-lbl"><?php echo esc_html__('HSL', $text_domain); ?></span>
                            <div class="terminal-val-wrap">
                                <input type="text" id="<?php echo esc_attr('ce-val-hsl'); ?>" class="terminal-input" value="hsl(217, 90%, 60%)">
                                <button class="btn-copy-small" data-target="<?php echo esc_attr('ce-val-hsl'); ?>"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                            </div>
                        </div>
                    </div>

                    <!-- HSL Vector Sliders -->
                    <div class="vector-sliders mt-4">
                        <div class="control-group">
                            <div class="control-label-row">
                                <label><?php echo esc_html__('Hue (Farbton)', $text_domain); ?></label>
                                <span id="<?php echo esc_attr('lbl-h'); ?>" class="val-badge">217°</span>
                            </div>
                            <input type="range" id="<?php echo esc_attr('ce-slider-h'); ?>" class="vgt-slider hue-slider" min="0" max="360" value="217">
                        </div>
                        <div class="control-group">
                            <div class="control-label-row">
                                <label><?php echo esc_html__('Saturation (Sättigung)', $text_domain); ?></label>
                                <span id="<?php echo esc_attr('lbl-s'); ?>" class="val-badge">90%</span>
                            </div>
                            <input type="range" id="<?php echo esc_attr('ce-slider-s'); ?>" class="vgt-slider sat-slider" min="0" max="100" value="90">
                        </div>
                        <div class="control-group">
                            <div class="control-label-row">
                                <label><?php echo esc_html__('Lightness (Helligkeit)', $text_domain); ?></label>
                                <span id="<?php echo esc_attr('lbl-l'); ?>" class="val-badge">60%</span>
                            </div>
                            <input type="range" id="<?php echo esc_attr('ce-slider-l'); ?>" class="vgt-slider lum-slider" min="0" max="100" value="60">
                        </div>
                    </div>

                </div>

                <!-- Right: Analytics & Harmonies -->
                <div class="ce-analytics">
                    
                    <!-- Contrast Checker (WCAG) -->
                    <div class="glass-panel contrast-panel">
                        <div class="panel-header">
                            <span class="panel-label"><?php echo esc_html__('WCAG 2.1 Contrast Engine', $text_domain); ?></span>
                            <span class="status-badge" id="<?php echo esc_attr('ce-contrast-ratio'); ?>"><?php echo esc_html__('Ratio: 0.00', $text_domain); ?></span>
                        </div>

                        <div class="contrast-demo-wrap">
                            <!-- White Background Test -->
                            <div class="contrast-box bg-white" id="<?php echo esc_attr('cb-white'); ?>">
                                <span class="c-text" id="<?php echo esc_attr('ct-white'); ?>"><?php echo esc_html__('VGT SUPREME', $text_domain); ?></span>
                                <div class="c-badges">
                                    <span class="c-badge" id="<?php echo esc_attr('cb-white-aa'); ?>"><?php echo esc_html__('AA', $text_domain); ?></span>
                                    <span class="c-badge" id="<?php echo esc_attr('cb-white-aaa'); ?>"><?php echo esc_html__('AAA', $text_domain); ?></span>
                                </div>
                            </div>
                            <!-- Black Background Test -->
                            <div class="contrast-box bg-black" id="<?php echo esc_attr('cb-black'); ?>">
                                <span class="c-text" id="<?php echo esc_attr('ct-black'); ?>"><?php echo esc_html__('VGT SUPREME', $text_domain); ?></span>
                                <div class="c-badges">
                                    <span class="c-badge" id="<?php echo esc_attr('cb-black-aa'); ?>"><?php echo esc_html__('AA', $text_domain); ?></span>
                                    <span class="c-badge" id="<?php echo esc_attr('cb-black-aaa'); ?>"><?php echo esc_html__('AAA', $text_domain); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Harmonies -->
                    <div class="glass-panel harmonies-panel">
                        <div class="panel-header" style="margin-bottom: 1rem;">
                            <span class="panel-label"><?php echo esc_html__('Architektonische Harmonien', $text_domain); ?></span>
                        </div>
                        
                        <div class="harmony-group">
                            <span class="harmony-title"><?php echo esc_html__('Komplementär (180°)', $text_domain); ?></span>
                            <div class="harmony-swatches" id="<?php echo esc_attr('harm-comp'); ?>">
                                <!-- Dynamische Injektion via JavaScript -->
                            </div>
                        </div>

                        <div class="harmony-group">
                            <span class="harmony-title"><?php echo esc_html__('Analog (±30°)', $text_domain); ?></span>
                            <div class="harmony-swatches" id="<?php echo esc_attr('harm-analog'); ?>"></div>
                        </div>

                        <div class="harmony-group">
                            <span class="harmony-title"><?php echo esc_html__('Triadisch (+120°, +240°)', $text_domain); ?></span>
                            <div class="harmony-swatches" id="<?php echo esc_attr('harm-triad'); ?>"></div>
                        </div>
                        
                        <div class="harmony-group">
                            <span class="harmony-title"><?php echo esc_html__('Split-Komplementär', $text_domain); ?></span>
                            <div class="harmony-swatches" id="<?php echo esc_attr('harm-split'); ?>"></div>
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <!-- ==================== MODE 2: EXTRACTOR ==================== -->
        <div id="<?php echo esc_attr('workspace-extract'); ?>" class="workspace-area hidden">
            
            <div class="glass-panel drop-zone" id="<?php echo esc_attr('ce-dropzone'); ?>">
                <div class="drop-content">
                    <div class="drop-icon-glow teal"></div>
                    <svg viewBox="0 0 24 24" class="drop-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <h3 class="drop-title"><?php echo esc_html__('Bildmaterial injizieren', $text_domain); ?></h3>
                    <p class="drop-subtitle"><?php echo esc_html__('Ziehe ein JPG, PNG, WEBP hierher für die Analyse', $text_domain); ?></p>
                </div>
                <input type="file" id="<?php echo esc_attr('ce-file-input'); ?>" class="hidden-input" accept="image/*" />
            </div>

            <div id="<?php echo esc_attr('ce-extractor-workspace'); ?>" class="ce-extractor-grid hidden">
                
                <!-- Left: Canvas Image -->
                <div class="glass-panel ce-image-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Source Render', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-reset-extract'); ?>" class="btn-action-small danger">
                            <?php echo esc_html__('Verwerfen', $text_domain); ?>
                        </button>
                    </div>
                    <div class="ce-canvas-wrap checkerboard" id="<?php echo esc_attr('ce-canvas-wrap'); ?>">
                        <div class="ce-crosshair hidden" id="<?php echo esc_attr('ce-crosshair'); ?>"></div>
                        <canvas id="<?php echo esc_attr('ce-image-canvas'); ?>"></canvas>
                    </div>
                    <p class="ce-instruction">
                        <?php echo esc_html__('Klicke auf eine beliebige Stelle im Bild, um den exakten Pixel-Vektor (Pipette) auszulesen.', $text_domain); ?>
                    </p>
                </div>

                <!-- Right: Extracted Data -->
                <div class="ce-extracted-data">
                    
                    <!-- Exact Pixel Pick -->
                    <div class="glass-panel ce-picked-panel">
                        <span class="panel-label" style="display:block; margin-bottom:1rem; border-bottom:1px solid var(--vg-border); padding-bottom:0.5rem;">
                            <?php echo esc_html__('Pixel-Signatur (Pipette)', $text_domain); ?>
                        </span>
                        <div class="picked-data-wrap">
                            <div class="picked-swatch checkerboard">
                                <div id="<?php echo esc_attr('ce-picked-color'); ?>" style="background:transparent; width:100%; height:100%;"></div>
                            </div>
                            <div class="terminal-box" style="flex:1;">
                                <div class="terminal-val-wrap">
                                    <input type="text" id="<?php echo esc_attr('ce-picked-hex'); ?>" class="terminal-input" readonly value="#------">
                                    <button class="btn-copy-small" data-target="<?php echo esc_attr('ce-picked-hex'); ?>"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Dominant Palette -->
                    <div class="glass-panel ce-dominant-panel">
                        <div class="panel-header" style="margin-bottom: 1rem;">
                            <span class="panel-label"><?php echo esc_html__('Dominante Farb-Matrix', $text_domain); ?></span>
                            <span class="status-badge" id="<?php echo esc_attr('ce-dom-status'); ?>"><?php echo esc_html__('Berechne...', $text_domain); ?></span>
                        </div>
                        
                        <div class="dominant-palette" id="<?php echo esc_attr('ce-dominant-palette'); ?>">
                            <!-- Dynamische Injektion der dominanten Farben via JavaScript -->
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </div>
</div>