# Role & Global Context
You are an expert Next.js/React developer finalizing the front-end UI for Dr. Karim Cherti's premium dermatology practice website. 

## Global Technical Requirements
- Framework: Next.js/React
- UI Library: `shadcn/ui`
- Styling: Tailwind CSS
- Language: TypeScript
- Note: Implement native smooth scrolling behavior (`scroll-behavior: smooth` in CSS and programmatic scrolling for anchor tags) for all navigation links and CTA buttons.

---

# Final Integration & Polish Checklist

## TASK 1: Advanced Form Styling & Features (Reservation Section)
**Goal:** Upgrade the reservation form UI for a premium, high-conversion experience.
- **NOM COMPLET:** Keep as is.
- **TÉLÉPHONE:** Replace the basic text input with an international phone number input component (e.g., install and use `react-phone-number-input` integrated with shadcn). It must default to the Moroccan flag (+212). If the user changes the country code, the flag must update dynamically.
- **MOTIF:** Upgrade the Shadcn `Select` component. Add aesthetic hover states, smooth dropdown transitions, and refined padding/typography for the medical options to make it look premium.
- **CALENDAR (New):** Integrate a shadcn `DatePicker` (using the `Calendar` component and `date-fns`) into the form layout so the user can easily select their desired reservation date.

## TASK 2: Interactive Contact & Location Cards
**Goal:** Enhance the three information cards located next to the Google Map with interactivity and RTL support.
- **Global Card Styling:** Add a gorgeous, premium hover effect to all cards (e.g., `hover:-translate-y-1 hover:shadow-xl transition-all duration-300`).
- **Location Card:** Remove the explicit "Google Maps" text link. Instead, wrap the *entire card* in an `<a>` tag with `target="_blank"`, linking directly to the Google Maps directions for the clinic address.
- **Contact Card (Phone):** Wrap the entire card in an `<a>` tag using the `tel:` protocol so clicking it directly opens the user's phone dialer. 
  - **RTL Fix:** In Arabic mode, ensure the number format reads correctly from left-to-right structurally: `05 39 91 58 71 :الهاتف`.
  - **Subtext:** Add this text directly under the phone number: `Disponible 09:00 -> 18:00`.
- **Horaires Card:** Update the text exactly to this layout:
  `• Lun -> Sam: 09:00 -> 18:00`
  `• Dim: Fermé`

## TASK 3: Google Maps Integration
**Goal:** Fix the broken Google Map iframe/component.
- Implement the working Google Map centered on the clinic's coordinates. 
- Do not hardcode the API key. Initialize the map using the environment variable: `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.

## TASK 4: Footer Customization
**Goal:** Rebuild the footer into a specific 5-column layout matching the site's aesthetic.
- **Column 1 (Branding):** Clinic Logo, short descriptive text, and exactly: `© 2026 Asme. Tous droits réservés.`
- **Columns 2 & 3 (Services):** Place a single "Services" heading above Column 2. Spread the links across both columns (do not repeat the heading in Col 3).
  - *Col 2 Links:* Maladies de la Peau, Maladies des Ongles, Maladies Transmissibles, Cosmétologie et Peeling, Chirurgie Cutanée.
  - *Col 3 Links:* PRP Visage, PRP Cheveux, Laser Médical, Injections et Botox.
- **Column 4 (Quick Links):** Create a section for smooth-scrolling page anchors:
  - `Services` (Scrolls up to the horizontal image carousel)
  - `À propos` (Scrolls up to the About the Doctor section)
  - `Temoignages` (Scrolls up to the Testimonials section)
- **Column 5 (Social Links):** Keep only Facebook, Instagram, and LinkedIn (remove Twitter completely). Ensure they open in a new tab (`target="_blank"`):
  - Facebook: `www.facebook.com`
  - Instagram: `https://www.instagram.com/karim_cherti/`
  - LinkedIn: `https://www.linkedin.com/in/cherti-karim-22119613b/`

## TASK 5: Navbar Links Update
**Goal:** Replace the current navbar links to match the footer quick links.
- **New Links:** `Services`, `À propos`, `Temoignages`.
- **Action:** Clicking these must smoothly scroll down to their respective sections on the page.

## TASK 6: Global CTA Button Routing
**Goal:** Ensure every main Call-To-Action button is wired up correctly.
- Target the "Prendre Rendez-vous" (or Arabic equivalent) CTA buttons located in the **Navbar**, the **Hero Section**, and the **Mobile Navigation Menu**.
- **Action:** Clicking any of these must trigger a smooth scroll directly to the Reservation Form section.

## TASK 7: Global Quality Assurance (Localization, Theming, & Responsiveness)
**Goal:** Ensure the entire application is flawless across all languages, themes, and screen sizes.
- **Perfect Localization (RTL/LTR):** Verify all Arabic translations are highly accurate, natural, and contextually perfect for a premium medical clinic. The global layout must dynamically switch to Right-to-Left (RTL) when Arabic is active, and Left-to-Right (LTR) for French. Ensure all flexbox/grid alignments, margins, paddings, and icons (like arrows) correctly mirror the active reading direction.
- **Theme Consistency (Dark/Light):** Guarantee that all components, text colors, backgrounds, and "antigravity" glassmorphism effects look pristine in both Dark and Light modes. Ensure perfect contrast ratios so no text becomes unreadable when toggling themes.
- **Flawless Responsive Design:** The entire UI must adapt perfectly across all viewports: Desktop, Tablet, and Mobile. Pay special attention to the mobile view—ensure touch targets (like the Skin Advisor FAB, mobile nav menu, and form inputs) are adequately sized, spacing is tight but breathable, and no elements overflow the screen horizontally.