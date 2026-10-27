<?php
/**
 * VGT MEDIACENTER - NEXUS BINDER (PDF MERGER)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Document-Integrity Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: pdf-lib (Wird über den VGT Core bereitgestellt)
 * Ermöglicht das Mergen von PDF-Datenströmen direkt im Browser-RAM (Zero-Trust).
 */
wp_enqueue_script('vgt-pdf-lib');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-pdfmerge'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper pm-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                    <path d="M16 13H8"></path>
                    <path d="M16 17H8"></path>
                    <path d="M10 9H8"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Nexus Binder', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Füge mehrere PDFs zu einem einzigen Master-Dokument zusammen. 100% lokal im Browser-RAM. Zero Trust, maximale Vertraulichkeit für Verträge und Dokumente.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body pm-layout">
        
        <!-- Persistent Dropzone: Initialer Dokumenten-Einstieg -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('pm-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('PDFs injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Ziehe Dateien hierher oder klicke zur Auswahl', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Drag & Drop Sortierung', $text_domain); ?></div>
            </div>
            <input type="file" 
                   id="<?php echo esc_attr('pm-file-input'); ?>" 
                   class="hidden-input" 
                   accept="<?php echo esc_attr('application/pdf'); ?>" 
                   multiple />
        </div>

        <!-- Workspace View: Stapel-Verarbeitung (Hidden until load) -->
        <div id="<?php echo esc_attr('pm-workspace'); ?>" class="pm-workspace hidden">
            
            <!-- Header Bar: Stapel-Statistik -->
            <div class="pm-header-bar glass-panel">
                <div class="pm-stats">
                    <span class="pm-label"><?php echo esc_html__('Aktueller Nexus-Stapel', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('pm-file-count'); ?>" class="pm-count-badge">
                        <?php echo esc_html__('0 Dateien', $text_domain); ?>
                    </span>
                </div>
                <button id="<?php echo esc_attr('pm-btn-clear'); ?>" class="btn-action-small danger">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                    <?php echo esc_html__('Stapel leeren', $text_domain); ?>
                </button>
            </div>

            <!-- Sortable File List: Mounting Point für Dokument-Karten -->
            <div class="pm-file-list" id="<?php echo esc_attr('pm-file-list'); ?>">
                <!-- Dynamische Injektion der sortierbaren PDF-Karten via JavaScript -->
            </div>

            <!-- Execution Panel: Finale Verschmelzung -->
            <div class="glass-panel pm-execution-panel">
                <div class="execution-info">
                    <svg viewBox="0 0 24 24" class="svg-icon info-icon">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>
                        <?php echo esc_html__('Die PDFs werden von oben nach unten zusammengefügt. Du kannst die Karten mit der Maus verschieben, um die Reihenfolge zu ändern.', $text_domain); ?>
                    </span>
                </div>
                
                <button id="<?php echo esc_attr('pm-btn-merge'); ?>" class="btn-prime purple-glow">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                    <span id="<?php echo esc_attr('pm-btn-text'); ?>">
                        <?php echo esc_html__('PDFs zu Master-File verschmelzen', $text_domain); ?>
                    </span>
                </button>
            </div>

        </div>

    </div>
</div>