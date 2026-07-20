import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, Lightformer, Text, Center, Float, Decal } from '@react-three/drei';
import * as THREE from 'three';

// --- Entorno Premium Reutilizable ---
export function PremiumEnvironment() {
    return (
        <Environment resolution={256} background={false}>
            {/* Luz diagonal espectacular para caras planas */}
            <Lightformer intensity={4} form="rect" color="white" position={[0, 0, 5]} scale={[10, 1, 1]} rotation={[0, 0, Math.PI / 4]} />
            <Lightformer intensity={2} form="rect" color="white" position={[0, 0, 5]} scale={[10, 1, 1]} rotation={[0, 0, -Math.PI / 4]} />
            
            {/* Luces laterales fuertes para bordes metálicos */}
            <Lightformer intensity={5} form="rect" color="white" position={[-5, 0, 1]} scale={[10, 5, 1]} rotation={[0, Math.PI / 2, 0]} />
            <Lightformer intensity={5} form="rect" color="white" position={[5, 0, 1]} scale={[10, 5, 1]} rotation={[0, -Math.PI / 2, 0]} />
            
            {/* Luces de rebote suaves */}
            <Lightformer intensity={1} form="ring" color="white" position={[0, 5, 0]} scale={[10, 10, 1]} rotation={[Math.PI / 2, 0, 0]} />
            <Lightformer intensity={0.5} form="rect" color="white" position={[0, -5, 0]} scale={[10, 10, 1]} rotation={[-Math.PI / 2, 0, 0]} />
        </Environment>
    );
}

// --- Geometría: Hueso para ID Mascotas ---
function BoneGeometry({ args = [1] }) {
    const scale = args[0];
    const shape = useMemo(() => {
        const s = new THREE.Shape();
        // Hueso simple (mitad derecha, luego espejo o dibujar completo)
        s.moveTo(-1.5, 0.5);
        s.quadraticCurveTo(-2, 1, -2.5, 0.5);
        s.quadraticCurveTo(-3, 0, -2.5, -0.5);
        s.quadraticCurveTo(-2, -1, -1.5, -0.5);
        s.lineTo(1.5, -0.5);
        s.quadraticCurveTo(2, -1, 2.5, -0.5);
        s.quadraticCurveTo(3, 0, 2.5, 0.5);
        s.quadraticCurveTo(2, 1, 1.5, 0.5);
        s.lineTo(-1.5, 0.5);
        return s;
    }, []);

    const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    
    return <extrudeGeometry args={[shape, extrudeSettings]} />;
}

// --- Geometría: Corazón para Llaveros e ID Mascotas ---
function HeartGeometry({ args = [1] }) {
    const scale = args[0];
    const shape = useMemo(() => {
        const heartShape = new THREE.Shape();
        // A properly scaled and centered heart shape
        // Width: approx 2.4, Height: approx 2.4 (radius ~ 1.2)
        const x = 0, y = -0.4;
        
        heartShape.moveTo( x, y + 0.8 );
        heartShape.bezierCurveTo( x, y + 0.8, x - 0.2, y + 1.8, x - 1.2, y + 1.8 );
        heartShape.bezierCurveTo( x - 2.4, y + 1.8, x - 2.4, y + 0.2, x - 2.4, y + 0.2 );
        heartShape.bezierCurveTo( x - 2.4, y - 0.8, x - 1.2, y - 1.6, x, y - 2.4 );
        heartShape.bezierCurveTo( x + 1.2, y - 1.6, x + 2.4, y - 0.8, x + 2.4, y + 0.2 );
        heartShape.bezierCurveTo( x + 2.4, y + 0.2, x + 2.4, y + 1.8, x + 1.2, y + 1.8 );
        heartShape.bezierCurveTo( x + 0.2, y + 1.8, x, y + 0.8, x, y + 0.8 );
        
        return heartShape;
    }, []);

    // depth for ID Mascotas/Llaveros is usually 0.15
    const extrudeSettings = { depth: 0.15, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };
    
    return (
        <group scale={[scale, scale, 1]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
        </group>
    );
}

// --- Overlay de Rompecabezas (Cortes) ---
function PuzzleOverlay({ args = [4, 3] }) {
    const tex = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, 128, 128);
        ctx.scale(1.28, 1.28); // Mapeamos de 100x100 a 128x128
        
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const drawPath = (color, offsetX, offsetY) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            // Horizontal
            ctx.moveTo(0 + offsetX, 0 + offsetY);
            ctx.lineTo(40 + offsetX, 0 + offsetY);
            ctx.bezierCurveTo(35 + offsetX, 15 + offsetY, 30 + offsetX, 25 + offsetY, 50 + offsetX, 25 + offsetY);
            ctx.bezierCurveTo(70 + offsetX, 25 + offsetY, 65 + offsetX, 15 + offsetY, 60 + offsetX, 0 + offsetY);
            ctx.lineTo(100 + offsetX, 0 + offsetY);
            // Vertical
            ctx.moveTo(0 + offsetX, 0 + offsetY);
            ctx.lineTo(0 + offsetX, 40 + offsetY);
            ctx.bezierCurveTo(15 + offsetX, 35 + offsetY, 25 + offsetX, 30 + offsetY, 25 + offsetX, 50 + offsetY);
            ctx.bezierCurveTo(25 + offsetX, 70 + offsetY, 15 + offsetX, 65 + offsetY, 0 + offsetX, 60 + offsetY);
            ctx.lineTo(0 + offsetX, 100 + offsetY);
            ctx.stroke();
        };

        drawPath('rgba(0,0,0,0.6)', 0, 0); // Sombra
        drawPath('rgba(255,255,255,0.4)', -1, -1); // Brillo

        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 6);
        texture.anisotropy = 4;
        
        return texture;
    }, []);

    return (
        <mesh position={[0, 0, 0.052]}>
            <planeGeometry args={args} />
            <meshBasicMaterial map={tex} transparent={true} opacity={0.7} depthWrite={false} />
        </mesh>
    );
}

// --- Componente de Producto Dinámico ---
function ProductModel({ productId, category, size, nameText, textureUrl }) {
    const meshRef = useRef();
    const [userTexture, setUserTexture] = useState(null);

    useEffect(() => {
        if (textureUrl) {
            new THREE.TextureLoader().load(textureUrl, (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                // NOTA: No usar RepeatWrapping aquí, ya que las imágenes subidas por el usuario
                // suelen ser NPOT (No Potencia de Dos). WebGL invalida las texturas NPOT si tienen RepeatWrapping.
                setUserTexture(tex);
            });
        } else {
            setUserTexture(null);
        }
    }, [textureUrl]);

    // Animación de rotación (Wiggle para planos, 360 para cilíndricos)
    useFrame((state, delta) => {
        if (meshRef.current) {
            const isFlat = ['mousepad', 'cuadro', 'rompecabezas', 'id-salud'].some(p => productId.includes(p));
            if (isFlat) {
                // Movimiento oscilante para no mostrar la parte trasera de objetos planos
                meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.3;
                meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
            } else {
                // Giro continuo 360
                meshRef.current.rotation.y += delta * 0.5;
            }
        }
    });

    const isMetal = ['insignias', 'cuadro', 'llaveros', 'id-mascotas', 'id-salud'].some(p => productId.includes(p));
    const isCeramic = productId.includes('tazon');
    const isMDF = ['posavasos', 'rompecabezas'].some(p => productId.includes(p));
    const isCloth = productId.includes('mousepad');
    const isPlastic = productId.includes('impresion3d');
    const isTumbler = productId.includes('tumbler');

    // --- MATERIALES FÍSICOS ---
    let materialProps = {};
    if (isMetal) {
        materialProps = { color: '#aaaaaa', metalness: 0.9, roughness: 0.2 };
    } else if (isCeramic) {
        materialProps = { color: '#ffffff', metalness: 0.1, roughness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1 };
    } else if (isMDF) {
        materialProps = { color: '#c29d75', metalness: 0.0, roughness: 0.9 }; // Madera/Cartón
    } else if (isCloth) {
        materialProps = { color: '#222222', metalness: 0.0, roughness: 1.0 }; // Tela negra
    } else if (isPlastic) {
        materialProps = { color: '#3b82f6', metalness: 0.2, roughness: 0.5 }; // PLA azul
    } else if (isTumbler) {
        materialProps = { color: '#222222', metalness: 0.8, roughness: 0.3 }; // Acero oscuro cepillado
    } else {
        materialProps = { color: '#dddddd', metalness: 0.5, roughness: 0.5 };
    }

    // Si el usuario subió una imagen, hacemos que la base sea blanca pura 
    // para que la textura no se tiña con el color del material base.
    if (userTexture) {
        materialProps.color = '#ffffff';
        // Reducir la reflectividad metálica drásticamente para que la imagen sea visible
        // y no actúe como un espejo que se "quema" con las luces del entorno.
        if (materialProps.metalness > 0.1) {
            materialProps.metalness = 0.1;
        }
        // Aumentar la rugosidad para matar el brillo especular de las luces PremiumEnvironment
        // que causan destellos blancos masivos sobre las superficies planas impresas.
        materialProps.roughness = 0.8;
    }

    // Material de Texto (grabado láser vs impreso)
    const textColor = isMetal ? '#333333' : (isCeramic ? '#000000' : '#ffffff');
    const textDepth = isMetal ? -0.01 : 0.01;

    // --- GEOMETRÍAS ---
    let geometry;
    let textPosition = [0, 0, 0.11];
    let scale = 1;

    switch(true) {
        case productId.includes('tazon'):
            geometry = (
                <group>
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[1.5, 1.5, 3, 64]} />
                        <meshPhysicalMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                    </mesh>
                    <mesh position={[1.5, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
                        <torusGeometry args={[0.8, 0.25, 16, 64, Math.PI]} />
                        <meshPhysicalMaterial {...materialProps} />
                    </mesh>
                </group>
            );
            textPosition = [0, 0, 1.51];
            break;

        case productId.includes('tumbler'):
            geometry = (
                <group>
                    <mesh castShadow receiveShadow>
                        <cylinderGeometry args={[1.4, 1.2, 4.5, 64]} />
                        <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                    </mesh>
                    <mesh position={[0, 2.3, 0]} castShadow receiveShadow>
                        <cylinderGeometry args={[1.45, 1.45, 0.2, 64]} />
                        <meshStandardMaterial color="#111" metalness={0.1} roughness={0.8} />
                    </mesh>
                </group>
            );
            textPosition = [0, 0, 1.35];
            break;

        case productId.includes('mousepad'):
            geometry = (
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[4, 3, 0.05]} />
                    <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 0.03];
            break;

        case productId.includes('posavasos'):
            const isSquare = size?.toLowerCase().includes('cuadrado');
            geometry = (
                <mesh castShadow receiveShadow rotation={[Math.PI/2, 0, 0]}>
                    {isSquare ? <boxGeometry args={[2.5, 2.5, 0.2]} /> : <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />}
                    <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 0.11];
            break;

        case productId.includes('cuadro'):
            const isHorizontal = size?.toLowerCase().includes('30x20') || size?.toLowerCase().includes('40x30'); // Just in case
            geometry = (
                <mesh castShadow receiveShadow>
                    {isHorizontal ? <boxGeometry args={[4, 3, 0.1]} /> : <boxGeometry args={[3, 4, 0.1]} />}
                    <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 0.06];
            break;

        case productId.includes('id-mascotas'):
            const isCircle = size?.toLowerCase().includes('círculo') || size?.toLowerCase().includes('circulo');
            const isHeart = size?.toLowerCase().includes('corazón') || size?.toLowerCase().includes('corazon');
            geometry = (
                <mesh castShadow receiveShadow>
                    {isCircle ? <cylinderGeometry args={[1.5, 1.5, 0.15, 64]} rotation={[Math.PI/2, 0, 0]} /> : 
                     isHeart ? <HeartGeometry args={[1]} /> :
                     <BoneGeometry args={[1]} />}
                    <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 0.16];
            break;

        case productId.includes('llavero'):
            const isRound = size?.toLowerCase().includes('redondo');
            const isHeartLlavero = size?.toLowerCase().includes('corazón') || size?.toLowerCase().includes('corazon');
            const isSquareLlavero = size?.toLowerCase().includes('cuadrado');
            geometry = (
                <group>
                    <mesh castShadow receiveShadow rotation={isHeartLlavero ? [0,0,0] : [Math.PI/2, 0, 0]}>
                        {isRound ? <cylinderGeometry args={[1.2, 1.2, 0.15, 64]} /> :
                         isSquareLlavero ? <boxGeometry args={[2, 0.15, 2]} /> :
                         isHeartLlavero ? <HeartGeometry args={[0.8]} /> :
                         <boxGeometry args={[2.5, 0.15, 1.2]} /> /* Rectangular default */}
                        <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                    </mesh>
                    <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                        <torusGeometry args={[0.3, 0.05, 16, 64]} />
                        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.2} />
                    </mesh>
                </group>
            );
            textPosition = [0, 0, 0.08];
            break;

        case productId.includes('rompecabezas'):
            geometry = (
                <group>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[4, 3, 0.1]} />
                        <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                    </mesh>
                    <PuzzleOverlay args={[4, 3]} />
                </group>
            );
            textPosition = [0, 0, 0.06];
            break;

        case productId.includes('impresion3d'):
            geometry = (
                <mesh castShadow receiveShadow>
                    <torusKnotGeometry args={[1, 0.3, 100, 16]} />
                    <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 1.5];
            break;

        case productId.includes('id-salud'):
            const isPulsera = size?.toLowerCase().includes('pulsera');
            const isTarjeta = size?.toLowerCase().includes('tarjeta');
            const isMedallon = size?.toLowerCase().includes('medallón') || size?.toLowerCase().includes('medallon');
            geometry = (
                <mesh castShadow receiveShadow>
                    {isPulsera ? <boxGeometry args={[3, 0.4, 0.05]} /> :
                     isTarjeta ? <boxGeometry args={[3, 1.8, 0.05]} /> :
                     <boxGeometry args={[1.5, 1.5, 0.1]} /> /* Medallon default */}
                    <meshStandardMaterial key={userTexture ? userTexture.uuid : 'plain'} {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 0.06];
            break;

        case productId.includes('insignia'):
        default:
            geometry = (
                <mesh castShadow receiveShadow rotation={[Math.PI/2, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 0.1, 64]} />
                    <meshStandardMaterial {...materialProps} map={userTexture} />
                </mesh>
            );
            textPosition = [0, 0, 0.06];
            break;
    }

    return (
        <group ref={meshRef} scale={scale}>
            {geometry}
            {/* Texto grabado o impreso */}
            {productId !== 'impresion3d' && (
                <Text
                    position={productId.includes('tazon') || productId.includes('tumbler') || productId.includes('posavasos') || productId.includes('llavero') ? [0, 0.5, textPosition[2]] : textPosition}
                    fontSize={0.25}
                    color={textColor}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={productId.includes('tazon') || productId.includes('tumbler') ? 2 : 3}
                    textAlign="center"
                    depthOffset={1} // Para evitar z-fighting en superficies planas
                >
                    {nameText ? nameText.toUpperCase() : 'SAGASON 4K'}
                </Text>
            )}
        </group>
    );
}

// --- VISOR PRINCIPAL EXPORTADO ---
export function Universal3DViewer({ product, category, size, name, textureUrl }) {
    // Normalizar quitando tildes y caracteres especiales para evitar bugs de coincidencia (e.g. TAZÓN -> tazon)
    const normalizedProduct = product ? product.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
    const prodId = normalizedProduct.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'otro';

    return (
        <div style={{ width: '100%', height: '300px', background: '#050505', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden', position: 'relative' }}>
            {/* Label flotante de material */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, display: 'flex', gap: '8px' }}>
                <span style={{ background: 'var(--color-primary)', color: '#000', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
                    VISOR 3D 4K
                </span>
                <span style={{ background: '#222', color: '#fff', border: '1px solid #444', padding: '4px 8px', fontSize: '10px', fontWeight: 'bold', borderRadius: '4px' }}>
                    {product}
                </span>
            </div>
            
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} gl={{ preserveDrawingBuffer: true, antialias: true }}>
                <color attach="background" args={['#050505']} />
                
                {/* Luces Base */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
                
                <React.Suspense fallback={null}>
                    {/* Entorno Premium */}
                    <PremiumEnvironment />
                    
                    {/* Objeto */}
                    <Center>
                        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
                            <ProductModel productId={prodId} category={category} size={size} nameText={name} textureUrl={textureUrl} />
                        </Float>
                    </Center>
                </React.Suspense>
                
                {/* Controles para que el usuario gire libremente */}
                <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
            </Canvas>
            
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 10 }}>
                <span style={{ color: '#666', fontSize: '10px' }}>Arrastra para girar</span>
            </div>
        </div>
    );
}
