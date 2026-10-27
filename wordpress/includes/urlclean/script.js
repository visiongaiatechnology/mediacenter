/**
 * STATUS: PLATIN
 * URL Cleaner Pro - local tracking parameter sanitizer
 */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("vgt-url-clean");
    if (!root) {
        return;
    }

    const trackingParams = new Set([
        "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id", "utm_name", "utm_reader", "utm_viz_id",
        "fbclid", "gclid", "gbraid", "wbraid", "dclid", "msclkid", "mc_cid", "mc_eid", "igshid", "twclid", "yclid",
        "_hsenc", "_hsmi", "vero_id", "mkt_tok", "oly_enc_id", "oly_anon_id", "pk_campaign", "pk_kwd", "piwik_campaign",
        "ga_source", "ga_medium", "ga_term", "ga_content", "ga_campaign", "sc_campaign", "sc_channel", "spm", "ref_src"
    ]);

    const redirectParams = ["url", "u", "target", "redirect", "redirect_url", "destination", "dest", "to", "r"];

    const dom = {
        input: document.getElementById("uc-input"),
        clean: document.getElementById("uc-clean"),
        sample: document.getElementById("uc-sample"),
        reset: document.getElementById("uc-reset"),
        copy: document.getElementById("uc-copy"),
        results: document.getElementById("uc-results"),
        statUrls: document.getElementById("uc-stat-urls"),
        statRemoved: document.getElementById("uc-stat-removed"),
        statRedirects: document.getElementById("uc-stat-redirects")
    };

    let outputLines = [];

    const clear = (node) => {
        while (node && node.firstChild) {
            node.removeChild(node.firstChild);
        }
    };

    const setStats = (urls, removed, redirects) => {
        if (dom.statUrls) dom.statUrls.textContent = String(urls);
        if (dom.statRemoved) dom.statRemoved.textContent = String(removed);
        if (dom.statRedirects) dom.statRedirects.textContent = String(redirects);
        if (dom.copy) dom.copy.disabled = outputLines.length === 0;
    };

    const parseUrl = (value) => {
        try {
            return new URL(value);
        } catch (_error) {
            try {
                return new URL(`https://${value}`);
            } catch (_fallbackError) {
                return null;
            }
        }
    };

    const unwrapRedirect = (url) => {
        for (const key of redirectParams) {
            const value = url.searchParams.get(key);
            if (!value) {
                continue;
            }

            const nested = parseUrl(value);
            if (nested) {
                return nested;
            }
        }

        return null;
    };

    const cleanUrl = (raw) => {
        const parsed = parseUrl(raw.trim());
        if (!parsed) {
            return { ok: false, input: raw, output: "", removed: [], redirected: false };
        }

        const nested = unwrapRedirect(parsed);
        const target = nested || parsed;
        const removed = [];

        Array.from(target.searchParams.keys()).forEach((key) => {
            if (trackingParams.has(key.toLowerCase())) {
                removed.push(key);
                target.searchParams.delete(key);
            }
        });

        target.hash = "";
        return {
            ok: true,
            input: raw,
            output: target.toString(),
            removed,
            redirected: Boolean(nested)
        };
    };

    const render = (items) => {
        if (!dom.results) {
            return;
        }

        clear(dom.results);

        if (items.length === 0) {
            const empty = document.createElement("p");
            empty.className = "uc-empty";
            empty.textContent = "Noch keine URL bereinigt.";
            dom.results.appendChild(empty);
            return;
        }

        items.forEach((item) => {
            const row = document.createElement("article");
            row.className = item.ok ? "uc-result" : "uc-result invalid";

            const status = document.createElement("span");
            status.className = item.ok ? "uc-status clean" : "uc-status invalid";
            status.textContent = item.ok ? "Clean" : "Invalid";

            const body = document.createElement("div");
            body.className = "uc-result-body";

            const output = document.createElement("strong");
            output.textContent = item.ok ? item.output : item.input;

            const meta = document.createElement("small");
            meta.textContent = item.ok
                ? `${item.removed.length} Parameter entfernt${item.redirected ? " · Redirect geloest" : ""}`
                : "Nicht als URL lesbar";

            body.append(output, meta);
            row.append(status, body);
            dom.results.appendChild(row);
        });
    };

    const runClean = () => {
        const lines = dom.input ? dom.input.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean) : [];
        const items = lines.map(cleanUrl);
        outputLines = items.filter((item) => item.ok).map((item) => item.output);

        const removed = items.reduce((sum, item) => sum + (item.ok ? item.removed.length : 0), 0);
        const redirects = items.filter((item) => item.redirected).length;
        setStats(lines.length, removed, redirects);
        render(items);
    };

    const reset = () => {
        if (dom.input) dom.input.value = "";
        outputLines = [];
        setStats(0, 0, 0);
        render([]);
    };

    const loadSample = () => {
        if (!dom.input) {
            return;
        }

        dom.input.value = [
            "https://visiongaia.de/blog?v=1&utm_source=newsletter&utm_campaign=launch&fbclid=abc123",
            "https://r.example/redirect?url=https%3A%2F%2Fvisiongaia.de%2Ftools%3Fgclid%3Dtest%26utm_medium%3Dcpc",
            "example.org/page?mc_cid=abc&keep=this#tracking"
        ].join("\n");
        runClean();
    };

    const copyOutput = async () => {
        if (outputLines.length === 0 || !navigator.clipboard) {
            return;
        }

        await navigator.clipboard.writeText(outputLines.join("\n"));
    };

    if (dom.clean) dom.clean.addEventListener("click", runClean);
    if (dom.sample) dom.sample.addEventListener("click", loadSample);
    if (dom.reset) dom.reset.addEventListener("click", reset);
    if (dom.copy) dom.copy.addEventListener("click", copyOutput);

    reset();
});
