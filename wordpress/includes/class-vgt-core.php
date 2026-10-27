<?php

declare(strict_types=1);

namespace VGT\Mediacenter;

if (!defined('ABSPATH')) {
    exit;
}

final class Core {
    private static ?Core $instance = null;

    private array $assets_config = [];
    private array $tools_config = [];
    private ?string $csp_nonce = null;

    private function __construct() {
        $this->assets_config = require VGT_MC_PATH . 'includes/config-assets.php';
        $this->tools_config = require VGT_MC_PATH . 'includes/config-tools.php';

        add_shortcode('vgt_mediacenter', [$this, 'render_router']);
        add_action('wp_enqueue_scripts', [$this, 'register_global_assets']);

        add_action('send_headers', [$this, 'enforce_csp_headers']);
        add_action('template_redirect', [$this, 'render_iframe_document']);
        add_filter('script_loader_tag', [$this, 'inject_sri_hashes'], 10, 2);
        add_filter('style_loader_tag', [$this, 'inject_sri_hashes'], 10, 2);
        add_filter('wp_inline_script_attributes', [$this, 'inject_inline_nonce']);
        add_filter('wp_script_attributes', [$this, 'inject_inline_nonce']);
        add_filter('wp_style_attributes', [$this, 'inject_inline_nonce']);
    }

    public static function get_instance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function enforce_csp_headers(): void {
        if (!$this->is_mediacenter_request()) {
            return;
        }

        $nonce = $this->get_csp_nonce();
        $is_iframe = $this->is_iframe_request();
        $csp_rules = [
            "default-src 'self'",
            "script-src 'self' 'nonce-{$nonce}'",
            "script-src-attr 'none'",
            "style-src 'self' 'nonce-{$nonce}'",
            "style-src-elem 'self' 'nonce-{$nonce}'",
            "style-src-attr 'none'",
            "frame-src 'self'",
            "worker-src 'self' blob:",
            "connect-src 'self'",
            "font-src 'self' data:",
            "img-src 'self' data: blob:",
            "media-src 'self' blob: data:",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
            $is_iframe ? "frame-ancestors 'self'" : "frame-ancestors 'none'",
        ];

        header('Content-Security-Policy: ' . implode('; ', $csp_rules) . ';');
        header('X-Frame-Options: ' . ($is_iframe ? 'SAMEORIGIN' : 'DENY'));
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()');
        header('Cross-Origin-Opener-Policy: same-origin');
        header('Cross-Origin-Embedder-Policy: require-corp');
        header('Cross-Origin-Resource-Policy: same-origin');

        if (is_ssl()) {
            header('Strict-Transport-Security: max-age=31536000; includeSubDomains; preload');
        }
    }

    public function inject_sri_hashes(string $tag, string $handle): string {
        if (strpos($handle, 'vgt-') !== 0) {
            return $tag;
        }

        $hash = '';

        if (in_array($handle, ['vgt-frontend-guard', 'vgt-client-shield'], true)) {
            $local_path = VGT_MC_PATH . 'assets/js/' . $handle . '.js';
            if (file_exists($local_path)) {
                $hash = 'sha384-' . base64_encode(hash_file('sha384', $local_path, true));
            }
        } elseif (is_array($this->assets_config['scripts'][$handle] ?? null) && isset($this->assets_config['scripts'][$handle]['hash'])) {
            $hash = (string)$this->assets_config['scripts'][$handle]['hash'];
        } elseif (is_array($this->assets_config['styles'][$handle] ?? null) && isset($this->assets_config['styles'][$handle]['hash'])) {
            $hash = (string)$this->assets_config['styles'][$handle]['hash'];
        }

        if ($hash === '') {
            $src_match = [];
            if (preg_match("/src=['\"](.*?)['\"]/i", $tag, $src_match) || preg_match("/href=['\"](.*?)['\"]/i", $tag, $src_match)) {
                $url = $src_match[1];
                $clean_url = strtok($url, '?');
                $local_path = null;

                if (defined('VGT_GLOBAL_ASSETS') && defined('VGT_GLOBAL_ASSETS_PATH') && strpos($clean_url, VGT_GLOBAL_ASSETS) === 0) {
                    $local_path = str_replace(VGT_GLOBAL_ASSETS, VGT_GLOBAL_ASSETS_PATH, $clean_url);
                } elseif (defined('VGT_MC_URL') && defined('VGT_MC_PATH') && strpos($clean_url, VGT_MC_URL) === 0) {
                    $local_path = str_replace(VGT_MC_URL, VGT_MC_PATH, $clean_url);
                } else {
                    $local_path = str_replace(site_url(), ABSPATH, $clean_url);
                }

                if (is_string($local_path) && file_exists($local_path)) {
                    $hash = 'sha384-' . base64_encode(hash_file('sha384', $local_path, true));
                }
            }
        }

        if ($hash !== '' && !preg_match('/\sintegrity=/i', $tag)) {
            $tag = preg_replace(
                '/(<script|<link)([^>]+)>/i',
                '$1$2 integrity="' . esc_attr($hash) . '" crossorigin="anonymous">',
                $tag
            ) ?? $tag;
        }

        if (!preg_match('/\snonce=/i', $tag)) {
            $tag = preg_replace(
                '/(<script|<link)([^>]+)>/i',
                '$1$2 nonce="' . esc_attr($this->get_csp_nonce()) . '">',
                $tag
            ) ?? $tag;
        }

        return $tag;
    }

    public function inject_inline_nonce(array $attributes): array {
        if ($this->is_mediacenter_request()) {
            $attributes['nonce'] = $this->get_csp_nonce();
        }

        return $attributes;
    }

    public function register_global_assets(): void {
        wp_register_script('vgt-client-shield', VGT_MC_URL . 'assets/js/vgt-client-shield.js', [], VGT_MC_VERSION, false);
        wp_register_script('vgt-frontend-guard', VGT_MC_URL . 'assets/js/vgt-frontend-guard.js', ['vgt-client-shield'], VGT_MC_VERSION, false);
        wp_register_script('vgt-core-shell', VGT_MC_URL . 'includes/core-shell.js', ['vgt-frontend-guard'], VGT_MC_VERSION, true);

        wp_register_style('vgt-core-style', VGT_MC_URL . 'includes/core-style.css', [], VGT_MC_VERSION);

        foreach ($this->assets_config['styles'] as $handle => $asset) {
            $filename = is_array($asset) ? ($asset['file'] ?? '') : $asset;
            if (!is_string($filename) || $filename === '') {
                continue;
            }

            wp_register_style($handle, VGT_GLOBAL_ASSETS . $filename, [], VGT_MC_VERSION);
        }

        foreach ($this->assets_config['scripts'] as $handle => $asset) {
            $filename = is_array($asset) ? ($asset['file'] ?? '') : $asset;
            if (!is_string($filename) || $filename === '') {
                continue;
            }

            wp_register_script($handle, VGT_GLOBAL_ASSETS . $filename, [], VGT_MC_VERSION, true);
        }
    }

    public function render_router(array $atts = []): string {
        $requested_tool = $this->get_requested_tool();
        wp_enqueue_script('vgt-client-shield');
        wp_enqueue_script('vgt-frontend-guard');

        wp_enqueue_style('vgt-font-inter');
        wp_enqueue_style('vgt-core-style');
        wp_enqueue_script('vgt-core-shell');

        $this->enqueue_tool_assets($requested_tool);

        ob_start();
        ?>
        <div class="vgt-app-wrapper" id="vgt-main-wrapper">
            <?php $this->render_client_config($requested_tool); ?>
            <div class="bg-layer" aria-hidden="true">
                <div class="vgt-ambient-glow"></div>
            </div>

            <div class="vgt-container">
                <?php $this->render_global_shell($requested_tool); ?>
                <?php echo $this->render_tool_view($requested_tool); ?>

                <footer class="vgt-global-footer">
                    <span>VGT Mediacenter v3.0</span>
                    <div class="footer-links">
                        <a href="/impressum">Impressum</a>
                        <a href="/datenschutz">Datenschutz</a>
                    </div>
                </footer>
            </div>
        </div>
        <?php

        return ob_get_clean();
    }

    public function render_iframe_document(): void {
        if (!$this->is_iframe_request()) {
            return;
        }

        $requested_tool = $this->get_requested_tool();
        if ($requested_tool === 'dashboard') {
            $requested_tool = 'hashchecker';
        }

        $this->register_global_assets();
        wp_enqueue_script('vgt-client-shield');
        wp_enqueue_script('vgt-frontend-guard');
        wp_enqueue_style('vgt-font-inter');
        wp_enqueue_style('vgt-core-style');
        $this->enqueue_tool_assets($requested_tool);

        status_header(200);
        nocache_headers();
        ?><!doctype html>
        <html <?php language_attributes(); ?>>
        <head>
            <meta charset="<?php bloginfo('charset'); ?>">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title><?php echo esc_html('VGT Mediacenter Frame'); ?></title>
            <?php wp_head(); ?>
        </head>
        <body class="vgt-mc-frame-body">
            <div class="vgt-app-wrapper vgt-frame-wrapper" id="vgt-main-wrapper">
                <?php $this->render_client_config($requested_tool); ?>
                <div class="bg-layer" aria-hidden="true">
                    <div class="vgt-ambient-glow"></div>
                </div>
                <main class="vgt-frame-content">
                    <?php echo $this->render_tool_view($requested_tool); ?>
                </main>
            </div>
            <?php wp_footer(); ?>
        </body>
        </html>
        <?php
        exit;
    }

    private function enqueue_tool_assets(string $tool_id): void {
        $config = $this->tools_config[$tool_id];
        $path = $config['path'];

        foreach ($config['deps_css'] as $css_handle) {
            wp_enqueue_style($css_handle);
        }

        foreach ($config['deps_js'] as $js_handle) {
            wp_enqueue_script($js_handle);
        }

        $local_css = VGT_MC_PATH . "includes/{$path}/style.css";
        $local_js = VGT_MC_PATH . "includes/{$path}/script.js";

        if (file_exists($local_css)) {
            wp_enqueue_style("vgt-tool-{$tool_id}-css", VGT_MC_URL . "includes/{$path}/style.css", [], filemtime($local_css));
        }

        if (file_exists($local_js)) {
            wp_enqueue_script("vgt-tool-{$tool_id}-js", VGT_MC_URL . "includes/{$path}/script.js", ['vgt-frontend-guard'], filemtime($local_js), true);
        }
    }

    private function render_tool_view(string $tool_id): string {
        ob_start();
        $this->load_tool_view($tool_id);
        $html = (string)ob_get_clean();

        return $this->rewrite_inline_style_attributes($html);
    }

    private function load_tool_view(string $tool_id): void {
        $path = $this->tools_config[$tool_id]['path'];
        $file = VGT_MC_PATH . "includes/{$path}/index.php";

        if (file_exists($file)) {
            require $file;
            return;
        }

        $this->render_failsafe_ui($tool_id);
    }

    private function rewrite_inline_style_attributes(string $html): string {
        $rules = [];
        $rewritten = preg_replace_callback(
            '/<([a-zA-Z][a-zA-Z0-9:-]*)([^<>]*?)\sstyle=(["\'])(.*?)\3([^<>]*?)>/si',
            static function(array $match) use (&$rules): string {
                $tag = $match[1];
                $before = $match[2];
                $style = trim(html_entity_decode($match[4], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
                $after = $match[5];

                if ($style === '') {
                    return '<' . $tag . $before . $after . '>';
                }

                $class = 'vgt-inline-' . substr(hash('sha256', $style), 0, 16);
                $rules[$class] = $style;
                $attributes = $before . $after;

                if (preg_match('/\sclass=(["\'])(.*?)\1/si', $attributes, $class_match)) {
                    $merged_class = trim($class_match[2] . ' ' . $class);
                    $attributes = preg_replace('/\sclass=(["\'])(.*?)\1/si', ' class="' . esc_attr($merged_class) . '"', $attributes, 1) ?? $attributes;
                    return '<' . $tag . $attributes . '>';
                }

                return '<' . $tag . $attributes . ' class="' . esc_attr($class) . '">';
            },
            $html
        );

        if (!is_string($rewritten) || $rules === []) {
            return $html;
        }

        $css = '';
        foreach ($rules as $class => $style) {
            $css .= '.' . $class . '{' . $style . '}';
        }

        return '<style nonce="' . esc_attr($this->get_csp_nonce()) . '">' . $css . '</style>' . $rewritten;
    }

    private function render_failsafe_ui(string $tool_id): void {
        ?>
        <div class="vgt-failsafe">
            <div class="vgt-failsafe-card">
                <svg viewBox="0 0 24 24" class="vgt-failsafe-icon" aria-hidden="true">
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h2 class="vgt-failsafe-title">MODULE_OFFLINE: <?php echo esc_html(strtoupper($tool_id)); ?></h2>
                <p class="vgt-failsafe-copy">Das angeforderte Tool ist aktuell nicht in der Kernmatrix verankert oder befindet sich im Konstruktionsmodus. Die Systemintegritaet bleibt unberuehrt.</p>

                <a href="?vgt_tool=dashboard" class="vgt-failsafe-link">
                    <svg viewBox="0 0 24 24" class="vgt-failsafe-link-icon" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    System Hub
                </a>
            </div>
        </div>
        <?php
    }

    private function render_global_shell(string $current_tool): void {
        ?>
        <div class="vgt-system-shell" data-current-tool="<?php echo esc_attr($current_tool); ?>">
            <div class="vgt-shell-primary">
                <a href="?vgt_tool=dashboard" class="vgt-shell-brand" aria-label="VGT Mediacenter Dashboard">
                    <span class="vgt-shell-orbit" aria-hidden="true">
                        <img src="<?php echo esc_url(VGT_GLOBAL_ASSETS . 'vgtcode.png'); ?>" alt="VGT" class="vgt-shell-logo">
                    </span>
                    <span class="vgt-shell-copy">
                        <span class="vgt-shell-title">VGT Mediacenter</span>
                        <span class="vgt-shell-subtitle">Local Intelligence Workstation</span>
                    </span>
                </a>

                <div class="vgt-shell-badges" aria-label="Systemstatus">
                    <span class="vgt-shell-badge tone-green">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="6" rx="2"></rect><rect x="4" y="14" width="16" height="6" rx="2"></rect><line x1="8" y1="7" x2="8.01" y2="7"></line><line x1="8" y1="17" x2="8.01" y2="17"></line></svg>
                        100% Lokal
                    </span>
                    <span class="vgt-shell-badge tone-blue">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>
                        Keine Cloud
                    </span>
                    <span class="vgt-shell-badge tone-purple">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
                        Privacy First
                    </span>
                </div>

                <button type="button" class="vgt-shell-mobile-toggle" id="vgt-shell-mobile-toggle" aria-expanded="false" aria-controls="vgt-shell-panel">
                    <span>Controls</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
            </div>

            <div class="vgt-shell-panel" id="vgt-shell-panel">
                <div class="vgt-shell-search">
                    <span class="vgt-shell-search-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    <input type="search" id="vg-search" class="vgt-shell-search-input search-input" autocomplete="off" spellcheck="false" placeholder="<?php echo esc_attr('Tools, Dateien, Privacy, PDF, Audio'); ?>">
                </div>

                <div class="vgt-shell-actions">
                    <a href="<?php echo esc_url('/Whitepaper'); ?>" class="vgt-shell-link">Whitepaper</a>
                    <a href="<?php echo esc_url('/'); ?>" class="vgt-shell-link">News</a>
                    <button type="button" class="vgt-shell-command" id="vgt-command-open">
                        <span>Tools suchen</span>
                        <kbd>Ctrl K</kbd>
                    </button>
                    <button type="button" class="vgt-shell-mode" id="vgt-mc-mode-toggle" data-dashboard-url="<?php echo esc_url('?vgt_tool=dashboard'); ?>" aria-pressed="false">
                        Desktop
                    </button>
                    <button type="button" id="btn-theme-desktop" class="vgt-shell-icon-btn" aria-label="Theme wechseln">
                        <span id="icon-theme-desktop"></span>
                    </button>
                    <span class="vgt-shell-status">Lokal aktiv</span>
                </div>
            </div>
        </div>

        <div class="vgt-recent-strip" id="vgt-recent-strip" aria-label="Zuletzt verwendete Tools"></div>
        <div class="vgt-command-layer" id="vgt-command-layer" aria-hidden="true"></div>
        <?php
    }

    private function render_client_config(string $current_tool): void {
        $config = [
            'assetsUrl' => esc_url_raw(VGT_GLOBAL_ASSETS),
            'baseUrl' => esc_url_raw(strtok((string)($_SERVER['REQUEST_URI'] ?? ''), '?') ?: ''),
            'cspNonce' => $this->get_csp_nonce(),
            'currentTool' => $current_tool,
            'tools' => $this->build_tool_manifest(),
        ];
        $json = wp_json_encode($config, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);

        if (!is_string($json)) {
            $json = '{}';
        }
        ?>
        <script nonce="<?php echo esc_attr($this->get_csp_nonce()); ?>">
            window.vgtCore = Object.freeze(<?php echo $json; ?>);
        </script>
        <?php
    }

    private function get_requested_tool(): string {
        $requested_tool = isset($_GET['vgt_tool']) ? sanitize_key((string)$_GET['vgt_tool']) : 'dashboard';

        if (!array_key_exists($requested_tool, $this->tools_config)) {
            return 'dashboard';
        }

        return $requested_tool;
    }

    private function get_csp_nonce(): string {
        if ($this->csp_nonce === null) {
            $this->csp_nonce = rtrim(strtr(base64_encode(random_bytes(16)), '+/', '-_'), '=');
        }

        return $this->csp_nonce;
    }

    private function build_tool_manifest(): array {
        $labels = [
            'dashboard' => ['Dashboard', 'System-Hub und Tool-Matrix', 'core'],
            'hashchecker' => ['Hashchecker', 'Datei-Integritaet mit SHA-Pruefung', 'privacy'],
            'har' => ['Browserdaten Analyse', 'HAR-Dateien lokal auswerten', 'privacy'],
            'stegano' => ['Stegano Vault', 'Nachrichten in Bilder einbetten', 'privacy'],
            'truthlense' => ['Truthlense', 'Text- und Dokument-Diffs pruefen', 'privacy'],
            'whistle' => ['VisionWhistleBlow', 'Text und PDF sicher schwaerzen', 'privacy'],
            'meta-clean' => ['Metadata Cleaner', 'EXIF- und GPS-Spuren entfernen', 'privacy'],
            'fingerprint' => ['Fingerprint Analyzer', 'Browser-Fingerprint sichtbar machen', 'privacy'],
            'pw-check' => ['Passwort Check', 'Passwortstaerke lokal bewerten', 'privacy'],
            'aes' => ['AES Encryption', 'Text und Dateien lokal verschluesseln', 'privacy'],
            'qr' => ['QR Generator', 'Offline QR-Codes erstellen', 'privacy'],
            'secret-scan' => ['Secret Scanner Pro', 'Keys, Tokens und .env-Leaks lokal finden', 'privacy'],
            'url-clean' => ['URL Cleaner Pro', 'Tracking-Parameter lokal entfernen', 'privacy'],
            'img-conv' => ['Bild Converter', 'Bilder lokal konvertieren', 'media'],
            'img-comp' => ['Bild Kompressor', 'Bildgroessen lokal reduzieren', 'media'],
            'pdf-merge' => ['PDF Merge', 'PDFs lokal zusammenfuehren', 'media'],
            'pdf-split' => ['PDF Split', 'PDF-Seiten lokal extrahieren', 'media'],
            'audio-conv' => ['Audio Studio Pro', 'Audio lokal analysieren und konvertieren', 'media'],
            'zipmaster' => ['ZIP Master', 'Archive lokal pruefen und entpacken', 'media'],
            'big5' => ['Big5 Profiling', 'Persoenlichkeitsprofil visualisieren', 'mind'],
            'jung' => ['Archetypen', 'Jung-Matrix lokal berechnen', 'mind'],
            'stress' => ['Stress & Fokus', 'Mentale Last analysieren', 'mind'],
            'moon' => ['Mondphasen', 'Lunare Telemetrie berechnen', 'cosmos'],
            'weather' => ['Wetter Live', 'Wetter ueber lokalen Proxy anzeigen', 'cosmos'],
            'bio' => ['Biorhythmus', 'Zyklen lokal berechnen', 'cosmos'],
            'cal' => ['Kalorien Pro', 'Kalorien und Makros berechnen', 'calc'],
            'unit' => ['Einheiten', 'Einheiten lokal umrechnen', 'calc'],
            'json' => ['JSON Tools', 'JSON formatieren und validieren', 'dev'],
            'cdash' => ['CSV Explorer', 'CSV/JSON lokal visualisieren', 'dev'],
            'coder' => ['Code Omega', 'Code-Diffs lokal analysieren', 'dev'],
            'cipherflow' => ['Cipher-Flow', 'Krypto-Pipelines bauen', 'dev'],
            'manifest' => ['Manifest Forge', 'SHA-256 Datei-Manifeste bauen und pruefen', 'dev'],
            'hexmap' => ['Hexmap', 'Dateien binaer inspizieren', 'dev'],
            'packetviz' => ['Packet-Viz', 'PCAP-Daten lokal visualisieren', 'dev'],
            'gitleaker' => ['Git Checker', 'Leaks vor Upload finden', 'dev'],
            'readme' => ['ReadMe Generator', 'Projekt-Readmes lokal bauen', 'dev'],
            'color' => ['Farb Tools', 'Farbraeume konvertieren', 'dev'],
            'freq' => ['Frequenzen', 'Binaural Beats generieren', 'creative'],
            'energy' => ['Stromrechner', 'Kosten und Verbrauch berechnen', 'calc'],
            'med' => ['Meditation', 'Timer und Soundscapes starten', 'creative'],
        ];

        $manifest = [];
        foreach ($this->tools_config as $id => $_config) {
            $entry = $labels[$id] ?? [ucwords(str_replace('-', ' ', $id)), 'Lokales Browser-Tool', 'tool'];
            $manifest[] = [
                'id' => $id,
                'title' => $entry[0],
                'desc' => $entry[1],
                'cat' => $entry[2],
                'url' => '?vgt_tool=' . $id,
            ];
        }

        return $manifest;
    }

    private function is_mediacenter_request(): bool {
        if (isset($_GET['vgt_tool'])) {
            return true;
        }

        if (function_exists('is_singular') && is_singular() && function_exists('get_queried_object_id')) {
            $post_id = get_queried_object_id();
            if ($post_id && function_exists('get_post_field') && function_exists('has_shortcode')) {
                return has_shortcode((string)get_post_field('post_content', $post_id), 'vgt_mediacenter');
            }
        }

        return false;
    }

    private function is_iframe_request(): bool {
        $value = isset($_GET['vgt_iframe']) ? sanitize_key((string)$_GET['vgt_iframe']) : '';
        return $value === '1' || $value === 'true';
    }
}
