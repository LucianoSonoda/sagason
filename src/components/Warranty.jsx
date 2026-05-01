import React from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, FileText, Mail } from 'lucide-react';
import '../styles/Warranty.css';

export function Warranty() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    const policyItems = [
        {
            icon: Shield,
            title: "Garantía Legal",
            description: "6 meses de garantía legal ante fallas de fabricación según Ley 19.496"
        },
        {
            icon: FileText,
            title: "Especificaciones",
            description: "Archivos a 300 DPI, perfil CMYK para óptima calidad"
        },
        {
            icon: CheckCircle,
            title: "Reposición",
            description: "Reemplazo sin costo ante fallas técnicas comprobadas"
        },
        {
            icon: Mail,
            title: "Reclamos",
            description: "Contacta a ventas@sagason.cl con comprobante y evidencia"
        }
    ];

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
                    <motion.h1 className="warranty-title" variants={itemVariants}>
                        Políticas de Garantía
                    </motion.h1>
                    <motion.p className="warranty-subtitle" variants={itemVariants}>
                        En Sagason SpA, nos comprometemos con la calidad técnica de cada producto personalizado.
                    </motion.p>
                </motion.div>
            </section>

            {/* Quick Summary */}
            <section className="warranty-features container">
                <motion.div
                    className="features-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {policyItems.map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div key={index} className="feature-card" variants={itemVariants}>
                                <div className="feature-icon">
                                    <IconComponent size={32} />
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>

            {/* Full Content */}
            <section className="warranty-content container">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className="intro-text" variants={itemVariants}>
                        <p>
                            Al realizar una compra, el cliente acepta las siguientes condiciones basadas en la Ley N° 19.496 
                            sobre Protección de los Derechos de los Consumidores en Chile y las especificaciones técnicas de la sublimación.
                        </p>
                    </motion.div>

                    {/* Section 1 */}
                    <motion.div className="policy-section" variants={itemVariants}>
                        <h2>1. Garantía Legal General</h2>
                        <p>
                            De acuerdo a la legislación vigente, todo producto nuevo cuenta con una garantía legal de <strong>6 meses</strong> ante 
                            fallas de fabricación o defectos que lo hagan inapto para su uso normal. Esta garantía permite la reposición del 
                            producto, su reparación gratuita o la devolución del dinero, siempre que la falla no sea imputable al mal uso por 
                            parte del consumidor (Art. 19 y 20, Ley 19.496).
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div className="policy-section" variants={itemVariants}>
                        <h2>2. Especificaciones de Archivos y Diseño</h2>
                        <p>
                            La calidad final del producto depende directamente de la calidad del archivo recibido. Para garantizar un 
                            resultado óptimo, el cliente debe cumplir con:
                        </p>
                        <ul>
                            <li>
                                <strong>Resolución:</strong> Los archivos deben enviarse a 300 DPI en su tamaño real de impresión.
                            </li>
                            <li>
                                <strong>Espacio de Color:</strong> Se debe utilizar el perfil CMYK. Sagason SpA no se responsabiliza por 
                                variaciones tonales derivadas de archivos enviados en formato RGB, ya que la conversión de colores es un 
                                proceso físico-químico inherente a la sublimación.
                            </li>
                            <li>
                                <strong>Contenido:</strong> La empresa no se hace responsable por errores ortográficos, de redacción o 
                                de diseño presentes en el archivo enviado y aprobado por el cliente.
                            </li>
                        </ul>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div className="policy-section" variants={itemVariants}>
                        <h2>3. Láminas de Aluminio Sublimadas</h2>
                        
                        <h3>Derecho de Retracto</h3>
                        <p>
                            Al ser bienes confeccionados según las especificaciones del consumidor (Art. 3 bis letra b, Ley 19.496), 
                            el cliente podrá desistir de la compra solo antes de que el archivo pase a la etapa de producción. Una vez 
                            procesada la lámina, no aplica el derecho a retracto.
                        </p>

                        <h3>Garantía Post-Confección</h3>
                        <p>
                            La garantía cubre exclusivamente fallas técnicas de impresión (como líneas de cabezal o manchas de tinta). 
                            En caso de falla, la solución consiste únicamente en la entrega de un nuevo producto idéntico, utilizando 
                            estrictamente el mismo archivo original sin posibilidad de cambios o correcciones.
                        </p>

                        <h3>Cuidados y Conservación</h3>
                        <p>
                            La limpieza debe realizarse solo con un paño de microfibra seco o levemente húmedo con agua. Queda 
                            excluido de garantía cualquier daño provocado por el uso de solventes (alcohol, acetona), productos químicos 
                            abrasivos o ralladuras mecánicas por contacto con objetos punzantes.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div className="policy-section" variants={itemVariants}>
                        <h2>4. Tazones (Mugs) de 11oz</h2>
                        
                        <h3>Dimensiones de Diseño</h3>
                        <p>
                            El área máxima de impresión es de 205 mm x 95 mm. Diseños fuera de este rango podrán ser ajustados por 
                            nuestro equipo técnico, lo que podría afectar la composición original.
                        </p>

                        <h3>Tazones Mágicos (Termosensibles)</h3>
                        <p>
                            Debido a su recubrimiento especial, estos tazones no son aptos para lavavajillas y no se recomienda su 
                            uso frecuente en microondas, ya que el calor excesivo degrada el pigmento termosensible. La pérdida de 
                            opacidad del color negro por lavado industrial o exposición prolongada al sol (UV) no está cubierta por la garantía.
                        </p>

                        <h3>Tazones Blancos</h3>
                        <p>
                            Son aptos para microondas y lavavajillas en ciclos suaves. Sin embargo, el uso de fibras metálicas o 
                            esponjas abrasivas para su limpieza anula cualquier garantía de durabilidad de la imagen.
                        </p>

                        <h3>Exclusiones Específicas</h3>
                        <p>
                            No se consideran defectos las leves variaciones de color en la zona cercana al asa (debido a la física 
                            de la prensa de calor) ni la visibilidad tenue del diseño bajo la capa negra del tazón mágico en 
                            condiciones de luz intensa.
                        </p>

                        <h3>Reposición</h3>
                        <p>
                            Ante una falla técnica comprobada, se repondrá el tazón por uno nuevo utilizando el mismo diseño inicial. 
                            No se aceptarán archivos nuevos para reemplazos por garantía.
                        </p>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div className="policy-section" variants={itemVariants}>
                        <h2>5. Proceso de Reclamo</h2>
                        <p>
                            Para hacer efectiva cualquier garantía, el cliente debe contactar a <strong>ventas@sagason.cl</strong> adjuntando:
                        </p>
                        <ul>
                            <li>Comprobante de compra</li>
                            <li>Evidencia fotográfica clara de la falla técnica</li>
                        </ul>
                        <p>
                            La evaluación técnica determinará si el defecto corresponde a un error de producción o a una manipulación 
                            incorrecta del producto.
                        </p>
                    </motion.div>
                </motion.div>
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
                    <motion.h2 variants={itemVariants}>¿Tienes alguna duda?</motion.h2>
                    <motion.p variants={itemVariants}>
                        Contacta con nuestro equipo de ventas para más información
                    </motion.p>
                    <motion.a href="mailto:ventas@sagason.cl" className="btn-primary" variants={itemVariants} style={{ padding: '15px 40px' }}>
                        <Mail size={20} style={{ marginRight: '12px' }} />
                        Enviar Correo
                    </motion.a>
                </motion.div>
            </section>
        </div>
    );
}
