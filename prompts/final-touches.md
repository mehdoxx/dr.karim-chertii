# Role & Global Context
You are an expert Next.js/React developer finalizing the front-end UI for Dr. Karim Cherti's dermatology practice website. 

## Global Technical Requirements
- Framework: Next.js/React
- UI Library: `shadcn/ui`
- Styling: Tailwind CSS
- Language: TypeScript
- Note: If `framer-motion` or `lucide-react` are required for these tasks, please install them.

---

# Final Integration Checklist

## TASK 1: Fix Testimonials RTL (Arabic Mode) Breakage
**Goal:** The horizontal scrolling marquee breaks in Arabic (`dir="rtl"`) mode. Please debug and fix the CSS or Framer Motion logic.
- **RTL Animation Logic:** Standard `translateX(-100%)` keyframes push content the wrong way in RTL. Invert the translation values (e.g., `translateX(100%)`) or use logical CSS properties so the infinite scroll loops seamlessly without overlapping.
- **Card & Text Alignment:** Ensure the flexbox container respects the RTL direction so gaps are maintained. Verify that all text inside the cards (quote, name, title) is properly right-aligned in Arabic mode.
- **Bi-Directional Scroll:** Ensure the two rows still scroll in opposite directions, perfectly adapted for the RTL layout.

## TASK 2: Skin Advisor FAB & Popup UI (Replacing Old Section)
**Goal:** Remove the static skin advisor section and replace it with a dynamic, floating AI chat interface.
- **Remove Old Section:** Delete the current inline Skin Advisor section from the page.
- **Floating Action Button (FAB):** Replace the existing green WhatsApp icon with a new "Sparkles/Stars" icon representing the AI Skin Advisor. 
  - **Positioning:** Pin it to the bottom-right corner in French mode (LTR) and the bottom-left corner in Arabic mode (RTL).
- **Popup UI (Gemini Integration Shell):** Clicking the FAB should open a modern, premium chat popup. Build the UI shell for a powerful "AI Skin Doctor". It must include:
  - A chat message area.
  - An image upload component (drag-and-drop or click to upload) for patients to upload skin concerns.
  - A text input field and submit button.

## TASK 3: Airbnb-Style Booking Form & Location Map
**Goal:** Overhaul the reservation section to combine the booking form and the clinic's location map in a premium, side-by-side layout (similar to an Airbnb property listing).
- **Layout:** Create a responsive grid/flex layout. On desktop, show the reservation form on one half and a Google Map iframe (or placeholder) on the other half. On mobile, stack them.
- **Styling:** Ensure the form fields utilize `shadcn/ui` components (Inputs, Selects, Buttons) and match the clean, antigravity aesthetic of the site.

## TASK 4: Footer Overhaul
**Goal:** Implement a new, highly aesthetic footer using the provided component as a base, heavily customized to fit our specific layout requirements.
**NPM Dependencies:** `motion`, `lucide-react`
**Target Path:** `/components/ui/footer-section.tsx`

**Custom Footer Structure Required:**
- **Branding:** Left side or top should contain the Logo image and "Dr. Karim CHERTI".
- **Copyright:** Directly underneath the branding, display: `© 2026 Asme. All rights reserved.`
- **Grid Layout (4 Columns Total):**
  - **Columns 1, 2, & 3:** Distribute 9 distinct "Services" links evenly across these three columns (3 links per column).
  - **Column 4:** "Social Links" containing LinkedIn, Instagram, Facebook, and X (Twitter) using `lucide-react` icons.

**Base Component Code to Adapt:**
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
footer-section.tsx
'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, FrameIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Pricing', href: '#pricing' },
			{ title: 'Testimonials', href: '#testimonials' },
			{ title: 'Integration', href: '/' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'FAQs', href: '/faqs' },
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Services', href: '/terms' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Blog', href: '/blog' },
			{ title: 'Changelog', href: '/changelog' },
			{ title: 'Brand', href: '/brand' },
			{ title: 'Help', href: '/help' },
		],
	},
	{
		label: 'Social Links',
		links: [
			{ title: 'Facebook', href: '#', icon: FacebookIcon },
			{ title: 'Instagram', href: '#', icon: InstagramIcon },
			{ title: 'Youtube', href: '#', icon: YoutubeIcon },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<FrameIcon className="size-8" />
					<p className="text-muted-foreground mt-8 text-sm md:mt-0">
						© {new Date().getFullYear()} Asme. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs">{section.label}</h3>
								<ul className="text-muted-foreground mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-foreground inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};

demo.tsx
import { Footer } from '@/components/ui/footer-section';

export default function DemoOne() {
	return (
		<div className="relative flex min-h-svh flex-col">
			<div className="min-h-screen flex items-center justify-center">
				<h1 className='font-mono text-2xl font-bold'>Scrool Down!</h1>
			</div>
			<Footer />
		</div>
	);
}

```

Install NPM dependencies:
```bash
motion, lucide-react
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them

---
**Execution:** Please proceed step-by-step through Tasks 1 through 4, providing the corrected code for the RTL testimonials, the new Skin Advisor FAB/Popup UI, the Form/Map section, and the heavily customized Footer component.