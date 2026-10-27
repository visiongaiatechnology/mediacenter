<?php
/**
 * VGT MEDIACENTER - LUNAR TELEMETRY (ORBITAL ANALYTICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Telemetry-UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: SunCalc (Wird über den VGT Core bereitgestellt)
 * Ermöglicht die Berechnung der lunaren Ephemeriden direkt im Browser-RAM.
 */
wp_enqueue_script('vgt-suncalc');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-moon'); ?>">
    
    <!-- Hero Header: Navigation und astronomische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper mn-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    <line x1="18" y1="4" x2="18" y2="6"></line>
                    <line x1="17" y1="5" x2="19" y2="5"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Lunar Telemetry', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Echtzeit-Synchronisation mit der lunaren Mechanik. Überwache den orbitalen Status, Beleuchtungsgrade und energetische Phasen-Shifts auf die Mikrosekunde genau.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body mn-layout">
        
        <!-- Left: Lunar Visualizer Panel (Real-Time Rendering) -->
        <div class="glass-panel mn-visual-panel">
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Orbital Visualizer', $text_domain); ?></span>
                <span class="status-badge" id="<?php echo esc_attr('mn-sync-status'); ?>">
                    <span class="pulse-dot"></span> <?php echo esc_html__('LIVE SYNC', $text_domain); ?>
                </span>
            </div>
            
            <div class="moon-container">
                <div class="moon-glow-bg" id="<?php echo esc_attr('moon-glow-bg'); ?>"></div>
                <div class="moon-sphere">
                    <div class="moon-crater c1"></div>
                    <div class="moon-crater c2"></div>
                    <div class="moon-crater c3"></div>
                    <div class="moon-crater c4"></div>
                    <!-- Dynamischer Schatten-Vektor für die Phasen-Simulation -->
                    <div class="moon-shadow" id="<?php echo esc_attr('moon-phase-shadow'); ?>"></div>
                </div>
            </div>

            <div class="phase-title" id="<?php echo esc_attr('mn-phase-name'); ?>">
                <?php echo esc_html__('Analysiere Umlaufbahn...', $text_domain); ?>
            </div>
            <div class="phase-desc" id="<?php echo esc_attr('mn-phase-desc'); ?>">
                <?php echo esc_html__('Kompiliere telemetrische Daten.', $text_domain); ?>
            </div>
        </div>

        <!-- Right: Telemetry Matrix (Numeric Data-Stream) -->
        <div class="mn-data-panel">
            
            <!-- Live Score: Illumination Telemetry -->
            <div class="glass-panel score-panel">
                <div class="score-header">
                    <span class="score-label"><?php echo esc_html__('Sichtbare Illumination', $text_domain); ?></span>
                    <span class="trend-badge" id="<?php echo esc_attr('mn-trend-badge'); ?>">
                        <svg viewBox="0 0 24 24" id="trend-icon" class="svg-icon"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                        <span id="<?php echo esc_attr('trend-text'); ?>"><?php echo esc_html__('Wachsend', $text_domain); ?></span>
                    </span>
                </div>
                
                <div class="live-score-wrap">
                    <span class="live-score-int" id="<?php echo esc_attr('score-int'); ?>">00</span>
                    <span class="live-score-dec" id="<?php echo esc_attr('score-dec'); ?>">.000000</span>
                    <span class="live-score-unit">%</span>
                </div>
                
                <div class="progress-bar-bg mt-4">
                    <div class="progress-fill yellow-fill" id="<?php echo esc_attr('illumination-bar'); ?>" style="width: 0%;"></div>
                </div>
            </div>

            <!-- Grid Data: Temporal and Geometric Markers -->
            <div class="data-grid">
                
                <!-- Countdown: Phase-Transition -->
                <div class="glass-panel data-card countdown-card">
                    <div class="card-top">
                        <svg viewBox="0 0 24 24" class="card-icon"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span class="card-title" id="<?php echo esc_attr('countdown-target'); ?>">
                            <?php echo esc_html__('Nächster Vollmond', $text_domain); ?>
                        </span>
                    </div>
                    <div class="countdown-timer" id="<?php echo esc_attr('mn-countdown'); ?>">
                        00<span class="cd-unit">d</span> 00<span class="cd-unit">h</span> 00<span class="cd-unit">m</span> 00<span class="cd-unit">s</span>
                    </div>
                </div>

                <!-- Geometry: Orbital Angle -->
                <div class="glass-panel data-card">
                    <div class="card-top">
                        <svg viewBox="0 0 24 24" class="card-icon"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <span class="card-title"><?php echo esc_html__('Geozentrischer Winkel', $text_domain); ?></span>
                    </div>
                    <div class="card-value" id="<?php echo esc_attr('mn-angle'); ?>">0.00°</div>
                    <span class="card-sub"><?php echo esc_html__('Neigung zum Äquator', $text_domain); ?></span>
                </div>

            </div>

            <!-- Energetic Protocol: Kognitiver Kontext -->
            <div class="glass-panel energetic-panel">
                <div class="panel-header" style="margin-bottom: 1rem; border-bottom: none;">
                    <span class="panel-label"><?php echo esc_html__('Energetisches Protokoll', $text_domain); ?></span>
                </div>
                <div class="energetic-body">
                    <svg viewBox="0 0 24 24" class="energy-icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                    <div class="energy-content">
                        <h4 id="<?php echo esc_attr('energy-title'); ?>"><?php echo esc_html__('Initialisiere...', $text_domain); ?></h4>
                        <p id="<?php echo esc_attr('energy-desc'); ?>">
                            <?php echo esc_html__('Warte auf himmelsmechanische Berechnung.', $text_domain); ?>
                        </p>
                    </div>
                </div>
            </div>

        </div>

    </div>
</div>