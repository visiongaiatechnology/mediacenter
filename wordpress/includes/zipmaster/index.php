<?php
/**
 * VGT MEDIACENTER - VAULT CRACKER (ZIP EXPLORER)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Archive-Integrity Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependencies: JSZip & FileSaver
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht 100% kognitive Extraktion im Browser-RAM (Zero-Trust).
 */
wp_enqueue_script('vgt-jszip');
wp_enqueue_script('vgt-filesaver');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-zipmaster'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper zm-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="10" y1="12" x2="14" y2="12"></line>
                    <line x1="10" y1="15" x2="14" y2="15"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Vault Cracker', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Entpacke und durchsuche sensible ZIP-Archive lokal im RAM. Zero-Trust-Architektur: Kein Byte verlässt deinen Computer.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body zm-layout">
        
        <!-- Persistent Ingestion Zone (Dropzone) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('zm-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Archiv injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Ziehe eine .zip Datei hierher (Max. Limit: Lokaler RAM)', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('AES-Support in progress', $text_domain); ?></div>
            </div>
            <input type="file" id="<?php echo esc_attr('zm-file-input'); ?>" class="hidden-input" accept=".zip,application/zip" />
        </div>

        <!-- Workspace View (Hidden until load) -->
        <div id="<?php echo esc_attr('zm-workspace'); ?>" class="zm-workspace hidden">
            
            <!-- Header Bar: Archiv-Metadaten & Globale Aktionen -->
            <div class="zm-header-bar glass-panel">
                <div class="zm-stats">
                    <span class="zm-label" id="<?php echo esc_attr('zm-archive-name'); ?>">archive.zip</span>
                    <span id="<?php echo esc_attr('zm-file-count'); ?>" class="zm-count-badge">
                        <?php echo esc_html__('Scanne...', $text_domain); ?>
                    </span>
                </div>
                <div class="zm-actions">
                    <button id="<?php echo esc_attr('zm-btn-extract-all'); ?>" class="btn-action-small highlight">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <?php echo esc_html__('Alles extrahieren', $text_domain); ?>
                    </button>
                    <button id="<?php echo esc_attr('zm-btn-clear'); ?>" class="btn-action-small danger" title="<?php echo esc_attr__('Daten verwerfen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <?php echo esc_html__('Verwerfen', $text_domain); ?>
                    </button>
                </div>
            </div>

            <div class="zm-grid">
                
                <!-- File Explorer (Sidebar): Kognitive Verzeichnis-Struktur -->
                <div class="glass-panel zm-explorer">
                    <div class="explorer-header">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                        <?php echo esc_html__('Verzeichnisbaum', $text_domain); ?>
                    </div>
                    
                    <!-- Async Loading Bar -->
                    <div id="<?php echo esc_attr('zm-loading-bar'); ?>" class="zm-loading-bar hidden">
                        <div class="zm-loading-fill"></div>
                    </div>
                    
                    <!-- Mounting Point für dynamische Dateiliste -->
                    <div class="explorer-list custom-scrollbar" id="<?php echo esc_attr('zm-file-list'); ?>">
                        <!-- JS Injektion der Explorer-Nodes (Files/Folders) -->
                    </div>
                </div>

                <!-- Preview Engine (Main Workspace): Einzeldatei-Inspektion -->
                <div class="glass-panel zm-preview-engine">
                    
                    <!-- Empty State: Kognitive Erwartung -->
                    <div class="preview-empty" id="<?php echo esc_attr('zm-preview-empty'); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                        <p><?php echo esc_html__('Wähle eine Datei aus dem Verzeichnis, um sie im RAM zu entpacken und zu inspizieren.', $text_domain); ?></p>
                    </div>

                    <!-- Active Preview: Dateispezifische Darstellung (Hidden by default) -->
                    <div class="preview-active hidden" id="<?php echo esc_attr('zm-preview-active'); ?>">
                        <div class="preview-header">
                            <div class="preview-meta">
                                <span class="preview-name" id="<?php echo esc_attr('prev-name'); ?>">filename.ext</span>
                                <span class="preview-size" id="<?php echo esc_attr('prev-size'); ?>">0 KB</span>
                            </div>
                            <button id="<?php echo esc_attr('btn-download-single'); ?>" class="btn-prime yellow-glow">
                                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                <?php echo esc_html__('Datei Speichern', $text_domain); ?>
                            </button>
                        </div>
                        
                        <!-- Dynamischer Content-Container (Image/Text/Binary Warning) -->
                        <div class="preview-content-box checkerboard" id="<?php echo esc_attr('prev-content-box'); ?>">
                            <!-- JS injiziert hier Preview-Elemente -->
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </div>
</div>