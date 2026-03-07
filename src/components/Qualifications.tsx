"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { GraduationCap, Hospital, Award } from 'lucide-react';

export default function Qualifications() {
    const { lang } = useLanguage();
    const t = translations[lang].credentials;

    const credentials = [
        {
            icon: GraduationCap,
            title: lang === 'fr' ? 'Formation Parisienne' : 'تكوين باريسي',
            text: t.paris,
            gradient: 'from-blue-500/20 to-cyan-500/20',
            borderColor: 'border-blue-500/30',
            iconColor: 'text-blue-400',
            glowColor: 'shadow-blue-500/10',
        },
        {
            icon: Hospital,
            title: lang === 'fr' ? 'Expérience Hospitalière' : 'خبرة استشفائية',
            text: t.saintLouis,
            gradient: 'from-indigo-500/20 to-purple-500/20',
            borderColor: 'border-indigo-500/30',
            iconColor: 'text-indigo-400',
            glowColor: 'shadow-indigo-500/10',
        },
        {
            icon: Award,
            title: lang === 'fr' ? 'Parcours Militaire' : 'مسار عسكري',
            text: t.marrakech,
            gradient: 'from-emerald-500/20 to-teal-500/20',
            borderColor: 'border-emerald-500/30',
            iconColor: 'text-emerald-400',
            glowColor: 'shadow-emerald-500/10',
        }
    ];

    const containerVariants = {
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

    const headerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.8, ease: 'easeOut' as const }
        }
    };

    return (
        <section id="qualifications" className="w-full py-24 md:py-32 bg-[var(--color-canvas-bg)] relative overflow-hidden">
            {/* Ambient glow effects */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                    className="text-center mb-16 md:mb-20"
                >
                    <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#4f93cb] mb-4">
                        {lang === 'fr' ? 'Qualifications' : 'المؤهلات'}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-text-primary)] tracking-tight leading-tight">
                        {lang === 'fr'
                            ? 'Un parcours d\'excellence'
                            : 'مسيرة تميز وخبرة'}
                    </h2>
                    <p className="mt-4 text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                        {lang === 'fr'
                            ? 'Formé à Paris, forgé par l\'expérience hospitalière internationale.'
                            : 'تكوين في باريس، خبرة استشفائية دولية.'}
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
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
