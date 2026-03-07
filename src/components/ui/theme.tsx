"use client"

import React, { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
    Check,
    ChevronDown,
    Monitor,
    Moon,
    Sun,
    Sunset,
    Trees,
    Waves,
} from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
    sunset: Sunset,
    ocean: Waves,
    forest: Trees,
}

export type ThemeToggleVariant =
    | "button"
    | "switch"
    | "dropdown"
    | "tabs"
    | "grid"
    | "radial"
    | "cards"
export type ThemeToggleSize = "sm" | "md" | "lg"

interface ThemeToggleProps {
    variant?: ThemeToggleVariant
    size?: ThemeToggleSize
    showLabel?: boolean
    themes?: Theme[]
    className?: string
}

export function Theme({
    variant = "button",
    size = "md",
    showLabel = false,
    themes = ["light", "dark", "system"],
    className,
}: ThemeToggleProps) {
    const { theme, setTheme } = useTheme()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const sizeClasses = {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
    }

    const iconSizes = {
        sm: 14,
        md: 16,
        lg: 20,
    }

    if (!isMounted) return null

    if (variant === "button") {
        const isTheme = (value: unknown): value is Theme => {
            return (
                typeof value === "string" && ["light", "dark", "system"].includes(value)
            )
        }

        const safeTheme: Theme =
            isTheme(theme) && themes.includes(theme) ? theme : "light"

        const nextTheme = themes[(themes.indexOf(safeTheme) + 1) % themes.length]
        const Icon = themeIcons[safeTheme]

        return (
            <motion.button
                onClick={() => setTheme(nextTheme)}
                className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-lg border transition-all duration-200",
                    "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)]",
                    "hover:scale-105 hover:bg-[var(--color-muted)] active:scale-95",
                    sizeClasses[size],
                    className
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.div
                    key={safeTheme}
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icon size={iconSizes[size]} />
                </motion.div>
                {showLabel && (
                    <span className="font-medium">{themeConfigs[safeTheme].label}</span>
                )}
            </motion.button>
        )
    }

    if (variant === "switch") {
        const isLight = theme === "light"

        return (
            <motion.button
                onClick={() => setTheme(isLight ? "dark" : "light")}
                className={cn(
                    "relative inline-flex items-center rounded-full border-2 transition-all duration-300",
                    "border-[var(--color-border)] bg-[var(--color-muted)]",
                    size === "sm"
                        ? "h-6 w-11.5"
                        : size === "md"
                            ? "h-7 w-13"
                            : "h-8 w-15",
                    className
                )}
            >
                <motion.div
                    className={cn(
                        "inline-flex items-center justify-center rounded-full bg-black shadow-lg dark:bg-white",
                        size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6"
                    )}
                    animate={{
                        x: isLight ? 2 : size === "sm" ? 24 : size === "md" ? 26 : 30,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                    <motion.div
                        key={theme}
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isLight ? (
                            <Sun
                                size={size === "sm" ? 10 : size === "md" ? 12 : 14}
                                className="text-yellow-500"
                            />
                        ) : (
                            <Moon
                                size={size === "sm" ? 10 : size === "md" ? 12 : 14}
                                className="text-slate-700"
                            />
                        )}
                    </motion.div>
                </motion.div>
            </motion.button>
        )
    }

    if (variant === "dropdown") {
        const isTheme = (value: unknown): value is Theme => {
            return (
                typeof value === "string" && ["light", "dark", "system"].includes(value)
            )
        }

        const safeTheme: Theme =
            isTheme(theme) && themes?.includes(theme) ? theme : "light"

        return (
            <div className="relative">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {showLabel ? (
                            <motion.button
                                className={cn(
                                    "inline-flex items-center justify-between gap-2 rounded-lg border transition-all duration-200",
                                    "border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)]",
                                    "hover:bg-[var(--color-muted)]",
                                    sizeClasses[size],
                                    "min-w-[80px]",
                                    className
                                )}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-2">
                                    {React.createElement(themeIcons[safeTheme], {
                                        size: iconSizes[size],
                                    })}
                                    <span className="font-medium">
                                        {themeConfigs[safeTheme].label}
                                    </span>
                                </div>
                                <ChevronDown size={iconSizes[size]} />
                            </motion.button>
                        ) : (
                            <motion.button
                                className={cn(
                                    "inline-flex flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 px-3 py-1.5",
                                    "bg-white/60 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-neutral-800",
                                    className
                                )}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {React.createElement(themeIcons[safeTheme], {
                                    size: iconSizes[size],
                                })}
                            </motion.button>
                        )}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        className="z-50 min-w-[120px] space-y-1 bg-white/90 dark:bg-neutral-900/95 backdrop-blur-xl border-gray-200 dark:border-neutral-700 rounded-xl rtl:right-0 ltr:left-0"
                    >
                        {themes.map((themeOption) => {
                            const Icon = themeIcons[themeOption]
                            const isSelected = theme === themeOption

                            return (
                                <DropdownMenuItem
                                    key={themeOption}
                                    onClick={() => setTheme(themeOption)}
                                    className={cn(
                                        "flex items-center justify-between gap-2 px-3 py-2 cursor-pointer transition-colors rtl:justify-end text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800",
                                        isSelected && "font-semibold text-primary"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon size={iconSizes[size]} className={isSelected ? 'text-primary' : ''} />
                                        <span className="font-medium">
                                            {themeConfigs[themeOption].label}
                                        </span>
                                    </div>
                                    {isSelected && <Check size={iconSizes[size]} className="text-primary" />}
                                </DropdownMenuItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    }

    if (variant === "tabs") {
        return (
            <Tabs value={theme} onValueChange={setTheme} className={cn(className)}>
                <TabsList
                    className={cn(
                        "inline-flex items-center rounded-lg border p-1",
                        "border-[var(--color-border)] bg-[var(--color-muted)]"
                    )}
                >
                    {themes.map((themeOption) => {
                        const Icon = themeIcons[themeOption]
                        const isSelected = theme === themeOption

                        return (
                            <TabsTrigger
                                key={themeOption}
                                value={themeOption}
                                className={cn(
                                    "relative inline-flex items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all",
                                    size === "sm"
                                        ? "h-6 px-2"
                                        : size === "md"
                                            ? "h-7 px-3"
                                            : "h-8 px-4",
                                    isSelected && "text-[var(--color-foreground)]"
                                )}
                            >
                                {isSelected && (
                                    <motion.div
                                        layoutId="segmented-bg"
                                        className="absolute inset-0 rounded-md bg-[var(--color-card)] shadow-sm"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <div className="relative z-10 flex items-center gap-1">
                                    <Icon size={size === "sm" ? 12 : size === "md" ? 14 : 16} />
                                    {showLabel && <span>{themeConfigs[themeOption].label}</span>}
                                </div>
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
            </Tabs>
        )
    }

    return null
}

export type Theme = "light" | "dark" | "system"

export type ThemeConfig = {
    name: string
    label: string
    colors: {
        background: string
        foreground: string
        primary: string
        secondary: string
        accent: string
        muted: string
        border: string
        card: string
    }
}

export const themeConfigs: Record<Theme, ThemeConfig> = {
    light: {
        name: "light",
        label: "Clair",
        colors: {
            background: "#ffffff",
            foreground: "#0f172a",
            primary: "#3b82f6",
            secondary: "#64748b",
            accent: "#f59e0b",
            muted: "#f8fafc",
            border: "#e2e8f0",
            card: "#ffffff",
        },
    },
    dark: {
        name: "dark",
        label: "Sombre",
        colors: {
            background: "#0f172a",
            foreground: "#f8fafc",
            primary: "#60a5fa",
            secondary: "#94a3b8",
            accent: "#fbbf24",
            muted: "#1e293b",
            border: "#334155",
            card: "#1e293b",
        },
    },
    system: {
        name: "system",
        label: "Système",
        colors: {
            background: "#ffffff",
            foreground: "#0f172a",
            primary: "#3b82f6",
            secondary: "#64748b",
            accent: "#f59e0b",
            muted: "#f8fafc",
            border: "#e2e8f0",
            card: "#ffffff",
        },
    },
}
