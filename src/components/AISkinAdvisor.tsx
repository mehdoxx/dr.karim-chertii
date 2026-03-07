"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { analyzeSkin, SkinAnalysisResult } from '@/lib/geminiSkinAdvisor';
import { Sparkles, Upload, Loader2, AlertCircle } from 'lucide-react';

export default function AISkinAdvisor() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const [mode, setMode] = useState<'text' | 'image'>('text');
    const [inputValue, setInputValue] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<SkinAnalysisResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Ordered strictly: skin, nails, then aesthetic/others.
    const serviceKeys: (keyof typeof t.services)[] = [
        'skin', 'nails', 'mst', 'surgery', 'aesthetic', 'botox', 'prp_face', 'prp_hair', 'laser'
    ];

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

    const handleAnalyze = async () => {
        if (mode === 'text' && !inputValue) return;
        if (mode === 'image' && !imagePreview) return;

        setLoading(true);
        setResult(null);

        try {
            const promptContext = mode === 'text'
                ? `I am experiencing concerns related to: ${inputValue}`
                : `Please analyze this selfie/image of my skin and provide your professional opinion.`;

            const analysis: SkinAnalysisResult = await analyzeSkin(
                promptContext, mode === 'image' ? imagePreview : null, lang);
            setResult(analysis);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = mode === 'text' ? !!inputValue : !!imagePreview;

    return (
        <section id="skin-advisor" className="w-full py-24 bg-[#0d1f2d] text-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center justify-center p-3 bg-[#4f93cb]/10 rounded-full mb-4">
                        <Sparkles className="w-8 h-8 text-[#4f93cb]" />
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        {t.nav.skinAdvisor}
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-white/60 max-w-2xl mx-auto text-lg">
                        {lang === 'fr' ? "Analysez votre peau en quelques secondes grâce à notre IA." : "قم بتحليل بشرتك في ثوانٍ باستخدام الذكاء الاصطناعي."}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Input Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="bg-[#111827] p-8 rounded-2xl border border-[#4f93cb]/20 shadow-2xl relative overflow-hidden rtl:text-right"
                    >
                        {/* Tab Toggles */}
                        <div className="flex space-x-2 rtl:space-x-reverse mb-8 p-1 bg-[#1A2235] rounded-lg">
                            <button onClick={() => setMode('text')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'text' ? 'bg-[#4f93cb] text-white shadow' : 'text-white/50 hover:text-white'}`}>
                                {lang === 'fr' ? 'Sélectionner le besoin' : 'اختر حاجتك'}
                            </button>
                            <button onClick={() => setMode('image')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'image' ? 'bg-[#4f93cb] text-white shadow' : 'text-white/50 hover:text-white'}`}>
                                {lang === 'fr' ? 'Analyser un selfie' : 'تحليل صورة'}
                            </button>
                        </div>

                        {/* Mode Views */}
                        <AnimatePresence mode="wait">
                            {mode === 'text' ? (
                                <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                                    <label className="block text-sm font-medium text-white/80">
                                        {lang === 'fr' ? 'Quel est votre principal motif de consultation ?' : 'ما هو السبب الرئيسي لاستشارتك؟'}
                                    </label>
                                    <select
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full bg-[#1A2235] border border-[#4f93cb]/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#4f93cb] rtl:text-right"
                                    >
                                        <option value="" disabled>{lang === 'fr' ? '-- Choisissez une option --' : '-- اختر خيار --'}</option>
                                        {serviceKeys.map((key) => (
                                            <option key={key} value={t.services[key]}>
                                                {t.services[key]}
                                            </option>
                                        ))}
                                    </select>
                                </motion.div>
                            ) : (
                                <motion.div key="image" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-center">
                                    <p className="text-sm text-yellow-500/90 flex items-center justify-center rtl:flex-row-reverse mb-4">
                                        <AlertCircle className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                                        {lang === 'fr' ? "Vos photos ne sont pas sauvegardées." : "لا يتم حفظ صورك."}
                                    </p>

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-[#4f93cb]/30 rounded-xl p-8 hover:bg-[#4f93cb]/5 transition-colors cursor-pointer group flex flex-col items-center justify-center bg-[#1A2235]"
                                    >
                                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                                        {imagePreview ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={imagePreview} alt="Preview" className="h-32 object-contain rounded-lg shadow" />
                                        ) : (
                                            <>
                                                <Upload className="w-10 h-10 text-white/30 group-hover:text-[#4f93cb] transition-colors mb-3" />
                                                <span className="text-sm text-white/50">{lang === 'fr' ? 'Cliquez pour sélectionner une photo' : 'انقر لاختيار صورة'}</span>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={isFormValid ? { scale: 1.03 } : {}}
                            whileTap={isFormValid ? { scale: 0.95 } : {}}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            onClick={handleAnalyze}
                            disabled={!isFormValid || loading}
                            className={`w-full mt-8 py-3 rounded-full font-bold shadow-lg flex justify-center items-center transition-all ${!isFormValid ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-[#4f93cb] text-white hover:bg-[#185783]'}`}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (lang === 'fr' ? 'Lancer l\'analyse' : 'بدء التحليل')}
                        </motion.button>
                    </motion.div>

                    {/* Results Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="bg-[#111827] p-8 rounded-2xl border border-white/5 shadow-2xl relative min-h-[400px] flex flex-col justify-center rtl:text-right"
                    >
                        <AnimatePresence mode="wait">
                            {!result && !loading && (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-white/40">
                                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p>{lang === 'fr' ? "Les résultats s'afficheront ici." : "ستظهر النتائج هنا."}</p>
                                </motion.div>
                            )}

                            {loading && (
                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-[#4f93cb]">
                                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                                    <p className="animate-pulse">{lang === 'fr' ? "Analyse en cours..." : "جاري التحليل..."}</p>
                                </motion.div>
                            )}

                            {result && !loading && (
                                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                        <h4 className="text-xs font-bold tracking-widest text-[#4f93cb] uppercase mb-1">{lang === 'fr' ? 'Condition Probable' : 'الحالة المحتملة'}</h4>
                                        <p className="text-2xl font-semibold text-white">{result.condition}</p>
                                    </motion.div>

                                    {mode === 'image' && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                            <h4 className="text-xs font-bold tracking-widest text-[#4f93cb] uppercase mb-1">{lang === 'fr' ? 'Niveau de certitude' : 'مستوى اليقين'}</h4>
                                            <span className="inline-block px-3 py-1 bg-white/10 text-white rounded text-sm">{result.confidence}</span>
                                        </motion.div>
                                    )}

                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                                        <h4 className="text-xs font-bold tracking-widest text-[#4f93cb] uppercase mb-2">{lang === 'fr' ? 'Recommandations' : 'التوصيات'}</h4>
                                        <ul className="space-y-2">
                                            {result.routine.map((step, i) => (
                                                <li key={i} className="flex items-start text-sm text-white/80">
                                                    <span className="text-[#4f93cb] mr-2 rtl:ml-2 rtl:mr-0">•</span> {step}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>

                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4 border-t border-white/10">
                                        <h4 className="text-xs font-bold tracking-widest text-[#4f93cb] uppercase mb-2">{lang === 'fr' ? 'Traitement' : 'العلاج'}</h4>
                                        <p className="text-white/90 font-medium mb-6">{result.recommendedTreatment}</p>

                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                            onClick={() => document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' })}
                                            className="bg-[#4f93cb] text-white px-6 py-2 rounded-full font-semibold text-sm shadow hover:bg-[#185783] w-full"
                                        >
                                            {t.nav.bookCta}
                                        </motion.button>
                                    </motion.div>

                                    <p className="text-xs text-white/40 italic mt-4 text-center">
                                        {result.disclaimer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
