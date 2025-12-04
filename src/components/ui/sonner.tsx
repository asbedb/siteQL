"use client";

import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            // ADDED VARIABLES FOR ALL TOAST STATES (ERROR, SUCCESS, INFO, ETC.)
            style={
                {
                    // --- General/Normal Toast Colors (Background/Foreground) ---
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",

                    // --- Error Toast Colors (Using Destructive) ---
                    "--error-bg": "var(--destructive)",
                    "--error-text": "var(--destructive-foreground)",
                    "--error-border": "var(--destructive)",

                    // --- Success Toast Colors (Using Primary) ---
                    "--success-bg": "var(--primary)",
                    "--success-text": "var(--primary-foreground)",
                    "--success-border": "var(--primary)",

                    // --- Info/Warning Colors (Using Accent) ---
                    // You might adjust these based on your specific warning color
                    "--info-bg": "var(--accent)",
                    "--info-text": "var(--accent-foreground)",
                    "--warning-bg": "var(--accent)",
                    "--warning-text": "var(--accent-foreground)",

                    // --- Action Button Colors ---
                    "--action-bg": "var(--primary)",
                    "--action-text": "var(--primary-foreground)",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

export { Toaster };
