import React, { useState, useRef } from 'react';
import { Search, Loader2, Scissors, History, ShieldCheck, Zap, Mail, RefreshCw } from 'lucide-react';
import { generateHeraldryConcepts, generateStickerImage } from '../services/heraldryService';

// Tipos de Estado del Agente simulados en const
const AgentState = {
  IDLE: 'IDLE',
  HISTORIAN: 'HISTORIADOR',
  DESIGNER: 'DISEÑADOR',
  AUDITOR: 'AUDITOR',
  GENERATING_IMAGE: 'GENERANDO',
  COMPLETED: 'COMPLETADO',
  ERROR: 'ERROR'
};

export function LaserSticker() {
  const [place, setPlace] = useState('');
  const [specificDetail, setSpecificDetail] = useState('');
  const [state, setState] = useState(AgentState.IDLE);
  const [results, setResults] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [emailStatus, setEmailStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  
  const formRef = useRef(null);
  const fileInputRef = useRef(null);
  const jsonInputRef = useRef(null);

  // Convierte un base64 a Archivo File para usar con FormSubmit
  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const sendEmailViaFormSubmit = (currentResults, currentImages, searchTarget, detailTarget) => {
    setEmailStatus('sending');
    const combinedPlace = detailTarget ? `${detailTarget} en ${searchTarget}` : searchTarget;
    
    try {
        const dt = new DataTransfer();
        currentImages.forEach((base64, index) => {
            if (base64) {
                const file = base64ToFile(base64, `opcion-${index + 1}.png`);
                dt.items.add(file);
            }
        });

        if (fileInputRef.current) {
            fileInputRef.current.files = dt.files;
        }

        // Preparamos un string detallado con los resultados para que el correo sea legible
        let finalReport = `Reporte de Síntesis Heráldica para: ${combinedPlace}\n\n`;
        currentResults.forEach((r, i) => {
            finalReport += `--- Opción ${i+1}: ${r.elemento_identificado} ---\n`;
            finalReport += `Justificación: ${r.justificacion_tecnica}\n`;
            finalReport += `Análisis: ${r.analisis_detalle}\n`;
            finalReport += `Prompt: ${r.visual_prompt}\n\n`;
        });

        jsonInputRef.current.value = finalReport;

        formRef.current.submit();

        setTimeout(() => {
            setEmailStatus('sent');
        }, 1500);

    } catch(err) {
        console.error("Error adjuntando a FormSubmit", err);
        setEmailStatus('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError(null);
    setResults([]);
    setImages([]);
    setEmailStatus('idle');
    
    const searchTarget = place.trim() || "Common Visited Places";
    const detailTarget = specificDetail.trim();

    try {
      setState(AgentState.HISTORIAN);
      const concepts = await generateHeraldryConcepts(searchTarget, detailTarget);
      setResults(concepts);
      
      setState(AgentState.DESIGNER);
      await new Promise(r => setTimeout(r, 1000));
      
      setState(AgentState.AUDITOR);
      await new Promise(r => setTimeout(r, 1000));
      
      setState(AgentState.GENERATING_IMAGE);
      // Generate 3 images in parallel
      const imageUrls = await Promise.all(concepts.map(c => generateStickerImage(c.visual_prompt)));
      setImages(imageUrls);
      
      setState(AgentState.COMPLETED);
      
      // Enviar resultados al propietario vía FormSubmit invisible
      sendEmailViaFormSubmit(concepts, imageUrls, searchTarget, detailTarget);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during synthesis');
      setState(AgentState.ERROR);
    }
  };

  const currentAgentInfo = () => {
    switch (state) {
      case AgentState.HISTORIAN: return { icon: History, text: 'AGENTE HISTORIADOR: Analizando 3 conceptos...', color: 'text-blue-400' };
      case AgentState.DESIGNER: return { icon: Scissors, text: 'AGENTE DISEÑADOR: Vectorizando formas...', color: 'text-orange-400' };
      case AgentState.AUDITOR: return { icon: ShieldCheck, text: 'AGENTE AUDITOR: Validando compatibilidad...', color: 'text-green-400' };
      case AgentState.GENERATING_IMAGE: return { icon: Zap, text: 'GENERADOR: Renderizando renders 2D...', color: 'text-yellow-400' };
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#000', color: '#fff', fontFamily: 'monospace' }}>
      {/* Hidden Invisible Form para FormSubmit */}
      <iframe name="hidden_iframe_laser" style={{display: "none"}}></iframe>
      <form ref={formRef} action="https://formsubmit.co/brluson@gmail.com" method="POST" target="hidden_iframe_laser" encType="multipart/form-data" style={{display: 'none'}}>
          <input type="hidden" name="_subject" value={`SÍNTESIS VIRTUAL: ${place}`} />
          <input type="hidden" name="_captcha" value="false" />
          <input type="file" name="imagenes[]" ref={fileInputRef} multiple />
          <textarea name="Resultados_Json" ref={jsonInputRef}></textarea>
      </form>

      <header style={{ borderBottom: '1px solid #333', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#666' }}>Orquestación de Diseño Industrial</h2>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', margin: 0 }}>Síntesis Visual // Láser & Sticker</h1>
        </div>
        <div style={{ textAlign: 'right', fontSize: '10px', color: '#888' }}>
          <p>STATUS: {state === AgentState.IDLE ? 'READY_FOR_SYNTHESIS' : state}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', color: '#f59e0b', marginTop: '4px' }}>
            {emailStatus === 'sending' && <Loader2 size={10} style={{ animation: 'spin 1s linear infinite' }} />}
            {emailStatus === 'sent' && <Mail size={10} color="#10b981" />}
            {emailStatus === 'error' && <Mail size={10} color="#ef4444" />}
            <span style={{ opacity: 0.7, color: emailStatus === 'sent' ? '#10b981' : emailStatus === 'error' ? '#ef4444' : 'inherit' }}>
              EMAIL_BACKUP: {emailStatus.toUpperCase()}
            </span>
          </div>
        </div>
      </header>

      <main style={{ flexGrow: 1, padding: '2rem', overflowY: 'auto' }}>
        {state === AgentState.IDLE || state === AgentState.ERROR ? (
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '4rem' }}>
            <div style={{ marginBottom: '3rem' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#f59e0b', display: 'block', marginBottom: '1rem' }}>● System_Initialization</span>
              <h2 style={{ fontSize: '4rem', fontWeight: '900', textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.05em', color: '#fff', marginBottom: '1.5rem' }}>
                CIUDAD Y DETALLE,<br/>NADA DE INVENTOS
              </h2>
              <p style={{ maxWidth: '28rem', color: '#888', fontStyle: 'italic', fontSize: '1.125rem', lineHeight: 1.6 }}>
                Genera variantes heráldicas verídicas. Si el detalle no existe en el lugar, el sistema denegará la síntesis.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <input 
                  type="text" 
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="NOMBRE DEL LUGAR (EJ: BARCELONA)"
                  style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '1.5rem', borderRadius: '4px', fontSize: '1.25rem', color: '#fff', outline: 'none' }}
                />
                <input 
                  type="text" 
                  value={specificDetail}
                  onChange={(e) => setSpecificDetail(e.target.value)}
                  placeholder="DETALLE ESPECÍFICO (EJ: CASA BATLLÓ)"
                  style={{ width: '100%', backgroundColor: '#111', border: '1px solid #333', padding: '1.5rem', borderRadius: '4px', fontSize: '1.25rem', color: '#fff', outline: 'none' }}
                />
              </div>
              <button 
                type="submit"
                disabled={state !== AgentState.IDLE && state !== AgentState.ERROR}
                style={{ width: '100%', backgroundColor: '#f59e0b', color: '#000', padding: '1.5rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer', border: 'none', opacity: (state !== AgentState.IDLE && state !== AgentState.ERROR) ? 0.5 : 1 }}
              >
                {state === AgentState.IDLE || state === AgentState.ERROR ? <><Search size={20} /> ANALYZE & SYNTHESIZE</> : <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />}
              </button>
            </form>
            
            {error && (
              <p style={{ color: '#ef4444', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.05)', marginTop: '2rem' }}>
                ● ERROR_SYSTEM_FAILURE: {error}
              </p>
            )}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem', height: '100%' }}>
            {/* Sidebar info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <section>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '8px', display: 'block' }}>● Location_Analysis</span>
                <h3 style={{ fontSize: '2.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '-0.05em', color: '#fff', wordBreak: 'break-word', margin: 0 }}>
                  {place}
                </h3>
              </section>

              <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <PipelineStep 
                  name="Pipeline Orchestrator" 
                  status={state === AgentState.COMPLETED ? 'Completed' : 'Running'}
                  details={`Generando 3 variantes únicas con respaldo vía email.`}
                  active={state !== AgentState.COMPLETED}
                  completed={state === AgentState.COMPLETED}
                />
              </section>

              {state === AgentState.COMPLETED && (
                <button 
                  onClick={() => setState(AgentState.IDLE)}
                  style={{ width: '100%', padding: '1rem', backgroundColor: '#111', border: '1px solid #333', color: '#fff', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <RefreshCw size={14} /> Nueva Búsqueda
                </button>
              )}
            </div>

            {/* Results Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {results.length > 0 ? (
                results.map((res, idx) => (
                  <div key={`container-${idx}`} style={{ height: '100%' }}>
                    <ResultCard 
                      index={idx}
                      result={res}
                      image={images[idx]}
                      loading={!images[idx]}
                    />
                  </div>
                ))
              ) : (
                <div style={{ gridColumn: 'span 3', padding: '5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed #333', opacity: 0.5 }}>
                   <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
                   <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Calculando Alternativas...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ResultCard({ result, image, loading, index }) {
  return (
    <div style={{ backgroundColor: '#111', border: '1px solid #333', display: 'flex', flexDirection: 'column', height: '100%' }}>
       <div style={{ padding: '1rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
         <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: 'bold', textTransform: 'uppercase' }}>OPCIÓN_0{index + 1}</span>
       </div>
       
       <div style={{ aspectRatio: '1/1', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '1.5rem', position: 'relative' }}>
          {loading ? (
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.2 }}>
               <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
               <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Rendering...</span>
             </div>
          ) : (
             <img src={image} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'invert(1) mix-blend-mode(screen)' }} alt="generado" />
          )}
       </div>

       <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
          <div>
            <h4 style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Concepto</h4>
            <p style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', margin: 0 }}>{result.elemento_identificado}</p>
          </div>
          <div>
            <h4 style={{ fontSize: '10px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Justificación Técnica</h4>
            <p style={{ fontSize: '10px', lineHeight: 1.6, color: '#888', fontStyle: 'italic', margin: 0 }}>"{result.justificacion_tecnica}"</p>
          </div>
       </div>
    </div>
  );
}

function PipelineStep({ name, status, details, active, completed }) {
  return (
    <div style={{ borderLeft: `2px solid ${active ? '#f59e0b' : completed ? '#10b981' : '#333'}`, paddingLeft: '1.5rem', transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}>
        <span style={{ color: active ? '#f59e0b' : completed ? '#666' : '#555', fontWeight: active ? 'bold' : 'normal' }}>
          {name}
        </span>
        <span style={{ color: completed ? '#10b981' : active ? '#f59e0b' : '#444' }}>
          {status}
        </span>
      </div>
      <p style={{ fontSize: '12px', color: active ? '#fff' : completed ? '#aaa' : '#666', margin: 0 }}>
        {details}
      </p>
    </div>
  );
}
