<?php
/**
 * VGT MEDIACENTER - PASSWORD SENTINEL (ENTROPY ANALYTICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Quantum-Resilience UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Zero Dependencies - Nutzt die native Browser Crypto API & Math-Kernel.
 * Sämtliche Berechnungen finden volatil im Browser-RAM statt (Zero-Trust).
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-pwcheck'); ?>">
    
    <!-- Hero Header: Navigation und systemische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper pw-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Sentinel', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Kryptographische Entropie-Analyse. Prüfe die Resilienz deiner Passwörter gegen moderne GPU-Cluster und zukünftige Quantencomputer-Angriffe.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body pw-layout">
        
        <!-- Left: Input & Generator Panel -->
        <div class="glass-panel pw-input-panel">
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Eingabe & Generator', $text_domain); ?></span>
            </div>

            <!-- Password Input Terminal -->
            <div class="pw-main-input-wrap">
                <input type="text" 
                       id="<?php echo esc_attr('pw-input'); ?>" 
                       class="pw-terminal-input" 
                       placeholder="<?php echo esc_attr__('Passwort eingeben...', $text_domain); ?>" 
                       autocomplete="off">
                <button type="button" class="btn-icon-small" id="<?php echo esc_attr('btn-pw-copy'); ?>" title="<?php echo esc_attr__('In Zwischenablage kopieren', $text_domain); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </button>
            </div>

            <!-- Visual Strength Meter: Entropie-Visualisierung -->
            <div class="pw-strength-meter">
                <div class="meter-header">
                    <span class="meter-label"><?php echo esc_html__('Entropie-Klassifizierung', $text_domain); ?></span>
                    <span class="meter-status" id="<?php echo esc_attr('pw-status-text'); ?>">
                        <?php echo esc_html__('Kritisch', $text_domain); ?>
                    </span>
                </div>
                <div class="meter-track">
                    <div class="meter-fill" id="<?php echo esc_attr('pw-meter-fill'); ?>"></div>
                </div>
            </div>

            <!-- Generator Controls: Synthetische Passwort-Erzeugung -->
            <div class="pw-generator mt-4">
                <div class="panel-header" style="margin-bottom:1rem; border:none; padding:0;">
                    <span class="panel-label" style="color:var(--vg-text-muted)"><?php echo esc_html__('Secure Generator', $text_domain); ?></span>
                </div>

                <div class="gen-length">
                    <div class="length-header">
                        <label><?php echo esc_html__('Vektor-Länge', $text_domain); ?></label>
                        <span id="<?php echo esc_attr('gen-len-val'); ?>" class="len-badge">16</span>
                    </div>
                    <input type="range" id="<?php echo esc_attr('gen-length'); ?>" class="vgt-slider" min="8" max="128" value="16">
                </div>

                <div class="gen-toggles">
                    <label class="vgt-checkbox">
                        <input type="checkbox" id="<?php echo esc_attr('gen-uc'); ?>" checked>
                        <span class="cb-box"></span> A-Z
                    </label>
                    <label class="vgt-checkbox">
                        <input type="checkbox" id="<?php echo esc_attr('gen-lc'); ?>" checked>
                        <span class="cb-box"></span> a-z
                    </label>
                    <label class="vgt-checkbox">
                        <input type="checkbox" id="<?php echo esc_attr('gen-num'); ?>" checked>
                        <span class="cb-box"></span> 0-9
                    </label>
                    <label class="vgt-checkbox">
                        <input type="checkbox" id="<?php echo esc_attr('gen-sym'); ?>" checked>
                        <span class="cb-box"></span> !@#$
                    </label>
                </div>

                <button id="<?php echo esc_attr('btn-generate'); ?>" class="btn-prime green-glow mt-4">
                    <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1  20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    <?php echo esc_html__('Synthetisieren', $text_domain); ?>
                </button>
            </div>
        </div>

        <!-- Right: Telemetry & Quantum Analysis Output -->
        <div class="pw-analysis-layout">
            
            <!-- Global Entropy Stats: Numerische Telemetrie -->
            <div class="glass-panel pw-stats-panel">
                <div class="stat-box">
                    <span class="stat-lbl"><?php echo esc_html__('Entropie (Bits)', $text_domain); ?></span>
                    <span class="stat-val" id="<?php echo esc_attr('stat-entropy'); ?>">0</span>
                </div>
                <div class="stat-box">
                    <span class="stat-lbl"><?php echo esc_html__('Kombinationsraum', $text_domain); ?></span>
                    <span class="stat-val" id="<?php echo esc_attr('stat-space'); ?>">0</span>
                </div>
            </div>

            <!-- Threat Matrix: Brute-Force Analyse-Vektoren -->
            <div class="glass-panel pw-matrix-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('Brute-Force Angriffsvektoren (Zeit zum Knacken)', $text_domain); ?></span>
                </div>
                
                <div class="threat-table">
                    <div class="tt-header">
                        <div class="tt-col"><?php echo esc_html__('Krypto-Algorithmus', $text_domain); ?></div>
                        <div class="tt-col"><?php echo esc_html__('Klassisches Cluster (GPU)', $text_domain); ?></div>
                        <div class="tt-col quantum-col"><?php echo esc_html__('Quantencomputer (Grover)', $text_domain); ?></div>
                    </div>

                    <!-- Row: MD5 (Legacy Threat) -->
                    <div class="tt-row">
                        <div class="tt-col algo-name">
                            <span class="algo-badge danger-badge">MD5</span>
                            <span class="algo-sub"><?php echo esc_html__('Kein Salt (100 GH/s)', $text_domain); ?></span>
                        </div>
                        <div class="tt-col time-val" id="<?php echo esc_attr('time-md5-c'); ?>">--</div>
                        <div class="tt-col time-val q-val" id="<?php echo esc_attr('time-md5-q'); ?>">--</div>
                    </div>

                    <!-- Row: SHA-256 (Standard Threat) -->
                    <div class="tt-row">
                        <div class="tt-col algo-name">
                            <span class="algo-badge warn-badge">SHA-256</span>
                            <span class="algo-sub"><?php echo esc_html__('Standard (10 GH/s)', $text_domain); ?></span>
                        </div>
                        <div class="tt-col time-val" id="<?php echo esc_attr('time-sha-c'); ?>">--</div>
                        <div class="tt-col time-val q-val" id="<?php echo esc_attr('time-sha-q'); ?>">--</div>
                    </div>

                    <!-- Row: Bcrypt (Safe Horizon) -->
                    <div class="tt-row">
                        <div class="tt-col algo-name">
                            <span class="algo-badge safe-badge">Bcrypt</span>
                            <span class="algo-sub"><?php echo esc_html__('Cost 12 (10 kH/s)', $text_domain); ?></span>
                        </div>
                        <div class="tt-col time-val" id="<?php echo esc_attr('time-bcrypt-c'); ?>">--</div>
                        <div class="tt-col time-val q-val" id="<?php echo esc_attr('time-bcrypt-q'); ?>">--</div>
                    </div>

                </div>
            </div>

            <!-- Quantum Lore Box: Kognitiver Kontext (Grover's Algorithm) -->
            <div class="glass-panel quantum-lore-panel" id="<?php echo esc_attr('quantum-warning'); ?>">
                <div class="quantum-glow-bg"></div>
                <div class="lore-content">
                    <div class="lore-header">
                        <svg viewBox="0 0 24 24" class="q-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .11 1.89l1.8 2.6a2 2 0 0 1-3.24 2.14L15.3 19a1.65 1.65 0 0 0-1.92.1l-2.6 1.8a2 2 0 0 1-2.14-3.24l1.8-2.6a1.65 1.65 0 0 0 .1-1.92L8.6 10.6a2 2 0 0 1 3.24-2.14l2.77 1.93a1.65 1.65 0 0 0 1.89.11l2.6-1.8a2 2 0 0 1 2.14 3.24l-1.8 2.6z"></path></svg>
                        <h4><?php echo esc_html__('Der Quanten-Kollaps (Grover-Algorithmus)', $text_domain); ?></h4>
                    </div>
                    <p>
                        <?php echo sprintf(
                            esc_html__('Normale Computer müssen Milliarden Kombinationen nacheinander testen. Ein Quantencomputer nutzt den %s, um den Suchraum quadratisch zu reduzieren (aus %s wird %s). Das halbiert die effektive Bit-Stärke deines Passworts. Ein Passwort, das klassisch 1.000 Jahre standhält, fällt quantenmechanisch oft in Sekunden.', $text_domain),
                            '<strong>' . esc_html__('Grover-Algorithmus', $text_domain) . '</strong>',
                            '$N$',
                            '$\sqrt{N}$'
                        ); ?>
                    </p>
                </div>
            </div>

        </div>

    </div>
</div>