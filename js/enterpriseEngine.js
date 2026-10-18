/**
 * Enterprise System (ES) Module for Sentix
 * Controls:
 * 1. Role-Based Access Control (RBAC)
 * 2. Automated Social-to-IT Incident Escalation Workflow
 * 3. Enterprise Audit Logging
 * 4. Data Export (JSON/CSV)
 */

class EnterpriseManager {
    constructor(posts, tickets, logs) {
        this.posts = posts;
        this.tickets = tickets;
        this.logs = logs;
        this.currentRole = "Executive"; // Default role
    }

    setRole(roleName) {
        this.currentRole = roleName;
        this.addAuditLog("ROLE_CHANGE", `User switched role view to '${roleName}'`);
    }

    getRole() {
        return this.currentRole;
    }

    /**
     * Auto-escalates a negative post into an Enterprise IT Ticket
     */
    escalatePostToTicket(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return null;

        if (post.escalated && post.ticketId) {
            return this.tickets.find(t => t.id === post.ticketId);
        }

        const newTicketId = `TICK-${Math.floor(100 + Math.random() * 900)}`;
        let priority = "P2 - High";
        if (post.sentimentScore <= -0.7 || post.emotions.urgency >= 0.8) {
            priority = "P1 - Critical";
        }

        const newTicket = {
            id: newTicketId,
            sourcePostId: post.id,
            title: `Escalated Issue: ${post.aspect} (${post.platform})`,
            aspect: post.aspect,
            priority,
            status: "In Progress",
            assignee: "Auto-Assigned (On-Call SRE)",
            impact: `Affecting reach of ${post.reach.toLocaleString()} users`,
            createdAt: "Just Now"
        };

        post.escalated = true;
        post.ticketId = newTicketId;
        this.tickets.unshift(newTicket);

        this.addAuditLog("ESCALATION_AUTO", `Post ${post.id} auto-escalated to Enterprise Ticket ${newTicketId} [${priority}]`);
        return newTicket;
    }

    addAuditLog(action, details) {
        const timeStr = new Date().toTimeString().split(" ")[0];
        this.logs.unshift({
            timestamp: timeStr,
            action,
            details
        });
    }

    /**
     * Exports current sentiment & project state as JSON or CSV
     */
    exportData(format = "json") {
        const payload = {
            exportedAt: new Date().toISOString(),
            role: this.currentRole,
            summary: {
                totalPosts: this.posts.length,
                totalTickets: this.tickets.length,
                avgSentiment: (this.posts.reduce((acc, p) => acc + p.sentimentScore, 0) / this.posts.length).toFixed(2)
            },
            socialPosts: this.posts,
            enterpriseTickets: this.tickets
        };

        if (format === "json") {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
            return { filename: "sentix_enterprise_report.json", dataStr };
        } else {
            // CSV Format for Social Posts
            let csvContent = "ID,Platform,User,SentimentScore,Label,Aspect,Reach,Escalated\n";
            this.posts.forEach(p => {
                csvContent += `"${p.id}","${p.platform}","${p.user}",${p.sentimentScore},"${p.sentimentLabel}","${p.aspect}",${p.reach},${p.escalated}\n`;
            });
            const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
            return { filename: "sentix_social_sentiment.csv", dataStr };
        }
    }
}
