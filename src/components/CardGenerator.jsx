import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, RefreshCw, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ThemeSelector, { themes } from './ThemeSelector';
import CardPreview from './CardPreview';
import SantaAnimation from './SantaAnimation';
import confetti from 'canvas-confetti';
import InteractiveGift from './InteractiveGift';
import { getRandomMessage } from '../utils/messages';

const CardGenerator = () => {
    const [formData, setFormData] = useState({
        name: '',
        message: '',
        theme: 'gold'
    });
    const [isGenerated, setIsGenerated] = useState(false);
    const [showSantaAnimation, setShowSantaAnimation] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        // Set initial random message
        setFormData(prev => ({ ...prev, message: getRandomMessage() }));

        // Set up callback for Next button
        window.cardNextClick = () => {
            setShowSantaAnimation(true);
        };

        return () => {
            delete window.cardNextClick;
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleThemeSelect = (themeId) => {
        setFormData(prev => ({ ...prev, theme: themeId }));
    };

    const handleGenerate = () => {
        if (!formData.name) {
            alert('Please enter your name');
            return;
        }
        setIsGenerated(true);
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#d4af37', '#ffffff', '#fcd34d'],
            disableForReducedMotion: true
        });
    };

    const handleDownloadImage = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 3,
                useCORS: true
            });
            const link = document.createElement('a');
            link.download = `Christmas-Greeting-${formData.name}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    };

    const handleDownloadPDF = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, { scale: 3 });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, width, height);
            pdf.save(`Christmas-Greeting-${formData.name}.pdf`);
        }
    };

    const handleShare = () => {
        const text = `🎄 Merry Christmas! Check out my personalized greeting card! 🎅`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const handleTryAnother = () => {
        const currentIndex = themes.findIndex(t => t.id === formData.theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setFormData(prev => ({
            ...prev,
            theme: themes[nextIndex].id,
            message: getRandomMessage()
        }));
    };

    return (
        <div className="card-generator" style={{
            minHeight: '100vh',
            padding: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10
        }}>
            {showSantaAnimation && (
                <SantaAnimation 
                    recipientName={formData.name} 
                    onComplete={() => setShowSantaAnimation(false)}
                />
            )}
            <AnimatePresence mode="wait">
                {!isGenerated ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="glass-panel"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '3rem',
                            padding: '3rem',
                            maxWidth: '1200px',
                            width: '100%',
                            overflow: 'hidden',
                            alignItems: 'center'
                        }}
                    >
                        {/* Left Side: Interactive Gift */}
                        <div className="gift-container" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            borderRight: '1px solid rgba(212, 175, 55, 0.2)',
                            paddingRight: '2rem',
                            minHeight: '500px'
                        }}>
                            <InteractiveGift />
                        </div>

                        {/* Right Side: Form */}
                        <div className="form-container">
                            <h2 className="font-calligraphy text-gold" style={{
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                marginBottom: '3rem',
                                textAlign: 'center',
                                lineHeight: 1.2
                            }}>
                                Create Your<br />Greeting Card
                            </h2>

                            <div className="form-group" style={{ marginBottom: '2rem', position: 'relative' }}>
                                <label className="font-clean" style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#cbd5e1',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1px',
                                    textAlign: 'center'
                                }}>
                                    Enter Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    className="input-luxury"
                                    autoComplete="off"
                                />
                                <p className="font-clean" style={{
                                    marginTop: '1rem',
                                    fontSize: '0.8rem',
                                    color: '#94a3b8',
                                    textAlign: 'center',
                                    fontStyle: 'italic'
                                }}>
                                    From XI – Science will be added automatically
                                </p>
                            </div>

                            <ThemeSelector selectedTheme={formData.theme} onSelect={handleThemeSelect} />

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleGenerate}
                                className="btn-primary-gold"
                                style={{ width: '100%', marginTop: '3rem', justifyContent: 'center' }}
                            >
                                Generate Card
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2rem',
                            width: '100%',
                            maxWidth: '600px'
                        }}
                    >
                        <CardPreview ref={cardRef} data={formData} themeId={formData.theme} />

                        <div className="actions" style={{
                            display: 'flex',
                            gap: '1rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            marginTop: '1rem',
                            alignItems: 'center'
                        }}>
                            <motion.button
                                whileHover={{ scale: 1.15, y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDownloadImage}
                                className="glass-panel icon-twinkle"
                                style={{
                                    color: '#d4af37',
                                    border: '1.5px solid rgba(212, 175, 55, 0.4)',
                                    padding: '16px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(212, 175, 55, 0.08)',
                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                title="Download PNG"
                            >
                                <Download size={24} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.15, y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleDownloadPDF}
                                className="glass-panel icon-twinkle"
                                style={{
                                    color: '#d4af37',
                                    border: '1.5px solid rgba(212, 175, 55, 0.4)',
                                    padding: '16px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(212, 175, 55, 0.08)',
                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                title="Download PDF"
                            >
                                <FileText size={24} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.15, y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleShare}
                                className="glass-panel icon-twinkle"
                                style={{
                                    color: '#d4af37',
                                    border: '1.5px solid rgba(212, 175, 55, 0.4)',
                                    padding: '16px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(212, 175, 55, 0.08)',
                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.2)',
                                    transition: 'all 0.3s ease'
                                }}
                                title="Share on WhatsApp"
                            >
                                <Share2 size={24} />
                            </motion.button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleTryAnother}
                            className="btn-luxury"
                            style={{
                                padding: '12px 30px',
                                fontSize: '0.9rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                marginTop: '0.5rem'
                            }}
                        >
                            <RefreshCw size={16} />
                            Try Another Design
                        </motion.button>

                        <motion.button
                            onClick={() => setIsGenerated(false)}
                            className="font-clean"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#94a3b8',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: '0.9rem',
                                marginTop: '0.5rem'
                            }}
                        >
                            ← Back to Edit
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CardGenerator;
