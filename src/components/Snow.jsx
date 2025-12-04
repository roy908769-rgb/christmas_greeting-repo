import React, { useEffect, useRef } from 'react';

const Snow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 120;

    class Particle {
      constructor(layer) {
        this.reset();
        this.layer = layer;
        this.isGolden = Math.random() > 0.95; // 5% chance of golden snowflake

        if (layer === 'large') {
          this.size = Math.random() * 4 + 3;
          this.vy = Math.random() * 0.5 + 0.3;
        } else if (layer === 'medium') {
          this.size = Math.random() * 3 + 2;
          this.vy = Math.random() * 0.8 + 0.5;
        } else {
          this.size = Math.random() * 2 + 1;
          this.vy = Math.random() * 1.2 + 0.8;
        }

        this.vx = Math.random() * 0.5 - 0.25;
        this.opacity = this.isGolden ? 0.8 : Math.random() * 0.4 + 0.2;
        this.swing = Math.random() * Math.PI * 2;
        this.swingSpeed = Math.random() * 0.01 + 0.005;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = -10;
      }

      update() {
        this.swing += this.swingSpeed;
        this.x += Math.sin(this.swing) * 0.5 + this.vx;
        this.y += this.vy;

        if (this.y > height) {
          this.reset();
        }
        if (this.x > width) {
          this.x = 0;
        }
        if (this.x < 0) {
          this.x = width;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        if (this.isGolden) {
          // Golden snowflake
          ctx.fillStyle = '#d4af37';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#d4af37';
        } else {
          // Regular white snowflake
          ctx.fillStyle = '#ffffff';
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
    }

    // Create three layers
    for (let i = 0; i < particleCount / 3; i++) {
      particles.push(new Particle('large'));
      particles.push(new Particle('medium'));
      particles.push(new Particle('small'));
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="snow-container"
      style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}
    />
  );
};

export default Snow;
