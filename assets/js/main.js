document.addEventListener("DOMContentLoaded", () => {

    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    console.log("Botão:", mobileMenuButton);
    console.log("Menu:", mobileNav);

    if (!mobileMenuButton || !mobileNav) return;

    mobileMenuButton.addEventListener("click", () => {

        console.log("Clique!");

        mobileNav.classList.toggle("active");

    });

});


// HEADER CTA
/* ==========================================================
GA4 EVENTS
========================================================== */

document.querySelectorAll('[data-track]').forEach(button => {

    button.addEventListener('click', function () {

        trackEvent(button.dataset.location);

    });

});