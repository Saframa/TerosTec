import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from '../App';

// El HTML de #root ya viene prerenderizado por Astro (ver src/layouts/Base.astro).
// Aquí React lo hidrata para activar animaciones, widgets y formulario.
const rootElement = document.getElementById('root');
const language = document.documentElement.lang === 'en' ? 'en' : 'es';

if (rootElement) {
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App initialLanguage={language} />
    </React.StrictMode>
  );
}
