/* ============================================================
   SRASHTI GUPTA PORTFOLIO - SCRIPT
   ============================================================ */

// Scroll Progress Bar
function updateScrollProgress() {
  const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  const bar = document.getElementById('scrollProgress');
  if (bar) bar.style.width = pct + '%';
}

// Navbar scroll state
function updateNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  const scrollY = window.scrollY + window.innerHeight / 3;
  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

if (menuToggle && navLinksContainer) {
  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('mobile-active');
    menuToggle.classList.toggle('active');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('mobile-active');
      menuToggle.classList.remove('active');
    });
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// Reveal on Scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement
        ? [...entry.target.parentElement.querySelectorAll('.reveal')]
        : [];
      const idx = Math.max(0, siblings.indexOf(entry.target));
      setTimeout(() => entry.target.classList.add('visible'), idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = contactForm.querySelector('input[type="text"]').value.trim();
    const email   = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent('Portfolio message from ' + name);
    const body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    window.location.href = 'mailto:sg.srashtigupta@gmail.com?subject=' + subject + '&body=' + body;
    contactForm.reset();
  });
}

// Scroll listeners
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateNav();
  setActiveNav();
}, { passive: true });

window.addEventListener('load', () => {
  updateScrollProgress();
  updateNav();
  setActiveNav();
});
