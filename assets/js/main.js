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

    const isOpen = mobileMenu?.classList.toggle("open");

    logoMenuToggle.classList.toggle("menu-open", isOpen);

    logoMenuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    headerChoice?.classList.remove("active");

    headerChoiceToggle?.setAttribute(
        "aria-expanded",
        "false"
    );

});

/* Botão Get Started */

headerChoiceToggle?.addEventListener("click", function(event) {

    event.stopPropagation();

    const isOpen = headerChoice?.classList.toggle("active");

    headerChoiceToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    mobileMenu?.classList.remove("open");
    logoMenuToggle?.classList.remove("menu-open");

    logoMenuToggle?.setAttribute(
        "aria-expanded",
        "false"
    );

});

/* Fecha o seletor ao clicar fora */

document.addEventListener("click", function(event) {

    if (
        headerChoice &&
        !headerChoice.contains(event.target)
    ) {

        headerChoice.classList.remove("active");

        headerChoiceToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

/* Fecha o menu depois de escolher uma opção */

mobileMenu?.querySelectorAll("a").forEach(function(link) {

    link.addEventListener("click", function() {

        mobileMenu.classList.remove("open");
        logoMenuToggle?.classList.remove("menu-open");

        logoMenuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

/* Corrige o menu ao redimensionar */

window.addEventListener("resize", function() {

    if (!isMobileHeader()) {

        mobileMenu?.classList.remove("open");
        logoMenuToggle?.classList.remove("menu-open");

        logoMenuToggle?.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


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

    let currentSlide = 0;
    let autoplayInterval = null;

    let touchStartX = 0;
    let touchEndX = 0;

    const slideTime = 4000;

    function showSlide(index) {

        if (index >= heroSlides.length) {
            index = 0;
        }

        if (index < 0) {
            index = heroSlides.length - 1;
        }

        heroSlides.forEach(function(slide) {
            slide.classList.remove("active");
        });

        heroDots.forEach(function(dot) {

            dot.classList.remove("active");
            dot.removeAttribute("aria-current");

        });

        heroSlides[index]?.classList.add("active");

        heroDots[index]?.classList.add("active");

        heroDots[index]?.setAttribute(
            "aria-current",
            "true"
        );

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

        if (autoplayInterval !== null) {

            clearInterval(autoplayInterval);
            autoplayInterval = null;

        }

    }

    function startAutoplay() {

        stopAutoplay();

        autoplayInterval = setInterval(
            nextSlide,
            slideTime
        );

    }

    heroNext?.addEventListener("click", function() {

        nextSlide();
        startAutoplay();

    });

    heroPrev?.addEventListener("click", function() {

        previousSlide();
        startAutoplay();

    });

    heroDots.forEach(function(dot, index) {

        dot.addEventListener("click", function() {

            showSlide(index);
            startAutoplay();

        });

    });

    /* Pausa no desktop */

    heroSlider.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    heroSlider.addEventListener(
        "mouseleave",
        startAutoplay
    );

    /* Swipe no celular */

    heroSlider.addEventListener(
        "touchstart",
        function(event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive:true
        }
    );

    heroSlider.addEventListener(
        "touchend",
        function(event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;

            if (Math.abs(difference) < 50) {
                return;
            }

            if (difference > 0) {
                nextSlide();
            } else {
                previousSlide();
            }

            startAutoplay();

        },
        {
            passive:true
        }
    );

    showSlide(0);
    startAutoplay();

    console.log(
        "✅ Hero slider carregado:",
        heroSlides.length,
        "imagens"
    );

}
/* ==========================================================
BOOKING AVAILABILITY DATE
========================================================== */

const bookingMonthYear =
    document.getElementById("bookingMonthYear");

const bookingCalendarMonth =
    document.getElementById("bookingCalendarMonth");

const bookingDateList =
    document.getElementById("bookingDateList");

if (
    bookingMonthYear &&
    bookingCalendarMonth &&
    bookingDateList
) {

    const today = new Date();

    const monthYearText =
        new Intl.DateTimeFormat(
            "en-US",
            {
                month:"long",
                year:"numeric"
            }
        ).format(today);

    bookingMonthYear.textContent = monthYearText;
    bookingCalendarMonth.textContent = monthYearText;

    const weekdayFormatter =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday:"short"
            }
        );

    const availableDates = [];

    let daysToAdd = 1;

    /*
    Cria três datas próximas.
    Domingo é ignorado.
    Os horários reais continuam sendo verificados
    dentro do Smart Booking.
    */

    while (availableDates.length < 3) {

        const date = new Date(today);

        date.setDate(
            today.getDate() + daysToAdd
        );

        if (date.getDay() !== 0) {

            availableDates.push(date);

        }

        daysToAdd++;

    }

    bookingDateList.innerHTML = "";

    availableDates.forEach(function(date, index) {

        const dateCard =
            document.createElement("div");

        dateCard.className =
            index === 1
                ? "booking-date-card featured"
                : "booking-date-card";

        const dayName =
            weekdayFormatter.format(date);

        const dayNumber =
            date.getDate();

        dateCard.innerHTML = `
            <span class="booking-date-day">
                ${dayName}
            </span>

            <strong class="booking-date-number">
                ${dayNumber}
            </strong>

            <span class="booking-date-status">
                Check times
            </span>
        `;

        bookingDateList.appendChild(dateCard);

    });

}

/* ==========================================================
GA4 EVENTS
========================================================== */

document.querySelectorAll("[data-track]").forEach(function(button) {

    button.addEventListener("click", function() {

        if (typeof trackEvent !== "function") {
            return;
        }

        trackEvent(
            button.dataset.track,
            {
                location:
                    button.dataset.location || ""
            }
        );

    });

});