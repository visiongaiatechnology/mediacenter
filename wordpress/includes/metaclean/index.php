<?php
/**
 * VGT MEDIACENTER - METADATA CLEANER (QUANTUM SCRUB)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Metadata-Path Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependencies (EXIF Parser) werden durch die Core Engine via SRI bereitgestellt.
 * Ermöglicht 100% kognitive Analyse im Browser-RAM ohne Datenabfluss.
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-metaclean'); ?>">
    
    <!-- Hero Header: Navigation und forensische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper mc-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="m21 21-5.19-5.19M16.5 4.5l3 3L7 19.5 4 16.5 16.5 4.5z"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Metadata Cleaner', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Extrahiert und vernichtet unsichtbare EXIF-Metadaten (GPS, Geräte-IDs, Timestamps) aus deinen Bildern. 100% Client-Side. Zero Uploads.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body">
        
        <!-- View 1: Ingestion Zone (Dropzone) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('mc-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Bildmaterial analysieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('JPG, PNG, WEBP, HEIC hier ablegen', $text_domain); ?></p>
            </div>
            <input type="file" 
                   id="<?php echo esc_attr('mc-file-input'); ?>" 
                   class="hidden-input" 
                   accept="<?php echo esc_attr('image/jpeg, image/png, image/webp, image/heic'); ?>" />
        </div>

        <!-- View 2: Analysis & Action Matrix (Hidden until Ingestion) -->
        <div id="<?php echo esc_attr('mc-analysis-view'); ?>" class="mc-matrix hidden">
            
            <div class="mc-grid">
                <!-- Image Preview Panel: Visueller Abgleich -->
                <div class="glass-panel mc-preview-panel">
                    <div class="mc-preview-header">
                        <span class="mc-label"><?php echo esc_html__('Visuelle Signatur', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('mc-btn-reset'); ?>" class="btn-action-small">
                            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            <?php echo esc_html__('Verwerfen', $text_domain); ?>
                        </button>
                    </div>
                    <div class="mc-preview-wrapper" id="<?php echo esc_attr('mc-preview-wrapper'); ?>">
                        <img id="<?php echo esc_attr('mc-preview-img'); ?>" src="" alt="<?php echo esc_attr__('Preview', $text_domain); ?>">
                        
                        <!-- Scrubbing Animation Layer: Kognitive Visualisierung -->
                        <div class="mc-scrubber-layer" id="<?php echo esc_attr('mc-scrubber'); ?>">
                            <div class="mc-laser"></div>
                        </div>
                    </div>
                    <div class="mc-file-meta">
                        <span id="<?php echo esc_attr('mc-meta-name'); ?>">image.jpg</span>
                        <span id="<?php echo esc_attr('mc-meta-size'); ?>" class="mc-badge">0 MB</span>
                    </div>
                </div>

                <!-- Threat Analysis Panel: Heuristische Extraktion -->
                <div class="glass-panel mc-threat-panel">
                    <div class="mc-threat-header">
                        <span class="mc-label"><?php echo esc_html__('Metadaten-Extraktion', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('mc-threat-level'); ?>" class="mc-badge warning">
                            <?php echo esc_html__('Analysiere...', $text_domain); ?>
                        </span>
                    </div>
                    
                    <div class="mc-data-list" id="<?php echo esc_attr('mc-exif-list'); ?>">
                        <!-- Dynamische Injektion der EXIF-Tags via JavaScript (Safe Rendering) -->
                    </div>

                    <!-- Action Vector: Neutralisierung -->
                    <div class="mc-actions">
                        <button id="<?php echo esc_attr('mc-btn-clean'); ?>" class="btn-prime warning-glow">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><polyline points="21 3 21 8 16 8"></polyline></svg>
                            <?php echo esc_html__('EXIF-Daten vernichten', $text_domain); ?>
                        </button>
                        <button id="<?php echo esc_attr('mc-btn-download'); ?>" class="btn-prime success-glow hidden">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <?php echo esc_html__('Sicheres Bild speichern', $text_domain); ?>
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>