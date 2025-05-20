"use server";

import { auth } from "@clerk/nextjs/server";
import fetch from 'node-fetch';

type TranslationRequest = {
    sourceText: string;
    sourceLanguage: string;
    targetLanguage: string;
};

type AzureTranslationResponse = {
    translations: { text: string }[];
}[];

// Load Azure Translator credentials from environment variables
const subscriptionKey = process.env.AZURE_TRANSLATOR_KEY!;
const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT!;
const location = process.env.AZURE_TRANSLATOR_REGION!;

// Helper function to call Azure Translator API
async function azureTranslate(text: string, from: string, to: string) {
    const url = `${endpoint}/translate?api-version=3.0&from=${from}&to=${to}`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify([{ Text: text }]),
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        const errorText = await response.text();
        console.error("Azure API error:", errorText);
        throw new Error("Azure API error: " + errorText);
    }
    const data = await response.json() as AzureTranslationResponse;
    return data[0]?.translations[0]?.text;
}

// Main export for your app
export const translateText = async ({
    sourceText,
    sourceLanguage,
    targetLanguage,
}: TranslationRequest) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    // Map your language values to ISO codes if needed
    const langMap: Record<string, string> = {
        english: 'en',
        pashto: 'ps',
        urdu: 'ur',
    };

    const from = langMap[sourceLanguage] || 'en';
    const to = langMap[targetLanguage] || 'en';

    try {
        const translated = await azureTranslate(sourceText, from, to);
        return { translatedText: translated || "" };
    } catch (err) {
        console.error("Translation error:", err);
        throw new Error("Translation failed");
    }
};