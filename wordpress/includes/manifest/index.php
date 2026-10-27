<?php
/**
 * STATUS: PLATIN
 * VGT MEDIACENTER - MANIFEST FORGE
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper mf-tool" id="<?php echo esc_attr('vgt-manifest'); ?>">
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>

        <div class="hero-content">
            <div class="hero-icon-wrapper mf-glow">
                <svg viewBox="0 0 24 24" class="hero-icon" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <polyline points="9 15 11 17 16 12"></polyline>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Manifest Forge', $text_domain); ?></h2>
                <p class="tool-desc"><?php echo esc_html__('Erstellt und verifiziert SHA-256 Datei-Manifeste lokal. Perfekt fuer Releases, Upload-Pruefung, Backups und Integritaetsnachweise.', $text_domain); ?></p>
            </div>
        </div>
    </div>

    <div class="mf-layout">
        <section class="glass-panel mf-dropzone" id="<?php echo esc_attr('mf-dropzone'); ?>">
            <div class="mf-drop-content">
                <svg viewBox="0 0 24 24" class="mf-drop-icon" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <h3><?php echo esc_html__('Dateien oder Ordner wählen', $text_domain); ?></h3>
                <p><?php echo esc_html__('Web Crypto berechnet SHA-256 direkt im Browser. Keine Datei wird hochgeladen.', $text_domain); ?></p>
                <div class="mf-actions">
                    <button type="button" class="mf-btn mf-btn-primary" id="<?php echo esc_attr('mf-select-files'); ?>"><?php echo esc_html__('Dateien wählen', $text_domain); ?></button>
                    <button type="button" class="mf-btn" id="<?php echo esc_attr('mf-select-dir'); ?>"><?php echo esc_html__('Ordner wählen', $text_domain); ?></button>
                </div>
            </div>
            <input type="file" id="<?php echo esc_attr('mf-file-input'); ?>" class="hidden-input" multiple />
            <input type="file" id="<?php echo esc_attr('mf-dir-input'); ?>" class="hidden-input" multiple webkitdirectory directory />
        </section>

        <section class="mf-stats">
            <div class="glass-panel mf-stat"><span><?php echo esc_html__('Dateien', $text_domain); ?></span><strong id="<?php echo esc_attr('mf-stat-files'); ?>">0</strong></div>
            <div class="glass-panel mf-stat"><span><?php echo esc_html__('Gehashed', $text_domain); ?></span><strong id="<?php echo esc_attr('mf-stat-hashed'); ?>">0</strong></div>
            <div class="glass-panel mf-stat mf-hot"><span><?php echo esc_html__('Verifiziert', $text_domain); ?></span><strong id="<?php echo esc_attr('mf-stat-ok'); ?>">0</strong></div>
        </section>

        <section class="glass-panel mf-panel">
            <div class="mf-head">
                <span><?php echo esc_html__('Manifest Output', $text_domain); ?></span>
                <div class="mf-actions">
                    <button type="button" class="mf-btn mf-btn-compact" id="<?php echo esc_attr('mf-copy'); ?>" disabled><?php echo esc_html__('Kopieren', $text_domain); ?></button>
                    <button type="button" class="mf-btn mf-btn-compact" id="<?php echo esc_attr('mf-download'); ?>" disabled><?php echo esc_html__('Download', $text_domain); ?></button>
                </div>
            </div>
            <progress class="mf-progress" id="<?php echo esc_attr('mf-progress'); ?>" max="100" value="0"></progress>
            <p id="<?php echo esc_attr('mf-status'); ?>" class="mf-status"><?php echo esc_html__('Bereit.', $text_domain); ?></p>
            <textarea id="<?php echo esc_attr('mf-output'); ?>" class="mf-output" readonly spellcheck="false"></textarea>
        </section>

        <section class="glass-panel mf-panel">
            <label class="mf-head-label" for="<?php echo esc_attr('mf-verify-input'); ?>"><?php echo esc_html__('Manifest verifizieren', $text_domain); ?></label>
            <textarea id="<?php echo esc_attr('mf-verify-input'); ?>" class="mf-output mf-verify" spellcheck="false" placeholder="<?php echo esc_attr__('sha256  path/to/file.ext', $text_domain); ?>"></textarea>
            <button type="button" class="mf-btn mf-btn-primary" id="<?php echo esc_attr('mf-verify'); ?>" disabled><?php echo esc_html__('Gegen aktuelle Dateien prüfen', $text_domain); ?></button>
            <div id="<?php echo esc_attr('mf-results'); ?>" class="mf-results">
                <p class="mf-empty"><?php echo esc_html__('Noch keine Verifikation gestartet.', $text_domain); ?></p>
            </div>
        </section>
    </div>
</div>
