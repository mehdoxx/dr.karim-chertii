"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Award, Library, ShieldCheck } from 'lucide-react';

export default function CredentialsBar() {
    const { lang } = useLanguage();
    const t = translations[lang].credentials;

    const credentials = [
        { text: t.paris, icon: <Award className="w-8 h-8 text-[#4f93cb]" /> },
        { text: t.saintLouis, icon: <ShieldCheck className="w-8 h-8 text-[#4f93cb]" /> },
        { text: t.marrakech, icon: <Library className="w-8 h-8 text-[#4f93cb]" /> },
    ];

    return (
        <section className="w-full bg-[#185783] py-12 border-y border-[#4f93cb]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 rtl:gap-reverse"
                >
                    {credentials.map((cred, idx) => (
                        <motion.div
                            key={idx}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="flex flex-col items-center justify-center text-center px-4"
                        >
                            <div className="mb-4 bg-white/10 p-4 rounded-full">
                                {cred.icon}
                            </div>
                            <p className="text-white/90 font-medium tracking-wide">
                                {cred.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
