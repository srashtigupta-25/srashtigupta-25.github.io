const header = document.getElementById("siteHeader");
const progress = document.getElementById("pageProgress");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const sections = [...document.querySelectorAll("main section[id]")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function updatePageState() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  header.classList.toggle("scrolled", window.scrollY > 24);

  const marker = window.scrollY + window.innerHeight * 0.35;
  let current = "";
  sections.forEach((section) => {
    if (marker >= section.offsetTop && marker < section.offsetTop + section.offsetHeight) {
      current = section.id;
    }
  });
  navAnchors.forEach((link) => link.classList.toggle("active", link.hash === `#${current}`));
}

function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

menuButton.addEventListener("click", () => {
  const open = !navLinks.classList.contains("open");
  navLinks.classList.toggle("open", open);
  menuButton.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("menu-open", open);
});

navAnchors.forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updatePageState, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMenu();
  updatePageState();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: "0px 0px -35px" });

document.querySelectorAll(".reveal").forEach((element) => {
  if (reducedMotion) element.classList.add("visible");
  else revealObserver.observe(element);
});

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const element = entry.target;
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || "";
    const start = performance.now();
    const duration = 950;
    function tick(now) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;
      if (elapsed < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(element);
  });
}, { threshold: 0.5 });

if (!reducedMotion) counters.forEach((counter) => counterObserver.observe(counter));

const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches && !reducedMotion) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  }, { passive: true });
}

document.getElementById("year").textContent = new Date().getFullYear();
updatePageState();
