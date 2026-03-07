import { Theme } from "@/components/ui/theme"

export const ThemeDropdown = () => {
    return (
        <Theme
            size="sm"
            variant="dropdown"
            themes={["light", "dark"]}
        />
    )
};
