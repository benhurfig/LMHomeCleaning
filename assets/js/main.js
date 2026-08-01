


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
/* ==========================================================
HERO SLIDER
========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const heroSlider = document.querySelector(".hero-slider");

    if (!heroSlider) {
        console.warn("Hero slider não encontrado.");
        return;
    }

    const heroSlides =
        heroSlider.querySelectorAll(".hero-slide");

    const heroDots =
        heroSlider.querySelectorAll(".hero-slider-dot");

    const heroPrev =
        heroSlider.querySelector(".hero-slider-prev");

    const heroNext =
        heroSlider.querySelector(".hero-slider-next");

    if (heroSlides.length === 0) {
        console.warn("Nenhum slide encontrado.");
        return;
    }

    let currentSlide = 0;
    let autoplayInterval = null;

    const slideTime = 4000;

    function showSlide(index) {

        if (index >= heroSlides.length) {
            index = 0;
        }

        if (index < 0) {
            index = heroSlides.length - 1;
        }

        heroSlides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        heroDots.forEach(function (dot) {
            dot.classList.remove("active");
            dot.removeAttribute("aria-current");
        });

        heroSlides[index].classList.add("active");

        if (heroDots[index]) {
            heroDots[index].classList.add("active");
            heroDots[index].setAttribute("aria-current", "true");
        }

        currentSlide = index;

        console.log("Slide atual:", currentSlide + 1);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    function stopAutoplay() {

        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }

    }

    function startAutoplay() {

        stopAutoplay();

        autoplayInterval = setInterval(function () {
            nextSlide();
        }, slideTime);

    }

    heroNext?.addEventListener("click", function () {

        nextSlide();
        startAutoplay();

    });

    heroPrev?.addEventListener("click", function () {

        previousSlide();
        startAutoplay();

    });

    heroDots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);
            startAutoplay();

        });

    });

    heroSlider.addEventListener("mouseenter", stopAutoplay);

    heroSlider.addEventListener("mouseleave", startAutoplay);

    showSlide(0);

    startAutoplay();

    console.log(
        "✅ Hero slider carregado:",
        heroSlides.length,
        "imagens"
    );

});
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
