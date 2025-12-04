// components/ServicePing.tsx
"use client";
import { useState, useEffect } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ServicePing() {
    const [isRunning, setIsRunning] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkServer() {
            try {
                const response = await fetch("/api/connections/sqlServicePing");
                const data = await response.json();
                setIsRunning(data.isRunning);
            } catch (error) {
                console.error("Error checking MySQL server status:", error);
                setIsRunning(false);
            }
        }

        checkServer();
    }, []);

    const getColorClass = () => {
        if (isRunning === null) {
            // Equivalent to 'warning'
            return "bg-yellow-500 animate-pulse";
        }
        if (isRunning) {
            // Equivalent to 'success'
            return "bg-green-500";
        }
        // Equivalent to 'danger'
        return "bg-red-500";
    };
    const getStatusMessage = () => {
        if (isRunning === null) {
            return "Checking Status...";
        }
        if (isRunning) {
            return "SQL Service is Running";
        }
        return "SQL Service is not Connected - Check your SQL Node Settings";
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center justify-center cursor-pointer">
                        <div
                            className={`w-4 h-4 rounded-full mr-2 ${getColorClass()}`}
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{getStatusMessage()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
