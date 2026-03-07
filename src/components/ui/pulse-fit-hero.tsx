import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import AnimatedGenerateButton from "@/components/ui/animated-generate-button-shadcn-tailwind";

export interface NavigationItem {
    label: string;
    hasDropdown?: boolean;
    onClick?: () => void;
}

export interface ProgramCard {
    image: string;
    category: string;
    title: string;
    onClick?: () => void;
}

export interface PulseFitHeroProps {
    logo?: string;
    navigation?: NavigationItem[];
    ctaButton?: {
        label: string;
        onClick: () => void;
    };
    title: React.ReactNode | string;
    subtitle: string;
    primaryAction?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
    disclaimer?: string;
    socialProof?: {
        avatars: string[];
        text: string;
    };
    programs?: ProgramCard[];
    className?: string;
    children?: React.ReactNode;
    hideHeader?: boolean;
}

export function PulseFitHero({
    logo = "PulseFit",
    navigation = [
        { label: "Features" },
        { label: "Programs", hasDropdown: true },
        { label: "Testimonials" },
        { label: "Pricing" },
        { label: "Contact" },
    ],
    ctaButton,
    title,
    subtitle,
    primaryAction,
    secondaryAction,
    disclaimer,
    socialProof,
    programs = [],
    className,
    children,
    hideHeader = false,
}: PulseFitHeroProps) {
    const baseX = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Listen for scrollToService events from the navbar
    const scrollToServiceCard = useCallback((serviceIndex: number) => {
        if (programs.length === 0) return;

        // Scroll the page to hero carousel area first
        const heroEl = document.getElementById('hero');
        if (heroEl) {
            heroEl.scrollIntoView({ behavior: 'smooth' });
        }

        // Calculate target X position to center the card
        const cardWidth = 380; // 356px card + 24px gap
        const viewportCenter = window.innerWidth / 2;
        const targetX = -(serviceIndex * cardWidth) + viewportCenter - (cardWidth / 2);

        // Pause auto-scroll
        setIsPaused(true);

        // Animate to the target position
        const startX = baseX.get();
        const distance = targetX - startX;
        const duration = 800;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            baseX.set(startX + distance * eased);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Resume auto-scroll after 3 seconds
                setTimeout(() => setIsPaused(false), 3000);
            }
        };
        requestAnimationFrame(animate);
    }, [programs.length, baseX]);

    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (typeof detail?.serviceIndex === 'number') {
                scrollToServiceCard(detail.serviceIndex);
            }
        };
        window.addEventListener('scrollToService', handler);
        return () => window.removeEventListener('scrollToService', handler);
    }, [scrollToServiceCard]);

    useAnimationFrame((time, delta) => {
        if (programs.length === 0 || isPaused) return;
        const baseSpeed = 0.7;
        const hoverSpeed = 0.1;
        const speed = isHovered ? hoverSpeed : baseSpeed;

        let moveBy = speed * (delta / 16);
        baseX.set(baseX.get() - moveBy);
    });

    const wrap = (min: number, max: number, v: number) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    const x = useTransform(baseX, (v) => `${wrap(-(programs.length * 380), 0, v)}px`);

    return (
        <section
            className={cn(
                "relative w-full min-h-screen flex flex-col overflow-hidden bg-transparent pt-32 lg:pt-40",
                className
            )}
            style={{}}
            role="banner"
            aria-label="Hero section"
        >
            {/* Header */}
            {!hideHeader && (
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-20 flex flex-row justify-between items-center px-8 lg:px-16"
                    style={{
                        paddingTop: "32px",
                        paddingBottom: "32px",
                    }}
                >
                    {/* Logo */}
                    <div
                        style={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 700,
                            fontSize: "24px",
                            color: "var(--color-text-primary)",
                        }}
                    >
                        {logo}
                    </div>

                    {/* Navigation */}
                    <nav className="hidden lg:flex flex-row items-center gap-8" aria-label="Main navigation">
                        {navigation.map((item, index) => (
                            <button
                                key={index}
                                onClick={item.onClick}
                                className="flex flex-row items-center gap-1 hover:opacity-70 transition-opacity"
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    color: "var(--color-text-secondary)",
                                }}
                            >
                                {item.label}
                                {item.hasDropdown && (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M4 6L8 10L12 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    {ctaButton && (
                        <button
                            onClick={ctaButton.onClick}
                            className="px-6 py-3 rounded-full transition-all hover:scale-105"
                            style={{
                                background: "var(--color-canvas-bg)",
                                border: "1px solid var(--color-border)",
                                fontFamily: "Inter, sans-serif",
                                fontSize: "16px",
                                fontWeight: 500,
                                color: "var(--color-text-primary)",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                            }}
                        >
                            {ctaButton.label}
                        </button>
                    )}
                </motion.header>
            )}

            {/* Main Content */}
            {children ? (
                <div className="relative z-10 flex-1 flex items-center justify-center w-full">
                    {children}
                </div>
            ) : (
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-16">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col items-center text-center max-w-4xl"
                        style={{ gap: "32px" }}
                    >
                        {/* Title */}
                        <motion.h1
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="font-bold tracking-tight text-foreground drop-shadow-sm mb-4"
                            style={{
                                fontFamily: "var(--font-inter)",
                                fontSize: "clamp(36px, 6vw, 72px)",
                                lineHeight: "1.1",
                                letterSpacing: "-0.02em",
                                whiteSpace: "pre-line",
                            }}
                        >
                            {title}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            className="text-muted-foreground"
                            style={{
                                fontFamily: "var(--font-inter), var(--font-arabic)",
                                fontWeight: 400,
                                fontSize: "clamp(16px, 2vw, 20px)",
                                lineHeight: "1.6",
                                maxWidth: "600px",
                            }}
                        >
                            {subtitle}
                        </motion.p>

                        {/* Action Buttons */}
                        {(primaryAction || secondaryAction) && (
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, scale: 0.95, y: 20 },
                                    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                            >
                                {primaryAction && (
                                    <ShimmerButton
                                        onClick={primaryAction.onClick}
                                        className="rounded-full px-8 py-3 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                                        shimmerColor="#ffffff"
                                        shimmerSize="0.08em"
                                        background="#185783"
                                    >
                                        <span className="flex items-center gap-2 text-white text-lg font-medium">
                                            {primaryAction.label}
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="rtl:rotate-180 transition-transform">
                                                <path
                                                    d="M7 10H13M13 10L10 7M13 10L10 13"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </ShimmerButton>
                                )}

                                {secondaryAction && (
                                    <AnimatedGenerateButton
                                        labelIdle={secondaryAction.label}
                                        labelActive="Analyse en cours..."
                                        onClick={secondaryAction.onClick}
                                        className="transition-all hover:scale-105"
                                        highlightHueDeg={205}
                                    />
                                )}
                            </motion.div>
                        )}

                        {/* Disclaimer */}
                        {disclaimer && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="text-muted-foreground italic"
                                style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "13px",
                                    fontWeight: 400,
                                }}
                            >
                                {disclaimer}
                            </motion.p>
                        )}

                        {/* Social Proof */}
                        {socialProof && (
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                                }}
                                className="flex flex-row items-center gap-3 pt-6"
                            >
                                <div className="flex flex-row -space-x-2">
                                    {socialProof.avatars.map((avatar, index) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`User ${index + 1}`}
                                            className="rounded-full border-2 border-background"
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ))}
                                </div>
                                <span
                                    className="text-muted-foreground"
                                    style={{
                                        fontFamily: "var(--font-inter)",
                                        fontSize: "14px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {socialProof.text}
                                </span>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Program Cards Carousel */}
            {programs.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="relative z-10 w-full overflow-hidden"
                    style={{
                        paddingTop: "60px",
                        paddingBottom: "60px",
                    }}
                >
                    {/* Gradient Overlays */}
                    <div
                        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
                        style={{
                            width: "150px",
                            background: "linear-gradient(90deg, var(--color-canvas-bg) 0%, transparent 100%)",
                        }}
                    />
                    <div
                        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
                        style={{
                            width: "150px",
                            background: "linear-gradient(270deg, var(--color-canvas-bg) 0%, transparent 100%)",
                        }}
                    />

                    {/* Scrolling Container */}
                    <motion.div
                        className="flex items-center"
                        dir="ltr"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            x,
                            gap: "24px",
                            paddingLeft: "24px",
                        }}
                    >
                        {/* Duplicate programs for seamless loop */}
                        {[...programs, ...programs, ...programs].map((program, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05, y: -10 }}
                                transition={{ duration: 0.3 }}
                                onClick={program.onClick}
                                className="flex-shrink-0 cursor-pointer relative overflow-hidden group"
                                style={{
                                    width: "356px",
                                    height: "480px",
                                    borderRadius: "24px",
                                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                                }}
                            >
                                {/* Image */}
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />

                                {/* Gradient Overlay */}
                                <div
                                    className="absolute inset-0 transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                                    style={{
                                        background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
                                    }}
                                />

                                {/* Text Content */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 p-6"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px",
                                    }}
                                >
                                    <span
                                        dir="auto"
                                        style={{
                                            fontFamily: "var(--font-inter), var(--font-arabic)",
                                            fontSize: "12px",
                                            fontWeight: 500,
                                            color: "rgba(255, 255, 255, 0.8)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.1em",
                                        }}
                                    >
                                        {program.category}
                                    </span>
                                    <h3
                                        dir="auto"
                                        style={{
                                            fontFamily: "var(--font-inter), var(--font-arabic)",
                                            fontSize: "24px",
                                            fontWeight: 600,
                                            color: "#FFFFFF",
                                            lineHeight: "1.3",
                                        }}
                                    >
                                        {program.title}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
}
