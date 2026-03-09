"use client"

import * as React from "react"
import { format } from "date-fns"
import { fr, arDZ } from "date-fns/locale"
import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

import { Select, SelectOption } from "@/components/ui/animated-select-1"

interface CalendarWithTimePresetsProps {
    onSelect?: (date: Date | undefined, time: string | null) => void;
    selectedDate?: Date;
    selectedTime?: string | null;
}

export function CalendarWithTimePresets({ onSelect, selectedDate, selectedTime }: CalendarWithTimePresetsProps) {
    const { lang } = useLanguage()
    const dateLocale = lang === 'fr' ? fr : arDZ
    const isRtl = lang === 'ar'

    const [date, setDate] = React.useState<Date | undefined>(selectedDate || new Date())
    const [time, setTime] = React.useState<string | null>(selectedTime || "10:00")

    const timeSlots = Array.from({ length: 37 }, (_, i) => {
        const totalMinutes = i * 15
        const hour = Math.floor(totalMinutes / 60) + 9
        const minute = totalMinutes % 60
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
    })

    const handleDateSelect = (newDate: Date | undefined) => {
        if (!newDate) return
        setDate(newDate)
        if (onSelect) onSelect(newDate, time)
    }

    const handleTimeSelect = (newTime: string) => {
        setTime(newTime)
        if (onSelect) onSelect(date, newTime)
    }

    return (
        <Card className="border-[#4f93cb]/20 bg-[var(--color-surface)]/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-[#4f93cb]/5">
            <CardContent className="flex flex-col p-0 rounded-2xl border border-transparent max-w-[340px] mx-auto w-full">
                {/* Calendar Section */}
                <div className="p-2 sm:p-4 bg-white/50 dark:bg-black/5 flex items-center justify-center border-b border-[#4f93cb]/10">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        locale={dateLocale}
                        dir={isRtl ? 'rtl' : 'ltr'}
                        showOutsideDays={false}
                        hideWeekdays
                        className="p-0"
                    />
                </div>

                {/* Unified Time Selection (Animated Select) */}
                <div className="w-full p-4 sm:p-5 flex flex-col gap-3 max-w-[340px] mx-auto">
                    <div className={cn(
                        "text-xs font-bold text-[#4f93cb] uppercase tracking-widest px-1",
                        isRtl ? "text-right" : "text-left"
                    )}>
                        {lang === 'fr' ? 'Heure du RDV' : 'وقت الموعد'}
                    </div>
                    <Select
                        placeholder={lang === 'fr' ? "Choisir l'heure" : "اختر الوقت"}
                        setValue={(val) => handleTimeSelect(val as string)}
                        className="w-full"
                    >
                        {timeSlots.map((slot) => (
                            <SelectOption key={slot} value={slot}>
                                {slot}
                            </SelectOption>
                        ))}
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}

