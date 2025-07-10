// 'use server';
/**
 * @fileOverview A flow for generating SEO keyword suggestions based on company information.
 *
 * - generateSeoKeywords - A function that generates SEO keywords.
 * - SeoKeywordsInput - The input type for the generateSeoKeywords function.
 * - SeoKeywordsOutput - The return type for the generateSeoKeywords function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeoKeywordsInputSchema = z.object({
  missionStatement: z
    .string()
    .describe('The company mission statement.'),
  productDescriptions: z
    .string()
    .describe('Detailed descriptions of the products offered.'),
});
export type SeoKeywordsInput = z.infer<typeof SeoKeywordsInputSchema>;

const SeoKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('A list of relevant SEO keywords.'),
});
export type SeoKeywordsOutput = z.infer<typeof SeoKeywordsOutputSchema>;

export async function generateSeoKeywords(input: SeoKeywordsInput): Promise<SeoKeywordsOutput> {
  return generateSeoKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'seoKeywordsPrompt',
  input: {schema: SeoKeywordsInputSchema},
  output: {schema: SeoKeywordsOutputSchema},
  prompt: `You are an SEO expert. Generate a list of SEO keywords based on the following information:

Mission Statement: {{{missionStatement}}}

Product Descriptions: {{{productDescriptions}}}

Keywords:`, // Fixed the typo here
});

const generateSeoKeywordsFlow = ai.defineFlow(
  {
    name: 'generateSeoKeywordsFlow',
    inputSchema: SeoKeywordsInputSchema,
    outputSchema: SeoKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
