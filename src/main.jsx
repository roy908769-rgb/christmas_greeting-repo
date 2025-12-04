import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// DOM wiring for Santa animation Next button
window.addEventListener('load', () => {
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const santa = document.getElementById('santaContainer');
      if (!santa) return;
      // start CSS keyframe animation
      santa.style.animation = 'flyAcross 6s linear forwards';

      setTimeout(() => {
        // call showGreetingScreen if available
        if (typeof window.showGreetingScreen === 'function') {
          window.showGreetingScreen();
        }
      }, 6000);
    });
  }
});
