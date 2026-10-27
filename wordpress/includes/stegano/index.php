<?php
/**
 * VGT MEDIACENTER - STEGANO-VAULT (VISUAL STEGANOGRAPHY)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Cryptographic UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: CryptoJS
 * Wird über den VGT Core via SRI bereitgestellt.
 * Ermöglicht 100% clientseitige AES-256 Verschlüsselung vor der LSB-Einbettung.
 */
wp_enqueue_script('vgt-crypto');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-stegano'); ?>">
    
    <!-- Hero Header: Navigation und funktionale Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper sg-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Stegano-Vault', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Visuelle Phantom-Kommunikation. Verstecke AES-256 verschlüsselte Nachrichten in den tiefsten Bit-Ebenen (LSB) unscheinbarer Bilder. 100% Offline-Sicherheit.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body sg-layout">
        
        <!-- Mode Tabs: Kognitive Modus-Umschaltung -->
        <div class="cipher-mode-tabs">
            <button class="mode-tab active" data-mode="<?php echo esc_attr('encode'); ?>">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
                <div class="mt-text">
                    <span class="mt-title"><?php echo esc_html__('Versiegeln (Encode)', $text_domain); ?></span>
                    <span class="mt-sub"><?php echo esc_html__('Nachricht in Bild verstecken', $text_domain); ?></span>
                </div>
            </button>
            <button class="mode-tab" data-mode="<?php echo esc_attr('decode'); ?>">
                <svg viewBox="0 0 24 24"><path d="M2 12a10 10 0 0 1 10-10"></path><path d="M22 12a10 10 0 0 1-10 10"></path><path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line></svg>
                <div class="mt-text">
                    <span class="mt-title"><?php echo esc_html__('Extrahieren (Decode)', $text_domain); ?></span>
                    <span class="mt-sub"><?php echo esc_html__('Versteckte Daten auslesen', $text_domain); ?></span>
                </div>
            </button>
        </div>

        <!-- ==================== ENCODE WORKSPACE ==================== -->
        <div id="<?php echo esc_attr('sg-workspace-encode'); ?>" class="workspace-area active-workspace">
            
            <div class="sg-grid">
                
                <!-- Left: Carrier Selection (Das Träger-Medium) -->
                <div class="glass-panel sg-panel flex flex-col">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('1. Trägerbild (Carrier)', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-enc-reset'); ?>" class="btn-action-small hidden">
                            <?php echo esc_html__('Neues Bild', $text_domain); ?>
                        </button>
                    </div>

                    <div class="drop-zone" id="<?php echo esc_attr('enc-dropzone'); ?>">
                        <div class="drop-content">
                            <div class="drop-icon-glow cyan"></div>
                            <svg viewBox="0 0 24 24" class="drop-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                            <h3 class="drop-title"><?php echo esc_html__('Trägerbild ablegen', $text_domain); ?></h3>
                            <p class="drop-subtitle"><?php echo esc_html__('JPG oder PNG (wird in PNG konvertiert)', $text_domain); ?></p>
                        </div>
                        <input type="file" id="<?php echo esc_attr('enc-file-input'); ?>" class="hidden-input" accept="image/jpeg, image/png, image/webp" />
                    </div>

                    <div class="preview-container hidden checkerboard" id="<?php echo esc_attr('enc-preview-box'); ?>">
                        <img id="<?php echo esc_attr('enc-preview-img'); ?>" src="" alt="<?php echo esc_attr__('Carrier Preview', $text_domain); ?>">
                        <div class="capacity-meter mt-4">
                            <div class="cap-header">
                                <span class="cap-label"><?php echo esc_html__('Verfügbare Matrix-Kapazität:', $text_domain); ?></span>
                                <span id="<?php echo esc_attr('enc-capacity-val'); ?>" class="cap-val highlight-cyan">0 Zeichen</span>
                            </div>
                            <div class="cap-bar"><div class="cap-fill" id="<?php echo esc_attr('enc-cap-fill'); ?>" style="width: 0%"></div></div>
                        </div>
                    </div>
                </div>

                <!-- Right: Payload & Seal (Verschlüsselung & Einbettung) -->
                <div class="glass-panel sg-panel flex flex-col">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('2. Payload (Geheime Daten)', $text_domain); ?></span>
                    </div>

                    <textarea id="<?php echo esc_attr('enc-payload-text'); ?>" class="sg-textarea" placeholder="<?php echo esc_attr__('Gib hier deine geheime Nachricht ein...', $text_domain); ?>"></textarea>

                    <div class="key-vault mt-4">
                        <div class="key-header">
                            <span class="key-label"><?php echo esc_html__('3. AES-256 Passwort (Optional)', $text_domain); ?></span>
                        </div>
                        <div class="key-input-wrapper">
                            <svg viewBox="0 0 24 24" class="key-icon"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                            <input type="password" id="<?php echo esc_attr('enc-password'); ?>" class="key-input" placeholder="<?php echo esc_attr__('Verschlüsselt die Nachricht vor der Einbettung...', $text_domain); ?>" />
                            <button type="button" class="btn-toggle-vis" id="<?php echo esc_attr('btn-enc-toggle-vis'); ?>">
                                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>

                    <!-- Progress Tracking -->
                    <div class="encoding-progress hidden mt-4" id="<?php echo esc_attr('enc-progress-wrap'); ?>">
                        <div class="progress-bar">
                            <div class="progress-fill cyan-fill" id="<?php echo esc_attr('enc-progress-fill'); ?>" style="width: 0%;"></div>
                        </div>
                        <span class="progress-text" id="<?php echo esc_attr('enc-progress-text'); ?>">
                            <?php echo esc_html__('Modifiziere Pixel-Bits...', $text_domain); ?>
                        </span>
                    </div>

                    <button id="<?php echo esc_attr('btn-enc-execute'); ?>" class="btn-prime cyan-glow mt-4">
                        <svg viewBox="0 0 24 24" class="svg-icon"><polygon points="12 2 12 12 22 12"></polygon><path d="M22 12A10 10 0 1 1 12 2"></path></svg>
                        <?php echo esc_html__('Signatur einbetten & PNG speichern', $text_domain); ?>
                    </button>
                </div>

            </div>
            
            <div class="info-banner mt-4">
                <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                <?php echo esc_html__('Das ausgegebene Bild MUSS als PNG versendet werden. Jegliche Kompression (wie beim Senden per WhatsApp als normales Bild) zerstört die versteckten LSB-Daten!', $text_domain); ?>
            </div>

        </div>

        <!-- ==================== DECODE WORKSPACE ==================== -->
        <div id="<?php echo esc_attr('sg-workspace-decode'); ?>" class="workspace-area hidden">
            
            <div class="sg-grid">
                
                <!-- Left: Stego Carrier (Die forensische Analyse) -->
                <div class="glass-panel sg-panel flex flex-col">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('1. Stego-Bild analysieren', $text_domain); ?></span>
                        <button id="<?php echo esc_attr('btn-dec-reset'); ?>" class="btn-action-small hidden">
                            <?php echo esc_html__('Neues Bild', $text_domain); ?>
                        </button>
                    </div>

                    <div class="drop-zone" id="<?php echo esc_attr('dec-dropzone'); ?>">
                        <div class="drop-content">
                            <div class="drop-icon-glow purple"></div>
                            <svg viewBox="0 0 24 24" class="drop-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            <h3 class="drop-title"><?php echo esc_html__('Verdächtiges PNG ablegen', $text_domain); ?></h3>
                            <p class="drop-subtitle"><?php echo esc_html__('Das Tool sucht nach VGT-LSB Signaturen', $text_domain); ?></p>
                        </div>
                        <input type="file" id="<?php echo esc_attr('dec-file-input'); ?>" class="hidden-input" accept="image/png, image/bmp" />
                    </div>

                    <div class="preview-container hidden checkerboard" id="<?php echo esc_attr('dec-preview-box'); ?>">
                        <img id="<?php echo esc_attr('dec-preview-img'); ?>" src="" alt="<?php echo esc_attr__('Stego Preview', $text_domain); ?>">
                    </div>
                </div>

                <!-- Right: Extraction (Daten-Wiederherstellung) -->
                <div class="glass-panel sg-panel flex flex-col">
                    <div class="panel-header">
                        <span class="panel-label"><?php echo esc_html__('2. Payload Extraktion', $text_domain); ?></span>
                    </div>

                    <div class="key-vault">
                        <div class="key-header">
                            <span class="key-label"><?php echo esc_html__('AES-256 Passwort (falls verwendet)', $text_domain); ?></span>
                        </div>
                        <div class="key-input-wrapper">
                            <svg viewBox="0 0 24 24" class="key-icon"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                            <input type="password" id="<?php echo esc_attr('dec-password'); ?>" class="key-input" placeholder="<?php echo esc_attr__('Passwort eingeben...', $text_domain); ?>" />
                            <button type="button" class="btn-toggle-vis" id="<?php echo esc_attr('btn-dec-toggle-vis'); ?>">
                                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>

                    <button id="<?php echo esc_attr('btn-dec-execute'); ?>" class="btn-prime purple-glow mt-4" disabled>
                        <svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        <?php echo esc_html__('Deep-Scan starten', $text_domain); ?>
                    </button>

                    <div class="encoding-progress hidden mt-4" id="<?php echo esc_attr('dec-progress-wrap'); ?>">
                        <div class="progress-bar">
                            <div class="progress-fill purple-fill" id="<?php echo esc_attr('dec-progress-fill'); ?>" style="width: 0%;"></div>
                        </div>
                        <span class="progress-text" id="<?php echo esc_attr('dec-progress-text'); ?>">
                            <?php echo esc_html__('Lese Bit-Ebenen...', $text_domain); ?>
                        </span>
                    </div>

                    <div class="output-container mt-4">
                        <div class="panel-header" style="margin-bottom: 0.5rem; padding-bottom: 0.5rem; border-bottom:none;">
                            <span class="panel-label"><?php echo esc_html__('Extrahierter Datensatz', $text_domain); ?></span>
                            <button id="<?php echo esc_attr('btn-dec-copy'); ?>" class="btn-action-small hidden">
                                <?php echo esc_html__('Kopieren', $text_domain); ?>
                            </button>
                        </div>
                        <textarea 
                            id="<?php echo esc_attr('dec-payload-output'); ?>" 
                            class="sg-textarea terminal-output" 
                            readonly 
                            placeholder="<?php echo esc_attr__('Ausgabe erscheint hier...', $text_domain); ?>"></textarea>
                    </div>

                </div>

            </div>

        </div>

    </div>
    
    <!-- Hidden Master-Canvas: Forensische Pixel-Matrix-Operationen -->
    <canvas id="<?php echo esc_attr('steg-hidden-canvas'); ?>" style="display:none;"></canvas>
</div>