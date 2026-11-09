/* Irtaza Ahmed — portfolio interactions and profile links */
const portfolioConfig = {
  name: "Irtaza Ahmed",
  email: "irtaza.ahm3d@gmail.com",
  githubUrl: "https://github.com/irtazaahm3d",
  linkedinUrl: "https://www.linkedin.com/in/irtazaahm3d/",
  location: "Rawalpindi, Pakistan",
  degree: "BE Information Security",
  university: "National University of Sciences and Technology (NUST)",
  institution: "Military College of Signals (MCS)"
};

const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navMenu = document.querySelector("#primaryNav");
const backToTop = document.querySelector("#backToTop");
const yearElement = document.querySelector("#currentYear");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Keep the contact area driven by one configuration object. */
function configureContactLinks() {
  const emailLink = document.querySelector("#emailLink");
  const emailText = document.querySelector("#emailText");
  const githubLink = document.querySelector("#githubLink");
  const linkedinLink = document.querySelector("#linkedinLink");

  if (emailLink && portfolioConfig.email) {
    emailLink.href = `mailto:${portfolioConfig.email}`;
    if (emailText) emailText.textContent = portfolioConfig.email;
  }
  if (githubLink && portfolioConfig.githubUrl) githubLink.href = portfolioConfig.githubUrl;
  if (linkedinLink && portfolioConfig.linkedinUrl) linkedinLink.href = portfolioConfig.linkedinUrl;

  const note = document.querySelector("#contactConfigNote");
  if (note) note.hidden = true;
}

configureContactLinks();

if (yearElement) yearElement.textContent = new Date().getFullYear();

/* Theme toggle: preserve the inline SVG icons already in the HTML. */
function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  try { localStorage.setItem("portfolio-theme", theme); } catch (_) {}
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem("portfolio-theme"); } catch (_) {}
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
setTheme(savedTheme || preferredTheme);

themeToggle?.addEventListener("click", () => {
  setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
});

/* Mobile navigation uses the actual #primaryNav element in index.html. */
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

/* Smooth in-page navigation. */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", event => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (history.replaceState) history.replaceState(null, "", targetId);
  });
});

/* Highlight the current section in the desktop navigation. */
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".primary-nav a[href^='#']");
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach(link => {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-current", current);
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => navObserver.observe(section));
}

/* Project filtering and a live result count. */
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = [...document.querySelectorAll(".project-card")];
const filterStatus = document.querySelector("#filterStatus");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter || "all";
    let visibleCount = 0;

    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    projectCards.forEach(card => {
      const show = category === "all" || card.dataset.category === category;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (filterStatus) {
      filterStatus.textContent = category === "all"
        ? `Showing all ${visibleCount} items`
        : `Showing ${visibleCount} ${category} item${visibleCount === 1 ? "" : "s"}`;
    }
  });
});

/* Respect reduced-motion preferences for reveal animations. */
const revealElements = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right");
if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(element => revealObserver.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

/* Back-to-top control. */
function updateBackToTop() {
  backToTop?.classList.toggle("show", window.scrollY > 400);
}
window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
});

/* The HTML uses data-print-cv; support the existing print-CV button. */
document.querySelectorAll("[data-print-cv], #printCV").forEach(button => {
  button.addEventListener("click", () => window.print());
});

/* Add safe rel attributes to all external links. */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.setAttribute("rel", "noopener noreferrer");
});

/* Keyboard focus visibility helper. */
document.addEventListener("keydown", event => {
  if (event.key === "Tab") document.body.classList.add("keyboard-navigation");
});
document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-navigation");
});
