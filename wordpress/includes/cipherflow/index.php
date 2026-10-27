<?php
/**
 * VGT MEDIACENTER - CIPHER-FLOW (VISUAL CRYPTO LAB)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS & Attribute Injection Prevention
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Dependency: CryptoJS (Wird über den VGT Core bereitgestellt)
 * Gewährleistet 100% Client-Side Verschlüsselung ohne Server-Kontakt.
 */
wp_enqueue_script('vgt-crypto');

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-cipherflow'); ?>">
    
    <!-- Hero Header: Navigation und System-Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper cf-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Cipher-Flow', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Visual Crypto Lab. Konstruiere komplexe, modulare Ver- und Entschlüsselungsketten (Pipelines) in Echtzeit. 100% Client-Side über CryptoJS.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body cf-layout">
        
        <!-- Matrix Pipeline -->
        <div class="cf-pipeline-container">
            
            <!-- INPUT BLOCK: Datenstrom-Injektion -->
            <div class="glass-panel cf-block input-block">
                <div class="block-header">
                    <div class="bh-title">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <?php echo esc_html__('DATA_STREAM_IN', $text_domain); ?>
                    </div>
                </div>
                <textarea 
                    id="<?php echo esc_attr('cf-input'); ?>" 
                    class="cf-textarea" 
                    placeholder="<?php echo esc_attr__('Rohen Text oder Ciphertext hier injizieren...', $text_domain); ?>"></textarea>
            </div>

            <!-- DYNAMIC PIPELINE: Mounting-Point für Krypto-Nodes -->
            <div id="<?php echo esc_attr('cf-node-container'); ?>" class="cf-node-container">
                <!-- Dynamische Injektion der Nodes via JavaScript -->
            </div>

            <!-- ADD NODE ACTION: Pipeline-Erweiterung -->
            <div class="cf-add-node-wrapper">
                <button id="<?php echo esc_attr('cf-btn-add-node'); ?>" class="btn-add-node">
                    <svg viewBox="0 0 24 24" class="svg-icon">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <?php echo esc_html__('Krypto-Modul einhängen', $text_domain); ?>
                </button>
            </div>

            <!-- OUTPUT BLOCK: Finaler Datenvektor -->
            <div class="glass-panel cf-block output-block">
                <div class="block-header">
                    <div class="bh-title highlight-blue">
                        <svg viewBox="0 0 24 24" class="svg-icon">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <?php echo esc_html__('DATA_STREAM_OUT', $text_domain); ?>
                    </div>
                    <div class="bh-actions">
                        <span class="status-badge" id="<?php echo esc_attr('cf-pipeline-status'); ?>">
                            <span class="pulse-dot"></span> 
                            <?php echo esc_html__('Pipeline Idle', $text_domain); ?>
                        </span>
                        <button id="<?php echo esc_attr('cf-btn-copy'); ?>" class="btn-action-small">
                            <svg viewBox="0 0 24 24" class="svg-icon">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <?php echo esc_html__('Copy', $text_domain); ?>
                        </button>
                    </div>
                </div>
                <textarea 
                    id="<?php echo esc_attr('cf-output'); ?>" 
                    class="cf-textarea terminal-output" 
                    readonly 
                    placeholder="<?php echo esc_attr__('Berechneter Vektor erscheint hier...', $text_domain); ?>"></textarea>
            </div>

        </div>

    </div>
</div>