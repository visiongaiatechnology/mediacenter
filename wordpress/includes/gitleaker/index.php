<?php
/**
 * VGT MEDIACENTER - GIT-LEAKER (REPOSITORY SCANNER)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Zero-Trust UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: JSZip (für das Scannen von Repo-Archiven)
 * Wird über den VGT Core mit SRI-Schutz bereitgestellt.
 */
wp_enqueue_script('vgt-jszip');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-gitleaker'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper gl-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Git-Leaker', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Repository Security Scanner. Durchsucht lokale Code-Ordner oder ZIP-Archive nach versehentlich eingecheckten API-Keys, Passwörtern und privaten Schlüsseln. 100% Client-Side. Zero-Trust.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body gl-layout">
        
        <!-- View 1: Ingestion Zone (Dropzone) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('gl-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow pink"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    <line x1="12" y1="11" x2="12" y2="17"></line>
                    <line x1="9" y1="14" x2="15" y2="14"></line>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Quellcode injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle">
                    <?php echo wp_kses_post(__('Ziehe einen <strong>gesamten Projektordner</strong> oder ein <strong>.zip Archiv</strong> hierher.', $text_domain)); ?>
                </p>
                <div class="drop-action-buttons">
                    <button class="btn-action-small" id="<?php echo esc_attr('btn-gl-select-dir'); ?>">
                        <?php echo esc_html__('Ordner wählen', $text_domain); ?>
                    </button>
                    <button class="btn-action-small" id="<?php echo esc_attr('btn-gl-select-zip'); ?>">
                        <?php echo esc_html__('ZIP wählen', $text_domain); ?>
                    </button>
                </div>
            </div>
            <!-- Hidden inputs für manuelle Selektion (Hardened Attributes) -->
            <input type="file" id="<?php echo esc_attr('gl-dir-input'); ?>" class="hidden-input" webkitdirectory directory multiple />
            <input type="file" id="<?php echo esc_attr('gl-zip-input'); ?>" class="hidden-input" accept=".zip,application/zip" />
        </div>

        <!-- View 2: Scanner Workspace (Hidden until ingestion) -->
        <div id="<?php echo esc_attr('gl-workspace'); ?>" class="gl-workspace hidden">
            
            <!-- Context Bar: Real-Time Telemetry -->
            <div class="glass-panel gl-context-bar">
                <div class="gl-stats">
                    <div class="stat-group">
                        <span class="stat-label"><?php echo esc_html__('Gescannte Dateien', $text_domain); ?></span>
                        <span class="stat-val" id="<?php echo esc_attr('gl-stat-files'); ?>">0</span>
                    </div>
                    <div class="stat-group">
                        <span class="stat-label"><?php echo esc_html__('Ignoriert (Binaries)', $text_domain); ?></span>
                        <span class="stat-val" id="<?php echo esc_attr('gl-stat-ignored'); ?>">0</span>
                    </div>
                    <div class="stat-group threat-group">
                        <span class="stat-label"><?php echo esc_html__('Gefundene Secrets', $text_domain); ?></span>
                        <span class="stat-val" id="<?php echo esc_attr('gl-stat-threats'); ?>">0</span>
                    </div>
                </div>
                
                <div class="gl-actions">
                    <button id="<?php echo esc_attr('btn-gl-export'); ?>" class="btn-action-small highlight-pink hidden">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <?php echo esc_html__('Report (CSV)', $text_domain); ?>
                    </button>
                    <button id="<?php echo esc_attr('btn-gl-reset'); ?>" class="btn-action-small danger outline">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <?php echo esc_html__('FLUSH', $text_domain); ?>
                    </button>
                </div>
            </div>

            <!-- Live Scanner Console: Verbose Engine Output -->
            <div class="gl-scanner-console glass-panel">
                <div class="console-header">
                    <span class="console-label"><?php echo esc_html__('Scanner Terminal', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('gl-scanner-status'); ?>" class="status-badge scanning">
                        <span class="pulse-dot"></span> <?php echo esc_html__('SCANNING', $text_domain); ?>
                    </span>
                </div>
                <div class="console-output">
                    <span class="co-prefix">>></span>
                    <span id="<?php echo esc_attr('gl-current-file'); ?>" class="co-text">
                        <?php echo esc_html__('Warte auf Engine...', $text_domain); ?>
                    </span>
                </div>
                <div class="progress-bar-bg mt-2">
                    <div class="progress-fill pink-fill" id="<?php echo esc_attr('gl-progress-bar'); ?>" style="width: 0%;"></div>
                </div>
            </div>

            <!-- Threat Matrix: Final Results -->
            <div class="glass-panel gl-matrix-panel">
                <div class="panel-header" style="margin-bottom: 1rem; border-bottom: none;">
                    <span class="panel-label" style="color: rgba(var(--c-pink), 1);">
                        <?php echo esc_html__('Entdeckte Schwachstellen (Leaks)', $text_domain); ?>
                    </span>
                </div>
                <div class="gl-table-wrapper custom-scrollbar">
                    <table class="vgt-data-table">
                        <thead>
                            <tr>
                                <th style="width: 15%;"><?php echo esc_html__('Schweregrad', $text_domain); ?></th>
                                <th style="width: 25%;"><?php echo esc_html__('Dateipfad', $text_domain); ?></th>
                                <th style="width: 20%;"><?php echo esc_html__('Identifizierter Typ', $text_domain); ?></th>
                                <th style="width: 40%;"><?php echo esc_html__('Code-Snippet (Maskiert)', $text_domain); ?></th>
                            </tr>
                        </thead>
                        <tbody id="<?php echo esc_attr('gl-table-body'); ?>">
                            <!-- Dynamische Injektion via JavaScript Engine -->
                            <tr id="<?php echo esc_attr('gl-empty-row'); ?>">
                                <td class="empty-cell" colspan="100%">
                                    <?php echo esc_html__('Scanner läuft. Bisher keine Leaks gefunden.', $text_domain); ?>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
</div>