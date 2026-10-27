/**
 * VGT MEDIACENTER - PACKET-VIZ LOGIC
 * STATUS: DIAMANT SUPREME (Hardened JS Engine)
 * Vektor: DOM-XSS Prevention, Memory Leak Protection & Object Encapsulation
 * Binary PCAP/PCAPNG Heuristic Parser & D3.v7 Force-Directed Graph Engine.
 * Sandbox Architecture: 100% Client-Side.
 */
"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Kognitiver Guard: Existiert die Workspace-Matrix?
    if (!document.getElementById('vgt-packetviz')) return;

    const PacketVizEngine = {
        DOM: {},
        State: {
            graphData: { nodes: [], links: [] },
            simulation: null,
            svg: null,
            totalTrafficVolume: 0,
            MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB Limit für PCAP Heuristik-Slicing
            
            // XSS Safe SVGs
            svgPlay: '<svg viewBox="0 0 24 24" class="svg-icon"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
            svgPause: '<svg viewBox="0 0 24 24" class="svg-icon"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
        },

        init() {
            this.cacheDOM();
            this.waitForDependencies();
        },

        cacheDOM() {
            this.DOM = {
                dropZone: document.getElementById('pv-dropzone'),
                fileInput: document.getElementById('pv-file-input'),
                workspace: document.getElementById('pv-workspace'),
                btnReset: document.getElementById('btn-pv-reset'),
                
                lblFile: document.getElementById('stat-filename'),
                lblNodes: document.getElementById('stat-nodes'),
                lblLinks: document.getElementById('stat-links'),
                
                loader: document.getElementById('pv-loader'),
                loaderText: document.getElementById('pv-loader-text'),
                d3Container: document.getElementById('d3-container'),
                
                btnPause: document.getElementById('btn-physics-pause'),
                btnResume: document.getElementById('btn-physics-resume'),
                
                insEmpty: document.getElementById('node-inspector-empty'),
                insActive: document.getElementById('node-inspector-active'),
                niType: document.getElementById('ni-type'),
                niName: document.getElementById('ni-name'),
                niWeight: document.getElementById('ni-weight'),
                niPercent: document.getElementById('ni-percent'),
                niInbound: document.getElementById('ni-inbound'),
                niOutbound: document.getElementById('ni-outbound'),
                
                topNodesList: document.getElementById('top-nodes-list'),
                
                nodeTableBody: document.getElementById('pv-node-table-body'),
                btnExport: document.getElementById('btn-pv-export')
            };
        },

        waitForDependencies() {
            // Await D3.js dependency (via SRI loaded)
            const ensureLibLoaded = setInterval(() => {
                if (typeof d3 !== 'undefined') {
                    clearInterval(ensureLibLoaded);
                    this.bindEvents();
                    console.log('VGT PACKET-VIZ: Forensic Graph Engine Active.');
                }
            }, 100);
        },

        // --- SAFE DOM UTILS ---
        safeClearOutput(element) {
            if (!element) return;
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },

        injectSVG(element, svgString) {
            this.safeClearOutput(element);
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgString, 'text/html');
            const svgNode = doc.querySelector('svg');
            if (svgNode) {
                element.appendChild(svgNode);
            }
        },

        // --- CORE INGESTION & UI BINDING ---
        bindEvents() {
            // Ingestion
            this.DOM.dropZone.addEventListener('dragover', (e) => { 
                e.preventDefault(); 
                this.DOM.dropZone.classList.add('dragover'); 
            });
            this.DOM.dropZone.addEventListener('dragleave', () => {
                this.DOM.dropZone.classList.remove('dragover');
            });
            this.DOM.dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                this.DOM.dropZone.classList.remove('dragover');
                if (e.dataTransfer.files.length) this.handleFile(e.dataTransfer.files[0]);
            });
            
            this.DOM.dropZone.addEventListener('click', () => this.DOM.fileInput.click());
            this.DOM.fileInput.addEventListener('change', (e) => {
                if (e.target.files.length) this.handleFile(e.target.files[0]);
            });

            this.DOM.btnReset.addEventListener('click', () => this.resetTool());
            this.DOM.btnExport.addEventListener('click', () => this.exportCSV());

            // Physics Engine Controls
            this.DOM.btnPause.addEventListener('click', () => {
                if (this.State.simulation) this.State.simulation.stop();
                this.DOM.btnPause.classList.add('active');
                this.DOM.btnResume.classList.remove('active');
            });
            this.DOM.btnResume.addEventListener('click', () => {
                if (this.State.simulation) this.State.simulation.alphaTarget(0.3).restart();
                this.DOM.btnResume.classList.add('active');
                this.DOM.btnPause.classList.remove('active');
                // Auto cooldown
                setTimeout(() => { 
                    if(this.State.simulation) this.State.simulation.alphaTarget(0); 
                }, 500); 
            });
        },

        resetTool() {
            this.DOM.workspace.classList.add('hidden');
            this.DOM.dropZone.classList.remove('hidden');
            this.DOM.fileInput.value = '';
            
            if (this.State.simulation) this.State.simulation.stop();
            
            this.safeClearOutput(this.DOM.d3Container);
            this.DOM.insActive.classList.add('hidden');
            this.DOM.insEmpty.classList.remove('hidden');
            
            this.safeClearOutput(this.DOM.topNodesList);
            this.safeClearOutput(this.DOM.nodeTableBody);
            
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.className = 'empty-cell';
            td.colSpan = 3;
            td.textContent = 'Warte auf Scan-Ergebnisse...';
            tr.appendChild(td);
            this.DOM.nodeTableBody.appendChild(tr);

            this.State.graphData = { nodes: [], links: [] };
            this.State.totalTrafficVolume = 0;
        },

        handleFile(file) {
            const validExts = ['.pcap', '.pcapng', '.eth'];
            const isMatch = validExts.some(ext => file.name.toLowerCase().endsWith(ext));
            if (!isMatch && file.type !== 'application/vnd.tcpdump.pcap') {
                return alert("VGT SECURITY BLOCK: Bitte laden Sie einen legitimen .pcap, .pcapng oder .eth Dump hoch.");
            }

            if (file.size > this.State.MAX_FILE_SIZE) {
                alert("VGT PERFORMANCE WARNING: Datei ist >50MB. Um Browser-Crashes zu vermeiden, analysiert die VGT-Heuristik nur die ersten 50 Megabyte des Dumps.");
            }

            this.DOM.dropZone.classList.add('hidden');
            this.DOM.workspace.classList.remove('hidden');
            this.DOM.lblFile.textContent = file.name; // XSS Safe
            this.DOM.loader.classList.remove('hidden');
            
            // Allow UI to update before blocking main thread
            setTimeout(() => this.readBuffer(file), 100);
        },

        // --- HEURISTIC PARSING ENGINE ---
        readBuffer(file) {
            const reader = new FileReader();
            const slice = file.slice(0, this.State.MAX_FILE_SIZE); // RAM Limit Protection
            
            reader.onload = (e) => {
                const buffer = e.target.result;
                this.DOM.loaderText.textContent = "Extrahiere ASCII Strings...";
                setTimeout(() => this.processHeuristics(buffer), 50);
            };
            
            reader.onerror = () => {
                alert("VGT KERNEL ERROR: Sandbox Memory Access Denied.");
                this.resetTool();
            };

            reader.readAsArrayBuffer(slice);
        },

        processHeuristics(buffer) {
            const view = new Uint8Array(buffer);
            let asciiStr = '';
            
            // Step 1: Rapid ASCII Extraction (Strings >= 4 chars)
            let tempStr = '';
            for (let i = 0; i < view.length; i++) {
                const byte = view[i];
                if (byte >= 32 && byte <= 126) {
                    tempStr += String.fromCharCode(byte);
                } else {
                    if (tempStr.length >= 4) {
                        asciiStr += tempStr + ' ';
                    }
                    tempStr = '';
                }
            }

            this.DOM.loaderText.textContent = "Analysiere Routing-Topologie...";

            setTimeout(() => {
                // Step 2: Regex Matching
                const ipRegex = /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g;
                // Basic domain regex
                const domainRegex = /\b([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}\b/gi;

                const ips = asciiStr.match(ipRegex) || [];
                const domains = asciiStr.match(domainRegex) || [];

                // Filter out fake IPs (e.g. 999.999.999.999)
                const validIps = ips.filter(ip => {
                    const parts = ip.split('.');
                    return parts.every(p => parseInt(p, 10) >= 0 && parseInt(p, 10) <= 255);
                });

                // Combine sequence to simulate flows (heuristic correlation)
                // Limit to top 5000 to avoid freezing
                const entities = [...validIps, ...domains].slice(0, 5000); 

                const nodeMap = {};
                const linkMap = {};
                let prevEntity = null;

                entities.forEach(ent => {
                    const e = ent.toLowerCase();
                    // Ignore common false positives or very short strings
                    if (e.length < 5 || e === '127.0.0.1' || e === '0.0.0.0') return;

                    // Add Node
                    if (!nodeMap[e]) {
                        nodeMap[e] = { 
                            id: e, 
                            type: validIps.includes(ent) ? 'IP' : 'Domain',
                            weight: 0 
                        };
                    }
                    nodeMap[e].weight += 1;
                    this.State.totalTrafficVolume += 1;

                    // Build Link
                    if (prevEntity && prevEntity !== e) {
                        // Gerichtete Kanten: Flow geht zwingend von prevEntity -> e
                        const linkKey = `${prevEntity}:::${e}`;
                        if (!linkMap[linkKey]) {
                            linkMap[linkKey] = { source: prevEntity, target: e, value: 0 };
                        }
                        linkMap[linkKey].value += 1;
                    }
                    prevEntity = e;
                });

                // Filter noise & Convert to D3 Format
                const sortedNodes = Object.values(nodeMap).sort((a,b) => b.weight - a.weight).slice(0, 150);
                const validIds = new Set(sortedNodes.map(n => n.id));
                const filteredLinks = Object.values(linkMap).filter(l => validIds.has(l.source) && validIds.has(l.target));

                this.State.graphData = {
                    nodes: sortedNodes,
                    links: filteredLinks
                };

                this.DOM.lblNodes.textContent = this.State.graphData.nodes.length;
                this.DOM.lblLinks.textContent = this.State.graphData.links.length;

                this.DOM.loaderText.textContent = "Initialisiere Physik-Engine (D3)...";
                
                this.renderNodeTable();
                
                setTimeout(() => this.renderD3Graph(), 50);

            }, 50);
        },

        // --- RENDER ENGINES ---
        renderNodeTable() {
            this.safeClearOutput(this.DOM.nodeTableBody);

            if (!this.State.graphData.nodes || this.State.graphData.nodes.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.className = 'empty-cell';
                td.colSpan = 3;
                td.textContent = 'Keine Datenpunkte identifiziert.';
                tr.appendChild(td);
                this.DOM.nodeTableBody.appendChild(tr);
                return;
            }

            const frag = document.createDocumentFragment();

            this.State.graphData.nodes.forEach(node => {
                const tr = document.createElement('tr');
                
                // Column 1: ID
                const tdId = document.createElement('td');
                tdId.style.color = 'rgba(34, 211, 238, 1)';
                tdId.style.fontWeight = 'bold';
                tdId.textContent = node.id; // XSS Safe
                
                // Column 2: Type Badge
                const tdType = document.createElement('td');
                const spanBadge = document.createElement('span');
                spanBadge.className = `table-type-badge ${node.type === 'IP' ? 'ip' : 'domain'}`;
                spanBadge.textContent = node.type;
                tdType.appendChild(spanBadge);
                
                // Column 3: Weight
                const tdWeight = document.createElement('td');
                tdWeight.style.color = 'var(--vg-text-muted)';
                tdWeight.textContent = `${node.weight.toLocaleString('de-DE')} Hits`;
                
                tr.appendChild(tdId);
                tr.appendChild(tdType);
                tr.appendChild(tdWeight);
                frag.appendChild(tr);
            });
            
            this.DOM.nodeTableBody.appendChild(frag);
        },

        populateTopNodesList() {
            this.safeClearOutput(this.DOM.topNodesList);
            
            const topNodes = [...this.State.graphData.nodes].sort((a,b) => b.weight - a.weight).slice(0, 10);
            const frag = document.createDocumentFragment();
            
            topNodes.forEach(node => {
                const item = document.createElement('div');
                item.className = 'top-node-item';
                
                const spanName = document.createElement('span');
                spanName.className = 'tni-name';
                spanName.title = node.id;
                spanName.textContent = node.id; // XSS Safe
                
                const spanCount = document.createElement('span');
                spanCount.className = 'tni-count';
                spanCount.textContent = `${node.weight} Pkts`;
                
                item.appendChild(spanName);
                item.appendChild(spanCount);
                
                item.addEventListener('click', () => {
                    const allNodes = d3.selectAll('.node');
                    const allLinks = d3.selectAll('.link');
                    this.selectNodeInD3(node, allNodes, allLinks);
                });
                
                frag.appendChild(item);
            });
            
            this.DOM.topNodesList.appendChild(frag);
        },

        // --- D3 FORCE GRAPH SYSTEM ---
        renderD3Graph() {
            this.safeClearOutput(this.DOM.d3Container);
            
            const containerWidth = this.DOM.d3Container.clientWidth;
            const containerHeight = this.DOM.d3Container.clientHeight;

            const colorIP = 'rgba(34, 211, 238, 1)'; // Cyan
            const colorDomain = 'rgba(168, 85, 247, 1)'; // Purple

            this.State.svg = d3.select("#d3-container")
                .append("svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight)
                .call(d3.zoom().on("zoom", (event) => {
                    g.attr("transform", event.transform);
                }))
                .append("g"); 

            // Marker Setup
            this.State.svg.append("defs").selectAll("marker")
                .data(["arrow-default", "arrow-in", "arrow-out"])
                .join("marker")
                .attr("id", String)
                .attr("viewBox", "0 -5 10 10")
                .attr("refX", 18) 
                .attr("refY", 0)
                .attr("orient", "auto")
                .attr("markerWidth", 5)
                .attr("markerHeight", 5)
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")
                .attr("fill", d => {
                    if (d === "arrow-in") return "rgba(34, 211, 238, 1)"; 
                    if (d === "arrow-out") return "rgba(244, 114, 182, 1)"; 
                    return "rgba(255,255,255,0.3)";
                });

            const g = this.State.svg; 

            const maxWeight = d3.max(this.State.graphData.nodes, d => d.weight) || 1;
            const maxLinkVal = d3.max(this.State.graphData.links, d => d.value) || 1;

            // Physics Simulator
            this.State.simulation = d3.forceSimulation(this.State.graphData.nodes)
                .force("link", d3.forceLink(this.State.graphData.links).id(d => d.id).distance(100))
                .force("charge", d3.forceManyBody().strength(-150)) 
                .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
                .force("collide", d3.forceCollide().radius(d => Math.sqrt(d.weight / maxWeight) * 20 + 10).iterations(2));

            // Links
            const link = g.append("g")
                .attr("stroke", "rgba(255,255,255,0.15)")
                .selectAll("line")
                .data(this.State.graphData.links)
                .join("line")
                .attr("class", "link")
                .attr("stroke-width", d => Math.max(1, (d.value / maxLinkVal) * 5))
                .attr("marker-end", "url(#arrow-default)");

            // Engine Reference required inside D3 Context
            const engine = this;

            // Drag Behavior Function
            function drag(simulation) {
                function dragstarted(event) {
                    if (!event.active) simulation.alphaTarget(0.3).restart();
                    event.subject.fx = event.subject.x;
                    event.subject.fy = event.subject.y;
                }
                function dragged(event) {
                    event.subject.fx = event.x;
                    event.subject.fy = event.y;
                }
                function dragended(event) {
                    if (!event.active) simulation.alphaTarget(0);
                    event.subject.fx = null;
                    event.subject.fy = null;
                }
                return d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended);
            }

            // Nodes
            const node = g.append("g")
                .selectAll("g")
                .data(this.State.graphData.nodes)
                .join("g")
                .attr("class", "node")
                .call(drag(this.State.simulation))
                .on("click", function(event, d) {
                    // D3 context function passes original DOM node, we just route the data
                    engine.selectNodeInD3(d, node, link);
                });

            node.append("circle")
                .attr("r", d => Math.max(5, Math.sqrt(d.weight / maxWeight) * 20))
                .attr("fill", d => d.type === 'IP' ? colorIP : colorDomain);

            node.append("text")
                .attr("dx", 12)
                .attr("dy", ".35em")
                .text(d => d.weight > (maxWeight*0.1) ? d.id : ""); 

            // Tick Update
            this.State.simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node.attr("transform", d => `translate(${d.x},${d.y})`);
            });

            this.DOM.loader.classList.add('hidden');
            this.populateTopNodesList();
        },

        // --- INTERACTIVITY ---
        selectNodeInD3(d, allNodes, allLinks) {
            allNodes.classed('highlight', false);
            allNodes.filter(n => n.id === d.id).classed('highlight', true);
            
            allLinks.classed('highlight-in', false).classed('highlight-out', false)
                    .attr("marker-end", "url(#arrow-default)");
            
            allLinks.filter(l => l.target.id === d.id)
                    .classed('highlight-in', true)
                    .attr("marker-end", "url(#arrow-in)");

            allLinks.filter(l => l.source.id === d.id)
                    .classed('highlight-out', true)
                    .attr("marker-end", "url(#arrow-out)");

            this.updateNodeInspector(d, allNodes, allLinks);
        },

        updateNodeInspector(d, allNodes, allLinks) {
            this.DOM.insEmpty.classList.add('hidden');
            this.DOM.insActive.classList.remove('hidden');

            this.DOM.niType.textContent = `${d.type} Node`;
            this.DOM.niType.style.color = d.type === 'IP' ? 'rgba(34, 211, 238, 1)' : 'rgba(168, 85, 247, 1)';
            this.DOM.niName.textContent = d.id; // XSS Safe
            this.DOM.niWeight.textContent = d.weight;
            
            const pct = ((d.weight / this.State.totalTrafficVolume) * 100).toFixed(2);
            this.DOM.niPercent.textContent = `${pct}%`;

            const inboundLinks = this.State.graphData.links.filter(l => l.target.id === d.id);
            const outboundLinks = this.State.graphData.links.filter(l => l.source.id === d.id);
            
            const inTargets = new Set(inboundLinks.map(l => l.source.id));
            const outTargets = new Set(outboundLinks.map(l => l.target.id));

            // Populate Inbound
            this.safeClearOutput(this.DOM.niInbound);
            if(inTargets.size === 0) {
                const emptyIn = document.createElement('span');
                emptyIn.style.cssText = 'color:var(--vg-text-muted);font-size:0.7rem;';
                emptyIn.textContent = 'Keine';
                this.DOM.niInbound.appendChild(emptyIn);
            } else {
                Array.from(inTargets).forEach(t => {
                    const tag = document.createElement('span');
                    tag.className = 'target-tag inbound';
                    tag.textContent = t; // XSS Safe
                    tag.addEventListener('click', () => {
                        const targetNodeData = this.State.graphData.nodes.find(n => n.id === t);
                        if(targetNodeData) this.selectNodeInD3(targetNodeData, allNodes, allLinks);
                    });
                    this.DOM.niInbound.appendChild(tag);
                });
            }

            // Populate Outbound
            this.safeClearOutput(this.DOM.niOutbound);
            if(outTargets.size === 0) {
                const emptyOut = document.createElement('span');
                emptyOut.style.cssText = 'color:var(--vg-text-muted);font-size:0.7rem;';
                emptyOut.textContent = 'Keine';
                this.DOM.niOutbound.appendChild(emptyOut);
            } else {
                Array.from(outTargets).forEach(t => {
                    const tag = document.createElement('span');
                    tag.className = 'target-tag outbound';
                    tag.textContent = t; // XSS Safe
                    tag.addEventListener('click', () => {
                        const targetNodeData = this.State.graphData.nodes.find(n => n.id === t);
                        if(targetNodeData) this.selectNodeInD3(targetNodeData, allNodes, allLinks);
                    });
                    this.DOM.niOutbound.appendChild(tag);
                });
            }
        },

        // --- CSV EXPORT ---
        exportCSV() {
            if (!this.State.graphData.nodes || this.State.graphData.nodes.length === 0) return;
            
            // Build CSV natively (Zero Dependency)
            let csvContent = "Entity,Type,Weight\n";
            this.State.graphData.nodes.forEach(n => {
                const safeId = n.id.replace(/"/g, '""'); // CSV Masking
                csvContent += `"${safeId}","${n.type}",${n.weight}\n`;
            });

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = `VGT_PacketViz_Nodes_${new Date().getTime()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url); // Memory Free
        }
    };

    PacketVizEngine.init();
});