const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname);
const toolsManifestPath = path.join(baseDir, 'tools-manifest.json');
const assetsManifestPath = path.join(baseDir, 'assets-manifest.json');
const toolsDir = path.join(baseDir, 'frontend', 'tools');

const toolsManifest = JSON.parse(fs.readFileSync(toolsManifestPath, 'utf8'));
const assetsManifest = JSON.parse(fs.readFileSync(assetsManifestPath, 'utf8'));

const templates = {};
for (const tool of toolsManifest) {
    const templatePath = path.join(toolsDir, tool.path, 'template.html');
    if (fs.existsSync(templatePath)) {
        templates[tool.id] = fs.readFileSync(templatePath, 'utf8');
    } else {
        console.warn(`Template missing for tool: ${tool.id} at ${templatePath}`);
    }
}

const outputContent = `/**
 * VGT MEDIACENTER V1.0 BETA — PRECOMPILED IN-MEMORY STORE
 * 100% Offline Sovereign • Zero CORS • Zero Latency
 */
window.VGT_TOOLS_MANIFEST = ${JSON.stringify(toolsManifest, null, 2)};

window.VGT_ASSETS_MANIFEST = ${JSON.stringify(assetsManifest, null, 2)};

window.VGT_TEMPLATES = ${JSON.stringify(templates, null, 2)};
`;

fs.writeFileSync(path.join(baseDir, 'manifests.js'), outputContent, 'utf8');
fs.writeFileSync(path.join(baseDir, 'frontend', 'manifests.js'), outputContent, 'utf8');

console.log(`Successfully generated manifests.js with ${Object.keys(templates).length} templates (${outputContent.length} bytes).`);
