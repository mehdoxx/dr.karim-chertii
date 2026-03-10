import { GoogleGenerativeAI } from '@google/generative-ai';

// Determine API key
const apiKey = process.env.GEMINI_API_KEY || 'mock-dev-key';
const genAI = new GoogleGenerativeAI(apiKey);

export interface SkinAnalysisResult {
    condition: string;
    confidence: string;
    routine: string[];
    recommendedTreatment: string;
    disclaimer: string;
}

const SYSTEM_PROMPT = `
You are Doctor Karim Cherti's AI Skin Advisor. You are a highly professional, empathetic, and conservative dermatology AI assistant.
Your goal is to provide a preliminary, helpful skin analysis based on user inputs (either a text concern or an image).

STRICT RULES:
1. ALWAYS respond in valid JSON format. No markdown blocks wrapping the JSON, just the raw JSON object.
2. The JSON MUST match the following structure exactly:
{
  "condition": "Brief name of the probable condition or skin type (e.g. 'Acné inflammatoire', 'Peau sèche et sensible')",
  "confidence": "Low, Medium, or High depending on image clarity. Always 'N/A' for text-only.",
  "routine": ["Step 1: Gentle Cleanser", "Step 2: Non-comedogenic Moisturizer", "Step 3: SPF 50+"],
  "recommendedTreatment": "The specific treatment from Dr. Cherti's 9 services (e.g. 'Peeling Chimique', 'Consultation Dermatologique').",
  "disclaimer": "Une brève clause de non-responsabilité médicale indiquant que ceci n'est pas un diagnostic final et nécessite une consultation."
}
3. If the language requested is Arabic ('ar'), ALL JSON string values must be in professional medical Arabic.
4. If the language requested is French ('fr'), ALL JSON string values must be in professional medical French.
5. NEVER diagnose severe diseases (e.g. melanoma) with certainty. Always recommend an urgent consultation.

Analyze the given input and return the JSON.
`;

export async function analyzeSkin(prompt: string, imageBase64: string | null = null, lang: 'fr' | 'ar' = 'fr'): Promise<SkinAnalysisResult> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const fullPrompt = `${SYSTEM_PROMPT}\n\nRequested Output Language: ${lang}\n\nUser Input: ${prompt}`;

        let result;
        if (imageBase64) {
            // Decode base64 to parts
            // Assuming imageBase64 is a raw base64 string without data uris
            const dataURI = imageBase64.includes(',') ? imageBase64.split(',')[1] : imageBase64;
            const imageParts = [
                {
                    inlineData: {
                        data: dataURI,
                        mimeType: "image/jpeg"
                    }
                }
            ];
            result = await model.generateContent([fullPrompt, ...imageParts]);
        } else {
            result = await model.generateContent(fullPrompt);
        }

        const responseText = result.response.text();
        // Safely parse JSON
        const cleanJSON = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanJSON) as SkinAnalysisResult;
    } catch (error) {
        console.error("Gemini API Error:", error);
        // Fallback response if API fails or parsing fails
        return {
            condition: lang === 'fr' ? "Analyse technique indisponible." : "التحليل التقني غير متاح.",
            confidence: "N/A",
            routine: lang === 'fr' ? ["Veuillez essayer à nouveau."] : ["يرجى المحاولة مرة أخرى."],
            recommendedTreatment: lang === 'fr' ? "Consultation au cabinet" : "استشارة في العيادة",
            disclaimer: lang === 'fr' ? "Erreur réseau." : "خطأ في الشبكة."
        };
    }
}
