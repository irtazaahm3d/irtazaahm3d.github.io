/* Portfolio navigation and project slider */
const year = document.querySelector("#currentYear");
if (year) year.textContent = String(new Date().getFullYear());

const navToggle = document.querySelector("#menuToggle");
const mobileNav = document.querySelector("#mobileNav");
if (navToggle && mobileNav) {
  navToggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      mobileNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const slides = Array.from(document.querySelectorAll(".project-slide"));
const previousButton = document.querySelector("#projectPrev");
const nextButton = document.querySelector("#projectNext");
const progress = document.querySelector("#sliderProgress");
const progressTrack = document.querySelector(".slider-track");
const currentCount = document.querySelector("#slideCurrent");
let activeSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    const active = slideIndex === activeSlide;
    slide.hidden = !active;
    slide.classList.toggle("is-visible", active);
    slide.setAttribute("aria-hidden", String(!active));
    slide.setAttribute("aria-label", "Project " + (slideIndex + 1) + " of " + slides.length);
  });
  const percentage = ((activeSlide + 1) / slides.length) * 100;
  if (progress) progress.style.width = percentage + "%";
  if (progressTrack) progressTrack.setAttribute("aria-valuenow", String(activeSlide + 1));
  if (currentCount) currentCount.textContent = String(activeSlide + 1).padStart(2, "0");
}
previousButton?.addEventListener("click", () => showSlide(activeSlide - 1));
nextButton?.addEventListener("click", () => showSlide(activeSlide + 1));
showSlide(0);

const pageSections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link[href^='#']");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === "#" + entry.target.id;
        link.classList.toggle("is-active", active);
      });
    });
  }, { rootMargin: "-32% 0px -58% 0px" });
  pageSections.forEach((section) => sectionObserver.observe(section));
}
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
});