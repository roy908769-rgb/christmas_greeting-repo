import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, Sparkles, PartyPopper, Music } from 'lucide-react';
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

    useEffect(() => {
        if (showGreeting) {
            // FIREWORKS CELEBRATION
            const duration = 8 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 10001, colors: ['#ff0000', '#00ff00', '#ffffff', '#d4af37'] };

            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            // Initial burst
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                zIndex: 10001
            });

            // Ongoing fireworks
            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Sky shots
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 350);

            return () => clearInterval(interval);
        }
    }, [showGreeting]);

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
                overflow: 'auto',
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

            {/* Final Greeting Text with Celebration Effects */}
            {showGreeting && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                        position: 'relative',
                        minHeight: '100vh',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 20,
                        padding: '40px 0'
                    }}
                >
                    {/* Background Twinkling Stars */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0.2, scale: 0.5 }}
                                animate={{ opacity: [0.2, 1, 0.2], scale: [0.5, 1.2, 0.5] }}
                                transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
                                style={{
                                    position: 'absolute',
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    width: Math.random() * 3 + 1 + 'px',
                                    height: Math.random() * 3 + 1 + 'px',
                                    background: '#fff',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 5px #fff'
                                }}
                            />
                        ))}
                    </div>

                    {/* Snowfall Overlay */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
                        {[...Array(60)].map((_, i) => (
                            <motion.div
                                key={`snow-${i}`}
                                initial={{ y: -10, x: Math.random() * window.innerWidth, opacity: 0 }}
                                animate={{ y: window.innerHeight + 20, opacity: [0, 0.8, 0] }}
                                transition={{
                                    duration: Math.random() * 5 + 4,
                                    repeat: Infinity,
                                    delay: Math.random() * 5,
                                    ease: 'linear'
                                }}
                                style={{
                                    position: 'absolute',
                                    width: Math.random() * 4 + 2 + 'px',
                                    height: Math.random() * 4 + 2 + 'px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    filter: 'blur(1px)'
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', bounce: 0.5, duration: 1.5 }}
                        style={{
                            textAlign: 'center',
                            position: 'relative',
                            padding: '40px',
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '30px',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Decorative Elements */}
                        <motion.div
                            animate={{ rotate: [0, 15, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            style={{ position: 'absolute', top: '-13%', left: '-5%', color: '#d4af37' }}
                        >
                            <Sparkles size={64} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: [0, -15, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                            style={{ position: 'absolute', bottom: '-10%', right: '-5%', color: '#d4af37' }}
                        >
                            <PartyPopper size={56} />
                        </motion.div>

                        <motion.h1
                            className="font-signature"
                            style={{
                                fontSize: 'clamp(4rem, 10vw, 7rem)',
                                background: 'linear-gradient(to bottom, #fff, #eac46f)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                margin: 0,
                                lineHeight: 1.1,
                                filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.5))'
                            }}
                        >
                            Merry<br />Christmas
                        </motion.h1>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                            style={{
                                height: '3px',
                                background: 'radial-gradient(circle, #d4af37, transparent)',
                                margin: '20px auto',
                                width: '60%'
                            }}
                        />

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, type: 'spring' }}
                            className="font-header"
                            style={{
                                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                                color: '#d4af37',
                                margin: 0,
                                textShadow: '0 0 20px rgba(212, 100, 55, 0.6)',
                                letterSpacing: '4px'
                            }}
                        >
                            {recipientName}
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2.5 }}
                            style={{ marginTop: '20px', color: '#fff', fontSize: '1.2rem', display: 'flex', gap: '10px', justifyContent: 'center' }}
                        >
                            <span>🎄</span> Wishing you joy & happiness! <span>🎁</span>
                        </motion.div>
                    </motion.div>
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