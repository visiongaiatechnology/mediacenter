<?php
declare(strict_types=1);

if (!defined('ABSPATH')) exit;

/**
 * VGT SUPREME TOOL REGISTRY
 * Vollständige Matrix aller 26 Tools.
 * System-Trigger: ?vgt_tool={key}
 */
return [
    'dashboard'   => ['path' => 'dashboard',   'deps_css' => [], 'deps_js' => []],
    
    // Privacy & Security
    'hashchecker' => ['path' => 'hashchecker', 'deps_css' => [], 'deps_js' => ['vgt-crypto']],
    'har'         => ['path' => 'har',         'deps_css' => [], 'deps_js' => ['vgt-apexcharts']],
    'stegano'     => ['path' => 'stegano', 'deps_css'     => [], 'deps_js' => ['vgt-crypto']],
    'truthlense'  => ['path' => 'truthlense',  'deps_css' => [], 'deps_js' => ['vgt-diff']],
    'whistle'     => ['path' => 'whistle',     'deps_css' => [], 'deps_js' => ['vgt-pdf-lib', 'vgt-pdf', 'vgt-pdf-worker']],
    'meta-clean'  => ['path' => 'metaclean',   'deps_css' => [], 'deps_js' => ['vgt-exif', 'vgt-exif-reader', 'vgt-heic2any']],
    'fingerprint' => ['path' => 'fingerprint', 'deps_css' => [], 'deps_js' => []],
    'pw-check'    => ['path' => 'pwcheck',     'deps_css' => [], 'deps_js' => ['vgt-crypto']],
    'aes'         => ['path' => 'aes',         'deps_css' => [], 'deps_js' => []],
    'qr'          => ['path' => 'qr',          'deps_css' => [], 'deps_js' => ['vgt-qr']],
    'secret-scan' => ['path' => 'secretscan',  'deps_css' => [], 'deps_js' => ['vgt-jszip']],
    'url-clean'   => ['path' => 'urlclean',    'deps_css' => [], 'deps_js' => []],

    // Media Processing
    'img-conv'    => ['path' => 'imgconv',     'deps_css' => [], 'deps_js' => []],
    'img-comp'    => ['path' => 'imgcomp',     'deps_css' => [], 'deps_js' => ['vgt-compressor']],
    'pdf-merge'   => ['path' => 'pdfmerge',    'deps_css' => [], 'deps_js' => ['vgt-pdf-lib', 'vgt-filesaver']],
    'pdf-split'   => ['path' => 'pdfsplit',    'deps_css' => [], 'deps_js' => ['vgt-pdf-lib', 'vgt-filesaver']],
    'audio-conv'  => ['path' => 'audiostudio', 'deps_css' => [], 'deps_js' => ['vgt-wavesurfer', 'vgt-lame']],
    'zipmaster'   => ['path' => 'zipmaster',   'deps_css' => [], 'deps_js' => ['vgt-jszip', 'vgt-filesaver']],

    // Mind & Psychology
    'big5'        => ['path' => 'big5',        'deps_css' => [], 'deps_js' => ['vgt-chart']],
    'jung'        => ['path' => 'jung',        'deps_css' => [], 'deps_js' => []],
    'stress'      => ['path' => 'stress',      'deps_css' => [], 'deps_js' => ['vgt-chart']],

    // Cosmos & Environment
    'moon'        => ['path' => 'moon',        'deps_css' => [], 'deps_js' => ['vgt-suncalc']],
    'weather'     => ['path' => 'weather',     'deps_css' => ['vgt-leaflet'], 'deps_js' => ['vgt-leaflet']],
    'bio'         => ['path' => 'bio',         'deps_css' => [], 'deps_js' => ['vgt-chart']],

    // Calculation & Conversion
    'cal'         => ['path' => 'cal',         'deps_css' => [], 'deps_js' => []],
    'unit'        => ['path' => 'unit',        'deps_css' => [], 'deps_js' => []],

    // Developer & Creative
    'json'        => ['path' => 'json',        'deps_css' => [], 'deps_js' => []],
    'cdash'       => ['path' => 'cdash',       'deps_css' => [], 'deps_js' => ['vgt-papaparse', 'vgt-apexcharts', 'vgt-lucide']],
    'coder'       => ['path' => 'coder',        'deps_css' => [], 'deps_js' => []],
    'cipherflow'  => ['path' => 'cipherflow',  'deps_css' => [], 'deps_js' => ['vgt-crypto']],
    'manifest'    => ['path' => 'manifest',    'deps_css' => [], 'deps_js' => []],
    'hexmap'      => ['path' => 'hexmap',      'deps_css' => [], 'deps_js' => []],
    'packetviz'   => ['path' => 'packetviz',   'deps_css' => [], 'deps_js' => ['vgt-d3']],
    'gitleaker'   => ['path' => 'gitleaker',   'deps_css' => [], 'deps_js' => ['vgt-jszip']],
    'readme'      => ['path' => 'readme',      'deps_css' => [], 'deps_js' => []],
    'color'       => ['path' => 'color',       'deps_css' => [], 'deps_js' => []],
    'freq'        => ['path' => 'freq',        'deps_css' => [], 'deps_js' => []],
    'energy'      => ['path' => 'energy',      'deps_css' => [], 'deps_js' => ['vgt-papaparse', 'vgt-apexcharts']],
    'med'         => ['path' => 'med',         'deps_css' => [], 'deps_js' => ['vgt-wavesurfer']],
];
