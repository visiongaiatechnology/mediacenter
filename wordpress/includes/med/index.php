<?php
/**
 * VGT MEDIACENTER - NEURAL RESET (BREATHING & AMBIENT ENGINE)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Audio-UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Zero Dependencies - 100% Native WebAudio API & JS im Frontend.
 * Berechnet biomechanische Oszillationen lokal im Browser-RAM.
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-med'); ?>">
    
    <!-- Hero Header: Navigation und kognitive Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper med-glow">
                <svg viewBox="0 0 24 24" class="hero-icon"><path d="M12 22s-4-6-4-10a4 4 0 0 1 8 0c0 4-4 10-4 10z"></path><path d="M2 12c0-4 4-6 8-6"></path><path d="M22 12c0-4-4-6-8-6"></path></svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Neural Reset', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Biomechanische Atem-Synchronisation und Ambient-Frequenz-Synthese. Reduziere Cortisol-Level und forciere den Theta-Gehirnwellen-Status durch geführte Protokolle.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body med-layout">
        
        <!-- Left: Breathing & Timer Core -->
        <div class="glass-panel med-core-panel">
            
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Respirations-Matrix', $text_domain); ?></span>
                <div class="med-timer-display">
                    <span id="<?php echo esc_attr('med-time-left'); ?>">10:00</span>
                </div>
            </div>

            <!-- The Breathing Aura: Visuelle Feedback-Schleife -->
            <div class="med-aura-container checkerboard">
                <div class="aura-ring" id="<?php echo esc_attr('med-aura-ring'); ?>"></div>
                <div class="aura-center">
                    <h3 id="<?php echo esc_attr('med-phase-text'); ?>"><?php echo esc_html__('BEREIT', $text_domain); ?></h3>
                    <span id="<?php echo esc_attr('med-phase-timer'); ?>" class="hidden">4s</span>
                </div>
            </div>

            <!-- Protocol Config: Kognitive Parameter -->
            <div class="med-config mt-4">
                
                <div class="control-group">
                    <label><?php echo esc_html__('Atem-Protokoll', $text_domain); ?></label>
                    <div class="vgt-toggle-group full-width">
                        <button class="toggle-btn breath-btn active" data-protocol="<?php echo esc_attr('box'); ?>">
                            <?php echo esc_html__('Box (4-4-4-4)', $text_domain); ?>
                        </button>
                        <button class="toggle-btn breath-btn" data-protocol="<?php echo esc_attr('relax'); ?>">
                            <?php echo esc_html__('Relax (4-7-8)', $text_domain); ?>
                        </button>
                        <button class="toggle-btn breath-btn" data-protocol="<?php echo esc_attr('coherent'); ?>">
                            <?php echo esc_html__('Coherent (5.5-5.5)', $text_domain); ?>
                        </button>
                    </div>
                </div>

                <div class="control-group mt-4">
                    <label><?php echo esc_html__('Session-Dauer', $text_domain); ?></label>
                    <div class="vgt-toggle-group full-width">
                        <button class="toggle-btn time-btn" data-time="<?php echo esc_attr('300'); ?>"><?php echo esc_html__('5 Min', $text_domain); ?></button>
                        <button class="toggle-btn time-btn active" data-time="<?php echo esc_attr('600'); ?>"><?php echo esc_html__('10 Min', $text_domain); ?></button>
                        <button class="toggle-btn time-btn" data-time="<?php echo esc_attr('900'); ?>"><?php echo esc_html__('15 Min', $text_domain); ?></button>
                        <button class="toggle-btn time-btn" data-time="<?php echo esc_attr('1800'); ?>"><?php echo esc_html__('30 Min', $text_domain); ?></button>
                    </div>
                </div>

            </div>

            <!-- Master Action: Session-Steuerung -->
            <div class="med-actions mt-4">
                <button id="<?php echo esc_attr('btn-med-start'); ?>" class="btn-prime teal-glow">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    <span id="<?php echo esc_attr('med-btn-text'); ?>">
                        <?php echo esc_html__('Session Initiieren', $text_domain); ?>
                    </span>
                </button>
                <button id="<?php echo esc_attr('btn-med-stop'); ?>" class="btn-action-small danger outline hidden">
                    <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                    <?php echo esc_html__('Abbruch', $text_domain); ?>
                </button>
            </div>

        </div>

        <!-- Right: Ambient Synthesis (Generative Audio) -->
        <div class="glass-panel med-ambient-panel">
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Ambient Soundscapes (Native Gen)', $text_domain); ?></span>
                <span class="status-badge" id="<?php echo esc_attr('ambient-status'); ?>">
                    <span class="pulse-dot hidden" id="<?php echo esc_attr('ambient-pulse'); ?>"></span> 
                    <?php echo esc_html__('Offline', $text_domain); ?>
                </span>
            </div>

            <div class="ambient-tracks">
                
                <?php
                $tracks = [
                    [
                        'id'    => 'drone',
                        'title' => 'Binaural Theta Drone',
                        'desc'  => '432Hz Base / 4Hz Shift. Kopfhörer nötig.',
                        'icon'  => '<path d="M4 12c2.67-8 5.33-8 8 0s5.33 8 8 0"></path>'
                    ],
                    [
                        'id'    => 'brown',
                        'title' => 'Brown Noise (Fokus)',
                        'desc'  => 'Tiefe Frequenzen, filtert Gedanken.',
                        'icon'  => '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>'
                    ],
                    [
                        'id'    => 'pink',
                        'title' => 'Pink Noise (Relax)',
                        'desc'  => 'Naturähnliches Rauschen, beruhigend.',
                        'icon'  => '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>'
                    ]
                ];

                foreach ($tracks as $track): ?>
                    <div class="ambient-track">
                        <div class="track-header">
                            <div class="track-info">
                                <svg viewBox="0 0 24 24" class="svg-icon"><?php echo $track['icon']; ?></svg>
                                <div class="ti-text">
                                    <span class="ti-title"><?php echo esc_html__($track['title'], $text_domain); ?></span>
                                    <span class="ti-desc"><?php echo esc_html__($track['desc'], $text_domain); ?></span>
                                </div>
                            </div>
                            <label class="vgt-switch">
                                <input type="checkbox" class="sound-toggle" data-type="<?php echo esc_attr($track['id']); ?>">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div class="track-vol">
                            <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon></svg>
                            <input type="range" 
                                   class="vgt-slider vol-slider" 
                                   data-target="<?php echo esc_attr($track['id']); ?>" 
                                   min="0" max="1" step="0.05" value="0.5">
                        </div>
                    </div>
                <?php endforeach; ?>

            </div>

            <div class="ambient-footer mt-auto">
                <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <?php echo esc_html__('Die Audiosignale werden in Echtzeit lokal in deinem Browser berechnet. Es fließen keine Daten aus dem Netzwerk.', $text_domain); ?>
            </div>
        </div>

    </div>
</div>