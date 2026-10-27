<?php
/**
 * VGT MEDIACENTER - HASHCHECKER (INTEGRITY ENGINE)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Zero-Trust UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: CryptoJS (Wird über den VGT Core bereitgestellt)
 * Ermöglicht 100% clientseitiges Hashing ohne Server-Upload.
 */
wp_enqueue_script('vgt-crypto');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-hashchecker'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('Zurück zum Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <rect x="9" y="14" width="6" height="4" rx="1"></rect>
                    <path d="M10 14v-2a2 2 0 1 1 4 0v2"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Dateisignatur & Hash-Engine', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('100% lokales Hashing. Kryptographische Checksummen zur Integritätsprüfung im Zero-Trust Modell.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body">
        
        <!-- Dropzone: Lokale Datei-Injektion -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('hash-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <h3 class="drop-title"><?php echo esc_html__('Datei initiieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Drag & Drop oder klicken für Dateiauswahl', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Max 5GB (Local Stream)', $text_domain); ?></div>
            </div>
            <input type="file" id="<?php echo esc_attr('hash-file-input'); ?>" class="hidden-input" />
        </div>

        <!-- Results Matrix: Analyse-Ergebnisse (Hidden until input) -->
        <div id="<?php echo esc_attr('hash-results'); ?>" class="results-matrix hidden">
            
            <!-- Context Bar: Datei-Metadaten -->
            <div class="context-bar glass-panel">
                <div class="meta-pills">
                    <div class="meta-pill">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path></svg>
                        <span id="<?php echo esc_attr('meta-name'); ?>" class="pill-text">filename.ext</span>
                    </div>
                    <div class="meta-pill">
                        <svg viewBox="0 0 24 24" class="svg-icon"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                        <span id="<?php echo esc_attr('meta-size'); ?>" class="pill-text">0 MB</span>
                    </div>
                </div>
                <button id="<?php echo esc_attr('btn-reset'); ?>" class="btn-action">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                    <?php echo esc_html__('Neu starten', $text_domain); ?>
                </button>
            </div>

            <!-- Progress Engine: Rechenfortschritt -->
            <div class="progress-engine" id="<?php echo esc_attr('hash-progress-container'); ?>">
                <div class="progress-track">
                    <div class="progress-fill" id="<?php echo esc_attr('hash-progress-fill'); ?>">
                        <div class="progress-glow"></div>
                    </div>
                </div>
                <div class="progress-status" id="<?php echo esc_attr('hash-status-text'); ?>">
                    <?php echo esc_html__('Berechne Entropie... 0%', $text_domain); ?>
                </div>
            </div>
            
            <!-- Hash Cards Grid: Kryptographische Vektoren -->
            <div class="hash-grid">
                
                <!-- SHA-256 (VGT Primary Standard) -->
                <div class="hash-card supreme">
                    <div class="card-header">
                        <div class="algo-badge supreme-badge"><?php echo esc_html__('SHA-256', $text_domain); ?></div>
                        <span class="algo-desc"><?php echo esc_html__('Sicherer VGT Standard', $text_domain); ?></span>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" readonly id="<?php echo esc_attr('val-sha256'); ?>" class="hash-terminal" value="<?php echo esc_attr__('Warte auf Input...', $text_domain); ?>" />
                        <button class="btn-copy" data-target="<?php echo esc_attr('val-sha256'); ?>" aria-label="<?php echo esc_attr__('Kopieren', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>

                <!-- SHA-512 (High Entropy) -->
                <div class="hash-card">
                    <div class="card-header">
                        <div class="algo-badge"><?php echo esc_html__('SHA-512', $text_domain); ?></div>
                        <span class="algo-desc"><?php echo esc_html__('Ultra Secure', $text_domain); ?></span>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" readonly id="<?php echo esc_attr('val-sha512'); ?>" class="hash-terminal" value="<?php echo esc_attr__('Warte auf Input...', $text_domain); ?>" />
                        <button class="btn-copy" data-target="<?php echo esc_attr('val-sha512'); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>

                <!-- SHA-1 (Legacy / Audit Only) -->
                <div class="hash-card legacy">
                    <div class="card-header">
                        <div class="algo-badge legacy-badge"><?php echo esc_html__('SHA-1', $text_domain); ?></div>
                        <span class="algo-desc"><?php echo esc_html__('Veraltet (Kollisionsgefahr)', $text_domain); ?></span>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" readonly id="<?php echo esc_attr('val-sha1'); ?>" class="hash-terminal" value="<?php echo esc_attr__('Warte auf Input...', $text_domain); ?>" />
                        <button class="btn-copy" data-target="<?php echo esc_attr('val-sha1'); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>

                <!-- MD5 (Checksum Only) -->
                <div class="hash-card legacy">
                    <div class="card-header">
                        <div class="algo-badge legacy-badge"><?php echo esc_html__('MD5', $text_domain); ?></div>
                        <span class="algo-desc"><?php echo esc_html__('Unsicher (Nur für Checksummen)', $text_domain); ?></span>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" readonly id="<?php echo esc_attr('val-md5'); ?>" class="hash-terminal" value="<?php echo esc_attr__('Warte auf Input...', $text_domain); ?>" />
                        <button class="btn-copy" data-target="<?php echo esc_attr('val-md5'); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>