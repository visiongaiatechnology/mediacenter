/**
 * STATUS: PLATIN
 * Secret Scanner Pro - local browser scanner
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("vgt-secret-scan");
    if (!root) {
        return;
    }

    const MAX_FILES = 500;
    const MAX_TEXT_BYTES = 8 * 1024 * 1024;
    const TEXT_EXTENSIONS = new Set([
        "env", "txt", "md", "json", "yaml", "yml", "ini", "conf", "config", "xml", "html", "css", "js", "ts", "jsx", "tsx",
        "php", "py", "rb", "go", "rs", "java", "kt", "swift", "cs", "sh", "bash", "zsh", "ps1", "sql", "toml", "lock"
    ]);
    const TEXT_NAMES = new Set(["dockerfile", "makefile", "license", "readme", "gemfile"]);

    const patterns = [
        { type: "AWS Access Key", severity: "KRITISCH", regex: /\bAKIA[0-9A-Z]{16}\b/g },
        { type: "GitHub Token", severity: "KRITISCH", regex: /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9_]{30,}\b/g },
        { type: "GitHub Fine-Grained Token", severity: "KRITISCH", regex: /\bgithub_pat_[A-Za-z0-9_]{40,}\b/g },
        { type: "Slack Token", severity: "HOCH", regex: /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g },
        { type: "Stripe Live Secret", severity: "KRITISCH", regex: /\bsk_live_[A-Za-z0-9]{20,}\b/g },
        { type: "Google API Key", severity: "HOCH", regex: /\bAIza[0-9A-Za-z_-]{35}\b/g },
        { type: "JWT", severity: "HOCH", regex: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g },
        { type: "Private Key Block", severity: "KRITISCH", regex: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]+?-----END [A-Z ]*PRIVATE KEY-----/g },
        { type: "Sensitive Assignment", severity: "MITTEL", regex: /\b(?:api[_-]?key|token|secret|password|passwd|private[_-]?key|client[_-]?secret)\b\s*[:=]\s*["']?([^\s"',;]{8,})["']?/gi }
    ];

    const dom = {
        dropzone: document.getElementById("ss-dropzone"),
        fileInput: document.getElementById("ss-file-input"),
        dirInput: document.getElementById("ss-dir-input"),
        selectFiles: document.getElementById("ss-select-files"),
        selectDir: document.getElementById("ss-select-dir"),
        statFiles: document.getElementById("ss-stat-files"),
        statSkipped: document.getElementById("ss-stat-skipped"),
        statFindings: document.getElementById("ss-stat-findings"),
        progress: document.getElementById("ss-progress"),
        status: document.getElementById("ss-status"),
        resultList: document.getElementById("ss-result-list"),
        exportButton: document.getElementById("ss-export"),
        resetButton: document.getElementById("ss-reset")
    };

    const state = {
        files: 0,
        skipped: 0,
        findings: []
    };

    const clear = (node) => {
        if (!node) {
            return;
        }

        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    const setStatus = (message) => {
        if (dom.status) {
            dom.status.textContent = message;
        }
    };

    const setProgress = (value) => {
        if (dom.progress) {
            dom.progress.value = Math.max(0, Math.min(100, value));
        }
    };

    const updateStats = () => {
        if (dom.statFiles) {
            dom.statFiles.textContent = String(state.files);
        }
        if (dom.statSkipped) {
            dom.statSkipped.textContent = String(state.skipped);
        }
        if (dom.statFindings) {
            dom.statFindings.textContent = String(state.findings.length);
        }
        if (dom.exportButton) {
            dom.exportButton.disabled = state.findings.length === 0;
        }
    };

    const renderResults = () => {
        if (!dom.resultList) {
            return;
        }

        clear(dom.resultList);

        if (state.findings.length === 0) {
            const empty = document.createElement("p");
            empty.className = "ss-empty";
            empty.textContent = state.files > 0 ? "Keine Secrets erkannt." : "Noch keine Analyse gestartet.";
            dom.resultList.appendChild(empty);
            return;
        }

        state.findings.forEach((finding) => {
            const row = document.createElement("article");
            row.className = "ss-finding";

            const badge = document.createElement("span");
            badge.className = `ss-severity ${severityClass(finding.severity)}`;
            badge.textContent = finding.severity;

            const meta = document.createElement("div");
            meta.className = "ss-finding-meta";

            const title = document.createElement("strong");
            title.textContent = finding.type;

            const path = document.createElement("span");
            path.textContent = `${finding.path}:${finding.line}`;

            meta.append(title, path);

            const snippet = document.createElement("code");
            snippet.className = "ss-snippet";
            snippet.textContent = finding.snippet;

            row.append(badge, meta, snippet);
            dom.resultList.appendChild(row);
        });
    };

    const reset = () => {
        state.files = 0;
        state.skipped = 0;
        state.findings = [];
        setProgress(0);
        setStatus("Bereit fuer lokale Analyse.");
        updateStats();
        renderResults();
        if (dom.fileInput) {
            dom.fileInput.value = "";
        }
        if (dom.dirInput) {
            dom.dirInput.value = "";
        }
    };

    const getName = (file) => file.webkitRelativePath || file.name || "unknown";

    const getExtension = (name) => {
        const clean = name.toLowerCase().split(/[\\/]/).pop() || "";
        const index = clean.lastIndexOf(".");
        return index >= 0 ? clean.slice(index + 1) : clean;
    };

    const isTextCandidate = (name, size) => {
        if (size > MAX_TEXT_BYTES) {
            return false;
        }

        const basename = (name.toLowerCase().split(/[\\/]/).pop() || "").replace(/^\./, "");
        const extension = getExtension(name);
        return TEXT_EXTENSIONS.has(extension) || TEXT_NAMES.has(basename);
    };

    const maskSecret = (value) => {
        const compact = String(value).replace(/\s+/g, " ");
        if (compact.length <= 10) {
            return "********";
        }

        return `${compact.slice(0, 4)}...${compact.slice(-4)}`;
    };

    const getLineNumber = (content, index) => content.slice(0, index).split("\n").length;

    const buildSnippet = (content, match, index) => {
        const start = Math.max(0, index - 44);
        const end = Math.min(content.length, index + match.length + 44);
        const prefix = content.slice(start, index).replace(/\s+/g, " ");
        const suffix = content.slice(index + match.length, end).replace(/\s+/g, " ");
        return `${prefix}${maskSecret(match)}${suffix}`.trim();
    };

    const addFinding = (path, pattern, match, index, content) => {
        state.findings.push({
            severity: pattern.severity,
            type: pattern.type,
            path,
            line: getLineNumber(content, index),
            snippet: buildSnippet(content, match, index)
        });
    };

    const scanText = (path, content) => {
        patterns.forEach((pattern) => {
            pattern.regex.lastIndex = 0;
            let match = pattern.regex.exec(content);

            while (match) {
                const value = match[1] || match[0];
                const offset = match[0].indexOf(value);
                const index = match.index + Math.max(0, offset);
                addFinding(path, pattern, value, index, content);
                match = pattern.regex.exec(content);
            }
        });
    };

    const readZipEntries = async (file) => {
        if (!window.JSZip) {
            throw new Error("JSZip asset not available.");
        }

        const zip = await window.JSZip.loadAsync(file);
        const entries = [];

        zip.forEach((path, entry) => {
            if (!entry.dir && entries.length < MAX_FILES) {
                entries.push({ path, entry });
            }
        });

        for (let index = 0; index < entries.length; index += 1) {
            const item = entries[index];
            const data = item.entry._data || {};
            const size = Number(data.uncompressedSize || 0);

            if (!isTextCandidate(item.path, size)) {
                state.skipped += 1;
                continue;
            }

            setStatus(`ZIP Eintrag: ${item.path}`);
            const text = await item.entry.async("string");
            state.files += 1;
            scanText(`${file.name}/${item.path}`, text);
        }
    };

    const scanFiles = async (fileList) => {
        reset();
        const files = Array.from(fileList).slice(0, MAX_FILES);

        if (files.length === 0) {
            setStatus("Keine Dateien ausgewaehlt.");
            return;
        }

        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            const name = getName(file);
            const extension = getExtension(name);

            setProgress((index / files.length) * 100);
            setStatus(`Pruefe ${name}`);

            try {
                if (extension === "zip") {
                    await readZipEntries(file);
                } else if (isTextCandidate(name, file.size)) {
                    const text = await file.text();
                    state.files += 1;
                    scanText(name, text);
                } else {
                    state.skipped += 1;
                }
            } catch (_error) {
                state.skipped += 1;
            }

            updateStats();
            if (index % 20 === 0) {
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }

        if (fileList.length > MAX_FILES) {
            state.skipped += fileList.length - MAX_FILES;
        }

        setProgress(100);
        setStatus(state.findings.length > 0 ? "Analyse abgeschlossen. Findings maskiert gelistet." : "Analyse abgeschlossen. Keine Secrets erkannt.");
        updateStats();
        renderResults();
    };

    function severityClass(severity) {
        if (severity === "KRITISCH") {
            return "critical";
        }
        if (severity === "HOCH") {
            return "high";
        }
        return "medium";
    }

    const exportCsv = () => {
        if (state.findings.length === 0) {
            return;
        }

        const escapeCsv = (value) => `"${String(value).replace(/"/g, "\"\"")}"`;
        const lines = [
            ["severity", "type", "path", "line", "masked_snippet"].map(escapeCsv).join(","),
            ...state.findings.map((finding) => [
                finding.severity,
                finding.type,
                finding.path,
                finding.line,
                finding.snippet
            ].map(escapeCsv).join(","))
        ];

        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "vgt-secret-scan-report.csv";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    if (dom.selectFiles && dom.fileInput) {
        dom.selectFiles.addEventListener("click", () => dom.fileInput.click());
        dom.fileInput.addEventListener("change", () => scanFiles(dom.fileInput.files || []));
    }

    if (dom.selectDir && dom.dirInput) {
        dom.selectDir.addEventListener("click", () => dom.dirInput.click());
        dom.dirInput.addEventListener("change", () => scanFiles(dom.dirInput.files || []));
    }

    if (dom.dropzone) {
        dom.dropzone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dom.dropzone.classList.add("dragover");
        });
        dom.dropzone.addEventListener("dragleave", () => dom.dropzone.classList.remove("dragover"));
        dom.dropzone.addEventListener("drop", (event) => {
            event.preventDefault();
            dom.dropzone.classList.remove("dragover");
            scanFiles(event.dataTransfer ? event.dataTransfer.files : []);
        });
    }

    if (dom.exportButton) {
        dom.exportButton.addEventListener("click", exportCsv);
    }

    if (dom.resetButton) {
        dom.resetButton.addEventListener("click", reset);
    }

    updateStats();
    renderResults();
});
