# Security Policy — VGT Mediacenter

## Security Model & Zero-Trust Invariant
VGT Mediacenter is built from the ground up as an **offline-first, sovereign workstation**:
* **Zero Cloud:** No outgoing network telemetry, analytics, or tracking pings.
* **Client-Side Processing:** All cryptographic hashing, encryption, document redaction, and audio processing occurs strictly within the local memory space of the host machine.
* **Input Sanitization:** All HTML rendering and SVG visualization pathways pass through strict sanitization guards to prevent DOM-based Cross-Site Scripting (XSS).

## Supported Versions
Security updates and patches are actively maintained for the following versions:

| Version | Supported | Status |
| :--- | :---: | :--- |
| **V1.0 Beta** | :white_check_mark: | Active Development & Hardening |
| < 1.0.0 | :x: | Deprecated Legacy Prototypes |

## Reporting a Vulnerability
We welcome responsible disclosure of potential security vulnerabilities. If you discover a security flaw:
1. **Do not disclose publicly** in GitHub issues, forums, or social media.
2. Email the core security team at `security@visiongaia.de` with detailed reproduction steps, technical impact assessment, and proof-of-concept material.
3. You will receive an acknowledgment within 24 hours and a coordinated disclosure timeline.
