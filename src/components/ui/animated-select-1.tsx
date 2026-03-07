"use client";

import {
    ComponentPropsWithoutRef,
    Dispatch,
    ReactNode,
    SetStateAction,
    cloneElement,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown } from "@phosphor-icons/react";

type SelectOptionProps = {
    value: string;
    children: string;
    setValue?: Dispatch<SetStateAction<string>>;
    handleSelection?: (text: string) => void;
    closeDropdown?: () => void;
};

export function Select({
    children,
    className,
    placeholder,
    setValue,
    ...props
}: {
    children: ReactNode;
    placeholder: string;
    className?: string;
    setValue: Dispatch<SetStateAction<string>>;
} & ComponentPropsWithoutRef<"button">) {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [displayText, setDisplayText] = useState<string>("");
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const closeDropdown = () => setIsOpened(false);

    // Handler for selection that updates both text and index
    const handleSelection = (text: string, index: number) => {
        setDisplayText(text);
        setSelectedIndex(index);
    };

    const childrenArray = Array.isArray(children) ? children : [children];

    const childrenWithProps = childrenArray.map((child, index) => {
        if (isValidElement<SelectOptionProps>(child)) {
            return cloneElement(child, {
                setValue,
                handleSelection: (text: string) => handleSelection(text, index),
                closeDropdown,
                key: child.props.value || index,
            });
        }
        return child;
    });

    return (
        <div className="relative w-full" ref={selectRef}>
            <button
                type="button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    setIsOpened(!isOpened);
                }}
                className={cn(
                    "h-[3.5rem] flex items-center gap-2 rounded-xl py-3 px-4 bg-white/40 dark:bg-white/5 text-black dark:text-white border-white/50 dark:border-white/10 border backdrop-blur-xl outline-none hover:bg-white/60 dark:hover:bg-white/10 transition ease-in-out duration-200 cursor-pointer w-full justify-between ring-0 focus:ring-2 ring-primary/20 focus:border-primary/40 overflow-hidden shadow-sm",
                    className
                )}
                {...props}
            >
                <div className="relative overflow-hidden py-1 flex-1 h-full flex items-center">
                    <div
                        className={cn(
                            "absolute inset-0 flex items-center justify-start transition-opacity duration-200 pointer-events-none",
                            displayText ? "opacity-0" : "opacity-60"
                        )}
                    >
                        {placeholder}
                    </div>

                    <div
                        className="absolute inset-0 flex flex-col gap-2 transition-transform duration-300 ease-in-out pointer-events-none"
                        style={{
                            transform: `translateY(calc(${selectedIndex * -100}% - ${selectedIndex * 8
                                }px))`,
                        }}
                    >
                        {childrenArray.map((child, index) => {
                            if (isValidElement<SelectOptionProps>(child)) {
                                return (
                                    <div
                                        key={index}
                                        className={cn(
                                            "h-full min-h-full flex items-center justify-start",
                                            selectedIndex === index ? "text-primary font-bold drop-shadow-sm" : "text-transparent"
                                        )}
                                    >
                                        {child.props.children}
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>

                <CaretDown
                    className={cn(
                        "transition-transform duration-200 size-5 text-[#185783]/60 dark:text-white/60",
                        isOpened && "rotate-180"
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpened && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-3 left-0 right-0 z-50 border border-white/40 dark:border-white/10 text-black dark:text-white rounded-2xl p-2 bg-white dark:bg-zinc-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] max-h-[250px] overflow-y-auto no-scrollbar ring-1 ring-black/5"
                    >
                        {childrenWithProps}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function SelectOption({
    children,
    value,
    setValue,
    handleSelection,
    closeDropdown,
}: SelectOptionProps) {
    return (
        <div
            className="hover:bg-primary/20 dark:hover:bg-white/10 p-3 px-5 rounded-xl cursor-pointer transition ease-in-out duration-200 text-sm font-medium flex items-center justify-between group"
            onClick={() => {
                setValue?.(value);
                handleSelection?.(children);
                closeDropdown?.();
            }}
        >
            <span>{children}</span>
            <div className="size-1.5 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-200" />
        </div>
    );
}
