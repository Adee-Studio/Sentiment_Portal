/**
 * Main Application Orchestrator for Sentix Enterprise Portal
 * Features Dynamic ABSA Live Updating with Sandbox Text Classifier inputs
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Animated Splash Screen Loading Handler
    const splashScreen = document.getElementById("splashScreen");
    const splashFill = document.getElementById("splashFill");
    const splashStatus = document.getElementById("splashStatus");

    if (splashScreen && splashFill) {
        setTimeout(() => { splashFill.style.width = "40%"; }, 200);
        setTimeout(() => { 
            splashFill.style.width = "85%"; 
            splashStatus.textContent = "Connecting Enterprise System REST API & Risk Matrix...";
        }, 700);
        setTimeout(() => { 
            splashFill.style.width = "100%"; 
            splashStatus.textContent = "System Ready! Loading Sentix Dashboard...";
        }, 1200);
        
        setTimeout(() => {
            splashScreen.classList.add("fade-out");
        }, 1600);
    }

    // 2. Initialize Core State & Engines
    const enterpriseManager = new EnterpriseManager(INITIAL_SOCIAL_POSTS, INITIAL_ENTERPRISE_TICKETS, AUDIT_LOGS);
    const itpmManager = new ITPMManager(EVM_INITIAL_METRICS, INITIAL_GANTT_TASKS, INITIAL_RISKS);

    // Live Aspect Polarity Scores state map
    const aspectScores = {
        'UI/UX & UPI': 0.88,
        'Performance': -0.85,
        'Billing': -0.62,
        'Security': 0.94,
        'Support': -0.76
    };

    let trendChartInstance = null;
    let distroChartInstance = null;
    let aspectChartInstance = null;

    // 3. Tab Navigation Setup
    const navItems = document.querySelectorAll(".nav-item");
    const tabContents = document.querySelectorAll(".tab-content");
    const pageTitle = document.getElementById("pageTitle");
    const pageSubTitle = document.getElementById("pageSubTitle");

    const tabTitles = {
        "tab-overview": { title: "Executive Overview Dashboard", sub: "Unified Brand Sentiment Analysis & IT Project Performance Metrics (INR ₹)" },
        "tab-social": { title: "Advanced Social Text Media Analysis", sub: "NLP Sentiment Classification, ABSA, Emotion Vectoring & Live Stream" },
        "tab-enterprise": { title: "Enterprise System (ES) Control Center", sub: "Role-Based Workflows, Auto Incident Pipeline & Audit Log Governance" },
        "tab-itpm": { title: "ITPM Project Management Suite", sub: "Gantt WBS Timeline, Earned Value Control (EVM ₹) & Agile Kanban" }
    };

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-tab");
            
            navItems.forEach(nav => nav.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            item.classList.add("active");
            document.getElementById(targetTab).classList.add("active");

            if (tabTitles[targetTab]) {
                pageTitle.textContent = tabTitles[targetTab].title;
                pageSubTitle.textContent = tabTitles[targetTab].sub;
            }

            renderCharts();
        });
    });

    // 4. Role Selector Setup
    const roleSelector = document.getElementById("roleSelector");
    roleSelector.addEventListener("change", (e) => {
        enterpriseManager.setRole(e.target.value);
        renderAuditLogs();
    });

    // 5. Data Export Buttons
    document.getElementById("btnExportJSON").addEventListener("click", () => {
        const { filename, dataStr } = enterpriseManager.exportData("json");
        triggerDownload(filename, dataStr);
    });

    document.getElementById("btnExportCSV").addEventListener("click", () => {
        const { filename, dataStr } = enterpriseManager.exportData("csv");
        triggerDownload(filename, dataStr);
    });

    function triggerDownload(filename, dataStr) {
        const dlAnchor = document.createElement("a");
        dlAnchor.setAttribute("href", dataStr);
        dlAnchor.setAttribute("download", filename);
        document.body.appendChild(dlAnchor);
        dlAnchor.click();
        dlAnchor.remove();
    }

    // 6. Render Social Media Feed Table
    function renderSocialFeed() {
        const tbody = document.getElementById("socialFeedTableBody");
        tbody.innerHTML = "";

        enterpriseManager.posts.forEach(post => {
            const tr = document.createElement("tr");
            const badgeClass = post.sentimentLabel === "Positive" ? "badge-positive" : (post.sentimentLabel === "Negative" ? "badge-negative" : "badge-neutral");

            tr.innerHTML = `
                <td><strong>${post.id}</strong></td>
                <td><i class="fa-brands fa-${post.platform.toLowerCase().includes("twitter") ? "twitter" : (post.platform.toLowerCase().includes("reddit") ? "reddit" : "google-play")}"></i> ${post.platform}</td>
                <td>${post.user}</td>
                <td style="max-width: 280px; font-size: 0.82rem;">"${post.text}"</td>
                <td><span style="font-size: 0.78rem; font-weight: 500;">${post.aspect}</span></td>
                <td><strong style="color: ${post.sentimentScore >= 0 ? '#10b981' : '#ef4444'};">${post.sentimentScore > 0 ? '+' : ''}${post.sentimentScore}</strong></td>
                <td><span class="badge ${badgeClass}">${post.sentimentLabel}</span></td>
                <td>
                    ${post.escalated 
                        ? `<span class="badge badge-neutral"><i class="fa-solid fa-check"></i> Ticket ${post.ticketId}</span>`
                        : `<button class="btn btn-outline" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="escalatePost('${post.id}')">
                            <i class="fa-solid fa-triangle-exclamation"></i> Escalate IT
                           </button>`
                    }
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    window.escalatePost = function(postId) {
        enterpriseManager.escalatePostToTicket(postId);
        renderSocialFeed();
        renderTickets();
        renderKanban();
        renderAuditLogs();
        updateKPIs();
    };

    // 7. Render Enterprise Tickets Table
    function renderTickets() {
        const tbody = document.getElementById("ticketsTableBody");
        tbody.innerHTML = "";

        enterpriseManager.tickets.forEach(ticket => {
            const tr = document.createElement("tr");
            const priorityBadge = ticket.priority.includes("P1") ? "badge-p1" : "badge-p2";

            tr.innerHTML = `
                <td><strong>${ticket.id}</strong></td>
                <td>
                    <div style="font-weight: 600;">${ticket.title}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted);">${ticket.aspect} • ${ticket.impact}</div>
                </td>
                <td><span class="badge ${priorityBadge}">${ticket.priority}</span></td>
                <td>${ticket.assignee}</td>
                <td><span class="badge badge-neutral">${ticket.status}</span></td>
                <td><span style="font-size: 0.8rem; color: var(--accent-cyan);">${ticket.sourcePostId}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    // 8. Render Audit Logs Box
    function renderAuditLogs() {
        const logBox = document.getElementById("auditLogBox");
        logBox.innerHTML = "";
        enterpriseManager.logs.forEach(log => {
            const div = document.createElement("div");
            div.style.marginBottom = "0.4rem";
            div.style.borderBottom = "1px solid rgba(255,255,255,0.05)";
            div.style.paddingBottom = "0.3rem";
            div.innerHTML = `
                <span style="color: var(--text-muted);">[${log.timestamp}]</span> 
                <strong style="color: var(--accent-indigo);">${log.action}:</strong> 
                <span style="color: #cbd5e1;">${log.details}</span>
            `;
            logBox.appendChild(div);
        });
    }

    // 9. Live Sandbox Classifier & LIVE ABSA Dynamic Updating Event Handler
    const btnAnalyze = document.getElementById("btnAnalyzeText");
    const sandboxInput = document.getElementById("sandboxInput");
    const sandboxResultCard = document.getElementById("sandboxResultCard");

    btnAnalyze.addEventListener("click", () => {
        const text = sandboxInput.value;
        if (!text.trim()) return;

        // Run NLP Sentiment Analysis
        const result = SentimentAnalyzer.analyzeText(text);

        // Update Sandbox Result UI
        document.getElementById("resScore").textContent = (result.sentimentScore >= 0 ? '+' : '') + result.sentimentScore;
        document.getElementById("resAspect").textContent = result.aspect;
        
        const badge = document.getElementById("resBadge");
        badge.textContent = result.sentimentLabel;
        badge.className = `badge badge-${result.sentimentLabel.toLowerCase()}`;

        document.getElementById("emoFrustration").style.width = `${result.emotions.frustration * 100}%`;
        document.getElementById("emoUrgency").style.width = `${result.emotions.urgency * 100}%`;
        document.getElementById("emoJoy").style.width = `${result.emotions.joy * 100}%`;

        const autoTicketMsg = document.getElementById("autoTicketSuggestion");
        if (result.sentimentLabel === "Negative" || result.emotions.urgency > 0.6) {
            autoTicketMsg.style.display = "block";
        } else {
            autoTicketMsg.style.display = "none";
        }

        sandboxResultCard.style.display = "flex";

        // 🔥 DYNAMIC LIVE ABSA CHART UPDATE FOR RECENT SANDBOX TEXT
        let aspectKey = 'UI/UX & UPI';
        if (result.aspect.includes("Performance") || result.aspect.includes("Latency")) aspectKey = 'Performance';
        else if (result.aspect.includes("Pricing") || result.aspect.includes("Billing")) aspectKey = 'Billing';
        else if (result.aspect.includes("Security") || result.aspect.includes("Access")) aspectKey = 'Security';
        else if (result.aspect.includes("Support")) aspectKey = 'Support';

        aspectScores[aspectKey] = result.sentimentScore;

        // Automatically ingest analyzed post into live social feed
        const newPostId = `POST-${Math.floor(106 + Math.random() * 800)}`;
        const newPost = {
            id: newPostId,
            platform: "Sandbox Stream",
            user: "@live_user_demo",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
            timestamp: "Just now",
            text: text,
            sentimentScore: result.sentimentScore,
            sentimentLabel: result.sentimentLabel,
            aspect: result.aspect,
            emotions: result.emotions,
            reach: 1200,
            escalated: false
        };

        enterpriseManager.posts.unshift(newPost);
        enterpriseManager.addAuditLog("LIVE_ABSA_UPDATE", `Analyzed text updated aspect '${aspectKey}' score to ${result.sentimentScore}`);

        // Automatically escalate if critical negative sentiment
        if (result.sentimentLabel === "Negative" && result.emotions.urgency >= 0.6) {
            enterpriseManager.escalatePostToTicket(newPostId);
            renderTickets();
            renderKanban();
        }

        renderSocialFeed();
        renderAuditLogs();
        updateKPIs();
        renderCharts();
    });

    // 10. ITPM EVM Calculations in INR (₹)
    const inputPV = document.getElementById("inputPV");
    const inputEV = document.getElementById("inputEV");
    const inputAC = document.getElementById("inputAC");
    const inputBAC = document.getElementById("inputBAC");

    function refreshEVMDisplay() {
        itpmManager.updateEVMMetric("plannedValue", inputPV.value);
        itpmManager.updateEVMMetric("earnedValue", inputEV.value);
        itpmManager.updateEVMMetric("actualCost", inputAC.value);
        itpmManager.updateEVMMetric("budgetAtCompletion", inputBAC.value);

        const evm = itpmManager.calculateEVM();

        document.getElementById("evmCV").textContent = `${evm.cv >= 0 ? '+' : ''}${evm.formattedCV}`;
        document.getElementById("evmCV").style.color = evm.cv >= 0 ? 'var(--success-color)' : 'var(--danger-color)';

        document.getElementById("evmSV").textContent = `${evm.sv >= 0 ? '+' : ''}${evm.formattedSV}`;
        document.getElementById("evmSV").style.color = evm.sv >= 0 ? 'var(--success-color)' : 'var(--danger-color)';

        document.getElementById("evmCPI").textContent = evm.cpi;
        document.getElementById("evmSPI").textContent = evm.spi;
        document.getElementById("evmEAC").textContent = evm.formattedEAC;

        document.getElementById("kpiCPI").textContent = `${evm.cpi} / ${evm.spi}`;
    }

    [inputPV, inputEV, inputAC, inputBAC].forEach(input => {
        input.addEventListener("input", refreshEVMDisplay);
    });

    // 11. Render Gantt Schedule & Risk Register
    function renderGantt() {
        const container = document.getElementById("ganttContainer");
        container.innerHTML = "";

        itpmManager.tasks.forEach(t => {
            const div = document.createElement("div");
            div.className = "gantt-item";
            div.innerHTML = `
                <div class="gantt-info">
                    <h4>${t.task}</h4>
                    <p>${t.phase} • Lead: ${t.owner}</p>
                </div>
                <div class="gantt-bar-outer">
                    <div class="gantt-bar-inner" style="width: ${t.progress}%;">
                        ${t.progress}%
                    </div>
                </div>
            `;
            container.appendChild(div);
        });
    }

    function renderRisks() {
        const tbody = document.getElementById("riskTableBody");
        tbody.innerHTML = "";

        itpmManager.risks.forEach(r => {
            const tr = document.createElement("tr");
            const rating = itpmManager.getRiskRating(r.score);

            tr.innerHTML = `
                <td><strong>${r.id}</strong></td>
                <td>${r.risk}</td>
                <td><span class="badge" style="background: ${rating.color}22; color: ${rating.color};">${r.score} (${rating.category})</span></td>
                <td style="font-size: 0.75rem; color: var(--text-secondary);">${r.strategy}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // 12. Render Kanban Board
    function renderKanban() {
        const colBacklog = document.getElementById("kanbanBacklog");
        const colProgress = document.getElementById("kanbanInProgress");
        const colQA = document.getElementById("kanbanQA");

        colBacklog.innerHTML = "";
        colProgress.innerHTML = "";
        colQA.innerHTML = "";

        let cBacklog = 0, cProgress = 0, cQA = 0;

        enterpriseManager.tickets.forEach(ticket => {
            const card = document.createElement("div");
            card.className = "kanban-card";
            card.innerHTML = `
                <h5>${ticket.id}: ${ticket.title}</h5>
                <p>${ticket.assignee}</p>
                <span class="badge badge-neutral">${ticket.priority}</span>
            `;

            if (ticket.status === "Backlog") {
                colBacklog.appendChild(card);
                cBacklog++;
            } else if (ticket.status === "In Progress") {
                colProgress.appendChild(card);
                cProgress++;
            } else {
                colQA.appendChild(card);
                cQA++;
            }
        });

        document.getElementById("kanbanBacklogCount").textContent = cBacklog;
        document.getElementById("kanbanProgressCount").textContent = cProgress;
        document.getElementById("kanbanQACount").textContent = cQA;
    }

    // 13. KPI Updates
    function updateKPIs() {
        const posts = enterpriseManager.posts;
        const avgScore = (posts.reduce((acc, p) => acc + p.sentimentScore, 0) / posts.length).toFixed(2);
        
        document.getElementById("kpiNetSentiment").textContent = (avgScore >= 0 ? '+' : '') + avgScore;
        document.getElementById("kpiTotalPosts").textContent = posts.length.toLocaleString();
        document.getElementById("kpiTotalTickets").textContent = enterpriseManager.tickets.length;
    }

    // 14. Chart.js Renderers with Live ABSA Updates
    function renderCharts() {
        // Overview Trend Line Chart
        const trendCtx = document.getElementById("overviewTrendChart")?.getContext("2d");
        if (trendCtx) {
            if (trendChartInstance) trendChartInstance.destroy();
            trendChartInstance = new Chart(trendCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Positive Sentiment Volume',
                            data: [120, 190, 300, 500, 420, 680, 810],
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Negative Sentiment Volume',
                            data: [80, 150, 210, 180, 240, 160, 120],
                            borderColor: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { labels: { color: '#94a3b8' } } },
                    scales: {
                        x: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                        y: { ticks: { color: '#64748b' }, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                }
            });
        }

        // Sentiment Distribution Donut Chart
        const distroCtx = document.getElementById("sentimentDistributionChart")?.getContext("2d");
        if (distroCtx) {
            if (distroChartInstance) distroChartInstance.destroy();
            distroChartInstance = new Chart(distroCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Positive', 'Neutral', 'Negative'],
                    datasets: [{
                        data: [62, 20, 18],
                        backgroundColor: ['#10b981', '#94a3b8', '#ef4444'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
                }
            });
        }

        // 🔥 Dynamic ABSA Chart rendering live aspectScores
        const aspectCtx = document.getElementById("aspectChart")?.getContext("2d");
        if (aspectCtx) {
            if (aspectChartInstance) aspectChartInstance.destroy();
            aspectChartInstance = new Chart(aspectCtx, {
                type: 'bar',
                data: {
                    labels: ['UI/UX & UPI', 'Performance', 'Billing', 'Security', 'Support'],
                    datasets: [{
                        label: 'Aspect Polarity Score',
                        data: [
                            aspectScores['UI/UX & UPI'],
                            aspectScores['Performance'],
                            aspectScores['Billing'],
                            aspectScores['Security'],
                            aspectScores['Support']
                        ],
                        backgroundColor: function(context) {
                            const val = context.raw;
                            return val >= 0 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)';
                        },
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { duration: 600 },
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
                        y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' }, min: -1.0, max: 1.0 }
                    }
                }
            });
        }
    }

    // Initial Master Render
    renderSocialFeed();
    renderTickets();
    renderAuditLogs();
    renderGantt();
    renderRisks();
    renderKanban();
    refreshEVMDisplay();
    updateKPIs();
    renderCharts();
});
