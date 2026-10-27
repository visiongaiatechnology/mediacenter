<?php
/**
 * VGT MEDIACENTER - FORENSIC HEX-MAP
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Forensic Data-Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Zero Dependencies - 100% Native ArrayBuffer & DataView API im Frontend.
 * Nutzt die kognitive Sandbox-Engine zur Analyse von Binärdaten.
 */

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-hexmap'); ?>">
    
    <!-- Hero Header: Navigation und forensische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper hm-glow">
                <svg viewBox="0 0 24 24" class="hero-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Forensic Hex-Map', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Deep File Inspector. Analysiert rohe Binärdaten im sicheren Sandbox-Modus. Detektiert versteckte Malware, Anomalien in Datei-Headern (Magic Numbers) und extrahiert ASCII-Strings.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body hm-layout">
        
        <!-- View 1: Dropzone (Initialer Daten-Einstieg) -->
        <div class="glass-panel drop-zone" id="<?php echo esc_attr('hm-dropzone'); ?>">
            <div class="drop-content">
                <div class="drop-icon-glow cyan"></div>
                <svg viewBox="0 0 24 24" class="drop-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                <h3 class="drop-title"><?php echo esc_html__('Datei zur Obduktion injizieren', $text_domain); ?></h3>
                <p class="drop-subtitle"><?php echo esc_html__('Alle Formate unterstützt (EXE, DLL, JPG, PDF...). Execution-Sandbox aktiv.', $text_domain); ?></p>
            </div>
            <input type="file" id="<?php echo esc_attr('hm-file-input'); ?>" class="hidden-input" />
        </div>

        <!-- View 2: Analysis Workspace (Hidden until Ingestion) -->
        <div id="<?php echo esc_attr('hm-workspace'); ?>" class="hm-workspace hidden">
            
            <!-- Context & Action Bar: Datei-Metadaten -->
            <div class="glass-panel hm-context-bar">
                <div class="hm-file-info">
                    <svg viewBox="0 0 24 24" class="svg-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                    <div class="fi-text">
                        <span id="<?php echo esc_attr('hm-filename'); ?>" class="fi-name"><?php echo esc_html__('unknown.exe', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('hm-filesize'); ?>" class="fi-size">0 Bytes</span>
                    </div>
                </div>
                <div class="hm-actions">
                    <button id="<?php echo esc_attr('btn-hm-reset'); ?>" class="btn-action-small danger outline">
                        <svg viewBox="0 0 24 24" class="svg-icon"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        <?php echo esc_html__('FLUSH', $text_domain); ?>
                    </button>
                </div>
            </div>

            <!-- Analytics Dashboard: Heuristische Befunde -->
            <div class="hm-analytics-grid">
                
                <!-- Magic Number Scanner: Header-Validierung -->
                <div class="glass-panel analytics-card" id="<?php echo esc_attr('card-magic'); ?>">
                    <div class="card-header">
                        <span class="card-label"><?php echo esc_html__('Signatur (Magic Bytes)', $text_domain); ?></span>
                        <span id="<?php echo esc_attr('badge-magic'); ?>" class="status-badge"><?php echo esc_html__('Scanning...', $text_domain); ?></span>
                    </div>
                    <div class="card-body">
                        <div class="data-row">
                            <span class="data-key"><?php echo esc_html__('Header Hex:', $text_domain); ?></span>
                            <span id="<?php echo esc_attr('val-magic-hex'); ?>" class="data-val terminal-text">-- -- -- --</span>
                        </div>
                        <div class="data-row">
                            <span class="data-key"><?php echo esc_html__('Detektierter Typ:', $text_domain); ?></span>
                            <span id="<?php echo esc_attr('val-magic-type'); ?>" class="data-val terminal-text"><?php echo esc_html__('Unknown', $text_domain); ?></span>
                        </div>
                        <div class="data-row">
                            <span class="data-key"><?php echo esc_html__('Angegebene Endung:', $text_domain); ?></span>
                            <span id="<?php echo esc_attr('val-magic-ext'); ?>" class="data-val terminal-text"><?php echo esc_html__('Unknown', $text_domain); ?></span>
                        </div>
                    </div>
                    <div class="card-footer" id="<?php echo esc_attr('magic-verdict'); ?>">
                        <?php echo esc_html__('Berechne Datei-Integrität...', $text_domain); ?>
                    </div>
                </div>

                <!-- Shannon Entropy: Verschlüsselungs-Analyse -->
                <div class="glass-panel analytics-card">
                    <div class="card-header">
                        <span class="card-label"><?php echo esc_html__('Chunk Entropie (Shannon)', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-hm-strings'); ?>" class="btn-action-small highlight-cyan">
                            <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                            <?php echo esc_html__('Strings', $text_domain); ?>
                        </button>
                    </div>
                    <div class="card-body entropy-body">
                        <div class="entropy-score-wrap">
                            <span id="<?php echo esc_attr('val-entropy'); ?>" class="entropy-val">0.00</span>
                            <span class="entropy-max">/ 8.00</span>
                        </div>
                        <div class="entropy-meter">
                            <div class="em-fill" id="<?php echo esc_attr('entropy-fill'); ?>"></div>
                        </div>
                        <p class="entropy-desc" id="<?php echo esc_attr('entropy-desc'); ?>">
                            <?php echo esc_html__('Analysiere Kompression/Verschlüsselung...', $text_domain); ?>
                        </p>
                    </div>
                </div>

            </div>

            <!-- The Hex Grid Matrix: Rohe Datenansicht -->
            <div class="glass-panel hm-hex-panel">
                <div class="hex-panel-header">
                    <span class="panel-label"><?php echo esc_html__('Binäre Daten-Matrix (Chunked)', $text_domain); ?></span>
                    <div class="hex-pagination">
                        <button id="<?php echo esc_attr('btn-hex-prev'); ?>" class="btn-nav" disabled><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                        <span class="page-indicator"><?php echo esc_html__('Offset', $text_domain); ?> <span id="<?php echo esc_attr('lbl-offset'); ?>">0x00000000</span></span>
                        <button id="<?php echo esc_attr('btn-hex-next'); ?>" class="btn-nav"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </div>
                </div>

                <div class="hex-table-container custom-scrollbar">
                    <table class="hex-table">
                        <thead>
                            <tr>
                                <th class="col-offset"><?php echo esc_html__('OFFSET', $text_domain); ?></th>
                                <th class="col-hex">00 01 02 03 04 05 06 07 08 09 0A 0B 0C 0D 0E 0F</th>
                                <th class="col-ascii"><?php echo esc_html__('ASCII DECODE', $text_domain); ?></th>
                            </tr>
                        </thead>
                        <tbody id="<?php echo esc_attr('hex-tbody'); ?>">
                            <!-- Dynamische Injektion der Hex-Zeilen via kognitiver JS-Engine -->
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

        <!-- Hidden Modal for Strings Extractor (Deep Inspection Layer) -->
        <div id="<?php echo esc_attr('hm-modal-strings'); ?>" class="hm-modal hidden">
            <div class="hm-modal-content glass-panel">
                <div class="panel-header">
                    <span class="panel-label"><?php echo esc_html__('ASCII String Extractor (Current Chunk)', $text_domain); ?></span>
                    <button id="<?php echo esc_attr('btn-close-strings'); ?>" class="btn-action-small danger outline">
                        <?php echo esc_html__('Schließen', $text_domain); ?>
                    </button>
                </div>
                <div class="strings-container custom-scrollbar" id="<?php echo esc_attr('hm-strings-output'); ?>">
                    <!-- Extrahierte Strings werden hier sicher gerendert -->
                </div>
            </div>
        </div>

    </div>
</div>