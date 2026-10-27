<?php
/**
 * VGT MEDIACENTER - COSMIC BIORHYTHM
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependencies: Chart.js & SunCalc (Wird vom VGT Core bereitgestellt)
 */
wp_enqueue_script('vgt-chart');
wp_enqueue_script('vgt-suncalc');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-bio'); ?>">
    
    <!-- Hero Header: Navigations- und Titelbereich -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper bio-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M4 12c2.67-8 5.33-8 8 0s5.33 8 8 0"></path>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Cosmic Biorhythm', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Erweiterte biorhythmische Oszillation. Verknüpft deine internen Lebenszyklen mit aktueller stellarer und lunarer Telemetrie für hochpräzise Tages-Prognosen.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body bio-layout">
        
        <!-- Left: Input & Cosmic Context -->
        <div class="bio-sidebar">
            
            <!-- Setup Panel -->
            <div class="glass-panel bio-setup-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Temporale Initialisierung', $text_domain); ?></span>
                </div>
                
                <div class="control-group">
                    <label><?php echo esc_html__('Geburtsdatum (Nullpunkt)', $text_domain); ?></label>
                    <div class="input-wrap">
                        <svg viewBox="0 0 24 24" class="input-icon">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <input type="date" 
                               id="<?php echo esc_attr('bio-dob-input'); ?>" 
                               class="vgt-input" 
                               max="<?php echo esc_attr(wp_date('Y-m-d')); ?>">
                    </div>
                </div>

                <button id="<?php echo esc_attr('btn-sync-bio'); ?>" class="btn-prime green-glow mt-4">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    <?php echo esc_html__('Resonanz Synchronisieren', $text_domain); ?>
                </button>
            </div>

            <!-- Cosmic Modifiers (Live) -->
            <div class="glass-panel bio-cosmic-panel hidden" id="<?php echo esc_attr('cosmic-panel'); ?>">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Astrosphärische Einflüsse', $text_domain); ?></span>
                    <span class="status-badge live-sync">
                        <span class="pulse-dot"></span> <?php echo esc_html__('LIVE', $text_domain); ?>
                    </span>
                </div>

                <div class="cosmic-grid">
                    <div class="cosmic-item">
                        <svg viewBox="0 0 24 24" class="cosmic-icon moon-icon">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                        <div class="cosmic-data">
                            <span class="c-key"><?php echo esc_html__('Lunar-Phase', $text_domain); ?></span>
                            <span class="c-val" id="<?php echo esc_attr('c-moon-phase'); ?>"><?php echo esc_html__('Analysiere...', $text_domain); ?></span>
                            <span class="c-mod" id="<?php echo esc_attr('c-moon-mod'); ?>"><?php echo esc_html__('Emotionale Amplitude: --', $text_domain); ?></span>
                        </div>
                    </div>
                    
                    <div class="cosmic-item">
                        <svg viewBox="0 0 24 24" class="cosmic-icon sun-icon">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <div class="cosmic-data">
                            <span class="c-key"><?php echo esc_html__('Solares Zeichen', $text_domain); ?></span>
                            <span class="c-val" id="<?php echo esc_attr('c-zodiac'); ?>"><?php echo esc_html__('Analysiere...', $text_domain); ?></span>
                            <span class="c-mod" id="<?php echo esc_attr('c-zodiac-mod'); ?>"><?php echo esc_html__('Elementar-Fokus: --', $text_domain); ?></span>
                        </div>
                    </div>

                    <div class="cosmic-item">
                        <svg viewBox="0 0 24 24" class="cosmic-icon season-icon">
                            <path d="M12 2v20M17.5 6.5L6.5 17.5M22 12H2M17.5 17.5L6.5 6.5"></path>
                        </svg>
                        <div class="cosmic-data">
                            <span class="c-key"><?php echo esc_html__('Jahreszeit', $text_domain); ?></span>
                            <span class="c-val" id="<?php echo esc_attr('c-season'); ?>"><?php echo esc_html__('Analysiere...', $text_domain); ?></span>
                            <span class="c-mod" id="<?php echo esc_attr('c-season-mod'); ?>"><?php echo esc_html__('Physischer Bonus: --', $text_domain); ?></span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Right: Dashboard & Chart -->
        <div class="bio-main hidden" id="<?php echo esc_attr('bio-main'); ?>">
            
            <!-- Today's Telemetry -->
            <div class="glass-panel bio-today-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Tages-Signatur (Heute)', $text_domain); ?></span>
                    <span id="<?php echo esc_attr('bio-today-date'); ?>" class="terminal-text" style="color:var(--vg-text-muted)">DD.MM.YYYY</span>
                </div>
                
                <div class="metrics-grid">
                    <!-- Physical -->
                    <div class="metric-card">
                        <div class="metric-head">
                            <span class="m-title" style="color: rgba(var(--c-pink), 1)"><?php echo esc_html__('Physisch (23d)', $text_domain); ?></span>
                            <span class="m-val" id="<?php echo esc_attr('val-phy'); ?>">0%</span>
                        </div>
                        <div class="bio-bar-track">
                            <div class="bio-bar-zero"></div>
                            <div class="bio-bar-fill fill-pink" id="<?php echo esc_attr('bar-phy'); ?>"></div>
                        </div>
                        <span class="m-desc" id="<?php echo esc_attr('desc-phy'); ?>"><?php echo esc_html__('Analysiere Körperkraft...', $text_domain); ?></span>
                    </div>

                    <!-- Emotional -->
                    <div class="metric-card">
                        <div class="metric-head">
                            <span class="m-title" style="color: rgba(var(--c-blue), 1)"><?php echo esc_html__('Emotional (28d)', $text_domain); ?></span>
                            <span class="m-val" id="<?php echo esc_attr('val-emo'); ?>">0%</span>
                        </div>
                        <div class="bio-bar-track">
                            <div class="bio-bar-zero"></div>
                            <div class="bio-bar-fill fill-blue" id="<?php echo esc_attr('bar-emo'); ?>"></div>
                        </div>
                        <span class="m-desc" id="<?php echo esc_attr('desc-emo'); ?>"><?php echo esc_html__('Analysiere Sensibilität...', $text_domain); ?></span>
                    </div>

                    <!-- Intellectual -->
                    <div class="metric-card">
                        <div class="metric-head">
                            <span class="m-title" style="color: rgba(var(--c-green), 1)"><?php echo esc_html__('Intellektuell (33d)', $text_domain); ?></span>
                            <span class="m-val" id="<?php echo esc_attr('val-int'); ?>">0%</span>
                        </div>
                        <div class="bio-bar-track">
                            <div class="bio-bar-zero"></div>
                            <div class="bio-bar-fill fill-green" id="<?php echo esc_attr('bar-int'); ?>"></div>
                        </div>
                        <span class="m-desc" id="<?php echo esc_attr('desc-int'); ?>"><?php echo esc_html__('Analysiere Kognition...', $text_domain); ?></span>
                    </div>

                    <!-- Spiritual -->
                    <div class="metric-card">
                        <div class="metric-head">
                            <span class="m-title" style="color: rgba(var(--c-purple), 1)"><?php echo esc_html__('Spirituell (53d)', $text_domain); ?></span>
                            <span class="m-val" id="<?php echo esc_attr('val-spi'); ?>">0%</span>
                        </div>
                        <div class="bio-bar-track">
                            <div class="bio-bar-zero"></div>
                            <div class="bio-bar-fill fill-purple" id="<?php echo esc_attr('bar-spi'); ?>"></div>
                        </div>
                        <span class="m-desc" id="<?php echo esc_attr('desc-spi'); ?>"><?php echo esc_html__('Analysiere Intuition...', $text_domain); ?></span>
                    </div>
                </div>

                <!-- Critical Warning Box -->
                <div class="critical-warning hidden" id="<?php echo esc_attr('critical-warning'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <div>
                        <strong><?php echo esc_html__('Kritischer Transit-Tag:', $text_domain); ?></strong>
                        <span id="<?php echo esc_attr('critical-text'); ?>">
                            <?php echo esc_html__('Eine deiner Hauptkurven durchschneidet heute die Null-Linie. Hohes Potenzial für Instabilität. Vorsicht walten lassen.', $text_domain); ?>
                        </span>
                    </div>
                </div>

            </div>

            <!-- Chart Matrix -->
            <div class="glass-panel bio-chart-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Zyklus-Oszilloskop (-14 / +14 Tage)', $text_domain); ?></span>
                    <div class="chart-legend">
                        <span style="color: rgba(var(--c-pink),1)">■ <?php echo esc_html__('Phy', $text_domain); ?></span>
                        <span style="color: rgba(var(--c-blue),1)">■ <?php echo esc_html__('Emo', $text_domain); ?></span>
                        <span style="color: rgba(var(--c-green),1)">■ <?php echo esc_html__('Int', $text_domain); ?></span>
                        <span style="color: rgba(var(--c-purple),1)">■ <?php echo esc_html__('Spi', $text_domain); ?></span>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <canvas id="<?php echo esc_attr('biorhythm-chart'); ?>"></canvas>
                </div>
            </div>

        </div>

    </div>
</div>