import { NextResponse } from 'next/server';
import { analyzeSkin } from '@/lib/geminiSkinAdvisor';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, imageBase64, lang } = body;

        if (!prompt && !imageBase64) {
            return NextResponse.json({ error: 'Prompt or image is required' }, { status: 400 });
        }

        const analysis = await analyzeSkin(prompt, imageBase64, lang || 'fr');

        return NextResponse.json({ success: true, analysis });
    } catch (error) {
        console.error('[Skin Advisor API] Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
