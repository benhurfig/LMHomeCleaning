/* ==========================================================
   GOOGLE ANALYTICS 4 + GOOGLE ADS
========================================================== */

// Carrega o gtag.js

const gtagScript = document.createElement('script');

gtagScript.async = true;

gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-VGS11ZW6WD';

document.head.appendChild(gtagScript);

// DataLayer

window.dataLayer = window.dataLayer || [];

function gtag() {

    dataLayer.push(arguments);

}

// Inicialização

gtag('js', new Date());

// GA4

gtag('config', 'G-VGS11ZW6WD');

// Google Ads

gtag('config', 'AW-17668332875');

// Função global para eventos

window.trackEvent = function(eventName, params = {}) {

    gtag('event', eventName, params);

};

console.log('✅ GA4 carregado');