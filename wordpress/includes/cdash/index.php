<?php
/**
 * VGT MEDIACENTER - DATA CORE (ANALYTICS ENGINE)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Data-Path Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Externe Dependencies aus dem lokalen VGT Store laden
 * (Sichergestellt durch SRI im Core)
 */
wp_enqueue_script('vgt-papaparse');
wp_enqueue_script('vgt-apexcharts');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-datacore'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper dc-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Data Core', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Lokale Analytics Engine. Importiere CSV oder JSON Datensätze und rendere komplexe interaktive Visualisierungen im RAM. Zero-Trust Datenverarbeitung.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body: Dual-Pane Layout -->
    <div class="tool-body dc-layout">
        
        <!-- Left: Controls & Ingestion Sidebar -->
        <div class="dc-sidebar">
            
            <!-- Ingestion Zone: Drag & Drop Interface -->
            <div class="glass-panel drop-zone" id="<?php echo esc_attr('dc-drop-zone'); ?>">
                <div class="drop-content">
                    <div class="drop-icon-glow purple"></div>
                    <svg viewBox="0 0 24 24" class="drop-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <h3 class="drop-title"><?php echo esc_html__('Daten injizieren', $text_domain); ?></h3>
                    <p class="drop-subtitle" id="<?php echo esc_attr('dc-drop-text'); ?>">
                        <?php echo esc_html__('CSV oder JSON hier ablegen', $text_domain); ?>
                    </p>
                </div>
                <input type="file" id="<?php echo esc_attr('dc-file-input'); ?>" class="hidden-input" accept=".csv, .json, application/json, text/csv" />
            </div>

            <!-- Configuration Panel: Mapping & Chart Selection -->
            <div id="<?php echo esc_attr('dc-config-panel'); ?>" class="glass-panel dc-config hidden">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Render Config', $text_domain); ?></span>
                </div>

                <div class="control-group">
                    <label><?php echo esc_html__('X-Achse (Dimension)', $text_domain); ?></label>
                    <div class="select-wrap">
                        <select id="<?php echo esc_attr('dc-select-x'); ?>" class="vgt-select">
                            <option value=""><?php echo esc_html__('Lade Metadaten...', $text_domain); ?></option>
                        </select>
                        <svg viewBox="0 0 24 24" class="select-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>

                <div class="control-group mt-4">
                    <label><?php echo esc_html__('Y-Achse (Metrik)', $text_domain); ?></label>
                    <div class="select-wrap">
                        <select id="<?php echo esc_attr('dc-select-y'); ?>" class="vgt-select">
                            <option value=""><?php echo esc_html__('Lade Metadaten...', $text_domain); ?></option>
                        </select>
                        <svg viewBox="0 0 24 24" class="select-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>

                <div class="control-group mt-4">
                    <label><?php echo esc_html__('Visualisierung', $text_domain); ?></label>
                    <div class="dc-chart-types">
                        <button class="dc-type-btn active" data-type="<?php echo esc_attr('bar'); ?>" title="<?php echo esc_attr__('Bar Chart', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        </button>
                        <button class="dc-type-btn" data-type="<?php echo esc_attr('line'); ?>" title="<?php echo esc_attr__('Line Chart', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="3 17 9 11 13 15 21 7"></polyline></svg>
                        </button>
                        <button class="dc-type-btn" data-type="<?php echo esc_attr('pie'); ?>" title="<?php echo esc_attr__('Pie Chart', $text_domain); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>
                        </button>
                    </div>
                </div>

                <button id="<?php echo esc_attr('dc-btn-render'); ?>" class="btn-prime purple-glow mt-4">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span><?php echo esc_html__('Compute Visuals', $text_domain); ?></span>
                </button>
            </div>

            <!-- Stats Panel: Data Integrity Info -->
            <div id="<?php echo esc_attr('dc-stats-panel'); ?>" class="glass-panel dc-stats hidden mt-4">
                <div class="stat-row">
                    <span class="stat-lbl"><?php echo esc_html__('Datensätze (Rows)', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('dc-stat-rows'); ?>" class="stat-val highlight-cyan">0</span>
                </div>
                <div class="stat-row">
                    <span class="stat-lbl"><?php echo esc_html__('Dimensionen (Cols)', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('dc-stat-cols'); ?>" class="stat-val highlight-purple">0</span>
                </div>
            </div>

        </div>

        <!-- Right: Global Workspace -->
        <div class="dc-workspace">
            
            <!-- Workspace Navigation Tabs -->
            <div class="dc-tabs">
                <button class="dc-tab-btn active" data-target="<?php echo esc_attr('dc-view-visuals'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <?php echo esc_html__('Visual Analytics', $text_domain); ?>
                </button>
                <button class="dc-tab-btn" data-target="<?php echo esc_attr('dc-view-raw'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <?php echo esc_html__('Raw Matrix (Preview)', $text_domain); ?>
                </button>
            </div>

            <div class="glass-panel dc-view-container">
                
                <!-- View: Visuals Output -->
                <div id="<?php echo esc_attr('dc-view-visuals'); ?>" class="dc-view active">
                    <div id="<?php echo esc_attr('dc-chart-empty'); ?>" class="dc-empty-state">
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        <p><?php echo esc_html__('System erwartet Dateneinspeisung. Konfiguriere die Achsen in der Seitenleiste, um die Berechnung zu starten.', $text_domain); ?></p>
                    </div>
                    <!-- ApexCharts Output Mount-Point -->
                    <div id="<?php echo esc_attr('dc-chart-canvas'); ?>" class="dc-chart-wrap"></div>
                </div>

                <!-- View: Raw Data Preview -->
                <div id="<?php echo esc_attr('dc-view-raw'); ?>" class="dc-view hidden">
                    <div class="dc-table-wrapper custom-scrollbar">
                        <table class="vgt-data-table">
                            <thead id="<?php echo esc_attr('dc-table-head'); ?>">
                                <!-- Dynamische Injektion via JavaScript -->
                            </thead>
                            <tbody id="<?php echo esc_attr('dc-table-body'); ?>">
                                <tr>
                                    <td class="empty-cell" colspan="100%">
                                        <?php echo esc_html__('Keine Daten im Speicher', $text_domain); ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="dc-table-footer">
                        <?php echo esc_html__('Aus Performance-Gründen werden hier maximal die ersten 100 Datensätze visualisiert.', $text_domain); ?>
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>