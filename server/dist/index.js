"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getJson } = require("serpapi");
const client_1 = require("@prisma/client");
const genai_1 = require("@google/genai");
const cors_1 = __importDefault(require("cors"));
// Initialize Prisma Client
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 3000;
app.use((0, cors_1.default)());
// Middleware
app.use(express_1.default.json());
// Function to extract useful links from search results
function extractUsefulLinks(data) {
    var _a, _b, _c, _d;
    const usefulLinks = new Set();
    // Extract from knowledge graph
    if (data.knowledge_graph) {
        const kg = data.knowledge_graph;
        if ((_a = kg.source) === null || _a === void 0 ? void 0 : _a.link) {
            usefulLinks.add(kg.source.link);
        }
        (_b = kg.header_images) === null || _b === void 0 ? void 0 : _b.forEach(image => {
            if (image.source) {
                usefulLinks.add(image.source);
            }
        });
    }
    // Extract from organic results (filtering low-quality sources)
    (_c = data.organic_results) === null || _c === void 0 ? void 0 : _c.forEach(result => {
        const link = result.link || result.redirect_link;
        if (!link)
            return;
        // Skip video and social media domains
        const domain = new URL(link).hostname.toLowerCase();
        const excludedDomains = [
            'youtube.com',
            'quora.com',
            'tiktok.com',
            'instagram.com',
            'youtu.be'
        ];
        if (!excludedDomains.some(d => domain.includes(d))) {
            usefulLinks.add(link);
        }
    });
    // Extract from related questions (usually high-quality)
    (_d = data.related_questions) === null || _d === void 0 ? void 0 : _d.forEach(question => {
        if (question.link) {
            usefulLinks.add(question.link);
        }
    });
    // Filter out Google redirect links
    const filteredLinks = Array.from(usefulLinks).filter(link => !link.startsWith('https://www.google.com/url?'));
    return filteredLinks;
}
function generateSummary(extractedLinks) {
    return __awaiter(this, void 0, void 0, function* () {
        const ai = new genai_1.GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        function main() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield ai.models.generateContent({
                    model: "gemini-2.0-flash",
                    contents: `
      You are an advanced research assistant. Your task is to fetch, read, and summarize content from a set of web pages.
      
      1. INPUT  
         - A list of 15–20 URLs:  
           ${extractedLinks.join("\n")}
      
      2. PROCESS  
         For each URL, in the order given:
         a. Retrieve the page content (body text, headings, captions—ignore ads, navigation, comments).  
         b. Identify the title or main heading of the piece.  
         c. Extract the 3–5 most important ideas or findings.  
         d. Note any data points, dates, names, or statistics crucial to understanding.
      
      3. OUTPUT  
         Produce a single Markdown document containing:  
         - **Section per URL**, with:  
           1. **Title** (as a level-2 heading).  
           2. **Source URL** (as a hyperlink).  
           3. **Key Takeaways** (bullet list, 3–5 items, each 20–30 words max).  
           4. **Notable Details** (if any: dates, data, quotes, formatted as sub-bullets).  
         - At the very end, a **Global Synthesis** section that:  
           1. Aggregates common themes across all sources (2–3 bullets).  
           2. Highlights any contradictions or gaps between sources.
      
      4. TONE & STYLE  
         - Neutral, concise, no fluff.  
         - Use parallel structure in bullets.  
         - When in doubt, err on brevity and clarity.
      
      5. LENGTH  
         - Each URL summary: ~70–100 words total.  
         - Global Synthesis: ~100–150 words.
      
      Begin by listing the URLs you will summarize, then proceed through steps 2–4.
          `,
                });
                console.log(response.text);
                return response.text;
            });
        }
        return yield main();
    });
}
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get query from request body
        const query = req.body.query;
        if (!query) {
            return res.status(400).json({ error: "Query parameter is required" });
        }
        console.log("Processing query:", query);
        // Step 1: Get search results from SerpAPI
        let searchResults;
        try {
            searchResults = yield new Promise((resolve, reject) => {
                getJson({
                    api_key: process.env.SERP_API_KEY,
                    engine: "google",
                    q: query,
                    location: "Austin, Texas, United States",
                    google_domain: "google.com",
                    gl: "us",
                    hl: "en"
                }, (json) => {
                    resolve(json);
                });
            });
        }
        catch (err) {
            console.error("SerpAPI error:", err);
            return res.status(500).json({ error: "Failed to fetch search results" });
        }
        // Step 2: Extract useful links from results
        const usefulLinks = extractUsefulLinks(searchResults);
        console.log("Extracted links:", usefulLinks);
        // Step 3: TODO - Pass links to LLM for summarization
        const summary = yield generateSummary(usefulLinks);
        console.log(summary);
        // Step 4: Save to database
        try {
            yield prisma.post.create({
                data: {
                    query: query,
                    //@ts-ignore
                    summarisedData: summary,
                }
            });
            console.log("Saved to database");
        }
        catch (dbError) {
            console.error("Database error:", dbError);
            // Continue even if DB fails
        }
        // Step 5: Return response to client
        return res.status(200).json({
            success: true,
            query: query,
            links: usefulLinks,
            summary: summary
        });
    }
    catch (err) {
        console.error("Server error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
