import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check, Globe } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

const languages = [
    { code: "fr", label: "Français", flag: "" }, // user requested no emoji flags
    { code: "ar", label: "العربية", flag: "" },
];

export const LanguageSelectorDropdown = () => {
    const { lang, toggleLang } = useLanguage();
    const selected = languages.find(l => l.code === lang) || languages[0];
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={cn(
                    "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm",
                    "bg-white/60 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm",
                    "border-gray-200 dark:border-neutral-700",
                    "text-gray-800 dark:text-neutral-200",
                    "hover:bg-gray-50 dark:hover:bg-neutral-800 transition-all font-medium"
                )}
            >
                <Globe className="h-4 w-4 opacity-70" />
                <span>{selected.label}</span>
                <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {open && (
                <div
                    className={cn(
                        "absolute rtl:right-0 ltr:left-0 mt-2 min-w-32 rounded-xl overflow-hidden",
                        "bg-white/90 dark:bg-neutral-900/95 backdrop-blur-xl",
                        "shadow-lg border border-gray-200 dark:border-neutral-700",
                        "animate-in fade-in zoom-in-95 duration-200"
                    )}
                >
                    {languages.map((l) => (
                        <button
                            key={l.code}
                            onClick={() => {
                                if (lang !== l.code) toggleLang();
                                setOpen(false);
                            }}
                            className={cn(
                                "flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition-colors rtl:justify-end",
                                selected.code === l.code
                                    ? "font-semibold text-primary dark:text-primary"
                                    : "text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
                            )}
                        >
                            <span className="flex-1">{l.label}</span>
                            {selected.code === l.code && (
                                <Check className="h-4 w-4 text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
