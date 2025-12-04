import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from './components/WelcomeScreen';
import CardGenerator from './components/CardGenerator';
import Snow from './components/Snow';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnter = () => {
    setShowWelcome(false);
  };

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      <Snow />

      {/* Global Watermark - Always Visible */}
      <motion.div
        className="global-watermark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Made by Satyam
      </motion.div>

      <AnimatePresence mode="wait">
        {showWelcome ? (
          <WelcomeScreen key="welcome" onEnter={handleEnter} />
        ) : (
          <CardGenerator key="generator" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
