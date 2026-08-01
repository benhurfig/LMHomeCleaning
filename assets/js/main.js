


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

const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {

    const heroSlides =
        heroSlider.querySelectorAll(".hero-slide");

    const heroDots =
        heroSlider.querySelectorAll(".hero-slider-dot");

    const heroPrev =
        heroSlider.querySelector(".hero-slider-prev");

    const heroNext =
        heroSlider.querySelector(".hero-slider-next");

    let heroCurrentSlide = 0;

    let heroAutoPlay;

    let heroTouchStartX = 0;

    let heroTouchEndX = 0;

    const HERO_SLIDE_TIME = 5000;

    function showHeroSlide(index) {

        if (index < 0) {
            index = heroSlides.length - 1;
        }

        if (index >= heroSlides.length) {
            index = 0;
        }

        heroSlides.forEach(function(slide) {

            slide.classList.remove("active");

        });

        heroDots.forEach(function(dot) {

            dot.classList.remove("active");

            dot.removeAttribute("aria-current");

        });

        heroSlides[index].classList.add("active");

        heroDots[index].classList.add("active");

        heroDots[index].setAttribute(
            "aria-current",
            "true"
        );

        heroCurrentSlide = index;

    }

    function nextHeroSlide() {

        showHeroSlide(heroCurrentSlide + 1);

    }

    function previousHeroSlide() {

        showHeroSlide(heroCurrentSlide - 1);

    }

    function startHeroAutoPlay() {

        stopHeroAutoPlay();

        heroAutoPlay = setInterval(
            nextHeroSlide,
            HERO_SLIDE_TIME
        );

    }

    function stopHeroAutoPlay() {

        if (heroAutoPlay) {

            clearInterval(heroAutoPlay);

        }

    }

    heroNext?.addEventListener("click", function() {

        nextHeroSlide();

        startHeroAutoPlay();

    });

    heroPrev?.addEventListener("click", function() {

        previousHeroSlide();

        startHeroAutoPlay();

    });

    heroDots.forEach(function(dot, index) {

        dot.addEventListener("click", function() {

            showHeroSlide(index);

            startHeroAutoPlay();

        });

    });

    /* Pausa ao colocar o mouse */

    heroSlider.addEventListener("mouseenter", function() {

        stopHeroAutoPlay();

    });

    heroSlider.addEventListener("mouseleave", function() {

        startHeroAutoPlay();

    });

    /* Swipe no celular */

    heroSlider.addEventListener(
        "touchstart",
        function(event) {

            heroTouchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive:true
        }
    );

    heroSlider.addEventListener(
        "touchend",
        function(event) {

            heroTouchEndX =
                event.changedTouches[0].screenX;

            const difference =
                heroTouchStartX - heroTouchEndX;

            if (Math.abs(difference) < 50) {
                return;
            }

            if (difference > 0) {

                nextHeroSlide();

            } else {

                previousHeroSlide();

            }

            startHeroAutoPlay();

        },
        {
            passive:true
        }
    );

    /* Teclado */

    heroSlider.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "ArrowRight") {

                nextHeroSlide();

                startHeroAutoPlay();

            }

            if (event.key === "ArrowLeft") {

                previousHeroSlide();

                startHeroAutoPlay();

            }

        }
    );

    startHeroAutoPlay();

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
