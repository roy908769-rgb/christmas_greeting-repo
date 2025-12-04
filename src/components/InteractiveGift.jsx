import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const InteractiveGift = () => {
    const [phase, setPhase] = useState('idle'); // idle | bounce | open | fade | done
    const [showCard, setShowCard] = useState(false);

    const handleOpen = () => {
        if (phase !== 'idle') return;

        // Phase 1: Bounce up
        setPhase('bounce');
        setTimeout(() => {
            // Phase 2: Lid opens
            setPhase('open');
            // Confetti burst
            confetti({
                particleCount: 120,
                spread: 120,
                origin: { y: 0.6, x: 0.25 },
                colors: ['#d4af37', '#ffd700', '#ffffff'],
                startVelocity: 45,
                gravity: 1.2,
                scalar: 1.2,
                ticks: 200,
            });
        }, 200); // 0.2s bounce

        // Phase 3: Fade out gift
        setTimeout(() => {
            setPhase('fade');
        }, 200 + 450); // after lid opens (0.45s)

        // Phase 4: Reveal card
        setTimeout(() => {
            setPhase('done');
            setShowCard(true);
        }, 200 + 450 + 500); // fade duration 0.5s
    };

    const boxVariants = {
        idle: { y: 0, opacity: 1, boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)' },
        bounce: { y: -8, transition: { duration: 0.2, ease: 'easeOut' }, boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)' },
        open: { rotateX: -30, transition: { duration: 0.45, ease: 'easeOut' } },
        fade: { opacity: 0, transition: { duration: 0.5 } },
    };

    const cardVariant = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
    };

    return (
        <div
            className="interactive-gift"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                minHeight: '400px',
                position: 'relative',
            }}
        >
            {/* Gift Box */}
            <AnimatePresence>
                {phase !== 'done' && (
                    <motion.div
                        key="gift"
                        variants={boxVariants}
                        initial="idle"
                        animate={phase}
                        exit="fade"
                        onClick={handleOpen}
                        style={{ cursor: 'pointer', perspective: '800px' }}
                    >
                        <motion.div
                            style={{
                                fontSize: '180px',
                                filter: 'drop-shadow(0 10px 30px rgba(212, 175, 55, 0.5))',
                                marginBottom: '1rem',
                            }}
                        >
                            🎁
                        </motion.div>
                        <motion.p
                            className="font-header"
                            style={{
                                color: '#d4af37',
                                fontSize: '1.3rem',
                                letterSpacing: '3px',
                                textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                            }}
                        >
                            TAP TO OPEN
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Card Reveal */}
            <AnimatePresence>
                {showCard && (
                    <motion.div
                        key="card"
                        variants={cardVariant}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="font-signature text-gold"
                        style={{
                            fontSize: 'clamp(4rem,8vw,6rem)',
                            lineHeight: 1.1,
                            marginTop: '2rem',
                            textShadow: '0 5px 15px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.3)',
                        }}
                    >
                        Merry<br />Christmas!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveGift;
