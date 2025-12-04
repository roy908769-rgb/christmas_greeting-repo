import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/santa-animation.css';

const SantaAnimation = ({ recipientName, onComplete }) => {
    const [showGreeting, setShowGreeting] = useState(false);
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        // Start animation immediately
        setAnimating(true);

        // Show greeting after sleigh animation completes (6 seconds)
        const timer = setTimeout(() => {
            setShowGreeting(true);
            setAnimating(false);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="santa-screen"
            style={{
                position: 'fixed',
                inset: 0,
                background: 'linear-gradient(135deg, #2a0e0e, #150606)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                zIndex: 9999,
                flexDirection: 'column'
            }}
        >
            {/* Santa Sleigh Animation Container */}
            {animating && (
                <div className="santa-container" id="santaContainer">
                    <div className="santa-fly" id="santaFly">
                        🎅🎄🦌
                    </div>
                </div>
            )}

            {/* Final Greeting Text */}
            {showGreeting && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{
                        textAlign: 'center',
                        zIndex: 20
                    }}
                >
                    <motion.h1
                        className="font-signature"
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 5rem)',
                            color: '#eac46f',
                            margin: 0,
                            letterSpacing: 2,
                            textShadow: '0 0 18px gold',
                            fontFamily: '"Great Vibes", cursive, serif'
                        }}
                    >
                        Merry Christmas
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="font-signature"
                        style={{
                            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                            color: '#eac46f',
                            margin: '1rem 0 0 0',
                            letterSpacing: 1,
                            textShadow: '0 0 12px rgba(234, 196, 111, 0.8)'
                        }}
                    >
                        {recipientName} 🎄
                    </motion.p>
                </motion.div>
            )}

            {/* Close Button */}
            {showGreeting && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={onComplete}
                    style={{
                        position: 'absolute',
                        bottom: '30px',
                        padding: '12px 30px',
                        border: '2px solid #eac46f',
                        background: 'transparent',
                        color: '#eac46f',
                        fontSize: '1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        zIndex: 20
                    }}
                    onHover={{ background: '#eac46f', color: '#2a0e0e' }}
                >
                    ← Back
                </motion.button>
            )}
        </motion.div>
    );
};

export default SantaAnimation;