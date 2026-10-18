# Academic Semester Project Report

**Project Title:** Sentix Enterprise: Integrated Social Text Media Analysis & IT Project Management Control System  
**Context:** Indian FinTech & Digital Enterprise Infrastructure  
**Submission Deadline:** 1-Day Accelerated Submission  
**Subjects Integrated:**
1. **Advanced Social Text Media Analysis**
2. **Enterprise System (ES)**
3. **Information Technology Project Management (ITPM)**

---

## Executive Summary

Modern enterprise organizations in India (e.g., FinTech, E-Commerce, Digital Services) face immense challenges processing unstructured social media commentary, customer feedback, and brand sentiment across digital channels (Twitter/X, Reddit, Google PlayStore, and Support Portals). Unattended negative sentiment signals often correlate with payment failures, service outages, or customer churn during peak sales.

**Sentix Enterprise** bridges this gap by creating an integrated control center that combines:
1. Advanced Natural Language Processing (NLP) for **Social Text Media Analysis** (VADER lexicon scoring with Hinglish/Indian slang, Aspect-Based Sentiment Analysis, and Emotion Vectoring).
2. An **Enterprise System (ES)** incident escalation framework with Role-Based Access Control (RBAC) and Audit Logging.
3. An **ITPM Control Suite** featuring Earned Value Management (EVM) in Indian Rupees (INR ₹), WBS/Gantt timeline tracking, Agile Kanban boards, and a 5x5 Risk Assessment Matrix.

---

## Subject 1: Advanced Social Text Media Analysis

### 1.1 Text Preprocessing & Tokenization Pipeline
Raw text ingested from social platforms is cleaned by removing noise and URLs while preserving hashtags and localized vocabulary. Words are tokenized and evaluated against custom domain dictionaries.

### 1.2 Sentiment Scoring Model (VADER-style Compound Scoring)
Each text item receives a normalized Compound Polarity Score ($S \in [-1.0, +1.0]$):
- **Positive Sentiment ($S \ge +0.25$):** Reflects user satisfaction (e.g., "superb UPI checkout", "mast speed").
- **Neutral Sentiment ($-0.25 < S < +0.25$):** Informational or neutral commentary.
- **Negative Sentiment ($S \le -0.25$):** Indicates dissatisfaction (e.g., "bakwas service", "stuck", "bank timeout").

### 1.3 Aspect-Based Sentiment Analysis (ABSA)
Text is classified into five functional enterprise aspects:
1. **UI/UX & UPI Checkout:** Payment screen responsiveness, instant checkout, and navigation.
2. **Performance & Latency:** Server timeouts during peak hours, batch latency, and app crashes.
3. **Pricing & Billing:** GST invoice export, billing receipts, and merchant refunds.
4. **Security & Access:** RBI 2FA compliance, Aadhaar OAuth2 authentication, and OTP delivery.
5. **Customer Support:** Tier-2 SLA support response speeds and ticket resolution.

### 1.4 Emotion Vectoring (Joy, Frustration, Urgency, Trust)
The engine extracts psychological state vectors to identify urgent operational risks (e.g., high Frustration + Urgency triggers instant auto-escalation).

---

## Subject 2: Enterprise System (ES) Integration

### 2.1 Role-Based Access Control (RBAC)
The enterprise suite supports customizable operational views:
- **Executive View:** High-level net brand score, KPI summary, and high-level risk metrics.
- **Social Media Analyst View:** Granular text feed, aspect distribution, topic cloud, and sandbox classifier.
- **IT Project Manager View:** EVM control panel in INR ₹, Gantt schedule, and Kanban board.
- **System Administrator View:** Security logs, REST API gateway status, and data exports.

### 2.2 Automated Incident Escalation Pipeline
When the social text engine detects a negative post ($S \le -0.5$) with high urgency (e.g. UPI money deduction timeout), the system automatically creates a P1 Critical or P2 High Enterprise IT Ticket routed to engineering leads in Bangalore, Hyderabad, or Pune.

### 2.3 Enterprise Audit & Governance
Every system state change, user login, and incident escalation is logged to an immutable audit trail with timestamp verification. Data can be exported as structured **JSON** or **CSV** formats for integration with corporate ERP/CRM software.

---

## Subject 3: Information Technology Project Management (ITPM)

### 3.1 Earned Value Management (EVM) Controls (INR ₹)
The project incorporates standard EVM formulas evaluated in Indian Rupees:
- **Budget at Completion (BAC):** ₹12,00,000 (12 Lakhs INR)
- **Planned Value (PV):** ₹6,50,000 (6.5 Lakhs INR)
- **Earned Value (EV):** ₹7,00,000 (7.0 Lakhs INR)
- **Actual Cost (AC):** ₹6,20,000 (6.2 Lakhs INR)
- **Cost Variance (CV):** $CV = EV - AC = +₹80,000$ (Under Budget)
- **Schedule Variance (SV):** $SV = EV - PV = +₹50,000$ (Ahead of Schedule)
- **Cost Performance Index (CPI):** $CPI = \frac{EV}{AC} = 1.13$
- **Schedule Performance Index (SPI):** $SPI = \frac{EV}{PV} = 1.08$
- **Estimate at Completion (EAC):** $EAC = \frac{BAC}{CPI} = ₹10,61,947$

### 3.2 Work Breakdown Structure (WBS) & Gantt Timeline
The implementation follows a structured 6-phase roadmap:
1. Project Initiation & Charter Approval (100% Complete)
2. VADER NLP Lexicon & Indian Slang Tuning (100% Complete)
3. Aspect-Based Sentiment Classifier Model (80% Complete)
4. Enterprise REST API Integration (50% Complete)
5. ITPM Dashboard UI & EVM Module (30% Complete)
6. User Acceptance Testing (UAT) & Production Launch (0% Complete)

### 3.3 5x5 Risk Register & Matrix
Risk mitigation is embedded directly into project operations:
- **RSK-01 (Hinglish/Indian Slang in Text):** Mitigation via localized VADER lexicon dictionary.
- **RSK-02 (UPI Gateway Rate Limits):** Mitigation via Redis caching and async worker queue.
- **RSK-03 (RBI Data Privacy & Aadhaar):** PII scrubbing prior to database persistence.
- **RSK-04 (Scope Creep):** Formal Change Control Board (CCB) review requirement.

---

## System Architecture & Demonstration Guide

### Running the Sentix Application
1. Double-click `run_app.bat` or run `python server.py` in your terminal.
2. Open your web browser at `http://localhost:8000`.
3. Experience the high-tech animated **Splash Screen**, then explore live tabs:
   - **Executive Overview:** Live KPI cards and sentiment trend charts.
   - **Social Text Analysis:** Live Sandbox classifier for real-time text input testing.
   - **Enterprise System:** Escalated ticket workflow and live JSON/CSV exporter.
   - **ITPM Suite:** Interactive EVM calculator in INR ₹, Gantt chart, and Agile Kanban board.
   - **Academic Report:** Printable submission view.

---
*Report Compiled for Semester Examination & Turn-in.*
