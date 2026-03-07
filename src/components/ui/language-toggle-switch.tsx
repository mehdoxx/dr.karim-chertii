"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/context/LanguageContext"

interface LanguageToggleSwitchProps {
    className?: string
}

export function LanguageToggleSwitch({ className }: LanguageToggleSwitchProps) {
    const { lang, toggleLang } = useLanguage()
    const isFrench = lang === "fr"

    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Français label */}
            <span
                className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    isFrench ? "text-foreground" : "text-muted-foreground"
                )}
            >
                Français
            </span>

            {/* Toggle pill */}
            <div
                className={cn(
                    "flex w-14 h-7 p-1 rounded-full cursor-pointer transition-all duration-300",
                    "bg-white border border-zinc-200 shadow-sm",
                    "dark:bg-zinc-950 dark:border-zinc-800 dark:shadow-none"
                )}
                onClick={toggleLang}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleLang() }}
                aria-label={isFrench ? "Switch to Arabic" : "Switch to French"}
            >
                <div className="flex justify-between items-center w-full relative">
                    {/* Sliding circle */}
                    <div
                        className={cn(
                            "absolute flex justify-center items-center w-5 h-5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isFrench
                                ? "left-0 bg-zinc-200 dark:bg-zinc-700"
                                : "left-[calc(100%-1.25rem)] bg-zinc-200 dark:bg-zinc-700"
                        )}
                    >
                        <span className="text-[10px] font-bold text-zinc-700 dark:text-white leading-none select-none">
                            {isFrench ? "Fr" : "ع"}
                        </span>
                    </div>

                    {/* Inactive hint on opposite side */}
                    <div
                        className={cn(
                            "absolute flex justify-center items-center w-5 h-5 rounded-full transition-opacity duration-300",
                            isFrench
                                ? "right-0 opacity-50"
                                : "left-0 opacity-50"
                        )}
                    >
                        <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 leading-none select-none">
                            {isFrench ? "ع" : "Fr"}
                        </span>
                    </div>
                </div>
            </div>

            {/* العربية label */}
            <span
                className={cn(
                    "text-sm font-medium transition-colors duration-300",
                    !isFrench ? "text-foreground" : "text-muted-foreground"
                )}
            >
                العربية
            </span>
        </div>
    )
}
