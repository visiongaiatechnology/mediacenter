<?php
/**
 * VGT MEDIACENTER - AUDIO STUDIO PRO
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Dependencies: WaveSurfer.js & Lame.js (Wird vom VGT Core bereitgestellt)
wp_enqueue_script('vgt-wavesurfer');
wp_enqueue_script('vgt-lame');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-audiostudio'); ?>">
    
    <!-- Hero Header -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper as-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Audio Studio Pro', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Echtzeit Audio-Analyse, 5-Band Equalizer und Format-Konvertierung (MP3/WAV) im Browser. Absolute Vertraulichkeit.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <div class="tool-body">
        
        <!-- Dropzone View -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('as-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Audiospur injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Ziehe WAV, MP3, OGG oder M4A Dateien hierher', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Lokale Waveform-Analyse & EQ', $text_domain); ?></div>
            </div>
            <input type="file" id="<?php echo esc_attr('as-file-input'); ?>" class="hidden-input" accept="audio/*" />
        </div>

        <!-- Workspace View -->
        <div id="<?php echo esc_attr('as-workspace'); ?>" class="as-layout hidden">
            
            <!-- Main Audio Editor Panel -->
            <div class="glass-panel as-editor-panel">
                <div class="as-header">
                    <div class="as-track-info">
                        <span class="as-filename" id="<?php echo esc_attr('as-filename'); ?>"><?php echo esc_html__('track_01.mp3', $text_domain); ?></span>
                        <span class="as-filesize" id="<?php echo esc_attr('as-filesize'); ?>"><?php echo esc_html__('0 MB', $text_domain); ?></span>
                    </div>
                    <button id="<?php echo esc_attr('as-btn-reset'); ?>" class="btn-action-small danger">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        <?php echo esc_html__('Spur verwerfen', $text_domain); ?>
                    </button>
                </div>

                <!-- Waveform Display -->
                <div class="as-waveform-container" id="<?php echo esc_attr('as-waveform-container'); ?>">
                    <div class="waveform-loader hidden" id="<?php echo esc_attr('as-loader'); ?>">
                        <div class="waveform-spinner"></div>
                        <span><?php echo esc_html__('Dekodiere Audiospur...', $text_domain); ?></span>
                    </div>
                    <div id="<?php echo esc_attr('waveform'); ?>" class="waveform-canvas"></div>
                </div>

                <!-- Playback Controls -->
                <div class="as-playback-controls">
                    <button class="btn-play" id="<?php echo esc_attr('btn-play-pause'); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon play-icon">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                    </button>
                    
                    <div class="as-time-display">
                        <span id="<?php echo esc_attr('time-current'); ?>">00:00</span> / <span id="<?php echo esc_attr('time-total'); ?>">00:00</span>
                    </div>

                    <div class="as-volume-control">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                        <input type="range" id="<?php echo esc_attr('as-volume'); ?>" class="vgt-slider volume-slider" min="0" max="1" step="0.05" value="1">
                    </div>
                </div>

                <!-- Studio Equalizer (5-Band) -->
                <div class="as-eq-section">
                    <div class="panel-label"><?php echo esc_html__('Studio Equalizer (5-Band Biquad)', $text_domain); ?></div>
                    <div class="eq-grid">
                        <?php 
                        $freqs = ['60 Hz', '230 Hz', '910 Hz', '3.6 kHz', '14 kHz'];
                        foreach ($freqs as $index => $freq): 
                        ?>
                        <div class="eq-band">
                            <span class="eq-val" id="<?php echo esc_attr("val-eq-{$index}"); ?>">0 dB</span>
                            <div class="slider-container">
                                <input type="range" 
                                       class="vertical-slider eq-slider" 
                                       data-band="<?php echo esc_attr((string)$index); ?>" 
                                       min="-12" max="12" step="1" value="0">
                            </div>
                            <span class="eq-freq"><?php echo esc_html($freq); ?></span>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <!-- Conversion Panel -->
            <div class="glass-panel as-convert-panel">
                <h3 class="panel-label"><?php echo esc_html__('Export & Konvertierung', $text_domain); ?></h3>
                
                <div class="control-group">
                    <label><?php echo esc_html__('Zielformat', $text_domain); ?></label>
                    <div class="format-toggles">
                        <button class="fmt-btn active" data-fmt="mp3"><?php echo esc_html__('MP3 (LameJS)', $text_domain); ?></button>
                        <button class="fmt-btn" data-fmt="wav"><?php echo esc_html__('WAV (Lossless)', $text_domain); ?></button>
                    </div>
                </div>

                <div class="control-group" id="<?php echo esc_attr('mp3-quality-group'); ?>">
                    <div class="control-label-row">
                        <label><?php echo esc_html__('MP3 Bitrate (Qualität)', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('lbl-bitrate'); ?>" class="val-badge">192 kbps</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('as-bitrate'); ?>" class="vgt-slider" min="64" max="320" value="192" step="64">
                    <div class="range-marks">
                        <span>64 (Low)</span>
                        <span>128</span>
                        <span>192</span>
                        <span>256</span>
                        <span>320 (Pro)</span>
                    </div>
                </div>

                <div class="encoding-progress hidden" id="<?php echo esc_attr('as-encode-progress'); ?>">
                    <div class="progress-bar">
                        <div class="progress-fill" id="<?php echo esc_attr('encode-fill'); ?>"></div>
                    </div>
                    <span class="progress-text" id="<?php echo esc_attr('encode-text'); ?>"><?php echo esc_html__('Kodiere: 0%', $text_domain); ?></span>
                </div>

                <button id="<?php echo esc_attr('as-btn-export'); ?>" class="btn-prime pink-glow mt-auto">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <?php echo esc_html__('Audiospur Rendern', $text_domain); ?>
                </button>
            </div>

        </div>
    </div>
</div>