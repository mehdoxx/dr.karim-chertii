"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { CalendarCheck, CheckCircle2, MapPin, Phone, Clock, ExternalLink, Loader2, Calendar as CalendarIcon } from 'lucide-react';
import GoogleMapEmbed from './GoogleMapEmbed';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr, arDZ } from "date-fns/locale";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';
import { CalendarWithTimePresets } from './ui/calendar-with-time-presets';
import { ShimmerButton } from './ui/shimmer-button';

export default function BookingSection() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const contactT = t.contact;

    const serviceKeys: (keyof typeof t.services)[] = [
        'skin', 'nails', 'mst', 'surgery', 'aesthetic', 'botox', 'prp_face', 'prp_hair', 'laser'
    ];

    const [formData, setFormData] = useState({ name: '', phone: '', service: '', date: undefined as Date | undefined, time: null as string | null });
    const [errors, setErrors] = useState({ name: false, phone: false, service: false, date: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            name: !formData.name.trim(),
            phone: !formData.phone || formData.phone.length < 5,
            service: !formData.service,
            date: !formData.date || !formData.time
        };
        setErrors(newErrors);
        if (Object.values(newErrors).some(err => err)) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
            setFormData({ name: '', phone: '', service: '', date: undefined, time: null });
        }, 1500);
    };

    const dateLocale = lang === 'fr' ? fr : arDZ;

    return (
        <section id="reservation" className="w-full py-24 bg-[var(--color-canvas-bg)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
                        {lang === 'fr' ? 'Prendre Rendez-vous' : 'حجز موعد'}
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
                        {lang === 'fr'
                            ? 'Réservez votre consultation en quelques clics ou visitez notre cabinet à Larache.'
                            : 'احجز موعدك في بضع ممرات أو تفضل بزيارة عيادتنا في العرائش.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* Reservation Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-5 order-2 xl:order-1"
                    >
                        <div
                            id="booking-form"
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                            className="bg-[var(--color-surface)] rounded-3xl shadow-2xl border border-[#4f93cb]/10 p-8 md:p-10 sticky top-24"
                        >
                            <div className="flex items-center gap-3 w-full justify-start mb-8">
                                <div className="p-3 bg-[#4f93cb]/10 rounded-2xl">
                                    <CalendarCheck className="w-6 h-6 text-[#4f93cb]" />
                                </div>
                                <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                                    {lang === 'fr' ? 'Demande de RDV' : 'طلب موعد'}
                                </h3>
                            </div>

                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        className="py-12 text-center"
                                    >
                                        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                                            {lang === 'fr' ? 'Demande Envoyée !' : 'تم إرسال الطلب!'}
                                        </h3>
                                        <p className="text-[var(--color-text-secondary)]">
                                            {lang === 'fr' ? 'Nous vous contacterons très prochainement.' : 'سنتصل بك قريبًا لتأكيد الموعد.'}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                        <div className="space-y-2 rtl:text-right">
                                            <label className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider px-1 block">
                                                {lang === 'fr' ? 'Nom complet' : 'الاسم الكامل'}
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Jean Dupont"
                                                value={formData.name}
                                                onChange={e => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: false }); }}
                                                className={`w-full rounded-2xl h-12 bg-[var(--color-panel)] border transition-all px-4 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-transparent focus:ring-[#4f93cb]/30'}`}
                                            />
                                        </div>

                                        <div className="space-y-2 rtl:text-right">
                                            <label className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider px-1 block">
                                                {lang === 'fr' ? 'Téléphone' : 'رقم الهاتف'}
                                            </label>
                                            <PhoneInput
                                                international
                                                defaultCountry="MA"
                                                value={formData.phone}
                                                onChange={val => { setFormData({ ...formData, phone: val || '' }); setErrors({ ...errors, phone: false }); }}
                                                className={cn(
                                                    "flex h-12 w-full bg-[var(--color-panel)] border rounded-2xl px-3 py-2 text-sm transition-all focus-within:ring-2 focus-within:ring-[#4f93cb]/30",
                                                    errors.phone ? "border-red-400" : "border-transparent"
                                                )}
                                            />
                                        </div>

                                        <div className="space-y-2 rtl:text-right">
                                            <label className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider px-1 block">
                                                {lang === 'fr' ? 'Motif' : 'سبب الاستشارة'}
                                            </label>
                                            <Select
                                                value={formData.service}
                                                onValueChange={val => { setFormData({ ...formData, service: val }); setErrors({ ...errors, service: false }); }}
                                            >
                                                <SelectTrigger className={cn(
                                                    "w-full bg-[var(--color-panel)] border rounded-2xl h-12 px-4 transition-all hover:bg-[var(--color-panel)]/80 focus:ring-2 focus:ring-[#4f93cb]/30",
                                                    errors.service ? "border-red-400" : "border-transparent"
                                                )}>
                                                    <SelectValue placeholder={lang === 'fr' ? '-- Choisissez --' : '-- اختر --'} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[var(--color-surface)] border-[#4f93cb]/20 rounded-xl overflow-hidden shadow-xl">
                                                    {serviceKeys.map((key) => (
                                                        <SelectItem key={key} value={t.services[key]} className="py-2.5 hover:bg-[#4f93cb]/10 cursor-pointer">
                                                            {t.services[key]}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="relative z-10 space-y-4 rtl:text-right">
                                            <label className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider px-1 block">
                                                {lang === 'fr' ? 'Date & Heure souhaitées' : 'التاريخ والوقت المفضل'}
                                            </label>
                                            <CalendarWithTimePresets
                                                selectedDate={formData.date}
                                                selectedTime={formData.time}
                                                onSelect={(date, time) => {
                                                    setFormData({ ...formData, date, time });
                                                    setErrors({ ...errors, date: !date });
                                                }}
                                            />
                                            {errors.date && (
                                                <p className="text-[10px] text-red-500 px-1 mt-1 font-medium">
                                                    {lang === 'fr' ? 'Veuillez choisir une date et une heure.' : 'يرجى اختيار التاريخ والوقت.'}
                                                </p>
                                            )}
                                        </div>

                                        <div className="relative z-0 mt-6">
                                            <ShimmerButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full h-14 rounded-full font-semibold text-lg transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                                                background="#185783"
                                                shimmerColor="#ffffff"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 size={20} className="animate-spin" />
                                                ) : (
                                                    lang === 'fr' ? 'Prendre Rendez-vous' : 'أحجز موعداً'
                                                )}
                                            </ShimmerButton>
                                        </div>

                                        <p className="text-[10px] text-[var(--color-text-secondary)] text-center mt-4">
                                            {lang === 'fr'
                                                ? 'Confirmation rapide garantie sous 2 heures par notre assistante.'
                                                : 'تأكيد سريع مضمون في غضون ساعتين من قبل مساعدتنا.'}
                                        </p>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Map & Info Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-7 order-1 xl:order-2 space-y-8"
                    >
                        {/* Map Card */}
                        <div className="bg-[var(--color-surface)] rounded-3xl shadow-xl border border-[#4f93cb]/10 p-2 h-[450px] overflow-hidden group">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <GoogleMapEmbed />
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=35.1932,-6.1534"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#185783] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg hover:bg-white transition-all transform hover:scale-105"
                                >
                                    {contactT.map} <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* Location Details Grid */}
                        <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                            {/* Address Card */}
                            <motion.a
                                href="https://www.google.com/maps/search/?api=1&query=35.1932,-6.1534"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -5 }}
                                className="bg-[var(--color-panel)] p-6 rounded-2xl border border-[#4f93cb]/10 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-[#4f93cb]/30 transition-all duration-300 rtl:text-right group"
                            >
                                <div className="p-2.5 bg-[#4f93cb]/10 rounded-xl w-fit group-hover:bg-[#4f93cb]/20 transition-colors">
                                    <MapPin size={24} className="text-[#4f93cb]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider mb-2">{lang === 'fr' ? 'Adresse' : 'العنوان'}</h4>
                                    <p className="text-sm font-medium leading-relaxed">{contactT.address}</p>
                                </div>
                                <div className="text-[#4f93cb] opacity-0 group-hover:opacity-100 transition-opacity self-end">
                                    <ExternalLink size={16} />
                                </div>
                            </motion.a>

                            {/* Contact Card */}
                            <motion.a
                                href="tel:+212522251010"
                                whileHover={{ y: -5 }}
                                className="bg-[var(--color-panel)] p-6 rounded-2xl border border-[#4f93cb]/10 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:border-[#4f93cb]/30 transition-all duration-300 rtl:text-right group"
                            >
                                <div className="p-2.5 bg-[#4f93cb]/10 rounded-xl w-fit group-hover:bg-[#4f93cb]/20 transition-colors">
                                    <Phone size={24} className="text-[#4f93cb]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider mb-2">{lang === 'fr' ? 'Contact' : 'تواصل'}</h4>
                                    <div className="flex items-center gap-2 text-[15px] font-bold text-[var(--color-text-primary)] text-start">
                                        <span>{lang === 'fr' ? 'Tél :' : 'الهاتف:'}</span>
                                        <span dir="ltr">05 39 91 58 72</span>
                                    </div>
                                    <p className="text-[11px] text-[#4f93cb] mt-1 font-bold">{contactT.whatsapp_response}</p>
                                    <p className="text-[10px] text-[var(--color-text-secondary)] mt-2 opacity-60">{lang === 'fr' ? 'Disponible 09h-18h' : 'متاح 09:00-18:00'}</p>
                                </div>
                                <div className="text-[#4f93cb] opacity-0 group-hover:opacity-100 transition-opacity self-end">
                                    <Phone size={16} />
                                </div>
                            </motion.a>

                            {/* Horaires Card */}
                            <motion.div
                                whileHover={{ y: -5 }}
                                className="bg-[var(--color-panel)] p-6 rounded-2xl border border-[#4f93cb]/10 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-300 rtl:text-right"
                            >
                                <div className="p-2.5 bg-[#4f93cb]/10 rounded-xl w-fit">
                                    <Clock size={24} className="text-[#4f93cb]" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xs font-bold text-[#4f93cb] uppercase tracking-wider mb-2">{lang === 'fr' ? 'Horaires' : 'ساعات العمل'}</h4>
                                    <div className="flex flex-col gap-2 mt-2 text-start">
                                        <p className="text-sm font-medium leading-relaxed whitespace-nowrap">
                                            {lang === 'fr' ? 'Lun – Sam : 09h00 – 18h00' : 'الإثنين – السبت: 09:00 – 18:00'}
                                        </p>
                                        <p className="text-sm font-medium leading-relaxed whitespace-nowrap">
                                            {lang === 'fr' ? 'Dim : Fermé' : 'الأحد: مغلق'}
                                        </p>
                                    </div>
                                    <div className="inline-block px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold rounded-lg border border-green-500/20 mt-4">
                                        {contactT.urgences}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style jsx global>{`
                .PhoneInput {
                    display: flex;
                    align-items: center;
                }
                .PhoneInputInput {
                    background: transparent;
                    border: none;
                    flex: 1;
                    padding-left: 10px;
                    outline: none;
                    color: var(--color-text-primary);
                }
                .PhoneInputCountry {
                    display: flex;
                    align-items: center;
                    padding-right: 10px;
                    border-right: 1px solid rgba(79, 147, 203, 0.2);
                }
                [dir="rtl"] .PhoneInputCountry {
                    padding-left: 10px;
                    padding-right: 0;
                    border-left: 1px solid rgba(79, 147, 203, 0.2);
                    border-right: none;
                }
            `}</style>
        </section>
    );
}
