import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from '@nextui-org/react';

const FinalDBTest = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [codeLines, setCodeLines] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [allChecksPass, setAllChecksPass] = useState(false); // Use state for allChecksPass

    
    // Fetch API data on component mount
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const response = await fetch('/api/connections/finalInstallCheck');
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.statusText}`);
                }
                const data = await response.json();
                setAllChecksPass(data.allChecksPass); // Set the allChecksPass state
                const fetchedLines = data.results.map(
                    (result: { check: string; status: string; message: string }) =>
                        `-- ${result.check}: ${result.status.toUpperCase()} - ${result.message}`
                );
                
                setCodeLines(fetchedLines);
            } catch (error) {
                setErrorMessage((error as Error).message);
            }
        };
        fetchAPI();
    }, []);

    useEffect(() => {
        if (visibleIndex >= codeLines.length) return;

        const timer = setTimeout(() => {
            setVisibleIndex((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [visibleIndex, codeLines.length]);

    useEffect(() => {
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
        <div className="w-full">
            {errorMessage && (
                <div className="text-red-500 mb-4">
                    Error: {errorMessage}
                </div>
            )}

            {allChecksPass ? (
                <Code
                    ref={containerRef}
                    className="w-full px-4 py-2 leading-4 rounded-xl overflow-y-hidden h-[300px] bg-blue-950 text-yellow-300 scroll-auto border-2 border-primary-100"
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
            ) : (
                <div className="text-red-500 mb-4">Installation checks failed.</div>
            )}
        </div>
    );
};

export default FinalDBTest;
