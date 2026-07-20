import React from 'react';

// Generador de líneas de rompecabezas SVG
const PuzzleLinesSVG = () => {
    // Generador de rutas para las piezas (curvas tipo omega para simular rompecabezas)
    const createHPath = (x, y, p) => `
        M ${x} ${y} 
        L ${x + 38} ${y} 
        C ${x + 38} ${y - 5*p}, ${x + 32} ${y - 10*p}, ${x + 38} ${y - 15*p} 
        C ${x + 45} ${y - 23*p}, ${x + 55} ${y - 23*p}, ${x + 62} ${y - 15*p} 
        C ${x + 68} ${y - 10*p}, ${x + 62} ${y - 5*p}, ${x + 62} ${y} 
        L ${x + 100} ${y}
    `;

    const createVPath = (x, y, p) => `
        M ${x} ${y} 
        L ${x} ${y + 38} 
        C ${x - 5*p} ${y + 38}, ${x - 10*p} ${y + 32}, ${x - 15*p} ${y + 38} 
        C ${x - 23*p} ${y + 45}, ${x - 23*p} ${y + 55}, ${x - 15*p} ${y + 62} 
        C ${x - 10*p} ${y + 68}, ${x - 5*p} ${y + 62}, ${x} ${y + 62} 
        L ${x} ${y + 100}
    `;

    // Un patrón de 2x2 piezas (200x200) para que encajen alternadamente
    const jigsawPath = [
        createHPath(0, 0, 1),
        createHPath(100, 0, -1),
        createHPath(0, 100, -1),
        createHPath(100, 100, 1),
        createHPath(0, 200, 1),
        createHPath(100, 200, -1),
        createVPath(0, 0, 1),
        createVPath(0, 100, -1),
        createVPath(100, 0, -1),
        createVPath(100, 100, 1),
        createVPath(200, 0, 1),
        createVPath(200, 100, -1)
    ].join(' ');

    return (
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.8 }}>
            <defs>
                <pattern id="jigsaw-pattern" width="200" height="200" patternUnits="userSpaceOnUse" overflow="visible" patternTransform="scale(0.55)">
                    {/* Sombra oscura interior */}
                    <path d={jigsawPath} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2" transform="translate(1, 1)" />
                    {/* Brillo claro (relieve) */}
                    <path d={jigsawPath} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" transform="translate(-1, -1)" />
                    {/* Línea base */}
                    <path d={jigsawPath} fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#jigsaw-pattern)" />
            {/* Sombra volumétrica en los bordes del rompecabezas */}
            <rect width="100%" height="100%" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="8" />
        </svg>
    );
};

// Componente individual de Taza CSS
const CssMug = ({ fileUrl, text, view, zIndex, transform }) => {
    // view puede ser 'left', 'center', 'right'
    const backgroundPosition = view === 'left' ? '0% 50%' : view === 'center' ? '50% 50%' : '100% 50%';
    
    return (
        <div style={{
            position: 'absolute',
            width: '180px',
            height: '210px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: zIndex,
            transform: transform,
            transition: 'transform 0.3s ease'
        }}>
            {/* Asa de la taza */}
            {view !== 'center' && (
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: view === 'left' ? '-28px' : 'auto',
                    right: view === 'right' ? '-28px' : 'auto',
                    width: '60px',
                    height: '120px',
                    border: '14px solid #f0f0f0',
                    borderRadius: view === 'left' ? '30px 10px 10px 40px' : '10px 30px 40px 10px',
                    boxShadow: 'inset 0px 4px 10px rgba(0,0,0,0.2), 5px 5px 15px rgba(0,0,0,0.15)',
                    zIndex: -1
                }}>
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        borderRadius: 'inherit',
                        boxShadow: 'inset -5px 0 10px rgba(255,255,255,0.8), inset 5px 0 10px rgba(0,0,0,0.1)'
                    }}/>
                </div>
            )}

            {/* Cuerpo de la taza */}
            <div style={{
                position: 'relative',
                width: '160px',
                height: '190px',
                backgroundColor: '#f8f8f8',
                borderRadius: '6px 6px 12px 12px',
                boxShadow: '0 20px 25px rgba(0,0,0,0.15), inset -10px 0 20px rgba(0,0,0,0.08), inset 10px 0 20px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                zIndex: 1,
                border: '1px solid #e0e0e0',
                borderTop: '2px solid #ffffff'
            }}>
                {/* Diseño del usuario o Texto */}
                {fileUrl ? (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${fileUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: backgroundPosition,
                        backgroundRepeat: 'no-repeat'
                    }} />
                ) : text ? (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#fff',
                    }}>
                        <span style={{
                            color: '#333', // Grabado oscuro/sublimación
                            fontSize: view === 'center' ? '1rem' : '0.8rem',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            padding: '0 10px',
                            wordBreak: 'break-word',
                        }}>{text}</span>
                    </div>
                ) : (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#999', fontSize: '0.8rem', textAlign: 'center', padding: '10px',
                        backgroundColor: '#fff'
                    }}>Sube tu diseño<br/>o escribe texto</div>
                )}

                {/* Sombra volumétrica (Multiplicar) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.5) 100%)',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none'
                }} />

                {/* Brillo volumétrico (Pantalla/Screen) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 15%, rgba(255,255,255,0.7) 22%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.2) 85%)',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Sombra proyectada en el suelo */}
            <div style={{
                width: '140px',
                height: '15px',
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
                marginTop: '-5px',
                zIndex: 0
            }} />
        </div>
    );
};

// Componente individual de Tumbler CSS
const CssTumbler = ({ fileUrl, text, view, zIndex, transform }) => {
    // view puede ser 'left', 'center', 'right'
    const backgroundPosition = view === 'left' ? '0% 50%' : view === 'center' ? '50% 50%' : '100% 50%';
    
    return (
        <div style={{
            position: 'absolute',
            width: '120px',
            height: '240px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: zIndex,
            transform: transform,
            transition: 'transform 0.3s ease'
        }}>
            {/* Tapa del tumbler */}
            <div style={{
                width: '110px',
                height: '15px',
                backgroundColor: '#333',
                borderRadius: '5px 5px 0 0',
                boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.2)',
                zIndex: 2
            }} />
            
            {/* Cuerpo del tumbler */}
            <div style={{
                position: 'relative',
                width: '120px',
                height: '225px',
                backgroundColor: '#f8f8f8',
                borderRadius: '0 0 10px 10px',
                boxShadow: '0 20px 25px rgba(0,0,0,0.15), inset -10px 0 20px rgba(0,0,0,0.08), inset 10px 0 20px rgba(0,0,0,0.04)',
                overflow: 'hidden',
                zIndex: 1,
                border: '1px solid #e0e0e0',
                borderTop: 'none',
                // Hacerlo ligeramente cónico (opcional, con clip-path)
                clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)'
            }}>
                {/* Diseño del usuario o Texto */}
                {fileUrl ? (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${fileUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: backgroundPosition,
                        backgroundRepeat: 'no-repeat'
                    }} />
                ) : text ? (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backgroundColor: '#1a1a1a', // Simula el vaso oscuro por defecto para destacar el grabado
                    }}>
                        <span style={{
                            color: '#e0e0e0', // Plata brillante (acero expuesto)
                            fontSize: view === 'center' ? '1rem' : '0.8rem', // Más pequeño a los lados
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            padding: '0 10px',
                            wordBreak: 'break-word',
                            textShadow: '0px 1px 1px rgba(255,255,255,0.6), 0px -1px 1px rgba(0,0,0,0.8)'
                        }}>{text}</span>
                    </div>
                ) : (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#999', fontSize: '0.8rem', textAlign: 'center', padding: '10px',
                        backgroundColor: '#fff'
                    }}>Sube tu diseño<br/>o escribe texto</div>
                )}

                {/* Sombra volumétrica (Multiplicar) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.5) 100%)',
                    mixBlendMode: 'multiply',
                    pointerEvents: 'none'
                }} />

                {/* Brillo volumétrico (Pantalla/Screen) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(90deg, rgba(255,255,255,0) 15%, rgba(255,255,255,0.7) 22%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 70%, rgba(255,255,255,0.2) 85%)',
                    mixBlendMode: 'screen',
                    pointerEvents: 'none'
                }} />
            </div>

            {/* Sombra proyectada en el suelo */}
            <div style={{
                width: '100px',
                height: '15px',
                background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 70%)',
                marginTop: '-5px',
                zIndex: 0
            }} />
        </div>
    );
};

export function Mockup2DViewer({ product, fileUrl, text }) {
    const isPuzzle = product.toLowerCase().includes('rompecabezas');
    const isTumbler = product.toLowerCase().includes('tumbler');

    return (
        <div style={{
            width: '100%',
            height: '400px',
            backgroundColor: '#eaeaea',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.05)',
            backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #eaeaea 100%)'
        }}>
            {isPuzzle ? (
                // --- VISTA ROMPECABEZAS ---
                <div style={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    position: 'relative',
                    backgroundImage: fileUrl ? `url(${fileUrl})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                    {!fileUrl && (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                            Sube una imagen para ver el rompecabezas
                        </div>
                    )}
                    <PuzzleLinesSVG />
                </div>
            ) : isTumbler ? (
                // --- VISTA TUMBLERS ---
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '1000px'
                }}>
                    {/* Contenedor escalable ajustado al ancho máximo del visualizador */}
                    <div style={{
                        position: 'relative',
                        width: '350px',
                        height: '280px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'scale(0.85)',
                        transformOrigin: 'center center'
                    }}>
                        <CssTumbler fileUrl={fileUrl} text={text} view="left" zIndex={1} transform="translateX(-95px) scale(0.85) rotateY(15deg)" />
                        <CssTumbler fileUrl={fileUrl} text={text} view="right" zIndex={1} transform="translateX(95px) scale(0.85) rotateY(-15deg)" />
                        <CssTumbler fileUrl={fileUrl} text={text} view="center" zIndex={2} transform="translateZ(30px) scale(1.1)" />
                    </div>
                </div>
            ) : (
                // --- VISTA TAZONES (3 VISTAS HORIZONTALES) ---
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '1000px'
                }}>
                    {/* Contenedor escalable ajustado al ancho máximo del visualizador */}
                    <div style={{
                        position: 'relative',
                        width: '400px',
                        height: '250px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: 'scale(0.70)',
                        transformOrigin: 'center center'
                    }}>
                        <CssMug fileUrl={fileUrl} text={text} view="left" zIndex={1} transform="translateX(-115px) scale(0.85) rotateY(15deg)" />
                        <CssMug fileUrl={fileUrl} text={text} view="right" zIndex={1} transform="translateX(115px) scale(0.85) rotateY(-15deg)" />
                        <CssMug fileUrl={fileUrl} text={text} view="center" zIndex={2} transform="translateZ(30px) scale(1.1)" />
                    </div>
                </div>
            )}
        </div>
    );
}
