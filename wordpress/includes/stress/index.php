<?php
/**
 * VGT MEDIACENTER - COGNITIVE LOAD (STRESS & FOCUS TELEMETRY)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Real-Time UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: Chart.js
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht die kognitive Visualisierung der neuronalen Last im Browser-RAM.
 */
wp_enqueue_script('vgt-chart');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-stress'); ?>">
    
    <!-- Hero Header: Navigation und systemische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper cl-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M9.5 2h5M12 2v20M17.5 4.5a4.5 4.5 0 0 1 1 8.89V14a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-.61a4.5 4.5 0 0 1 1-8.89"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Cognitive Load', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Echtzeit-Telemetrie deines mentalen Zustands. Analysiere Stress-Level, Fokus-Kapazität und neuronale Erschöpfung durch bio-metrische Selbsteinschätzung.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body cl-layout">
        
        <!-- Left: Sensor Input Panel (Kalibrierungs-Matrix) -->
        <div class="glass-panel cl-sensor-panel">
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Bio-Metrische Sensoren', $text_domain); ?></span>
                <button id="<?php echo esc_attr('cl-btn-reset'); ?>" class="btn-icon-small" title="<?php echo esc_attr__('Sensoren nullen', $text_domain); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            
            <p class="panel-desc">
                <?php echo esc_html__('Kalibriere die Sensoren auf deinen exakten, gegenwärtigen Zustand.', $text_domain); ?>
            </p>

            <div class="sensor-list">
                <!-- Sensor 1: Mental Speed -->
                <div class="sensor-group">
                    <div class="sensor-header">
                        <label><?php echo esc_html__('Gedankenstrom (Mental Speed)', $text_domain); ?></label>
                        <span class="sensor-val" id="<?php echo esc_attr('val-speed'); ?>"><?php echo esc_html__('Ruhig', $text_domain); ?></span>
                    </div>
                    <input type="range" class="vgt-thermal-slider" id="<?php echo esc_attr('sens-speed'); ?>" min="0" max="100" value="20">
                    <div class="sensor-marks">
                        <span><?php echo esc_html__('Klar/Zentriert', $text_domain); ?></span>
                        <span><?php echo esc_html__('Rasend/Chaotisch', $text_domain); ?></span>
                    </div>
                </div>

                <!-- Sensor 2: Focus Drain -->
                <div class="sensor-group">
                    <div class="sensor-header">
                        <label><?php echo esc_html__('Ablenkbarkeit (Focus Drain)', $text_domain); ?></label>
                        <span class="sensor-val" id="<?php echo esc_attr('val-distract'); ?>"><?php echo esc_html__('Gering', $text_domain); ?></span>
                    </div>
                    <input type="range" class="vgt-thermal-slider" id="<?php echo esc_attr('sens-distract'); ?>" min="0" max="100" value="30">
                    <div class="sensor-marks">
                        <span><?php echo esc_html__('Laser-Fokus', $text_domain); ?></span>
                        <span><?php echo esc_html__('Fragmentiert', $text_domain); ?></span>
                    </div>
                </div>

                <!-- Sensor 3: Cortisol/Tension -->
                <div class="sensor-group">
                    <div class="sensor-header">
                        <label><?php echo esc_html__('Körperliche Anspannung (Cortisol)', $text_domain); ?></label>
                        <span class="sensor-val" id="<?php echo esc_attr('val-tension'); ?>"><?php echo esc_html__('Entspannt', $text_domain); ?></span>
                    </div>
                    <input type="range" class="vgt-thermal-slider" id="<?php echo esc_attr('sens-tension'); ?>" min="0" max="100" value="10">
                    <div class="sensor-marks">
                        <span><?php echo esc_html__('Gelöst', $text_domain); ?></span>
                        <span><?php echo esc_html__('Verkrampft', $text_domain); ?></span>
                    </div>
                </div>

                <!-- Sensor 4: Fatigue -->
                <div class="sensor-group">
                    <div class="sensor-header">
                        <label><?php echo esc_html__('Neuronale Erschöpfung (Fatigue)', $text_domain); ?></label>
                        <span class="sensor-val" id="<?php echo esc_attr('val-fatigue'); ?>"><?php echo esc_html__('Wach', $text_domain); ?></span>
                    </div>
                    <input type="range" class="vgt-thermal-slider" id="<?php echo esc_attr('sens-fatigue'); ?>" min="0" max="100" value="15">
                    <div class="sensor-marks">
                        <span><?php echo esc_html__('Volle Energie', $text_domain); ?></span>
                        <span><?php echo esc_html__('Burnout', $text_domain); ?></span>
                    </div>
                </div>
            </div>

            <div class="sensor-footer mt-auto">
                <div class="safety-note">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    <?php echo esc_html__('Telemetrie wird in Echtzeit berechnet.', $text_domain); ?>
                </div>
            </div>
        </div>

        <!-- Right: Telemetry Dashboard (Diagnostik-Zentrale) -->
        <div class="glass-panel cl-telemetry-panel">
            
            <div class="telemetry-header">
                <span class="panel-label"><?php echo esc_html__('System-Diagnostik', $text_domain); ?></span>
                <span class="status-pill safe" id="<?php echo esc_attr('sys-status-pill'); ?>">
                    <?php echo esc_html__('OPTIMAL', $text_domain); ?>
                </span>
            </div>

            <!-- Primary Readouts: Numerische Vektoren -->
            <div class="readout-grid">
                <div class="readout-box">
                    <span class="readout-title"><?php echo esc_html__('Stress-Level', $text_domain); ?></span>
                    <div class="readout-val-wrap">
                        <span class="readout-val" id="<?php echo esc_attr('out-stress'); ?>">15</span>
                        <span class="readout-unit">%</span>
                    </div>
                </div>
                <div class="readout-box">
                    <span class="readout-title"><?php echo esc_html__('Fokus-Kapazität', $text_domain); ?></span>
                    <div class="readout-val-wrap">
                        <span class="readout-val highlight-blue" id="<?php echo esc_attr('out-focus'); ?>">85</span>
                        <span class="readout-unit">%</span>
                    </div>
                </div>
            </div>

            <!-- Chart Area: Neuronale Lastverteilung -->
            <div class="cl-chart-container">
                <canvas id="<?php echo esc_attr('cognitive-chart'); ?>"></canvas>
                <!-- Center overlay for doughnut chart physics -->
                <div class="chart-center-overlay">
                    <span class="load-label"><?php echo esc_html__('Cognitive Load', $text_domain); ?></span>
                    <span class="load-value" id="<?php echo esc_attr('out-load'); ?>"><?php echo esc_html__('LOW', $text_domain); ?></span>
                </div>
            </div>

            <!-- AI Diagnosis & Recommended Action Path -->
            <div class="diagnosis-box" id="<?php echo esc_attr('diag-box'); ?>">
                <h4 class="diag-title" id="<?php echo esc_attr('diag-title'); ?>">
                    <?php echo esc_html__('Flow State detektiert.', $text_domain); ?>
                </h4>
                <p class="diag-desc" id="<?php echo esc_attr('diag-desc'); ?>">
                    <?php echo esc_html__('Dein System arbeitet hochgradig effizient. Nutze diesen Zustand für tiefe, komplexe Arbeit.', $text_domain); ?>
                </p>
                
                <div class="diag-action mt-4" id="<?php echo esc_attr('diag-action'); ?>">
                    <!-- Dynamische Empfehlung via Router-Link -->
                    <a href="<?php echo esc_url('?vgt_tool=freq'); ?>" class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="2 12 6 4 10 20 14 4 18 20 22 12"></polyline></svg>
                        <?php echo esc_html__('Neural Sync: Alpha (Maintain Flow)', $text_domain); ?>
                    </a>
                </div>
            </div>

        </div>

    </div>
</div>