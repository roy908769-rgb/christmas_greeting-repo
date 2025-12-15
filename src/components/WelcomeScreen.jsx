import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WelcomeScreen = ({ onEnter }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const musicPlayedRef = React.useRef(false);

    const rotateX = useTransform(y, [0, window.innerHeight], [2, -2]);
    const rotateY = useTransform(x, [0, window.innerWidth], [-2, 2]);

    const handleMouseMove = (e) => {
        x.set(e.clientX);
        y.set(e.clientY);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !musicPlayedRef.current) {
            musicPlayedRef.current = true;
            try {
                const musicUrl = '/christmas1.mp3';
                const music = new Audio(musicUrl);
                music.currentTime = 0;
                music.volume = 1.0;
                music.play().catch(err => console.log('Audio blocked:', err));
                console.log('Music started from Enter key');
            } catch (err) {
                console.warn('Error playing music:', err);
            }
            onEnter();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleEnter = () => {
        if (!musicPlayedRef.current) {
            musicPlayedRef.current = true;
            try {
                const musicUrl = '/christmas1.mp3';
                const music = new Audio(musicUrl);
                music.currentTime = 0;
                music.volume = 1.0;
                music.play().catch(err => console.log('Audio blocked:', err));
                console.log('Music started from Enter button');
            } catch (err) {
                console.warn('Error playing music:', err);
            }
        }
        onEnter();
    };

    return (
        <motion.div
            className="welcome-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            onMouseMove={handleMouseMove}
            style={{
                position: 'relative',
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                perspective: '1000px'
            }}
        >
            {/* Background Particles */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -150],
                            opacity: [0, 0.7, 0]
                        }}
                        transition={{
                            duration: Math.random() * 6 + 6,
                            repeat: Infinity,
                            ease: "linear",
                            delay: Math.random() * 3
                        }}
                        style={{
                            position: 'absolute',
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            background: '#d4af37',
                            borderRadius: '50%',
                            boxShadow: '0 0 12px #d4af37'
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <motion.div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    zIndex: 10,
                    rotateX,
                    rotateY
                }}
            >
                {/* Glowing Wreath/Tree */}
                <motion.div
                    initial={{ scale: 0.7, opacity: 0, filter: 'blur(15px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 2.5, ease: "easeOut" }}
                    style={{ marginBottom: '3rem', position: 'relative' }}
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        style={{
                            fontSize: '140px',
                            filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.6))',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        🎄
                    </motion.div>

                    {/* Glow behind */}
                    <motion.div
                        animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.15, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '280px',
                            height: '280px',
                            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                    />
                </motion.div>

                {/* Title - Premium Styling */}
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="font-signature"
                    style={{
                        fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                        textAlign: 'center',
                        marginBottom: '1rem',
                        lineHeight: 1.1,
                        background: 'linear-gradient(135deg, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% auto',
                        animation: 'shine 4s linear infinite',
                        textShadow: '0 5px 15px rgba(212, 175, 55, 0.4)',
                        filter: 'drop-shadow(0 8px 20px rgba(212, 175, 55, 0.3))',
                        position: 'relative'
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
                        filter: 'blur(30px)',
                        zIndex: -1
                    }} />
                    Welcome to the<br />Christmas Greeting Studio
                </motion.h1>

                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ delay: 1.8, duration: 1.2 }}
                    style={{
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                        marginBottom: '2rem',
                        boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                    }}
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="font-clean"
                    style={{
                        fontSize: '1.2rem',
                        color: '#cbd5e1',
                        marginBottom: '3.5rem',
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    Tap to Begin the Magic
                </motion.p>

                <motion.button
                    onClick={handleEnter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.3, duration: 0.8 }}
                    whileHover={{ scale: 1.08, letterSpacing: '5px' }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-luxury"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        fontSize: '1.3rem',
                        padding: '20px 70px',
                        background: 'rgba(212, 175, 55, 0.08)',
                        boxShadow: '0 0 30px rgba(212, 175, 55, 0.2)'
                    }}
                >
                    <Sparkles size={22} />
                    Enter
                    <Sparkles size={22} />
                </motion.button>
            </motion.div>

            {/* Made by Satyam - Bottom Center */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8, duration: 1.2 }}
                style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                }}
            >
                <span className="font-header" style={{
                    color: '#d4af37',
                    fontSize: '1rem',
                    letterSpacing: '3px',
                    textShadow: '0 0 15px rgba(212, 175, 55, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                }}>
                    <motion.span
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ⭐
                    </motion.span>
                    Made by Satyam
                </span>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60px' }}
                    transition={{ delay: 3.2, duration: 0.8 }}
                    style={{
                        height: '2px',
                        background: '#d4af37',
                        boxShadow: '0 0 8px #d4af37'
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default WelcomeScreen;
