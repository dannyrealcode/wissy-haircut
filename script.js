const bookingForm = document.querySelector("#bookingForm");
const formMessage = document.querySelector("#formMessage");

if (bookingForm && formMessage) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const customerName = document.querySelector("#customerName").value.trim();
        const phone = document.querySelector("#phone").value.trim();
        const service = document.querySelector("#service").value;
        const date = document.querySelector("#date").value;

        const barberWhatsAppNumber = "2349015130293";

        const message =
            "Hello Wissy Haircut! I would like to book an appointment.\n\n" +
            "Name: " + customerName + "\n" +
            "Phone: " + phone + "\n" +
            "Service: " + service + "\n" +
            "Preferred date: " + date + "\n\n" +
            "Please confirm my appointment. Thank you!";

        const whatsappURL =
            "https://wa.me/" + barberWhatsAppNumber +
            "?text=" + encodeURIComponent(message);

        formMessage.textContent =
            "WhatsApp will open with your booking details. Please send the message to confirm your request.";

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

// Reveal haircut cards when they enter the screen
const galleryCards = document.querySelectorAll(".gallery-card");

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            galleryObserver.unobserve(entry.target);
        }
    });
});

galleryCards.forEach((card) => {
    galleryObserver.observe(card);
});

// =====================================
// WISSY HAIRCUT - AUTOMATIC IMAGE SLIDER
// =====================================

document.querySelectorAll("[data-slider]").forEach((slider) => {
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slider-slide");
    const prevButton = slider.querySelector(".slider-prev");
    const nextButton = slider.querySelector(".slider-next");
    const dotsContainer = slider.querySelector(".slider-dots");

    if (!track || slides.length === 0 || !prevButton || !nextButton || !dotsContainer) {
        return;
    }

    let currentIndex = 0;
    let autoSlide;
    const slideDelay = 5000;

    // Create one indicator dot for each slide
    slides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.classList.add("slider-dot");
        dot.setAttribute("aria-label", `Show slide ${index + 1}`);

        dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoSlide();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".slider-dot");

    // Display the selected slide
    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, dotIndex) => {
            dot.classList.toggle("active", dotIndex === currentIndex);
        });
    }

    // Previous button
    prevButton.addEventListener("click", () => {
        showSlide(currentIndex - 1);
        restartAutoSlide();
    });

    // Next button
    nextButton.addEventListener("click", () => {
        showSlide(currentIndex + 1);
        restartAutoSlide();
    });

    // Automatically move to the next slide
    function startAutoSlide() {
        stopAutoSlide();

        if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            autoSlide = setInterval(() => {
                showSlide(currentIndex + 1);
            }, slideDelay);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlide);
    }

    function restartAutoSlide() {
        startAutoSlide();
    }

    // Pause when the mouse is over the slider
    slider.addEventListener("mouseenter", stopAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    // Pause when the page is hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });

    // Support touch swiping on phones
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
        stopAutoSlide();
    }, { passive: true });

    slider.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > 50) {
            showSlide(swipeDistance < 0 ? currentIndex + 1 : currentIndex - 1);
        }

        startAutoSlide();
    }, { passive: true });

    // Start each slider at its first slide
    showSlide(0);
    startAutoSlide();
});

/* =========================================
   MOBILE HAMBURGER NAVIGATION
========================================= */

const menuToggle = document.querySelector("#menuToggle");
const mainNavigation = document.querySelector("#mainNavigation");

if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNavigation.classList.toggle("menu-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    mainNavigation.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mainNavigation.classList.remove("menu-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}