import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GiftReveal = ({ onComplete }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 500); // Auto open after 0.5s
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="gift-reveal" style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            pointerEvents: 'none' // Let clicks pass through if needed, but we want to block interaction until done
        }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 1.5 : 1 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'relative' }}
            >
                {/* Lid */}
                <motion.div
                    initial={{ y: 0, rotate: 0 }}
                    animate={isOpen ? { y: -100, rotate: -10, opacity: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{
                        width: '120px',
                        height: '30px',
                        background: '#d42426',
                        borderRadius: '4px',
                        position: 'absolute',
                        top: -30,
                        left: -10,
                        zIndex: 2,
                        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <div style={{ width: '20px', height: '100%', background: '#fbbf24' }}></div>
                </motion.div>

                {/* Box */}
                <motion.div
                    animate={isOpen ? { opacity: 0, scale: 1.2 } : {}}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                        width: '100px',
                        height: '100px',
                        background: '#ef4444',
                        borderRadius: '0 0 4px 4px',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                    }}
                >
                    <div style={{ width: '20px', height: '100%', background: '#fbbf24' }}></div>
                </motion.div>

                {/* Text Explosion */}
                {isOpen && (
                    <motion.h1
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1, y: -50 }}
                        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                        onAnimationComplete={() => setTimeout(onComplete, 1500)}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '300px',
                            textAlign: 'center',
                            fontFamily: 'var(--font-heading)',
                            color: 'var(--color-gold)',
                            textShadow: '0 0 20px rgba(251, 191, 36, 0.8)',
                            zIndex: 1
                        }}
                    >
                        Merry Christmas!
                    </motion.h1>
                )}
            </motion.div>
        </div>
    );
};

export default GiftReveal;
