
/* =========================================
   GLOBAL PAGE ANIMATIONS
   ========================================= */

// Add animation CSS automatically
const animationStyle = document.createElement("style");

animationStyle.textContent = `
    /* Page fade in */
    body {
        opacity: 0;
        animation: pageFadeIn 1s ease forwards;
    }

    @keyframes pageFadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    /* Scroll reveal */
    .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .reveal.show {
        opacity: 1;
        transform: translateY(0);
    }

    /* Fade from left */
    .fade-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-left.show {
        opacity: 1;
        transform: translateX(0);
    }

    /* Fade from right */
    .fade-right {
        opacity: 0;
        transform: translateX(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .fade-right.show {
        opacity: 1;
        transform: translateX(0);
    }

    /* Zoom animation */
    .zoom-reveal {
        opacity: 0;
        transform: scale(0.85);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    .zoom-reveal.show {
        opacity: 1;
        transform: scale(1);
    }

    /* Hover animation */
    .hover-lift {
        transition: transform 0.4s ease, box-shadow 0.4s ease;
    }

    .hover-lift:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }

    /* Image hover zoom */
    .image-zoom {
        overflow: hidden;
    }

    .image-zoom img {
        transition: transform 0.6s ease;
    }

    .image-zoom:hover img {
        transform: scale(1.08);
    }

    /* Button animation */
    .animated-btn {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .animated-btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    /* Stagger animation */
    .stagger-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .stagger-item.show {
        opacity: 1;
        transform: translateY(0);
    }

    /* Accessibility */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation: none !important;
            transition: none !important;
            transform: none !important;
        }

        body {
            opacity: 1;
        }

        .reveal,
        .fade-left,
        .fade-right,
        .zoom-reveal,
        .stagger-item {
            opacity: 1;
        }
    }
`;

document.head.appendChild(animationStyle);


/* =========================================
   AUTOMATIC SCROLL ANIMATIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // Automatically animate common website elements
    const elements = document.querySelectorAll(`
        section,
        .card,
        .blog-post,
        .hero-content,
        .about-content,
        .gallery-item,
        .feature-box,
        .container > h1,
        .container > h2
    `);

    elements.forEach(element => {
        element.classList.add("reveal");
    });

    // Scroll observer
    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                // Animate only once
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(`
        .reveal,
        .fade-left,
        .fade-right,
        .zoom-reveal
    `).forEach(element => {
        observer.observe(element);
    });


    /* =========================================
       STAGGER ANIMATION
       ========================================= */

    document.querySelectorAll(".stagger-container").forEach(container => {

        const items = container.querySelectorAll(".stagger-item");

        items.forEach((item, index) => {

            item.style.transitionDelay = `${index * 150}ms`;

            observer.observe(item);

        });

    });


    /* =========================================
       BUTTON ANIMATION
       ========================================= */

    document.querySelectorAll("button, .btn").forEach(button => {
        button.classList.add("animated-btn");
    });


    /* =========================================
       CARD HOVER ANIMATION
       ========================================= */

    document.querySelectorAll(".card").forEach(card => {
        card.classList.add("hover-lift");
    });


    /* =========================================
       IMAGE ZOOM
       ========================================= */

    document.querySelectorAll(".gallery-item, .image-zoom").forEach(item => {
        item.classList.add("image-zoom");
    });

});
