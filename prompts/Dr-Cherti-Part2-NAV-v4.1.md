# Dr. Karim Cherti — Premium Bilingual Website
# PART 2 — PAGE ARCHITECTURE
# Section: [NAV] Fixed Navigation Bar

---

> **INSTRUCTIONS FOR AI AGENT:**
> This is Part 2 of 3. Part 1 (Foundation) must be read first.
> Build sections in the exact order listed. Do not skip ahead.

---

## 🗺️ PAGE ORDER — COMPLETE ARCHITECTURE

```
[NAV]     Fixed Navigation Bar                ← BUILD THIS FIRST
[S0]      Hero — Scroll-Linked Canvas
[S1]      9 Core Services Pillars
    [S1a]  Dermatologist
    [S1b]  Venerologist
    [S1c]  Skin and Scalp
    [S1d]  Skin Surgery
    [S1e]  Cosmetology and Peeling
    [S1f]  Botox & Injectables
    [S1g]  PRP Face
    [S1h]  PRP Hair
    [S1i]  Laser Hair Removal and Vasculare
[S2]      Doctor Profile Card
[S3]      Credentials Trust Bar
[S4]      Patient Testimonials
[S5]      AI Skin Advisor (Gemini)
[S6]      Reservation CTA Form
[S7]      Clinic Location Map (Airbnb-style)
[FOOTER]  Full-width Footer + WhatsApp Floating Button
```

---

## [NAV] — FIXED NAVIGATION BAR

**Component file:** `components/Navbar.tsx`

---

### 1. Core Behavior

- **Position:** `fixed` · `top-0` · `left-0` · `w-full` · `z-50`
- **Sticky logic:** Navbar is always visible — it never scrolls away
- **Scroll-aware state:** Two distinct visual states driven by `scrollY`

| State | Trigger | Background | Blur | Border | Shadow |
|-------|---------|-----------|------|--------|--------|
| **Top** | `scrollY === 0` | `transparent` | none | none | none |
| **Scrolled** | `scrollY > 20px` | `rgba(13, 31, 45, 0.96)` | `backdrop-blur-md` | `border-b border-[#4f93cb]/20` | `shadow-lg shadow-[#0d1f2d]/50` |

- Transition: `transition: background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease`
- On mount: `y: -100 → 0` · `opacity: 0 → 1` · spring `stiffness: 120, damping: 20, delay: 0.2s`

---

### 2. Layout Structure

```
[LOGO]  ————————————  [NAV LINKS]  ————————————  [CONTROLS]
 left                    center                     right
```

- Full layout on **desktop** (`md:` breakpoint and above)
- **Mobile:** Logo left · Hamburger icon right · Nav links hidden in drawer

---

### 3. Logo

- **Text FR:** `"Dr. K. Cherti"` · **Text AR:** `"د. ك. الشرتي"`
- **Font:** `Plus Jakarta Sans` · `font-bold` · `text-xl` · color `#ffffff`
- **Accent:** `border-l-[3px] border-[#4f93cb] pl-3`
- **Hover:** `opacity: 1 → 0.8` · `duration-200`
- **Click:** smooth scroll to `#hero`

---

### 4. Navigation Links (Desktop)

| # | FR Label | AR Label | Scroll Target |
|---|----------|----------|---------------|
| 1 | `À propos` | `من نحن` | `#doctor-profile` |
| 2 | `Services` | `خدماتنا` | `#services` |
| 3 | `Skin Advisor ✨` | `مستشار الجلد ✨` | `#skin-advisor` |
| 4 | `Contact` | `تواصل` | `#contact` |

**Services dropdown hint (tooltip on hover over "Services" link):**
- FR preview: `"Peau · Ongles · Laser · Botox · PRP · Peeling · MST · Chirurgie"`
- AR preview: `"جلد · أظافر · ليزر · بوتوكس · PRP · تقشير · أمراض تناسلية · جراحة"`
- Style: `text-xs` · `text-white/50` · appears below link on hover · not a full dropdown menu

**Link styling:**
- Default: `text-white/70` · `text-sm` · `font-medium` · `tracking-wide`
- Hover: `text-white` · underline `scaleX: 0 → 1` · `2px #4f93cb`
- Active: underline stays visible · `text-white`
- Active detection: `IntersectionObserver` · highlights when section `>40%` in viewport

---

### 5. Control Buttons (Right Side)

Three controls left-to-right in LTR / right-to-left in RTL:

#### 5a. Language Toggle

- Style: pill · `border border-[#4f93cb]` · `rounded-full` · `px-4 py-1.5` · `text-sm`
- When `lang === "fr"` → show `"🌐 العربية"` · When `lang === "ar"` → show `"🌐 Français"`
- Click sequence:
  1. Scale down `1 → 0.92` · label fades `opacity:0, y:-8`
  2. Language switches in context
  3. New label fades in `opacity:1, y:0`
  4. Scale back `0.92 → 1` · spring `stiffness:300, damping:20`
  5. Page layout shifts direction `transition: all 0.35s ease`

#### 5b. Dark / Light Mode Toggle

- Style: icon-only pill · `w-9 h-9` · `border border-white/20`
- Light mode: `🌙` · Dark mode: `☀️`
- Click sequence:
  1. Icon spins out `rotate: 0 → 180deg, opacity:0`
  2. `data-theme="dark"` toggled on `<html>`
  3. New icon spins in `rotate: -180 → 0deg, opacity:1`
  4. All colors transition via CSS `0.3s ease`
  5. Saved to `localStorage` key `"cherti-theme"`

#### 5c. Primary CTA — "Rendez-vous"

- FR: `"Prendre Rendez-vous"` · AR: `"احجز موعداً"`
- Style: `bg-[#4f93cb]` · `text-white` · `font-semibold` · `rounded-full` · `px-5 py-2`
- Hover: `bg-[#185783]` · `box-shadow: 0 0 20px rgba(79,147,203,0.4)`
- Click sequence:
  1. Scale `1 → 0.94` · flash `#4f93cb → #7fade9` for `80ms`
  2. Scale back `0.94 → 1.02 → 1.0` · bouncy spring
  3. Ripple `#ffffff/20` expands from click point
  4. Smooth scroll to `#reservation-form`

---

### 6. Mobile Navigation (Hamburger)

- Hamburger SVG `pathLength` animation → `✕` on open · `stiffness:200, damping:20`
- Drawer: `y: -100% → 0` · `backdrop-blur-xl` · `rounded-b-3xl` · `shadow-2xl`

**Drawer contents (top to bottom):**
1. Nav links — `text-lg` · `py-4 px-6` · stagger `0.06s`
2. Services list — compact pill row · FR: `"Peau · Ongles · MST · Laser · Botox · PRP · Peeling · Chirurgie"` · AR: `"جلد · أظافر · أمراض تناسلية · ليزر · بوتوكس · PRP · تقشير · جراحة"` · `text-xs text-white/40`
3. Divider `border-t border-[#4f93cb]/20`
4. Language toggle — full width
5. Dark/Light toggle — full width
6. CTA button — full width · `py-4`

- Each link tap: `scale:0.97` · close drawer `y:0 → -100%` · `duration:250ms`
- Backdrop: `fixed inset-0 bg-black/40 z-40` · tap to close

---

### 7. RTL Behavior (Arabic Mode)

- Logo → right side
- Controls group → left side
- Hamburger icon → left side on mobile
- Underline animation slides from right
- CTA arrow flips: `←` instead of `→`
- All spacing via Tailwind logical properties (`ms-` `me-` `ps-` `pe-`)

---

### 8. Accessibility

| Element | FR aria-label | AR aria-label |
|---------|--------------|--------------|
| `<nav>` | `"Navigation principale"` | `"القائمة الرئيسية"` |
| CTA button | `"Prendre rendez-vous avec Dr. Cherti"` | `"احجز موعدك مع الدكتور الشرتي"` |
| Language toggle | `"Changer la langue en arabe"` | `"تغيير اللغة إلى الفرنسية"` |
| Theme toggle | `"Activer le mode sombre/clair"` (dynamic) | `"تفعيل الوضع الداكن/الفاتح"` (dynamic) |

- `Tab` order: Logo → Links → Language → Theme → CTA
- `focus-visible`: `ring-2 ring-[#4f93cb] ring-offset-2 ring-offset-[#0d1f2d]`

---

### 9. Performance Constraints

- Scroll listener: `{ passive: true }` · debounced `10ms`
- Drawer: `AnimatePresence` — unmounts from DOM when closed
- Navbar height: `64px` fixed · `<body>` has `pt-16` — no layout shift on mount
- Logo font preloaded in `app/layout.tsx` via `next/font`

---

*— NAV section complete —*
*Next: [S0] Hero — Scroll-Linked Canvas Animation*

*Prompt engineered for Dr. Karim CHERTI — Dermatologue · Larache, Maroc*
*Part 2 · v4.1 UPDATED — Services preview added to nav (Peau · Ongles now first)*
