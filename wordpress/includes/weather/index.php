<?php
/**
 * VGT MEDIACENTER - ATMOSPHERIC RADAR (WEATHER & AQI)
 * STATUS: DIAMANT SUPREME (Hardened PHP Template)
 * Vektor: XSS, Zero-Trust RAM Proxy, Anti-IP-Leak & COEP-Bypass
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

// =========================================================================
// VGT ZERO-TRUST RAM-PROXY (COEP-BYPASS & IP-ANONYMISIERUNG)
// =========================================================================
if (isset($_GET['vgt_weather_proxy'])) {
    $proxy_type = sanitize_text_field($_GET['vgt_weather_proxy']);
    $url = '';

    if ($proxy_type === 'tile') {
        $z = max(0, min(19, (int)($_GET['z'] ?? 0)));
        $x = max(0, (int)($_GET['x'] ?? 0));
        $y = max(0, (int)($_GET['y'] ?? 0));
        $servers = ['a', 'b', 'c'];
        $server  = $servers[array_rand($servers)];
        $url = "https://{$server}.tile.openstreetmap.org/{$z}/{$x}/{$y}.png";
        
    } elseif ($proxy_type === 'geocode') {
        $query = urlencode(substr(sanitize_text_field($_GET['query'] ?? ''), 0, 100));
        $url = "https://geocoding-api.open-meteo.com/v1/search?name={$query}&count=5&language=de&format=json";
        
    } elseif ($proxy_type === 'forecast') {
        $lat = max(-90.0, min(90.0, (float)($_GET['lat'] ?? 0)));
        $lng = max(-180.0, min(180.0, (float)($_GET['lng'] ?? 0)));
        $url = "https://api.open-meteo.com/v1/forecast?latitude={$lat}&longitude={$lng}&current=temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=auto";
        
    } elseif ($proxy_type === 'aqi') {
        $lat = max(-90.0, min(90.0, (float)($_GET['lat'] ?? 0)));
        $lng = max(-180.0, min(180.0, (float)($_GET['lng'] ?? 0)));
        $url = "https://air-quality-api.open-meteo.com/v1/air-quality?latitude={$lat}&longitude={$lng}&current=european_aqi,pm10,pm2_5,nitrogen_dioxide&timezone=auto";
    }

    if ($url !== '') {
        $response = wp_remote_get($url, [
            'timeout'    => 10,
            // VGT Patch: Standard Browser UA um API Blockaden durch Host-Firewalls zu umgehen
            'user-agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ]);

        // GANZ WICHTIG: Output-Buffer IMMER flushen, bevor wir die Response rausschicken.
        // Verhindert das "Unexpected token < in JSON" Problem, wenn WordPress sein HTML dazwischenschiebt.
        while (ob_get_level()) { ob_end_clean(); }

        if (is_wp_error($response)) {
            header('Content-Type: application/json');
            header('Cross-Origin-Resource-Policy: cross-origin');
            echo json_encode(['error' => 'wp_remote_get failed', 'details' => $response->get_error_message()]);
            exit;
        }

        $code = wp_remote_retrieve_response_code($response);
        
        if ($code === 200) {
            $content_type = wp_remote_retrieve_header($response, 'content-type');
            if (!$content_type) {
                $content_type = ($proxy_type === 'tile') ? 'image/png' : 'application/json';
            }

            header("Content-Type: " . sanitize_text_field($content_type));
            header('Cross-Origin-Resource-Policy: cross-origin');
            header('Access-Control-Allow-Origin: *');
            header('Cache-Control: public, max-age=3600'); 
            
            echo wp_remote_retrieve_body($response);
            exit;
        } else {
            // API hat geantwortet, aber mit Fehlercode (z.B. 400 Bad Request)
            header('Content-Type: application/json');
            header('Cross-Origin-Resource-Policy: cross-origin');
            echo json_encode(['error' => "API returned HTTP $code", 'url' => $url, 'body' => wp_remote_retrieve_body($response)]);
            exit;
        }
    }
    
    // Failsafe Exit für unbekannte Parameter
    while (ob_get_level()) { ob_end_clean(); }
    header('Content-Type: application/json');
    header('Cross-Origin-Resource-Policy: cross-origin');
    echo json_encode(['error' => 'Invalid proxy parameters']);
    exit;
}
// =========================================================================

/**
 * Dependencies: Leaflet (CSS & JS) 
 * Werden durch den Core-Router via SRI bereitgestellt.
 */
$text_domain = 'vgt-mediacenter';
?>

<div class="vgt-tool-wrapper" id="<?php echo esc_attr('vgt-weather'); ?>">
    
    <!-- Hero Header: Navigation und systemische Identität -->
    <div class="tool-hero">
        <a href="<?php echo esc_url('?vgt_tool=dashboard'); ?>" class="btn-back">
            <svg viewBox="0 0 24 24" class="svg-icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span><?php echo esc_html__('System Hub', $text_domain); ?></span>
        </a>
        <div class="hero-content">
            <div class="hero-icon-wrapper ar-glow">
                <svg viewBox="0 0 24 24" class="hero-icon">
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path><path d="M12 20v2"></path>
                    <path d="M5 5l1.5 1.5"></path><path d="M17.5 17.5L19 19"></path>
                    <path d="M2 12h2"></path><path d="M20 12h2"></path>
                    <path d="M5 19l1.5-1.5"></path><path d="M17.5 6.5L19 5"></path>
                </svg>
            </div>
            <div>
                <h2 class="tool-title"><?php echo esc_html__('VGT Atmospheric Radar', $text_domain); ?></h2>
                <p class="tool-desc">
                    <?php echo esc_html__('Echtzeit-Wettertelemetrie und atmosphärische Prognosen. Angetrieben durch die 100% IP-anonymisierte VGT Zero-Trust Proxy-Engine im RAM.', $text_domain); ?>
                </p>
            </div>
        </div>
    </div>

    <!-- Interface Body -->
    <div class="tool-body ar-layout">
        
        <!-- Left: Control & Radar Panel (Geopositionierung) -->
        <div class="glass-panel ar-radar-panel">
            <div class="panel-header">
                <span class="panel-label"><?php echo esc_html__('Globale Geopositionierung', $text_domain); ?></span>
                <span class="status-badge" id="<?php echo esc_attr('ar-sync-status'); ?>">
                    <span class="pulse-dot"></span> <span id="<?php echo esc_attr('ar-status-text'); ?>"><?php echo esc_html__('Synchronisiere...', $text_domain); ?></span>
                </span>
            </div>

            <!-- Search Console: Terminal-basierte Standortsuche -->
            <div class="ar-search-console">
                <div class="terminal-input-wrap">
                    <span class="terminal-prefix"><svg viewBox="0 0 24 24" class="svg-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
                    <input type="text" 
                           id="<?php echo esc_attr('ar-search-input'); ?>" 
                           class="ar-terminal-input" 
                           placeholder="<?php echo esc_attr__('Stadt eingeben (z.B. Tokyo, Berlin)...', $text_domain); ?>">
                    <button id="<?php echo esc_attr('btn-geolocate'); ?>" class="btn-icon-small" title="<?php echo esc_attr__('Lokales GPS abfragen', $text_domain); ?>">
                        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .11 1.89l1.8 2.6a2 2 0 0 1-3.24 2.14L15.3 19a1.65 1.65 0 0 0-1.92.1l-2.6 1.8a2 2 0 0 1-2.14-3.24l1.8-2.6a1.65 1.65 0 0 0 .1-1.92L8.6 10.6a2 2 0 0 1 3.24-2.14l2.77 1.93a1.65 1.65 0 0 0 1.89.11l2.6-1.8a2 2 0 0 1 2.14 3.24l-1.8 2.6z"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M2 12h4"></path><path d="M18 12h4"></path></svg>
                    </button>
                </div>
                <!-- Mounting Point für dynamische Standort-Ergebnisse -->
                <div id="<?php echo esc_attr('ar-search-results'); ?>" class="ar-search-results hidden"></div>
            </div>

            <!-- Dark Matter Map: Leaflet Container -->
            <div class="ar-map-container" id="<?php echo esc_attr('ar-map'); ?>">
                <div class="map-loader" id="<?php echo esc_attr('ar-map-loader'); ?>">
                    <div class="spinner"></div>
                    <span><?php echo esc_html__('Satelliten-Uplink wird hergestellt...', $text_domain); ?></span>
                </div>
            </div>

            <div class="ar-geo-meta">
                <div class="geo-row">
                    <span class="geo-key"><?php echo esc_html__('Ziel-Koordinaten:', $text_domain); ?></span>
                    <span class="geo-val terminal-text" id="<?php echo esc_attr('val-coords'); ?>">LAT 00.00 | LNG 00.00</span>
                </div>
                <div class="geo-row">
                    <span class="geo-key"><?php echo esc_html__('Höhe (Elevation):', $text_domain); ?></span>
                    <span class="geo-val terminal-text" id="<?php echo esc_attr('val-elevation'); ?>">0 m</span>
                </div>
            </div>
        </div>

        <!-- Right: Telemetry Dashboard (Atmosphärische Daten) -->
        <div class="ar-data-layout">
            
            <!-- Current Main Stats: Echtzeit-Vektor -->
            <div class="glass-panel ar-main-stats">
                <div class="current-weather-hero">
                    <div class="weather-icon-large" id="<?php echo esc_attr('cw-icon'); ?>">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M5 5l1.5 1.5"></path><path d="M17.5 17.5L19 19"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M5 19l1.5-1.5"></path><path d="M17.5 6.5L19 5"></path></svg>
                    </div>
                    <div class="weather-core-data">
                        <span class="location-name" id="<?php echo esc_attr('cw-location'); ?>"><?php echo esc_html__('Lokalisierung...', $text_domain); ?></span>
                        <div class="temp-wrap">
                            <span class="temp-val" id="<?php echo esc_attr('cw-temp'); ?>">--</span>
                            <span class="temp-unit">°C</span>
                        </div>
                        <span class="weather-desc" id="<?php echo esc_attr('cw-desc'); ?>"><?php echo esc_html__('Datenstrom ausstehend', $text_domain); ?></span>
                    </div>
                </div>

                <div class="current-metrics-grid">
                    <div class="metric-box">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"></path></svg>
                        <span class="m-val" id="<?php echo esc_attr('met-humidity'); ?>">--%</span>
                        <span class="m-lbl"><?php echo esc_html__('Luftfeuchte', $text_domain); ?></span>
                    </div>
                    <div class="metric-box">
                        <svg viewBox="0 0 24 24" class="svg-icon"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>
                        <span class="m-val" id="<?php echo esc_attr('met-wind'); ?>">-- km/h</span>
                        <span class="m-lbl"><?php echo esc_html__('Windgeschw.', $text_domain); ?></span>
                    </div>
                    <div class="metric-box">
                        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
                        <span class="m-val" id="<?php echo esc_attr('met-pressure'); ?>">-- hPa</span>
                        <span class="m-lbl"><?php echo esc_html__('Luftdruck', $text_domain); ?></span>
                    </div>
                    <div class="metric-box">
                        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="11" x2="12" y2="13"></line><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                        <span class="m-val highlight-cyan" id="<?php echo esc_attr('met-uv'); ?>">--</span>
                        <span class="m-lbl"><?php echo esc_html__('UV Max Index', $text_domain); ?></span>
                    </div>
                </div>
            </div>

            <!-- Air Quality Panel: Atmosphärische Heuristik -->
            <div class="glass-panel ar-air-quality">
                <div class="panel-header" style="margin-bottom: 1.5rem; border-bottom: none; padding-bottom: 0;">
                    <span class="panel-label"><?php echo esc_html__('Atmosphärische Zusammensetzung', $text_domain); ?></span>
                    <span class="status-badge" id="<?php echo esc_attr('aqi-badge'); ?>">
                        <span class="pulse-dot"></span> <span id="<?php echo esc_attr('aqi-status-text'); ?>"><?php echo esc_html__('Warte auf Sensor...', $text_domain); ?></span>
                    </span>
                </div>
                
                <div class="aqi-grid">
                    <div class="aqi-box">
                        <span class="aqi-val" id="<?php echo esc_attr('aqi-pm25'); ?>">--</span>
                        <span class="aqi-lbl"><?php echo esc_html__('PM2.5 (µg/m³)', $text_domain); ?></span>
                    </div>
                    <div class="aqi-box">
                        <span class="aqi-val" id="<?php echo esc_attr('aqi-pm10'); ?>">--</span>
                        <span class="aqi-lbl"><?php echo esc_html__('PM10 (µg/m³)', $text_domain); ?></span>
                    </div>
                    <div class="aqi-box">
                        <span class="aqi-val" id="<?php echo esc_attr('aqi-no2'); ?>">--</span>
                        <span class="aqi-lbl"><?php echo esc_html__('NO₂ (µg/m³)', $text_domain); ?></span>
                    </div>
                </div>
            </div>

            <!-- Forecast Strip: 7-Tage Orbital-Prognose -->
            <div class="glass-panel ar-forecast">
                <div class="panel-header" style="margin-bottom: 1rem; border-bottom: none;">
                    <span class="panel-label"><?php echo esc_html__('7-Tage Orbital-Prognose', $text_domain); ?></span>
                </div>
                <!-- Mounting Point für dynamische Vorhersage-Karten -->
                <div class="forecast-grid" id="<?php echo esc_attr('forecast-container'); ?>"></div>
            </div>

        </div>

    </div>
</div>