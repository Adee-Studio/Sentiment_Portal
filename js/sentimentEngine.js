/**
 * Sentiment Engine Module for Sentix Enterprise
 * Enhanced with Indian Context & Slang (Hinglish/English social terms)
 * Implements:
 * 1. Lexicon-based VADER Sentiment Scoring (-1.0 to +1.0)
 * 2. Aspect-Based Sentiment Analysis (ABSA)
 * 3. Emotion Vector Classification (Joy, Frustration, Urgency, Trust)
 * 4. Keyword & Topic Cloud Matrix
 */

const LEXICON = {
    // Positive sentiment words & Indian slang weights
    positive: {
        "superb": 3.0, "mast": 2.8, "smooth": 2.5, "fast": 2.0, "excellent": 3.0,
        "robust": 2.8, "love": 3.2, "loved": 3.0, "great": 2.5, "amazing": 3.2,
        "seamless": 2.7, "awesome": 3.0, "secure": 2.2, "reliable": 2.5, "best": 2.8,
        "helpful": 2.0, "good": 1.8, "satisfied": 2.3, "impressive": 2.6, "rockstar": 2.5
    },
    // Negative sentiment words & Indian slang weights
    negative: {
        "bakwas": -3.5, "bekaar": -3.5, "slow": -2.2, "broken": -3.0, "laggy": -2.8,
        "crash": -3.5, "crashes": -3.5, "stuck": -2.7, "timeout": -2.9, "fail": -3.0,
        "failed": -3.0, "bug": -2.4, "terrible": -3.2, "unacceptable": -3.5, "poor": -2.5,
        "error": -2.6, "errors": -2.7, "frustrating": -3.0, "disappointed": -2.8, "delay": -2.1,
        "latency": -2.5, "issue": -2.0, "deducted": -2.2
    },
    // Aspect keywords mapping (FinTech & Enterprise Context)
    aspects: {
        "UI/UX & Checkout": ["ui", "ux", "interface", "checkout", "upi", "design", "portal", "button", "app", "mobile"],
        "Performance & Latency": ["latency", "speed", "slow", "lag", "laggy", "timeout", "batch", "server", "stuck", "crash", "deducted"],
        "Pricing & Billing": ["billing", "invoice", "price", "cost", "pdf", "export", "payment", "gst", "charge", "refund", "receipt"],
        "Security & Access": ["security", "oauth", "access", "login", "auth", "compliance", "rbi", "aadhaar", "otp", "2fa", "privacy"],
        "Customer Support": ["support", "service", "ticket", "response", "sla", "agent", "helpdesk", "delay", "bakwas", "executive"]
    },
    // Emotion keyword associations
    emotions: {
        joy: ["superb", "mast", "smooth", "love", "loved", "great", "awesome", "robust", "amazing"],
        frustration: ["bakwas", "bekaar", "broken", "laggy", "crash", "timeout", "terrible", "unacceptable", "frustrating", "stuck"],
        urgency: ["asap", "urgent", "immediately", "critical", "deducted", "unacceptable", "fix", "failed"],
        trust: ["secure", "robust", "compliance", "rbi", "aadhaar", "reliable", "seamless"]
    }
};

class SentimentAnalyzer {
    /**
     * Analyzes input text string and returns comprehensive sentiment metrics
     */
    static analyzeText(text) {
        if (!text || typeof text !== "string") {
            return {
                sentimentScore: 0,
                sentimentLabel: "Neutral",
                aspect: "General & Usability",
                emotions: { joy: 0, trust: 0, frustration: 0, urgency: 0 },
                keywords: []
            };
        }

        const cleanedText = text.toLowerCase().replace(/[^\w\s#]/g, "");
        const words = cleanedText.split(/\s+/).filter(w => w.length > 1);

        let positiveScore = 0;
        let negativeScore = 0;
        let matchedCount = 0;

        words.forEach(word => {
            if (LEXICON.positive[word]) {
                positiveScore += LEXICON.positive[word];
                matchedCount++;
            }
            if (LEXICON.negative[word]) {
                negativeScore += Math.abs(LEXICON.negative[word]);
                matchedCount++;
            }
        });

        const totalScore = positiveScore - negativeScore;
        let compoundScore = 0;
        if (matchedCount > 0) {
            compoundScore = Math.max(-1.0, Math.min(1.0, totalScore / (matchedCount * 3)));
        } else {
            // Contextual fallbacks
            if (cleanedText.includes("superb") || cleanedText.includes("fast") || cleanedText.includes("smooth")) compoundScore = 0.75;
            else if (cleanedText.includes("fail") || cleanedText.includes("bakwas") || cleanedText.includes("stuck") || cleanedText.includes("slow")) compoundScore = -0.75;
        }

        let sentimentLabel = "Neutral";
        if (compoundScore >= 0.25) sentimentLabel = "Positive";
        else if (compoundScore <= -0.25) sentimentLabel = "Negative";

        // Aspect Detection
        let detectedAspect = "General & Usability";
        let maxAspectMatches = 0;

        Object.keys(LEXICON.aspects).forEach(aspectName => {
            const aspectKeywords = LEXICON.aspects[aspectName];
            const matches = words.filter(word => aspectKeywords.includes(word)).length;
            if (matches > maxAspectMatches) {
                maxAspectMatches = matches;
                detectedAspect = aspectName;
            }
        });

        // Emotion Vector Generation
        const emotionScores = { joy: 0, frustration: 0, urgency: 0, trust: 0 };
        Object.keys(LEXICON.emotions).forEach(emo => {
            const emoKeywords = LEXICON.emotions[emo];
            const emoMatches = words.filter(word => emoKeywords.includes(word)).length;
            emotionScores[emo] = Math.min(1.0, emoMatches * 0.45 + (emo === "frustration" && compoundScore < -0.3 ? 0.4 : 0));
        });

        if (sentimentLabel === "Positive") {
            emotionScores.joy = Math.max(0.7, emotionScores.joy);
            emotionScores.trust = Math.max(0.8, emotionScores.trust);
        } else if (sentimentLabel === "Negative") {
            emotionScores.frustration = Math.max(0.75, emotionScores.frustration);
            emotionScores.urgency = Math.max(0.7, emotionScores.urgency);
        }

        return {
            sentimentScore: parseFloat(compoundScore.toFixed(2)),
            sentimentLabel,
            aspect: detectedAspect,
            emotions: {
                joy: parseFloat(emotionScores.joy.toFixed(2)),
                trust: parseFloat(emotionScores.trust.toFixed(2)),
                frustration: parseFloat(emotionScores.frustration.toFixed(2)),
                urgency: parseFloat(emotionScores.urgency.toFixed(2))
            },
            keywords: Array.from(new Set(words.filter(w => w.length > 3))).slice(0, 5)
        };
    }
}
