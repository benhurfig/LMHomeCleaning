/* ==========================================================
   GOOGLE ANALYTICS 4
========================================================== */

// Carrega o gtag.js

const gtagScript = document.createElement('script');

gtagScript.async = true;

gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-BWKEDJBR5Q';

document.head.appendChild(gtagScript);

// DataLayer

window.dataLayer = window.dataLayer || [];

function gtag() {

    dataLayer.push(arguments);

}

// Inicialização

gtag('js', new Date());

// GA4

gtag('config', 'G-BWKEDJBR5Q');

// Função global para eventos

window.trackEvent = function(eventName, params = {}) {

    gtag('event', eventName, params);

};

console.log('✅ LM Home Cleaning GA4 carregado');