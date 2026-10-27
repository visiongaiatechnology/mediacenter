<?php
/**
 * STATUS: PLATIN
 * VGT MEDIACENTER - SECRET SCANNER PRO
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

wp_enqueue_script('vgt-jszip');

$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper ss-tool" id="<?php echo esc_attr('vgt-secret-scan'); ?>">
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>

        <div class="hero-content">
            <div class="hero-icon-wrapper ss-glow">
                <svg viewBox="0 0 24 24" class="hero-icon" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('Secret Scanner Pro', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Lokaler Leak-Scanner fuer ZIPs, Projektordner, .env-Dateien und Code. Secrets werden nur maskiert angezeigt und verlassen den Browser nicht.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <div class="ss-layout">
        <section class="glass-panel ss-dropzone" id="<?php echo esc_attr('ss-dropzone'); ?>">
            <div class="ss-drop-content">
                <svg viewBox="0 0 24 24" class="ss-drop-icon" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <h3><?php echo esc_html__('Dateien lokal pruefen', $text_domain); ?></h3>
                <p><?php echo esc_html__('Projektordner, einzelne Dateien oder ZIP-Archive hineinziehen. Die Analyse laeuft komplett im Browser.', $text_domain); ?></p>
                <div class="ss-actions">
                    <button type="button" class="ss-btn ss-btn-primary" id="<?php echo esc_attr('ss-select-files'); ?>">
                        <?php echo esc_html__('Dateien waehlen', $text_domain); ?>
                    </button>
                    <button type="button" class="ss-btn" id="<?php echo esc_attr('ss-select-dir'); ?>">
                        <?php echo esc_html__('Ordner waehlen', $text_domain); ?>
                    </button>
                </div>
            </div>
            <input type="file" id="<?php echo esc_attr('ss-file-input'); ?>" class="hidden-input" multiple />
            <input type="file" id="<?php echo esc_attr('ss-dir-input'); ?>" class="hidden-input" multiple webkitdirectory directory />
        </section>

        <section class="ss-dashboard">
            <div class="glass-panel ss-stat">
                <span><?php echo esc_html__('Dateien', $text_domain); ?></span>
                <strong id="<?php echo esc_attr('ss-stat-files'); ?>">0</strong>
            </div>
            <div class="glass-panel ss-stat">
                <span><?php echo esc_html__('Uebersprungen', $text_domain); ?></span>
                <strong id="<?php echo esc_attr('ss-stat-skipped'); ?>">0</strong>
            </div>
            <div class="glass-panel ss-stat ss-stat-hot">
                <span><?php echo esc_html__('Findings', $text_domain); ?></span>
                <strong id="<?php echo esc_attr('ss-stat-findings'); ?>">0</strong>
            </div>
        </section>

        <section class="glass-panel ss-console" aria-live="polite">
            <div class="ss-console-head">
                <span><?php echo esc_html__('Scanner Engine', $text_domain); ?></span>
                <button type="button" class="ss-btn ss-btn-compact" id="<?php echo esc_attr('ss-export'); ?>" disabled>
                    <?php echo esc_html__('CSV Export', $text_domain); ?>
                </button>
            </div>
            <progress class="ss-progress-meter" id="<?php echo esc_attr('ss-progress'); ?>" max="100" value="0"></progress>
            <p id="<?php echo esc_attr('ss-status'); ?>" class="ss-status"><?php echo esc_html__('Bereit fuer lokale Analyse.', $text_domain); ?></p>
        </section>

        <section class="glass-panel ss-results">
            <div class="ss-results-head">
                <span><?php echo esc_html__('Findings Matrix', $text_domain); ?></span>
                <button type="button" class="ss-btn ss-btn-compact" id="<?php echo esc_attr('ss-reset'); ?>">
                    <?php echo esc_html__('Reset', $text_domain); ?>
                </button>
            </div>
            <div id="<?php echo esc_attr('ss-result-list'); ?>" class="ss-result-list">
                <p class="ss-empty"><?php echo esc_html__('Noch keine Analyse gestartet.', $text_domain); ?></p>
            </div>
        </section>
    </div>
</div>
