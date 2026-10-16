/*
 * Script de arranque de TerosTec (clásico, se ejecuta antes que React).
 * Externo a index.html para permitir una CSP estricta con script-src 'self'
 * (sin 'unsafe-inline'). Si editás esto, no hace falta recalcular ningún hash.
 *
 * 1) Purga insignias/widgets que Netlify pueda inyectar en el DOM.
 * 2) Controla el ciclo de vida del preloader (#app-preloader).
 */
(function () {
  // 1. Supresión activa de insignias y widgets inyectados por Netlify.
  var purge = function () {
    var frames = document.querySelectorAll(
      '#nl-badge-frame, #nl-hud-frame, iframe[title*="Netlify"], iframe[id^="nl-"], netlify-drawer, [data-netlify-drawer]'
    );
    frames.forEach(function (f) {
      if (f && f.parentNode) {
        f.parentNode.removeChild(f);
      }
    });
  };
  if (typeof MutationObserver !== 'undefined') {
    var obs = new MutationObserver(purge);
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }
  document.addEventListener('DOMContentLoaded', purge);
  window.addEventListener('load', purge);
})();

(function () {
  // 2. Ciclo de vida del preloader.
  var isHash = window.location.hash && window.location.hash.length > 1;
  var p = document.getElementById('app-preloader');
  if (isHash && p) {
    p.style.display = 'none';
    document.body.classList.remove('preloading');
    return;
  }

  var finish = function () {
    if (!p || p.classList.contains('loaded')) return;
    p.classList.add('loaded');
    p.style.opacity = '0';
    setTimeout(function () {
      p.style.visibility = 'hidden';
      p.style.display = 'none';
      document.body.classList.remove('preloading');
    }, 350);
  };

  // Completar tras la animación de llenado (1.3s).
  setTimeout(finish, 1300);
})();
