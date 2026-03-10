import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';
import { sanitizeString, validateAppointmentInput } from '@/lib/validation';
import { AppointmentInsert } from '@/types/database';

// ── In-memory rate limiter (per Vercel function instance) ──
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ipHash: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ipHash);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(ipHash, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    if (entry.count >= RATE_LIMIT_MAX) {
        return true;
    }

    entry.count += 1;
    return false;
}

function hashIP(ip: string): string {
    return createHash('sha256').update(ip).digest('hex');
}

// Email logic removed per user request

export async function POST(request: Request) {
    try {
        // 1. Verify Content-Type
        const contentType = request.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return NextResponse.json(
                { success: false, error: 'Content-Type must be application/json' },
                { status: 400 }
            );
        }

        // 2. Parse and sanitize body
        const body = await request.json();
        const sanitizedData: Partial<AppointmentInsert> = {
            first_name: sanitizeString(body.first_name),
            last_name: sanitizeString(body.last_name),
            phone: sanitizeString(body.phone),
            email: body.email ? sanitizeString(body.email) : undefined,
            service: sanitizeString(body.service),
            message: body.message ? sanitizeString(body.message) : undefined,
            lang: body.lang === 'ar' ? 'ar' : 'fr',
        };

        // 3. Validate
        const validation = validateAppointmentInput(sanitizedData, sanitizedData.lang as 'fr' | 'ar');
        if (!validation.valid) {
            return NextResponse.json(
                { success: false, errors: validation.errors },
                { status: 400 }
            );
        }

        // 4. Rate Limiting via hashed IP
        const forwarded = request.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
        const ipHash = hashIP(ip);

        if (isRateLimited(ipHash)) {
            return NextResponse.json(
                { success: false, error: sanitizedData.lang === 'fr' ? 'Trop de demandes. Réessayez dans une heure.' : 'طلبات كثيرة جداً. حاول بعد ساعة.' },
                { status: 429 }
            );
        }

        // 5. Prepare insertion payload
        const insertPayload: AppointmentInsert = {
            first_name: sanitizedData.first_name as string,
            last_name: sanitizedData.last_name as string,
            phone: sanitizedData.phone as string,
            email: sanitizedData.email,
            service: sanitizedData.service as string,
            message: sanitizedData.message,
            lang: sanitizedData.lang as 'fr' | 'ar',
            ip_hash: ipHash,
            user_agent: request.headers.get('user-agent') || undefined,
        };

        // 6. Save to Supabase using admin key
        const { data, error } = await supabaseAdmin
            .from('appointments')
            .insert(insertPayload)
            .select('id')
            .single();

        if (error) {
            console.error('[Appointments API] Supabase error:', error);
            return NextResponse.json(
                { success: false, error: 'Une erreur est survenue.' },
                { status: 500 }
            );
        }

        // 7. Return success
        return NextResponse.json(
            { success: true, appointmentId: data.id },
            { status: 201 }
        );

    } catch (err) {
        console.error('[Appointments API] Unexpected error:', err);
        return NextResponse.json(
            { success: false, error: 'Une erreur est survenue.' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { success: false, error: 'Method Not Allowed' },
        { status: 405 }
    );
}
