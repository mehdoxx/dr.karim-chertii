'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Image from 'next/image';

interface FooterLink {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export function FooterSection() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Data for columns
    const services1 = [
        { title: t.services.skin, href: '#services' },
        { title: t.services.nails, href: '#services' },
        { title: t.services.mst, href: '#services' },
        { title: t.services.surgery, href: '#services' },
    ];

    const services2 = [
        { title: t.services.aesthetic, href: '#services' },
        { title: t.services.botox, href: '#services' },
        { title: t.services.prp_face, href: '#services' },
        { title: t.services.prp_hair, href: '#services' },
        { title: t.services.laser, href: '#services' },
    ];

    const quickLinks = [
        { title: t.nav.home, href: '/' },
        { title: t.nav.about, href: '#doctor-profile' },
        { title: t.nav.testimonials, href: '#testimonials' },
        { title: t.nav.contact, href: '#contact' },
    ];

    const socials = [
        { title: 'Facebook', href: '#', icon: Facebook },
        { title: 'Instagram', href: '#', icon: Instagram },
        { title: 'LinkedIn', href: '#', icon: Linkedin },
    ];

    const copyrightText = lang === 'ar'
        ? `© ${new Date().getFullYear()} عيادة د. كريم الشرتي. جميع الحقوق محفوظة.`
        : `© ${new Date().getFullYear()} Cabinet Dr. Karim Cherti. All rights reserved.`;

    const designCredit = lang === 'ar' ? 'تصميم متميز' : 'Design Premium';
    const locationCredit = lang === 'ar' ? 'باريس • العرائش' : 'Paris • Larache';

    return (
        <footer
            id="contact"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
            className="md:rounded-t-[4rem] relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-[#4f93cb]/10 bg-[radial-gradient(40%_160px_at_50%_0%,rgba(79,147,203,0.1),transparent)] px-6 py-16 lg:py-24 pb-28 md:pb-16 overflow-hidden mt-12 bg-[var(--color-canvas-bg)]"
        >
            {/* Top Glow Line */}
            <div className="bg-[#4f93cb]/30 absolute top-0 right-1/2 left-1/2 h-px w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md" />

            {/* Custom Flex Layout Container */}
            <div className="flex flex-col md:flex-row w-full gap-12 md:gap-0">

                {/* Branding Column (Col 1): 40% Width */}
                <AnimatedContainer className="md:w-2/5 space-y-6 flex flex-col items-start">
                    <a href="/" onClick={scrollToTop} className="flex items-center gap-3 group transition-transform hover:scale-105">
                        <div className="relative w-14 h-14 shrink-0">
                            <Image src="/Logo.png" alt="Dr. Karim Cherti" fill className="object-contain" />
                        </div>
                        <div className="flex flex-col text-start">
                            <span className="text-xl font-bold text-[var(--color-text-primary)] leading-tight">
                                {lang === 'ar' ? "د.كريم الشرتي" : "Dr. Karim CHERTI"}
                            </span>
                            <span className="text-[10px] font-bold text-[#4f93cb] uppercase tracking-widest opacity-70">
                                {lang === 'fr' ? 'Dermatologue' : 'طبيب أمراض جلدية'}
                            </span>
                        </div>
                    </a>
                    <p className="text-[var(--color-text-secondary)] text-sm max-w-xs leading-relaxed text-start">
                        {lang === 'fr'
                            ? 'Expertise dermatologique et esthétique de pointe à Larache. Formé à Paris, au service de votre peau.'
                            : 'خبرة متقدمة في طب الأمراض الجلدية والتجميل في العرائش. خريج باريس، في خدمة بشرتكم.'}
                    </p>
                    <div className="flex flex-col gap-3 items-start">
                        <div className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[#4f93cb] transition-colors text-start">
                            <MapPin size={14} className="text-[#4f93cb] shrink-0 mt-0.5" />
                            <span>{t.contact.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[#4f93cb] transition-colors text-start">
                            <Phone size={14} className="text-[#4f93cb] shrink-0" />
                            <span dir="ltr">{t.contact.phone.replace('Tél : ', '')}</span>
                        </div>
                    </div>
                </AnimatedContainer>

                {/* Link Cluster Wrapper: 60% Width */}
                <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-x-8 md:gap-y-0 items-start">

                    {/* Column 2: Services 1 */}
                    <AnimatedContainer delay={0.2} className="flex flex-col items-start">
                        <h3 className="text-xs font-bold text-[#4f93cb] uppercase tracking-widest mb-6 text-start">
                            {lang === 'fr' ? 'Services' : 'الخدمات'}
                        </h3>
                        <ul className="text-[var(--color-text-secondary)] space-y-4 text-sm flex flex-col items-start">
                            {services1.map((link) => (
                                <li key={link.title}>
                                    <a href={link.href} className="hover:text-[#4f93cb] transition-all duration-300 text-start">
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </AnimatedContainer>

                    {/* Column 3: Services 2 */}
                    <AnimatedContainer delay={0.3} className="flex flex-col items-start">
                        <h3 className="text-xs font-bold text-[#4f93cb] uppercase tracking-widest mb-6 text-start">
                            {lang === 'fr' ? 'Esthétique' : 'العيادة'}
                        </h3>
                        <ul className="text-[var(--color-text-secondary)] space-y-4 text-sm flex flex-col items-start">
                            {services2.map((link) => (
                                <li key={link.title}>
                                    <a href={link.href} className="hover:text-[#4f93cb] transition-all duration-300 text-start">
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </AnimatedContainer>

                    {/* Column 4: Quick Links */}
                    <AnimatedContainer delay={0.4} className="flex flex-col items-start">
                        <h3 className="text-xs font-bold text-[#4f93cb] uppercase tracking-widest mb-6 text-start">
                            {lang === 'fr' ? 'Liens Rapides' : 'روابط سريعة'}
                        </h3>
                        <ul className="text-[var(--color-text-secondary)] space-y-4 text-sm flex flex-col items-start">
                            {quickLinks.map((link) => (
                                <li key={link.title}>
                                    <a href={link.href} className="hover:text-[#4f93cb] transition-all duration-300 text-start">
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </AnimatedContainer>

                    {/* Column 5: Socials */}
                    <AnimatedContainer delay={0.5} className="flex flex-col items-start">
                        <h3 className="text-xs font-bold text-[#4f93cb] uppercase tracking-widest mb-6 text-start">
                            {lang === 'fr' ? 'Social' : 'تواصل معنا'}
                        </h3>
                        <ul className="text-[var(--color-text-secondary)] space-y-4 text-sm flex flex-col items-start">
                            {socials.map((link) => (
                                <li key={link.title}>
                                    <a
                                        href={link.href}
                                        className="hover:text-[#4f93cb] inline-flex items-center gap-2 transition-all duration-300 group text-start"
                                    >
                                        {link.icon && <link.icon className="size-4 opacity-70 group-hover:opacity-100" />}
                                        {link.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </AnimatedContainer>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <AnimatedContainer delay={0.6} className="w-full pt-12 mt-12 border-t border-[#4f93cb]/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[var(--color-text-secondary)] text-xs opacity-70 text-start">
                    {copyrightText}
                </p>
                <div className="flex gap-6 text-[10px] font-bold text-[#4f93cb] uppercase tracking-widest opacity-50">
                    <span className="cursor-default">{designCredit}</span>
                    <span className="cursor-default">{locationCredit}</span>
                </div>
            </AnimatedContainer>
        </footer>
    );
}

type ViewAnimationProps = {
    delay?: number;
    className?: ComponentProps<typeof motion.div>['className'];
    children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            initial={{ filter: 'blur(4px)', translateY: 12, opacity: 0 }}
            whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
