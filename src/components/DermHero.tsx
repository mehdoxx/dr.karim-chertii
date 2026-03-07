"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { PulseFitHero, ProgramCard } from '@/components/ui/pulse-fit-hero';

export default function DermHero() {
    const { lang } = useLanguage();
    const t = translations[lang];

    const programs: ProgramCard[] = [
        {
            image: "/1.Dermatologue-Portrait.png",
            category: lang === 'fr' ? 'DERMATOLOGIE' : 'أمراض جلدية',
            title: t.services.skin,
        },
        {
            image: "/2.Vénérologue-Consultation.png",
            category: lang === 'fr' ? 'VÉNÉROLOGIE' : 'أمراض تناسلية',
            title: t.services.mst,
        },
        {
            image: "/3.Peau-Cuir-chevelu.png",
            category: lang === 'fr' ? 'AFFECTIONS' : 'أمراض',
            title: t.services.nails,
        },
        {
            image: "/4.Chirurgie-Cutanée.png",
            category: lang === 'fr' ? 'CHIRURGIE' : 'جراحة',
            title: t.services.surgery,
        },
        {
            image: "/5.Cosmétologie-Peeling.png",
            category: lang === 'fr' ? 'COSMÉTOLOGIE' : 'تجميل',
            title: t.services.aesthetic,
        },
        {
            image: "/6.Botox-Injectables.png",
            category: lang === 'fr' ? 'INJECTIONS' : 'حقن',
            title: t.services.botox,
        },
        {
            image: "/7.PRP-Visage.png",
            category: lang === 'fr' ? 'ANTI-ÂGE' : 'مكافحة الشيخوخة',
            title: t.services.prp_face,
        },
        {
            image: "/8.PRP-Cheveux.png",
            category: lang === 'fr' ? 'CAPILLAIRE' : 'شعر',
            title: t.services.prp_hair,
        },
        {
            image: "/9.Laser Épilation-Vasculaire.png",
            category: lang === 'fr' ? 'LASER' : 'ليزر',
            title: t.services.laser,
        }
    ];

    const handlePrimaryClick = () => {
        document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSecondaryClick = () => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div id="hero" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <PulseFitHero
                hideHeader={true}
                title={t.hero.title}
                subtitle={t.hero.subtitle}
                primaryAction={{
                    label: t.nav.bookCta,
                    onClick: handlePrimaryClick
                }}
                secondaryAction={{
                    label: lang === 'fr' ? "Skin Advisor" : "مستشار البشرة",
                    onClick: handleSecondaryClick
                }}
                socialProof={{
                    avatars: [
                        "/avatars/1.png",
                        "/avatars/2.png",
                        "/avatars/3.png",
                        "/avatars/4.png"
                    ],
                    text: lang === 'fr' ? "Plus de 2000 patients nous font confiance" : "أكثر من 2000 مريض يثقون بنا"
                }}
                programs={programs}
            />
        </div>
    )
}

