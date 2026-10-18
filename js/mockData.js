/**
 * Mock Data for Sentix Enterprise Portal (Indian Enterprise & FinTech Context)
 * Integrates: Indian Social Media Text Analysis, Enterprise Systems, and ITPM Project Datasets
 */

const INITIAL_SOCIAL_POSTS = [
    {
        id: "POST-101",
        platform: "Twitter",
        user: "@techie_mumbai",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        timestamp: "10 mins ago",
        text: "The new UPI instant checkout on Sentix Pay is superb! Transaction completed in 2 seconds flat. 🚀 #FinTech #DigitalIndia #UPI",
        sentimentScore: 0.88,
        sentimentLabel: "Positive",
        aspect: "UI/UX & Checkout",
        emotions: { joy: 0.92, trust: 0.88, frustration: 0.0, urgency: 0.0 },
        reach: 18400,
        escalated: false
    },
    {
        id: "POST-102",
        platform: "Reddit",
        user: "u/bangalore_dev_guy",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        timestamp: "20 mins ago",
        text: "Server response latency spikes during peak 2 PM festive sale hours! Money deducted from HDFC Bank via UPI but transaction timed out. Needs urgent fix!",
        sentimentScore: -0.85,
        sentimentLabel: "Negative",
        aspect: "Performance & Latency",
        emotions: { joy: 0.0, trust: 0.15, frustration: 0.95, urgency: 0.98 },
        reach: 14200,
        escalated: true,
        ticketId: "TICK-402"
    },
    {
        id: "POST-103",
        platform: "AppStore",
        user: "Ananya Sharma (Delhi)",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        timestamp: "45 mins ago",
        text: "GST invoice export to PDF is broken in the merchant billing tab after yesterday's patch update. Unable to file monthly GST returns. Please resolve asap.",
        sentimentScore: -0.62,
        sentimentLabel: "Negative",
        aspect: "Pricing & Billing",
        emotions: { joy: 0.1, trust: 0.4, frustration: 0.85, urgency: 0.9 },
        reach: 5600,
        escalated: true,
        ticketId: "TICK-403"
    },
    {
        id: "POST-104",
        platform: "Twitter",
        user: "@fintech_insider_in",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        timestamp: "2 hours ago",
        text: "Sentix Enterprise security compliance with RBI 2FA standards and Aadhaar OAuth2 is rock solid. Great job dev team!",
        sentimentScore: 0.94,
        sentimentLabel: "Positive",
        aspect: "Security & Access",
        emotions: { joy: 0.85, trust: 0.98, frustration: 0.0, urgency: 0.0 },
        reach: 32000,
        escalated: false
    },
    {
        id: "POST-105",
        platform: "Customer Portal",
        user: "Rajesh Kumar (Enterprise Admin, Pune)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        timestamp: "3 hours ago",
        text: "Tier-2 customer support email response time was over 36 hours for our corporate account SLA. Bakwas response speed.",
        sentimentScore: -0.76,
        sentimentLabel: "Negative",
        aspect: "Customer Support",
        emotions: { joy: 0.0, trust: 0.2, frustration: 0.9, urgency: 0.85 },
        reach: 2400,
        escalated: true,
        ticketId: "TICK-405"
    }
];

const INITIAL_ENTERPRISE_TICKETS = [
    {
        id: "TICK-402",
        sourcePostId: "POST-102",
        title: "Investigate UPI Payment Gateway Latency & Bank Timeout Errors",
        aspect: "Performance & Latency",
        priority: "P1 - Critical",
        status: "In Progress",
        assignee: "Rohan Verma (Lead SRE - Bangalore)",
        impact: "High (Affecting ~15,000 UPI transactions during peak hours)",
        createdAt: "Today 14:10 IST"
    },
    {
        id: "TICK-403",
        sourcePostId: "POST-103",
        title: "Fix GST Invoice PDF Export Module in Merchant Billing Portal",
        aspect: "Pricing & Billing",
        priority: "P2 - High",
        status: "Backlog",
        assignee: "Priya Sharma (Fullstack Dev - Hyderabad)",
        impact: "Medium (Affects Merchant GST Compliance Export)",
        createdAt: "Today 15:30 IST"
    },
    {
        id: "TICK-405",
        sourcePostId: "POST-105",
        title: "SLA Support Escalation: Optimize Support Ticket Routing Engine",
        aspect: "Customer Support",
        priority: "P2 - High",
        status: "QA / Review",
        assignee: "Amit Patel (Support Operations - Pune)",
        impact: "High (Enterprise SLA Compliance)",
        createdAt: "Today 12:00 IST"
    }
];

const INITIAL_GANTT_TASKS = [
    { id: "T1", task: "Project Charter & Requirements Approval", phase: "Initiation", start: "2026-10-01", end: "2026-10-03", progress: 100, owner: "Project Manager" },
    { id: "T2", task: "VADER NLP Lexicon & Indian Slang Tuning", phase: "Text Analysis", start: "2026-10-04", end: "2026-10-07", progress: 100, owner: "NLP Lead" },
    { id: "T3", task: "Aspect-Based Sentiment Classifier Model", phase: "AI Engine", start: "2026-10-06", end: "2026-10-10", progress: 80, owner: "AI Engineer" },
    { id: "T4", task: "Enterprise REST API & Incident Escalator", phase: "ES Architecture", start: "2026-10-08", end: "2026-10-14", progress: 50, owner: "Backend Lead" },
    { id: "T5", task: "ITPM EVM & Interactive Dashboard UI", phase: "Dashboard UI", start: "2026-10-11", end: "2026-10-16", progress: 30, owner: "Frontend Dev" },
    { id: "T6", task: "User Acceptance Testing (UAT) & Production Launch", phase: "Deployment", start: "2026-10-17", end: "2026-10-20", progress: 0, owner: "QA Lead" }
];

const INITIAL_RISKS = [
    { id: "RSK-01", risk: "Low accuracy on Hinglish / Indian social media slang", probability: 4, impact: 3, score: 12, strategy: "Custom VADER lexicon with localized terms (e.g. bakwas, superb, laggy)." },
    { id: "RSK-02", risk: "UPI Bank Gateway API Rate Limits during festive sales", probability: 3, impact: 4, score: 12, strategy: "Implement Redis caching layer and async queue worker buffering." },
    { id: "RSK-03", risk: "RBI Data Localization & Aadhaar Data Privacy", probability: 2, impact: 5, score: 10, strategy: "Mask phone numbers, Aadhaar details, and PII before text processing." },
    { id: "RSK-04", risk: "Scope creep in multi-department dashboard requirements", probability: 4, impact: 4, score: 16, strategy: "Enforce formal Change Control Management Board (CCB) reviews." }
];

// All Financial Metrics localized to Indian Rupees (INR ₹)
const EVM_INITIAL_METRICS = {
    budgetAtCompletion: 1200000, // ₹12,00,000 (12 Lakhs INR)
    plannedValue: 650000,        // ₹6,50,000 (6.5 Lakhs INR)
    earnedValue: 700000,         // ₹7,00,000 (7.0 Lakhs INR)
    actualCost: 620000           // ₹6,20,000 (6.2 Lakhs INR)
};

const AUDIT_LOGS = [
    { timestamp: "18:45:10 IST", action: "SENTIMENT_INGEST", details: "Processed 120 Indian social media posts across Twitter, Reddit & PlayStore." },
    { timestamp: "18:30:22 IST", action: "ESCALATION_TRIGGERED", details: "Auto-escalated POST-102 to P1 Critical Incident TICK-402 [UPI Latency]." },
    { timestamp: "17:15:05 IST", action: "ITPM_METRIC_UPDATE", details: "Recalculated EVM: CPI = 1.13 (Under Budget by ₹80,000), SPI = 1.08 (Ahead of Schedule)." },
    { timestamp: "16:00:00 IST", action: "USER_LOGIN", details: "User 'Project Lead Admin' logged in under 'Executive' role view." }
];
