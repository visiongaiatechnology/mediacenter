<?php
/**
 * VGT MEDIACENTER - PACKET-VIZ (NETWORK FORENSICS)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & D3-Graph Integrity
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: D3.js (v7) 
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht hochperformante Force-Graph-Layouts direkt im Browser-RAM.
 */
wp_enqueue_script('vgt-d3');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-packetviz'); ?>">
    
    <!-- Hero Header: Navigation und forensische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper pv-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="3" y1="12" x2="9" y2="12"></line>
                    <line x1="15" y1="12" x2="21" y2="12"></line>
                    <line x1="12" y1="3" x2="12" y2="9"></line>
                    <line x1="12" y1="15" x2="12" y2="21"></line>
                    <circle cx="21" cy="12" r="1.5"></circle>
                    <circle cx="3" cy="12" r="1.5"></circle>
                    <circle cx="12" cy="21" r="1.5"></circle>
                    <circle cx="12" cy="3" r="1.5"></circle>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Packet-Viz', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Netzwerk-Forensik & Traffic-Analyse. Dekodiert .pcap und .pcapng Dumps lokal im RAM und visualisiert Kommunikations-Knoten, IPs und Payloads über ein interaktives D3.js Force-Graph Array.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body pv-layout">
        
        <!-- View 1: Ingestion Zone (Dropzone) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('pv-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow cyan"></div>
                <svg viewBox="0 0 24 24" class="drop-icon">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <h3 class="drop-title"><?php echo esc_html__('Traffic-Dump (PCAP) injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Ziehe eine .pcap oder .pcapng Datei in den Scanner', $text_domain); ?></p>
                <div class="drop-badge"><?php echo esc_html__('Heuristic Binary Parsing', $text_domain); ?></div>
            </div>
            <input type="file" 
                   id="<?php echo esc_attr('pv-file-input'); ?>" 
                   class="hidden-input" 
                   accept=".pcap, .pcapng, .eth, application/vnd.tcpdump.pcap" />
        </div>

        <!-- View 2: D3 Visualization Workspace (Hidden until load) -->
        <div id="<?php echo esc_attr('pv-workspace'); ?>" class="pv-workspace hidden">
            
            <!-- Global Stats Bar: Echtzeit-Telemetrie -->
            <div class="pv-stats-bar glass-panel">
                <div class="stat-box">
                    <span class="stat-lbl"><?php echo esc_html__('Datei', $text_domain); ?></span>
                    <span class="stat-val highlight-cyan" id="<?php echo esc_attr('stat-filename'); ?>">dump.pcap</span>
                </div>
                <div class="stat-box">
                    <span class="stat-lbl"><?php echo esc_html__('Entdeckte Knoten (Nodes)', $text_domain); ?></span>
                    <span class="stat-val" id="<?php echo esc_attr('stat-nodes'); ?>">0</span>
                </div>
                <div class="stat-box">
                    <span class="stat-lbl"><?php echo esc_html__('Flows (Links)', $text_domain); ?></span>
                    <span class="stat-val" id="<?php echo esc_attr('stat-links'); ?>">0</span>
                </div>
                <div class="stat-box action-box">
                    <button id="<?php echo esc_attr('btn-pv-reset'); ?>" class="btn-action-small danger outline">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        <?php echo esc_html__('FLUSH', $text_domain); ?>
                    </button>
                </div>
            </div>

            <!-- Visualization Grid -->
            <div class="pv-grid">
                
                <!-- Main D3 Force Graph Canvas -->
                <div class="glass-panel pv-chart-panel checkerboard">
                    
                    <div id="<?php echo esc_attr('pv-loader'); ?>" class="pv-loader hidden">
                        <div class="spinner"></div>
                        <span id="<?php echo esc_attr('pv-loader-text'); ?>"><?php echo esc_html__('Analysiere Binärstrom...', $text_domain); ?></span>
                    </div>

                    <!-- Mounting Point für den D3 SVG Graphen -->
                    <div id="<?php echo esc_attr('d3-container'); ?>" class="d3-wrapper">
                        <!-- SVG wird via JS injiziert -->
                    </div>
                    
                    <!-- Graph Simulation Controls -->
                    <div class="graph-controls">
                        <span class="gc-label"><?php echo esc_html__('Graph Physics:', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-physics-pause'); ?>" class="btn-action-small"><?php echo esc_html__('Pause', $text_domain); ?></button>
                        <button id="<?php echo esc_attr('btn-physics-resume'); ?>" class="btn-action-small active"><?php echo esc_html__('Play', $text_domain); ?></button>
                    </div>
                </div>

                <!-- Threat Matrix & Forensic Node Inspector (Sidebar) -->
                <div class="glass-panel pv-data-panel">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('Forensic Node Inspector', $text_domain); ?></span>
                    </div>
                    
                    <div id="<?php echo esc_attr('node-inspector-empty'); ?>" class="node-empty-state">
                        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <p><?php echo esc_html__('Klicke auf einen Knoten im Graphen, um Details zum Traffic-Flow anzuzeigen.', $text_domain); ?></p>
                    </div>

                    <div id="<?php echo esc_attr('node-inspector-active'); ?>" class="node-active-state hidden">
                        <div class="na-header">
                            <span class="na-type" id="<?php echo esc_attr('ni-type'); ?>">IPv4 Node</span>
                            <span class="na-title" id="<?php echo esc_attr('ni-name'); ?>">192.168.1.1</span>
                        </div>
                        
                        <div class="na-body">
                            <div class="na-row">
                                <span class="na-key"><?php echo esc_html__('Verbindungen (Weight):', $text_domain); ?></span>
                                <span class="na-val" id="<?php echo esc_attr('ni-weight'); ?>">0</span>
                            </div>
                            <div class="na-row">
                                <span class="na-key"><?php echo esc_html__('Traffic Anteil:', $text_domain); ?></span>
                                <span class="na-val" id="<?php echo esc_attr('ni-percent'); ?>">0%</span>
                            </div>
                        </div>
                        
                        <div class="na-connections mt-4">
                            <div class="flow-group">
                                <span class="na-subtitle" style="color: rgba(34, 211, 238, 1)"><?php echo esc_html__('Eingehend (Inbound):', $text_domain); ?></span>
                                <div class="na-targets custom-scrollbar" id="<?php echo esc_attr('ni-inbound'); ?>">
                                    <!-- Inbound Entitäten Tags -->
                                </div>
                            </div>
                            <div class="flow-group mt-3">
                                <span class="na-subtitle" style="color: rgba(244, 114, 182, 1)"><?php echo esc_html__('Ausgehend (Outbound):', $text_domain); ?></span>
                                <div class="na-targets custom-scrollbar" id="<?php echo esc_attr('ni-outbound'); ?>">
                                    <!-- Outbound Entitäten Tags -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Ranking Matrix: Volumen-Analyse -->
                    <div class="panel-header" style="margin-top: 2rem;">
                        <span class="panel-label"><?php echo esc_html__('Top Entities (Volumen)', $text_domain); ?></span>
                    </div>
                    <div class="top-nodes-list custom-scrollbar" id="<?php echo esc_attr('top-nodes-list'); ?>">
                        <!-- Auto-filled via Analytics Engine -->
                    </div>

                </div>

            </div>

            <!-- Forensic Report: Aggregated Node List & CSV Vector Export -->
            <div class="glass-panel pv-export-panel mt-4">
                <div class="panel-header" style="margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: none;">
                    <span class="panel-label"><?php echo esc_html__('Komplette Knotenpunkt-Matrix (Alle gefundenen Entitäten)', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('btn-pv-export'); ?>" class="btn-action-small highlight-cyan">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <?php echo esc_html__('Als CSV Exportieren', $text_domain); ?>
                    </button>
                </div>
                <div class="pv-table-wrapper custom-scrollbar">
                    <table class="vgt-data-table">
                        <thead id="<?php echo esc_attr('pv-table-head'); ?>">
                            <tr>
                                <th><?php echo esc_html__('Entität (IP / Domain / String)', $text_domain); ?></th>
                                <th><?php echo esc_html__('Typisierung', $text_domain); ?></th>
                                <th><?php echo esc_html__('Traffic-Gewichtung (Vorkommen)', $text_domain); ?></th>
                            </tr>
                        </thead>
                        <tbody id="<?php echo esc_attr('pv-node-table-body'); ?>">
                            <tr>
                                <td class="empty-cell" colspan="100%">
                                    <?php echo esc_html__('Warte auf Scan-Ergebnisse...', $text_domain); ?>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    </div>
</div>