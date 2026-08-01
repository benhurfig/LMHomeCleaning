


  /* ==========================================================
HEADER MENU
========================================================== */

const logoMenuToggle = document.getElementById("logoMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

const headerChoice = document.querySelector(".header-choice");
const headerChoiceToggle = document.getElementById("headerChoiceToggle");

function isMobileHeader() {
    return window.innerWidth <= 900;
}

/* Logo abre o menu somente no tablet/mobile */

logoMenuToggle?.addEventListener("click", function(event) {

    if (!isMobileHeader()) {
        return;
    }

    event.preventDefault();

    const isOpen = mobileMenu.classList.toggle("open");

    logoMenuToggle.classList.toggle("menu-open", isOpen);

    logoMenuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    /* Fecha o seletor de Estimate/Booking */

    headerChoice.classList.remove("active");

    headerChoiceToggle.setAttribute(
        "aria-expanded",
        "false"
    );

});

/* Botão Get Started */

headerChoiceToggle?.addEventListener("click", function(event) {

    event.stopPropagation();

    const isOpen = headerChoice.classList.toggle("active");

    headerChoiceToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    /* Fecha o menu mobile */

    mobileMenu.classList.remove("open");
    logoMenuToggle.classList.remove("menu-open");

    logoMenuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

});

/* Fecha ao clicar fora */

document.addEventListener("click", function(event) {

    if (
        headerChoice &&
        !headerChoice.contains(event.target)
    ) {
        headerChoice.classList.remove("active");

        headerChoiceToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }

});

/* Fecha o menu depois de escolher uma opção */

mobileMenu?.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        mobileMenu.classList.remove("open");
        logoMenuToggle.classList.remove("menu-open");

        logoMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

/* Corrige o menu se redimensionar a tela */

window.addEventListener("resize", function() {

    if (!isMobileHeader()) {

        mobileMenu.classList.remove("open");
        logoMenuToggle.classList.remove("menu-open");

        logoMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }



    // ==========================================================
    // GA4 EVENTS
    // ==========================================================

    document.querySelectorAll("[data-track]").forEach(button => {

        button.addEventListener("click", () => {

            trackEvent(

                button.dataset.track,

                {

                    location: button.dataset.location || ""

                }

            );

        });

    });

});
