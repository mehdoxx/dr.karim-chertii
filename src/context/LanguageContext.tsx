"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'fr' | 'ar';

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Language>('fr');

    useEffect(() => {
        // Check local storage or default to fr
        const saved = localStorage.getItem('cherti-lang') as Language;
        if (saved && (saved === 'fr' || saved === 'ar')) {
            setLang(saved);
            document.documentElement.lang = saved;
            document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
        } else {
            document.documentElement.lang = 'fr';
            document.documentElement.dir = 'ltr';
        }
    }, []);

    const toggleLang = () => {
        const nextLang = lang === 'fr' ? 'ar' : 'fr';
        setLang(nextLang);
        localStorage.setItem('cherti-lang', nextLang);
        document.documentElement.lang = nextLang;
        document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';

        // The font family toggle based on lang is handled in layout.tsx via CSS variables
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
