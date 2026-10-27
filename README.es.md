<!-- ========================================================
     VGT MEDIACENTER V1.0 BETA — DOCUMENTACIÓN EN ESPAÑOL
     Estándar: VisionGaiaTechnology /vgt-github-pusher
     ======================================================== -->

<div align="center">

# VGT Mediacenter V1.0 Beta

**Estación de Trabajo de Escritorio Soberana y Ecosistema Blindado para WordPress**  
*Invariante 100% del Lado del Cliente • Zero Cloud • Cero Telemetría • 40 Aplicaciones Nativas*

---

### Selección de Idioma / Language Selection

[🇩🇪 Deutsch](README.de.md) • [🇬🇧 English](README.md) • [🇷🇺 Русский](README.ru.md) • [🇪🇸 Español](README.es.md) • [🇮🇹 Italiano](README.it.md) • [🇨🇳 简体中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇫🇷 Français](README.fr.md)

---

[![Versión](https://img.shields.io/badge/versión-1.0.0--beta-06b6d4?style=for-the-badge)](https://github.com/VisionGaiaTechnology/VGT-Mediacenter)
[![Licencia](https://img.shields.io/badge/licencia-AGPL--3.0-blue?style=for-the-badge)](LICENSE)
[![Plataformas](https://img.shields.io/badge/plataforma-Windows%20%7C%20Linux%20%7C%20WordPress-a855f7?style=for-the-badge)](https://github.com/VisionGaiaTechnology/VGT-Mediacenter)
[![Arquitectura](https://img.shields.io/badge/arquitectura-100%25%20Offline%20Soberana-22c55e?style=for-the-badge)](docs/architecture.md)
[![Privacidad](https://img.shields.io/badge/privacidad-Cero%20Telemetría-10b981?style=for-the-badge)](SECURITY.md)
[![Herramientas](https://img.shields.io/badge/herramientas-40%20Apps%20Integradas-f59e0b?style=for-the-badge)](#las-40-aplicaciones-soberanas)

</div>

> [!WARNING]
> **Estado de Beta Pública:** VGT Mediacenter V1.0 Beta se encuentra en fase activa de pruebas beta. Los 40 módulos principales operan 100% de forma local, sin dependencias de la nube. Son bienvenidos los comentarios de la comunidad, revisiones de seguridad e informes de errores.

---

## 🚀 Descarga rápida e instalación

Selecciona tu plataforma para obtener el paquete autónomo precompilado:

| Plataforma | Formato / Paquete | Tamaño | Descarga directa | Verificación (SHA-256) |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** (x64) | Ejecutable portátil `.exe` | ~61 MB | [⬇️ **Descargar para Windows**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/VGT-Mediacenter-Supreme-Windows-x64.exe) | `deecfc78ecb9...` |
| **Linux** (x86_64) | Paquete portátil `.tar.gz` | ~22 MB | [⬇️ **Descargar para Linux**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-linux/VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz) | `4c8246ea4bf6...` |
| **WordPress** | Plugin independiente `.zip` | ~19 MB | [⬇️ **Descargar plugin ZIP**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/vgt-mediacenter-wordpress-plugin.zip) | `4d1d1200791a...` |

> [!TIP]
> **Sin instalación requerida:** Las versiones de escritorio se ejecutan directamente sin dependencias externas ni instaladores de administrador. Para WordPress, sube el archivo `.zip` en **Plugins > Añadir nuevo > Subir plugin**.

---

## Índice de Contenidos
1. [Introducción y Filosofía](#introducción-y-filosofía)
2. [Características Principales](#características-principales)
3. [Las 40 Aplicaciones Soberanas](#las-40-aplicaciones-soberanas)
   * [Privacidad y Seguridad (12 Aplicaciones)](#1-privacidad-y-seguridad)
   * [Procesamiento de Medios y Documentos (6 Aplicaciones)](#2-procesamiento-de-medios-y-documentos)
   * [Desarrollo y Forense Binario (9 Aplicaciones)](#3-desarrollo-y-forense-binario)
   * [Calculadoras y Utilidades (3 Aplicaciones)](#4-calculadoras-y-utilidades)
   * [Creatividad y Síntesis de Audio (2 Aplicaciones)](#5-creatividad-y-síntesis-de-audio)
   * [Mente y Análisis Psicológico (3 Aplicaciones)](#6-mente-y-análisis-psicológico)
   * [Cosmos y Telemetría (3 Aplicaciones)](#7-cosmos-y-telemetría)
   * [Núcleo del Sistema (2 Aplicaciones)](#8-núcleo-del-sistema)
4. [Instalación y Ejecución](#instalación-y-ejecución)
   * [Windows Desktop](#windows-desktop)
   * [Linux Desktop](#linux-desktop)
   * [Plugin para WordPress](#plugin-para-wordpress)
5. [Arquitectura Multilingüe (i18n)](#arquitectura-multilingüe-i18n)
6. [Seguridad y Principio de Confianza Cero](#seguridad-y-principio-de-confianza-cero)
7. [Licencia (AGPLv3)](#licencia)
8. [Dependencias de Terceros y Reconocimientos](#dependencias-de-terceros-y-reconocimientos)

---

## Introducción y Filosofía

Los entornos de software modernos obligan con frecuencia al usuario a depender de monopolios en la nube, exigiendo conexiones permanentes a Internet, suscripciones recurrentes y ceder datos privados a servidores remotos de telemetría.

**VGT Mediacenter** rechaza categóricamente este paradigma. Es una **estación de trabajo local orientada a la soberanía digital**, equipada con 40 herramientas de grado industrial para criptografía, análisis forense de documentos, procesamiento de audio, desarrollo, cálculos matemáticos y preservación rigurosa de la privacidad.

### Garantías de Arquitectura:
* **Zero Cloud:** Sin servidores, sin balizas de rastreo, sin pings analíticos ni llamadas remotas a APIs.
* **Procesamiento 100% en Memoria:** Los archivos cargados en las herramientas jamás abandonan la memoria RAM local del equipo. El hashing criptográfico, la redacción de PDFs y el análisis de audio se ejecutan íntegramente en memoria mediante Web APIs de HTML5 y WebAssembly.
* **Portabilidad Determinista:** Experiencia idéntica tanto si se ejecuta como aplicación de escritorio nativa sin bordes en Windows y Linux, como si se despliega como shortcode protegido dentro de intranets con WordPress.

---

## Características Principales

* **Interfaz Glass 2100 Sovereign:** Lenguaje de diseño Obsidian Glass con filtros de desenfoque por hardware (`blur(28px)`), superficies pulidas sin rejillas molestas y elegantes acentos cian luminiscentes.
* **Controles de Ventana Nativos:** Botones integrados a medida (Minimizar, Maximizar / Restaurar, Cerrar) sincronizados con Wails v2 y los gestores de ventanas de cada sistema operativo.
* **Arranque Instantáneo (Sub-Segundo):** Manifiestos precompilados en memoria que eliminan bloqueos de CORS bajo protocolo de archivos, iniciando la estación en menos de 600 ms.
* **Soporte Completo de 8 Idiomas:** Deutsch, English, Русский, Español, Italiano, 简体中文, 日本語 y Français — homogéneo y constante a través de las 40 aplicaciones.

---

## Las 40 Aplicaciones Soberanas

### 1. Privacidad y Seguridad

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Comprobador de Hash** | `hashchecker` | **Verificación de Integridad Criptográfica:** Calcula sumas de verificación SHA-1, SHA-256, SHA-384, SHA-512 y MD5 directamente en la memoria del navegador mediante `crypto.subtle.digest()`. Compara contra hashes de referencia para detectar manipulaciones o corrupciones. |
| **Cifrado AES** | `aes` | **Bóveda Criptográfica Local:** Cifra y descifra textos y archivos localmente usando el estándar AES-256-GCM con derivación de claves PBKDF2 (100.000 iteraciones). Genera vectores de inicialización (IV) criptográficamente aleatorios para cada sesión. |
| **Bóveda Esteganográfica** | `stegano` | **Ocultación Esteganográfica de Datos:** Incrusta cargas de texto cifrado en los bits menos significativos (LSB) de los canales RGB de las imágenes. Visualmente idéntica al original y descifrable únicamente con la clave correcta. |
| **Limpiador de Metadatos** | `meta-clean` | **Purga Forense de Metadatos:** Analiza archivos JPEG, PNG, TIFF y HEIC a nivel de cabeceras binarias. Elimina por completo etiquetas EXIF, coordenadas GPS, números de serie de dispositivos y metadatos del firmware de la cámara. |
| **VisionWhistleBlow** | `whistle` | **Censura y Redacción Irreversible de Documentos:** Emplea `pdf-lib` para eliminar de forma permanente fragmentos de texto y colocar bloques negros opacos sobre coordenadas sensibles en el DOM del PDF, impidiendo la recuperación del contenido. |
| **Analizador de Huella Digital** | `fingerprint` | **Auditoría de Entropía del Navegador:** Evalúa el renderizado de Canvas 2D, cadenas del renderizador WebGL, latencia de AudioContext y concurrencia de hardware para evidenciar cómo las redes publicitarias identifican el dispositivo. |
| **Verificador de Contraseñas** | `pw-check` | **Estimador de Entropía y Fuerza Bruta:** Calcula la entropía de la cadena ($H = L \cdot \log_2(N)$), verifica contra listas comunes de diccionarios y simula tiempos de ruptura en clústeres de GPUs sin transmitir la contraseña a la red. |
| **Truthlense Comparador** | `truthlense` | **Motor de Diferencias en Textos y Documentos:** Calcula discrepancias a nivel de caracteres, palabras y líneas entre dos textos mediante el algoritmo de diferencias de Myers. Resalta adiciones, eliminaciones y sutiles cambios en espacios en blanco. |
| **Escáner de Secretos** | `secret-scan` | **Detector de Fugas de Credenciales:** Analiza archivos de configuración, scripts y logs en busca de claves API, tokens de AWS, PATs de GitHub y claves privadas utilizando expresiones regulares y puntuación de entropía de Shannon. |
| **Limpiador de URL** | `url-clean` | **Purga de Parámetros de Rastreo:** Elimina etiquetas UTM, Facebook Click IDs (`fbclid`), Google Click IDs (`gclid`), redirecciones de afiliados y tokens de telemetría de enlaces web antes de navegar. |
| **Análisis de Navegador HAR** | `har` | **Inspector de Archivos de Red:** Analiza volcados HTTP Archive (`.har`) de forma estrictamente local. Visualiza cascadas de peticiones (waterfall), cabeceras, cookies y latencias con ApexCharts sin subir datos de sesión a servidores externos. |
| **Generador QR** | `qr` | **Forja y Lector de Códigos QR Offline:** Codifica textos, claves Wi-Fi y direcciones criptográficas en códigos QR vectoriales de alta definición, decodificando imágenes capturadas directamente en memoria. |

### 2. Procesamiento de Medios y Documentos

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Conversor de Imágenes** | `img-conv` | **Transcodificación de Formatos en Memoria:** Convierte imágenes entre WebP, PNG, JPEG, BMP e ICO mediante renderizado en HTML5 Canvas y exportación a objetos Blob locales. |
| **Compresor de Imágenes** | `img-comp` | **Compresión con o sin Pérdida:** Utiliza interpolación bicúbica y algoritmos Pica para reducir el tamaño de las imágenes hasta un 85% preservando la nitidez y el detalle visual. |
| **Fusionar PDF** | `pdf-merge` | **Concatenador de Documentos:** Une múltiples archivos PDF independientes en un único flujo documental con `pdf-lib`, manteniendo vectores, campos de formulario y tipografías incrustadas. |
| **Dividir PDF** | `pdf-split` | **Extractor de Rangos de Páginas:** Divide archivos PDF de múltiples hojas en páginas individuales o intervalos específicos, generando descargas instantáneas en archivos ZIP locales. |
| **Estudio de Audio Pro** | `audio-conv` | **Visualizador Espectral y Motor de Sonido:** Renderiza formas de onda en tiempo real mediante la WebAudio API, graba audio de micrófono en formato WAV/WebM sin pérdida y analiza el espectro de frecuencias. |
| **ZIP Master** | `zipmaster` | **Inspector y Extractor de Archivos Comprimidos:** Lee y descomprime archivos ZIP convencionales en la RAM del navegador mediante `JSZip`, permitiendo la extracción selectiva sin tocar el disco. |

### 3. Desarrollo y Forense Binario

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Herramientas JSON** | `json` | **Inspector y Formateador Estructural JSON:** Formatea, valida, repara sintaxis rota y navega árboles JSON con resaltado de código, conteo de tokens y validación contra esquemas. |
| **Explorador CSV** | `cdash` | **Estación de Análisis de Datos Tabulares:** Procesa archivos masivos CSV y TSV mediante PapaParse. Ofrece filtrado multicriterio, ordenamiento, agregaciones numéricas y gráficos estadísticos. |
| **Code Omega** | `coder` | **Diferencias de Código y Entorno de Análisis:** Analizador de sintaxis y comparador de código fuente en paralelo compatible con JavaScript, TypeScript, Python, Go, PHP y SQL. |
| **Cipher-Flow** | `cipherflow` | **Constructor Visual de Pipelines Criptográficos:** Entorno modular que enlaza fases de codificación y cifrado (por ejemplo: Hex $\to$ Base64 $\to$ AES $\to$ SHA-256) en flujos de transformación automáticos. |
| **Forja de Manifiestos** | `manifest` | **Constructor de Integridad de Directorios:** Escanea de forma recursiva carpetas locales y compila un manifiesto estandarizado con sumas SHA-256 (`manifest.json`) para auditar la integridad de releases. |
| **Hexmap Inspector Binario** | `hexmap` | **Visor Hexadecimal de Bajo Nivel:** Muestra streams de bytes en crudo, desplazamientos de memoria, representación ASCII y magic numbers para ingeniería inversa de firmas de archivo. |
| **Packet-Viz** | `packetviz` | **Visualizador de Tráfico de Red PCAP:** Examina volcados de Wireshark (`.pcap`) en local. Genera matrices de conversación IP, histogramas de tamaño de paquete y jerarquías de protocolos mediante D3.js. |
| **Git Checker** | `gitleaker` | **Auditoría Pre-Commit de Repositorios:** Analiza repositorios Git locales e historiales de cambios para impedir la inclusión involuntaria de claves privadas `.pem`, tokens o binarios pesados antes del push. |
| **Generador de ReadMe** | `readme` | **Estudio de Documentación Markdown:** Asistente interactivo para generar archivos README profesionales con insignias dinámicas, instrucciones de instalación y plantillas de licencia MIT/AGPL. |

### 4. Calculadoras y Utilidades

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Calorías y Macros** | `cal` | **Modelado de Ingesta Metabólica:** Calcula la Tasa Metabólica Basal (BMR) y el Gasto Energético Diario Total (TDEE) según Mifflin-St Jeor y Katch-McArdle, desglosando macronutrientes. |
| **Conversor de Unidades** | `unit` | **Transformador de Magnitudes Científicas:** Convierte con alta precisión más de 80 unidades físicas en magnitudes de longitud, masa, temperatura, presión, almacenamiento digital y energía. |
| **Calculadora de Energía** | `energy` | **Simulador de Consumo y Coste Eléctrico:** Modela la potencia en vatios de electrodomésticos, horas de uso y tarifas por kWh, calculando el gasto diario, mensual y anual. |

### 5. Creatividad y Síntesis de Audio

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Estudio de Frecuencias** | `freq` | **Sintetizador Acústico de Tonos:** Genera ondas sinusoidales para pulsos binaurales, tonos isocrónicos y frecuencias Solfeggio ($432\,\text{Hz}, 528\,\text{Hz}$) mediante osciladores WebAudio en estéreo. |
| **Meditación y Paisajes Sonoros** | `med` | **Generador de Ambientes y Concentración:** Sintetiza paisajes sonoros generativos (lluvia, ruido blanco, ruido rosa, olas marinas) combinados con un guía visual de respiración rítmica. |

### 6. Mente y Análisis Psicológico

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Perfil de Personalidad Big5** | `big5` | **Modelo Psicométrico de Cinco Factores:** Aplica un inventario estandarizado de 50 ítems que mide Apertura, Responsabilidad, Extraversión, Amabilidad y Neuroticismo. |
| **Arquetipos de Jung** | `jung` | **Evaluador de Psicología Analítica:** Determina los arquetipos dominantes según Carl Jung (Héroe, Sabio, Explorador, Soberano) en función de ponderaciones cognitivas. |
| **Estrés y Enfoque** | `stress` | **Evaluador de Carga Cognitiva:** Mide la variabilidad en el tiempo de respuesta y la fatiga mental a través de pruebas visuales psicomotoras interactivas. |

### 7. Cosmos y Telemetría

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Fases Lunares** | `moon` | **Motor de Efemérides Astronómicas:** Calcula con precisión la edad lunar, porcentaje de iluminación, nomenclatura de fases y tránsitos zodiacales mediante algoritmos de fecha juliana. |
| **Biorritmos** | `bio` | **Calculador de Ondas Sinusoidales Biológicas:** Modela los ciclos físico de 23 días, emocional de 28 días e intelectual de 33 días proyectados en un lienzo temporal interactivo. |
| **Estación Meteorológica** | `weather` | **Tablero de Telemetría Atmosférica:** Muestra presión barométrica, humedad relativa, conversiones de temperatura y condiciones ambientales mediante widgets cliente ligeros. |

### 8. Núcleo del Sistema

| Herramienta | Identificador | Propósito y Mecanismo Operativo |
| :--- | :--- | :--- |
| **Panel Principal** | `dashboard` | **Centro de Mando y Gestor de Ventanas:** Matriz de control con búsqueda en tiempo real, filtros por categoría, historial de herramientas recientes y alternancia entre vista de rejilla y escritorio virtual. |
| **Suite de Color** | `color` | **Convertidor de Espacios Cromáticos:** Convierte y visualiza valores entre HEX, RGB, HSL, HSV y OKLCH con verificación integrada de índices de contraste según WCAG 2.1. |

---

## Instalación y Ejecución

### Windows Desktop
Requiere Windows 10/11 (64-bit). Emplea el motor en tiempo de ejecución Microsoft Edge WebView2 Evergreen.
1. Descarga `VGT-Mediacenter-Supreme.exe` desde la última versión publicada.
2. Haz doble clic para iniciar. No requiere instalador ni privilegios de administrador.
3. *Alternativa:* Ejecuta `launch-windows.bat`.

### Linux Desktop
Compatible con Ubuntu 20.04+, Debian 11+, Fedora 38+, Arch Linux, Linux Mint (x86_64).
1. Descarga el archivo comprimido `VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz`.
2. Descomprime el paquete:
   ```bash
   tar -xzf VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz
   cd VGT-Mediacenter-Supreme-Linux
   ```
3. Ejecuta el script de inicio:
   ```bash
   ./launch-linux.sh
   # O inicia el binario directamente:
   ./VGT-Mediacenter-Supreme
   ```
4. *(Opcional)* Integración con el escritorio del sistema:
   ```bash
   cp vgt-mediacenter.desktop ~/.local/share/applications/
   ```

### Plugin para WordPress
Compatible con WordPress 6.0+ y PHP 8.1+.
1. Copia el directorio `wordpress/` dentro de tu instalación de WordPress: `wp-content/plugins/vgt-mediacenter/`.
2. Activa el plugin en el menú de **Administración de WordPress $\to$ Plugins**.
3. Inserta la estación de trabajo en cualquier página o entrada mediante el shortcode:
   ```text
   [vgt_mediacenter]
   ```

---

## Arquitectura Multilingüe (i18n)

VGT Mediacenter incorpora un subsistema de traducción residente en memoria ([i18n.js](desktop/frontend/i18n.js)):
* **Ventana de Primer Inicio:** Pregunta al usuario por su idioma de preferencia en la primera apertura.
* **Selector en Cabecera:** Haz clic en el botón `🌐 [LANG]` de la barra de navegación superior en cualquier momento para alternar idiomas.
* **Cero Latencia:** Las traducciones de las 40 aplicaciones, categorías y cuadros del sistema residen en memoria RAM y se aplican en 0 ms sin recargar la página.

---

## Seguridad y Principio de Confianza Cero

* **Content Security Policy (CSP):** La aplicación corre bajo directivas estrictas de CSP; ningún dominio externo puede ser contactado.
* **Sin Telemetría ni Rastreo:** Cero llamadas a Google Analytics, cero seguimiento de errores mediante Sentry, cero balizas ocultas.
* **Sanitización del DOM:** Toda inyección de contenido pasa por controles rigurosos de desinfección HTML/SVG para neutralizar vectores de DOM-XSS.

---

## Licencia

VGT Mediacenter es software libre publicado bajo la **GNU Affero General Public License v3.0 (AGPLv3)**.  
Consulta el texto legal completo en [LICENSE](LICENSE).

---

## Dependencias de Terceros y Reconocimientos

Todas las librerías externas incluidas en VGT Mediacenter cuentan con licencias libres permisivas (MIT, Apache-2.0, BSD-3-Clause, ISC, SIL OFL 1.1).  
Para consultar la relación completa de autores, derechos de autor y avisos de licencia, examina [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

---

<div align="center">

<img src="docs/vgtcode.png" alt="Vision Gaia Technology Logo" width="120" style="border-radius: 12px; margin-top: 2rem;"/>

**Vision Gaia Technology (VGT)**  
*Diseñado para la Soberanía Digital • Privacidad Absoluta • Zero Cloud*

</div>
