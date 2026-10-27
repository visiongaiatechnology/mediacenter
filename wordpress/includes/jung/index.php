<?php
/**
 * VGT MEDIACENTER - ARCHETYPE MATRIX (JUNG ANALYTICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Psychometric UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Zero Dependencies - 100% Native VGT Logic im Frontend.
 * Berechnet psychologische Vektoren direkt im Browser-RAM.
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-jung'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper jg-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="12 2 22 17 2 17 12 2"></polygon>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Archetype Matrix', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Entschlüssele deine Rolle im kollektiven Unbewussten. Eine Vektor-Analyse der 12 Jung\'schen Ur-Muster basierend auf deinen psychologischen Antriebskräften.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body jg-layout">
        
        <!-- Left: Dualitäts-Scanner (Kalibrierungs-Matrix) -->
        <div class="glass-panel jg-scanner-panel">
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Neuronale Dualitäts-Fader', $text_domain); ?></span>
                <span class="status-badge" id="<?php echo esc_attr('jg-sync-status'); ?>">
                    <?php echo esc_html__('Sync: 0%', $text_domain); ?>
                </span>
            </div>
            
            <p class="scanner-desc">
                <?php echo esc_html__('Verschiebe die Fader, um deine inneren Antriebe zu kalibrieren. Die Matrix berechnet deine Signatur in Echtzeit.', $text_domain); ?>
            </p>

            <div class="fader-group mt-4">
                <div class="fader-labels">
                    <span class="label-left"><?php echo esc_html__('Struktur & Kontrolle', $text_domain); ?></span>
                    <span class="label-right"><?php echo esc_html__('Freiheit & Chaos', $text_domain); ?></span>
                </div>
                <input type="range" class="vgt-fader" id="<?php echo esc_attr('axis-order'); ?>" min="0" max="100" value="50">
            </div>

            <div class="fader-group">
                <div class="fader-labels">
                    <span class="label-left"><?php echo esc_html__('Ego & Macht', $text_domain); ?></span>
                    <span class="label-right"><?php echo esc_html__('Empathie & Zugehörigkeit', $text_domain); ?></span>
                </div>
                <input type="range" class="vgt-fader" id="<?php echo esc_attr('axis-ego'); ?>" min="0" max="100" value="50">
            </div>

            <div class="fader-group">
                <div class="fader-labels">
                    <span class="label-left"><?php echo esc_html__('Logik & Realismus', $text_domain); ?></span>
                    <span class="label-right"><?php echo esc_html__('Vision & Mystik', $text_domain); ?></span>
                </div>
                <input type="range" class="vgt-fader" id="<?php echo esc_attr('axis-logic'); ?>" min="0" max="100" value="50">
            </div>

            <div class="fader-group">
                <div class="fader-labels">
                    <span class="label-left"><?php echo esc_html__('Bewahrung & Schutz', $text_domain); ?></span>
                    <span class="label-right"><?php echo esc_html__('Risiko & Transformation', $text_domain); ?></span>
                </div>
                <input type="range" class="vgt-fader" id="<?php echo esc_attr('axis-risk'); ?>" min="0" max="100" value="50">
            </div>

            <div class="scanner-action">
                <button id="<?php echo esc_attr('btn-lock-archetype'); ?>" class="btn-prime gold-glow">
                    <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <?php echo esc_html__('Signatur Verriegeln', $text_domain); ?>
                </button>
            </div>
        </div>

        <!-- Right: Archetype Matrix / Result Rendering -->
        <div class="glass-panel jg-matrix-panel">
            
            <!-- Result Card: Dominante Signatur (Hidden until calibrated) -->
            <div id="<?php echo esc_attr('jg-result-card'); ?>" class="archetype-card hidden">
                <div class="card-glow"></div>
                <div class="ac-header">
                    <span class="ac-subtitle"><?php echo esc_html__('Dominanter Archetyp', $text_domain); ?></span>
                    <h2 class="ac-title" id="<?php echo esc_attr('ac-name'); ?>"><?php echo esc_html__('Der Magier', $text_domain); ?></h2>
                    <span class="ac-motto" id="<?php echo esc_attr('ac-motto'); ?>">
                        <?php echo esc_html__('"Ich mache Visionen zur Realität."', $text_domain); ?>
                    </span>
                </div>
                
                <div class="ac-body">
                    <div class="ac-data-row">
                        <span class="ac-key"><?php echo esc_html__('Kernwunsch:', $text_domain); ?></span>
                        <span class="ac-val" id="<?php echo esc_attr('ac-desire'); ?>"><?php echo esc_html__('Die fundamentalen Gesetze des Universums verstehen.', $text_domain); ?></span>
                    </div>
                    <div class="ac-data-row">
                        <span class="ac-key"><?php echo esc_html__('Größte Angst:', $text_domain); ?></span>
                        <span class="ac-val" id="<?php echo esc_attr('ac-fear'); ?>"><?php echo esc_html__('Unbeabsichtigte negative Konsequenzen.', $text_domain); ?></span>
                    </div>
                    <div class="ac-data-row">
                        <span class="ac-key"><?php echo esc_html__('Lebensstrategie:', $text_domain); ?></span>
                        <span class="ac-val" id="<?php echo esc_attr('ac-strategy'); ?>"><?php echo esc_html__('Eine Vision entwickeln und danach leben.', $text_domain); ?></span>
                    </div>
                    
                    <div class="ac-divider"></div>
                    
                    <div class="ac-data-row highlight-row">
                        <span class="ac-key"><?php echo esc_html__('Primäre Stärken:', $text_domain); ?></span>
                        <span class="ac-val" id="<?php echo esc_attr('ac-strengths'); ?>"><?php echo esc_html__('Transformation, Charisma, Heilung.', $text_domain); ?></span>
                    </div>
                    <div class="ac-data-row warning-row">
                        <span class="ac-key"><?php echo esc_html__('Der Schatten (Schwächen):', $text_domain); ?></span>
                        <span class="ac-val" id="<?php echo esc_attr('ac-weaknesses'); ?>"><?php echo esc_html__('Manipulation, Realitätsverlust, Arroganz.', $text_domain); ?></span>
                    </div>

                    <!-- Secondary Archetype: Wing-Analysis -->
                    <div class="ac-secondary">
                        <span class="ac-subtitle"><?php echo esc_html__('Dein Flügel (Sekundärer Archetyp)', $text_domain); ?></span>
                        <div class="sec-wrap">
                            <div class="sec-info">
                                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                                <h4 id="<?php echo esc_attr('ac-sec-name'); ?>"><?php echo esc_html__('Der Schöpfer', $text_domain); ?></h4>
                            </div>
                            <span id="<?php echo esc_attr('ac-sec-match'); ?>">85.2% Match</span>
                        </div>
                        <p class="sec-desc">
                            <?php echo esc_html__('Dein dominanter Typ wird stark von diesem Verhaltensmuster eingefärbt und gelenkt.', $text_domain); ?>
                        </p>
                    </div>

                </div>

                <div class="ac-footer">
                    <button id="<?php echo esc_attr('btn-unlock'); ?>" class="btn-action-small">
                        <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                        <?php echo esc_html__('Neural rekalibrieren', $text_domain); ?>
                    </button>
                </div>
            </div>

            <!-- The 12 Archetypes Grid: Mounting-Point für die interaktive Matrix -->
            <div id="<?php echo esc_attr('jg-grid-view'); ?>" class="archetype-grid">
                <!-- Dynamische Injektion via kognitiver JavaScript-Engine -->
            </div>

        </div>

    </div>
</div>