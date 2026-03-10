## WHAT YOU ARE BUILDING

```
Appointment form → Supabase database → Client Infomations to doctor + patient
Visitor tracking → Supabase database → Admin dashboard stats
Skin Advisor chat → Supabase database → Conversation history
Admin at /admin  → View + confirm + cancel all appointments
```

---

## SET THE ROLE

```
You are a senior full-stack developer with 10+ years of experience
building production backends for medical and healthcare websites.
You specialize in Next.js 14 App Router, Supabase (PostgreSQL),
TypeScript with zero any types, and secure API design.

The frontend of Dr. Karim Cherti's bilingual dermatology website
is already complete and live on Vercel. It is built with:
- Next.js 14 App Router
- TypeScript (zero any types throughout)
- Tailwind CSS + Framer Motion
- Bilingual FR/AR via LanguageContext
- All strings via lib/translations.ts
- Color tokens via CSS variables in globals.css
- Deployed on Vercel

You are now building the complete backend using Supabase.
Supabase gives us: PostgreSQL database, real-time subscriptions,
row-level security, and REST API — all in one service.

Do not write any code yet.
Confirm you understand all 5 points:
1. The frontend already exists and is live
2. We are using Supabase (not Firebase)
3. TypeScript zero any throughout
4. The website is bilingual FR/AR
5. Deployment is on Vercel
```

---

## SUPABASE SETUP + ENVIRONMENT VARIABLES

```
Step 1 of 7: Set up Supabase connection and environment variables.

MANUAL STEPS TO DO FIRST (in Supabase dashboard):
1. Go to https://supabase.com → create a new project
2. Project name: cherti-dermato
3. Region: West EU Frankfurt (closest to Morocco)
4. Save your database password somewhere safe
5. Go to Project Settings → API
6. Copy: Project URL, anon/public key, service_role key

Install the Supabase package:
npm install @supabase/supabase-js

Create FILE: lib/supabase.ts

Contents:
- Import createClient from @supabase/supabase-js
- Create and export: supabase
  Uses NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
  Safe for browser use
- Create and export: supabaseAdmin
  Uses SUPABASE_SERVICE_ROLE_KEY
  CRITICAL: Never import this in any component file
  Only for server-side API routes
- Zero any types throughout

Create FILE: .env.local — add these exact variables:

# ── SUPABASE ──
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# ── EMAIL ──
RESEND_API_KEY=re_your_key_here
DOCTOR_EMAIL=dr.cherti@gmail.com
FROM_EMAIL=noreply@dr-cherti.ma

# ── APP ──
NEXT_PUBLIC_SITE_URL=https://dr-cherti.ma
ADMIN_PASSWORD=choose_a_very_strong_password_here

Show me lib/supabase.ts only. Wait for my approval.
```

---

## PROMPT 3 — DATABASE SCHEMA (4 TABLES)

```
Step 2 of 7: Create the complete database schema.

Create FILE: supabase/schema.sql

This file contains all SQL to paste into
Supabase Dashboard → SQL Editor → Run.

-- ── TABLE 1: Appointment bookings ──
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  service TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  lang TEXT DEFAULT 'fr' CHECK (lang IN ('fr', 'ar')),
  ip_hash TEXT,
  user_agent TEXT
);

-- ── TABLE 2: Skin Advisor AI conversations ──
CREATE TABLE skin_advisor_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  lang TEXT DEFAULT 'fr',
  messages JSONB DEFAULT '[]',
  skin_type TEXT,
  main_concern TEXT,
  total_messages INTEGER DEFAULT 0,
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── TABLE 3: Website visitor tracking ──
CREATE TABLE visitor_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT NOT NULL,
  page TEXT NOT NULL,
  referrer TEXT,
  device_type TEXT CHECK (device_type IN ('mobile','tablet','desktop')),
  browser TEXT,
  lang TEXT,
  duration_seconds INTEGER,
  events JSONB DEFAULT '[]'
);

-- ── TABLE 4: Admin login sessions ──
CREATE TABLE admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL
);

-- ── Row Level Security ──
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE skin_advisor_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitor_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Public can only INSERT appointments — no reads ever
CREATE POLICY "Public insert appointments"
  ON appointments FOR INSERT TO anon WITH CHECK (true);

-- Public can INSERT + UPDATE skin sessions
CREATE POLICY "Public insert skin sessions"
  ON skin_advisor_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update skin sessions"
  ON skin_advisor_sessions FOR UPDATE TO anon USING (true);

-- Public can INSERT visitor tracking
CREATE POLICY "Public insert visitor tracking"
  ON visitor_tracking FOR INSERT TO anon WITH CHECK (true);

-- ── Performance indexes ──
CREATE INDEX idx_appointments_created_at ON appointments(created_at DESC);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_skin_sessions_id ON skin_advisor_sessions(session_id);
CREATE INDEX idx_visitor_session ON visitor_tracking(session_id);

Show me the complete schema.sql.
Also tell me the exact steps to run it in Supabase.
Wait for my approval.
```

---

## PROMPT 4 — TYPESCRIPT TYPES + VALIDATION

```
Step 3 of 7: Create TypeScript types and form validation.

Create FILE 1: types/database.ts

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Appointment {
  id: string
  created_at: string
  first_name: string
  last_name: string
  phone: string
  email?: string
  service: string
  message?: string
  status: AppointmentStatus
  lang: 'fr' | 'ar'
  ip_hash?: string
  user_agent?: string
}

export interface AppointmentInsert {
  first_name: string
  last_name: string
  phone: string
  email?: string
  service: string
  message?: string
  lang: 'fr' | 'ar'
  ip_hash?: string
  user_agent?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface SkinAdvisorSession {
  id: string
  created_at: string
  session_id: string
  lang: 'fr' | 'ar'
  messages: ChatMessage[]
  skin_type?: string
  main_concern?: string
  total_messages: number
  last_message_at: string
}

export interface ValidationResult {
  valid: boolean
  errors: Record<string, string>
}

Create FILE 2: lib/validation.ts

validateAppointmentInput() function:
- first_name: required, max 50 chars
- last_name: required, max 50 chars
- phone: required, max 20 chars
- email: valid format if provided
- service: must be one of these exact values:
  "Maladies de la peau et du cuir chevelu"
  "Maladies des ongles"
  "Maladies Sexuellement Transmissibles"
  "Chirurgie Cutanée"
  "Cosmétologie et Peeling"
  "Botox · Collagène · Acide Hyaluronique"
  "PRP Visage"
  "PRP Cheveux"
  "Laser Épilation et Vasculaire"
  "Dermatologue"
  "Vénérologue"
- message: max 500 chars if provided
- Returns ValidationResult with bilingual errors (FR + AR)

sanitizeString() helper:
- Trim whitespace
- Strip all HTML tags
- Strip all script tags
- Return clean string

Show me both files one at a time. Wait for approval after each.
```

---

## PROMPT 5 — APPOINTMENT API ROUTE + EMAILS

```
Step 4 of 7: Build the appointment API route with email notifications.

Install email package: npm install resend

Create FILE: app/api/appointments/route.ts

POST handler — execute in this exact order:

1. Verify Content-Type is application/json → return 400 if not
2. Parse body, sanitize all string fields with sanitizeString()
3. Validate with validateAppointmentInput()
   → return 400: { success: false, errors } if invalid
4. Rate limiting: max 3 submissions per IP per hour
   In-memory Map, key = hashed IP
   → return 429 if limit exceeded
5. Hash the IP with SHA-256 (Node built-in crypto module):
   crypto.createHash('sha256').update(ip).digest('hex')
   Never store the raw IP address
6. Save to Supabase appointments table using supabaseAdmin
7. Send emails using Resend with Promise.allSettled():
   Email NEVER fails the booking — errors go to console.error only

   EMAIL TO DOCTOR:
   Subject: "🔔 Nouveau RDV — [first_name] [last_name] — [service]"
   From: process.env.FROM_EMAIL
   To: process.env.DOCTOR_EMAIL
   Body (inline CSS HTML):
     Header: #0d1f2d background, "Dr. K. CHERTI" white, 4px #4f93cb top border
     Patient name (bold)
     Phone as clickable tel: link (large font, easy to tap mobile)
     Service requested (highlighted #4f93cb)
     Message if provided
     Submission date/time

   EMAIL TO PATIENT (only if email provided):
   If lang === 'fr':
     Subject: "✅ Votre demande de RDV — Dr. Cherti"
     Body: "Bonjour [first_name], votre demande a été reçue.
            Dr. Cherti vous contactera dans les 24 heures.
            Tél: 05 39 91 58 72
            45 Av Allal Ben Abdellah, Larache"
   If lang === 'ar':
     Subject: "✅ تأكيد طلب موعدكم — الدكتور الشرتي"
     Body: same content in Arabic, dir=rtl on all elements

8. Return 201: { success: true, appointmentId: data.id }
9. Any unexpected error → return 500:
   { success: false, error: "Une erreur est survenue." }

GET handler → return 405 Method Not Allowed immediately

Show me the complete file. Wait for my approval.
```

---

## PROMPT 6 — VISITOR TRACKING

```
Step 5 of 7: Build the visitor tracking system.

GDPR-friendly design:
- No cookies, no personal data, no cross-site tracking
- session_id stored in sessionStorage only (cleared on tab close)
- No IP addresses stored anywhere in this system

Create FILE 1: app/api/track/route.ts

POST handler:
- Accept: { session_id, page, referrer, device_type, browser, lang, event? }
- Upsert into visitor_tracking using supabaseAdmin
- If event provided: append to events JSONB array
- Return 200 { success: true } always
- If anything fails: return 200 anyway (never break the page)

Create FILE 2: lib/tracker.ts (client-side utility)

Tracker class:
- init(): void
  Generate or get session_id from sessionStorage
  Detect device_type from window.innerWidth:
    < 768px → 'mobile', 768–1024px → 'tablet', > 1024px → 'desktop'
  Detect browser from navigator.userAgent
  Call trackPageView() automatically

- trackPageView(page: string): void
  POST to /api/track — fire and forget, never await, never throw

- trackEvent(type: string, element?: string): void
  POST to /api/track with event — fire and forget

export const tracker = new Tracker()

Update app/layout.tsx:
- Import tracker
- Call tracker.init() in a useEffect on mount
- Auto-track these events:
  CTA button click → tracker.trackEvent('click', 'cta-nav')
  Form becomes visible → tracker.trackEvent('form_start', 'reservation-form')
  Skin advisor opened → tracker.trackEvent('chatbot_open', 'skin-advisor')

Show me each file. Wait for approval after each.
```

---

## PROMPT 7 — ADMIN DASHBOARD

```
Step 6 of 7: Build the admin dashboard at /admin.

Create FILE 1: middleware.ts (project root)
- Protect all /admin/* routes
- Check for httpOnly cookie: "cherti-admin-token"
- Verify token exists in Supabase admin_sessions table
  AND expires_at > NOW() using supabaseAdmin
- If invalid or missing → redirect to /admin/login
- Allow /admin/login and /api/admin/* through without checking

Create FILE 2: app/admin/login/page.tsx
- Full page, dark navy #0d1f2d background
- Centered card: "Dr. K. CHERTI" header, #4f93cb accent border
- Password input + "Accéder au tableau de bord" button
- POST to /api/admin/auth on submit
- On success: redirect to /admin
- On failure: show "Mot de passe incorrect" error in red

Create FILE 3: app/api/admin/auth/route.ts
POST (login):
- Compare submitted password with process.env.ADMIN_PASSWORD
- On match:
  Generate token: crypto.randomUUID()
  Hash it: SHA-256
  Insert into admin_sessions { token_hash, expires_at: NOW()+24h }
  Set httpOnly cookie "cherti-admin-token" maxAge 86400
  Return { success: true }
- On mismatch: return 401 { success: false }

DELETE (logout):
- Get token from cookie
- Delete matching row from admin_sessions
- Clear the cookie
- Return { success: true }

Create FILE 4: app/admin/page.tsx (server component)
- Verify admin session server-side
- Fetch using supabaseAdmin:
  All appointments ordered by created_at DESC
  Count grouped by status
  Visitor count for last 7 days from visitor_tracking
  Total skin_advisor_sessions count
- Pass all data to AdminDashboard client component

Create FILE 5: components/AdminDashboard.tsx (client component)

STATS BAR — 4 cards at top:
- Total appointments this month
- Pending appointments (amber highlight if count > 0)
- Website visitors this week
- Skin advisor conversations total

APPOINTMENTS TABLE:
Columns: Date · Full Name · Phone · Service · Lang · Status · Actions
- Phone: clickable tel: link
- Status badges:
  pending → amber background "En attente"
  confirmed → #4f93cb background "Confirmé"
  cancelled → grey background "Annulé"
- Confirm button → PATCH /api/admin/appointments/[id] { status: 'confirmed' }
- Cancel button → PATCH /api/admin/appointments/[id] { status: 'cancelled' }
- Filter tabs: Tous · En attente · Confirmés · Annulés
- Realtime: subscribe to Supabase realtime on appointments table
  New appointments appear instantly without page refresh
- Logout button top right → DELETE /api/admin/auth

Create FILE 6: app/api/admin/appointments/[id]/route.ts
PATCH handler:
- Verify cherti-admin-token cookie against admin_sessions table
- Validate: status must be 'confirmed' or 'cancelled'
- Update appointment status in Supabase
- Return 200 { success: true }
- Return 401 if session invalid or expired

Show me each file one at a time. Wait for approval after each.
```

---

## PROMPT 8 — CONNECT FORM TO BACKEND

```
Step 7 of 7: Connect the existing form to the live API.

The form in components/ReservationForm.tsx already exists visually.
Replace the mock handleFormSubmit with a real API call.

Update FILE: components/ReservationForm.tsx

Replace mock submission with async function that:
1. Sets isSubmitting to true
2. POST fetch() to /api/appointments:
   Headers: { "Content-Type": "application/json" }
   Body: { first_name, last_name, phone, email,
           service, message, lang }
3. On 201: setFormSuccess(true), reset all form fields
4. On 400: show field-level errors from API response errors object
5. On 429: show bilingual rate limit banner
6. On 500: show bilingual error banner with retry button
7. Finally block: setIsSubmitting(false)

Submit button states:
- Default: shows CTA text from translations
- Loading: CSS spinner inline + disabled + same button width
- Success: green checkmark state

Add to lib/translations.ts under 'form' key:
FR:
  submitting: "Envoi en cours..."
  errorServer: "Une erreur est survenue. Veuillez réessayer."
  errorRateLimit: "Trop de demandes. Réessayez dans une heure."
  retry: "Réessayer"
AR:
  submitting: "جارٍ الإرسال..."
  errorServer: "حدث خطأ. يرجى المحاولة مرة أخرى."
  errorRateLimit: "طلبات كثيرة جداً. حاول بعد ساعة."
  retry: "إعادة المحاولة"

Show me both files. Wait for my approval after each.
```

---

## 🔴 CORRECTION PROMPTS — COPY THESE WHEN THINGS GO WRONG

**Service role key visible in a component:**
```
Stop. SUPABASE_SERVICE_ROLE_KEY must never appear in
any component or client-side file. It is server-only.
Move all supabaseAdmin usage to API routes only.
Browser components use only the supabase client (anon key).
```

**Raw IP address being stored:**
```
Stop. Never store raw IP addresses — privacy violation.
Hash it first using Node's built-in crypto module:
crypto.createHash('sha256').update(ip).digest('hex')
Store only the hash. Delete the raw IP immediately.
```

**Email failure returning 500 to user:**
```
Stop. Email failure must never fail the booking.
Wrap both email sends in Promise.allSettled().
Catch all email errors with console.error only.
Return 201 as long as the Supabase INSERT succeeded.
```

**Admin route missing authentication check:**
```
Stop. This admin route has no session verification.
Add at the very top of the handler:
1. Get cherti-admin-token from cookies
2. Query admin_sessions table for matching token_hash
   where expires_at > NOW()
3. If not found → return 401 immediately
Never process the request before this check passes.
```

---

## COMPLETE FILE LIST

```
lib/supabase.ts
supabase/schema.sql
types/database.ts
lib/validation.ts
app/api/appointments/route.ts
app/api/track/route.ts
lib/tracker.ts
app/api/admin/auth/route.ts
app/api/admin/appointments/[id]/route.ts
app/admin/login/page.tsx
app/admin/page.tsx
components/AdminDashboard.tsx
middleware.ts
(updated) components/ReservationForm.tsx
(updated) lib/translations.ts
(updated) app/layout.tsx

TOTAL: 13 new files · 3 updated files
```