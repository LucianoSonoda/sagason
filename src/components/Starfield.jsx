import React, { useRef, useEffect } from 'react';

export function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let stars = [];
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor(window.innerWidth / 4); // Adjusted count based on viewport
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          velY: (Math.random() * 0.2) + 0.05, // Moving upwards slowly
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          fadingIn: Math.random() > 0.5,
          baseAlphaStep: 0.005 + (Math.random() * 0.01)
        });
      }
    };

    const runRender = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        
        star.y -= star.velY;
        
        if (star.fadingIn) {
          star.alpha += star.baseAlphaStep;
          if (star.alpha >= Math.random() * 0.5 + 0.5) star.fadingIn = false;
        } else {
          star.alpha -= star.baseAlphaStep;
          if (star.alpha <= 0.05) star.fadingIn = true;
        }

        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      }
      
      animationFrameId = requestAnimationFrame(runRender);
    };

    window.addEventListener('resize', resize);
    
    // Initial call
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    runRender();

    return () => {
      window.removeEventListener('resize', resize);
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
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none', // So it doesn't block interactions
        background: 'transparent'
      }}
    />
  );
}
