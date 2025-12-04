import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export const themes = [
    {
        id: 'gold',
        name: 'Golden Elegance',
        bg: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        accent: '#d4af37',
        font: 'var(--font-script)',
        border: 'double 4px #d4af37'
    },
    {
        id: 'white',
        name: 'Snow-White Classic',
        bg: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        accent: '#1e293b',
        font: 'var(--font-main)',
        border: 'solid 3px #cbd5e1'
    },
    {
        id: 'red',
        name: 'Royal Red & Gold',
        bg: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%)',
        accent: '#fbbf24',
        font: 'var(--font-header)',
        border: 'solid 4px #fbbf24'
    },
    {
        id: 'blue',
        name: 'Deep Blue Night',
        bg: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)',
        accent: '#e2e8f0',
        font: 'var(--font-calligraphy)',
        border: 'dotted 3px #e2e8f0'
    },
    {
        id: 'tree',
        name: 'Christmas Tree',
        bg: 'linear-gradient(135deg, #064e3b 0%, #022c22 100%)',
        accent: '#fcd34d',
        font: 'var(--font-script)',
        border: 'dashed 3px #fcd34d'
    },
    {
        id: 'cozy',
        name: 'Candlelight Cozy',
        bg: 'linear-gradient(135deg, #78350f 0%, #431407 100%)',
        accent: '#fdba74',
        font: 'var(--font-signature)',
        border: 'solid 2px #fdba74'
    },
];

const ThemeSelector = ({ selectedTheme, onSelect }) => {
    return (
        <div className="theme-selector" style={{ marginTop: '2rem' }}>
            <label className="font-header" style={{
                display: 'block',
                marginBottom: '1rem',
                color: '#d4af37',
                letterSpacing: '1px',
                fontSize: '0.9rem',
                textAlign: 'center'
            }}>
                Select Card Theme
            </label>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                gap: '12px'
            }}>
                {themes.map((theme) => (
                    <motion.button
                        key={theme.id}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(theme.id)}
                        style={{
                            background: theme.bg,
                            border: selectedTheme === theme.id ? `2px solid #d4af37` : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            height: '70px',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: selectedTheme === theme.id ? '0 0 15px rgba(212, 175, 55, 0.3)' : '0 2px 8px rgba(0,0,0,0.2)',
                            transition: 'all 0.3s ease'
                        }}
                        title={theme.name}
                    >
                        {selectedTheme === theme.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    background: '#d4af37',
                                    borderRadius: '50%',
                                    width: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Check color="#0f172a" size={12} />
                            </motion.div>
                        )}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '4px',
                            fontSize: '0.65rem',
                            color: theme.id === 'white' ? '#0f172a' : '#fff',
                            background: 'rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(4px)',
                            textAlign: 'center',
                            fontFamily: 'var(--font-clean)'
                        }}>
                            {theme.name}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;
