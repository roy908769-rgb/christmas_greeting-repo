import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { themes } from './ThemeSelector';

const GOLD = '#EAC46F';

const CardPreview = forwardRef(({ data = {}, themeId }, ref) => {
    const theme = themes.find(t => t.id === themeId) || themes[0];

    const styles = {
        background: theme.bg,
        color: theme.accent,
        border: theme.border,
        fontFamily: theme.font
    };

    return (
        <div className="card-perspective" style={{
            perspective: '1500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
                style={{ position: 'relative', marginBottom: '2rem' }}
            >
                <div style={{
                    width: 120,
                    height: 120,
                    borderRadius: 12,
                    border: '2.5px solid #d4af37',
                    background: 'linear-gradient(to bottom, #0a1128, transparent)',
                    boxShadow: '0 0 20px rgba(0,0,0,0.25), 0 0 20px rgba(212, 175, 55, 0.2)',
                    padding: 15,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'visible'
                }}>
                    {/* Top-left star icon */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            top: '-18px',
                            left: '-18px',
                            fontSize: '28px',
                            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
                            zIndex: 5
                        }}
                    >
                        ⭐
                    </motion.div>

                    {/* Top-right snowflake icon */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            top: '-18px',
                            right: '-18px',
                            fontSize: '28px',
                            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
                            zIndex: 5
                        }}
                    >
                        ❄️
                    </motion.div>

                    {/* Bottom-left Christmas tree icon */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            position: 'absolute',
                            bottom: '-18px',
                            left: '-18px',
                            fontSize: '28px',
                            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
                            zIndex: 5
                        }}
                    >
                        🎄
                    </motion.div>

                    {/* Bottom-right Santa icon */}
                    <motion.div
                        animate={{ y: [0, -8, 0], rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            fontSize: 56,
                            position: 'absolute',
                            bottom: '-25px',
                            right: '-10px',
                            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
                            zIndex: 10
                        }}
                    >
                        🎅
                    </motion.div>

                    {/* Center Christmas tree icon */}
                    <motion.div
                        animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            fontSize: 50,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 8
                        }}
                    >
                        🎄
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                ref={ref}
                className="christmas-card glass-panel shimmer-once"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.2, type: 'spring', bounce: 0.3, delay: 0.5 }}
                style={{
                    width: '100%',
                    maxWidth: 450,
                    aspectRatio: '3/4',
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    ...styles
                }}
            >
                <div style={{ position: 'absolute', inset: 20, border: '1.5px solid rgba(212, 175, 55, 0.3)', pointerEvents: 'none', borderRadius: 8 }} />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1 }}
                    style={{
                        width: '100%',
                        zIndex: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '0px',
                        paddingTop: 0,
                        paddingBottom: '2.5rem'
                    }}
                >
                    <motion.div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1.6 }}
                            className="font-signature"
                            style={{
                                color: GOLD,
                                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                                lineHeight: 1.3,
                                marginTop: 60,
                                marginBottom: 0,
                                textAlign: 'center',
                                paddingInline: 24,
                                maxWidth: '90%'
                            }}
                        >
                            {data.message}
                        </motion.p>
                    </motion.div>

                    <div style={{ marginTop: 40, width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ textAlign: 'center', display: 'inline-block', padding: '6px 12px' }}>
                            <div style={{ borderTop: `1px solid ${GOLD}`, borderBottom: `1px solid ${GOLD}`, padding: '6px 0' }}>
                                <span style={{ color: GOLD, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontVariant: 'small-caps' }}>From XI – Science</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 18, width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <span style={{ color: theme.accent || '#ffffff', fontSize: 12, opacity: 0.9 }}>To:</span>
                    </div>

                    {data.name && (
                        <div style={{ marginTop: 24, width: '100%', display: 'flex', justifyContent: 'center', paddingInline: 20 }}>
                            <motion.div
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ delay: 1.8, duration: 1.5 }}
                                className="font-signature"
                                style={{
                                    fontSize: 'clamp(2.2rem, 5vw, 3rem)',
                                    color: GOLD,
                                    textAlign: 'center',
                                    maxWidth: '90%'
                                }}
                            >
                                {data.name}
                            </motion.div>
                        </div>
                    )}
                </motion.div>

                <motion.div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>⭐</motion.span>
                    <span style={{ fontSize: 12, opacity: 0.9 }}>Made by Satyam</span>
                    <motion.span animate={{ rotate: -360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}>⭐</motion.span>
                </motion.div>
            </motion.div>

            {/* Next Button - positioned below card */}
            <motion.button id="nextBtn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.cardNextClick?.()}
                style={{
                    marginTop: 20,
                    padding: '12px 28px',
                    border: '1.5px solid #EAC46F',
                    background: 'transparent',
                    color: '#EAC46F',
                    fontSize: '1rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: '0.3s all',
                    fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = '#EAC46F';
                    e.target.style.color = '#2a0e0e';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#EAC46F';
                }}
            >
                Next →
            </motion.button>
        </div>
    );
});

export default CardPreview;
