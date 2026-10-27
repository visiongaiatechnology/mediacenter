<?php
/**
 * VGT MEDIACENTER - NEURAL SYNC (BINAURAL BEATS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Zero Dependencies - 100% Native WebAudio API im Frontend
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-freq'); ?>">
    
    <!-- Hero Header: Navigation und Titelbereich -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper freq-glow">
                <svg viewBox="0 0 24 24" class="hero-icon"><polyline points="2 12 6 4 10 20 14 4 18 20 22 12"></polyline></svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Neural Sync', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Hochpräziser Binaural-Beats-Generator. Synchronisiere deine Gehirnwellen durch mathematisch perfekte, asymmetrische Audio-Frequenzen. (Kopfhörer erforderlich).', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body freq-layout">
        
        <!-- Presets Panel: Kognitive Protokolle -->
        <div class="glass-panel freq-presets-panel">
            <h3 class="panel-label"><?php echo esc_html__('Kognitive Protokolle', $text_domain); ?></h3>
            <div class="presets-grid">
                <?php
                $presets = [
                    ['base' => '160', 'beat' => '2',  'type' => 'delta', 'name' => 'Delta (Deep Sleep)', 'val' => '1-4 Hz | Regeneration'],
                    ['base' => '200', 'beat' => '6',  'type' => 'theta', 'name' => 'Theta (Meditation)', 'val' => '4-8 Hz | Trance'],
                    ['base' => '240', 'beat' => '10', 'type' => 'alpha', 'name' => 'Alpha (Relax)',      'val' => '8-14 Hz | Flow State'],
                    ['base' => '320', 'beat' => '20', 'type' => 'beta',  'name' => 'Beta (Fokus)',       'val' => '14-30 Hz | Konzentration'],
                    ['base' => '400', 'beat' => '40', 'type' => 'gamma', 'name' => 'Gamma (Peak)',       'val' => '30-50 Hz | Kognition'],
                ];

                foreach ($presets as $p): ?>
                    <button class="preset-btn" 
                            data-base="<?php echo esc_attr($p['base']); ?>" 
                            data-beat="<?php echo esc_attr($p['beat']); ?>" 
                            data-type="<?php echo esc_attr($p['type']); ?>">
                        <span class="preset-name"><?php echo esc_html__($p['name'], $text_domain); ?></span>
                        <span class="preset-val"><?php echo esc_html__($p['val'], $text_domain); ?></span>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Engine & Visualizer Panel -->
        <div class="glass-panel freq-engine-panel">
            
            <!-- Oscilloscope: Wellenform-Visualisierung -->
            <div class="freq-visualizer">
                <div class="visualizer-header">
                    <span class="vis-label"><?php echo esc_html__('Echtzeit Oszilloskop', $text_domain); ?></span>
                    <div class="vis-status">
                        <span class="status-dot"></span>
                        <span id="<?php echo esc_attr('engine-status'); ?>"><?php echo esc_html__('Engine Offline', $text_domain); ?></span>
                    </div>
                </div>
                <div class="canvas-wrapper checkerboard">
                    <canvas id="<?php echo esc_attr('freq-canvas'); ?>"></canvas>
                    <div class="canvas-overlay">
                        <div class="freq-readout left" id="<?php echo esc_attr('readout-l'); ?>">0.0 Hz</div>
                        <div class="freq-readout right" id="<?php echo esc_attr('readout-r'); ?>">0.0 Hz</div>
                    </div>
                </div>
            </div>

            <!-- Master Controls: Frequenz-Vektoren -->
            <div class="freq-controls">
                
                <div class="control-group">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('Trägerfrequenz (Base)', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('lbl-base'); ?>" class="val-badge">200 Hz</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('slider-base'); ?>" class="vgt-slider teal-slider" min="50" max="1000" value="200" step="1">
                    <div class="range-marks">
                        <span><?php echo esc_html__('50 Hz (Sub)', $text_domain); ?></span>
                        <span><?php echo esc_html__('1000 Hz (High)', $text_domain); ?></span>
                    </div>
                </div>

                <div class="control-group">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('Binauraler Beat (Differenz)', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('lbl-beat'); ?>" class="val-badge">6.0 Hz</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('slider-beat'); ?>" class="vgt-slider cyan-slider" min="0.1" max="50" value="6" step="0.1">
                    <div class="range-marks">
                        <span>0.1 Hz</span>
                        <span>50 Hz</span>
                    </div>
                </div>

            </div>

            <!-- Action Bar: Systemsteuerung & Volumen -->
            <div class="freq-action-bar">
                <button id="<?php echo esc_attr('btn-toggle-engine'); ?>" class="btn-prime teal-glow">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span id="<?php echo esc_attr('engine-btn-text'); ?>">
                        <?php echo esc_html__('Neural Sync Initiieren', $text_domain); ?>
                    </span>
                </button>
                
                <div class="volume-control">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                    <input type="range" id="<?php echo esc_attr('slider-volume'); ?>" class="vgt-slider" min="0" max="1" value="0.5" step="0.05">
                </div>
            </div>

        </div>

    </div>
</div>