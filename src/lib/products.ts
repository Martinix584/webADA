export interface ProductColor {
  id: string;
  label: string;
  iconContent: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  category: "agua-y-soda" | "dispenser" | "purificadores" | "alquileres";
  categoryLabel: string;
  desc: string;
  price: number;
  takeAwayPrice?: number;
  isRent: boolean;
  inStock: boolean;
  iconType: "svg" | "img";
  iconContent: string; // SVG path/content or image filename
  badge?: string; // Optional badge like "Botellon" or "Conexion a Red"
  colors?: ProductColor[];
  specs?: ProductSpec[]; // Technical specs array
}

export const PRODUCTS: Product[] = [
  // --- Agua y Soda ---
  {
    id: "bidon-20l",
    title: "Bidon de agua 20 litros",
    category: "agua-y-soda",
    categoryLabel: "Agua y Soda",
    desc: "Agua purificada Puragua en bidón de 20 litros. Tratada mediante ósmosis inversa y ozonizada para garantizar la máxima pureza y frescura. Somos los únicos en Mendoza en ofrecer este doble proceso de purificación. Ideal para dispensers frío/calor.",
    price: 7500,
    takeAwayPrice: 5500,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/bidon-20l.avif",
    specs: [
      { label: "Volumen", value: "20 Litros" },
      { label: "Proceso", value: "Ósmosis Inversa + Ozonización (Únicos en Mendoza)" },
      { label: "pH", value: "7.2 - 7.5" },
      { label: "Envase", value: "Policarbonato Retornable Libre de BPA" },
      { label: "Certificación", value: "RNE y RNPA Vigentes" }
    ]
  },
  {
    id: "bidon-12l",
    title: "Bidon de agua 12 litros",
    category: "agua-y-soda",
    categoryLabel: "Agua y Soda",
    desc: "Agua purificada Puragua en envase de 12 litros. Tratada mediante ósmosis inversa y ozonizada (único doble proceso en Mendoza). Formato más liviano y ergonómico, fácil de levantar e instalar en soportes o dispensers.",
    price: 5500,
    takeAwayPrice: 4000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/bidon12.avif",
    specs: [
      { label: "Volumen", value: "12 Litros" },
      { label: "Proceso", value: "Ósmosis Inversa + Ozonización (Únicos en Mendoza)" },
      { label: "pH", value: "7.2 - 7.5" },
      { label: "Envase", value: "Policarbonato Retornable con Manija" },
      { label: "Peso lleno", value: "12 kg (Fácil manejo)" }
    ]
  },
  {
    id: "soda-puragua",
    title: "Soda Puragua 1500cc",
    category: "agua-y-soda",
    categoryLabel: "Agua y Soda",
    desc: "Soda premium en sifón retornable de 1500cc, elaborada con nuestra exclusiva agua tratada por ósmosis inversa y ozonizada (somos los únicos en Mendoza). Agua fuertemente gasificada con burbuja fina y persistente.",
    price: 1200,
    takeAwayPrice: 1000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/sifon.avif",
    specs: [
      { label: "Volumen", value: "1500 cc (1.5L)" },
      { label: "Agua base", value: "Ósmosis Inversa + Ozonizada (Únicos en Mendoza)" },
      { label: "Envase", value: "Sifón de PET Retornable" },
      { label: "Nivel de gas", value: "Intenso (Burbuja fina)" },
      { label: "Pack mínimo", value: "Cajón de 6 sifones" }
    ]
  },

  // --- Dispensers ---
  {
    id: "platinum-3temp-bidon",
    title: "Platinum 3 Temperaturas - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser premium de botellón marca Bacope. Ofrece 3 canillas independientes para agua Fría, Caliente y Natural. Cuenta con display de luces LED y un diseño estético contemporáneo ideal para salas de estar, oficinas y hogares.",
    price: 340000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-3temp-removebg-preview.png",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Panel con LEDs" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "105 x 32 x 33 cm" }
    ]
  },
  {
    id: "platinum-3temp-red",
    title: "Platinum 3 Temperaturas - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser premium Bacope con conexión directa a la red de agua. Ideal para empresas y oficinas de alta demanda que buscan flujo constante e ilimitado de agua Fría, Caliente y Natural sin necesidad de manipular botellones.",
    price: 385000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-3temp-removebg-preview.png",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Panel con LEDs" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "105 x 32 x 33 cm" }
    ]
  },
  {
    id: "chopera-friocalor-bidon",
    title: "Chopera Frio/Calor - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Exclusivo dispenser con canillas estilo chopera de tiro rápido. Combina un alto rendimiento de enfriamiento por compresor y calentamiento veloz con una estética robusta y funcional de fácil desinfección.",
    price: 330000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/fcbacopebasico.webp",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "102 x 32 x 32 cm" }
    ]
  },
  {
    id: "chopera-friocalor-red",
    title: "Chopera Frio/Calor - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser de tiro rápido estilo chopera adaptado para conexión directa a red de agua. La solución ideal para comedores industriales y grandes áreas comerciales que exigen durabilidad, velocidad y un caudal constante.",
    price: 420000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/fcbacopebasico.webp",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "102 x 32 x 32 cm" }
    ]
  },
  {
    id: "monocasco-bidon",
    title: "Monocasco - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "El clásico y ultra-resistente dispenser Monocasco marca Bacope. Inyectado en polietileno de alta resistencia que evita rajaduras, decoloración o marcas. Gran desempeño con botellón en un formato muy duradero.",
    price: 260000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/monocasco-removebg-preview.png",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "8 L/h (5°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "5 L/h (85°C - 90°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "98 x 30 x 30 cm" }
    ]
  },
  {
    id: "ada-cuyum-bidon",
    title: "Ada-Cuyum Frio/Calor - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Excelente dispenser de pie de la tradicional línea Ada de Bacope. Cuenta con 2 canillas choperas de gran caudal, una bandeja recolectora amplia y un hermoso gabinete blanco que encaja de forma impecable en cualquier cocina.",
    price: 360000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/fcbacopebasico.webp",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "102 x 32 x 32 cm" }
    ]
  },
  {
    id: "ada-lamo-bidon",
    title: "Ada-Lamo Frio/Calor con Heladera - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser multifuncional que integra una práctica heladera minibar de 16 litros en su base. Ideal para oficinas individuales, despachos profesionales o departamentos pequeños, combinando hidratación y refrigeración en una sola unidad.",
    price: 360000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-refrigerador-removebg-preview.png",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "8 L/h (4°C - 8°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "Sí (Minibar de 16 Litros)" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "108 x 36 x 34 cm" }
    ]
  },
  {
    id: "platinum-refrigerador-red",
    title: "Platinum con Refrigerador - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "La combinación definitiva de tecnología y comodidad. Este dispenser de gama alta se conecta directamente a la red y dispone de una heladerita minibar integrada en la base. Control de termostato y estética elegante en color gris titanio.",
    price: 480000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-refrigerador-removebg-preview.png",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Panel con LEDs" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "Sí (Minibar de 16 Litros)" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "108 x 36 x 34 cm" }
    ]
  },
  {
    id: "platinum-refrigerador-bidon",
    title: "Platinum con Refrigerador - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser premium de pie con sistema a botellón y heladerita minibar integrada en la parte inferior. Combina agua Fría/Caliente al instante con un espacio refrigerado elegante, ideal para salas de reuniones, consultorios y hogares.",
    price: 450000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-refrigerador-removebg-preview.png",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Panel con LEDs" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "Sí (Minibar de 16 Litros)" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "108 x 36 x 34 cm" }
    ]
  },
  {
    id: "zafiro-led-bidon",
    title: "Zafiro con LED - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser de pie línea Zafiro de Bacope con iluminación LED en el sector de canillas. Su diseño estilizado con relieves curvos y bandeja empotrada otorga una estética ultra-moderna y premium a cualquier espacio.",
    price: 290000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/zafiro-led-bidon.avif",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Panel con LEDs (Iluminación de canilla)" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "103 x 31 x 32 cm" }
    ]
  },
  {
    id: "zafiro-led-red",
    title: "Zafiro con LED - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "La versión Zafiro de conexión directa a red con iluminación LED en canillas. Ofrece agua purificada fría y caliente de manera ilimitada con una apariencia impecable y sofisticada, libre de botellones.",
    price: 380000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/zafiro-led-red.avif",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Panel con LEDs (Iluminación de canilla)" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "103 x 31 x 32 cm" }
    ]
  },
  {
    id: "mini-zafiro-red",
    title: "Mini Zafiro - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser compacto de mesada. Toda la potencia de enfriamiento por compresor de la línea Zafiro reducida a un tamaño ideal para colocar sobre la mesada de tu cocina u oficina, conectado directo a la red.",
    price: 280000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/mini-zafiro-red.avif",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "54 x 31 x 32 cm" }
    ]
  },
  {
    id: "mini-zafiro-bidon",
    title: "Mini Zafiro - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser compacto de sobre mesada con sistema de botellón. Ofrece agua fría y caliente de manera instantánea utilizando un compresor comercial de alto rendimiento, optimizando al máximo el espacio físico disponible.",
    price: 260000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/mini-zafiro-bidon.avif",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "54 x 31 x 32 cm" }
    ]
  },
  {
    id: "zafiro-sinled-bidon",
    title: "Zafiro Frio/Calor - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "El dispenser de pie Zafiro clásico. Excelente relación calidad-precio ofreciendo toda la robustez mecánica y potencia de enfriamiento/calentamiento de la marca Bacope con un diseño simple y elegante sin luces LED.",
    price: 330000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/zafiro-led-bidon.avif",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "103 x 31 x 32 cm" }
    ]
  },
  {
    id: "zafiro-sinled-red",
    title: "Zafiro Frio/Calor - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Dispenser Zafiro clásico con conexión directa a la red. Una opción sumamente funcional y duradera para empresas y comercios que priorizan rendimiento, higiene y economía sin descuidar la estética.",
    price: 360000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/zafiro-led-red.avif",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "103 x 31 x 32 cm" }
    ]
  },
  {
    id: "platinum-digital-hielo-bidon",
    title: "Platinum Digital con Hielo - Bidon",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "El dispenser de agua definitivo. Este modelo premium combina canillas de agua Fría, Caliente y Natural con una potente fabricadora de cubitos de hielo integrada en su base. Control táctil digital de última generación con sensor inteligente de nivel.",
    price: 550000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-hielo-removebg-preview.png",
    badge: "Botellon",
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Digital (Táctil LED)" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No (Trae fabricadora de hielo: 13 kg/día)" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "112 x 38 x 36 cm" }
    ]
  },
  {
    id: "platinum-digital-hielo-red",
    title: "Platinum Digital con Hielo - Red",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "El modelo tope de gama para oficinas corporativas y residencias exclusivas. Combina conexión directa a red de agua con una fabricadora de hielo de alto rendimiento y agua en 3 temperaturas, gestionado por un panel digital de vanguardia.",
    price: 580000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/platinum-hielo-removebg-preview.png",
    badge: "Conexion a Red",
    specs: [
      { label: "Alimentación", value: "Conexión directa a red" },
      { label: "Interfaz", value: "Digital (Táctil LED)" },
      { label: "Rendimiento Agua Fría", value: "10 L/h (4°C - 10°C)" },
      { label: "Rendimiento Agua Caliente", value: "8 L/h (85°C - 95°C)" },
      { label: "¿Trae heladera?", value: "No (Trae fabricadora de hielo: 13 kg/día)" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "112 x 38 x 36 cm" }
    ]
  },
  {
    id: "dispenser-natural",
    title: "Dispenser Natural",
    category: "dispenser",
    categoryLabel: "Dispenser",
    desc: "Soporte de dispenser natural para agua a temperatura ambiente. Fabricado en plástico virgen reforzado de alta durabilidad, compatible con botellones de 10, 12 y 20 Litros. No requiere conexión eléctrica ni mantenimiento.",
    price: 10000,
    isRent: false,
    inStock: true,
    iconType: "img",
    iconContent: "/assets/natural-blanco.avif",
    badge: "",
    colors: [
      { id: "blanco", label: "Blanco", iconContent: "/assets/natural-blanco.avif", hex: "#ffffff" },
      { id: "gris", label: "Gris", iconContent: "/assets/natural-gris.avif", hex: "#9ca3af" },
      { id: "negro", label: "Negro", iconContent: "/assets/natural-negro.avif", hex: "#1f2937" }
    ],
    specs: [
      { label: "Alimentación", value: "Bidón (10, 12 o 20L)" },
      { label: "Interfaz", value: "Nada" },
      { label: "Rendimiento Agua Fría", value: "No aplica (Temp. ambiente)" },
      { label: "Rendimiento Agua Caliente", value: "No aplica" },
      { label: "¿Trae heladera?", value: "No" },
      { label: "Dimensiones (Alto x Ancho x Prof)", value: "28 x 26 x 26 cm" }
    ]
  }
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
