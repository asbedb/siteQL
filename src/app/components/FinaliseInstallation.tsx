import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Button } from '@nextui-org/react';
import { FinalInstallCheckProps } from '@/types/types';

const FinaliseInstallation: React.FC<FinalInstallCheckProps> = ({ finalInstallCheck, setDisableBtn }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleIndex, setVisibleIndex] = useState(0);
    const [results, setResults] = useState<[]>([]);
    const [status, setStatus] = useState<string | null>(null);
    const [runInstallBtnDisable, setRunInstallButtonDisable] = useState<boolean>(false)

    const handleCheck = async () => {
        try {
            setStatus('Running installation check...');
            setRunInstallButtonDisable(true)
            setResults([])
            setVisibleIndex(0)
            setDisableBtn(true)
            const response = await finalInstallCheck();
            setTimeout(()=>{
                setResults(response.codeLines); // Set the results from the response
                setTimeout(()=>{
                    setStatus('Installation Check Complete - Passed!');
                    setDisableBtn(!response.allChecksPass);
                    setRunInstallButtonDisable(false)
                },10000)
            },1000)

            
        } catch (error) {
            setStatus('Installation check failed');
            console.error(error);
            setDisableBtn(true);
        }
    };

    // Simulate animated lines appearance
    useEffect(() => {
        if (visibleIndex >= results.length) return;

        const timer = setTimeout(() => {
            setVisibleIndex((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [visibleIndex, results.length]);

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
        <div className="w-full p-4 text-left">
            <Button
                onClick={handleCheck}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                isDisabled={runInstallBtnDisable}
            >
                Run Final Install Check
            </Button>

            {status && (
                <div className="text-sm mb-2">
                    <p>Status: {status}</p>
                </div>
            )}
                <Code
                    ref={containerRef}
                    className="w-full px-4 py-2 leading-4 rounded-xl overflow-y-auto h-[300px] bg-blue-950 text-yellow-300 scroll-auto border-2 border-primary-100"
                >
                    <AnimatePresence>
                        {results && results.slice(0, visibleIndex).map((line, index) => (
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
        </div>
    );
};

export default FinaliseInstallation;
