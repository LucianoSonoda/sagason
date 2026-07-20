import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Text, Lightformer } from '@react-three/drei';

function InsigniaModel({ lugar, fecha, nombre, tamano }) {

    const displayLugar = lugar ? (lugar.length > 20 ? lugar.substring(0, 18) + '...' : lugar).toUpperCase() : 'AVENTURA EXTREMA';
    let displayFecha = 'FECHA DE VISITA';
    if (fecha) {
        const dateParts = fecha.split('-');
        if (dateParts.length === 3) displayFecha = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }
    const displayNombre = nombre ? (nombre.length > 24 ? nombre.substring(0, 22) + '...' : nombre).toUpperCase() : 'FAMILIA VIAJERA';

    return (
        <group>
                {/* Geometría Principal: Cilindro rotado para mirar a la cámara */}
                <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[2.5, 2.5, 0.15, 64]} />
                    <meshStandardMaterial 
                        color="#d1d5db" 
                        metalness={0.8} 
                        roughness={0.25} 
                        envMapIntensity={2.0} 
                    />
                </mesh>



                {/* --- Grabado Láser (Textos) --- */}
                {/* Los textos se colocan en la cara frontal Z */}
                <group position={[0, 0, 0.076]}>
                    
                    {/* Estrella Central */}
                    <Text 
                        position={[0, 0, 0]} 
                        fontSize={0.5} 
                        color="#0f172a" 
                        anchorX="center" 
                        anchorY="middle"
                    >
                        ★
                    </Text>

                    {/* Texto Superior VIP */}
                    <Text 
                        position={[0, 1.2, 0]} 
                        fontSize={0.18} 
                        color="#0f172a" 
                        anchorX="center" 
                        anchorY="middle"
                        letterSpacing={0.1}
                    >
                        SAGASON SOUVENIR LÍNEA VIP
                    </Text>

                    {/* Lugar */}
                    <Text 
                        position={[0, -0.6, 0]} 
                        fontSize={0.25} 
                        color="#0f172a" 
                        anchorX="center" 
                        anchorY="middle"
                    >
                        {displayLugar}
                    </Text>

                    {/* Fecha */}
                    <Text 
                        position={[0, -1.0, 0]} 
                        fontSize={0.15} 
                        color="#0f172a" 
                        anchorX="center" 
                        anchorY="middle"
                        letterSpacing={0.1}
                    >
                        {displayFecha}
                    </Text>

                    {/* Nombre Familia */}
                    <Text 
                        position={[0, -1.4, 0]} 
                        fontSize={0.22} 
                        color="#0f172a" 
                        anchorX="center" 
                        anchorY="middle"
                    >
                        {displayNombre}
                    </Text>

                    {/* Tamaño */}
                    <Text 
                        position={[0, 0.8, 0]} 
                        fontSize={0.15} 
                        color="#334155" 
                        anchorX="center" 
                        anchorY="middle"
                        letterSpacing={0.1}
                    >
                        DIÁMETRO: {tamano || '10MM'}
                    </Text>
                </group>
        </group>
    );
}

export function ThreeInsignia({ lugar, fecha, nombre, tamano }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px auto', padding: '20px', backgroundColor: 'rgba(18, 18, 20, 0.45)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', width: '100%', maxWidth: '300px', position: 'relative' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-primary)', fontWeight: 'bold', marginBottom: '12px', display: 'block' }}>⭐ CONMEMORACIÓN ACERO LÁSER (3D)</span>
            
            <div style={{ width: '250px', height: '250px', cursor: 'grab' }} className="three-canvas-container">
                <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
                    <React.Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#0ea5e9" />
                        
                        {/* Controles simples y robustos para que el usuario gire la cámara alrededor de la moneda sin que desaparezca */}
                        <OrbitControls 
                            enableZoom={false} 
                            enablePan={false} 
                            autoRotate 
                            autoRotateSpeed={0.5}
                        />
                        <InsigniaModel lugar={lugar} fecha={fecha} nombre={nombre} tamano={tamano} />

                        {/* Entorno HDRI customizado con barras de luz para reflejos premium */}
                        <Environment resolution={512}>
                            {/* Fondo oscuro para contraste */}
                            <color attach="background" args={['#000000']} />
                            
                            {/* --- LUCES FRONTALES (Para la cara plana de la moneda) --- */}
                            {/* Barra diagonal cruzando el frente para un destello dinámico en la cara */}
                            <Lightformer intensity={6} form="rect" position={[0, 0, 5]} scale={[10, 0.5, 1]} rotation={[0, 0, Math.PI / 6]} />
                            {/* Barra horizontal superior-frontal para reflejar en el tercio superior de la cara */}
                            <Lightformer intensity={4} form="rect" position={[0, 3, 5]} scale={[10, 1, 1]} />
                            
                            {/* --- LUCES LATERALES Y BORDES (Para el grosor/canto de la moneda) --- */}
                            <Lightformer intensity={4} form="rect" position={[0, 5, 0]} scale={[20, 2, 1]} rotation={[Math.PI / 2, 0, 0]} />
                            <Lightformer intensity={5} form="rect" position={[-5, 0, 0]} scale={[0.5, 20, 1]} rotation={[0, Math.PI / 2, 0]} />
                            <Lightformer intensity={5} form="rect" position={[5, 0, 0]} scale={[0.5, 20, 1]} rotation={[0, -Math.PI / 2, 0]} />
                            
                            {/* --- LUZ INFERIOR AZUL (Tono de la marca Sagason) --- */}
                            <Lightformer intensity={3} color="#0ea5e9" form="rect" position={[0, -5, 2]} scale={[20, 1, 1]} rotation={[-Math.PI / 2, 0, 0]} />
                        </Environment>
                    </React.Suspense>
                </Canvas>
            </div>
            
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '14px', fontStyle: 'italic', textAlign: 'center', lineHeight: '1.4' }}>
                Interactúa con la placa 3D. Renderizado en tiempo real.
            </span>
        </div>
    );
}
