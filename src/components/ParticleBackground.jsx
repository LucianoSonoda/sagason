import React, { useEffect, useRef } from 'react';

export function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    const particleCount = 450; // Densidad ideal para fondo de sitio web (equilibrio estética/rendimiento)
    let animationFrameId;

    const mouse = {
      x: null,
      y: null,
      radius: 140, // Radio del campo de repulsión
    };

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.baseSize = Math.random() * 1.5 + 1.0; // Partículas más finas para no distraer del contenido
        this.size = this.baseSize;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.2 + 0.05;
        this.driftSpeed = 0.002 + Math.random() * 0.005;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.94;
        this.ease = 0.06;
        
        // Color HSL inicial (Azul de Google / Sagason primary tone)
        this.hue = 217;
        this.saturation = 80;
        this.lightness = 55;
        this.alpha = Math.random() * 0.35 + 0.15;
      }

      update() {
        // 1. Movimiento orgánico (corriente de fluido)
        this.angle += this.driftSpeed;
        const driftX = Math.cos(this.angle) * 0.3;
        const driftY = Math.sin(this.angle * 1.2) * 0.3;
        
        this.baseX += driftX;
        this.baseY += driftY;

        // Mantener dentro de los bordes
        if (this.baseX < -20) this.baseX = canvas.width + 20;
        if (this.baseX > canvas.width + 20) this.baseX = -20;
        if (this.baseY < -20) this.baseY = canvas.height + 20;
        if (this.baseY > canvas.height + 20) this.baseY = -20;

        // 2. Interacción con el cursor (repulsión y cambio de color)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            
            const pushX = Math.cos(angle) * force * 5.0;
            const pushY = Math.sin(angle) * force * 5.0;
            
            this.vx += pushX;
            this.vy += pushY;
            
            this.size = this.baseSize * (1 + force * 2.0);
            
            // Transición dinámica a tonos cálidos (rojo/amarillo al reaccionar)
            const targetHue = 355 + Math.sin(this.angle) * 45;
            this.hue = this.hue + (targetHue - this.hue) * 0.12;
            this.lightness = 55 + force * 15;
            this.alpha = 0.75;
          } else {
            // Retorno suave al estado inicial
            this.size += (this.baseSize - this.size) * 0.08;
            this.hue += (217 - this.hue) * 0.04;
            this.lightness += (55 - this.lightness) * 0.04;
            this.alpha += ( (Math.random() * 0.35 + 0.15) - this.alpha ) * 0.04;
          }
        } else {
          // Retorno si no hay mouse en pantalla
          this.size += (this.baseSize - this.size) * 0.08;
          this.hue += (217 - this.hue) * 0.04;
          this.lightness += (55 - this.lightness) * 0.04;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx + (this.baseX - this.x) * this.ease;
        this.y += this.vy + (this.baseY - this.y) * this.ease;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Queda detrás del contenido pero encima del mapa base (z-index: -2)
        pointerEvents: 'none',
      }}
    />
  );
}
