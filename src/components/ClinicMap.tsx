"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import GoogleMapEmbed from './GoogleMapEmbed';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

export default function ClinicMap() {
    const { lang } = useLanguage();
    const t = translations[lang].contact;

    return (
        <section id="contact" className="w-full py-24 bg-[var(--color-canvas-bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-[var(--color-surface)] rounded-3xl shadow-xl overflow-hidden border border-[#4f93cb]/10"
                >
                    <div className="flex flex-col lg:flex-row rtl:flex-row-reverse h-full">

                        {/* Left Column - Location Info */}
                        <div className="w-full lg:w-4/12 p-10 lg:p-12 flex flex-col justify-center bg-[var(--color-surface)] rtl:text-right border-b lg:border-b-0 lg:border-r border-[#4f93cb]/10 rtl:border-l rtl:border-r-0">
                            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">{t.clinic}</h2>

                            <div className="space-y-8">
                                <div className="flex items-start rtl:flex-row-reverse">
                                    <MapPin className="w-6 h-6 text-[#4f93cb] mt-1 flex-shrink-0" />
                                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                                        <h4 className="text-sm font-bold tracking-wider text-[var(--color-text-secondary)] uppercase mb-2">{lang === 'fr' ? 'Adresse' : 'العنوان'}</h4>
                                        <p className="text-[var(--color-text-primary)] font-medium leading-relaxed">{t.address}</p>
                                        <a
                                            href="https://maps.apple.com/?ll=35.1932,-6.1534"
                                            className="inline-flex items-center mt-3 text-sm text-[#4f93cb] hover:text-[#185783] transition-colors"
                                            target="_blank" rel="noopener noreferrer"
                                        >
                                            {lang === 'fr' ? "Ouvrir dans l'application Maps" : "افتح في تطبيق الخرائط"}
                                            <ExternalLink className="w-3 h-3 ml-2 rtl:mr-2 rtl:ml-0" />
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start rtl:flex-row-reverse">
                                    <Phone className="w-6 h-6 text-[#4f93cb] mt-1 flex-shrink-0" />
                                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                                        <h4 className="text-sm font-bold tracking-wider text-[var(--color-text-secondary)] uppercase mb-2">{lang === 'fr' ? 'Téléphone' : 'الهاتف'}</h4>
                                        <p className="text-[var(--color-text-primary)] font-medium" dir="ltr">{t.phone.replace('Tél :', '').replace('الهاتف:', '').trim()}</p>
                                    </div>
                                </div>

                                <div className="flex items-start rtl:flex-row-reverse">
                                    <Clock className="w-6 h-6 text-[#4f93cb] mt-1 flex-shrink-0" />
                                    <div className="ml-4 rtl:mr-4 rtl:ml-0">
                                        <h4 className="text-sm font-bold tracking-wider text-[var(--color-text-secondary)] uppercase mb-2">{lang === 'fr' ? 'Horaires' : 'ساعات العمل'}</h4>
                                        <p className="text-[var(--color-text-primary)] font-medium">{t.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Map */}
                        <div className="w-full lg:w-8/12 p-4 md:p-8 bg-[#f5f8fa] dark:bg-[#0d1f2d]">
                            <GoogleMapEmbed />
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
}
