'use server';

import { generateSeoKeywords, type SeoKeywordsInput } from "@/ai/flows/seo-keyword-suggestions";

export async function getSeoSuggestions(data: SeoKeywordsInput) {
  try {
    const result = await generateSeoKeywords(data);
    return { success: true, keywords: result.keywords };
  } catch (error) {
    console.error("Error generating SEO suggestions:", error);
    return { success: false, error: "Failed to generate SEO suggestions. Please try again later." };
  }
}
