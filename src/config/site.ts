export interface TeamMember {
  id: string;
  name: string;
  role: string;
  academicKey: string;
  avatarInitials: string;
  image?: string;
  linkedinUrl?: string;
}

export const siteConfig = {
  name: "TerosTec",
  tagline: "Software Boutique & Soluciones Digitales",
  email: "terostecuy@gmail.com",
  location: "Montevideo, Uruguay",
  reach: "Global",

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
      image: "/team/marcelo-scalone.webp",
      linkedinUrl: "https://www.linkedin.com/in/marcelo-scalone-566396344/",
    },
    {
      id: "mateo-varela",
      name: "Mateo Varela",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_mateo",
      avatarInitials: "MV",
      image: "/team/mateo-varela.webp",
      linkedinUrl: "https://www.linkedin.com/in/mateo-varela-956402327/",
    },
    {
      id: "kevin-jaffe",
      name: "Kevin Jaffe",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_kevin",
      avatarInitials: "KJ",
      image: "/team/kevin-jaffe.webp",
      linkedinUrl: "https://www.linkedin.com/in/kevin-jaffe-8847443b3/",
    },
    {
      id: "franco-suna",
      name: "Franco Suna",
      role: "Co-Founder & Software Engineer",
      academicKey: "badge_franco",
      avatarInitials: "FS",
      image: "/team/franco-suna.webp",
    },
  ] as TeamMember[],
};
