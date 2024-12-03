import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from '@nextui-org/react';

function FinalDBTest() {
    //to be updated with API Driven Array which will return real SQL Query Data
    const codeLines = [
        `-- Connect to the database`,
        `USE \`newApp\`;`,
        `-- Check if the main table exists`,
        `SHOW TABLES LIKE 'main';`,
        `-- Check if additional custom tables exist`,
        `SHOW TABLES WHERE \`Tables_in_newApp\` IN ('test', 'testada', 'weee', 'weeea', '123');`,
        `-- Fetch a few rows from each table to confirm functionality`,
        `-- Main table query`,
        `SELECT * FROM \`main\` LIMIT 5;`,
        `-- Custom tables queries`,
        `SELECT * FROM \`test\` LIMIT 5;`,
        `SELECT * FROM \`testada\` LIMIT 5;`,
        `SELECT * FROM \`weee\` LIMIT 5;`,
        `SELECT * FROM \`weeea\` LIMIT 5;`,
        `SELECT * FROM \`123\` LIMIT 5;`,
    ];
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndex, setVisibleIndex] = useState(0); // Tracks the current line to show
    useEffect(() => {
        if (visibleIndex >= codeLines.length) return; // Stop if all lines are visible

        const timer = setTimeout(() => {
            setVisibleIndex((prev) => prev + 1); // Increment the visible index
        }, 1000);

        return () => clearTimeout(timer); // Cleanup timeout
    }, [visibleIndex, codeLines.length]);
    useEffect(() => {
        // Scroll to the bottom of the container when a new line is added
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [visibleIndex]);

    const lineVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
    };

    return (
        <Code 
            ref={containerRef}
            className="w-full p-4 leading-4 rounded-xl overflow-y-hidden h-[55px] bg-black text-green-500 scroll-auto"
        >
            <AnimatePresence>
                {codeLines.slice(0, visibleIndex).map((line, index) => (
                    <motion.div
                        key={`line-${index}`}
                        variants={lineVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {line}
                    </motion.div>
                ))}
            </AnimatePresence>
        </Code>
    );
}

export default FinalDBTest;
