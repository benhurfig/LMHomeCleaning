/* ==========================================================
   GOOGLE ANALYTICS 4
========================================================== */

// Carrega gtag.js

const gtagScript = document.createElement("script");

gtagScript.async = true;

gtagScript.src =
`https://www.googletagmanager.com/gtag/js?id=${CONFIG.ga4}`;

document.head.appendChild(gtagScript);

// DataLayer

window.dataLayer = window.dataLayer || [];

function gtag(){

    dataLayer.push(arguments);

}

// Inicialização

gtag("js", new Date());

// Analytics

gtag("config", CONFIG.ga4);

// Google Ads (caso exista)

if(CONFIG.googleAds){

    gtag("config", CONFIG.googleAds);

}

/* ==========================================================
   IDENTIFICA A PÁGINA
========================================================== */

window.pageSource =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
        ? "home"
        : window.location.pathname.replace(/\//g, "");

/* ==========================================================
   EVENTOS
========================================================== */

window.trackEvent = function(eventName, params = {}){

    gtag("event", eventName, {
        source_page: window.pageSource,
        ...params
    });

};

/* ==========================================================
   AUTOMATIC CTA AND CONTACT EVENTS
   Links already carrying data-track are handled by main.js.
========================================================== */

document.addEventListener("click", function(event) {

    const link = event.target.closest("a");

    if (!link || link.hasAttribute("data-track")) {
        return;
    }

    const href = link.getAttribute("href") || "";
    const label = (link.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 100);

    const common = {
        link_url: link.href || href,
        link_text: label,
        location: link.closest("header")
            ? "header"
            : link.closest("footer")
                ? "footer"
                : "page"
    };

    if (href.includes("smartimateapp.com/lm-estimate")) {
        trackEvent("estimate_click", common);
        return;
    }

    if (href.includes("smartimateapp.com/smart-booking")) {
        trackEvent("booking_click", common);
        return;
    }

    if (href.startsWith("tel:")) {
        trackEvent("phone_click", common);
        return;
    }

    if (href.startsWith("mailto:")) {
        trackEvent("email_click", common);
        return;
    }

    if (href.startsWith("sms:") && !link.classList.contains("text-us-button")) {
        trackEvent("sms_click", common);
        return;
    }

    if (href.includes("instagram.com/lmhomecleaning")) {
        trackEvent("social_click", { ...common, social_network: "instagram" });
        return;
    }

    if (href.includes("facebook.com/")) {
        trackEvent("social_click", { ...common, social_network: "facebook" });
        return;
    }

    if (href.includes("share.google/")) {
        trackEvent("google_business_click", common);
        return;
    }

    if (/\/(regular-house-cleaning|deep-cleaning|move-in-move-out-cleaning|post-construction-cleaning)\.html/.test(href)) {
        trackEvent("service_page_click", common);
        return;
    }

    if (/\/house-cleaning-[a-z-]+-ma\.html/.test(href)) {
        trackEvent("local_page_click", common);
    }

});

console.log("✅ Analytics carregado");
