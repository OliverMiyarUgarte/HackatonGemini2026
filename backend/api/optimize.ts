import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node'

dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) throw new Error("Problem with API KEY!");
const genAI = new GoogleGenerativeAI(apiKey || "");

// setup the model/agent
const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview",
    systemInstruction: `You are a Google Search Query Optimizer.
    Your Job: Convert User Input -> HIGHLY OPTIMIZED Google Search Dork.
    
    STRATEGIES:
    1. Dates: Convert "2023", "recent", "last year" into "after:YYYY" or "before:YYYY".
    2. Filetypes: Convert "pdf", "csv", "excel" into "filetype:pdf", etc.
    3. Sites: Convert "reddit", "stackoverflow" into "site:reddit.com", etc.
    4. Exact Matches: Use quotes "..." for specific terms.
    
    EXAMPLES:
    Input: "pdf books about c++ published between 2000 and 2010"
    Output: filetype:pdf "C++" books after:2000-01-01 before:2010-12-31

    Input: "discussions about react on reddit"
    Output: site:reddit.com "react" discussion

    STRICT RULES:
    - Output ONLY the raw search string.
    - NO Markdown. NO "Here is". NO explanations.`,
    generationConfig: { 
        responseMimeType: "text/plain",
        maxOutputTokens: 200,
        temperature: 0.3
    }
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === "OPTIONS") return response.status(200).end();

    const { query } = request.body;

    if (!query) return response.status(400).json({ error: "No query provided!" })

    try {
        
        const result = await model.generateContent("the input: " + query);
        const responseText = result.response.text();
        console.log("INPUT:", query);
        console.log("OUTPUT:", result.response.text()); // Log para debug
        
        //let cleanText = responseText.replace(/```json|```/g, '').replace(/\n/g, ' ').trim();
        // if (cleanText.startsWith('"') && cleanText.endsWith('"')) cleanText = cleanText.slice(1, -1);
        //else throw new Error("AI respondeu texto, mas não encontrei JSON válido: " + cleanText);
        //const finalJson = JSON.parse(cleanText);

        return response.status(200).json({ result: responseText });

    } catch(error) {
        const msg = error instanceof Error ? error.message : "Unknown";
        console.error("Server error: ", msg);
        return response.status(500).json({ error: msg});
    }
}
