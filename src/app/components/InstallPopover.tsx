// components/InstallPopover.tsx
"use client";
import React from "react";
import InstallationProgress from "./InstallationProgress";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

function InstallPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="capitalize">
                    Installation Progress
                </Button>
            </PopoverTrigger>
            <PopoverContent className="text-foreground max-w-sm leading-relaxed p-2 rounded-xl px-4">
                <InstallationProgress />
            </PopoverContent>
        </Popover>
    );
}

export default InstallPopover;
