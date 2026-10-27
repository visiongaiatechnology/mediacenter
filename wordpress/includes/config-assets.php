<?php
declare(strict_types=1);

if (!defined('ABSPATH')) exit;

/**
 * VGT SUPREME ASSET REGISTRY
 * Deklarative Liste aller verfügbaren Scripts und Styles aus dem Gaiastore.
 */
return [
    'styles' => [
        'vgt-font-inter'       => 'google-fonts-inter.css',
        'vgt-font-mono'        => 'JetBrainsMono-Regular.woff2', // Note: Webfonts via CSS load
        'vgt-font-merri'       => 'google-fonts-merriweather.css',
        'vgt-font-vision'      => 'google-fonts-vision-ui.css',
        'vgt-phosphor'         => 'phosphor/regular/style.css',
        'vgt-phosphor-bold'    => 'phosphor/bold/style.css',
        'vgt-lucide'           => 'lucide.js', // JS based icons
        'vgt-font-awesome'     => 'font-awesome.min.css',
        'vgt-remix'            => 'remixicon.css',
        'vgt-prism'            => 'prism-tomorrow.min.css',
        'vgt-swiper'           => 'swiper-bundle.min.css',
        'vgt-quill'            => 'quill.snow.css',
        'vgt-leaflet'          => 'leaflet.css',
        'vgt-markercluster'    => 'MarkerCluster.css',
        'vgt-cropper'          => 'cropper.min.css',
    ],
    'scripts' => [
        'vgt-tailwind'         => 'tailwind-jit.js',
        'vgt-alpine'           => 'alpine.min.js',
        'vgt-htmx'             => 'htmx.min.js',
        'vgt-crypto'           => 'crypto-js.min.js',
        'vgt-diff'             => 'diff.min.js',
        'vgt-vue'              => 'vue.global.js',
        'vgt-lodash'           => 'lodash.min.js',
        'vgt-moment'           => 'moment.min.js',
        'vgt-dayjs'            => 'dayjs.min.js',
        'vgt-axios'            => 'axios.min.js',
        'vgt-uuid'             => 'uuid.min.js',
        'vgt-swiper'           => 'swiper-bundle.min.js',
        'vgt-gsap'             => 'gsap.min.js',
        'vgt-scrolltrigger'    => 'ScrollTrigger.min.js',
        'vgt-tippy'            => 'tippy-bundle.umd.min.js',
        'vgt-popper'           => 'popper.min.js',
        'vgt-fullcalendar'     => 'fullcalendar.min.js',
        'vgt-sweetalert'       => 'sweetalert2.all.min.js',
        'vgt-sortable'         => 'Sortable.min.js',
        'vgt-quill'            => 'quill.min.js',
        'vgt-pdf'              => 'pdf.min.js',
        'vgt-qr'               => 'qrcode.min.js',
        'vgt-pdf-worker'       => 'pdf.worker.min.js',
        'vgt-pdf-lib'          => 'pdf-lib.min.js',
        'vgt-jspdf'            => 'jspdf.umd.min.js',
        'vgt-html2canvas'      => 'html2canvas.min.js',
        'vgt-chart'            => 'chart.min.js',
        'vgt-apexcharts'       => 'apexcharts.js',
        'vgt-d3'               => 'd3.v7.min.js',
        'vgt-leaflet'          => 'leaflet.js',
        'vgt-markercluster'    => 'leaflet.markercluster.js',
        'vgt-globe'            => 'globe.gl.min.js',
        'vgt-exif'             => 'exif.min.js',
        'vgt-exif-reader'      => 'exif-reader.min.js',
        'vgt-heic2any'         => 'heic2any.min.js',
        'vgt-cropper'          => 'cropper.min.js',
        'vgt-compressor'       => 'compressor.min.js',
        'vgt-lame'             => 'lame.min.js',
        'vgt-wavesurfer'       => 'wavesurfer.min.js',
        'vgt-hls'              => 'hls.js',
        'vgt-suncalc'          => 'suncalc.min.js',
        'vgt-filesaver'        => 'FileSaver.min.js',
        'vgt-jszip'            => 'jszip.min.js',
        'vgt-papaparse'        => 'papaparse.min.js',
        'vgt-purify'           => 'purify.min.js',
    ]
];