"use client";

import React from "react";
import { Activity, HeartPulse, Microscope, Scissors, Sparkles, Syringe, Droplets, Droplet, Zap, Stethoscope, ShieldAlert, FileHeart, Fingerprint, Search, Smile } from "lucide-react";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";
import { LanguageToggleSwitch } from "@/components/ui/language-toggle-switch";
import { AnimatedThemeToggle } from "@/components/ui/animated-theme-toggle";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useScroll } from "@/components/ui/use-scroll";
import { cn } from "@/lib/utils";

interface MenuItemType {
    title: string;
    url: string;
    description?: string;
    icon?: JSX.Element;
    items?: MenuItemType[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItemType[];
    mobileExtraLinks?: {
        name: string;
        url: string;
    }[];
    auth?: {
        login: {
            text: string;
            url: string;
        };
        signup: {
            text: string;
            url: string;
        };
    };
    lang?: 'fr' | 'ar';
}

export const Navbar1 = ({
    logo = {
        url: "#hero",
        src: "/Logo.png",
        alt: "Dr. Karim Cherti Logo",
        title: "Dr.Karim CHERTI",
    },
    menu = [],
    mobileExtraLinks = [],
    auth = {
        login: { text: "Log in", url: "#" },
        signup: { text: "Sign up", url: "#" },
    },
    lang = 'fr',
}: Navbar1Props) => {

    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const scrolled = useScroll(50);

    // Smooth scroll helper
    const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        e.preventDefault();
        const id = url.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Filter services component from menu array
    const servicesMenuItem = menu.find(i => i.items);

    // Create tube light items array from non-dropdown links
    const tubeLightItems = menu.filter(i => !i.items && i.title).map(item => ({
        name: item.title,
        url: item.url,
        icon: item.icon ? item.icon.type : Activity // fallback icon
    }));

    const servicesData = [
        {
            title: "Maladies de la Peau",
            icon: Stethoscope,
            desc: "Diagnostic et traitement des maladies de la peau.",
            descAr: "تشخيص وعلاج أمراض الجلد.",
        },
        {
            title: "Maladies des Ongles",
            icon: Search,
            desc: "Soins spécialisés pour les affections des ongles.",
            descAr: "رعاية متخصصة لأمراض الأظافر.",
        },
        {
            title: "Maladies Transmissibles",
            icon: ShieldAlert,
            desc: "Dépistage et traitement des maladies transmissibles.",
            descAr: "الفحص والعلاج للأمراض التناسلية.",
        },
        {
            title: "Chirurgie Cutanée",
            icon: Scissors,
            desc: "Interventions chirurgicales pour diverses affections cutanées.",
            descAr: "تدخلات جراحية لمختلف الأمراض الجلدية.",
        },
        {
            title: "Cosmétologie et Peeling",
            icon: Sparkles,
            desc: "Soins esthétiques pour rajeunir et sublimer la peau.",
            descAr: "عناية تجميلية لتجديد شباب البشرة.",
        },
        {
            title: "Injections et Botox",
            icon: Syringe,
            desc: "Injections anti-âge pour atténuer les rides.",
            descAr: "حقن مضادة للشيخوخة لتخفيف التجاعيد.",
        },
        {
            title: "PRP Visage",
            icon: Smile,
            desc: "Régénération de la peau du visage avec la technique PRP.",
            descAr: "تجديد بشرة الوجه باستخدام تقنية PRP.",
        },
        {
            title: "PRP Cheveux",
            icon: Droplets,
            desc: "Traitement capillaire par PRP pour stimuler la repousse.",
            descAr: "علاج الشعر بتقنية PRP لتحفيز النمو.",
        },
        {
            title: "Laser Médical",
            icon: Zap,
            desc: "Épilation et traitements médicaux par technologie laser.",
            descAr: "إزالة الشعر والعلاجات الطبية بتقنية الليزر.",
        }
    ];

    return (
        <section
            className={cn(
                "fixed inset-x-0 mx-auto z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] font-sans",
                scrolled
                    ? "top-4 w-[95%] lg:w-fit px-3 sm:px-6 pr-5 lg:pr-8 py-2 bg-background/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-lg"
                    : "top-0 w-full px-4 sm:px-8 xl:px-24 py-5 bg-transparent border-transparent rounded-none shadow-none"
            )}
            dir={dir}
        >
            <div className="w-full h-full flex items-center justify-between px-2">
                <nav className="w-full hidden justify-between lg:flex items-center gap-4">
                    {/* SECTION 1: LOGO */}
                    <a
                        href={logo.url}
                        onClick={(e) => smoothScroll(e, logo.url)}
                        className="flex items-center gap-2 shrink-0 group"
                    >
                        <img src={logo.src} className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-500 group-hover:scale-105" alt={logo.alt} />
                        <span className={cn(
                            "font-semibold transition-all duration-500 text-shadow-sm tracking-tight",
                            scrolled ? "text-lg text-foreground" : "text-xl text-foreground"
                        )}>{logo.title}</span>
                    </a>

                    {/* SECTION 2: DEKSTOP MENUS */}
                    <div className="flex items-center justify-center flex-1" dir={dir}>
                        {/* Desktop Menu (Shadcn NavigationMenu) */}
                        <NavigationMenu className="hidden lg:flex shrink-0" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                            <NavigationMenuList className="space-x-1 xl:space-x-4 rtl:space-x-reverse">

                                {/* Link 0: À propos (first non-dropdown link) */}
                                {tubeLightItems.slice(0, 1).map((item, idx) => (
                                    <NavigationMenuItem key={`first-${idx}`}>
                                        <NavigationMenuLink asChild>
                                            <a
                                                href={item.url}
                                                onClick={(e) => smoothScroll(e, item.url)}
                                                className={cn(
                                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-500",
                                                    scrolled ? "text-foreground hover:bg-accent hover:text-accent-foreground" : "text-foreground/90 hover:text-foreground hover:text-shadow-md hover:-translate-y-0.5"
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                                {/* Services Dropdown */}
                                {servicesMenuItem && (
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger className={cn(
                                            "bg-transparent text-sm font-medium transition-all duration-500 hover:bg-accent px-3 xl:px-4",
                                            scrolled ? "text-foreground" : "text-foreground/90 hover:text-foreground hover:text-shadow-md"
                                        )}>{servicesMenuItem.title}</NavigationMenuTrigger>
                                        <NavigationMenuContent className="bg-background/95 dark:bg-background/95 backdrop-blur-xl p-1 pr-1.5 align-middle border border-border/30 shadow-2xl rounded-2xl">
                                            <ul className="bg-transparent grid w-[850px] grid-cols-3 gap-2 rounded-xl border-none p-2 shadow-inner max-h-[70vh] overflow-y-auto">
                                                {servicesMenuItem.items?.map((subItem, idx) => {
                                                    const Icon = servicesData[idx]?.icon || Activity;
                                                    return (
                                                        <li key={idx}>
                                                            <NavigationMenuLink
                                                                asChild
                                                                className={cn(
                                                                    "w-full flex flex-row gap-x-3 data-[active=true]:focus:bg-accent/40 data-[active=true]:hover:bg-accent/40 data-[active=true]:bg-accent/30 data-[active=true]:text-accent-foreground hover:bg-accent/40 hover:text-accent-foreground focus:bg-accent/40 focus:text-accent-foreground rounded-lg p-3 transition-colors duration-300"
                                                                )}
                                                            >
                                                                <a
                                                                    href="#hero"
                                                                    className="flex flex-row gap-x-3 items-center group"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        window.dispatchEvent(new CustomEvent('scrollToService', { detail: { serviceIndex: idx } }));
                                                                    }}
                                                                >
                                                                    <div className="bg-background/60 shadow-sm flex aspect-square size-10 items-center justify-center rounded-lg border border-white/10 shrink-0 transition-transform duration-300 group-hover:scale-110">
                                                                        <Icon className="text-foreground/80 size-5 transition-colors duration-300 group-hover:text-primary" />
                                                                    </div>
                                                                    <div className="flex flex-col items-start justify-center overflow-hidden">
                                                                        <span className="font-semibold text-sm text-foreground text-left rtl:text-right whitespace-nowrap truncate w-full transition-colors duration-300 group-hover:text-primary">{subItem.title}</span>
                                                                        <span className="text-muted-foreground text-xs text-left rtl:text-right whitespace-nowrap truncate w-full mt-0.5">
                                                                            {lang === 'fr' ? (servicesData[idx]?.desc) : (servicesData[idx]?.descAr)}
                                                                        </span>
                                                                    </div>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                )}

                                {/* Remaining Links: Skin Advisor, Contact */}
                                {tubeLightItems.slice(1).map((item, idx) => (
                                    <NavigationMenuItem key={`rest-${idx}`}>
                                        <NavigationMenuLink asChild>
                                            <a
                                                href={item.url}
                                                onClick={(e) => smoothScroll(e, item.url)}
                                                className={cn(
                                                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-500",
                                                    scrolled ? "text-foreground hover:bg-accent hover:text-accent-foreground" : "text-foreground/90 hover:text-foreground hover:text-shadow-md hover:-translate-y-0.5"
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}

                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* SECTIONS 3 & 4: [☀️]  [🌐 Français ∨]  [CTA] */}
                    <div className="flex gap-3 xl:gap-4 items-center shrink-0 rtl:space-x-reverse">
                        {/* SECTION 3a: Theme Toggle */}
                        <AnimatedThemeToggle />

                        {/* SECTION 3b: Language Selector */}
                        <LanguageSelectorDropdown />

                        {/* SECTION 4: CTA */}
                        <div className="grid [grid-template-areas:'stack'] place-items-center">
                            {/* Scrolled State (ShimmerButton) */}
                            <div className={cn(
                                "[grid-area:stack] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                scrolled ? "opacity-100 scale-100 pointer-events-auto blur-none" : "opacity-0 scale-95 pointer-events-none blur-sm"
                            )}>
                                <a href={auth.signup.url} onClick={(e) => smoothScroll(e, auth.signup.url)}>
                                    <ShimmerButton
                                        className="rounded-full px-4 xl:px-6 py-2 h-9 transition-all duration-500 hover:scale-105 shadow-lg shadow-primary/25 whitespace-nowrap"
                                        shimmerColor="#ffffff"
                                        shimmerSize="0.08em"
                                        background="#185783"
                                    >
                                        <span className="text-sm font-medium text-white">{auth.signup.text}</span>
                                    </ShimmerButton>
                                </a>
                            </div>

                            {/* Unscrolled State — adapts to dark/light mode */}
                            <div className={cn(
                                "[grid-area:stack] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                !scrolled ? "opacity-100 scale-100 pointer-events-auto blur-none" : "opacity-0 scale-105 pointer-events-none blur-sm"
                            )}>
                                <a href={auth.signup.url} onClick={(e) => smoothScroll(e, auth.signup.url)} className={cn(
                                    "group relative flex h-9 items-center justify-center rounded-full px-4 xl:px-6 text-sm font-semibold transition-all duration-500 overflow-hidden whitespace-nowrap",
                                    "bg-white/95 text-primary border border-white/40 backdrop-blur-md",
                                    "shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:bg-white hover:scale-105",
                                    "dark:bg-white/10 dark:text-white dark:border-white/20 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:hover:bg-white/20 dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                                )}>
                                    <span className="relative z-10 drop-shadow-sm">{auth.signup.text}</span>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent group-hover:animate-shimmer-slide z-0 dark:via-white/20" style={{ animationDuration: '1.2s' }} />
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* MOBILE NAV */}
                <div className="w-full flex lg:hidden items-center justify-between">
                    <a href={logo.url} className="flex items-center gap-1.5 sm:gap-2">
                        <img src={logo.src} className="w-8 h-8 object-contain" alt={logo.alt} />
                        <span className={cn(
                            "font-semibold transition-all duration-500 text-shadow-sm tracking-tight",
                            scrolled ? "text-lg text-foreground" : "text-xl text-foreground"
                        )}>{logo.title}</span>
                    </a>

                    <div className="flex items-center gap-1 sm:gap-2 rtl:space-x-reverse">
                        <AnimatedThemeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className={cn(
                                    "rounded-full transition-all duration-500 size-10",
                                    scrolled ? "hover:bg-accent" : "text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                                )}>
                                    <MenuToggleIcon open={false} className="size-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side={lang === 'ar' ? 'right' : 'left'} className="overflow-y-auto w-[85vw] sm:w-[400px] border-r-0 rounded-r-3xl bg-background/95 backdrop-blur-xl" dir={dir}>
                                <SheetHeader>
                                    <SheetTitle>
                                        <a href={logo.url} className="flex items-center gap-2 justify-start mt-4">
                                            <img src={logo.src} className="w-10 h-10 object-contain" alt={logo.alt} />
                                            <span className="text-xl font-semibold tracking-tight">
                                                {logo.title}
                                            </span>
                                        </a>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="my-8 flex flex-col gap-6">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-2"
                                    >
                                        {/* Link 0: Accueil */}
                                        {tubeLightItems.slice(0, 1).map((item, idx) => (
                                            <a
                                                key={`mob-first-${idx}`}
                                                href={item.url}
                                                onClick={(e) => smoothScroll(e, item.url)}
                                                className="font-medium text-foreground dark:text-white/90 hover:text-primary transition-colors block py-3 text-lg border-b border-border/50 dark:border-white/5"
                                            >
                                                {item.name}
                                            </a>
                                        ))}

                                        {/* Services Dropdown in Mobile */}
                                        {servicesMenuItem && (
                                            <AccordionItem value={servicesMenuItem.title} className="border-b border-border/50 dark:border-white/5">
                                                <AccordionTrigger className="py-3 font-medium text-lg hover:no-underline text-foreground dark:text-white/90 hover:text-primary transition-colors">
                                                    {servicesMenuItem.title}
                                                </AccordionTrigger>
                                                <AccordionContent className="mt-2 mb-4 bg-muted/30 dark:bg-white/5 backdrop-blur-2xl border border-border/50 dark:border-white/10 rounded-2xl p-4">
                                                    <div className="flex flex-col gap-2">
                                                        {servicesMenuItem.items?.map((subItem, idx) => {
                                                            const Icon = servicesData[idx]?.icon || Activity;
                                                            return (
                                                                <a
                                                                    key={idx}
                                                                    className="flex gap-4 rounded-xl p-3 leading-none outline-none transition-colors hover:bg-background/30 hover:shadow-sm items-center group"
                                                                    href={subItem.url}
                                                                >
                                                                    <div className="bg-background shadow-sm flex aspect-square size-10 items-center justify-center rounded-lg border border-border/50 shrink-0 transition-transform group-hover:scale-105">
                                                                        <Icon className="text-foreground/80 size-5 transition-colors group-hover:text-primary" />
                                                                    </div>
                                                                    <div className="flex flex-col items-start justify-center">
                                                                        <div className="text-base font-medium text-foreground group-hover:text-primary transition-colors text-left rtl:text-right w-full">{subItem.title}</div>
                                                                        <p className="text-sm leading-snug text-muted-foreground mt-0.5 text-left rtl:text-right w-full opacity-80 line-clamp-1">
                                                                            {lang === 'fr' ? (servicesData[idx]?.desc) : (servicesData[idx]?.descAr)}
                                                                        </p>
                                                                    </div>
                                                                </a>
                                                            )
                                                        })}
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        )}

                                        {/* Remaining Links */}
                                        {tubeLightItems.slice(1).map((item, idx) => (
                                            <a
                                                key={`mob-rest-${idx}`}
                                                href={item.url}
                                                onClick={(e) => smoothScroll(e, item.url)}
                                                className="font-medium text-foreground dark:text-white/90 hover:text-primary transition-colors block py-3 text-lg border-b border-border/50 dark:border-white/5"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </Accordion>

                                    <div className="border-t border-white/10 pt-6 flex flex-col gap-6 mt-4">
                                        <div className="grid grid-cols-2 justify-start gap-4">
                                            {mobileExtraLinks.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                                    href={link.url}
                                                >
                                                    {link.name}
                                                </a>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-4 bg-muted/30 p-4 rounded-2xl">
                                            <div className="flex items-center justify-center">
                                                <LanguageToggleSwitch />
                                            </div>
                                        </div>

                                        {/* Mobile CTA — Always ShimmerButton */}
                                        <div className="w-full">
                                            <a href={auth.signup.url} onClick={(e) => smoothScroll(e, auth.signup.url)} className="w-full block">
                                                <ShimmerButton
                                                    className="w-full rounded-full py-6 transition-all hover:scale-[1.02] shadow-lg shadow-primary/25"
                                                    shimmerColor="#ffffff"
                                                    shimmerSize="0.1em"
                                                    background="#185783"
                                                >
                                                    <span className="text-lg font-medium text-white">{auth.signup.text}</span>
                                                </ShimmerButton>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};


