<?php
/**
 * VGT MEDIACENTER - MASTER DASHBOARD
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Attribute Injection & Navigation Hardening
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// Lokalisierungs-Domain für konsistente Sicherheit
$text_domain = 'vgt-mediacenter';
?>

<div id="<?php echo esc_attr('vgt-dashboard-root'); ?>" class="vgt-dashboard-root flex-col">
    <!-- CONTENT AREA: Dynamische Tool-Matrix -->
    <main class="vgt-dashboard-main flex-col">
        
        <!-- Filter Nav: Kognitive Kategorisierung -->
        <section class="vgt-dashboard-grid-mode" id="<?php echo esc_attr('vgt-dashboard-grid-mode'); ?>">
        <nav class="filter-nav">
            <div class="filter-container" id="<?php echo esc_attr('vg-filter-container'); ?>">
                <!-- Dynamische Injektion der Filter-Chips via JavaScript -->
            </div>
        </nav>

        <!-- GRID View Container: Mounting-Point für VGT Tool-Karten -->
        <div id="<?php echo esc_attr('vg-tools-grid'); ?>" class="tools-grid">
            <!-- Die Tool-Karten werden hier durch die Core-JS Engine im RAM gerendert -->
        </div>
        </section>

        <section class="vgt-mc-desk" id="<?php echo esc_attr('vgt-mc-desk'); ?>" aria-label="<?php echo esc_attr__('Desktop Modus', $text_domain); ?>">
            <div class="vgt-mc-desk-topbar">
                <div>
                    <span class="vgt-mc-desk-kicker"><?php echo esc_html__('Desktop Modus', $text_domain); ?></span>
                    <h2><?php echo esc_html__('Mediacenter Workbench', $text_domain); ?></h2>
                </div>
                <div class="vgt-mc-desk-clock" id="<?php echo esc_attr('vgt-mc-desk-clock'); ?>">--:--</div>
            </div>

            <div class="vgt-mc-desk-stage">
                <div class="vgt-mc-desk-icons" id="<?php echo esc_attr('vgt-mc-desk-icons'); ?>"></div>
                <div class="vgt-mc-desk-windows" id="<?php echo esc_attr('vgt-mc-desk-windows'); ?>"></div>
            </div>

            <div class="vgt-mc-desk-dock" id="<?php echo esc_attr('vgt-mc-desk-dock'); ?>"></div>
        </section>
    </main>

</div>
