

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================================
    // MOBILE MENU
    // ==========================================================

    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileNav = document.querySelector(".mobile-nav");

    if (mobileMenuButton && mobileNav) {

        mobileMenuButton.addEventListener("click", () => {

            mobileNav.classList.toggle("active");

        });

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
