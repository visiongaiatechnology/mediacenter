<!-- ========================================================
     VGT MEDIACENTER V1.0 BETA — DOCUMENTATION EN FRANÇAIS
     Standard: VisionGaiaTechnology /vgt-github-pusher
     ======================================================== -->

<div align="center">

# VGT Mediacenter V1.0 Beta

**Station de Travail Desktop Souveraine et Écosystème Sécurisé pour WordPress**  
*Invariant 100% Côté Client • Zéro Cloud • Zéro Télémétrie • 40 Outils Autonomes*


<img width="2007" height="1150" alt="image" src="https://github.com/user-attachments/assets/9ea1ab58-c1c5-4f43-a925-130b778b2400" />

---

### Choix de la Langue / Language Selection

[🇩🇪 Deutsch](README.de.md) • [🇬🇧 English](README.md) • [🇷🇺 Русский](README.ru.md) • [🇪🇸 Español](README.es.md) • [🇮🇹 Italiano](README.it.md) • [🇨🇳 简体中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇫🇷 Français](README.fr.md)

---

[![Version](https://img.shields.io/badge/version-1.0.0--beta-06b6d4?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![Licence](https://img.shields.io/badge/licence-AGPL--3.0-blue?style=for-the-badge)](LICENSE)
[![Plateformes](https://img.shields.io/badge/plateforme-Windows%20%7C%20Linux%20%7C%20WordPress-a855f7?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![Architecture](https://img.shields.io/badge/architecture-100%25%20Hors%20Ligne%20Souveraine-22c55e?style=for-the-badge)](docs/architecture.md)
[![Vie Privée](https://img.shields.io/badge/vie%20privée-Zéro%20Télémétrie-10b981?style=for-the-badge)](SECURITY.md)
[![Outils](https://img.shields.io/badge/outils-40%20Applications%20Natives-f59e0b?style=for-the-badge)](#les-40-applications-souveraines)
[![Support](https://img.shields.io/badge/💛%20Support-Digital%20Sovereignty-eab308?style=for-the-badge)](#-support)

<br/>

👉 **[💛 Soutenez la souveraineté numérique / Unterstütze Digitale Souveränität](#-support)** 👈

</div>

> [!WARNING]
> **Statut de Bêta Publique :** VGT Mediacenter V1.0 Beta fait actuellement l'objet d'une phase de tests publics. L'ensemble des 40 modules centraux fonctionne à 100 % en local, sans aucune dépendance envers le cloud. Les retours de la communauté, audits de sécurité et signalements de bugs sont les bienvenus.

---

## 🚀 Téléchargement rapide & Installation

Choisissez votre plateforme pour obtenir le paquet hors ligne précompilé :

| Plateforme | Format / Paquet | Taille | Téléchargement direct | Vérification (SHA-256) |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** (x64) | Exécutable portable `.exe` | ~61 Mo | [⬇️ **Télécharger pour Windows**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/VGT-Mediacenter-Supreme-Windows-x64.exe) | `deecfc78ecb9...` |
| **Linux** (x86_64) | Archive portable `.tar.gz` | ~22 Mo | [⬇️ **Télécharger pour Linux**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-linux/VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz) | `4c8246ea4bf6...` |
| **WordPress** | Extension autonome `.zip` | ~19 Mo | [⬇️ **Télécharger le plugin ZIP**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/vgt-mediacenter-wordpress-plugin.zip) | `4d1d1200791a...` |

> [!TIP]
> **Aucune installation requise :** Les versions pour ordinateur fonctionnent directement sans dépendances externes. Pour WordPress, téléversez simplement le fichier `.zip` dans **Extensions > Ajouter une extension > Téléverser une extension**.

---

## Table des Matières
1. [Introduction et Philosophie](#introduction-et-philosophie)
2. [Fonctionnalités Clés](#fonctionnalités-clés)
3. [Les 40 Applications Souveraines](#les-40-applications-souveraines)
   * [Vie Privée et Sécurité (12 Applications)](#1-vie-privée-et-sécurité)
   * [Traitement Médias et Documents (6 Applications)](#2-traitement-médias-et-documents)
   * [Développement et Analyse Binaire Forensique (9 Applications)](#3-développement-et-analyse-binaire-forensique)
   * [Calculateurs et Outils Pratiques (3 Applications)](#4-calculateurs-et-outils-pratiques)
   * [Créativité et Synthèse Audio (2 Applications)](#5-créativité-et-synthèse-audio)
   * [Psychologie et Analyse Cognitive (3 Applications)](#6-psychologie-et-analyse-cognitive)
   * [Cosmos et Télémétrie (3 Applications)](#7-cosmos-et-télémétrie)
   * [Noyau Système (2 Applications)](#8-noyau-système)
4. [Installation et Lancement](#installation-et-lancement)
   * [Windows Desktop](#windows-desktop)
   * [Linux Desktop](#linux-desktop)
   * [Extension WordPress](#extension-wordpress)
5. [Architecture Multilingue (i18n)](#architecture-multilingue-i18n)
6. [Sécurité et Modèle Zéro-Trust](#sécurité-et-modèle-zéro-trust)
7. [Licence (AGPLv3)](#licence)
8. [Dépendances Tierces et Remerciements](#dépendances-tierces-et-remerciements)

9. [💛 Support](#-support)

---

## Introduction et Philosophie

Le paysage logiciel contemporain enferme de plus en plus l'utilisateur dans des monopoles infonuagiques (cloud), exigeant des connexions permanentes, des abonnements réguliers et l'abandon de données privées sur des serveurs distants de télémétrie.

**VGT Mediacenter** rejette catégoriquement ce paradigme. Il s'agit d'une **station de travail locale axée sur la souveraineté numérique**, intégrant 40 outils de qualité industrielle dédiés à la cryptographie, à l'analyse médico-légale de documents, à l'étude acoustique, au génie logiciel, aux calculs scientifiques et à la préservation absolue de la confidentialité.

### Garanties Architecturales Fondamentales :
* **Zéro Cloud :** Aucun serveur distant, aucune balise de pistage, aucun ping d'analyse, aucun appel API externe.
* **Traitement 100% En Mémoire :** Les fichiers déposés dans les outils ne quittent jamais la mémoire vive (RAM) locale de votre machine. Hachage, caviardage de PDF et traitement audio s'exécutent via les API Web HTML5 et WebAssembly.
* **Portabilité Déterministe :** Une expérience fluide et identique, que l'application soit exécutée de manière native sans bordure sur Windows et Linux, ou déployée sous forme de shortcode sécurisé pour les intranets WordPress.

---

## Fonctionnalités Clés

* **Interface Glass 2100 Sovereign :** Identité visuelle Obsidian Glass avec flou d'arrière-plan matériel (`blur(28px)`), surfaces épurées sans grilles oppressantes et lueurs cyan luminescentes.
* **Contrôles de Fenêtre Natifs :** Boutons sur mesure (Réduire, Agrandir / Restaurer, Fermer) intégrés avec Wails v2 et les gestionnaires de fenêtres des systèmes d'exploitation.
* **Démarrage Instantané (Moins d'une Seconde) :** Manifestes précompilés résidant en RAM, contournant toute latence CORS sous protocole `file://` pour un lancement à froid en moins de 600 ms.
* **Prise en Charge Intégrale de 8 Langues :** Allemand, Anglais, Russe, Espagnol, Italien, Chinois simplifié, Japonais et Français — appliquée sans faille à travers les 40 applications.

---

## Les 40 Applications Souveraines

### 1. Vie Privée et Sécurité

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Vérificateur de Hash** | `hashchecker` | **Contrôle d'Intégrité Cryptographique :** Calcule les sommes SHA-1, SHA-256, SHA-384, SHA-512 et MD5 directement dans la RAM du navigateur via `crypto.subtle.digest()`. Compare avec un hash de référence pour détecter toute falsification de fichier. |
| **Chiffrement AES** | `aes` | **Coffre-fort Cryptographique Local :** Chiffre et déchiffre textes et fichiers en local selon la norme AES-256-GCM avec dérivation de clé PBKDF2 (100 000 itérations). Génère un vecteur d'initialisation (IV) cryptographiquement aléatoire pour chaque opération. |
| **Coffre Stéganographique** | `stegano` | **Dissimulation de Données dans les Pixels :** Dissimule des messages textuels chiffrés au sein des bits de poids faible (LSB) des composantes RGB de l'image. Indiscernable à l'œil nu, déchiffrable uniquement à l'aide de la clé appropriée. |
| **Nettoyeur de Métadonnées** | `meta-clean` | **Purge Forensique des Traces :** Analyse les fichiers JPEG, PNG, TIFF et HEIC au niveau binaire. Supprime intégralement les balises EXIF, les coordonnées GPS, les numéros de série du boîtier et les métadonnées de microprogramme. |
| **VisionWhistleBlow** | `whistle` | **Caviardage Irréversible de Documents :** Utilise la bibliothèque `pdf-lib` pour retirer physiquement le texte du DOM du document et dessiner des blocs noirs opaques sur les coordonnées sensibles, empêchant toute récupération ultérieure. |
| **Analyseur d'Empreinte** | `fingerprint` | **Audit de l'Entropie du Navigateur :** Évalue le rendu Canvas 2D, les chaînes de processeur graphique WebGL, la latence de l'AudioContext et la concurrence matérielle pour exposer la façon dont les régies de pistage identifient l'appareil. |
| **Audit de Mots de Passe** | `pw-check` | **Mesure d'Entropie et Résistance aux Attaques :** Évalue l'entropie ($H = L \cdot \log_2(N)$), vérifie la chaîne contre les dictionnaires de fuites et estime le temps de cassage sur fermes de GPU sans jamais faire transiter le mot de passe sur le réseau. |
| **Truthlense Diff** | `truthlense` | **Comparateur de Différences Textuelles :** Calcule les divergences au niveau du caractère, du mot et de la ligne entre deux documents à l'aide de l'algorithme de Myers. Met en exergue ajouts, suppressions et modifications invisibles d'espaces. |
| **Scanner de Secrets Pro** | `secret-scan` | **Détecteur de Fuites d'Identifiants :** Scrute le code source, fichiers de configuration et journaux à la recherche de clés API, jetons AWS, tokens GitHub et clés privées via expressions régulières et calcul d'entropie de Shannon. |
| **Nettoyeur d'URL Pro** | `url-clean` | **Purge des Sondes de Pistage :** Éprouve et nettoie les URL en supprimant balises UTM, identifiants Facebook (`fbclid`), identifiants Google Ads (`gclid`) et jetons d'affiliation avant toute navigation. |
| **Analyse de Données HAR** | `har` | **Inspecteur d'Archives Réseau :** Décode les fichiers d'archive HTTP (`.har`) en local. Restitue les cascades de requêtes (waterfalls), en-têtes, cookies et latences avec ApexCharts, sans exposer vos données de session en ligne. |
| **Générateur de QR Code** | `qr` | **Forge et Lecteur de Codes QR Hors Ligne :** Encode textes, configurations Wi-Fi et adresses de crypto-monnaies en codes matriciels haute résolution, et analyse les captures d'images directement en mémoire vive. |

### 2. Traitement Médias et Documents

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Convertisseur d'Images** | `img-conv` | **Transcodage de Formats en Mémoire :** Convertit vos visuels entre WebP, PNG, JPEG, BMP et ICO grâce au rendu Canvas HTML5 et à la génération d'objets Blob locaux. |
| **Compresseur d'Images** | `img-comp` | **Réduction Efficace du Poids :** Mobilise les algorithmes Pica et le rééchantillonnage bi-cubique pour réduire la taille des fichiers jusqu'à 85 % tout en préservant la clarté visuelle. |
| **Fusionneur de PDF** | `pdf-merge` | **Concaténation Documentaire :** Réunit plusieurs documents PDF indépendants en un flux documentaire unique via `pdf-lib`, en préservant tracés vectoriels, champs de formulaires et polices intégrées. |
| **Diviseur de PDF** | `pdf-split` | **Extraction et Découpage de Pages :** Scinde les fichiers volumineux par pages individuelles ou plages personnalisées avec téléchargement immédiat sous forme d'archive ZIP locale. |
| **Studio Audio Pro** | `audio-conv` | **Visualiseur Spectral et Moteur Sonore :** Affiche la forme d'onde en temps réel via l'API WebAudio, enregistre le microphone en WAV/WebM non compressé et calcule la distribution fréquentielle. |
| **ZIP Master** | `zipmaster` | **Explorateur et Extracteur d'Archives :** Ouvre et décompresse les archives ZIP directement dans la RAM du navigateur grâce à `JSZip`, permettant l'extraction sélective de fichiers sans écriture disque superflue. |

### 3. Développement et Analyse Binaire Forensique

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Outils JSON** | `json` | **Formatage et Validation de Structures JSON :** Met en forme, valide, corrige les erreurs de syntaxe et parcourt les hiérarchies imbriquées avec coloration syntaxique, comptage de jetons et conformité aux schémas. |
| **Explorateur CSV** | `cdash` | **Station de Traitement de Données Tabulaires :** Analyse les fichiers volumineux CSV et TSV via PapaParse. Fournit filtrage instantané multi-critères, tris, agrégations statistiques et diagrammes en barres/courbes. |
| **Code Omega** | `coder` | **Différentiel de Code et Bac à Sable :** Analyseur syntaxique multi-langages et moteur de comparaison côte-à-côte compatible avec JavaScript, TypeScript, Python, Go, PHP et SQL. |
| **Cipher-Flow** | `cipherflow` | **Créateur Visuel de Pipelines Cryptographiques :** Interface modulaire à base de nœuds pour enchaîner plusieurs étapes d'encodage et de chiffrement (par ex. Hex $\to$ Base64 $\to$ AES $\to$ SHA-256) de manière automatisée. |
| **Forge de Manifestes** | `manifest` | **Générateur d'Intégrité de Dossiers :** Scanne récursivement les dossiers sélectionnés et compile un manifeste standardisé de sommes de contrôle SHA-256 (`manifest.json`) pour l'audit de distribution logicielle. |
| **Inspecteur Binaire Hexmap** | `hexmap` | **Visionneuse Hexadécimale Bas Niveau :** Affiche les flux d'octets bruts, décalages d'adresses, correspondances ASCII et nombres magiques (magic numbers) pour rétro-concevoir les formats de fichiers. |
| **Packet-Viz PCAP** | `packetviz` | **Visualiseur de Trames Réseau :** Traite les captures Wireshark (`.pcap`) en toute confidentialité locale. Génère matrices de communications IP, distributions de tailles de paquets et arborescences de protocoles avec D3.js. |
| **Vérificateur Git** | `gitleaker` | **Audit Pré-Commit pour Dépôts :** Analyse les dépôts Git locaux et les instantanés de changements pour bloquer l'introduction fortuite de clés privées `.pem`, jetons d'accès ou binaires volumineux avant l'envoi. |
| **Générateur de ReadMe** | `readme` | **Studio de Rédaction Markdown :** Formulaire interactif guidant la création de fichiers README conformes aux standards de l'industrie avec badges d'état, guides d'installation et modèles de licences MIT/AGPL. |

### 4. Calculateurs et Outils Pratiques

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Calculateur de Calories** | `cal` | **Modélisation Métabolique :** Calcule le Métabolisme de Base (BMR) et la Dépense Énergétique Journalière Totale (TDEE) selon les équations Mifflin-St Jeor et Katch-McArdle, ventilant glucides, protéines et lipides. |
| **Convertisseur d'Unités** | `unit` | **Transformation de Grandeurs Physiques :** Convertit avec précision plus de 80 unités dans les domaines de la longueur, de la masse, de la température, de la pression, du stockage numérique et de l'énergie. |
| **Calculateur d'Énergie** | `energy` | **Simulateur de Consommation Électrique :** Modélise la puissance en watts, les heures d'utilisation et les grilles tarifaires afin de prévoir les dépenses journalières, mensuelles et annuelles. |

### 5. Créativité et Synthèse Audio

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Générateur de Fréquences** | `freq` | **Synthétiseur Acoustique Harmonique :** Génère des battements binauraux, des sons isochrones et des fréquences sacrées Solfeggio ($432\,\text{Hz}, 528\,\text{Hz}$) en ondes sinusoïdales pures via WebAudio. |
| **Méditation & Ambiances** | `med` | **Générateur d'Atmosphères Sonores :** Synthétise des bruits naturels génératifs (pluie, bruit blanc, bruit rose, flux océanique) associés à un guide visuel de cohérence cardiaque. |

### 6. Psychologie et Analyse Cognitive

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Profil Psychologique Big5** | `big5` | **Modèle Psychométrique des 5 Facteurs :** Administre un questionnaire standardisé de 50 items mesurant Ouverture, Conscienciosité, Extraversion, Agréabilité et Névrosisme. |
| **Archétypes Jungiens** | `jung` | **Évaluateur de Psychologie Analytique :** Détermine les archétypes dominants décrits par Carl Gustav Jung (Héros, Sage, Explorateur, Souverain) en pondérant les réponses cognitives. |
| **Stress & Concentration** | `stress` | **Évaluateur de Charge Cognitive :** Mesure la variance des temps de réaction psychomoteurs et la fatigue attentionnelle au moyen de tests visuels réactifs. |

### 7. Cosmos et Télémétrie

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Phases Lunaires** | `moon` | **Moteur d'Éphémérides Astronomiques :** Détermine l'âge exact de la Lune, le pourcentage d'illumination, le cycle des phases et le transit zodiacal via les algorithmes du jour julien. |
| **Biorythmes** | `bio` | **Calculateur de Courbes Sinusoïdales :** Calcule les cycles physiques (23 jours), émotionnels (28 jours) et intellectuels (33 jours) depuis votre date de naissance et les projette sur un calendrier dynamique. |
| **Station Météo** | `weather` | **Moniteur Atmosphérique Local :** Indique pression atmosphérique, humidité relative, conversions thermiques et prévisions météorologiques locales via des composants légers côté client. |

### 8. Noyau Système

| Outil | Identifiant | Objectif et Principe de Fonctionnement |
| :--- | :--- | :--- |
| **Tableau de bord** | `dashboard` | **Centre de Commande et Gestionnaire de Fenêtres :** Matrice de pilotage dotée d'une recherche instantanée, de filtres thématiques, de l'historique d'accès et de l'alternance entre affichage en grille et bureau virtuel. |
| **Outils Couleur** | `color` | **Convertisseur d'Espaces Colorimétriques :** Convertit et prévisualise les teintes entre HEX, RGB, HSL, HSV et OKLCH avec calcul automatique des ratios de contraste WCAG 2.1. |

---

## Installation et Lancement

### Windows Desktop
Configuration requise : Windows 10/11 (64-bit). S'appuie sur le moteur d'exécution standard Microsoft Edge WebView2 Evergreen.
1. Téléchargez `VGT-Mediacenter-Supreme.exe` depuis l'espace des versions officielles.
2. Double-cliquez pour exécuter l'application. Aucune installation ni droit administrateur requis.
3. *Méthode alternative :* Exécutez le script `launch-windows.bat`.

### Linux Desktop
Compatible avec l'ensemble des distributions 64 bits : Ubuntu 20.04+, Debian 11+, Fedora 38+, Arch Linux, Linux Mint (x86_64).
1. Téléchargez l'archive `VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz`.
2. Décompressez l'archive :
   ```bash
   tar -xzf VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz
   cd VGT-Mediacenter-Supreme-Linux
   ```
3. Lancez le script de démarrage :
   ```bash
   ./launch-linux.sh
   # Ou exécutez le binaire directement :
   ./VGT-Mediacenter-Supreme
   ```
4. *(Optionnel)* Intégration au menu du système :
   ```bash
   cp vgt-mediacenter.desktop ~/.local/share/applications/
   ```

### Extension WordPress
Compatible avec WordPress 6.0+ et PHP 8.1+.
1. Copiez le répertoire `wordpress/` dans le dossier des extensions de votre site : `wp-content/plugins/vgt-mediacenter/`.
2. Rendez-vous dans **Administration WordPress $\to$ Extensions** pour l'activer.
3. Insérez la station de travail souveraine dans n'importe quelle page ou article à l'aide du code court :
   ```text
   [vgt_mediacenter]
   ```

---

## Architecture Multilingue (i18n)

VGT Mediacenter intègre un sous-système de traduction 100% autonome résidant en RAM ([i18n.js](desktop/frontend/i18n.js)) :
* **Boîte de Dialogue au Premier Lancement :** Dès la première exécution, une fenêtre vous invite à choisir votre langue préférée.
* **Sélecteur Rapide dans l'En-tête :** Cliquez sur le bouton `🌐 [LANG]` dans la barre de navigation supérieure pour changer de langue à tout instant.
* **Zéro Latence :** L'ensemble des descriptions, libellés et badges des 40 outils sont conservés en mémoire et s'actualisent en 0 ms sans aucun rechargement de page.

---

## Sécurité et Modèle Zéro-Trust

* **Content Security Policy (CSP) :** L'application est soumise à des directives CSP strictes interdisant toute connexion vers des serveurs tiers.
* **Zéro Télémétrie :** Aucun script Google Analytics, aucune capture d'erreur Sentry, aucune balise publicitaire.
* **Sanitisation Rigoureuse du DOM :** Toutes les insertions de balisage HTML/SVG sont filtrées afin d'annihiler tout risque de faille DOM-XSS.

---

## Licence

VGT Mediacenter est un logiciel libre distribué sous les termes de la **GNU Affero General Public License v3.0 (AGPLv3)**.  
Consultez le texte intégral de la licence dans le fichier [LICENSE](LICENSE).

---

## Dépendances Tierces et Remerciements

Toutes les bibliothèques tierces intégrées dans VGT Mediacenter font l'objet de licences open source permissives (MIT, Apache-2.0, BSD-3-Clause, ISC, SIL OFL 1.1).  
Pour consulter la liste complète des auteurs, copyrights et mentions légales, veuillez vous référer au fichier [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## 💛 Support

Independent development is funded by people who want this stack to exist. If you want to support the work:

| Method | Address / Link |
| :--- | :--- |
| **PayPal** | [paypal.me/dergoldenelotus](https://paypal.me/dergoldenelotus) |
| **Bitcoin** | `bc1q3ue5gq822tddmkdrek79adlkm36fatat3lz0dm` |
| **ETH / USDT (ERC-20)** | `0xD37DEfb09e07bD775EaaE9ccDaFE3a5b2348Fe85` |

---

<div align="center">

<img src="docs/vgtcode.png" alt="Vision Gaia Technology Logo" width="120" style="border-radius: 12px; margin-top: 2rem;"/>

**Vision Gaia Technology (VGT)**  
*Conçu pour la Souveraineté Numérique • Confidentialité Absolue • Zéro Cloud*

</div>
