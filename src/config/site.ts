export interface TeamMember {
  id: string;
  name: string;
  role: string;
  academicKey: string;
  avatarInitials: string;
  linkedinUrl?: string;
}

export const siteConfig = {
  name: "TerosTec",
  tagline: "Software Boutique & Soluciones Digitales",
  // Al pasar a dominio propio, cambiar acá, en astro.config.mjs, robots.txt y llms.txt
  url: "https://terostec.netlify.app",
  email: "terostecuy@gmail.com",
  instagramUrl: "https://www.instagram.com/terostecuy/",
  location: "Montevideo, Uruguay",
  reach: "Global",

  seo: {
    es: {
      htmlLang: "es-UY",
      title: "Desarrollo de Software y Páginas Web en Montevideo | TerosTec",
      description:
        "Creamos páginas web, tiendas online, bots de WhatsApp y software a medida para pymes de Montevideo y todo Uruguay. Hablemos de tu proyecto.",
    },
    en: {
      htmlLang: "en",
      title: "Custom Software & Web Development in Uruguay | TerosTec",
      description:
        "We build websites, online stores, WhatsApp bots and custom software for businesses in Uruguay and abroad, from Montevideo. Let's talk about your project.",
    },
  },

  // Páginas de servicio (solo en español: apuntan a búsquedas de Uruguay)
  services: [
    { slug: "paginas-web-montevideo", pillarId: "pilar-1", label: "Diseño de páginas web en Montevideo" },
    { slug: "tiendas-online-uruguay", pillarId: "pilar-2", label: "Tiendas online en Uruguay" },
    { slug: "bots-whatsapp-uruguay", pillarId: "pilar-3", label: "Bots de WhatsApp en Uruguay" },
    { slug: "software-a-medida-uruguay", pillarId: "pilar-4", label: "Software a medida en Uruguay" },
  ],

  // Feature flag para el portafolio (actualmente oculto por petición)
  // Cambiar a true cuando se desee mostrar públicamente en la navegación y flujo principal
  showPortfolio: false,

  team: [
    {
      id: "marcelo-scalone",
      name: "Marcelo Scalone",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_marcelo",
      avatarInitials: "MS",
      linkedinUrl: "https://www.linkedin.com/in/marcelo-scalone-566396344/",
    },
    {
      id: "mateo-varela",
      name: "Mateo Varela",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_mateo",
      avatarInitials: "MV",
      linkedinUrl: "https://www.linkedin.com/in/mateo-varela-956402327/",
    },
    {
      id: "kevin-jaffe",
      name: "Kevin Jaffe",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_kevin",
      avatarInitials: "KJ",
      linkedinUrl: "https://www.linkedin.com/in/kevin-jaffe-8847443b3/",
    },
    {
      id: "franco-suna",
      name: "Franco Suna",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_franco",
      avatarInitials: "FS",
    },
  ] as TeamMember[],
};
