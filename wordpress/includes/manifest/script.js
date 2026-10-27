/**
 * STATUS: PLATIN
 * Manifest Forge - local SHA-256 manifest builder
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("vgt-manifest");
    if (!root) {
        return;
    }

    const dom = {
        dropzone: document.getElementById("mf-dropzone"),
        fileInput: document.getElementById("mf-file-input"),
        dirInput: document.getElementById("mf-dir-input"),
        selectFiles: document.getElementById("mf-select-files"),
        selectDir: document.getElementById("mf-select-dir"),
        statFiles: document.getElementById("mf-stat-files"),
        statHashed: document.getElementById("mf-stat-hashed"),
        statOk: document.getElementById("mf-stat-ok"),
        progress: document.getElementById("mf-progress"),
        status: document.getElementById("mf-status"),
        output: document.getElementById("mf-output"),
        copy: document.getElementById("mf-copy"),
        download: document.getElementById("mf-download"),
        verifyInput: document.getElementById("mf-verify-input"),
        verify: document.getElementById("mf-verify"),
        results: document.getElementById("mf-results")
    };

    let records = [];
    let manifestText = "";

    const clear = (node) => {
        while (node && node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    const filePath = (file) => file.webkitRelativePath || file.name || "unknown";

    const hex = (buffer) => Array.from(new Uint8Array(buffer)).map((byte) => byte.toString(16).padStart(2, "0")).join("");

    const setProgress = (value) => {
        if (dom.progress) {
            dom.progress.value = Math.max(0, Math.min(100, value));
        }
    };

    const setStatus = (message) => {
        if (dom.status) {
            dom.status.textContent = message;
        }
    };

    const updateStats = (files, hashed, ok) => {
        if (dom.statFiles) dom.statFiles.textContent = String(files);
        if (dom.statHashed) dom.statHashed.textContent = String(hashed);
        if (dom.statOk) dom.statOk.textContent = String(ok);
        if (dom.copy) dom.copy.disabled = manifestText === "";
        if (dom.download) dom.download.disabled = manifestText === "";
        if (dom.verify) dom.verify.disabled = records.length === 0;
    };

    const hashFile = async (file) => {
        const digest = await crypto.subtle.digest("SHA-256", await file.arrayBuffer());
        return hex(digest);
    };

    const buildManifest = async (fileList) => {
        if (!crypto.subtle) {
            setStatus("Web Crypto API ist in diesem Kontext nicht verfuegbar.");
            return;
        }

        const files = Array.from(fileList);
        records = [];
        manifestText = "";
        if (dom.output) dom.output.value = "";
        updateStats(files.length, 0, 0);
        setProgress(0);

        if (files.length === 0) {
            setStatus("Keine Dateien ausgewaehlt.");
            return;
        }

        for (let index = 0; index < files.length; index += 1) {
            const file = files[index];
            const path = filePath(file);
            setStatus(`Hashing: ${path}`);
            const sha256 = await hashFile(file);
            records.push({ path, sha256 });
            updateStats(files.length, records.length, 0);
            setProgress(((index + 1) / files.length) * 100);

            if (index % 8 === 0) {
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }

        records.sort((a, b) => a.path.localeCompare(b.path));
        manifestText = records.map((record) => `${record.sha256}  ${record.path}`).join("\n");
        if (dom.output) dom.output.value = manifestText;
        setStatus("Manifest erstellt.");
        updateStats(files.length, records.length, 0);
    };

    const parseManifest = (text) => {
        const map = new Map();
        text.split(/\r?\n/).forEach((line) => {
            const trimmed = line.trim();
            const match = trimmed.match(/^([a-f0-9]{64})\s+\*?(.+)$/i);
            if (match) {
                map.set(match[2].trim(), match[1].toLowerCase());
            }
        });
        return map;
    };

    const renderVerify = (items) => {
        if (!dom.results) {
            return;
        }

        clear(dom.results);
        if (items.length === 0) {
            const empty = document.createElement("p");
            empty.className = "mf-empty";
            empty.textContent = "Keine Manifest-Zeilen erkannt.";
            dom.results.appendChild(empty);
            return;
        }

        items.forEach((item) => {
            const row = document.createElement("article");
            row.className = `mf-result ${item.status}`;

            const badge = document.createElement("span");
            badge.textContent = item.status === "ok" ? "OK" : item.status === "missing" ? "Missing" : "Mismatch";

            const text = document.createElement("strong");
            text.textContent = item.path;

            row.append(badge, text);
            dom.results.appendChild(row);
        });
    };

    const verifyManifest = () => {
        const expected = parseManifest(dom.verifyInput ? dom.verifyInput.value : "");
        const actual = new Map(records.map((record) => [record.path, record.sha256]));
        const items = [];
        let ok = 0;

        expected.forEach((hash, path) => {
            const current = actual.get(path);
            if (!current) {
                items.push({ path, status: "missing" });
                return;
            }

            if (current === hash) {
                ok += 1;
                items.push({ path, status: "ok" });
                return;
            }

            items.push({ path, status: "mismatch" });
        });

        updateStats(records.length, records.length, ok);
        renderVerify(items);
    };

    const copyManifest = async () => {
        if (manifestText && navigator.clipboard) {
            await navigator.clipboard.writeText(manifestText);
        }
    };

    const downloadManifest = () => {
        if (!manifestText) {
            return;
        }

        const blob = new Blob([manifestText], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "SHA256SUMS.txt";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    if (dom.selectFiles && dom.fileInput) {
        dom.selectFiles.addEventListener("click", () => dom.fileInput.click());
        dom.fileInput.addEventListener("change", () => buildManifest(dom.fileInput.files || []));
    }

    if (dom.selectDir && dom.dirInput) {
        dom.selectDir.addEventListener("click", () => dom.dirInput.click());
        dom.dirInput.addEventListener("change", () => buildManifest(dom.dirInput.files || []));
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
            buildManifest(event.dataTransfer ? event.dataTransfer.files : []);
        });
    }

    if (dom.copy) dom.copy.addEventListener("click", copyManifest);
    if (dom.download) dom.download.addEventListener("click", downloadManifest);
    if (dom.verify) dom.verify.addEventListener("click", verifyManifest);

    updateStats(0, 0, 0);
});
