import React, { useRef, useState, useEffect } from 'react';

/**
 * Floating ambient music player — Coordenadas de un abrazo
 * • Intenta reproducir al primer gesto del usuario (click/touch)
 * • Botón flotante discreto en la esquina inferior izquierda
 * • Barra de progreso y animación de onda cuando está activo
 */
export function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying]   = useState(false);
  const [started, setStarted]   = useState(false); // ¿el usuario ya interactuó?
  const [visible, setVisible]   = useState(false); // mostrar player después de carga
  const [progress, setProgress] = useState(0);

  // Mostrar el widget tras 1s para no interferir con la carga inicial
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(t);
  }, []);

  // Actualizar barra de progreso
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const tick = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    audio.addEventListener('timeupdate', tick);
    return () => audio.removeEventListener('timeupdate', tick);
  }, []);

  // Intentar play al primer evento de usuario en el documento
  useEffect(() => {
    if (started) return;
    const tryPlay = () => {
      if (started) return;
      const audio = audioRef.current;
      if (!audio) return;
      audio.play()
        .then(() => { setPlaying(true); setStarted(true); })
        .catch(() => { /* el usuario puede presionar manualmente */ });
      document.removeEventListener('click',     tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown',   tryPlay);
    };
    document.addEventListener('click',     tryPlay);
    document.addEventListener('touchstart', tryPlay);
    document.addEventListener('keydown',   tryPlay);
    return () => {
      document.removeEventListener('click',     tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown',   tryPlay);
    };
  }, [started]);

  const toggle = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => { setPlaying(true); setStarted(true); });
    }
  };

  return (
    <>
      {/* Audio element — loop, volumen suave */}
      <audio ref={audioRef} src="/music/theme.mp3" loop preload="metadata" style={{ display: 'none' }} />

      {/* Widget flotante */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          left: '20px',
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity .5s ease, transform .5s ease',
          pointerEvents: visible ? 'auto' : 'none',
        }}
      >
        {/* Botón play/pause */}
        <button
          onClick={toggle}
          title={playing ? 'Pausar música' : 'Reproducir música'}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: '1px solid rgba(14,165,233,0.35)',
            background: playing
              ? 'rgba(14,165,233,0.18)'
              : 'rgba(15,23,42,0.80)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#0ea5e9',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: playing
              ? '0 0 0 3px rgba(14,165,233,0.15), 0 4px 14px rgba(0,0,0,0.4)'
              : '0 4px 14px rgba(0,0,0,0.4)',
            transition: 'all .3s ease',
            flexShrink: 0,
          }}
        >
          {playing ? '❚❚' : '▶'}
        </button>

        {/* Info + barra de progreso */}
        <div
          style={{
            background: 'rgba(15,23,42,0.80)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: '20px',
            padding: '6px 14px 6px 12px',
            maxWidth: playing ? '170px' : '0',
            overflow: 'hidden',
            opacity: playing ? 1 : 0,
            transition: 'max-width .4s ease, opacity .3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            {/* Ondas animadas */}
            <Bars />
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'Inter, sans-serif', letterSpacing: '.01em' }}>
              Coordenadas de un abrazo
            </span>
          </div>
          {/* Barra de progreso */}
          <div style={{ height: '2px', background: 'rgba(14,165,233,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${progress * 100}%`,
                background: '#0ea5e9',
                borderRadius: '2px',
                transition: 'width .5s linear',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* Barras de ecualizador animadas */
function Bars() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '12px' }}>
      {[1, 2, 3].map(i => (
        <div
          key={i}
          style={{
            width: '3px',
            height: '100%',
            background: '#0ea5e9',
            borderRadius: '1px',
            animation: `eq${i} .6s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes eq1 { from { transform: scaleY(.3); } to { transform: scaleY(1); } }
        @keyframes eq2 { from { transform: scaleY(.6); } to { transform: scaleY(.2); } }
        @keyframes eq3 { from { transform: scaleY(.4); } to { transform: scaleY(.9); } }
      `}</style>
    </div>
  );
}
