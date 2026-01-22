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
    systemInstruction: `You are a Search Optimizer. Output valid JSON.`,
    generationConfig: { responseMimeType: "application/json" }
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (request.method === "OPTIONS") return response.status(200).end();

    const { query } = request.body;

    if (!query) return response.status(400).json({ error: "No query provided!" })

    try {
        const result = await model.generateContent(query);
        const responseText = result.response.text();
        const jsonOut = JSON.parse(responseText);

        return response.status(200).json(jsonOut);
    } catch(error) {
        console.error(error);
        return response.status(500).json({ error: error });
    }
}
