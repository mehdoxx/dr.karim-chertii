"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
    const { lang } = useLanguage();
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 1500); // Hidden 1.5s on load
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    const phoneNumber = "212539915872";
    const defaultMessage = lang === 'fr'
        ? "Bonjour Dr. Cherti, je souhaite prendre un rendez-vous."
        : "مرحباً دكتور الشرتي، أود حجز موعد.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

    return (
        <div className="fixed bottom-6 right-6 rtl:left-6 rtl:right-auto z-50 flex flex-col items-end rtl:items-start">

            {/* Expandable Chat Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
                        className="mb-4 bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-gray-100"
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                        <div className="bg-[#185783] p-4 text-white flex items-center justify-between">
                            <div>
                                <h4 className="font-bold">Dr. Karim Cherti</h4>
                                <p className="text-xs text-white/80">{lang === 'fr' ? 'Réponse type : 1 heure' : 'الرد المعتاد: ساعة واحدة'}</p>
                            </div>
                            <button onClick={() => setOpen(false)} aria-label="Close" className="text-white/80 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-opacity-5 relative">
                            <div className="absolute inset-0 bg-white/95" />
                            <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tl-none shadow-sm text-[#303030] text-sm w-11/12">
                                {lang === 'fr' ? "Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?" : "مرحباً! كيف يمكننا مساعدتك اليوم؟"}
                                <div className="text-[10px] text-black/40 text-right mt-1">Maintenant</div>
                            </div>
                        </div>
                        <div className="p-3 bg-gray-50 flex items-center justify-center">
                            <motion.a
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.95 }}
                                href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                                className="w-full bg-[var(--color-whatsapp)] text-white font-medium py-2 rounded-full text-center flex items-center justify-center text-sm shadow-md"
                            >
                                <MessageCircle size={16} className="mr-2 rtl:ml-2 rtl:mr-0" />
                                {lang === 'fr' ? "Ouvrir WhatsApp" : "افتح واتساب"}
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <div className="relative">
                {/* Pulse Effect */}
                <div className="absolute inset-0 bg-[var(--color-whatsapp)] rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75" />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    onClick={() => setOpen(!open)}
                    aria-label={lang === 'fr' ? "Discuter sur WhatsApp" : "تحدث معنا على واتساب"}
                    className="w-16 h-16 bg-[var(--color-whatsapp)] rounded-full flex items-center justify-center shadow-2xl relative z-10 text-white hover:bg-green-600 transition-colors"
                >
                    <MessageCircle size={32} />
                </motion.button>
            </div>
        </div>
    );
}
