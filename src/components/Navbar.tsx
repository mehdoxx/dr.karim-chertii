"use client";

import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Navbar1 } from '@/components/blocks/shadcnblocks-com-navbar1';
import { Activity, Beaker, Zap, Scissors, HeartPulse, Droplets, Sparkles, PlusSquare } from 'lucide-react';

export default function Navbar() {
    const { lang } = useLanguage();
    const t = translations[lang];

    // Read theme without managing state since ThemeDropdown does it
    useEffect(() => {
        const savedTheme = localStorage.getItem('cherti-theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }, []);

    // Construct Shadcn Menu
    const serviceIcons = [
        <Activity className="size-5 shrink-0" key="0" />,
        <PlusSquare className="size-5 shrink-0" key="1" />,
        <HeartPulse className="size-5 shrink-0" key="2" />,
        <Scissors className="size-5 shrink-0" key="3" />,
        <Sparkles className="size-5 shrink-0" key="4" />,
        <Beaker className="size-5 shrink-0" key="5" />,
        <Droplets className="size-5 shrink-0" key="6" />,
        <Droplets className="size-5 shrink-0" key="7" />,
        <Zap className="size-5 shrink-0" key="8" />,
    ];

    const serviceKeys: (keyof typeof t.services)[] = [
        'skin', 'nails', 'mst', 'surgery', 'aesthetic', 'botox', 'prp_face', 'prp_hair', 'laser'
    ];

    const servicesSubItems = serviceKeys.map((key, i) => ({
        title: t.services[key],
        icon: serviceIcons[i],
        url: '#services',
    }));

    const menu = [
        {
            title: t.nav.home,
            url: "#hero",
        },
        {
            title: t.nav.services,
            url: '#services',
            items: servicesSubItems,
        },
        {
            title: t.nav.about,
            url: '#doctor-profile',
        },
        {
            title: t.nav.testimonials,
            url: '#testimonials',
        },
        {
            title: t.nav.contact,
            url: '#contact',
        },
    ];

    const auth = {
        login: { text: "Log in", url: "#" },
        signup: { text: t.nav.bookCta, url: "#booking-form" },
    };

    const logoUrl = "/Logo.png";

    return (
        <Navbar1
            logo={{
                url: "#hero",
                src: logoUrl,
                alt: "Dr. Karim Cherti Logo",
                title: lang === 'ar' ? "د.كريم الشرتي" : "Dr.Karim CHERTI"
            }}
            menu={menu}
            auth={auth}
            lang={lang}
        />
    );
}
