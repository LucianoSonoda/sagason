// ============================================================
//  SAGASON SPA – Catálogo de Productos de Sublimación
//  Datos estáticos: descripción, materiales, tallas, cuidados.
//  Los PRECIOS se cargan desde DynamoDB vía Lambda.
// ============================================================

export const PRODUCT_CATEGORIES = [
  { id: 'TAZONES',       label: 'Tazones / Mugs',        color: '#a21caf', icon: '☕' },
  { id: 'TUMBLERS',      label: 'Tumblers / Termos',      color: '#0f766e', icon: '🧉' },
  { id: 'MOUSEPAD',      label: 'Mousepad',               color: '#1d4ed8', icon: '🖱️' },
  { id: 'CUADRO_HD',     label: 'Cuadros HD Aluminio',    color: '#b91c1c', icon: '🖼️' },
  { id: 'POSAVASOS',     label: 'Posavasos',              color: '#c2410c', icon: '🟤' },
  { id: 'BOLSAS',        label: 'Bolsas Sublimadas',      color: '#7c3aed', icon: '👜' },
  { id: 'PUZZLES',       label: 'Puzzles / Rompecabezas', color: '#4338ca', icon: '🧩' },
  { id: 'AZULEJOS',      label: 'Azulejos / Planchas',    color: '#0369a1', icon: '🔲' },
  { id: 'BOTELLAS',      label: 'Botellas Aluminio',      color: '#047857', icon: '🍶' },
  { id: 'LLAVEROS',      label: 'Llaveros Sublimados',    color: '#b45309', icon: '🔑' },
  { id: 'ID_MASCOTAS',   label: 'ID Mascotas',            color: '#d97706', icon: '🐾' },
  { id: 'ID_SALUD',      label: 'ID Salud',               color: '#be185d', icon: '🏥' },
];

export const PRODUCTS = [
  // ─────────────────────────────────────────────
  //  TAZONES / MUGS
  // ─────────────────────────────────────────────
  {
    productId: 'tazon-11oz',
    name: 'Tazón Sublimado 11oz',
    category: 'TAZONES',
    shortDesc: 'Tazón clásico personalizado con tu foto o diseño favorito en alta definición.',
    description:
      'Nuestros tazones de cerámica blanca AAA son el regalo perfecto para cualquier ocasión. ' +
      'La sublimación de tinta en caliente asegura que el diseño quede incrustado en la superficie, ' +
      'logrando colores vibrantes y una nitidez de imagen excepcional que no se desvanece con el tiempo. ' +
      'Ideal para café, té o cualquier bebida caliente. Disponible con diseño personalizado: fotos, ' +
      'nombres, fechas, frases y arte digital.',
    materials: 'Cerámica blanca AAA, recubrimiento polímero de sublimación, borde y base sin coating.',
    sizes: [
      { label: '11oz', detail: 'Altura 9.5 cm · Diámetro 8.2 cm · Capacidad 325 ml' },
      { label: '15oz', detail: 'Altura 11.5 cm · Diámetro 8.7 cm · Capacidad 450 ml' },
    ],
    care: [
      'Lavar a mano con agua tibia y jabón suave. No usar esponjas abrasivas.',
      'No apto para lavavajillas automático (el calor degrada el coating sublimado).',
      'No usar microondas con el tazón lleno de líquido frío directo desde el congelador.',
      'Evitar caídas y golpes: la cerámica es frágil.',
      'Secar inmediatamente después del lavado para mantener el brillo.',
    ],
    tag: 'MÁS VENDIDO',
    tagColor: '#a21caf',
  },
  {
    productId: 'tazon-magico',
    name: 'Tazón Mágico Sublimado',
    category: 'TAZONES',
    shortDesc: 'El diseño aparece con el calor: negro en frío, revela tu imagen con el café caliente.',
    description:
      'El tazón mágico negro es uno de nuestros productos más sorprendentes. ' +
      'En frío luce completamente negro, pero al verter una bebida caliente el diseño completo ' +
      'aparece como por arte de magia. Perfecto como regalo sorpresa con fotos de familia, ' +
      'parejas o mascotas. La reacción térmica ocurre a partir de los 45°C.',
    materials: 'Cerámica blanca AAA, recubrimiento termosensible negro, tinta de sublimación.',
    sizes: [
      { label: '11oz', detail: 'Altura 9.5 cm · Diámetro 8.2 cm · Capacidad 325 ml' },
    ],
    care: [
      'Lavar exclusivamente a mano con agua fría o tibia. El agua muy caliente puede dañar el recubrimiento termosensible.',
      'No lavar en lavavajillas automático bajo ninguna circunstancia.',
      'No sumergir en agua ni remojar por períodos prolongados.',
      'Secar con paño suave inmediatamente tras el lavado.',
      'Guardar en lugar seco y sin exposición solar directa.',
    ],
    tag: 'EFECTO MÁGICO',
    tagColor: '#7c3aed',
  },

  // ─────────────────────────────────────────────
  //  TUMBLERS / TERMOS
  // ─────────────────────────────────────────────
  {
    productId: 'tumbler-20oz',
    name: 'Tumbler Inox Sublimado 20oz',
    category: 'TUMBLERS',
    shortDesc: 'Vaso térmico de acero inoxidable con tu diseño personalizado. Mantiene frío/calor por horas.',
    description:
      'Tumbler de doble pared en acero inoxidable 304 grado alimenticio. ' +
      'La tecnología de sublimación sobre recubrimiento epóxico especial permite imprimir ' +
      'diseños de alta resolución que resisten el uso diario. Mantiene bebidas calientes hasta 6 horas ' +
      'y frías hasta 12 horas. Incluye tapa con sistema anti-derrame. ' +
      'Personalizable con fotos, nombres, ilustraciones o diseños corporativos.',
    materials: 'Acero inoxidable 304 de doble pared, recubrimiento epóxico sublimable, tapa plástica ABS.',
    sizes: [
      { label: '20oz (600 ml)', detail: 'Altura 18 cm · Diámetro inferior 8 cm · Con tapa' },
      { label: '30oz (900 ml)', detail: 'Altura 21 cm · Diámetro inferior 8.5 cm · Con tapa' },
    ],
    care: [
      'Lavar a mano con agua tibia y esponja suave. No usar limpiadores abrasivos.',
      'No lavar en lavavajillas automático: el calor y detergentes agresivos degradan el sublimado.',
      'No microondas: es metal.',
      'Secar completamente antes de guardar para evitar óxido en los bordes.',
      'No usar con bebidas carbonatadas muy ácidas por períodos prolongados.',
    ],
    tag: 'PREMIUM',
    tagColor: '#0f766e',
  },

  // ─────────────────────────────────────────────
  //  MOUSEPAD
  // ─────────────────────────────────────────────
  {
    productId: 'mousepad-standard',
    name: 'Mousepad Sublimado Estándar',
    category: 'MOUSEPAD',
    shortDesc: 'Mousepad personalizado con superficie de tela suave y base antideslizante de caucho.',
    description:
      'Mousepad de alta calidad con sublimación en tela de poliéster de tejido fino. ' +
      'La base de caucho natural garantiza adherencia perfecta al escritorio. ' +
      'La superficie texturada proporciona el deslizamiento ideal tanto para mouse óptico como láser. ' +
      'Ideal para uso personal, gaming ligero y regalos corporativos. ' +
      'Resolución de impresión 1440 DPI para máximo detalle en el diseño.',
    materials: 'Superficie: tela de poliéster 100% sublimable. Base: caucho natural antideslizante 3mm.',
    sizes: [
      { label: 'Estándar 21×21 cm', detail: 'Cuadrado · Grosor 3 mm' },
      { label: 'Medio 20×24 cm', detail: 'Rectangular · Grosor 3 mm' },
      { label: 'Grande 40×45 cm', detail: 'XL para escritorio completo · Grosor 3 mm' },
    ],
    care: [
      'Lavar a mano con agua fría y jabón neutro. Frotar suavemente con esponja suave.',
      'No torcer ni retorcer fuertemente: puede deformar el caucho de la base.',
      'Secar al aire libre en posición plana. No usar secadora.',
      'No planchar directamente sobre el diseño sublimado.',
      'Evitar exposición solar prolongada para mantener la viveza de los colores.',
    ],
  },

  // ─────────────────────────────────────────────
  //  CUADROS HD ALUMINIO
  // ─────────────────────────────────────────────
  {
    productId: 'cuadro-aluminio-hd',
    name: 'Cuadro HD Aluminio Sublimado',
    category: 'CUADRO_HD',
    shortDesc: 'Impresión fotográfica sobre aluminio de alta definición. Colores metálicos únicos que brillan.',
    description:
      'Nuestros cuadros de aluminio HD son la forma más elegante de decorar tu hogar con tus recuerdos. ' +
      'La sublimación directa sobre planchas de aluminio anodizado produce colores metálicos únicos: ' +
      'las zonas claras del diseño adquieren el brillo natural del metal, creando un efecto que ningún papel ' +
      'fotográfico puede replicar. El acabado es resistente a rayones, humedad y luz UV. ' +
      'Incluye sistema de colgado incluido. ' +
      'Perfectos para retratos, paisajes, fotos de bodas, arte digital y decoración corporativa.',
    materials: 'Aluminio anodizado blanco de 1.5 mm, sublimación de tinta, sistema de colgado trasero.',
    sizes: [
      { label: '15×20 cm', detail: 'Pequeño · Ideal escritorio' },
      { label: '20×30 cm', detail: 'Mediano · Pared o escritorio' },
      { label: '30×40 cm', detail: 'Grande · Decoración pared' },
      { label: '40×60 cm', detail: 'XL · Pieza central de sala' },
      { label: 'Personalizado', detail: 'Consultar medidas específicas' },
    ],
    care: [
      'Limpiar con paño suave y seco o ligeramente húmedo. No usar productos abrasivos.',
      'No sumergir en agua ni exponerlo a lluvia directa.',
      'Colgar en lugares secos y con buena ventilación.',
      'Evitar exposición solar directa e intensa por períodos prolongados para preservar los colores.',
      'No rayar con objetos metálicos ni llaves.',
    ],
    tag: 'ALTA DEFINICIÓN',
    tagColor: '#b91c1c',
  },

  // ─────────────────────────────────────────────
  //  POSAVASOS
  // ─────────────────────────────────────────────
  {
    productId: 'posavasos-set4',
    name: 'Set Posavasos Sublimados (x4)',
    category: 'POSAVASOS',
    shortDesc: 'Set de 4 posavasos personalizados en MDF o cerámica. Cada uno con su propio diseño.',
    description:
      'Set de 4 posavasos redondos o cuadrados con sublimación de alta definición. ' +
      'Cada posavaso puede llevar un diseño diferente o todos iguales, según tu preferencia. ' +
      'La base de corcho evita rayones en la mesa y amortigua el ruido al apoyar. ' +
      'Perfectos como regalo de cumpleaños, bodas, aniversarios o decoración temática del hogar. ' +
      'Disponibles con fotos familiares, diseños de series, arte, kanji, logos y más.',
    materials: 'MDF sublimable 3 mm o cerámica blanca, base de corcho adhesivo, acabado brillante.',
    sizes: [
      { label: 'Redondo Ø 9 cm', detail: 'MDF · Base corcho' },
      { label: 'Cuadrado 9×9 cm', detail: 'MDF · Base corcho' },
      { label: 'Redondo Ø 10 cm', detail: 'Cerámica · Base corcho' },
    ],
    care: [
      'Limpiar con paño húmedo y jabón suave. No sumergir en agua.',
      'No usar en lavavajillas: el calor y humedad afectan el MDF y el sublimado.',
      'Guardar en lugar seco y plano.',
      'Si la base de corcho se despega, puede adherirse nuevamente con pegamento de contacto.',
    ],
  },

  // ─────────────────────────────────────────────
  //  BOLSAS SUBLIMADAS
  // ─────────────────────────────────────────────
  {
    productId: 'bolsa-tote',
    name: 'Bolsa Tote Sublimada',
    category: 'BOLSAS',
    shortDesc: 'Bolsa tote de poliéster con diseño personalizado. Fuerte, lavable y ecológica.',
    description:
      'Bolsa tote de poliéster de alta densidad 100% sublimable. ' +
      'El diseño cubre toda la superficie de la bolsa con colores vibrantes y detalle excepcional. ' +
      'Con capacidad para uso diario: compras, playa, trabajo o escuela. ' +
      'Asas reforzadas con doble costura para mayor durabilidad. ' +
      'Excelente para diseños full-color, fotos panorámicas, arte digital o logos corporativos.',
    materials: 'Poliéster 100% de alta densidad 200g/m², asas de la misma tela reforzada, costura doble.',
    sizes: [
      { label: '38×42 cm', detail: 'Tote estándar · Asa 60 cm' },
      { label: '40×50 cm', detail: 'Tote grande · Asa 65 cm' },
    ],
    care: [
      'Lavar a máquina en ciclo delicado, agua fría (30°C máximo).',
      'No usar lejía ni blanqueadores: dañan el diseño sublimado.',
      'Secar al aire libre extendida. No usar secadora.',
      'Planchar a baja temperatura al reverso, nunca directamente sobre el diseño.',
      'No refregar con fuerza en zonas con diseño.',
    ],
  },

  // ─────────────────────────────────────────────
  //  PUZZLES / ROMPECABEZAS
  // ─────────────────────────────────────────────
  {
    productId: 'puzzle-110',
    name: 'Rompecabezas Sublimado 110 pzs',
    category: 'PUZZLES',
    shortDesc: 'Rompecabezas personalizado con tu foto favorita. 110 piezas, perfecto para niños y adultos.',
    description:
      'Rompecabezas de madera MDF sublimada con tu foto o diseño favorito. ' +
      'Cada pieza es única y corte de precisión laser garantiza un encaje perfecto. ' +
      'Regalo original para cualquier edad: niños aprenden con sus fotos familiares, ' +
      'adultos disfrutan del reto y lo enmarcan como recuerdo. ' +
      'Disponible en 110 piezas para principiantes y 252 piezas para mayor desafío. ' +
      'Viene en caja personalizada con el diseño en la tapa.',
    materials: 'MDF 3mm de alta densidad, sublimación directa, corte láser de precisión, caja de cartón.',
    sizes: [
      { label: '110 piezas – 28×19 cm', detail: 'Dificultad baja-media · Apto mayores de 3 años' },
      { label: '252 piezas – 38×26 cm', detail: 'Dificultad media · Apto mayores de 8 años' },
    ],
    care: [
      'Guardar las piezas en su caja original para evitar pérdidas.',
      'No mojar ni exponer a humedad: el MDF se puede deformar.',
      'Limpiar con paño seco si hay polvo. No usar líquidos.',
      'Guardar en lugar fresco, seco y plano.',
      'Si se desea enmarcar el puzzle terminado, usar pegamento para puzzle y marco sin vidrio reflectante.',
    ],
    tag: 'REGALO IDEAL',
    tagColor: '#4338ca',
  },

  // ─────────────────────────────────────────────
  //  AZULEJOS / PLANCHAS
  // ─────────────────────────────────────────────
  {
    productId: 'azulejo-10x10',
    name: 'Azulejo / Plancha Sublimada',
    category: 'AZULEJOS',
    shortDesc: 'Azulejo cerámico sublimado para decoración, regalo o colección. Alta resistencia.',
    description:
      'Azulejo cerámico blanco de alta calidad con sublimación de tinta. ' +
      'La cerámica proporciona una dureza y resistencia superior al MDF o al papel fotográfico. ' +
      'Perfecto para decorar cocinas, baños, escritorios u oficinas. ' +
      'Puede usarse como posavaso individual de alta resistencia o como cuadro decorativo con soporte trasero. ' +
      'Colores duraderos que no se desvanecem con el tiempo ni la exposición al ambiente.',
    materials: 'Cerámica blanca de alta densidad, recubrimiento sublimable, base de corcho (opcional), soporte trasero (opcional).',
    sizes: [
      { label: '10×10 cm', detail: 'Cuadrado · Grosor 5 mm · Con/sin corcho base' },
      { label: '15×15 cm', detail: 'Cuadrado · Grosor 5 mm · Con/sin corcho base' },
      { label: '20×20 cm', detail: 'Cuadrado · Grosor 5 mm · Solo decoración' },
    ],
    care: [
      'Limpiar con paño húmedo. Resistente a la humedad ambiente.',
      'No golpear contra superficies duras: la cerámica puede romperse.',
      'En uso como posavaso: no poner vasos a más de 80°C directamente.',
      'Lavar con agua y jabón neutro si está en uso como posavaso.',
      'No rayar con objetos metálicos para preservar el diseño.',
    ],
  },

  // ─────────────────────────────────────────────
  //  BOTELLAS DE ALUMINIO
  // ─────────────────────────────────────────────
  {
    productId: 'botella-aluminio-750',
    name: 'Botella Aluminio Sublimada 750ml',
    category: 'BOTELLAS',
    shortDesc: 'Botella de aluminio personalizada con diseño sublimado. Ligera, durable y con tapa rosca.',
    description:
      'Botella de aluminio anodizado sublimable. Una alternativa ligera y ecológica a las botellas plásticas, ' +
      'con la ventaja de poder personalizarla completamente con tu diseño, fotos o logos. ' +
      'Ideal para deportes, senderismo, uso diario en oficina o escuela. ' +
      'El diseño sublimado cubre 360° de la botella para una presentación premium. ' +
      'Con tapa rosca de aluminio incluida.',
    materials: 'Aluminio anodizado grado alimenticio, recubrimiento sublimable, tapa rosca de aluminio.',
    sizes: [
      { label: '500 ml', detail: 'Altura 18 cm · Diámetro 7 cm · Con tapa rosca' },
      { label: '750 ml', detail: 'Altura 22 cm · Diámetro 7.5 cm · Con tapa rosca' },
    ],
    care: [
      'Lavar a mano con agua tibia y jabón suave. No usar lavavajillas.',
      'No usar con bebidas carbonatadas: la presión puede deformar la botella.',
      'No congelar con líquido adentro: el aluminio puede deformarse.',
      'No microondas: es metal.',
      'Secar boca abajo después del lavado para evitar humedad interior.',
    ],
  },

  // ─────────────────────────────────────────────
  //  LLAVEROS SUBLIMADOS
  // ─────────────────────────────────────────────
  {
    productId: 'llavero-sublimado',
    name: 'Llavero Sublimado Personalizado',
    category: 'LLAVEROS',
    shortDesc: 'Llavero personalizado con foto o diseño sublimado. Disponible en MDF, acrílico y aluminio.',
    description:
      'Llaveros personalizados con sublimación de alta definición. ' +
      'Disponibles en tres materiales con características únicas: MDF ligero y económico, ' +
      'acrílico transparente con efecto premium, y aluminio para máxima durabilidad. ' +
      'Cada llavero incluye argolla metálica y mosquetón de acero. ' +
      'Perfectos para uso personal, regalos corporativos, souvenirs o eventos especiales. ' +
      'Impresión a doble cara disponible.',
    materials: 'MDF 3mm o acrílico 3mm o aluminio anodizado 1.5mm, argolla metálica, mosquetón de acero inoxidable.',
    sizes: [
      { label: 'Redondo Ø 5 cm', detail: 'MDF o acrílico' },
      { label: 'Rectangular 4×6 cm', detail: 'MDF, acrílico o aluminio' },
      { label: 'Forma personalizada', detail: 'Consultar formas disponibles' },
    ],
    care: [
      'Limpiar con paño seco suave. Evitar mojar en exceso el MDF.',
      'El acrílico y aluminio son más resistentes a la humedad que el MDF.',
      'Evitar raspar con llaves u objetos metálicos el lado sublimado.',
      'No exponer al calor directo (guantera del auto en verano).',
    ],
  },

  // ─────────────────────────────────────────────
  //  ID MASCOTAS
  // ─────────────────────────────────────────────
  {
    productId: 'id-mascota',
    name: 'Placa ID Mascotas',
    category: 'ID_MASCOTAS',
    shortDesc: 'Placa de identificación para tu mascota con foto, nombre y datos de contacto grabados en metal.',
    description:
      'Placas de identificación para mascotas en acero inoxidable o aluminio anodizado. ' +
      'Con grabado láser de alta precisión que garantiza información permanente: nombre de la mascota, ' +
      'teléfono del dueño, dirección o cualquier dato que necesites. ' +
      'También disponible con foto de tu mascota en sublimación. ' +
      'Argolla de acero inoxidable incluida para fácil instalación en collar. ' +
      'Resistente al agua, sudor animal y uso exterior permanente.',
    materials: 'Acero inoxidable 304 o aluminio anodizado, grabado láser, argolla de acero inoxidable.',
    sizes: [
      { label: 'Hueso 4×2.5 cm', detail: 'Acero inox · Grabado láser ambas caras' },
      { label: 'Redondo Ø 3.5 cm', detail: 'Aluminio o acero · Con o sin foto sublimada' },
      { label: 'Rectangular 4×3 cm', detail: 'Aluminio · Con foto + datos' },
    ],
    care: [
      'Material resistente al agua y uso exterior continuo.',
      'Limpiar con paño húmedo si se acumula suciedad.',
      'Revisar periódicamente que la argolla esté bien cerrada.',
      'El grabado láser es permanente y no se borra con el uso.',
    ],
    tag: 'CON GRABADO LÁSER',
    tagColor: '#b45309',
  },

  // ─────────────────────────────────────────────
  //  ID SALUD
  // ─────────────────────────────────────────────
  {
    productId: 'id-salud',
    name: 'Placa ID Salud / Emergencia',
    category: 'ID_SALUD',
    shortDesc: 'Placa médica con datos de emergencia grabados en metal. Para personas con condiciones especiales.',
    description:
      'Placa de identificación médica en acero inoxidable para personas con condiciones de salud especiales: ' +
      'alergias, diabetes, epilepsia, hipertensión, marcapasos u otras. ' +
      'En caso de emergencia, el personal médico puede leer rápidamente la información vital. ' +
      'El grabado láser es profundo y permanente, nunca se borra. ' +
      'Diseño discreto y elegante en formato pulsera, collar o llavero. ' +
      'Resistente al agua y sudor para uso 24/7.',
    materials: 'Acero inoxidable 316L (hipoalergénico), grabado láser profundo, cadena o pulsera de acero.',
    sizes: [
      { label: 'Placa rectangular 5×2.5 cm', detail: 'Con pulsera ajustable · Grabado ambas caras' },
      { label: 'Placa redonda Ø 3 cm', detail: 'Con cadena · Grabado 1 cara' },
      { label: 'Solo placa (sin cadena)', detail: 'Para usar con collar existente' },
    ],
    care: [
      'Material hipoalergénico 316L, apto para uso permanente en la piel.',
      'Lavar con agua y jabón. Secar bien para evitar manchas de agua.',
      'Revisar la cadena o pulsera periódicamente.',
      'El grabado láser es permanente: la información no se borra con el uso ni el agua.',
    ],
    tag: 'GRABADO LÁSER',
    tagColor: '#be185d',
  },
];

// Helper: obtener todos los productos de una categoría
export function getProductsByCategory(categoryId) {
  return PRODUCTS.filter(p => p.category === categoryId);
}

// Helper: obtener un producto por su ID
export function getProductById(productId) {
  return PRODUCTS.find(p => p.productId === productId);
}

// Helper: obtener info de categoría por ID
export function getCategoryInfo(categoryId) {
  return PRODUCT_CATEGORIES.find(c => c.id === categoryId);
}
