<?php
/**
 * VGT MEDIACENTER - QUANTUM SQUEEZE (IMAGE COMPRESSOR)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & UI-Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: compressor.js (Wird über den VGT Core bereitgestellt)
 * Ermöglicht verlustfreie Kompression direkt im Browser-RAM.
 */
wp_enqueue_script('vgt-compressor');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-imgcomp'); ?>">
    
    <!-- Hero Header: Navigation und Titelbereich -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper ic-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <polyline points="7 16 3 12 7 8"></polyline><line x1="3" y1="12" x2="11" y2="12"></line>
                    <polyline points="17 8 21 12 17 16"></polyline><line x1="21" y1="12" x2="13" y2="12"></line>
                    <line x1="12" y1="4" x2="12" y2="20"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Quantum Squeeze', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Verlustfreie und verlustbehaftete Bildkompression im Browser. Reduziere Dateigrößen massiv, ohne deine Bilder in eine fremde Cloud hochzuladen.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body">
        
        <!-- View 1: Dropzone (Initial Ingestion) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('ic-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                <h3 class="drop-title"><?php echo esc_html__('Bildmaterial injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Ziehe ein JPG, PNG oder WEBP hierher', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Unlimitiertes Limit (Local)', $text_domain); ?></div>
            </div>
            <input type="file" id="<?php echo esc_attr('ic-file-input'); ?>" class="hidden-input" accept="image/jpeg, image/png, image/webp" />
        </div>

        <!-- View 2: Workspace View (Hidden until Ingestion) -->
        <div id="<?php echo esc_attr('ic-workspace'); ?>" class="ic-workspace hidden">
            
            <!-- Controls Sidebar: Kompressions-Parameter -->
            <div class="glass-panel ic-controls">
                <div class="controls-header">
                    <span class="panel-label"><?php echo esc_html__('Kompressions-Matrix', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('ic-btn-reset'); ?>" class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        <?php echo esc_html__('Verwerfen', $text_domain); ?>
                    </button>
                </div>

                <!-- Quality Control -->
                <div class="control-group">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('Qualität (Entropy)', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('lbl-quality'); ?>" class="val-badge">80%</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('ic-quality'); ?>" class="vgt-slider" min="0" max="100" value="80" step="1">
                </div>

                <!-- Dimension Control -->
                <div class="control-group">
                    <label><?php echo esc_html__('Maximale Dimensionen (px)', $text_domain); ?></label>
                    <div class="dim-inputs">
                        <div class="input-wrap">
                            <span class="dim-prefix"><?php echo esc_html__('W', $text_domain); ?></span>
                            <input type="number" id="<?php echo esc_attr('ic-max-width'); ?>" class="vgt-input" placeholder="<?php echo esc_attr__('Auto', $text_domain); ?>">
                        </div>
                        <div class="dim-separator"><svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                        <div class="input-wrap">
                            <span class="dim-prefix"><?php echo esc_html__('H', $text_domain); ?></span>
                            <input type="number" id="<?php echo esc_attr('ic-max-height'); ?>" class="vgt-input" placeholder="<?php echo esc_attr__('Auto', $text_domain); ?>">
                        </div>
                    </div>
                </div>

                <!-- Format Selection -->
                <div class="control-group">
                    <label><?php echo esc_html__('Output Format', $text_domain); ?></label>
                    <div class="format-toggles">
                        <button class="fmt-btn active" data-fmt="<?php echo esc_attr('auto'); ?>"><?php echo esc_html__('Auto', $text_domain); ?></button>
                        <button class="fmt-btn" data-fmt="<?php echo esc_attr('image/jpeg'); ?>"><?php echo esc_html__('JPG', $text_domain); ?></button>
                        <button class="fmt-btn" data-fmt="<?php echo esc_attr('image/webp'); ?>"><?php echo esc_html__('WEBP', $text_domain); ?></button>
                        <button class="fmt-btn" data-fmt="<?php echo esc_attr('image/png'); ?>"><?php echo esc_html__('PNG', $text_domain); ?></button>
                    </div>
                </div>

                <!-- Action Button -->
                <button id="<?php echo esc_attr('ic-btn-download'); ?>" class="btn-prime orange-glow mt-auto">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <?php echo esc_html__('Optimiertes Bild speichern', $text_domain); ?>
                </button>
            </div>

            <!-- Previews & Stats: Visueller Abgleich -->
            <div class="ic-previews">
                
                <!-- Telemetry Header -->
                <div class="glass-panel ic-stats-panel">
                    <div class="stat-box">
                        <span class="stat-label"><?php echo esc_html__('Original', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('stat-orig-size'); ?>" class="stat-val">0 MB</span>
                    </div>
                    <div class="stat-divider">
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="13 17 18 12 13 7"></polyline><line x1="6" y1="12" x2="18" y2="12"></line></svg>
                    </div>
                    <div class="stat-box">
                        <span class="stat-label"><?php echo esc_html__('Komprimiert', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('stat-comp-size'); ?>" class="stat-val highlight-orange">0 MB</span>
                    </div>
                    <div class="stat-savings" id="<?php echo esc_attr('stat-savings'); ?>">
                        <span class="savings-val">-0%</span>
                        <span class="savings-label"><?php echo esc_html__('Speicher gespart', $text_domain); ?></span>
                    </div>
                </div>

                <!-- Image Comparison Grid -->
                <div class="ic-image-grid">
                    <div class="glass-panel img-panel">
                        <div class="img-header"><?php echo esc_html__('Original Source', $text_domain); ?></div>
                        <div class="img-container checkerboard">
                            <img id="<?php echo esc_attr('ic-img-original'); ?>" src="" alt="<?php echo esc_attr__('Original Preview', $text_domain); ?>">
                        </div>
                    </div>
                    <div class="glass-panel img-panel">
                        <div class="img-header">
                            <?php echo esc_html__('Quantum Output', $text_domain); ?> 
                            <span id="<?php echo esc_attr('lbl-processing'); ?>" class="processing-badge hidden">
                                <?php echo esc_html__('Rechne...', $text_domain); ?>
                            </span>
                        </div>
                        <div class="img-container checkerboard">
                            <img id="<?php echo esc_attr('ic-img-compressed'); ?>" src="" alt="<?php echo esc_attr__('Compressed Preview', $text_domain); ?>">
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</div>