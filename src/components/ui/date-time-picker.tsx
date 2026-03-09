"use client"

import * as React from "react"
import { format } from "date-fns"
import { fr, ar } from "date-fns/locale"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/LanguageContext"
import { cn } from "@/lib/utils"

export interface DateTimePickerProps {
    value?: Date
    onChange?: (date: Date | undefined) => void
    disabled?: boolean
}

export default function DateTimePicker({ value, onChange, disabled }: DateTimePickerProps) {
    const { lang } = useLanguage()
    const isRtl = lang === "ar"
    const locale = isRtl ? ar : fr

    const t = {
        fr: {
            pickDate: "Choisir une date",
            selected: "Sélectionné :",
            noSelection: "Aucune date et heure sélectionnées"
        },
        ar: {
            pickDate: "اختر تاريخاً",
            selected: "تم التحديد:",
            noSelection: "لم يتم تحديد وقت وتاريخ"
        }
    }

    const [date, setDate] = React.useState<Date | undefined>(value)
    const [hour, setHour] = React.useState(() => {
        if (!value) return "09"
        return value.getHours().toString().padStart(2, "0")
    })
    const [minute, setMinute] = React.useState(() => {
        if (!value) return "00"
        return value.getMinutes().toString().padStart(2, "0")
    })

    const availableHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    const availableMinutes = hour === "18" ? ["00"] : ["00", "15", "30", "45"]

    // We only sync value downwards if `value` strictly changes from the outside.
    React.useEffect(() => {
        if (value) {
            if (date && value.getTime() === date.getTime()) return
            setDate(value)
            setHour(value.getHours().toString().padStart(2, "0"))
            setMinute(value.getMinutes().toString().padStart(2, "0"))
        } else {
            setDate(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    const notifyChange = (newDate: Date | undefined, hStr: string, mStr: string) => {
        if (!newDate) {
            onChange?.(undefined)
            return
        }
        const d = new Date(newDate)
        d.setHours(parseInt(hStr), parseInt(mStr), 0, 0)
        onChange?.(d)
    }

    const handleDateSelect = (d: Date | undefined) => {
        setDate(d)
        notifyChange(d, hour, minute)
    }

    const handleHourChange = (v: string) => {
        setHour(v)
        let newMinute = minute
        if (v === "18") {
            newMinute = "00"
            setMinute("00")
        }
        notifyChange(date, v, newMinute)
    }

    const handleMinuteChange = (v: string) => {
        setMinute(v)
        notifyChange(date, hour, v)
    }

    return (
        <div className={cn("flex flex-col gap-4", isRtl ? "rtl" : "ltr")} dir={isRtl ? "rtl" : "ltr"}>
            {/* Date Picker */}
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn("w-full sm:w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground", isRtl && "text-right flex-row-reverse")}
                        disabled={disabled}
                    >
                        <CalendarIcon className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2")} />
                        {date ? format(date, "PPP", { locale }) : <span>{t[lang as keyof typeof t].pickDate}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="p-0 w-fit"
                    side="bottom"
                    sideOffset={4}
                    avoidCollisions={false}
                >
                    <Calendar mode="single" selected={date} onSelect={handleDateSelect} initialFocus dir={isRtl ? "rtl" : "ltr"} />
                </PopoverContent>
            </Popover>

            {/* Time Picker */}
            <div className={cn("flex items-center gap-2", isRtl && "flex-row-reverse justify-end")}>
                <Clock className="h-4 w-4 text-muted-foreground" />
                <Select value={hour} onValueChange={handleHourChange} disabled={disabled}>
                    <SelectTrigger className="w-[62px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false} position="popper" sideOffset={4}>
                        {availableHours.map((h) => (
                            <SelectItem key={h} value={h}>
                                {h}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <span>:</span>

                <Select value={minute} onValueChange={handleMinuteChange} disabled={disabled}>
                    <SelectTrigger className="w-[70px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent side="bottom" avoidCollisions={false} position="popper" sideOffset={4}>
                        {availableMinutes.map((m) => (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Result */}
            <p className="text-sm text-muted-foreground">
                {t[lang as keyof typeof t].selected}{" "}
                {date
                    ? (() => {
                        const d = new Date(date)
                        d.setHours(parseInt(hour), parseInt(minute), 0, 0)
                        // Uses 'PPP p' for date and time. It respects locale.
                        // We will use 'p' directly but without AMPM standard suffix mostly controlled by Locale.
                        // Or we can manually construct it if needed, but format with `p` defaults to 24h/12h based on locale.
                        // Since they want 24h exclusively, we'll force 24h output by formatting manually:
                        return format(d, "PPP HH:mm", { locale })
                    })()
                    : t[lang as keyof typeof t].noSelection}
            </p>
        </div>
    )
}
