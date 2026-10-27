<?php
/**
 * Plugin Name: VGT Mediacenter V1.0 Beta
 * Description: 100% lokales, autarkes Tool-Ökosystem (40 Werkzeuge). Privacy First. Zero Cloud. Zero Telemetry.
 * Version: 1.0.0-beta
 * Author: VisionGaiaTechnology
 * License: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace VGT\Mediacenter;

if (!defined('ABSPATH')) {
    exit; // Security: Direct access denied
}

// System Constants
define('VGT_MC_VERSION', '1.0.0-beta');
define('VGT_MC_PATH', plugin_dir_path(__FILE__));
define('VGT_MC_URL', plugin_dir_url(__FILE__));
// Fully localized internal asset store (Zero external dependencies)
define('VGT_GLOBAL_ASSETS_PATH', VGT_MC_PATH . 'assets/vendor/');
define('VGT_GLOBAL_ASSETS', VGT_MC_URL . 'assets/vendor/');

/**
 * Autoloader & Bootstrapper
 */
final class Bootstrap {
    private static ?Bootstrap $instance = null;

    private function __construct() {
        $this->load_dependencies();
        add_action('plugins_loaded', [$this, 'init_system']);
    }

    public static function get_instance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function load_dependencies(): void {
        require_once VGT_MC_PATH . 'includes/class-vgt-core.php';
    }

    public function init_system(): void {
        Core::get_instance();
    }
}

Bootstrap::get_instance();