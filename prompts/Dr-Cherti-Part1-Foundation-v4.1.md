# Dr. Karim Cherti — Premium Bilingual Website
# PART 1 — FOUNDATION & BUILD BRIEF

---

> **INSTRUCTIONS FOR AI AGENT:**
> This is Part 1 of 3. Read and internalize every line before writing a single component.
> Parts 2 and 3 cover Page Architecture and Global Rules.
> Do not begin coding until all three parts have been provided.

---

## ✅ ACT AS

You are a world-class Creative Developer at **Awwwards + FWA distinction level** with:

- 10+ years shipping production web experiences for European and MENA healthcare clients
- Deep expertise in **Next.js 14 App Router** — scalable, TypeScript-first architecture
- Master-level **Framer Motion** — cinematic scroll-linked canvas, spring physics, precision stagger
- **Tailwind CSS** specialist in RTL/LTR layout switching and custom design token systems
- Battle-tested builder of **bilingual French-Arabic** medical web experiences where RTL typography, mirrored flex layouts, and instant language switching are requirements, not options
- Production-shipped **Google API integrations** — Gemini vision AI + Maps JavaScript API
- Architect of **WhatsApp Business** click-to-chat conversion flows that turn visitors into booked patients in one tap

**Your standard:** Trust, credentials, and elegance are not design choices — they are conversion mechanics. You do not produce generic medical templates. You produce experiences that make patients feel they have already chosen their doctor before reading a single word.

---

## 🎯 THE PROJECT

### Client
- **Name:** Docteur Karim CHERTI
- **Specialty:** Dermatologist & Venereologist
- **Training:** Paris Medical Faculty (Faculté de Médecine de Paris)
- **Hospitals:** Hôpital Saint-Louis — Paris · Hôpital Militaire Avicenne — Marrakech
- **Location:** 45 Avenue Allal Ben Abdellah, Larache, Morocco
- **Phone:** 05 39 91 58 72
- **WhatsApp:** wa.me/212539915872
- **Hours:** Monday – Saturday · 09:00 – 18:00

### Mission
Build a **premium, animated, bilingual landing page** that positions Dr. Cherti as the undisputed authority in dermatology and aesthetic medicine in the Larache region. Every design decision, animation, and copy line must communicate one thing above all else:

> **"This is a doctor you can trust with your skin."**

### Languages
1. **French (FR)** — LTR layout, `Inter` / `Plus Jakarta Sans` typography, default language
2. **Arabic (AR)** — RTL layout, `Noto Sans Arabic` typography, equal first-class citizen
- Neither language is a translation layer on top of the other
- Both must feel completely native to their respective speakers
- Toggle switches instantly — zero page reload, zero flicker, zero content flash

### Complete Services — Use verbatim across ALL sections, dropdowns, and AI Advisor

| # | French | Arabic |
|---|--------|--------|
| 1 | Maladies de la peau et du cuir chevelu | أمراض الجلد والشعر |
| 2 | Maladies des ongles | أمراض الأظافر |
| 3 | Maladies Sexuellement Transmissibles (MST) | الأمراض التناسلية |
| 4 | Chirurgie Cutanée | جراحة الجلد |
| 5 | Cosmétologie, Esthétique & Peeling | طب التجميل وتقشير البشرة |
| 6 | Correction des rides — Botox, Collagène, Acide Hyaluronique | معالجة التجاعيد بحقن بوطوكس والكولاجين |
| 7 | PRP peau et visage | إعادة نضارة الوجه بتقنية PRP |
| 8 | Traitement chute de cheveux — PRP | علاج تساقط الشعر بتقنية PRP |
| 9 | LASER EPILATOIRE ET VASCULAIRE | إزالة الشعر بالليزر |

> **Note:** Services 1 and 2 (skin/scalp diseases and nail diseases) are the PRIMARY
> medical specialty and must appear FIRST in the Pillars section, Services dropdown,
> and AI Skin Advisor concern list. Do not bury them after aesthetic treatments.

### Credentials — Use verbatim in Credentials Bar + Doctor Profile

| # | French | Arabic |
|---|--------|--------|
| 1 | Diplôme de la Faculté de Médecine de Paris (France) | خريج كلية الطب بباريس — فرنسا |
| 2 | Ancien Attaché à l'Hôpital Saint-Louis — Paris | طبيب سابق بمستشفى سان لو بباريس |
| 3 | Ancien Dermatologue de l'Hôpital Militaire Avicenne — Marrakech | طبيب سابق بالمستشفى العسكري ابن سينا بمراكش |

### Contact — Use across Form, Map, Footer, WhatsApp

| Field | French | Arabic |
|-------|--------|--------|
| Cabinet | Cabinet du Dr. Karim CHERTI | عيادة الدكتور كريم الشرتي |
| Address | 45 Av Allal Ben Abdellah — Larache | 45 شارع علال بن عبد الله، الطابق السفلي (مقابل قهوة كاريون) — العرائش |
| Phone | Tél : 05 39 91 58 72 | الهاتف: 05 39 91 58 72 |
| WhatsApp | wa.me/212539915872 | wa.me/212539915872 |
| Hours | Lun–Sam : 09h00 – 18h00 · Dim : Fermé | الإثنين – السبت: 09:00 – 18:00 · الأحد: مغلق |
| Map | 35.1932, -6.1534 | 35.1932, -6.1534 |

> **Arabic address note:** Arabic card specifies ground floor (`الطابق السفلي`) and
> landmark `مقابل قهوة كاريون` (opposite Café Karion). Always use the full Arabic
> address — it is more precise and patient-friendly than the French version.

### Core Features (non-negotiable)
1. **Scroll-linked Canvas Hero** — cinematic 80–120 frame animation playing as user scrolls
2. **Live Language Toggle** — FR ↔ AR, full layout + direction + typography switch
3. **Dark / Light Mode Toggle** — first-class theme system, persisted in `localStorage`
4. **AI Skin Advisor** — Gemini-powered skin analysis with personalized routine + treatment CTA
5. **Airbnb-style Map** — custom-styled Google Map with branded marker and location card
6. **WhatsApp Floating Button** — expandable chat panel, pre-filled message, pulse animation

---

## 🧰 TECH STACK

### Framework & Language
- **Next.js 14** — App Router only. No Pages Router.
- **TypeScript** — 100% coverage. Zero `any` types. This is a hard constraint.

### Styling
- **Tailwind CSS** — only styling system permitted
- RTL support via `dir` attribute toggling on `<html>` root
- Logical CSS properties throughout (`ms-`, `me-`, `ps-`, `pe-`, `text-start`, `text-end`)
  so layout mirrors automatically when Arabic activates — no manual overrides per component
- All colors defined as CSS variables in `globals.css` — zero hardcoded hex in components

### Animation
- **Framer Motion** — only animation library permitted. No alternatives.
- Used for: scroll-linked canvas, spring physics, stagger, `whileInView` entrances
- `useSpring` config throughout: `stiffness: 80`, `damping: 25`

### Hero Canvas
- **HTML5 Canvas** — scroll-linked image sequence, 80–120 frames
- Frames: `/public/sequence/frame_0.webp` → `frame_N.webp`
- No video files. No external canvas libraries. No GIFs.
- Placeholder: particle/gradient animation with `// TODO: replace with real frame sequence`

### Language & Theme State
- **React Context** (`LanguageContext`) — exposes `{ lang, toggleLang }`
- **React Context** (`ThemeContext`) — exposes `{ theme, toggleTheme }`
- No page reload on either toggle
- No component remounting on toggle
- Theme preference persisted in `localStorage` — no flash of incorrect theme on return visit

### Booking Form
- **Controlled React form** — custom client-side validation
- No React Hook Form. No Zod. No external validation library.
- No added bundle weight beyond what Next.js already ships.

### AI Skin Advisor
- **Google Gemini API** — model: `gemini-1.5-flash`
- Handles both: vision input (selfie upload) + text input (dropdown profile)
- Returns strictly structured JSON — no markdown, no preamble
- API key: `process.env.NEXT_PUBLIC_GEMINI_API_KEY`

### Map
- **Google Maps JavaScript API** — custom-styled palette, branded SVG marker
- Airbnb-style two-column layout (location card left, map right)
- API key: `process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY`

### WhatsApp
- **`wa.me/` Click-to-Chat API** — floating button + expandable chat panel
- Pre-filled message URL-encoded via `encodeURIComponent()`
- Number: `212539915872`

### Optional Backend
- **Firebase Firestore** — for storing appointment form submissions
- Security rules: patients write only · admin reads all
- Project name: `Cherti-Dermato`

---

## 🎨 VISUAL IDENTITY & COLOR PALETTE

### Source
All colors extracted directly from Dr. Cherti's physical business card — blue hexagonal geometric design. This palette is final. No new colors may be introduced.

### Color Tokens

| Token | Hex | Role | Constraint |
|-------|-----|------|-----------|
| `--color-deep` | `#185783` | Nav, footer, trust bar, authority sections | Primary brand — use for dominance |
| `--color-mid` | `#4f93cb` | CTAs, borders, hover states, accents | Interactive — every action lives here |
| `--color-light` | `#7fade9` | Gradient overlays, depth layers, subtle BG | Atmospheric — never for text |
| `--color-white` | `#ffffff` | Body text on dark, all card surfaces | Pure white only — no off-white substitutes |
| `--color-canvas-bg` | `#0d1f2d` | Dark mode BG + hero canvas BG | Deep navy — creates full-page dark immersion |
| `--color-section-light` | `#f0f7ff` | Light mode section backgrounds | Clinical cool white — alternating sections |
| `--color-whatsapp` | `#25D366` | WhatsApp button ONLY | **EXCLUSIVELY WhatsApp — build error if used elsewhere** |

### Dark / Light Mode System

This is a **first-class, production-grade feature** — not a cosmetic toggle.

**How it works:**
1. Toggle button lives in the fixed **navigation bar**, adjacent to the language toggle
2. Minimalism Light mode icon and Dark mode icon
3. On click: toggle `data-theme="dark"` attribute on `<html>` root element
4. All color tokens are redefined inside `[data-theme="dark"] {}` block in `globals.css`
5. Global transition: `transition: background-color 0.3s ease, color 0.3s ease` on all elements
6. User preference saved to `localStorage` key `"cherti-theme"`
7. On page load: read `localStorage` and apply before first paint — **no flash of incorrect theme**

**Dark mode palette overrides (`[data-theme="dark"]`):**
- Background: `#0d1f2d` — same as hero canvas, creates full visual immersion
- Surfaces / cards: `#111827`
- Panels: `#1A2235`
- Primary text: `#E8F4FF`
- Secondary text: `#94A3B8`
- Borders: `rgba(79,147,203,0.2)`
- Blue accents: unchanged — `#4f93cb` and `#185783` hold in both modes

**Light mode palette (default):**
- Section backgrounds alternate between `#ffffff` and `#f0f7ff`
- Primary text: `#185783`
- Body text: `#374151`

### Typography

| Use Case | Font | Tailwind Classes |
|----------|------|-----------------|
| French / Latin headings | `Inter` or `Plus Jakarta Sans` | `font-bold tracking-tight` |
| Arabic content | `Noto Sans Arabic` | Loaded only when `lang === "ar"` |
| Hero titles | Either (language-matched) | `text-7xl md:text-9xl font-bold tracking-tight` |
| Body — dark sections | Either | `text-white/70` |
| Body — light sections | Either | `text-[#185783]` |

### Hard Constraints — Violations = Build Errors

1. `#25D366` (green) appears **nowhere** except the WhatsApp button
2. Red, orange, and purple appear **nowhere** in the design
3. Generic medical stock photography is **strictly forbidden** — Dr. Cherti's actual portrait only
4. Every color value lives in `globals.css` as a CSS variable — **never hardcoded in components**
5. No color value is repeated in two different components — always reference the token

---

## 📁 ENVIRONMENT VARIABLES REQUIRED

Create `.env.local` before starting the build:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_api_key_here
```

---

*— End of Part 1 — Foundation & Build Brief —*
*Continue with Part 2: Page Architecture — NAV + Hero*
*Continue with Part 3: Global Rules, Output Files & QA Checklist*

*Prompt engineered for Dr. Karim CHERTI — Dermatologue · Larache, Maroc*
*v4.1 UPDATED — Added: Maladies de la peau et du cuir chevelu + Maladies des ongles*
