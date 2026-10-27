<?php
/**
 * STATUS: PLATIN
 * VGT MEDIACENTER - URL CLEANER PRO
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper uc-tool" id="<?php echo esc_attr('vgt-url-clean'); ?>">
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>

        <div class="hero-content">
            <div class="hero-icon-wrapper uc-glow">
                <svg viewBox="0 0 24 24" class="hero-icon" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93"></path>
                    <path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.12a5 5 0 0 0 7.07 7.07L13 19.07"></path>
                    <line x1="4" y1="4" x2="20" y2="20"></line>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('URL Cleaner Pro', $text_domain); ?></h2>
                <p class="tool-desc"><?php echo esc_html__('Entfernt Tracking-Parameter, Click-IDs und Redirect-Muell lokal im Browser. Keine Requests, keine Logs, keine Cloud.', $text_domain); ?></p>
            </div>
        </div>
    </div>

    <div class="uc-layout">
        <section class="glass-panel uc-panel">
            <label class="uc-label" for="<?php echo esc_attr('uc-input'); ?>"><?php echo esc_html__('URLs einfügen', $text_domain); ?></label>
            <textarea id="<?php echo esc_attr('uc-input'); ?>" class="uc-textarea" spellcheck="false" placeholder="<?php echo esc_attr__('https://example.org/?utm_source=newsletter&fbclid=...', $text_domain); ?>"></textarea>
            <div class="uc-actions">
                <button type="button" class="uc-btn uc-btn-primary" id="<?php echo esc_attr('uc-clean'); ?>"><?php echo esc_html__('Tracking entfernen', $text_domain); ?></button>
                <button type="button" class="uc-btn" id="<?php echo esc_attr('uc-sample'); ?>"><?php echo esc_html__('Demo laden', $text_domain); ?></button>
                <button type="button" class="uc-btn" id="<?php echo esc_attr('uc-reset'); ?>"><?php echo esc_html__('Reset', $text_domain); ?></button>
            </div>
        </section>

        <section class="uc-stats">
            <div class="glass-panel uc-stat"><span><?php echo esc_html__('URLs', $text_domain); ?></span><strong id="<?php echo esc_attr('uc-stat-urls'); ?>">0</strong></div>
            <div class="glass-panel uc-stat"><span><?php echo esc_html__('Parameter entfernt', $text_domain); ?></span><strong id="<?php echo esc_attr('uc-stat-removed'); ?>">0</strong></div>
            <div class="glass-panel uc-stat uc-hot"><span><?php echo esc_html__('Redirects gelöst', $text_domain); ?></span><strong id="<?php echo esc_attr('uc-stat-redirects'); ?>">0</strong></div>
        </section>

        <section class="glass-panel uc-panel">
            <div class="uc-result-head">
                <span><?php echo esc_html__('Bereinigte Ausgabe', $text_domain); ?></span>
                <button type="button" class="uc-btn uc-btn-compact" id="<?php echo esc_attr('uc-copy'); ?>" disabled><?php echo esc_html__('Kopieren', $text_domain); ?></button>
            </div>
            <div id="<?php echo esc_attr('uc-results'); ?>" class="uc-results">
                <p class="uc-empty"><?php echo esc_html__('Noch keine URL bereinigt.', $text_domain); ?></p>
            </div>
        </section>
    </div>
</div>
