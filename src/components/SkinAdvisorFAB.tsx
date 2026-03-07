'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Sparkles, X, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SkinAdvisorFAB() {
    const { lang } = useLanguage();
    const t = translations[lang];
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Chat state
    const [inputValue, setInputValue] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSend = () => {
        if (!inputValue && !imagePreview) return;
        setLoading(true);
        // This is a shell for Gemini integration
        setTimeout(() => {
            setLoading(false);
            setIsOpen(false);
            // Scroll to reservation after "analysis" in a real scenario
            document.getElementById('reservation-form')?.scrollIntoView({ behavior: 'smooth' });
        }, 2000);
    };

    return (
        <div className="fixed bottom-6 right-6 rtl:left-6 rtl:right-auto z-50 flex flex-col items-end rtl:items-start print:hidden">

            {/* Popup UI Shell */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: lang === 'ar' ? 'bottom left' : 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] md:w-[400px] bg-[var(--color-surface)] rounded-2xl shadow-2xl border border-[#4f93cb]/20 overflow-hidden flex flex-col"
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                        {/* Header */}
                        <div className="bg-[#0d1f2d] p-4 text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-[#4f93cb]/20 rounded-lg">
                                    <Sparkles className="w-5 h-5 text-[#4f93cb]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">AI Skin Advisor</h4>
                                    <p className="text-[10px] text-white/60">
                                        {lang === 'fr' ? 'Expertise IA de Dr. Cherti' : 'خبرة الذكاء الاصطناعي للدكتور الشرتي'}
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat / Upload Area */}
                        <div className="p-5 min-h-[300px] flex flex-col bg-[var(--color-canvas-bg)]/50">
                            <div className="flex-1 space-y-4">
                                <div className="bg-[#4f93cb]/10 border border-[#4f93cb]/20 p-3 rounded-2xl rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none text-sm text-[var(--color-text-primary)]">
                                    {lang === 'fr'
                                        ? "Bonjour ! Je suis l'assistant IA du Dr. Cherti. Décrivez votre souci de peau ou téléchargez une photo pour une analyse instantanée."
                                        : "مرحباً! أنا مساعد الذكاء الاصطناعي للدكتور الشرتي. صف مشكلتك الجلدية أو ارفع صورة للحصول على تحليل فوري."}
                                </div>

                                {imagePreview && (
                                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-[#4f93cb]/30 mx-auto">
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setImagePreview(null)}
                                            className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Warning */}
                            <p className="text-[10px] text-[#4f93cb]/60 italic mt-4 text-center">
                                {lang === 'fr'
                                    ? "Outil informatif uniquement. Ne remplace pas une consultation médicale."
                                    : "أداة إعلامية فقط. لا تغني عن الاستشارة الطبية."}
                            </p>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-[var(--color-surface)] border-t border-[#4f93cb]/10">
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-xl border-[#4f93cb]/20 hover:bg-[#4f93cb]/10 text-[#4f93cb]"
                                    title={lang === 'fr' ? 'Télécharger une image' : 'تحميل صورة'}
                                >
                                    <ImageIcon size={20} />
                                </Button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <div className="flex-1 relative">
                                    <Input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={lang === 'fr' ? "Décrivez votre souci..." : "صف مشكلتك..."}
                                        className="h-10 rounded-xl bg-[var(--color-panel)] border-transparent focus-visible:ring-[#4f93cb]/30"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    />
                                </div>
                                <Button
                                    onClick={handleSend}
                                    disabled={loading || (!inputValue && !imagePreview)}
                                    size="icon"
                                    className="rounded-xl bg-[#4f93cb] hover:bg-[#185783] text-white shadow-lg shadow-[#4f93cb]/20 transition-all shrink-0"
                                >
                                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="rtl:rotate-180" />}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB Button */}
            <div className="relative group">
                {/* Glow aura */}
                <div className="absolute inset-0 bg-[#4f93cb] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative z-10 transition-all duration-300 ${isOpen ? 'bg-[#0d1f2d] text-white rotate-90' : 'bg-gradient-to-tr from-[#185783] to-[#4f93cb] text-white'}`}
                >
                    {isOpen ? <X size={28} /> : <Sparkles size={28} className="animate-[sparkle_2s_ease-in-out_infinite]" />}
                </motion.button>
            </div>

            <style jsx global>{`
                @keyframes sparkle {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    50% { transform: scale(1.1) rotate(10deg); opacity: 0.8; }
                }
            `}</style>
        </div>
    );
}
