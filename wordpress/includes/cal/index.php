<?php
/**
 * VGT MEDIACENTER - METABOLIC ENGINE
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: Chart.js (Wird über den VGT Core bereitgestellt)
 */
wp_enqueue_script('vgt-chart');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-cal'); ?>">
    
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
            <div class="hero-icon-wrapper cal-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M2 12h20c0 5.52-4.48 10-10 10S2 17.52 2 12z"></path>
                    <path d="M12 2v6"></path>
                    <path d="M8 3v5"></path>
                    <path d="M16 3v5"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Metabolic Engine', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Hochpräzise Stoffwechsel-Telemetrie (Mifflin-St. Jeor). Berechne deinen Total Daily Energy Expenditure (TDEE) und optimiere deine Makronährstoff-Matrix in Echtzeit.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body cal-layout">
        
        <!-- Left: Biometric Input Panel -->
        <div class="cal-input-section">
            
            <div class="glass-panel cal-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('1. Biometrische Parameter', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('cal-btn-reset'); ?>" class="btn-icon-small" title="<?php echo esc_attr__('Werte nullen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <!-- Gender Toggle -->
                <div class="control-group">
                    <label><?php echo esc_html__('Biologisches Geschlecht', $text_domain); ?></label>
                    <div class="vgt-toggle-group">
                        <button class="toggle-btn cal-gender-btn active" data-val="male"><?php echo esc_html__('Männlich', $text_domain); ?></button>
                        <button class="toggle-btn cal-gender-btn" data-val="female"><?php echo esc_html__('Weiblich', $text_domain); ?></button>
                    </div>
                </div>

                <!-- Physical Stats -->
                <div class="physical-inputs mt-4">
                    <div class="input-box">
                        <label><?php echo esc_html__('Alter', $text_domain); ?></label>
                        <div class="input-wrap">
                            <input type="number" id="<?php echo esc_attr('cal-age'); ?>" class="vgt-input cal-trigger" min="15" max="100" value="30">
                            <span class="input-suffix"><?php echo esc_html__('Jahre', $text_domain); ?></span>
                        </div>
                    </div>
                    <div class="input-box">
                        <label><?php echo esc_html__('Größe', $text_domain); ?></label>
                        <div class="input-wrap">
                            <input type="number" id="<?php echo esc_attr('cal-height'); ?>" class="vgt-input cal-trigger" min="100" max="250" value="180">
                            <span class="input-suffix"><?php echo esc_html__('cm', $text_domain); ?></span>
                        </div>
                    </div>
                    <div class="input-box">
                        <label><?php echo esc_html__('Gewicht', $text_domain); ?></label>
                        <div class="input-wrap">
                            <input type="number" id="<?php echo esc_attr('cal-weight'); ?>" class="vgt-input cal-trigger" min="40" max="200" value="80" step="0.5">
                            <span class="input-suffix"><?php echo esc_html__('kg', $text_domain); ?></span>
                        </div>
                    </div>
                </div>
                
                <!-- Activity Level -->
                <div class="control-group mt-4">
                    <label><?php echo esc_html__('Aktivitätslevel (PAL-Faktor)', $text_domain); ?></label>
                    <div class="select-wrap">
                        <select id="<?php echo esc_attr('cal-activity'); ?>" class="vgt-select cal-trigger">
                            <option value="1.2"><?php echo esc_html__('Sedentär (Bürojob, kaum Bewegung)', $text_domain); ?></option>
                            <option value="1.375" selected><?php echo esc_html__('Leicht aktiv (1-3x Sport / Woche)', $text_domain); ?></option>
                            <option value="1.55"><?php echo esc_html__('Moderat aktiv (3-5x Sport / Woche)', $text_domain); ?></option>
                            <option value="1.725"><?php echo esc_html__('Sehr aktiv (6-7x harter Sport / Woche)', $text_domain); ?></option>
                            <option value="1.9"><?php echo esc_html__('Extrem aktiv (Körperl. Arbeit + 2x Sport / Tag)', $text_domain); ?></option>
                        </select>
                        <svg viewBox="0 0 24 24" class="select-icon">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Target & Macros Panel -->
            <div class="glass-panel cal-panel mt-4">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('2. Zielsetzung & Ernährungsprofil', $text_domain); ?></span>
                </div>

                <div class="control-group">
                    <label><?php echo esc_html__('Physisches Ziel', $text_domain); ?></label>
                    <div class="target-grid">
                        <button class="target-btn cal-goal-btn" data-val="-500">
                            <span class="tb-title text-pink"><?php echo esc_html__('Cut (Aggressiv)', $text_domain); ?></span>
                            <span class="tb-desc"><?php echo esc_html__('-500 kcal', $text_domain); ?></span>
                        </button>
                        <button class="target-btn cal-goal-btn" data-val="-300">
                            <span class="tb-title text-orange"><?php echo esc_html__('Defizit (Leicht)', $text_domain); ?></span>
                            <span class="tb-desc"><?php echo esc_html__('-300 kcal', $text_domain); ?></span>
                        </button>
                        <button class="target-btn cal-goal-btn active" data-val="0">
                            <span class="tb-title text-green"><?php echo esc_html__('Erhaltung (TDEE)', $text_domain); ?></span>
                            <span class="tb-desc"><?php echo esc_html__('±0 kcal', $text_domain); ?></span>
                        </button>
                        <button class="target-btn cal-goal-btn" data-val="300">
                            <span class="tb-title text-cyan"><?php echo esc_html__('Aufbau (Lean)', $text_domain); ?></span>
                            <span class="tb-desc"><?php echo esc_html__('+300 kcal', $text_domain); ?></span>
                        </button>
                    </div>
                </div>

                <div class="control-group mt-4">
                    <label><?php echo esc_html__('Makro-Verteilung (P / K / F)', $text_domain); ?></label>
                    <div class="vgt-toggle-group full-width">
                        <button class="toggle-btn cal-macro-btn active" data-val="balanced"><?php echo esc_html__('Balanced (30/40/30)', $text_domain); ?></button>
                        <button class="toggle-btn cal-macro-btn" data-val="high_protein"><?php echo esc_html__('High Protein (40/30/30)', $text_domain); ?></button>
                        <button class="toggle-btn cal-macro-btn" data-val="low_carb"><?php echo esc_html__('Low Carb (40/20/40)', $text_domain); ?></button>
                        <button class="toggle-btn cal-macro-btn" data-val="keto"><?php echo esc_html__('Keto (25/5/70)', $text_domain); ?></button>
                    </div>
                </div>
            </div>

        </div>

        <!-- Right: Telemetry Dashboard -->
        <div class="cal-output-section">
            
            <!-- Energy Burn Breakdown -->
            <div class="glass-panel energy-panel">
                <div class="energy-header">
                    <span class="panel-label"><?php echo esc_html__('Metabolischer Gesamtumsatz', $text_domain); ?></span>
                    <span class="status-badge">
                        <span class="pulse-dot"></span> 
                        <span id="<?php echo esc_attr('cal-status-text'); ?>"><?php echo esc_html__('Synchronisiert', $text_domain); ?></span>
                    </span>
                </div>

                <div class="energy-main-readout">
                    <div class="readout-block">
                        <span class="r-val highlight-orange" id="<?php echo esc_attr('out-target-kcal'); ?>">0</span>
                        <span class="r-unit"><?php echo esc_html__('kcal / Tag', $text_domain); ?></span>
                    </div>
                    <div class="r-desc" id="<?php echo esc_attr('out-target-desc'); ?>"><?php echo esc_html__('Tägliches Zielvolumen', $text_domain); ?></div>
                </div>

                <div class="energy-split">
                    <div class="split-box">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        <div class="sb-data">
                            <span class="sb-val" id="<?php echo esc_attr('out-bmr'); ?>">0 kcal</span>
                            <span class="sb-lbl"><?php echo esc_html__('Grundumsatz (BMR)', $text_domain); ?></span>
                        </div>
                    </div>
                    <div class="split-box">
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        <div class="sb-data">
                            <span class="sb-val" id="<?php echo esc_attr('out-activity'); ?>">0 kcal</span>
                            <span class="sb-lbl"><?php echo esc_html__('Aktivitäts-Burn (PAL)', $text_domain); ?></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Macro Matrix & Chart -->
            <div class="glass-panel macro-panel mt-4">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Makronährstoff-Matrix', $text_domain); ?></span>
                </div>

                <div class="macro-layout">
                    <!-- Chart.js Container -->
                    <div class="macro-chart-wrap">
                        <canvas id="<?php echo esc_attr('cal-macro-chart'); ?>"></canvas>
                        <div class="chart-center-info">
                            <span class="cc-val">100%</span>
                            <span class="cc-lbl"><?php echo esc_html__('Energie', $text_domain); ?></span>
                        </div>
                    </div>

                    <!-- Macro Cards -->
                    <div class="macro-cards">
                        
                        <div class="macro-card m-protein">
                            <div class="mc-head">
                                <span class="mc-title"><?php echo esc_html__('Proteine', $text_domain); ?></span>
                                <span class="mc-pct" id="<?php echo esc_attr('pct-pro'); ?>">30%</span>
                            </div>
                            <div class="mc-body">
                                <span class="mc-g" id="<?php echo esc_attr('g-pro'); ?>">0g</span>
                                <span class="mc-kcal" id="<?php echo esc_attr('kcal-pro'); ?>">0 kcal</span>
                            </div>
                            <div class="mc-bar"><div class="mc-fill" id="<?php echo esc_attr('bar-pro'); ?>" style="width:0%"></div></div>
                        </div>

                        <div class="macro-card m-carbs">
                            <div class="mc-head">
                                <span class="mc-title"><?php echo esc_html__('Kohlenhydrate', $text_domain); ?></span>
                                <span class="mc-pct" id="<?php echo esc_attr('pct-carb'); ?>">40%</span>
                            </div>
                            <div class="mc-body">
                                <span class="mc-g" id="<?php echo esc_attr('g-carb'); ?>">0g</span>
                                <span class="mc-kcal" id="<?php echo esc_attr('kcal-carb'); ?>">0 kcal</span>
                            </div>
                            <div class="mc-bar"><div class="mc-fill" id="<?php echo esc_attr('bar-carb'); ?>" style="width:0%"></div></div>
                        </div>

                        <div class="macro-card m-fat">
                            <div class="mc-head">
                                <span class="mc-title"><?php echo esc_html__('Fette', $text_domain); ?></span>
                                <span class="mc-pct" id="<?php echo esc_attr('pct-fat'); ?>">30%</span>
                            </div>
                            <div class="mc-body">
                                <span class="mc-g" id="<?php echo esc_attr('g-fat'); ?>">0g</span>
                                <span class="mc-kcal" id="<?php echo esc_attr('kcal-fat'); ?>">0 kcal</span>
                            </div>
                            <div class="mc-bar"><div class="mc-fill" id="<?php echo esc_attr('bar-fat'); ?>" style="width:0%"></div></div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </div>
</div>