import { siteConfig } from '../config/site';

const SITE = siteConfig.url;

const alternates = ['es', 'x-default']
  .map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${SITE}/" />`)
  .concat(`<xhtml:link rel="alternate" hreflang="en" href="${SITE}/en/" />`)
  .join('');

// Se genera en cada build: las páginas de servicio nuevas entran solas.
export function GET() {
  const home = [`${SITE}/`, `${SITE}/en/`].map((loc) => `<url><loc>${loc}</loc>${alternates}</url>`);
  const services = siteConfig.services.map(({ slug }) => `<url><loc>${SITE}/servicios/${slug}/</loc></url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...home, ...services].join('\n')}
</urlset>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
