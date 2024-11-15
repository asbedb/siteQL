'use client'
import React from 'react'
import InstallationProgress from './InstallationProgress';
import { Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

function InstallPopover() {
    const content = (
        <PopoverContent className='text-foreground max-w-sm leading-relaxed p-2 rounded-xl px-4'>
            <InstallationProgress/>
        </PopoverContent>
    );
    return (
        <Popover placement='bottom-end'>
            <PopoverTrigger>
                <Button variant="flat" className="capitalize">
                    Installation Progress
                </Button>
            </PopoverTrigger>
            {content}
    </Popover>
    )
    }

export default InstallPopover