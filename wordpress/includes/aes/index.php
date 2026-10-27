<?php
/**
 * VGT MEDIACENTER - CIPHER (TRIAD ENGINE)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Crypto UI Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<style>
    /* CSS-SHIELD: Verhindert, dass Icons den Klick auf den Button abfangen */
    #<?php echo esc_attr('vgt-cipher'); ?> .mode-tab *, 
    #<?php echo esc_attr('vgt-cipher'); ?> .algo-btn *, 
    #<?php echo esc_attr('vgt-cipher'); ?> .dir-btn-txt * {
        pointer-events: none !important;
    }
    
    /* VGT Triade Pulse Animation */
    .pulse-dot {
        width: 8px; height: 8px;
        background: rgba(var(--c-purple, 168, 85, 247), 1);
        border-radius: 50%; display: inline-block;
        box-shadow: 0 0 8px rgba(var(--c-purple, 168, 85, 247), 0.8);
        animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(0.8); opacity: 0.5; }
    }
</style>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-cipher'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper cipher-glow">
                <svg viewBox="0 0 24 24" class="hero-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Cipher (Triad Engine)', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo wp_kses_post(__('Militärische Zero-Trust Verschlüsselung für Text und Dateien. Nutze proprietäre <code>.vgt</code> Container und extreme Schlüsselableitung (AES-GCM + 1 Mio PBKDF2 Iterationen).', $text_domain)); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Crypto Warning Banner (Dynamic via JS) -->
    <div id="<?php echo esc_attr('crypto-warning'); ?>" class="hidden" style="background: rgba(255,0,50,0.1); color: #ff4d4d; border: 1px solid rgba(255,0,50,0.3); border-radius: var(--radius-lg); padding: 1rem; margin-bottom: 2rem; font-weight: 600; text-align: center;">
        <svg viewBox="0 0 24 24" class="svg-icon" style="vertical-align: middle; margin-right: 0.5rem;"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <?php echo esc_html__('SYSTEMWARNUNG: WebCrypto API ist offline. (SSL/HTTPS erforderlich). Verschlüsselung ist in dieser Umgebung deaktiviert.', $text_domain); ?>
    </div>

    <!-- Interface Body -->
    <div class="tool-body cipher-layout">
        
        <!-- Global Settings Panel -->
        <div class="glass-panel global-settings-panel">
            <div class="key-vault">
                <div class="key-header">
                    <span class="key-label"><?php echo esc_html__('1. Master Key (Passwort) definieren', $text_domain); ?></span>
                </div>
                <div class="key-input-wrapper mt-2">
                    <svg viewBox="0 0 24 24" class="key-icon"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                    <input type="password" id="<?php echo esc_attr('cipher-key'); ?>" class="key-input" placeholder="<?php echo esc_attr__('Hochsicheres Passwort eingeben...', $text_domain); ?>" />
                    <button type="button" class="btn-toggle-vis" id="<?php echo esc_attr('btn-toggle-key'); ?>" aria-label="<?php echo esc_attr__('Passwort anzeigen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon eye-on"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
            </div>

            <div class="cipher-divider"></div>

            <div class="engine-toggles">
                <div class="toggle-group-wrap">
                    <span class="key-label"><?php echo esc_html__('2. Krypto-Engine wählen', $text_domain); ?></span>
                    <div class="vgt-toggle-group mt-2">
                        <button type="button" class="toggle-btn algo-btn active" data-val="<?php echo esc_attr('aes'); ?>">
                            <?php echo esc_html__('AES-256 (Standard)', $text_domain); ?>
                        </button>
                        <button type="button" class="toggle-btn algo-btn" data-val="<?php echo esc_attr('triad'); ?>">
                            <span class="pulse-dot"></span> <?php echo esc_html__('VGT Triade', $text_domain); ?>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODE TABS -->
        <div class="cipher-mode-tabs mt-4">
            <button type="button" class="mode-tab active" data-mode="<?php echo esc_attr('text'); ?>">
                <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                <div class="mt-text">
                    <span class="mt-title"><?php echo esc_html__('Text-Stream', $text_domain); ?></span>
                    <span class="mt-sub"><?php echo esc_html__('Nachrichten ver-/entschlüsseln', $text_domain); ?></span>
                </div>
            </button>
            <button type="button" class="mode-tab" data-mode="<?php echo esc_attr('file'); ?>">
                <svg viewBox="0 0 24 24" class="svg-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                <div class="mt-text">
                    <span class="mt-title"><?php echo esc_html__('Datei-Tresor', $text_domain); ?></span>
                    <span class="mt-sub"><?php echo esc_html__('Dateien & .vgt Archive', $text_domain); ?></span>
                </div>
            </button>
        </div>

        <!-- ==================== TEXT MODE WORKSPACE ==================== -->
        <div id="<?php echo esc_attr('workspace-text'); ?>" class="workspace-area active-workspace">
            
            <div class="action-direction-toggles mb-4">
                <button type="button" class="dir-btn-txt active" data-dir="<?php echo esc_attr('encrypt'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <?php echo esc_html__('Text Verschlüsseln', $text_domain); ?>
                </button>
                <button type="button" class="dir-btn-txt" data-dir="<?php echo esc_attr('decrypt'); ?>">
                    <svg viewBox="0 0 24 24" class="svg-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>
                    <?php echo esc_html__('Text Entschlüsseln', $text_domain); ?>
                </button>
            </div>

            <div class="cipher-grid">
                <!-- Text Input -->
                <div class="glass-panel cipher-panel input-panel">
                    <div class="panel-header">
                        <span class="panel-label" id="<?php echo esc_attr('label-txt-in'); ?>"><?php echo esc_html__('Plaintext Eingabe', $text_domain); ?></span>
                        <button type="button" class="btn-action-small" id="<?php echo esc_attr('btn-paste'); ?>">
                            <svg viewBox="0 0 24 24" class="svg-icon"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                            <?php echo esc_html__('Paste', $text_domain); ?>
                        </button>
                    </div>
                    <textarea id="<?php echo esc_attr('cipher-text-input'); ?>" class="cipher-textarea" placeholder="<?php echo esc_attr__('Geheime Nachricht hier eingeben...', $text_domain); ?>"></textarea>
                    <button type="button" id="<?php echo esc_attr('btn-exec-text'); ?>" class="btn-execute encrypt-state">
                        <span id="<?php echo esc_attr('exec-txt-label'); ?>"><?php echo esc_html__('Verschlüsseln & Hashen', $text_domain); ?></span>
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>

                <!-- Text Output -->
                <div class="glass-panel cipher-panel output-panel">
                    <div class="panel-header">
                        <span class="panel-label" id="<?php echo esc_attr('label-txt-out'); ?>"><?php echo esc_html__('Ciphertext (Base64)', $text_domain); ?></span>
                        <div class="action-group">
                            <span class="status-badge hidden" id="<?php echo esc_attr('status-badge-text'); ?>">SECURE</span>
                            <button type="button" class="btn-action-small" id="<?php echo esc_attr('btn-copy'); ?>">
                                <svg viewBox="0 0 24 24" class="svg-icon"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                <?php echo esc_html__('Copy', $text_domain); ?>
                            </button>
                        </div>
                    </div>
                    <div class="output-wrapper" style="position: relative;">
                        <!-- The Matrix Loading Overlay -->
                        <div class="matrix-overlay hidden" id="<?php echo esc_attr('matrix-overlay'); ?>">
                            <div class="matrix-text" id="<?php echo esc_attr('matrix-stream'); ?>">0100101...</div>
                        </div>
                        <textarea id="<?php echo esc_attr('cipher-text-output'); ?>" class="cipher-textarea output-terminal" readonly placeholder="<?php echo esc_attr__('Resultat erscheint hier...', $text_domain); ?>"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <!-- ==================== FILE MODE WORKSPACE ==================== -->
        <div id="<?php echo esc_attr('workspace-file'); ?>" class="workspace-area hidden">
            
            <!-- DROPZONE -->
            <div class="glass-panel drop-zone" id="<?php echo esc_attr('file-dropzone'); ?>">
                <div class="drop-content">
                    <div class="drop-icon-glow purple"></div>
                    <svg viewBox="0 0 24 24" class="drop-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                    <h3 class="drop-title" id="<?php echo esc_attr('drop-title-file'); ?>"><?php echo esc_html__('Datei hier ablegen (oder klicken)', $text_domain); ?></h3>
                    <p class="drop-subtitle" id="<?php echo esc_attr('drop-desc-file'); ?>">
                        <?php echo wp_kses_post(__('Normale Datei reinziehen = <b>Verschlüsseln</b><br>Eine .vgt Datei reinziehen = <b>Entschlüsseln</b>', $text_domain)); ?>
                    </p>
                    <div class="drop-badge"><?php echo esc_html__('Max 50MB (RAM Limit)', $text_domain); ?></div>
                </div>
                <input type="file" id="<?php echo esc_attr('file-input'); ?>" class="hidden-input" />
            </div>

            <!-- FILE PROCESSOR -->
            <div class="glass-panel file-processor hidden" id="<?php echo esc_attr('file-processor'); ?>">
                <div class="fp-header">
                    <span class="fp-label" id="<?php echo esc_attr('fp-mode-label'); ?>"><?php echo esc_html__('Datei-Stream Analytik', $text_domain); ?></span>
                    <button type="button" id="<?php echo esc_attr('btn-reset-file'); ?>" class="btn-action-small danger outline">
                        <?php echo esc_html__('Verwerfen', $text_domain); ?>
                    </button>
                </div>
                
                <div class="fp-meta">
                    <div class="fp-meta-item">
                        <span class="fp-key"><?php echo esc_html__('Geladene Datei:', $text_domain); ?></span>
                        <span class="fp-val terminal-text" id="<?php echo esc_attr('fp-name'); ?>">document.pdf</span>
                    </div>
                    <div class="fp-meta-item">
                        <span class="fp-key"><?php echo esc_html__('Umfang:', $text_domain); ?></span>
                        <span class="fp-val terminal-text" id="<?php echo esc_attr('fp-size'); ?>">0 MB</span>
                    </div>
                </div>

                <div class="encoding-progress hidden" id="<?php echo esc_attr('file-progress-wrap'); ?>">
                    <div class="progress-bar">
                        <div class="progress-fill purple-fill" id="<?php echo esc_attr('file-progress-fill'); ?>"></div>
                    </div>
                    <span class="progress-text" id="<?php echo esc_attr('file-progress-text'); ?>">
                        <?php echo esc_html__('Initialisiere Krypto-Engine...', $text_domain); ?>
                    </span>
                </div>

                <div class="fp-actions">
                    <button type="button" id="<?php echo esc_attr('btn-exec-file'); ?>" class="btn-execute encrypt-state">
                        <span id="<?php echo esc_attr('exec-file-label'); ?>"><?php echo esc_html__('Verschlüsseln & Speichern', $text_domain); ?></span>
                        <svg viewBox="0 0 24 24" class="svg-icon"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                    
                    <button type="button" id="<?php echo esc_attr('btn-download-file'); ?>" class="btn-prime success-glow hidden">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <span id="<?php echo esc_attr('dl-file-label'); ?>"><?php echo esc_html__('Datei speichern', $text_domain); ?></span>
                    </button>
                </div>
            </div>

        </div>
    </div>
</div>