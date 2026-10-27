<!-- ========================================================
     VGT MEDIACENTER V1.0 BETA — 简体中文文档
     标准遵循: VisionGaiaTechnology /vgt-github-pusher
     ======================================================== -->

<div align="center">

# VGT Mediacenter V1.0 Beta

**本地主权桌面工作站与加固型 WordPress 生态系统**  
*100% 纯客户端不变量 • 零云端依赖 • 零数据遥测 • 40 款自主内置工具*


<img width="2007" height="1150" alt="image" src="https://github.com/user-attachments/assets/9ea1ab58-c1c5-4f43-a925-130b778b2400" />

---

### 语言选择 / Language Selection

[🇩🇪 Deutsch](README.de.md) • [🇬🇧 English](README.md) • [🇷🇺 Русский](README.ru.md) • [🇪🇸 Español](README.es.md) • [🇮🇹 Italiano](README.it.md) • [🇨🇳 简体中文](README.zh.md) • [🇯🇵 日本語](README.ja.md) • [🇫🇷 Français](README.fr.md)

---

[![版本](https://img.shields.io/badge/版本-1.0.0--beta-06b6d4?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![开源协议](https://img.shields.io/badge/开源协议-AGPL--3.0-blue?style=for-the-badge)](LICENSE)
[![支持平台](https://img.shields.io/badge/支持平台-Windows%20%7C%20Linux%20%7C%20WordPress-a855f7?style=for-the-badge)](https://github.com/visiongaiatechnology/mediacenter)
[![系统架构](https://img.shields.io/badge/系统架构-100%25%20离线数字主权-22c55e?style=for-the-badge)](docs/architecture.md)
[![隐私保护](https://img.shields.io/badge/隐私保护-零遥测跟踪-10b981?style=for-the-badge)](SECURITY.md)
[![内置套件](https://img.shields.io/badge/内置套件-40%20款独立应用-f59e0b?style=for-the-badge)](#40-款主权独立工具)
[![Support](https://img.shields.io/badge/💛%20Support-Digital%20Sovereignty-eab308?style=for-the-badge)](#-support)

<br/>

👉 **[💛 支持数字主权 / Unterstütze Digitale Souveränität](#-support)** 👈

</div>

> [!WARNING]
> **公开测试阶段说明:** VGT Mediacenter V1.0 Beta 当前正处于公测阶段。所有 40 款核心模块均 100% 运行于本地计算机内存中，绝无云端依赖。欢迎社区提供宝贵反馈、进行安全同行评审与提交缺陷报告。

---

## 🚀 快速下载与安装

选择您的平台以下载预编译的完全独立离线版本：

| 平台 | 格式 / 软件包 | 大小 | 直接下载 | 校验码 (SHA-256) |
| :--- | :--- | :--- | :--- | :--- |
| **Windows** (x64) | 便携式单文件 `.exe` | ~61 MB | [⬇️ **下载 Windows 版**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/VGT-Mediacenter-Supreme-Windows-x64.exe) | `deecfc78ecb9...` |
| **Linux** (x86_64) | 便携式归档包 `.tar.gz` | ~22 MB | [⬇️ **下载 Linux 版**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-linux/VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz) | `4c8246ea4bf6...` |
| **WordPress** | 独立自托管插件 `.zip` | ~19 MB | [⬇️ **下载插件 ZIP**](https://github.com/visiongaiatechnology/mediacenter/releases/download/v1.0.0-beta-windows/vgt-mediacenter-wordpress-plugin.zip) | `4d1d1200791a...` |

> [!TIP]
> **无需安装：** 桌面版本直接开箱即用，无需额外依赖或管理员安装器。WordPress 只需在后台 **插件 > 安装插件 > 上传插件** 中上传 `.zip` 文件即可激活。

---

## 目录
1. [项目简介与核心理念](#项目简介与核心理念)
2. [主要特性](#主要特性)
3. [40 款主权独立工具](#40-款主权独立工具)
   * [隐私与安全保护 (12 款)](#1-隐私与安全保护)
   * [媒体与文档处理 (6 款)](#2-媒体与文档处理)
   * [开发与二进制取证 (9 款)](#3-开发与二进制取证)
   * [计算与工程换算 (3 款)](#4-计算与工程换算)
   * [创意与声学合成 (2 款)](#5-创意与声学合成)
   * [心理与认知分析 (3 款)](#6-心理与认知分析)
   * [宇宙与天文遥测 (3 款)](#7-宇宙与天文遥测)
   * [系统核心控制台 (2 款)](#8-系统核心控制台)
4. [安装与启动指南](#安装与启动指南)
   * [Windows 桌面端](#windows-桌面端)
   * [Linux 桌面端](#linux-桌面端)
   * [WordPress 插件部署](#wordpress-插件部署)
5. [全量本地多语言架构 (i18n)](#全量本地多语言架构-i18n)
6. [安全规范与零信任准则](#安全规范与零信任准则)
7. [开源许可证 (AGPLv3)](#开源许可证)
8. [第三方依赖与致谢](#第三方依赖与致谢)

9. [💛 Support](#-support)

---

## 项目简介与核心理念

现代软件生态日益强迫用户依赖云端垄断，强制要求恒定网络连接、循环订阅计费，并将个人敏感数据无节制地上传至远程数据遥测服务器。

**VGT Mediacenter** 从根本上摒弃了这一模式。它是一套专为**数字主权与隐私保护**打造的本地工作站，集成了 40 款工业级专业工具，涵盖密码学加密、文档取证与脱敏、音频频谱分析、代码审查、高精度工程换算以及全方位隐私保护。

### 核心架构保障：
* **零云端 (Zero Cloud):** 无外部服务器、无跟踪信标、无数据埋点统计、无远程 API 调用。
* **100% 纯内存处理:** 用户导入工具的文件绝不离开本地设备 RAM。哈希运算、PDF 永久脱敏以及音频流处理完全借助现代浏览器的 HTML5 Web APIs 与 WebAssembly 在本地芯片上高效运算。
* **确定性跨端移植:** 无论是在 Windows 和 Linux 上作为无边框原生桌面应用启动，还是作为加固的 WordPress 插件嵌入内网站点，均提供完全一致且流畅的交互体验。

---

## 主要特性

* **Glass 2100 主权设计语言:** 独具匠心的 Obsidian Glass 材质，配合硬件级高斯模糊滤镜 (`blur(28px)`)，界面彻底告别杂乱的网格线条，呈现深邃内敛的青蓝辉光微粒。
* **原生无边框窗口控制器:** 精心绘制的窗口操作按钮（最小化、最大化/还原、关闭），深度融合 Wails v2 架构与底层操作系统窗口管理器。
* **亚秒级闪电启动:** 预编译的内存常驻数据清单消除了 `file://` 协议下的 CORS 跨域瓶颈，全站冷启动时间压缩至 600 毫秒以内。
* **全量覆盖的 8 国语言体系:** 德语、英语、俄语、西班牙语、意大利语、简体中文、日语及法语 — 在 40 款应用间实现 100% 恒定无缝切换。

---

## 40 款主权独立工具

### 1. 隐私与安全保护

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **哈希校验器** | `hashchecker` | **本地密码学完整性验证:** 直接利用浏览器底层 `crypto.subtle.digest()` 计算文件的 SHA-1、SHA-256、SHA-384、SHA-512 和 MD5 校验和，与基准哈希自动比对以识别篡改或损坏。 |
| **AES 高强度加密** | `aes` | **本地高等级加密保险箱:** 采用行业级 AES-256-GCM 算法与 PBKDF2 密钥派生机制 (100,000 次哈希迭代)，在本地加解密文本与文件，单次任务均使用密码学安全的随机向量 (IV)。 |
| **隐写密室 (Stegano)** | `stegano` | **像素级隐写术数据隐藏:** 将经过加密的文本密文编码嵌入到 RGB 彩色图像像素的最低有效位 (LSB) 中。外观上与原图毫厘不差，只有持有对应密码方能逆向解密还原。 |
| **元数据净化器** | `meta-clean` | **数字媒体取证级脱敏:** 在二进制头部层面深度解析 JPEG、PNG、TIFF 和 HEIC 图像结构，彻底抹除 EXIF 标签、GPS 经纬度、设备序列号以及相机固件签名等敏感信息。 |
| **机密脱敏器 (WhistleBlow)** | `whistle` | **不可逆文档脱敏抹除:** 调用底层 `pdf-lib` 库，从 PDF 的 DOM 结构流中永久物理剥离指定字符，并在对应坐标位置绘制全黑不透明色块，杜绝逆向高亮提取机密的可能性。 |
| **浏览器指纹分析器** | `fingerprint` | **浏览器熵值审计工具:** 提取并探测 Canvas 2D 绘图特征、WebGL 渲染管线、AudioContext 声学校准以及 CPU 硬件并发数，直观揭示大型数据网络用于追踪终端的指纹画像。 |
| **密码强度评估器** | `pw-check` | **信息熵与暴力破解估算:** 依据香农信息熵公式 ($H = L \cdot \log_2(N)$) 严谨量化口令强度，比对数千条常见弱口令字典，离线估算现代 GPU 算力集群下的理论破解耗时。 |
| **真实之镜 (文本比对)** | `truthlense` | **文档差异对比引擎:** 基于经典的 Myers 差异比对算法，在字符级、单词级与行级对两份文档展开高精度比对，精准高亮标注新增、删除以及不易察觉的隐形空白符变动。 |
| **机密泄露扫描器** | `secret-scan` | **代码凭证泄漏检测仪:** 采用多维度正则表达式与香农熵算法，深入扫描配置文件、脚本与运行日志，排查未脱敏的 API 密钥、AWS 访问令牌、GitHub PAT 以及各类私钥。 |
| **URL 跟踪参数剥离器** | `url-clean` | **网络追踪探针净化:** 在跳转前自动剥离网址中的营销追踪标签，包括 UTM 参数、Facebook Click ID (`fbclid`)、Google Click ID (`gclid`)、广告联盟追踪码等。 |
| **HAR 浏览器数据分析** | `har` | **网络流量归档审查:** 纯本地解析 HTTP 归档文件 (`.har`)。通过 ApexCharts 呈现精美的请求瀑布流、请求标头、Cookie 参数与网络时延分布，严防会话凭据外泄。 |
| **离线 QR 码工坊** | `qr` | **安全二维码锻造与解析器:** 将纯文本、Wi-Fi 连接配置或加密货币钱包地址编码生成高分辨率无损矢量二维码，同时支持在内存中快速识别和解码本地图片。 |

### 2. 媒体与文档处理

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **图像格式转换器** | `img-conv` | **纯内存图像格式转码:** 借助 HTML5 Canvas 渲染与本地 Blob 生成技术，在 WebP、PNG、JPEG、BMP 和 ICO 格式之间完成无缝瞬时转换，不经过任何中转盘。 |
| **智能图像压缩器** | `img-comp` | **保真度可控的高效压缩:** 引入 Pica 像素重采样与双三次插值算法，在保留图像主观锐度与色彩层面的前提下，将文件体积缩减最高达 85%。 |
| **PDF 合并工坊** | `pdf-merge` | **文档流级无损拼接:** 借助 `pdf-lib` 引擎在内存中将多份独立 PDF 拼接为一个连续文档，完整保留页面内的矢量图形、表单交互域以及内置嵌入字体。 |
| **PDF 页面分割器** | `pdf-split` | **精准页面抽取与分离:** 将大型多页 PDF 拆解为单页或按自定义页码区间提取，支持一键在本地打包生成 ZIP 压缩包下载。 |
| **音频工作站 Pro** | `audio-conv` | **实时声波可视化与录制:** 利用 WebAudio API 在画布上实时渲染输入波形与频域柱状图，支持将麦克风音频流直接编码录制为无损 WAV/WebM 格式。 |
| **ZIP 归档大师** | `zipmaster` | **压缩包审查与解压工具:** 借助 `JSZip` 库在浏览器内存中直接读写标准 ZIP 压缩包，允许用户按需预览或单独抽取单个文件，免除向磁盘倾倒临时文件的开销。 |

### 3. 开发与二进制取证

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **JSON 深度格式化与校验** | `json` | **JSON 语法解析与树状视图:** 格式化、验证、自动修复缺失的闭合字符，并在交互式语法树中可视化嵌套结构，支持 Token 计数与结构校验。 |
| **CSV / 数据透视面板** | `cdash` | **轻量级表格分析工作台:** 借助 PapaParse 解析超大 CSV 与 TSV 数据。提供即时多列组合检索、动态排序、数学汇总统计以及柱状/折线图映射。 |
| **Code Omega 代码分析器** | `coder` | **代码对比与词法语法沙盒:** 支持 JavaScript、TypeScript、Python、Go、PHP 和 SQL 的多语言语法解析与双栏并排差异比对，直观反映修改细节。 |
| **密码流水线 (Cipher-Flow)** | `cipherflow` | **可视化密码学工作流搭建器:** 采用模块化节点连接模式，将多重编解码与加解密流程（如 Hex $\to$ Base64 $\to$ AES $\to$ SHA-256）串联成自动处理管线。 |
| **数字清单工坊 (Manifest)** | `manifest` | **目录完整性构建与审计:** 递归遍历用户导入的工程目录结构，自动生成符合工业标准的 SHA-256 哈希完整性清单文件 (`manifest.json`)，用于软件发布分发校验。 |
| **Hexmap 二进制探针** | `hexmap` | **底层十六进制数据审查器:** 直观呈现原始二进制字节流、物理偏移量、ASCII 可见字符映射及文件 Magic Number，用于深入逆向分析文件格式与结构。 |
| **网络数据包可视化 (Packet-Viz)** | `packetviz` | **PCAP 流量抓包本地可视化:** 本地解析 Wireshark 导出的 `.pcap` 抓包文件。借助 D3.js 动态绘制 IP 节点通信热力拓扑、数据包体积分布与协议树状图。 |
| **Git 仓库安全卫士** | `gitleaker` | **代码提交前泄漏阻断器:** 全面扫描本地 Git 仓库与工作区变更差异，在代码推向远程前拦截意外残留的 `.pem` 私钥、API Token 与大体积二进制垃圾文件。 |
| **工程 ReadMe 锻造引擎** | `readme` | **专业级 Markdown 文档设计台:** 交互式表单向导，一键生成符合国际开源规范的高颜值 README 文档，集成状态徽标、安装指南与 MIT/AGPL 授权模版。 |

### 4. 计算与工程换算

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **能量与营养摄入计算器** | `cal` | **人体代谢模型测算:** 结合 Mifflin-St Jeor 与 Katch-McArdle 双重经典公式，计算基础代谢率 (BMR) 与每日总能量消耗 (TDEE)，科学规划碳水、蛋白质与脂肪配比。 |
| **万能单位换算器** | `unit` | **高精度科学量纲转换:** 精确换算涵盖长度、质量、温度、压强、计算机数据存储容量以及机械/电能量等在内的 80 余种物理单位。 |
| **电力能耗与电费核算器** | `energy` | **电器功耗与开支模拟器:** 根据设备的标称额定功率、日均工作时长以及本地分段电价，精确估算电器日度、月度及年度的累计用电成本。 |

### 5. 创意与声学合成

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **双耳节拍与声学振荡器** | `freq` | **纯正弦波音频合成台:** 借助 WebAudio 双声道立体声振荡器，合成双耳差频脑波节拍 (Binaural Beats)、等时音 (Isochronic Tones) 及索尔费吉奥疗愈频率 ($432\,\text{Hz}, 528\,\text{Hz}$)。 |
| **冥想与声景座舱** | `med` | **氛围生成与正念引导:** 纯算法生成自然声景（暴雨、白噪音、粉红噪音、海浪拍岸），并配备与人体呼吸节律相适配的动态光环指引。 |

### 6. 心理与认知分析

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **大五人格测定 (Big Five)** | `big5` | **五因素实证心理测量学模型:** 提供标准化的 50 项心理测验量表，严密评估个体的经验开放性、尽责性、外向性、宜人性与情绪稳定性。 |
| **荣格原型深度测试** | `jung` | **分析心理学原型透视:** 依据卡尔·荣格的原型理论，通过认知加权算法推算受测者在英雄、智者、探险家、统治者等维度上的潜意识人格倾向。 |
| **压力与认知负荷分析** | `stress` | **心理运动机能评估:** 通过交互式视觉反应测试，精确测量受试者的反应时间离散度与决策延迟，量化当前的心理疲劳与注意力负荷。 |

### 7. 宇宙与天文遥测

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **月相与天文遥测** | `moon` | **天文历元历算引擎:** 基于儒略日公历换算算法，精确计算当天的月龄、照射百分比、月相周期天文名称以及月球所在的黄道黄经星座。 |
| **生物节律周期推演** | `bio` | **正弦生物节律推演台:** 计算自出生日起算起的 23 天体力周期、28 天情绪周期与 33 天智力周期的正弦波动，投影至交互时间线上。 |
| **气象站** | `weather` | **微气象环境监测看板:** 借助纯客户端控件展示气压、环境相对湿度、摄氏/华氏温度转换与局部天气预测。 |

### 8. 系统核心控制台

| 工具名称 | 模块标识符 | 核心用途与工作原理 |
| :--- | :--- | :--- |
| **仪表盘** | `dashboard` | **系统总控枢纽与窗口管理器:** 核心控制总线，支持全局实时模糊搜索、分类标签筛选、最近工具访问足迹，以及在网格排布与多窗口虚拟桌面模式之间自由切换。 |
| **色彩空间调控台** | `color` | **色域转换与无障碍审查:** 在 HEX、RGB、HSL、HSV 与先进的 OKLCH 色彩空间之间自由换算，内置严格符合 WCAG 2.1 标准的文本对比度检测矩阵。 |

---

## 安装与启动指南

### Windows 桌面端
运行环境要求：Windows 10 或 Windows 11 (64位)。采用系统预置的 Microsoft Edge WebView2 Evergreen 运行组件。
1. 前往 Release 发布页下载最新的 `VGT-Mediacenter-Supreme.exe`。
2. 双击直接启动。无需安装程序，无需管理员特权。
3. *备选方式:* 双击执行根目录的 `launch-windows.bat`。

### Linux 桌面端
全面兼容各类 64 位发行版：Ubuntu 20.04+、Debian 11+、Fedora 38+、Arch Linux、Linux Mint (x86_64)。
1. 下载打包文件 `VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz`。
2. 解压归档文件：
   ```bash
   tar -xzf VGT-Mediacenter-Supreme-Linux-x86_64.tar.gz
   cd VGT-Mediacenter-Supreme-Linux
   ```
3. 执行启动脚本：
   ```bash
   ./launch-linux.sh
   # 或者直接运行编译出的原生二进制文件:
   ./VGT-Mediacenter-Supreme
   ```
4. *(可选)* 将桌面快捷方式注入系统菜单：
   ```bash
   cp vgt-mediacenter.desktop ~/.local/share/applications/
   ```

### WordPress 插件部署
环境要求：WordPress 6.0+ 以及 PHP 8.1+。
1. 将源码中的 `wordpress/` 目录复制至站点的插件目录中：`wp-content/plugins/vgt-mediacenter/`。
2. 登录 **WordPress 后台 $\to$ 插件**，点击激活 **VGT Mediacenter**。
3. 在任意页面或文章编辑器中插入简码以嵌入完整工作站：
   ```text
   [vgt_mediacenter]
   ```

---

## 全量本地多语言架构 (i18n)

VGT Mediacenter 拥有独立编写且完全驻留于本地内存的国际化引擎 ([i18n.js](desktop/frontend/i18n.js)):
* **初次启动引导弹窗:** 新用户首次打开应用时，系统将主动弹窗引导用户选定习惯的母语。
* **顶部快捷切换器:** 点击界面顶部导航栏的 `🌐 [LANG]` 按钮，即可随时无缝变更语言。
* **零延迟更新:** 40 款内置工具的标题、描述、分类标签与所有对话框翻译均常驻 RAM，在 0 毫秒内原地重新渲染，绝不触发刷新白屏。

---

## 安全规范与零信任准则

* **内容安全策略 (CSP):** 全站处于严苛的 Content Security Policy 策略保护之下，严禁与未经授权的外部网络节点建立连接。
* **零数据遥测 (Zero Telemetry):** 无 Google Analytics 统计、无 Sentry 错误回传日志、无任何私有商业统计探针。
* **严格的 DOM 净化机制:** 所有动态插入的 HTML/SVG 文本均受到防御性编码与清洗，彻底斩断 DOM-XSS 注入漏洞路径。

---

## 开源许可证

VGT Mediacenter 属于自由开源软件，遵循 **GNU Affero 通用公共许可证 v3.0 (AGPLv3)**。  
详细法律协议条款请查阅 [LICENSE](LICENSE) 文件。

---

## 第三方依赖与致谢

本工作站内嵌的所有第三方外部库与开源组件均遵守宽松开源许可协议（包括 MIT、Apache-2.0、BSD-3-Clause、ISC 及 SIL OFL 1.1）。  
完整的作者名单、版权说明与对应许可证全文请查阅 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

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
*专注数字主权研发 • 隐私至上 • 零云端依赖*

</div>
