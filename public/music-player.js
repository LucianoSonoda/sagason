/**
 * Sagason — Floating Ambient Music Player
 * Uso: <script src="/music-player.js"></script> en cualquier página HTML
 */
(function () {
  'use strict';

  const SRC     = '/music/theme.mp3';
  const TITLE   = 'Coordenadas de un abrazo';
  const DELAY   = 1200; // ms antes de mostrar el widget

  /* ── CSS ──────────────────────────────────────────────────────────── */
  const css = `
    #sgs-music-btn {
      position: fixed; bottom: 24px; left: 20px; z-index: 9000;
      display: flex; align-items: center; gap: 10px;
      opacity: 0; transform: translateY(12px);
      transition: opacity .5s ease, transform .5s ease;
      pointer-events: none; font-family: 'Inter', sans-serif;
    }
    #sgs-music-btn.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }

    #sgs-play-btn {
      width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
      border: 1px solid rgba(14,165,233,0.35);
      background: rgba(15,23,42,0.82);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      color: #0ea5e9; font-size: 14px; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 14px rgba(0,0,0,0.45);
      transition: all .3s ease;
    }
    #sgs-play-btn.on {
      background: rgba(14,165,233,0.18);
      box-shadow: 0 0 0 3px rgba(14,165,233,0.15), 0 4px 14px rgba(0,0,0,0.4);
    }

    #sgs-music-info {
      background: rgba(15,23,42,0.82);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(14,165,233,0.2);
      border-radius: 20px; padding: 6px 14px 6px 12px;
      max-width: 0; overflow: hidden; opacity: 0;
      transition: max-width .4s ease, opacity .3s ease;
      white-space: nowrap;
    }
    #sgs-music-info.on { max-width: 180px; opacity: 1; }

    #sgs-music-meta {
      display: flex; align-items: center; gap: 6px; margin-bottom: 4px;
    }
    #sgs-music-title {
      font-size: 11px; color: #94a3b8; letter-spacing: .01em;
    }
    #sgs-progress-track {
      height: 2px; background: rgba(14,165,233,0.15); border-radius: 2px; overflow: hidden;
    }
    #sgs-progress-fill {
      height: 100%; width: 0%; background: #0ea5e9; border-radius: 2px;
      transition: width .5s linear;
    }

    /* Equalizer bars */
    .sgs-bars { display: flex; align-items: flex-end; gap: 2px; height: 12px; }
    .sgs-bar  { width: 3px; background: #0ea5e9; border-radius: 1px; }
    .sgs-bar:nth-child(1) { animation: sgsEq1 .6s ease-in-out infinite alternate; }
    .sgs-bar:nth-child(2) { animation: sgsEq2 .6s ease-in-out infinite alternate .1s; }
    .sgs-bar:nth-child(3) { animation: sgsEq3 .6s ease-in-out infinite alternate .2s; }
    @keyframes sgsEq1 { from { transform: scaleY(.3); } to { transform: scaleY(1);   } }
    @keyframes sgsEq2 { from { transform: scaleY(.6); } to { transform: scaleY(.2);  } }
    @keyframes sgsEq3 { from { transform: scaleY(.4); } to { transform: scaleY(.9);  } }
  `;

  /* ── HTML ─────────────────────────────────────────────────────────── */
  function buildDOM() {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.id = 'sgs-music-btn';
    wrapper.innerHTML = `
      <audio id="sgs-audio" src="${SRC}" loop preload="metadata"></audio>
      <button id="sgs-play-btn" title="Reproducir música">▶</button>
      <div id="sgs-music-info">
        <div id="sgs-music-meta">
          <div class="sgs-bars">
            <div class="sgs-bar"></div>
            <div class="sgs-bar"></div>
            <div class="sgs-bar"></div>
          </div>
          <span id="sgs-music-title">${TITLE}</span>
        </div>
        <div id="sgs-progress-track">
          <div id="sgs-progress-fill"></div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);
  }

  /* ── Logic ────────────────────────────────────────────────────────── */
  function init() {
    buildDOM();

    const wrapper  = document.getElementById('sgs-music-btn');
    const audio    = document.getElementById('sgs-audio');
    const btn      = document.getElementById('sgs-play-btn');
    const info     = document.getElementById('sgs-music-info');
    const fill     = document.getElementById('sgs-progress-fill');

    let playing = false;
    let started = false;

    function setPlaying(on) {
      playing = on;
      btn.textContent = on ? '❚❚' : '▶';
      btn.classList.toggle('on', on);
      info.classList.toggle('on', on);
    }

    // Actualizar barra de progreso
    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        fill.style.width = ((audio.currentTime / audio.duration) * 100) + '%';
      }
    });

    // Botón manual
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        audio.play().then(() => setPlaying(true)).catch(() => {});
        started = true;
      }
    });

    // Auto-play en primer gesto del usuario
    function tryAutoplay() {
      if (started) return;
      started = true;
      audio.play().then(() => setPlaying(true)).catch(() => {});
      document.removeEventListener('click',      tryAutoplay);
      document.removeEventListener('touchstart', tryAutoplay);
      document.removeEventListener('keydown',    tryAutoplay);
    }
    document.addEventListener('click',      tryAutoplay);
    document.addEventListener('touchstart', tryAutoplay);
    document.addEventListener('keydown',    tryAutoplay);

    // Mostrar widget tras el delay
    setTimeout(() => wrapper.classList.add('visible'), DELAY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
