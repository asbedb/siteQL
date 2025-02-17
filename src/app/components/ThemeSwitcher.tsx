// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { Switch } from "@nextui-org/react";
import { FaSun, FaMoon } from "react-icons/fa6";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (isSelected: boolean) => {
        setTheme(isSelected ? "light" : "dark");
    };

    return (
        <div className="text-foreground">
            <Switch 
                isSelected={theme === "light"}
                size="lg"
                color="secondary"
                onChange={(e) => handleThemeChange(e.target.checked)}
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <FaSun className={className} />
                    ) : (
                        <FaMoon className={className} />
                    )
                }
            >
            </Switch>
        </div>
    );
}
