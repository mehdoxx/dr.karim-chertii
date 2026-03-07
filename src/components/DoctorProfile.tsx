"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Image from 'next/image';
import { GraduationCap, Hospital, Award } from 'lucide-react';

export default function DoctorProfile() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const creds = t.credentials;

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1, y: 0,
            transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }
        })
    };

    const imageReveal = {
        hidden: { opacity: 0, scale: 0.92, x: lang === 'ar' ? 60 : -60 },
        visible: {
            opacity: 1, scale: 1, x: 0,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const credentials = [
        {
            icon: GraduationCap,
            title: lang === 'fr' ? 'Formation Parisienne' : 'تكوين باريسي',
            text: creds.paris,
            gradient: 'from-blue-500/20 to-cyan-500/20',
            borderColor: 'border-blue-500/30',
            iconColor: 'text-blue-400',
            glowColor: 'shadow-blue-500/10',
        },
        {
            icon: Hospital,
            title: lang === 'fr' ? 'Expérience Hospitalière' : 'خبرة استشفائية',
            text: creds.saintLouis,
            gradient: 'from-indigo-500/20 to-purple-500/20',
            borderColor: 'border-indigo-500/30',
            iconColor: 'text-indigo-400',
            glowColor: 'shadow-indigo-500/10',
        },
        {
            icon: Award,
            title: lang === 'fr' ? 'Parcours Militaire' : 'مسار عسكري',
            text: creds.marrakech,
            gradient: 'from-emerald-500/20 to-teal-500/20',
            borderColor: 'border-emerald-500/30',
            iconColor: 'text-emerald-400',
            glowColor: 'shadow-emerald-500/10',
        }
    ];

    const cardContainerVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 60, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section id="doctor-profile" className="w-full py-24 md:py-32 bg-[var(--color-canvas-bg)] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#4f93cb]/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 rtl:lg:flex-row-reverse">

                    {/* Portrait with decorative frame */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={imageReveal}
                        className="w-full lg:w-5/12 relative"
                    >
                        {/* Decorative gradient border */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-[#4f93cb]/30 via-transparent to-[#185783]/20 rounded-3xl blur-sm" />

                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/Dr. Cheti's-portrait.png"
                                alt={lang === 'fr'
                                    ? "Dr. Karim Cherti — Dermatologue à Larache, Maroc"
                                    : "د. كريم الشرتي — طبيب أمراض جلدية بالعرائش، المغرب"
                                }
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Glass overlay at bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Bio content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="w-full lg:w-7/12 flex flex-col items-start rtl:items-start"
                    >

                        {/* Name */}
                        <motion.h2
                            custom={0}
                            variants={fadeUp}
                            className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
                        >
                            {t.about.title}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            custom={1}
                            variants={fadeUp}
                            className="text-lg font-medium text-[#4f93cb] mb-8"
                        >
                            {t.about.subtitle}
                        </motion.p>

                        {/* Bio paragraphs */}
                        <motion.p
                            custom={2}
                            variants={fadeUp}
                            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-5 rtl:text-right"
                        >
                            {t.about.bio1}
                        </motion.p>
                        <motion.p
                            custom={3}
                            variants={fadeUp}
                            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-5 rtl:text-right"
                        >
                            {t.about.bio2}
                        </motion.p>
                        <motion.p
                            custom={4}
                            variants={fadeUp}
                            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 rtl:text-right"
                        >
                            {t.about.bio3}
                        </motion.p>

                        {/* Tagline */}
                        <motion.div
                            custom={5}
                            variants={fadeUp}
                            className="w-full"
                        >
                            <div className="flex items-center gap-4 mb-8 rtl:flex-row-reverse">
                                <div className="h-px flex-1 bg-gradient-to-r from-[#4f93cb]/40 to-transparent rtl:bg-gradient-to-l" />
                                <p className="text-sm font-medium text-[var(--color-text-secondary)] italic">
                                    {t.about.tagline}
                                </p>
                                <div className="h-px flex-1 bg-gradient-to-l from-[#4f93cb]/40 to-transparent rtl:bg-gradient-to-r" />
                            </div>
                        </motion.div>


                    </motion.div>
                </div>

                {/* ── Qualifications Cards ── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardContainerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-20 md:mt-28"
                >
                    {credentials.map((cred, idx) => {
                        const Icon = cred.icon;
                        return (
                            <motion.div
                                key={idx}
                                variants={cardVariants}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3, ease: 'easeOut' }
                                }}
                                className={`group relative rounded-2xl border ${cred.borderColor} bg-[var(--color-surface)]/50 backdrop-blur-sm p-8 lg:p-10 transition-all duration-500 hover:shadow-2xl ${cred.glowColor} hover:border-[#4f93cb]/40 overflow-hidden`}
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${cred.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-surface)] border ${cred.borderColor} mb-6 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg ${cred.glowColor}`}>
                                        <Icon className={`w-7 h-7 ${cred.iconColor} transition-colors duration-500 group-hover:text-[#4f93cb]`} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 tracking-tight">
                                        {cred.title}
                                    </h3>

                                    {/* Divider */}
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#4f93cb] to-transparent mb-4 transition-all duration-500 group-hover:w-20" />

                                    {/* Text */}
                                    <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm rtl:text-right">
                                        {cred.text}
                                    </p>
                                </div>

                                {/* Decorative corner glow */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#4f93cb]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
