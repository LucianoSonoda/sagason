import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, CheckCircle, FileText, Mail, AlertTriangle, 
    Coffee, Cpu, Heart, Activity, Settings, HelpCircle, 
    Scale, Users, ChevronDown, RefreshCw, Layers, MousePointer
} from 'lucide-react';
import '../styles/Warranty.css';

export function Warranty() {
    const [activeTab, setActiveTab] = useState('general');
    const [selectedProduct, setSelectedProduct] = useState('cuadros');
    const [faqOpen, setFaqOpen] = useState({});

    const toggleFaq = (index) => {
        setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        }
    };

    const tabVariants = {
        hidden: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, x: 15, transition: { duration: 0.2 } }
    };

    const tabs = [
        { id: 'general', label: 'Garantía Legal', icon: Shield },
        { id: 'products', label: 'Por Producto', icon: Settings },
        { id: 'b2b', label: 'Corporativo / B2B', icon: Users },
        { id: 'faq', label: 'Preguntas Frecuentes', icon: HelpCircle }
    ];

    const products = {
        cuadros: {
            name: 'Cuadros HD & Láminas',
            icon: Layers,
            cohesion: 'Sublimación de aluminio fotográfico Chromalux y láminas rígidas.',
            specifications: [
                'Calidad fotográfica en CMYK. El perfil de color debe respetar archivos a 300 DPI.',
                'Exclusión de variaciones tonales mínimas inherentes a la termotransferencia química sobre aluminio.',
                'El derecho de retracto queda excluido (Art. 3 bis letra b de la Ley 19.496) una vez que el archivo entra a cola de impresión.'
            ],
            exclusions: [
                'Ralladuras, abolladuras o golpes provocados por manipulación posterior del cliente.',
                'Limpieza con solventes abrasivos (alcohol isopropílico puro, acetona, diluyentes). Usar solo paño microfibra húmedo.',
                'Exposición solar directa y permanente a la intemperie (salvo que se especifique lámina con filtro UV exterior).'
            ],
            law: 'Artículos 19, 20 y 21 de la Ley N° 19.496 sobre la idoneidad del soporte metálico y fidelidad básica del diseño aprobado.'
        },
        tazones: {
            name: 'Tazones (Mugs) 11oz',
            icon: Coffee,
            cohesion: 'Mugs de cerámica estándar, tazones mágicos termosensibles y metalizados.',
            specifications: [
                'Área máxima imprimible de 200 mm x 80 mm.',
                'Los tazones mágicos funcionan por recubrimiento termosensible. Se imprimen sobre una base negra de polímero que se vuelve transparente con el calor.'
            ],
            exclusions: [
                'Para Tazones Mágicos: Lavado en lavavajillas industrial o uso agresivo en microondas que degrade el polímero exterior.',
                'Para Tazones de Vidrio/Metalizados: Uso de esponjas metálicas o polvos abrasivos que rayen la superficie sublimada.',
                'Visibilidad tenue del diseño oculto bajo luz extremadamente brillante en los tazones mágicos (es una propiedad física del material, no un defecto).'
            ],
            law: 'Exclusiones válidas de garantía por mal uso del consumidor según Art. 21 de la Ley 19.496, al no seguir las instrucciones de lavado e inducción térmica.'
        },
        tumblers: {
            name: 'Tumblers & Termos',
            icon: Coffee,
            cohesion: 'Vasos térmicos, chopis, botellas deportivas y termos de acero inoxidable con doble pared al vacío.',
            specifications: [
                'Sublimados o grabados con láser de alta precisión.',
                'Aislamiento de vacío que garantiza la conservación de temperatura fría/caliente.'
            ],
            exclusions: [
                'Pérdida del sellado de vacío térmico debido a caídas, golpes fuertes o abolladuras que deformen las paredes interna y externa.',
                'Lavado en lavavajillas del recubrimiento de color sublimable, lo que puede provocar descascaramiento. Se exige lavado manual suave.',
                'Daños en tapas plásticas por caídas o sobre-apriete de la rosca.'
            ],
            law: 'Garantía legal de 6 meses cubre exclusivamente defectos de fábrica en la soldadura del vacío o fugas en costuras internas, no así golpes mecánicos.'
        },
        mousepads: {
            name: 'Mousepads & Posavasos',
            icon: MousePointer,
            cohesion: 'Mousepads de tela suave con base de neopreno antideslizante y posavasos de MDF/polímero.',
            specifications: [
                'Bordes cortados a láser o rematados para evitar deshilaches.',
                'Impresión transferida a 200°C garantizando la fusión de tintas en la fibra de poliéster.'
            ],
            exclusions: [
                'Despegue del tejido textil de la base de goma debido a lavados en lavadora con agua caliente o centrifugados.',
                'Quemaduras por contacto con cenizas, tazas a temperaturas hirvientes (>120°C en posavasos de cartón/MDF), o derrame de líquidos corrosivos.',
                'Desgaste natural de los bordes o suciedad por el uso diario del mouse.'
            ],
            law: 'Ley 19.496 Art. 20. La garantía cubre fallas en la vulcanización de base y tela dentro de los 6 meses de uso moderado.'
        },
        llaveros: {
            name: 'Llaveros Personalizados',
            icon: Layers,
            cohesion: 'Llaveros de metal, acrílico rígido, madera noble y polímero sublimado.',
            specifications: [
                'Argolla metálica de alta resistencia incluida.',
                'Diseño visible por ambas caras o cara única con terminación espejo.'
            ],
            exclusions: [
                'Rayas superficiales por roce constante con llaves metálicas (se considera desgaste natural de uso).',
                'Quiebre de argollas o uniones plásticas por tirón violento, enganche en maquinaria o sobrepeso.',
                'Inmersión prolongada en agua de llaveros de madera prensada o MDF.'
            ],
            law: 'Las rayas y marcas de roce constituyen desgaste normal exento de garantía legal conforme a la jurisprudencia del SERNAC.'
        },
        rompecabezas: {
            name: 'Rompecabezas (Puzzles)',
            icon: Layers,
            cohesion: 'Puzzles de cartón prensado satinado y polímero flexible para sublimación.',
            specifications: [
                'Corte de piezas limpio mediante matriz de alta presión.',
                'Se entregan armados sobre un soporte rígido o en bolsa sellada según pedido.'
            ],
            exclusions: [
                'Pérdida de piezas individuales una vez recibido a conformidad por el cliente.',
                'Hinchamiento o deformación del cartón por derrame de líquidos o almacenamiento en zonas de alta humedad.',
                'Doblamiento forzado de las pestañas de unión al armar de forma incorrecta.'
            ],
            law: 'Art. 3 bis b) Ley 19.496. Al ser un producto lúdico e interactivo personalizado, una vez abierto el empaque original no aplica retracto por insatisfacción estética subjetiva.'
        },
        mascotas: {
            name: 'ID Mascotas & Tags 4K',
            icon: Heart,
            cohesion: 'Placas inteligentes y tradicionales con chip NFC o código QR dinámico integrado.',
            specifications: [
                'Grabado de alta legibilidad y chip NFC sellado de fábrica.',
                'Placa de aluminio anodizado, acrílico o resina epóxica súper resistente.',
                'Enlace digital a la plataforma web Sagason Cloud para el perfil de la mascota.'
            ],
            exclusions: [
                'Mordeduras o masticación del animal.',
                'Pérdida de la placa.',
                'Daños por químicos o rasguños.',
                'Daño en chip por perforación o imanes de neodimio.',
                'Caídas del sistema digital atribuibles a la conexión a internet del usuario o del escaneador.'
            ],
            law: 'La garantía legal cubre el funcionamiento electrónico inicial del chip NFC y la correcta impresión del QR. Queda excluido el daño físico directo (mordeduras) conforme al Art. 21 de la Ley 19.496.'
        },
        salud: {
            name: 'ID Salud Inteligente',
            icon: Activity,
            cohesion: 'Placas de emergencia, pulseras y stickers inteligentes con código QR/NFC médico.',
            specifications: [
                'Grabado de alta legibilidad y chip NFC sellado de fábrica.',
                'Acceso inmediato a la ficha médica digital de emergencia.'
            ],
            exclusions: [
                'Pérdida de la placa, pulsera o sticker.',
                'Daños por químicos o rasguños.',
                'Daño en chip por perforación o imanes de neodimio.',
                'Manipulación incorrecta de los datos en la nube por parte del usuario (borrado de ficha médica).'
            ],
            law: 'Ley N° 19.628 de Protección de la Vida Privada (Chile). La garantía del servicio Sagason Cloud asegura la confidencialidad técnica y disponibilidad del servidor de emergencias.'
        },
        impresion3d: {
            name: 'Impresión 3D (PLA / PETG)',
            icon: Settings,
            cohesion: 'Fabricación aditiva de repuestos, soportes, figuras y prototipos.',
            specifications: [
                'Materiales de alta calidad: PLA (biodegradable, estético), PETG (resistente al calor/químicos), TPU (flexible).',
                'Diseño de capas físicas (FDM). Tolerancia dimensional estándar de +/- 0.2mm.'
            ],
            exclusions: [
                'Deformación térmica de piezas de PLA expuestas a más de 50°C (ej: dejar la pieza dentro del auto cerrado en verano bajo el sol).',
                'Quiebre de capas debido a esfuerzos mecánicos superiores a los límites del material o por mal diseño estructural provisto en el archivo STL del cliente.',
                'Acabado rugoso propio de la tecnología de capas FDM (no constituye defecto, es la naturaleza física de la impresión 3D).'
            ],
            law: 'En prototipado y fabricación a partir de archivos 3D del cliente, la responsabilidad de diseño estructural recae en el cliente. Sagason garantiza la replicación del archivo con la densidad y material pactado.'
        }
    };

    const faqs = [
        {
            q: "¿Puedo anular mi pedido y pedir la devolución del dinero si me arrepiento?",
            a: "De acuerdo al Artículo 3 bis letra b) de la Ley 19.496, los consumidores no pueden ejercer el derecho de retracto en compras a distancia cuando se trate de bienes confeccionados conforme a las especificaciones del consumidor o claramente personalizados (como sublimación de fotos, placas con datos o impresiones 3D personalizadas). Una vez que tu diseño es aprobado y entra en producción, no es posible cancelar el pedido ni solicitar reembolsos por arrepentimiento."
        },
        {
            q: "El color del producto real se ve un poco diferente al de mi pantalla. ¿Cubre la garantía?",
            a: "No de forma general. Las pantallas emiten luz en formato RGB (Rojo, Verde, Azul), mientras que la impresión física y sublimación utiliza tintas químicas en formato CMYK. Ciertas tonalidades (especialmente colores neón, metalizados y brillos intensos de pantalla) no tienen un equivalente exacto en tinta. Una variación tonal menor de hasta un 10% se considera dentro de la tolerancia física normal y no constituye un defecto de fabricación."
        },
        {
            q: "¿Quién paga los gastos de envío en caso de aplicar la garantía?",
            a: "Si el departamento técnico de Sagason SpA certifica que el producto presenta una falla de fabricación (error de impresión de origen, falla del adhesivo, chip defectuoso de fábrica, costura defectuosa en termos), Sagason SpA asumirá el costo total del reenvío del producto de reemplazo. El cliente debe facilitar el retorno del producto defectuoso a nuestras dependencias para la auditoría técnica pertinente."
        },
        {
            q: "Compré con factura para mi empresa. ¿Tengo los mismos 6 meses de la Ley del Consumidor?",
            a: "No. Las compras emitidas con Factura Comercial (con RUT de empresa) corresponden a transacciones comerciales B2B y no se rigen por la Ley N° 19.496 de Protección al Consumidor (la cual ampara exclusivamente al consumidor final). Estas compras se regulan por el Código de Comercio chileno. Según el Art. 154 de dicho código, el plazo para reclamar por defectos visibles o faltantes es de estrictamente 8 días contados desde la recepción del producto."
        },
        {
            q: "¿Cuáles son las condiciones y medios de pago para los trabajos?",
            a: "Para todo pedido personalizado, las condiciones de pago son de un 40% al momento de realizar el pedido (para iniciar el proceso de diseño y adquisición de insumos) y el 60% restante una vez aprobada la propuesta de arte por parte del cliente y antes de que el trabajo ingrese a la cola física de producción. Todos los pagos se realizan mediante transferencia bancaria electrónica a la cuenta formal a nombre de la empresa, cuyos datos específicos son informados de manera oportuna vía correo electrónico."
        }
    ];

    const currentProd = products[selectedProduct];
    const ProductIcon = currentProd.icon;

    return (
        <div id="warranty" className="warranty">
            {/* Hero Section */}
            <section className="warranty-hero">
                <motion.div
                    className="warranty-hero-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="legal-badge" variants={itemVariants}>
                        <Scale size={16} /> Marco Legal Chileno Vigente
                    </motion.div>
                    <motion.h1 className="warranty-title text-gradient" variants={itemVariants}>
                        Garantías y Retracto
                    </motion.h1>
                    <motion.p className="warranty-subtitle" variants={itemVariants}>
                        En Sagason SpA diseñamos, imprimimos y fabricamos bajo los más altos estándares de calidad técnica.
                        Conoce tus derechos y responsabilidades según el marco normativo de la Ley N° 19.496 y el Código de Comercio.
                    </motion.p>
                </motion.div>
            </section>

            {/* Navigation Tabs */}
            <section className="warranty-tabs-section container">
                <div className="warranty-tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <Icon size={18} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Content Display */}
            <section className="warranty-main-content container">
                <AnimatePresence mode="wait">
                    {activeTab === 'general' && (
                        <motion.div
                            key="general"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="tab-content-panel"
                        >
                            <div className="intro-text">
                                <p>
                                    <strong>Aviso al Consumidor:</strong> Toda transacción realizada por personas naturales sin factura comercial 
                                    está protegida bajo la <strong>Ley N° 19.496 de Protección de los Derechos de los Consumidores</strong> en Chile. 
                                    A continuación detallamos el alcance de tus garantías legales, tiempos y causales aplicables a todo nuestro catálogo.
                                </p>
                            </div>

                            <div className="grid-two-cols">
                                <div className="policy-block glass-panel">
                                    <div className="block-header">
                                        <Shield size={28} className="icon-blue" />
                                        <h2>1. Garantía Legal de 6 Meses</h2>
                                    </div>
                                    <p>
                                        Conforme a la reforma de la <strong>Ley N° 21.398 (Ley Pro Consumidor)</strong>, todo producto nuevo cuenta con una 
                                        <strong> garantía legal de 6 meses</strong> desde su recepción. Ante una falla técnica comprobada o defecto de fábrica 
                                        que lo haga inapto para su uso regular, tienes derecho a la <strong>triple opción</strong> (Art. 19 y 20, Ley 19.496):
                                    </p>
                                    <ul>
                                        <li><strong>Reposición sin costo:</strong> Fabricación y entrega de un nuevo producto idéntico.</li>
                                        <li><strong>Reparación gratuita:</strong> Subsanación de la falla técnica si físicamente es viable.</li>
                                        <li><strong>Devolución del dinero:</strong> Reembolso del monto neto pagado por el artículo.</li>
                                    </ul>
                                    <div className="law-citation">
                                        <Scale size={14} /> Ref: Artículos 19, 20 y 21 - Ley N° 19.496.
                                    </div>
                                </div>

                                <div className="policy-block glass-panel">
                                    <div className="block-header">
                                        <AlertTriangle size={28} className="icon-yellow" />
                                        <h2>2. Exclusión de Retracto</h2>
                                    </div>
                                    <p>
                                        Sagason SpA fabrica artículos bajo demanda y personalizados. Según el <strong>Artículo 3 bis letra b) de la Ley N° 19.496</strong>, 
                                        el derecho de retracto unilateral por parte del comprador queda expresamente <strong>excluido</strong> para bienes confeccionados 
                                        conforme a las especificaciones del consumidor o claramente personalizados.
                                    </p>
                                    <p>
                                        Una vez aprobado el boceto técnico o el archivo digital de impresión por parte del cliente, no se aceptarán 
                                        anulaciones ni devoluciones basadas en arrepentimiento, insatisfacción estética personal o desestimiento de compra.
                                    </p>
                                    <div className="law-citation">
                                        <Scale size={14} /> Ref: Artículo 3 bis, letra b) - Ley N° 19.496.
                                    </div>
                                </div>
                            </div>

                            <div className="claim-flow-block glass-panel">
                                <h2>Procedimiento para Ejercer la Garantía</h2>
                                <p>
                                    Para activar una garantía legal, debes cumplir estrictamente con los siguientes requisitos del <strong>Art. 21 de la Ley 19.496</strong>:
                                </p>
                                <div className="flow-steps">
                                    <div className="step">
                                        <div className="step-num">1</div>
                                        <h4>Comprobante</h4>
                                        <p>Presentar Boleta, Voucher de Pago o documento que acredite la compra.</p>
                                    </div>
                                    <div className="step">
                                        <div className="step-num">2</div>
                                        <h4>Evidencia</h4>
                                        <p>Enviar fotografías o video nítido de la falla a <strong>ventas@sagason.cl</strong>.</p>
                                    </div>
                                    <div className="step">
                                        <div className="step-num">3</div>
                                        <h4>Retorno</h4>
                                        <p>El producto defectuoso debe ser devuelto para la correspondiente inspección técnica de laboratorio.</p>
                                    </div>
                                </div>
                                <div className="warning-box">
                                    <AlertTriangle size={18} />
                                    <span><strong>Importante:</strong> Quedan excluidos de toda garantía legal aquellos deterioros derivados de un hecho imputable al consumidor (caídas, golpes, lavado con químicos no autorizados, negligencia en el mantenimiento).</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'products' && (
                        <motion.div
                            key="products"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="tab-content-panel"
                        >
                            <div className="product-layout">
                                {/* Left column: Selector */}
                                <div className="product-selector">
                                    <h3>Selecciona un Producto</h3>
                                    <div className="product-selector-grid">
                                        {Object.keys(products).map((key) => {
                                            const ProdIcon = products[key].icon;
                                            return (
                                                <button
                                                    key={key}
                                                    className={`prod-select-btn ${selectedProduct === key ? 'active' : ''}`}
                                                    onClick={() => setSelectedProduct(key)}
                                                >
                                                    <ProdIcon size={16} />
                                                    <span>{products[key].name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right column: Details */}
                                <div className="product-details glass-panel">
                                    <div className="details-header">
                                        <ProductIcon size={36} className="icon-blue" />
                                        <div>
                                            <h2>Garantías Técnicas: {currentProd.name}</h2>
                                            <p className="prod-subtitle">{currentProd.cohesion}</p>
                                        </div>
                                    </div>

                                    <div className="specs-section">
                                        <h4><CheckCircle size={16} className="icon-green" /> Criterios de Aceptación Técnica</h4>
                                        <ul>
                                            {currentProd.specifications.map((spec, i) => (
                                                <li key={i}>{spec}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="exclusions-section">
                                        <h4><AlertTriangle size={16} className="icon-yellow" /> Exclusiones Específicas</h4>
                                        <ul>
                                            {currentProd.exclusions.map((excl, i) => (
                                                <li key={i}>{excl}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="law-footer">
                                        <Scale size={16} />
                                        <span><strong>Base Legal Aplicable:</strong> {currentProd.law}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'b2b' && (
                        <motion.div
                            key="b2b"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="tab-content-panel"
                        >
                            <div className="b2b-hero glass-panel">
                                <div className="b2b-header">
                                    <Users size={48} className="icon-blue" />
                                    <h2>Términos Comerciales Mayoristas & B2B</h2>
                                    <p className="accent-text">Regulación de transacciones con Factura Comercial</p>
                                </div>
                                <p>
                                    Cuando la compra se efectúa mediante una <strong>empresa o persona jurídica</strong> solicitando la emisión de una 
                                    <strong> Factura Afecta o Exenta (con RUT de empresa)</strong>, el acto jurídico es de carácter comercial mercantil. 
                                    Estas operaciones <strong>no están sujetas a la Ley N° 19.496 (SERNAC)</strong>, sino que se regulan estrictamente por 
                                    el <strong>Código de Comercio de Chile</strong> y los acuerdos contractuales pactados.
                                </p>
                            </div>

                            <div className="grid-three-cols">
                                <div className="b2b-card glass-panel">
                                    <div className="b2b-card-num">A</div>
                                    <h3>Plazo de Reclamación perentorio (8 Días)</h3>
                                    <p>
                                        Según lo dispuesto en el <strong>Artículo 154 del Código de Comercio</strong>, el comprador tiene un plazo máximo de 
                                        <strong> 8 días hábiles</strong> desde la entrega física para reclamar por cualquier falta de cantidad, defectos 
                                        de calidad visibles o vicios aparentes. Transcurrido este plazo, la mercancía se considerará aceptada a total conformidad.
                                    </p>
                                    <div className="citation">Código de Comercio Art. 154</div>
                                </div>

                                <div className="b2b-card glass-panel">
                                    <div className="b2b-card-num">B</div>
                                    <h3>Aprobación de Muestra Física o Virtual</h3>
                                    <p>
                                        Para pedidos corporativos medianos y grandes, Sagason SpA exige la firma o conformidad vía e-mail de un 
                                        <strong> "Boceto Digital de Producción"</strong> o una <strong>"Muestra Física"</strong>. Una vez autorizada la muestra, 
                                        el cliente no podrá reclamar garantías por errores ortográficos, de diseño, tipografía o distribución espacial 
                                        que hayan estado presentes en el archivo original aprobado.
                                    </p>
                                    <div className="citation">Acuerdo Comercial de Producción</div>
                                </div>

                                <div className="b2b-card glass-panel">
                                    <div className="b2b-card-num">C</div>
                                    <h3>Tolerancia de Merma y Color</h3>
                                    <p>
                                        En la producción masiva de sublimación y manufactura 3D, se establece una tolerancia aceptable de hasta un 
                                        <strong> 3% de merma técnica</strong> del total del pedido (unidades con imperfecciones menores que no comprometen 
                                        su funcionalidad). Asimismo, se acepta una tolerancia tonal delta E (dE) estándar en la consistencia de colores 
                                        de impresión debido a la física térmica del sustrato.
                                    </p>
                                    <div className="citation">Estándar de Manufactura Industrial</div>
                                </div>
                            </div>

                            <div className="b2b-summary-box glass-panel">
                                <h3>Garantías por Vicios Ocultos (B2B)</h3>
                                <p>
                                    Los defectos no visibles (vicios ocultos o redhibitorios) de componentes electrónicos integrados (como chips NFC 
                                    en placas corporativas) o del vacío térmico de termos por mayor, se regirán por los artículos 1857 y siguientes 
                                    del Código Civil chileno, estableciendo un límite de garantía comercial de <strong>90 días</strong> corridos desde la 
                                    facturación, a menos que el contrato de provisión empresarial estipule un plazo superior.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'faq' && (
                        <motion.div
                            key="faq"
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="tab-content-panel"
                        >
                            <div className="faq-section">
                                <h2>Preguntas Frecuentes sobre Garantía</h2>
                                <p className="faq-intro">Todo lo que necesitas saber antes y después de realizar tu compra personalizada.</p>
                                
                                <div className="faq-list">
                                    {faqs.map((faq, i) => (
                                        <div key={i} className={`faq-item glass-panel ${faqOpen[i] ? 'open' : ''}`}>
                                            <button className="faq-question" onClick={() => toggleFaq(i)}>
                                                <span>{faq.q}</span>
                                                <ChevronDown size={18} className="chevron" />
                                            </button>
                                            <AnimatePresence>
                                                {faqOpen[i] && (
                                                    <motion.div 
                                                        className="faq-answer"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <div className="answer-inner">
                                                            <p>{faq.a}</p>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            {/* Contact CTA */}
            <section className="warranty-contact">
                <motion.div
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h2 variants={itemVariants}>¿Tienes un caso de garantía?</motion.h2>
                    <motion.p variants={itemVariants}>
                        Nuestro equipo de soporte técnico resolverá tu inconveniente en el menor plazo posible.
                    </motion.p>
                    <motion.a href="mailto:ventas@sagason.cl" className="btn-primary" variants={itemVariants} style={{ padding: '15px 40px' }}>
                        <Mail size={20} style={{ marginRight: '12px' }} />
                        Contactar Soporte Técnico
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}
