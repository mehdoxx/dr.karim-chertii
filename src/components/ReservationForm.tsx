"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { CalendarCheck, CheckCircle2, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
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
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { fr, arDZ } from "date-fns/locale";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { cn } from '@/lib/utils';

export default function ReservationForm() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const serviceKeys: (keyof typeof t.services)[] = [
        'skin', 'nails', 'mst', 'surgery', 'aesthetic', 'botox', 'prp_face', 'prp_hair', 'laser'
    ];

    const [formData, setFormData] = useState({ name: '', phone: '', service: '', date: undefined as Date | undefined });
    const [errors, setErrors] = useState({ name: false, phone: false, service: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: !formData.name.trim(),
            phone: !formData.phone || formData.phone.length < 5,
            service: !formData.service
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(err => err)) return;

        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 5000);
            setFormData({ name: '', phone: '', service: '', date: undefined });
        }, 1500);
    };

    const dateLocale = lang === 'fr' ? fr : arDZ;

    return (
        <section id="reservation-form" className="w-full py-24 bg-[var(--color-section-light)]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="bg-[var(--color-surface)] rounded-3xl shadow-2xl overflow-hidden border border-[#4f93cb]/10"
                >
                    <div className="flex flex-col md:flex-row rtl:flex-row-reverse">
                        {/* Left Column - Content */}
                        <div className="w-full md:w-5/12 bg-[#0d1f2d] text-white p-12 flex flex-col justify-between rtl:text-right">
                            <div>
                                <CalendarCheck className="w-12 h-12 text-[#4f93cb] mb-6" />
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.nav.bookCta}</h2>
                                <p className="text-white/70 leading-relaxed mb-8">
                                    {lang === 'fr' ? 'Remplissez le formulaire ci-dessous ou ouvrez directement WhatsApp. Notre assistante confirmera votre RDV sous 2h.' : 'املأ النموذج أدناه أو افتح واتساب مباشرة. ستقوم مساعدتنا بتأكيد موعدك خلال ساعتين.'}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm text-white/50 uppercase tracking-wider mb-1">{lang === 'fr' ? 'Adresse' : 'العنوان'}</h4>
                                    <p className="font-medium text-sm md:text-base">{t.contact.address}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm text-white/50 uppercase tracking-wider mb-1">{lang === 'fr' ? 'Contact' : 'تواصل'}</h4>
                                    <p className="font-medium" dir="ltr">{t.contact.phone}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="w-full md:w-7/12 p-8 md:p-12 relative rtl:text-right">
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[var(--color-surface)]"
                                    >
                                        <CheckCircle2 className="w-20 h-20 text-green-500 mb-6" />
                                        <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                                            {lang === 'fr' ? 'Demande Envoyée !' : 'تم إرسال الطلب!'}
                                        </h3>
                                        <p className="text-[var(--color-text-secondary)]">
                                            {lang === 'fr' ? 'Nous vous contacterons très prochainement pour confirmer la date.' : 'سنتصل بك قريبًا لتأكيد الموعد.'}
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit} className="space-y-6"
                                        noValidate
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rtl:gap-reverse">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                                                    {lang === 'fr' ? 'Nom complet *' : '* الاسم الكامل'}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: false }); }}
                                                    className={`w-full bg-[var(--color-panel)] border rounded-xl px-4 py-3 text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[#4f93cb]/30 transition-all ${errors.name ? 'border-red-400' : 'border-transparent'}`}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                                                    {lang === 'fr' ? 'Téléphone *' : '* رقم الهاتف'}
                                                </label>
                                                <PhoneInput
                                                    international
                                                    defaultCountry="MA"
                                                    value={formData.phone}
                                                    onChange={val => { setFormData({ ...formData, phone: val || '' }); setErrors({ ...errors, phone: false }); }}
                                                    className={cn(
                                                        "flex h-12 w-full bg-[var(--color-panel)] border rounded-xl px-3 py-2 text-sm transition-all focus-within:ring-2 focus-within:ring-[#4f93cb]/30",
                                                        errors.phone ? "border-red-400" : "border-transparent"
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                                                {lang === 'fr' ? 'Motif de consultation *' : '* سبب الاستشارة'}
                                            </label>
                                            <Select
                                                value={formData.service}
                                                onValueChange={val => { setFormData({ ...formData, service: val }); setErrors({ ...errors, service: false }); }}
                                            >
                                                <SelectTrigger className={cn(
                                                    "w-full bg-[var(--color-panel)] border rounded-xl h-12 px-4 transition-all hover:bg-[var(--color-panel)]/80",
                                                    errors.service ? "border-red-400" : "border-transparent"
                                                )}>
                                                    <SelectValue placeholder={lang === 'fr' ? '-- Choisissez une option --' : '-- اختر خيار --'} />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[var(--color-surface)] border-[#4f93cb]/20 rounded-xl overflow-hidden shadow-xl">
                                                    {serviceKeys.map((key) => (
                                                        <SelectItem key={key} value={t.services[key]} className="py-3 hover:bg-[#4f93cb]/5 focus:bg-[#4f93cb]/10 cursor-pointer">
                                                            {t.services[key]}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-[var(--color-text-secondary)]">
                                                {lang === 'fr' ? 'Date souhaitée (Optionnel)' : 'التاريخ المفضل (اختياري)'}
                                            </label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full h-12 px-4 justify-start text-left font-normal bg-[var(--color-panel)] border-transparent rounded-xl hover:bg-[var(--color-panel)]/80 transition-all",
                                                            !formData.date && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4 text-[#4f93cb]" />
                                                        {formData.date ? format(formData.date, "PPP", { locale: dateLocale }) : (lang === 'fr' ? "Sélectionner une date" : "اختر تاريخًا")}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 rounded-2xl border-[#4f93cb]/20 shadow-2xl" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.date}
                                                        onSelect={val => setFormData({ ...formData, date: val })}
                                                        initialFocus
                                                        locale={dateLocale}
                                                        className="bg-[var(--color-surface)] rounded-2xl"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            type="submit" disabled={isSubmitting}
                                            className="w-full bg-[#4f93cb] text-white font-bold rounded-full py-4 shadow-lg hover:bg-[#185783] transition-all mt-4 flex items-center justify-center gap-2 group"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <ChevronDown className="animate-spin h-5 w-5" />
                                                    {lang === 'fr' ? 'Envoi...' : 'جارِ الإرسال...'}
                                                </span>
                                            ) : (
                                                <>
                                                    {t.nav.bookCta}
                                                </>
                                            )}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
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
