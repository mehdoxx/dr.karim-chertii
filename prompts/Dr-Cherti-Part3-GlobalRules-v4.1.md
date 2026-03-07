# Dr. Karim Cherti — Premium Bilingual Website
# PART 3 — GLOBAL SYSTEM RULES, OUTPUT & CHECKLIST

---

> **INSTRUCTIONS FOR AI AGENT:**
> This is Part 3 of 3. Parts 1 and 2 must be read first.
> These rules apply to EVERY component and EVERY file.
> Treat every checklist item as a pass/fail QA gate before delivery.

---

## 🌐 BILINGUAL SYSTEM — CRITICAL REQUIREMENT

### Architecture Rules

1. **Language Context:** `context/LanguageContext.tsx` — exposes `{ lang, toggleLang }`
   - Every component consumes via `useLanguage()` hook — never from props

2. **On every language toggle, in this order:**
   - `document.documentElement.dir` → `"ltr"` (FR) or `"rtl"` (AR)
   - `document.documentElement.lang` → `"fr"` or `"ar"`
   - Body `font-family` → `Inter` (FR) or `Noto Sans Arabic` (AR)

3. **Translations file:** `lib/translations.ts`
   - Single typed TypeScript object · `fr` and `ar` keys for every string
   - Structure: `translations[lang].sectionName.stringKey`
   - Type-safe: `Translations` interface — missing keys = TypeScript build error

4. **Consumption pattern in every component:**
   ```typescript
   const { lang } = useLanguage()
   const t = translations[lang]
   // {t.hero.headline} — never hardcode strings in JSX
   ```

5. **Zero hardcoded strings in JSX** — every visible element goes through `translations.ts`:
   - Buttons · headings · body text · placeholders · aria-labels · errors · success messages · tooltips · service names · credential text

### Complete Services String Keys (must exist in translations.ts)

Both FR and AR entries required for every key:

| Key | French | Arabic |
|-----|--------|--------|
| `services.skin` | Maladies de la peau et du cuir chevelu | أمراض الجلد والشعر |
| `services.nails` | Maladies des ongles | أمراض الأظافر |
| `services.mst` | Maladies Sexuellement Transmissibles | الأمراض التناسلية |
| `services.surgery` | Chirurgie Cutanée | جراحة الجلد |
| `services.aesthetic` | Cosmétologie, Esthétique & Peeling | طب التجميل وتقشير البشرة |
| `services.botox` | Correction des rides — Botox, Collagène, Acide Hyaluronique | معالجة التجاعيد بحقن بوطوكس والكولاجين |
| `services.prp_face` | PRP peau et visage | إعادة نضارة الوجه بتقنية PRP |
| `services.prp_hair` | Traitement chute de cheveux — PRP | علاج تساقط الشعر بتقنية PRP |
| `services.laser` | LASER EPILATOIRE ET VASCULAIRE | إزالة الشعر بالليزر |

> `services.skin` and `services.nails` must be listed FIRST in every dropdown,
> pillar card, and AI Advisor concern list — they are the primary medical specialty.

### RTL-Specific Layout Rules

| Element | LTR (French) | RTL (Arabic) |
|---------|-------------|--------------|
| Text alignment | `text-start` | Flips automatically |
| Flex rows | `flex-row` | `rtl:flex-row-reverse` |
| Form labels | Align left | Align right |
| Card icons | Left of text | Right of text |
| Hero Beat B | Left `pl-[8%]` | Right `pr-[8%]` |
| Hero Beat C | Right `pr-[8%]` | Left `pl-[8%]` |
| WhatsApp button | `bottom-6 right-6` | `bottom-6 left-6` |
| Language toggle | `top-6 right-6` | `top-6 left-6` |
| CTA arrows | `→` | `←` |
| Padding/margin | `ps-` `pe-` `ms-` `me-` | Flips automatically |

**No flicker rule:** CSS variables + class-based switching only — never JS style manipulation.

---

## ✨ POLISH & PERFORMANCE

### Loading & Transitions
1. Canvas loading: spinner `#4f93cb` + progress bar · fade out on 100% · `500ms`
2. Scroll indicator: `"Défiler pour découvrir ↓"` / `"مرر للاستكشاف ↓"` · fades by 10% scroll
3. Section transitions: `whileInView` · `once: true` · `amount: 0.2`
4. Default entrance: `y: 40→0` · `opacity: 0→1` · `duration: 0.6s` · `ease: easeOut`

### Scrollbar
```css
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #0d1f2d; }
::-webkit-scrollbar-thumb { background: #4f93cb; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #7fade9; }
```

### SEO & Meta
```typescript
// app/layout.tsx
title: "Dr. Karim Cherti — Dermatologue · Larache, Maroc"
description FR: "Cabinet de dermatologie à Larache. Peau, ongles, MST, Laser, Botox, PRP, Peeling. Diplômé Paris."
description AR: "عيادة أمراض الجلد بالعرائش. جلد، أظافر، أمراض تناسلية، ليزر، بوتوكس، PRP. خريج باريس."
hreflang: fr · ar · x-default
```

### Spring Presets
```typescript
const defaultSpring  = { stiffness: 80,  damping: 25 }  // scroll, sections
const buttonSpring   = { stiffness: 400, damping: 15 }  // all button clicks
const panelSpring    = { stiffness: 300, damping: 30 }  // drawers, panels
const navSpring      = { stiffness: 120, damping: 20 }  // navbar mount
```

### Cleanup Pattern (every component with side effects)
```typescript
useEffect(() => {
  window.addEventListener('resize', handler, { passive: true })
  window.addEventListener('scroll', handler, { passive: true })
  return () => {
    window.removeEventListener('resize', handler)
    window.removeEventListener('scroll', handler)
    cancelAnimationFrame(rafId.current)
    observer.disconnect()
  }
}, [])
```

---

## ⏱ ANIMATION TIMING RULES

### Hero Text Beat Ranges
| Beat | rangeStart | rangeEnd | Alignment FR | Alignment AR |
|------|-----------|---------|-------------|-------------|
| A | `0.00` | `0.20` | Center | Center |
| B | `0.25` | `0.45` | Left | Right |
| C | `0.50` | `0.70` | Right | Left |
| D | `0.75` | `0.95` | Center | Center |

**Formula:** `[start, start+0.08, end-0.08, end] → opacity:[0,1,1,0] · y:[30,0,0,-30]`

### Stagger Defaults
| Context | `staggerChildren` |
|---------|-----------------|
| Service pillar cards | `0.15s` |
| Credential pills | `0.15s` |
| Testimonial cards | `0.12s` |
| AI Advisor result cards | `0.10s` |
| Mobile drawer links | `0.06s` |
| Beat C treatment tags | `0.08s` |

### Universal Button Rule (ALL buttons sitewide — no exceptions)
```typescript
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.95 }}
transition={{ type: "spring", stiffness: 400, damping: 15 }}
```

---

## 📦 OUTPUT — GENERATE ALL 18 FILES

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `app/page.tsx` | Main page — all sections in order, `LanguageProvider` + `ThemeProvider` |
| 2 | `app/layout.tsx` | Root layout — `<html dir lang>`, fonts, SEO, hreflang |
| 3 | `app/globals.css` | CSS variables, dark mode, scrollbar, RTL, global transitions |
| 4 | `components/Navbar.tsx` | Fixed nav — logo, links, toggles, mobile drawer |
| 5 | `components/DermHero.tsx` | Scroll canvas + 4 beats + loading state |
| 6 | `components/Pillars.tsx` | 3 service cards — skin/nails FIRST, then aesthetic, laser |
| 7 | `components/DoctorProfile.tsx` | Portrait + credential pills + bio + CTAs |
| 8 | `components/CredentialsBar.tsx` | Full-width trust strip — 3 hospital credentials |
| 9 | `components/Testimonials.tsx` | Auto-rotating 3 cards · 5s · no external library |
| 10 | `components/ReservationForm.tsx` | Two-column booking form · `id="reservation-form"` |
| 11 | `components/AISkinAdvisor.tsx` | Gemini AI skin tool — dropdown + selfie + results |
| 12 | `components/ClinicMap.tsx` | Airbnb-style map section wrapper |
| 13 | `components/GoogleMapEmbed.tsx` | Styled map + SVG marker at `35.1932, -6.1534` |
| 14 | `components/Footer.tsx` | Full-width footer — contact, links, copyright |
| 15 | `components/WhatsAppButton.tsx` | Floating button + pulse + expandable chat panel |
| 16 | `context/LanguageContext.tsx` | `lang`, `toggleLang`, `useLanguage` hook |
| 17 | `lib/translations.ts` | ALL bilingual strings including 9 services fully typed |
| 18 | `lib/geminiSkinAdvisor.ts` | Gemini API, system prompt, JSON parser, error handler |
| + | `.env.local.example` | `NEXT_PUBLIC_GEMINI_API_KEY` + `NEXT_PUBLIC_GOOGLE_MAPS_KEY` |

---

## ✅ KEY REQUIREMENTS CHECKLIST

### Core Architecture
- [ ] TypeScript — zero `any` types
- [ ] All colors as CSS variables — no hardcoded hex in components
- [ ] All strings in `translations.ts` — no hardcoded text in JSX
- [ ] `services.skin` and `services.nails` listed FIRST everywhere they appear
- [ ] RTL/LTR switch — no reload, no flicker
- [ ] Dark mode via `data-theme` — persisted in `localStorage`, no flash
- [ ] `Noto Sans Arabic` only when `lang === "ar"`
- [ ] `body pt-16` — no layout shift from fixed navbar

### Navbar
- [ ] Transparent top → frosted glass after 20px
- [ ] Spring mount `y:-100→0`
- [ ] Services hint in nav hover + mobile drawer
- [ ] Language toggle: label-swap spring sequence
- [ ] Dark/Light: icon spin sequence
- [ ] CTA: ripple + bouncy spring + scroll to form
- [ ] Hamburger: SVG `pathLength` animation
- [ ] `IntersectionObserver` active section detection
- [ ] Full RTL mirror

### Canvas Hero
- [ ] 60fps — no dropped frames
- [ ] `useSpring stiffness:80, damping:25`
- [ ] 4 beats — exact scroll ranges + opacity formula
- [ ] Loading spinner + progress bar
- [ ] Canvas `#0d1f2d` — no white flash
- [ ] Cleanup on unmount

### Service Pillars
- [ ] Card 1: Skin + Nails (primary medical) — listed FIRST
- [ ] Card 2: Aesthetic (Botox, PRP, Peeling)
- [ ] Card 3: Laser (Épilation + Vasculaire)
- [ ] `whileInView stagger:0.15s`
- [ ] `border-t-4 border-[#4f93cb]`

### Doctor Profile
- [ ] Portrait with SVG fallback
- [ ] Credential pills stagger `0.15s`
- [ ] Bio text via `translations.ts`
- [ ] Both CTAs scroll to correct anchors

### AI Skin Advisor
- [ ] Concern dropdown: skin diseases + nails listed before aesthetic concerns
- [ ] API key from env
- [ ] Both tabs: dropdown + selfie upload
- [ ] JSON parsed safely with fallback
- [ ] Results in active `lang`
- [ ] Privacy disclaimer before upload
- [ ] "Book treatment" CTA → `#reservation-form`

### Reservation Form
- [ ] `id="reservation-form"` present
- [ ] Service dropdown includes all 9 services — skin/nails first
- [ ] Required field validation `#4f93cb` error border
- [ ] Bilingual success state

### Map
- [ ] Custom style + SVG marker at `35.1932, -6.1534`
- [ ] InfoWindow bilingual
- [ ] Arabic address includes ground floor + Café Karion landmark
- [ ] Mobile deep link to native maps app

### Footer & WhatsApp
- [ ] WhatsApp mirrors in RTL
- [ ] Pulse ring every 3s
- [ ] Hidden 1.5s on load
- [ ] `#25D366` NOWHERE else in design
- [ ] `aria-label` bilingual
- [ ] Footer shows full Arabic address (ground floor + Café Karion)

---

*— End of Part 3 — Global System Rules, Output & Checklist —*

*Prompt engineered for Dr. Karim CHERTI — Dermatologue · Larache, Maroc*
*Part 3 · v4.1 UPDATED — Added: services.skin + services.nails keys, pillar order rule, dropdown order rule*
