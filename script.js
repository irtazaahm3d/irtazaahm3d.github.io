
/* ==========================================
   IRTAZA AHMED - PERSONAL PORTFOLIO
   Main JavaScript
   ========================================== */

/* ------------------------------------------
   1. PERSONAL CONFIGURATION
   Edit these details with your real links.
   ------------------------------------------ */

const portfolioConfig = {
    name: "Irtaza Ahmed",
    email: "",
    github: "",
    linkedin: "",
    location: "Rawalpindi, Pakistan",
    degree: "BE Information Security",
    university: "National University of Sciences and Technology (NUST)",
    institution: "Military College of Signals (MCS)"
};


/* ------------------------------------------
   2. DOM ELEMENTS
   ------------------------------------------ */

const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#navMenu");
const backToTop = document.querySelector("#backToTop");
const yearElement = document.querySelector("#currentYear");


/* ------------------------------------------
   3. DYNAMIC FOOTER YEAR
   ------------------------------------------ */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* ------------------------------------------
   4. THEME MANAGEMENT
   Dark / Light mode with saved preference
   ------------------------------------------ */

function setTheme(theme) {
    root.setAttribute("data-theme", theme);

    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
        );

        themeToggle.innerHTML =
            theme === "dark"
                ? '<i class="fa-regular fa-sun"></i>'
                : '<i class="fa-regular fa-moon"></i>';
    }
}

const savedTheme = localStorage.getItem("portfolio-theme");

const preferredTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

setTheme(savedTheme || preferredTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");

        setTheme(currentTheme === "dark" ? "light" : "dark");
    });
}


/* ------------------------------------------
   5. MOBILE NAVIGATION
   ------------------------------------------ */

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Close navigation after selecting a link
    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        });
    });

    // Close menu with Escape
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }
    });
}


/* ------------------------------------------
   6. SMOOTH SCROLLING
   ------------------------------------------ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", event => {
        const targetId = anchor.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* ------------------------------------------
   7. ACTIVE NAVIGATION
   Highlight current section
   ------------------------------------------ */

const sections = document.querySelectorAll("section[id]");

const navigationLinks = document.querySelectorAll(
    '.nav-link[href^="#"]'
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navigationLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


/* ------------------------------------------
   8. PROJECT FILTERING
   Filter projects by category
   ------------------------------------------ */

const filterButtons = document.querySelectorAll(
    ".filter-btn"
);

const projectCards = document.querySelectorAll(
    ".project-card"
);

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.filter;

        // Update active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
            btn.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        // Filter project cards
        projectCards.forEach(card => {
            const cardCategory = card.dataset.category;

            const shouldShow =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;

            card.hidden = !shouldShow;
        });
    });
});


/* ------------------------------------------
   9. SCROLL REVEAL ANIMATIONS
   Reveal content when it enters viewport
   ------------------------------------------ */

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-up, .reveal-left, .reveal-right"
);

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


/* ------------------------------------------
   10. BACK TO TOP BUTTON
   ------------------------------------------ */

function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
        "show",
        window.scrollY > 400
    );
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

updateBackToTop();

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "instant" : "smooth"
        });
    });
}


/* ------------------------------------------
   11. TYPING ANIMATION
   Hero section text animation
   ------------------------------------------ */

const typingElement = document.querySelector("#typingText");

const typingWords = [
    "Information Security Student",
    "Aspiring SOC Analyst",
    "Cybersecurity Enthusiast",
    "Digital Forensics Learner",
    "Web Security Researcher"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingElement || reduceMotion) return;

    const currentWord = typingWords[wordIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent = currentWord.substring(
        0,
        characterIndex
    );

    let delay = deleting ? 45 : 90;

    if (!deleting && characterIndex === currentWord.length) {
        deleting = true;
        delay = 1600;
    } else if (deleting && characterIndex === 0) {
        deleting = false;

        wordIndex = (wordIndex + 1) % typingWords.length;

        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

if (typingElement && !reduceMotion) {
    typeEffect();
}


/* ------------------------------------------
   12. SKILL BAR ANIMATION
   ------------------------------------------ */

const skillBars = document.querySelectorAll(
    ".skill-progress"
);

if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;

                    const percentage = bar.dataset.progress;

                    if (
                        percentage &&
                        Number(percentage) >= 0 &&
                        Number(percentage) <= 100
                    ) {
                        bar.style.width = `${percentage}%`;
                    }

                    observer.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.4
        }
    );

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}


/* ------------------------------------------
   13. CONTACT FORM VALIDATION
   Frontend validation only.
   A backend or form service is needed
   to actually send messages.
   ------------------------------------------ */

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const nameInput = contactForm.querySelector(
            '[name="name"]'
        );

        const emailInput = contactForm.querySelector(
            '[name="email"]'
        );

        const messageInput = contactForm.querySelector(
            '[name="message"]'
        );

        const name = nameInput?.value.trim();
        const email = emailInput?.value.trim();
        const message = messageInput?.value.trim();

        if (!name || !email || !message) {
            alert("Please complete all required fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }

        alert(
            "Your details are valid. Connect a form service to enable message delivery."
        );
    });
}


/* ------------------------------------------
   14. COPY EMAIL TO CLIPBOARD
   ------------------------------------------ */

const copyEmailButton = document.querySelector(
    "#copyEmail"
);

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        const email = portfolioConfig.email;

        if (!email) {
            alert("Please add your email in portfolioConfig.");
            return;
        }

        try {
            await navigator.clipboard.writeText(email);

            const originalText = copyEmailButton.innerHTML;

            copyEmailButton.innerHTML =
                '<i class="fa-solid fa-check"></i> Copied!';

            setTimeout(() => {
                copyEmailButton.innerHTML = originalText;
            }, 2000);

        } catch (error) {
            alert("Unable to copy email. Please copy it manually.");
        }
    });
}


/* ------------------------------------------
   15. PRINT / DOWNLOAD CV
   Opens browser print dialog.
   Select Save as PDF.
   ------------------------------------------ */

const printCVButton = document.querySelector("#printCV");

if (printCVButton) {
    printCVButton.addEventListener("click", () => {
        window.print();
    });
}


/* ------------------------------------------
   16. EXTERNAL LINKS SECURITY
   Add safe attributes to external links.
   ------------------------------------------ */

document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute("rel", "noopener noreferrer");
});


/* ------------------------------------------
   17. ACCESSIBILITY
   Keyboard and focus improvements
   ------------------------------------------ */

document.addEventListener("keydown", event => {
    if (
        event.key === "Tab" &&
        document.activeElement
    ) {
        document.body.classList.add("keyboard-navigation");
    }
});

document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
});


/* ------------------------------------------
   18. INITIALIZATION
   ------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
    console.log(
        "%cWelcome to Irtaza Ahmed's Portfolio!",
        "color: #38bdf8; font-size: 16px; font-weight: bold;"
    );

    console.log(
        "Information Security | Cybersecurity | Digital Forensics"
    );
});
