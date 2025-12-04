// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { FaSun, FaMoon } from "react-icons/fa6";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (isSelected: boolean) => {
        setTheme(isSelected ? "light" : "dark");
    };
    const isLight = theme === "light";
    return (
        <div className="text-foreground">
            <div className="flex items-center space-x-2">
                <Switch
                    checked={isLight}
                    onCheckedChange={handleThemeChange}
                    id="theme-toggle"
                ></Switch>
                <label htmlFor="theme-toggle">
                    {isLight ? (
                        <FaSun className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <FaMoon className="w-5 h-5 text-gray-700" />
                    )}
                </label>
            </div>
        </div>
    );
}
