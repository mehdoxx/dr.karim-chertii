"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import Image from 'next/image';

export default function Pillars() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const pillars = [
        {
            title: `${t.services.skin} & ${t.services.nails}`,
            description: t.details.skin,
            image: '/3.Peau-Cuir-chevelu.png'
        },
        {
            title: `${t.services.aesthetic}, ${t.services.botox} & PRP`,
            description: t.details.aesthetic,
            image: '/5.Cosmétologie-Peeling.png'
        },
        {
            title: t.services.laser,
            description: t.details.laser,
            image: '/9.Laser Épilation-Vasculaire.png'
        }
    ];

    return (
        <section id="services" className="w-full py-24 bg-[var(--color-section-light)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {pillars.map((pillar, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="bg-[var(--color-surface)] border-t-4 border-[#4f93cb] rounded-xl shadow-lg overflow-hidden rtl:text-right"
                        >
                            <div className="h-48 relative bg-[#0d1f2d]/5 overflow-hidden">
                                <Image src={pillar.image} alt={pillar.title} fill className="object-cover transition-transform duration-700 hover:scale-105" />
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">{pillar.title}</h3>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm">{pillar.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
