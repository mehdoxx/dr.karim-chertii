"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';

interface Testimonial {
    name: string;
    text: string;
    role?: string;
    avatar: string;
}

const testimonialsFr: Testimonial[] = [
    { name: "S. Amrani", role: "Patiente", avatar: "/avatars/avatar1.jpg", text: "Le Dr. Cherti a réglé mon problème d'acné sévère en quelques mois. Son approche est très rassurante et professionnelle." },
    { name: "K. Bennani", role: "Patient", avatar: "/avatars/avatar2.jpg", text: "Meilleur dermatologue de Larache. J'ai fait mes séances de laser chez lui et le résultat est impeccable, avec un suivi sérieux." },
    { name: "M. Tazi", role: "Patiente", avatar: "/avatars/avatar3.jpg", text: "Pour mon traitement PRP, le docteur a pris le temps de tout m'expliquer. Résultat visible dès la deuxième séance. Je recommande!" },
    { name: "A. El Fassi", role: "Patient", avatar: "/avatars/avatar4.jpg", text: "Un médecin à l'écoute et très compétent. Il m'a traité pour un eczéma chronique avec une patience remarquable." },
    { name: "R. Kadiri", role: "Patiente", avatar: "/avatars/avatar5.jpg", text: "J'ai consulté le Dr. Cherti pour des taches pigmentaires. Le traitement au laser a donné des résultats exceptionnels." },
    { name: "F. Bouazza", role: "Patient", avatar: "/avatars/avatar6.jpg", text: "Après des années de psoriasis, le Dr. Cherti m'a proposé un protocole efficace. Ma peau n'a jamais été aussi belle." },
    { name: "H. Chraibi", role: "Patiente", avatar: "/avatars/avatar7.jpg", text: "Excellente expérience pour ma consultation dermatologique. Le cabinet est moderne et le docteur est très professionnel." },
    { name: "N. Moussaoui", role: "Patient", avatar: "/avatars/avatar8.jpg", text: "Le Dr. Cherti combine expertise médicale et approche humaine. Je le recommande vivement pour tout problème de peau." },
];

const testimonialsAr: Testimonial[] = [
    { name: "س. العمراني", role: "مريضة", avatar: "/avatars/avatar1.jpg", text: "عالج الدكتور الشرتي مشكلة حب الشباب الشديدة لدي في بضعة أشهر. نهجه الطبي احترافي ومطمئن جداً." },
    { name: "ك. بناني", role: "مريض", avatar: "/avatars/avatar2.jpg", text: "أفضل طبيب أمراض جلدية في العرائش. قمت بجلسات الليزر لديه والنتيجة مثالية، مع متابعة دقيقة ومستمرة." },
    { name: "م. التازي", role: "مريضة", avatar: "/avatars/avatar3.jpg", text: "بالنسبة لعلاج PRP، أخذ الدكتور الوقت الكافي ليشرح لي كل شيء. نتائج ملحوظة من الجلسة الثانية. أنصح به بشدة." },
    { name: "أ. الفاسي", role: "مريض", avatar: "/avatars/avatar4.jpg", text: "طبيب يستمع لمرضاه وذو كفاءة عالية. عالج الأكزيما المزمنة لدي بصبر ملحوظ." },
    { name: "ر. القادري", role: "مريضة", avatar: "/avatars/avatar5.jpg", text: "استشرت الدكتور الشرتي لعلاج بقع التصبغ. علاج الليزر أعطى نتائج استثنائية." },
    { name: "ف. بوعزة", role: "مريض", avatar: "/avatars/avatar6.jpg", text: "بعد سنوات من الصدفية، اقترح الدكتور الشرتي بروتوكولاً فعالاً. بشرتي لم تكن أجمل من أي وقت مضى." },
    { name: "ه. الشرايبي", role: "مريضة", avatar: "/avatars/avatar7.jpg", text: "تجربة ممتازة في الاستشارة الجلدية. العيادة حديثة والطبيب محترف جداً." },
    { name: "ن. الموسوي", role: "مريض", avatar: "/avatars/avatar8.jpg", text: "يجمع الدكتور الشرتي بين الخبرة الطبية والنهج الإنساني. أنصح به بشدة لأي مشكلة جلدية." },
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className="group relative flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px]">
            {/* Glow effect behind card */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#4f93cb]/30 via-[#7fade9]/20 to-[#185783]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            {/* Card */}
            <div className="relative h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-xl p-6 shadow-lg shadow-[#4f93cb]/5 transition-all duration-500 group-hover:shadow-[#4f93cb]/20 group-hover:border-[#4f93cb]/40 group-hover:bg-[var(--color-surface)]/80 text-start">
                {/* Decorative quote */}
                <div className="absolute top-4 end-4 opacity-[0.07] text-start">
                    <Quote className="w-12 h-12 text-[#4f93cb] scale-x-[-1] rtl:scale-x-1" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 text-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#4f93cb] text-[#4f93cb]" />
                    ))}
                </div>

                {/* Testimonial text */}
                <p className="text-[var(--color-text-primary)] text-sm md:text-base leading-relaxed mb-5 line-clamp-4 text-start">
                    &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mt-auto text-start">
                    {/* Avatar photo */}
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#4f93cb]/20 shadow-md shadow-[#4f93cb]/10 flex-shrink-0">
                        <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                        />
                    </div>
                    <div className="text-start">
                        <p className="text-[var(--color-text-primary)] font-semibold text-sm text-start">
                            {testimonial.name}
                        </p>
                        {testimonial.role && (
                            <p className="text-[var(--color-text-secondary)] text-xs text-start">
                                {testimonial.role}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MarqueeRow({ testimonials, reverse = false, speed = 45 }: { testimonials: Testimonial[]; reverse?: boolean; speed?: number }) {
    const { lang } = useLanguage();
    const isRtl = lang === 'ar';

    // Double the display items to ensure track width > viewport even on QHD/4K screens
    const displayItems = [...testimonials, ...testimonials];

    // Choose animation based on direction and row reversal
    const animationClass = isRtl
        ? (reverse ? "animate-marquee" : "animate-marquee-rtl")
        : (reverse ? "animate-marquee-rtl" : "animate-marquee");

    // Dynamic flex direction based on animation to ensure duplicate follows correctly
    // Moving LEFT (animate-marquee): [Original] [Duplicate] -> flex-row (LTR) | flex-row-reverse (RTL)
    // Moving RIGHT (animate-marquee-rtl): [Duplicate] [Original] -> flex-row-reverse (LTR) | flex-row (RTL)
    const flexDir = isRtl
        ? (animationClass === "animate-marquee-rtl" ? "flex-row" : "flex-row-reverse")
        : (animationClass === "animate-marquee" ? "flex-row" : "flex-row-reverse");

    return (
        <div
            className={`flex overflow-hidden w-full flex-nowrap gap-6 ${flexDir}`}
            style={{ "--gap": "1.5rem" } as React.CSSProperties}
        >
            <div className={`flex shrink-0 flex-nowrap gap-6 ${animationClass}`} style={{ "--duration": `${speed}s` } as React.CSSProperties}>
                {displayItems.map((testimonial, idx) => (
                    <TestimonialCard key={`${testimonial.name}-${idx}`} testimonial={testimonial} />
                ))}
            </div>
            <div
                aria-hidden="true"
                className={`flex shrink-0 flex-nowrap gap-6 ${animationClass}`}
                style={{ "--duration": `${speed}s` } as React.CSSProperties}
            >
                {displayItems.map((testimonial, idx) => (
                    <TestimonialCard key={`${testimonial.name}-${idx}-dup`} testimonial={testimonial} />
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    const { lang } = useLanguage();

    const activeTestimonials = lang === 'ar' ? testimonialsAr : testimonialsFr;

    // Split testimonials into two rows
    const midpoint = Math.ceil(activeTestimonials.length / 2);
    const row1 = activeTestimonials.slice(0, midpoint);
    const row2 = activeTestimonials.slice(midpoint);

    const sectionTitle = lang === 'ar' ? 'شهادات المرضى' : 'Témoignages';
    const sectionSubtitle = lang === 'ar'
        ? 'تجارب حقيقية من مرضانا الكرام'
        : 'Découvrez les expériences de nos patients';

    return (
        <section id="testimonials" className="relative w-full py-20 md:py-28 bg-[var(--color-canvas-bg)] overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-[#4f93cb]/[0.03] blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#185783]/[0.04] blur-3xl" />
            </div>

            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center mb-14 md:mb-20 px-4"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4f93cb]/10 border border-[#4f93cb]/20 text-[#4f93cb] text-xs font-medium uppercase tracking-widest mb-5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {lang === 'ar' ? 'آراء المرضى' : 'Avis Patients'}
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                    {sectionTitle}
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-lg mx-auto">
                    {sectionSubtitle}
                </p>
                {/* Decorative accent line */}
                <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-[#4f93cb] to-[#7fade9]" />
            </motion.div>

            {/* Marquee Container — pause both rows on hover */}
            <div className="marquee-container relative z-10 space-y-6">
                {/* Row 1 — LTR: Left, RTL: Right */}
                <MarqueeRow testimonials={row1} speed={50} />

                {/* Row 2 — LTR: Right, RTL: Left */}
                <MarqueeRow testimonials={row2} reverse speed={55} />
            </div>

            {/* Gradient edge masks */}
            <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[var(--color-canvas-bg)] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[var(--color-canvas-bg)] to-transparent z-20 pointer-events-none" />
        </section>
    );
}
