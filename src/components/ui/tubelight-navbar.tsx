"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItem {
    id?: string;
    name: string;
    url: string;
    icon: React.ElementType;
}

interface NavBarProps {
    items: NavItem[];
    className?: string;
    activeTab?: string;
    setActiveTab?: (tab: string) => void;
}

export function TubeLightNavbar({ items, className, activeTab, setActiveTab }: NavBarProps) {
    const [internalActiveTab, setInternalActiveTab] = useState(activeTab || items[0]?.name);

    useEffect(() => {
        if (activeTab) {
            setInternalActiveTab(activeTab);
        }
    }, [activeTab]);

    const handleTabClick = (name: string) => {
        setInternalActiveTab(name);
        if (setActiveTab) {
            setActiveTab(name);
        }
    };

    return (
        <div
            className={cn(
                "flex items-center gap-3 bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-neutral-800 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg",
                className,
            )}
        >
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = internalActiveTab === item.name;

                return (
                    <Link
                        key={item.name}
                        href={item.url}
                        onClick={() => handleTabClick(item.name)}
                        className={cn(
                            "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                            "text-gray-800 dark:text-neutral-200 hover:text-primary dark:hover:text-primary",
                            isActive && "bg-muted dark:bg-neutral-800 text-primary dark:text-primary",
                        )}
                    >
                        <span className="hidden md:inline">{item.name}</span>
                        <span className="md:hidden">
                            <Icon size={18} strokeWidth={2.5} />
                        </span>
                        {isActive && (
                            <motion.div
                                layoutId="lamp"
                                className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                                initial={false}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            >
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                                    <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                                    <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                                    <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                                </div>
                            </motion.div>
                        )}
                    </Link>
                );
            })}
        </div>
    );
}
