<?php
/**
 * VGT MEDIACENTER - ENERGY CORE
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Data-Stream Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependencies: PapaParse (CSV) & ApexCharts 
 * (Wird vom VGT Core via SRI bereitgestellt)
 */
wp_enqueue_script('vgt-papaparse');
wp_enqueue_script('vgt-apexcharts');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-energy'); ?>">
    
    <!-- Hero Header: Navigations- und Titelbereich -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper en-glow">
                <svg viewBox="0 0 24 24" class="hero-icon"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Energy Core', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Smart-Meter Analytics & Geräte-Matrix. Analysiere den lokalen Energieverbrauch und berechne Kosten in Echtzeit. Importiere CSV-Daten deines Netzbetreibers sicher und offline.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body en-layout">
        
        <!-- Global Config: Tarif & Modus-Steuerung -->
        <div class="glass-panel en-config-panel">
            <div class="en-config-inner">
                <span class="panel-label"><?php echo esc_html__('Basis-Tarif (Strompreis)', $text_domain); ?></span>
                <div class="price-input-wrap">
                    <input type="number" 
                           id="<?php echo esc_attr('en-price-input'); ?>" 
                           class="vgt-input price-input" 
                           value="0.30" step="0.01" min="0">
                    <span class="price-currency"><?php echo esc_html__('€ / kWh', $text_domain); ?></span>
                </div>
            </div>
            <div class="en-mode-tabs">
                <button class="mode-tab active" data-target="<?php echo esc_attr('mode-manual'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                    <?php echo esc_html__('Geräte-Matrix', $text_domain); ?>
                </button>
                <button class="mode-tab" data-target="<?php echo esc_attr('mode-csv'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    <?php echo esc_html__('Smart-Meter (CSV)', $text_domain); ?>
                </button>
            </div>
        </div>

        <!-- ==================== MODE 1: MANUAL DEVICES ==================== -->
        <div id="<?php echo esc_attr('mode-manual'); ?>" class="en-mode-view active">
            
            <div class="en-grid">
                <!-- Left: Device Input & List -->
                <div class="en-devices-section">
                    
                    <div class="glass-panel add-device-panel">
                        <div class="panel-header">
                            <span class="panel-label"><?php echo esc_html__('Neuen Verbraucher anlegen', $text_domain); ?></span>
                        </div>
                        <div class="device-form">
                            <div class="input-group">
                                <label><?php echo esc_html__('Gerätename', $text_domain); ?></label>
                                <input type="text" id="<?php echo esc_attr('dev-name'); ?>" class="vgt-input" placeholder="<?php echo esc_attr__('z.B. Gaming PC', $text_domain); ?>">
                            </div>
                            <div class="input-group-row">
                                <div class="input-group">
                                    <label><?php echo esc_html__('Leistung (Watt)', $text_domain); ?></label>
                                    <div class="input-wrap">
                                        <input type="number" id="<?php echo esc_attr('dev-watt'); ?>" class="vgt-input" placeholder="600" min="0">
                                        <span class="input-suffix"><?php echo esc_html__('W', $text_domain); ?></span>
                                    </div>
                                </div>
                                <div class="input-group">
                                    <label><?php echo esc_html__('Laufzeit (Std/Tag)', $text_domain); ?></label>
                                    <div class="input-wrap">
                                        <input type="number" id="<?php echo esc_attr('dev-hours'); ?>" class="vgt-input" placeholder="4" min="0" max="24" step="0.5">
                                        <span class="input-suffix"><?php echo esc_html__('h/d', $text_domain); ?></span>
                                    </div>
                                </div>
                            </div>
                            <button id="<?php echo esc_attr('btn-add-device'); ?>" class="btn-prime yellow-glow mt-2">
                                <svg viewBox="0 0 24 24" class="svg-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                <?php echo esc_html__('In Matrix aufnehmen', $text_domain); ?>
                            </button>
                        </div>
                    </div>

                    <div class="glass-panel device-list-panel mt-4">
                        <div class="panel-header" style="border:none; padding-bottom:0;">
                            <span class="panel-label"><?php echo esc_html__('Aktive Verbraucher', $text_domain); ?></span>
                        </div>
                        <div class="device-list custom-scrollbar" id="<?php echo esc_attr('device-list'); ?>">
                            <div class="empty-state"><?php echo esc_html__('Keine Geräte in der Matrix.', $text_domain); ?></div>
                            <!-- JS injiziert hier die Zeilen der Geräte-Matrix -->
                        </div>
                    </div>

                </div>

                <!-- Right: Analytics Dashboard -->
                <div class="en-analytics-section">
                    <div class="glass-panel stats-panel">
                        <div class="stat-row">
                            <div class="stat-box">
                                <span class="stat-lbl"><?php echo esc_html__('Kosten pro Tag', $text_domain); ?></span>
                                <span class="stat-val" id="<?php echo esc_attr('stat-cost-day'); ?>">0.00 €</span>
                                <span class="stat-sub" id="<?php echo esc_attr('stat-kwh-day'); ?>">0 kWh</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-lbl"><?php echo esc_html__('Kosten pro Monat', $text_domain); ?></span>
                                <span class="stat-val highlight-yellow" id="<?php echo esc_attr('stat-cost-month'); ?>">0.00 €</span>
                                <span class="stat-sub" id="<?php echo esc_attr('stat-kwh-month'); ?>">0 kWh</span>
                            </div>
                            <div class="stat-box">
                                <span class="stat-lbl"><?php echo esc_html__('Kosten pro Jahr (Projiziert)', $text_domain); ?></span>
                                <span class="stat-val" id="<?php echo esc_attr('stat-cost-year'); ?>">0.00 €</span>
                                <span class="stat-sub" id="<?php echo esc_attr('stat-kwh-year'); ?>">0 kWh</span>
                            </div>
                        </div>
                    </div>

                    <div class="glass-panel chart-panel mt-4">
                        <div class="panel-header">
                            <span class="panel-label"><?php echo esc_html__('Energie-Verteilung', $text_domain); ?></span>
                        </div>
                        <div class="chart-wrapper">
                            <div id="<?php echo esc_attr('chart-devices-empty'); ?>" class="chart-empty">
                                <?php echo esc_html__('Füge Geräte hinzu, um die Metrik zu generieren.', $text_domain); ?>
                            </div>
                            <div id="<?php echo esc_attr('chart-devices'); ?>"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- ==================== MODE 2: SMART METER CSV ==================== -->
        <div id="<?php echo esc_attr('mode-csv'); ?>" class="en-mode-view hidden">
            
            <div class="glass-panel drop-zone" id="<?php echo esc_attr('csv-dropzone'); ?>">
                <div class="drop-content">
                    <div class="drop-icon-glow"></div>
                    <svg viewBox="0 0 24 24" class="drop-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <h3 class="drop-title"><?php echo esc_html__('Smart-Meter Export injizieren', $text_domain); ?></h3>
                    <p class="drop-subtitle"><?php echo esc_html__('Ziehe die CSV-Datei deines Stromanbieters hierher', $text_domain); ?></p>
                    <div class="drop-badge"><?php echo esc_html__('Auto-Parsing Engine Active', $text_domain); ?></div>
                </div>
                <input type="file" id="<?php echo esc_attr('csv-file-input'); ?>" class="hidden-input" accept=".csv" />
            </div>

            <div id="<?php echo esc_attr('csv-workspace'); ?>" class="csv-workspace hidden">
                
                <div class="glass-panel stats-panel mb-4">
                    <div class="panel-header" style="border:none; padding:0 0 1rem 0;">
                        <span class="panel-label" id="<?php echo esc_attr('csv-filename'); ?>"><?php echo esc_html__('export.csv', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-csv-reset'); ?>" class="btn-action-small danger outline">
                            <?php echo esc_html__('Flush Data', $text_domain); ?>
                        </button>
                    </div>
                    <div class="stat-row">
                        <div class="stat-box">
                            <span class="stat-lbl"><?php echo esc_html__('Gesamtverbrauch (Datensatz)', $text_domain); ?></span>
                            <span class="stat-val highlight-yellow" id="<?php echo esc_attr('csv-stat-kwh'); ?>">0 kWh</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-lbl"><?php echo esc_html__('Gesamtkosten', $text_domain); ?></span>
                            <span class="stat-val" id="<?php echo esc_attr('csv-stat-cost'); ?>">0.00 €</span>
                        </div>
                        <div class="stat-box">
                            <span class="stat-lbl"><?php echo esc_html__('Datenpunkte', $text_domain); ?></span>
                            <span class="stat-val" id="<?php echo esc_attr('csv-stat-rows'); ?>">0</span>
                        </div>
                    </div>
                </div>

                <div class="glass-panel chart-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Zeitraum-Analyse (Smart-Meter)', $text_domain); ?></span>
                    </div>
                    <div class="chart-wrapper">
                        <div id="<?php echo esc_attr('chart-csv'); ?>"></div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>