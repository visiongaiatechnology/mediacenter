<?php
/**
 * VGT MEDIACENTER - HAR-REACTOR (NETWORK LOG ANALYZER)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Forensic UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: ApexCharts (Wird vom VGT Core via SRI bereitgestellt)
 */
wp_enqueue_script('vgt-apexcharts');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-har'); ?>">
    
    <!-- Hero Header: Navigation und forensische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper har-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                    <line x1="6" y1="6" x2="6.01" y2="6"></line>
                    <line x1="6" y1="18" x2="6.01" y2="18"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT HAR-Reactor', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Deep-Packet Network Analysis. Analysiere .har (HTTP Archive) Traffic-Logs lokal im RAM. Enttarne Tracker, analysiere Payloads und identifiziere Data-Leaks (Cookies/Tokens).', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body har-layout">
        
        <!-- Dropzone View: Daten-Injektion -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('har-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow cyan"></div>
                <svg viewBox="0 0 24 24" class="drop-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <h3 class="drop-title"><?php echo esc_html__('Traffic-Log (.har) injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle">
                    <?php echo esc_html__('Exportiere Netzwerk-Daten aus den DevTools (F12) und ziehe sie hierher', $text_domain); ?>
                </p>
                <div class="drop-badge"><?php echo esc_html__('Lokal & DSGVO-Konform', $text_domain); ?></div>
            </div>
            <input type="file" id="<?php echo esc_attr('har-file-input'); ?>" class="hidden-input" accept=".har,application/json" />
        </div>

        <!-- Dashboard View: Forensische Analyse-Matrix (Hidden until load) -->
        <div id="<?php echo esc_attr('har-workspace'); ?>" class="har-workspace hidden">
            
            <!-- Global Stats Bar: Echtzeit-Telemetrie -->
            <div class="har-stats-bar">
                <div class="glass-panel stat-box">
                    <div class="stat-icon"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg></div>
                    <div class="stat-data">
                        <span class="stat-lbl"><?php echo esc_html__('Gesamt-Requests', $text_domain); ?></span>
                        <span class="stat-val" id="<?php echo esc_attr('stat-reqs'); ?>">0</span>
                    </div>
                </div>
                <div class="glass-panel stat-box">
                    <div class="stat-icon"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="6" rx="2" ry="2"></rect><rect x="4" y="14" width="16" height="6" rx="2" ry="2"></rect></svg></div>
                    <div class="stat-data">
                        <span class="stat-lbl"><?php echo esc_html__('Total Payload Size', $text_domain); ?></span>
                        <span class="stat-val highlight-cyan" id="<?php echo esc_attr('stat-size'); ?>">0 MB</span>
                    </div>
                </div>
                <div class="glass-panel stat-box">
                    <div class="stat-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
                    <div class="stat-data">
                        <span class="stat-lbl"><?php echo esc_html__('Ladezeit (Kumuliert)', $text_domain); ?></span>
                        <span class="stat-val" id="<?php echo esc_attr('stat-time'); ?>">0 ms</span>
                    </div>
                </div>
                <div class="glass-panel stat-box danger">
                    <div class="stat-icon"><svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
                    <div class="stat-data">
                        <span class="stat-lbl"><?php echo esc_html__('Threats & Leaks', $text_domain); ?></span>
                        <span class="stat-val highlight-pink" id="<?php echo esc_attr('stat-threats'); ?>">0</span>
                    </div>
                </div>
                <div class="glass-panel stat-box action-box">
                    <button id="<?php echo esc_attr('btn-har-reset'); ?>" class="btn-action-small" title="<?php echo esc_attr__('Daten verwerfen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        <?php echo esc_html__('Flush', $text_domain); ?>
                    </button>
                </div>
            </div>

            <div class="har-grid">
                
                <!-- Chart: Domain Distribution -->
                <div class="glass-panel chart-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Traffic Routing (Domains)', $text_domain); ?></span>
                    </div>
                    <div class="chart-wrapper">
                        <div id="<?php echo esc_attr('chart-domains'); ?>"></div>
                    </div>
                </div>

                <!-- Chart: Content Types -->
                <div class="glass-panel chart-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Payload Typen (MIME)', $text_domain); ?></span>
                    </div>
                    <div class="chart-wrapper">
                        <div id="<?php echo esc_attr('chart-types'); ?>"></div>
                    </div>
                </div>

                <!-- Threat Matrix: Leaked Tokens & Cookies -->
                <div class="glass-panel threat-panel">
                    <div class="panel-header">
                        <span class="panel-label" style="color: rgba(var(--c-pink), 1);">
                            <?php echo esc_html__('Threat Matrix (Data Leaks)', $text_domain); ?>
                        </span>
                        <span class="status-badge" id="<?php echo esc_attr('threat-badge'); ?>">
                            <?php echo esc_html__('Scanning...', $text_domain); ?>
                        </span>
                    </div>
                    
                    <div class="threat-list custom-scrollbar" id="<?php echo esc_attr('threat-list'); ?>">
                        <!-- Dynamische Injektion der Leak-Karten via JavaScript Engine -->
                    </div>
                </div>

            </div>

        </div>

    </div>
</div>