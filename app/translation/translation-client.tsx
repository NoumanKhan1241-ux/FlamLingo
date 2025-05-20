"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { translateText } from "@/actions/translation";
import { toast } from "sonner";

export const TranslationClient = () => {
    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleTranslate = async () => {
        if (!sourceText || !sourceLanguage || !targetLanguage) {
            toast.error("Please fill in all fields");
            return;
        }
        if (sourceLanguage === targetLanguage) {
            toast.error("Source and target languages must be different");
            return;
        }
        setIsLoading(true);
        try {
            const result = await translateText({
                sourceText,
                sourceLanguage,
                targetLanguage,
            });
            setTranslatedText(result.translatedText);
        } catch (error) {
            toast.error("Translation failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setSourceText("");
        setTranslatedText("");
    };

    return (
        <div className="flex flex-col items-center min-h-[80vh] justify-center bg-gradient-to-br from-blue-50 to-white py-8">
            <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-3xl">
                <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-tight">
                    🌐 Translation Tool
                </h1>
                <div className="flex flex-col lg:flex-row justify-center gap-y-6 lg:gap-y-0 lg:gap-x-8 items-center">
                    {/* Source Language */}
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-semibold text-blue-600">From</label>
                        <Select onValueChange={setSourceLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select source language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pashto">🇦🇫 Pashto</SelectItem>
                                <SelectItem value="english">🇬🇧 English</SelectItem>
                                <SelectItem value="urdu">🇵🇰 Urdu</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea
                            placeholder="Enter text to translate..."
                            className="min-h-[140px] border-blue-200 focus:border-blue-400 transition"
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                        />
                    </div>
                    {/* Target Language */}
                    <div className="flex flex-col gap-y-3 w-full">
                        <label className="font-semibold text-blue-600">To</label>
                        <Select onValueChange={setTargetLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select target language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pashto">🇦🇫 Pashto</SelectItem>
                                <SelectItem value="english">🇬🇧 English</SelectItem>
                                <SelectItem value="urdu">🇵🇰 Urdu</SelectItem>
                            </SelectContent>
                        </Select>
                        <Textarea
                            placeholder="Translation will appear here..."
                            className="min-h-[140px] border-green-200 focus:border-green-400 transition bg-green-50"
                            readOnly
                            value={translatedText}
                        />
                    </div>
                </div>
                <div className="flex justify-center gap-x-4 mt-8">
                    <Button
                        size="lg"
                        className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold shadow transition"
                        onClick={handleTranslate}
                        disabled={isLoading}
                    >
                        {isLoading ? "Translating..." : "Translate"}
                    </Button>
                    <Button
                        variant="primaryOutline"
                        size="lg"
                        className="w-full lg:w-auto border-blue-300 text-blue-700"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
}; 