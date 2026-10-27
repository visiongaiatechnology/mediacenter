<?php
/**
 * VGT NEURAL PROFILER (BIG FIVE & MBTI ANALYTICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: Chart.js (Wird über Core bereitgestellt)
 */
wp_enqueue_script('vgt-chart');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-big5'); ?>">
    
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
            <div class="hero-icon-wrapper bp-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6M10 12c0-1.1.9-2 2-2s2 .9 2 2"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Neural Profiler', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Tiefenpsychologische Analyse basierend auf dem OCEAN-Modell. Erfasse deine kognitiven Präferenzen und extrahiere deine digitale Persönlichkeitssignatur.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body bp-layout">
        
        <!-- ==================== STATE 1: INTRO ==================== -->
        <div class="glass-panel state-view active" id="<?php echo esc_attr('state-intro'); ?>">
            <div class="intro-visual">
                <div class="brain-pulse-ring"></div>
                <svg viewBox="0 0 24 24" class="brain-icon">
                    <path d="M9.5 2h5M12 2v20M17.5 4.5a4.5 4.5 0 0 1 1 8.89V14a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5v-.61a4.5 4.5 0 0 1 1-8.89"></path>
                </svg>
            </div>
            <h3 class="intro-title"><?php echo esc_html__('Kognitive Matrix-Initialisierung', $text_domain); ?></h3>
            <p class="intro-text">
                <?php echo esc_html__('Dieser Test extrahiert 20 präzise Verhaltensmuster. Antworte intuitiv und ehrlich. Es gibt kein "Richtig" oder "Falsch", nur architektonische Unterschiede in deiner neuronalen Verschaltung.', $text_domain); ?>
            </p>
            <div class="intro-meta">
                <span>
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 
                    <?php echo esc_html__('Dauer: ~2 Minuten', $text_domain); ?>
                </span>
                <span>
                    <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg> 
                    <?php echo esc_html__('100% Lokale Berechnung', $text_domain); ?>
                </span>
            </div>
            <button id="<?php echo esc_attr('btn-start-quiz'); ?>" class="btn-prime purple-glow">
                <svg viewBox="0 0 24 24" class="svg-icon">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <?php echo esc_html__('Analyse Starten', $text_domain); ?>
            </button>
        </div>

        <!-- ==================== STATE 2: QUIZ ==================== -->
        <div class="state-view hidden" id="<?php echo esc_attr('state-quiz'); ?>">
            <div class="quiz-header">
                <div class="quiz-progress-wrap">
                    <div class="progress-info">
                        <span id="<?php echo esc_attr('quiz-current-step'); ?>"><?php echo esc_html__('Fragment 1 / 20', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('quiz-percent'); ?>" class="highlight-purple">0%</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div id="<?php echo esc_attr('quiz-progress-fill'); ?>" class="progress-fill purple-fill" style="width: 0%;"></div>
                    </div>
                </div>
            </div>

            <div class="question-container glass-panel" id="<?php echo esc_attr('question-card'); ?>">
                <div class="question-content" id="<?php echo esc_attr('question-content'); ?>">
                    <h2 class="question-text" id="<?php echo esc_attr('active-question-text'); ?>">
                        <?php echo esc_html__('Initialisiere Datenstrom...', $text_domain); ?>
                    </h2>
                </div>
                
                <div class="response-matrix">
                    <span class="matrix-label reject"><?php echo esc_html__('Trifft nicht zu', $text_domain); ?></span>
                    <div class="neural-nodes-group" id="<?php echo esc_attr('neural-nodes'); ?>">
                        <!-- Die Verbindungslinie zwischen den Nodes -->
                        <div class="node-connector"></div>
                        <button class="neural-node node-xl" data-val="1" title="<?php echo esc_attr__('Starke Ablehnung', $text_domain); ?>"></button>
                        <button class="neural-node node-md" data-val="2" title="<?php echo esc_attr__('Ablehnung', $text_domain); ?>"></button>
                        <button class="neural-node node-sm neutral" data-val="3" title="<?php echo esc_attr__('Neutral', $text_domain); ?>"></button>
                        <button class="neural-node node-md" data-val="4" title="<?php echo esc_attr__('Zustimmung', $text_domain); ?>"></button>
                        <button class="neural-node node-xl" data-val="5" title="<?php echo esc_attr__('Starke Zustimmung', $text_domain); ?>"></button>
                    </div>
                    <span class="matrix-label accept"><?php echo esc_html__('Trifft voll zu', $text_domain); ?></span>
                </div>
            </div>
        </div>

        <!-- ==================== STATE 3: PROCESSING ==================== -->
        <div class="glass-panel state-view hidden" id="<?php echo esc_attr('state-processing'); ?>">
            <div class="processing-core">
                <div class="radar-spinner"></div>
                <h3 class="processing-title"><?php echo esc_html__('Kompiliere Psychometrisches Profil', $text_domain); ?></h3>
                <p class="processing-log" id="<?php echo esc_attr('proc-log'); ?>">
                    <?php echo esc_html__('Extrahiere Big-Five Parameter...', $text_domain); ?>
                </p>
                <div class="matrix-code-block" id="<?php echo esc_attr('matrix-code'); ?>">01001000 01100101 01101100</div>
            </div>
        </div>

        <!-- ==================== STATE 4: RESULTS ==================== -->
        <div class="state-view hidden" id="<?php echo esc_attr('state-result'); ?>">
            
            <div class="result-hero glass-panel">
                <div class="type-badge-wrap">
                    <div class="type-badge-glow"></div>
                    <h1 class="mbti-type" id="<?php echo esc_attr('mbti-type'); ?>">----</h1>
                </div>
                <div class="type-archetype" id="<?php echo esc_attr('mbti-archetype'); ?>">
                    <?php echo esc_html__('Analysiere...', $text_domain); ?>
                </div>
            </div>

            <div class="result-grid">
                <!-- Chart Panel -->
                <div class="glass-panel chart-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Neuronale Architektur (OCEAN)', $text_domain); ?></span>
                    </div>
                    <div class="canvas-container">
                        <canvas id="<?php echo esc_attr('personality-chart'); ?>"></canvas>
                    </div>
                </div>

                <!-- Analysis Details -->
                <div class="glass-panel detail-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Kognitive Parameter', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-restart-quiz'); ?>" class="btn-action-small">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                            <?php echo esc_html__('Reset', $text_domain); ?>
                        </button>
                    </div>
                    
                    <div class="ocean-list" id="<?php echo esc_attr('ocean-breakdown'); ?>">
                        <!-- Dynamische Injektion via JavaScript -->
                    </div>

                    <div class="result-actions">
                        <p class="privacy-note">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            <?php echo esc_html__('Zero-Trust: Die Matrix ist volatil. Daten existieren nur lokal in deinem RAM.', $text_domain); ?>
                        </p>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
</div>