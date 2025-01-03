import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from '@nextui-org/react';
import { FinalInstallCheckProps, FinalInstallCheckQueryResult} from '@/types/types';

const FinalDBTest: React.FC<FinalInstallCheckProps> = ({ finalInstallCheck }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [results, setResults] = useState<FinalInstallCheckQueryResult[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Simulated code lines for animation
    const codeLines = results.map(
        (result) => `${result.codeLines}`
    );

    // Check if all checks passed
    const allChecksPass = results.every((result) => result.allChecksPass === true);

    const handleCheck = async () => {
        try {
            setErrorMessage(null); // Reset error
            const response = await finalInstallCheck();
            setResults(response.codeLines);
        } catch (error) {
            setErrorMessage('Failed to complete installation check.');
            console.error(error);
        }
    };

    // Simulate animated lines appearance
    useEffect(() => {
        if (visibleIndex >= codeLines.length) return;

        const timer = setTimeout(() => {
            setVisibleIndex((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [visibleIndex, codeLines.length]);

    // Scroll container when new lines appear
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
            <button
                onClick={handleCheck}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Run Final Install Check
            </button>

            {errorMessage && (
                <div className="text-red-500 mb-4">
                    Error: {errorMessage}
                </div>
            )}

            {status && (
                <div className="text-sm mb-2">
                    <p>Status: {status}</p>
                    {allChecksPass && <p>Connection Status: {allChecksPass}</p>}
                </div>
            )}

            {allChecksPass ? (
                <Code
                    ref={containerRef}
                    className="w-full px-4 py-2 leading-4 rounded-xl overflow-y-auto h-[300px] bg-blue-950 text-yellow-300 scroll-auto border-2 border-primary-100"
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
