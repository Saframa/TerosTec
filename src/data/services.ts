export interface ServiceSection {
  title: string;
  text: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePage {
  title: string;
  description: string;
  h1: string;
  intro: string;
  serviceType: string;
  offeringsTitle: string;
  offerings: ServiceSection[];
  audienceTitle: string;
  audience: string[];
  faqs: ServiceFaq[];
}

const coverageFaq: ServiceFaq = {
  q: '¿Trabajan solo con empresas de Montevideo?',
  a: 'No. Estamos en Montevideo y trabajamos con clientes de todo Uruguay y del exterior.',
};

const pricingFaq: ServiceFaq = {
  q: '¿Cuánto cuesta?',
  a: 'Depende del alcance de cada proyecto. Primero relevamos lo que tu negocio necesita y después te pasamos un presupuesto. Puedes pedirlo desde el formulario de contacto.',
};

// Solo afirmaciones que TerosTec ofrece hoy: sin precios, plazos ni clientes hasta tener datos reales.
export const servicePages: Record<string, ServicePage> = {
  'paginas-web-montevideo': {
    title: 'Diseño de Páginas Web en Montevideo | TerosTec',
    description:
      'Diseño de páginas web y landing pages en Montevideo para pymes de Uruguay: rápidas, adaptadas al celular y con SEO técnico. Hablemos de tu proyecto.',
    h1: 'Diseño de páginas web en Montevideo',
    intro:
      'En TerosTec diseñamos y desarrollamos páginas web para pymes y emprendimientos de Montevideo y todo Uruguay. Son sitios rápidos, adaptados al celular y pensados para que el visitante te escriba, reserve o pida presupuesto.',
    serviceType: 'Diseño y desarrollo web',
    offeringsTitle: 'Qué podemos hacer por tu negocio',
    offerings: [
      {
        title: 'Landing pages y webs institucionales',
        text: 'Estructura persuasiva, adaptación móvil y SEO técnico para que tu negocio se presente bien y se pueda encontrar en Google.',
      },
      {
        title: 'Cotizadores web y calculadores interactivos',
        text: 'Tus clientes cotizan en tiempo real desde la web y tú recibes prospectos calificados.',
      },
      {
        title: 'Sistemas de reservas y turnos',
        text: 'Gestión automática de citas, con confirmación y recordatorios.',
      },
    ],
    audienceTitle: 'Para quién es',
    audience: [
      'Comercios y empresas de servicios que todavía no tienen web, o tienen una que no les trae consultas.',
      'Negocios con agenda que hoy coordinan los turnos a mano.',
      'Empresas que cotizan por mensaje y quieren responder más rápido.',
    ],
    faqs: [
      pricingFaq,
      coverageFaq,
      {
        q: '¿La página se va a ver bien en el celular?',
        a: 'Sí. Diseñamos primero para el celular, porque es desde donde entra la mayoría de los clientes, y probamos el sitio en distintos navegadores y dispositivos antes de entregarlo.',
      },
      {
        q: '¿La web incluye SEO?',
        a: 'Incluye SEO técnico: velocidad de carga, estructura de la página y datos que Google necesita para entender tu negocio.',
      },
    ],
  },
  'tiendas-online-uruguay': {
    title: 'Tiendas Online en Uruguay con Mercado Pago | TerosTec',
    description:
      'Desarrollamos tiendas online y catálogos B2B en Uruguay, con cobros por Mercado Pago o Stripe y portales para tus clientes. Hablemos de tu proyecto.',
    h1: 'Tiendas online y comercio B2B en Uruguay',
    intro:
      'En TerosTec desarrollamos tiendas online, catálogos mayoristas y portales de clientes para empresas de Uruguay. Cobras con pasarelas locales e internacionales, como Mercado Pago y Stripe, y ordenas los pedidos en un solo lugar.',
    serviceType: 'Desarrollo de comercio electrónico',
    offeringsTitle: 'Qué podemos hacer por tu negocio',
    offerings: [
      {
        title: 'Tiendas online con pasarela integrada',
        text: 'Cobros locales e internacionales con Mercado Pago y Stripe.',
      },
      {
        title: 'Catálogos B2B y toma de pedidos',
        text: 'Un flujo ágil de pedidos para distribuidores y compradores recurrentes.',
      },
      {
        title: 'Portales de clientes o extranet',
        text: 'Espacios seguros donde tus clientes consultan estados, descargan documentos y ven su facturación.',
      },
    ],
    audienceTitle: 'Para quién es',
    audience: [
      'Comercios que venden por redes o WhatsApp y quieren cobrar online.',
      'Mayoristas y distribuidores que reciben pedidos por mensaje o planilla.',
      'Empresas cuyos clientes piden por teléfono información que podrían consultar solos.',
    ],
    faqs: [
      pricingFaq,
      coverageFaq,
      {
        q: '¿Qué medios de pago se pueden integrar?',
        a: 'Trabajamos con pasarelas como Mercado Pago, para cobros en Uruguay, y Stripe, para cobros internacionales.',
      },
      {
        q: '¿Puedo tener precios distintos para clientes mayoristas?',
        a: 'Sí. Los catálogos B2B se diseñan a medida, así que pueden incluir acceso con usuario y condiciones por cliente.',
      },
    ],
  },
  'bots-whatsapp-uruguay': {
    title: 'Bots de WhatsApp para Empresas en Uruguay | TerosTec',
    description:
      'Bots de WhatsApp para empresas de Uruguay: responden consultas, califican prospectos y derivan a tu equipo. Integraciones con n8n y Make. Hablemos.',
    h1: 'Bots de WhatsApp y automatización para empresas en Uruguay',
    intro:
      'En TerosTec creamos bots de WhatsApp y automatizaciones para empresas de Uruguay. El bot responde las preguntas frecuentes, califica a los prospectos y deriva a una persona de tu equipo cuando hace falta.',
    serviceType: 'Automatización de procesos y chatbots',
    offeringsTitle: 'Qué podemos hacer por tu negocio',
    offerings: [
      {
        title: 'Bots de WhatsApp automatizados',
        text: 'Calificación de prospectos, respuestas frecuentes y derivación a agentes humanos.',
      },
      {
        title: 'Integración de APIs con n8n y Make',
        text: 'Conectamos tu CRM, correo, hojas de cálculo y software contable para eliminar tareas repetitivas.',
      },
    ],
    audienceTitle: 'Para quién es',
    audience: [
      'Negocios que responden todos los días las mismas consultas por WhatsApp.',
      'Empresas que pierden prospectos porque tardan en contestar.',
      'Equipos que pasan datos a mano entre el correo, las planillas y otros sistemas.',
    ],
    faqs: [
      pricingFaq,
      coverageFaq,
      {
        q: '¿El bot reemplaza a mi equipo de atención?',
        a: 'No. Se ocupa de las consultas repetitivas y deriva a una persona de tu equipo cuando la conversación lo necesita.',
      },
      {
        q: '¿WhatsApp cobra por usar un bot?',
        a: 'Puede cobrar. Meta aplica sus propias tarifas a la API oficial de WhatsApp Business según el tipo de mensaje, y ese costo es aparte del desarrollo.',
      },
      {
        q: '¿Se puede conectar con mis otros sistemas?',
        a: 'Sí. Con n8n o Make integramos el bot con tu CRM, correo, hojas de cálculo y software contable.',
      },
    ],
  },
  'software-a-medida-uruguay': {
    title: 'Software a Medida en Uruguay para Pymes | TerosTec',
    description:
      'Desarrollo de software a medida en Uruguay: dashboards, control de stock, apps PWA y MVPs creados para la lógica de tu negocio. Hablemos de tu proyecto.',
    h1: 'Desarrollo de software a medida en Uruguay',
    intro:
      'En TerosTec desarrollamos software a medida para pymes y emprendimientos de Uruguay: sistemas internos, dashboards, control de stock, apps PWA y MVPs, creados para la lógica particular de tu negocio.',
    serviceType: 'Desarrollo de software a medida',
    offeringsTitle: 'Qué podemos hacer por tu negocio',
    offerings: [
      {
        title: 'Dashboards BI y métricas',
        text: 'Indicadores en tiempo real para tomar decisiones informadas.',
      },
      {
        title: 'Control de stock e inventario',
        text: 'Monitoreo de existencias, alertas de reposición y trazabilidad.',
      },
      {
        title: 'Apps móviles PWA',
        text: 'Aplicaciones ligeras para uso interno en tablets y celulares, sin el costo de publicar en las tiendas.',
      },
      {
        title: 'MVPs y plataformas completas',
        text: 'Productos mínimos viables y plataformas listas para crecer por etapas.',
      },
    ],
    audienceTitle: 'Para quién es',
    audience: [
      'Empresas que manejan stock, pedidos u operaciones en planillas que ya les quedaron chicas.',
      'Negocios que no encuentran un sistema estándar que se adapte a su forma de trabajar.',
      'Emprendimientos que quieren validar una idea con un MVP antes de invertir en grande.',
    ],
    faqs: [
      pricingFaq,
      coverageFaq,
      {
        q: '¿Cómo es el proceso de trabajo?',
        a: 'Tiene cuatro etapas: relevamiento y arquitectura, desarrollo, verificación y pruebas, y despliegue con soporte posterior.',
      },
      {
        q: '¿Qué es una app PWA?',
        a: 'Es una aplicación web que se instala en el celular o la tablet sin pasar por las tiendas de aplicaciones. Es una opción liviana para herramientas de uso interno.',
      },
    ],
  },
};
