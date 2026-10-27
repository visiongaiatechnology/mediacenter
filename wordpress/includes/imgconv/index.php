<?php
/**
 * VGT MEDIACENTER - UNIVERSAL MEDIA FORGE (IMAGE CONVERTER)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Format-Security Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: heic2any (Optional für iPhone-Support)
 * Wird über den VGT Core bereitgestellt, um HEIC-Container im RAM zu dekodieren.
 */
wp_enqueue_script('vgt-heic2any');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-imgconv'); ?>">
    
    <!-- Hero Header: Navigations- und Titelbereich -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper icv-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Universal Media Forge', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Format-Konvertierung und Rescaling im Browser-RAM. Transformiert PNG, JPG, WEBP, AVIF, SVG und HEIC in Millisekunden. Zero-Upload-Garantie.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body">
        
        <!-- View 1: Dropzone (Initial Ingestion) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('icv-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Grafik-Asset injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Unterstützt JPG, PNG, WEBP, AVIF, SVG, HEIC', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Client-Side Canvas Engine', $text_domain); ?></div>
            </div>
            <input type="file" 
                   id="<?php echo esc_attr('icv-file-input'); ?>" 
                   class="hidden-input" 
                   accept="<?php echo esc_attr('image/jpeg, image/png, image/webp, image/avif, image/svg+xml, image/heic'); ?>" />
        </div>

        <!-- View 2: Workspace View (Hidden until Ingestion) -->
        <div id="<?php echo esc_attr('icv-workspace'); ?>" class="icv-layout hidden">
            
            <!-- Controls Sidebar: Konvertierungs-Parameter -->
            <div class="glass-panel icv-controls">
                <div class="controls-header">
                    <span class="panel-label"><?php echo esc_html__('Konvertierungs-Matrix', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('icv-btn-reset'); ?>" class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        <?php echo esc_html__('Asset verwerfen', $text_domain); ?>
                    </button>
                </div>

                <!-- Format Selection -->
                <div class="control-group">
                    <label><?php echo esc_html__('Zielformat', $text_domain); ?></label>
                    <div class="format-grid">
                        <button class="fmt-btn active" data-fmt="image/jpeg" data-ext="jpg">JPG</button>
                        <button class="fmt-btn" data-fmt="image/png" data-ext="png">PNG</button>
                        <button class="fmt-btn" data-fmt="image/webp" data-ext="webp">WEBP</button>
                        <button class="fmt-btn" data-fmt="image/avif" data-ext="avif">AVIF</button>
                    </div>
                </div>

                <!-- Quality Control -->
                <div class="control-group" id="<?php echo esc_attr('group-quality'); ?>">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('Encoding Qualität', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('lbl-quality'); ?>" class="val-badge">90%</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('icv-quality'); ?>" class="vgt-slider cyan-slider" min="10" max="100" value="90" step="1">
                </div>

                <!-- Rescaling Controls -->
                <div class="control-group">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('Auflösung skalieren (px)', $text_domain); ?></label>
                        <button id="<?php echo esc_attr('btn-lock-ratio'); ?>" class="btn-icon-small active" title="<?php echo esc_attr__('Seitenverhältnis beibehalten', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </button>
                    </div>
                    <div class="dim-inputs">
                        <div class="input-wrap">
                            <span class="dim-prefix"><?php echo esc_html__('W', $text_domain); ?></span>
                            <input type="number" id="<?php echo esc_attr('icv-width'); ?>" class="vgt-input" placeholder="<?php echo esc_attr__('Width', $text_domain); ?>">
                        </div>
                        <div class="dim-separator"><svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                        <div class="input-wrap">
                            <span class="dim-prefix"><?php echo esc_html__('H', $text_domain); ?></span>
                            <input type="number" id="<?php echo esc_attr('icv-height'); ?>" class="vgt-input" placeholder="<?php echo esc_attr__('Height', $text_domain); ?>">
                        </div>
                    </div>
                </div>

                <!-- Background (Alpha-Matte) for formats without transparency -->
                <div class="control-group" id="<?php echo esc_attr('group-background'); ?>">
                    <label><?php echo esc_html__('Hintergrund (Alpha-Matte)', $text_domain); ?></label>
                    <div class="bg-toggles">
                        <button class="bg-btn active" data-color="<?php echo esc_attr('transparent'); ?>">
                            <span class="bg-swatch checker"></span> <?php echo esc_html__('Transp.', $text_domain); ?>
                        </button>
                        <button class="bg-btn" data-color="<?php echo esc_attr('#ffffff'); ?>">
                            <span class="bg-swatch" style="background:#fff"></span> <?php echo esc_html__('Weiß', $text_domain); ?>
                        </button>
                        <button class="bg-btn" data-color="<?php echo esc_attr('#000000'); ?>">
                            <span class="bg-swatch" style="background:#000; border:1px solid #333;"></span> <?php echo esc_html__('Schwarz', $text_domain); ?>
                        </button>
                    </div>
                </div>

                <!-- Action Button -->
                <button id="<?php echo esc_attr('icv-btn-convert'); ?>" class="btn-prime cyan-glow mt-auto">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <span><?php echo esc_html__('Konvertieren & Speichern', $text_domain); ?></span>
                </button>
            </div>

            <!-- Preview Panel: Visueller Delta-Abgleich -->
            <div class="glass-panel icv-preview-panel">
                <div class="preview-header">
                    <div class="preview-meta">
                        <span class="meta-label"><?php echo esc_html__('Original Asset', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('icv-orig-name'); ?>" class="meta-value">image.png</span>
                        <div class="meta-details">
                            <span id="<?php echo esc_attr('icv-orig-size'); ?>" class="meta-tag">0 MB</span>
                            <span id="<?php echo esc_attr('icv-orig-res'); ?>" class="meta-tag">0 x 0 px</span>
                        </div>
                    </div>
                    <div class="preview-arrow">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                    <div class="preview-meta target-meta">
                        <span class="meta-label"><?php echo esc_html__('Ziel-Format', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('icv-target-name'); ?>" class="meta-value highlight-cyan">image.jpg</span>
                        <div class="meta-details">
                            <span id="<?php echo esc_attr('icv-target-res'); ?>" class="meta-tag active">0 x 0 px</span>
                        </div>
                    </div>
                </div>

                <div class="preview-container checkerboard" id="<?php echo esc_attr('icv-preview-box'); ?>">
                    <div class="canvas-loader hidden" id="<?php echo esc_attr('icv-loader'); ?>">
                        <div class="spinner"></div>
                        <span id="<?php echo esc_attr('loader-text'); ?>"><?php echo esc_html__('Verarbeite Pixel-Daten...', $text_domain); ?></span>
                    </div>
                    <img id="<?php echo esc_attr('icv-preview-img'); ?>" src="" alt="<?php echo esc_attr__('Asset Preview', $text_domain); ?>">
                </div>
            </div>

        </div>

    </div>
</div>