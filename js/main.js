/**
 * Casa Nostra Pizza Express — main.js
 * Behaviors: nav sticky, mobile menu, smooth scroll, WhatsApp float visibility
 */

(function () {
  'use strict';

  /* ---- Elements ---- */
  const nav        = document.getElementById('nav');
  const hamburger  = document.getElementById('hamburger');
  const navLinks   = document.getElementById('navLinks');
  const waFloat    = document.getElementById('waFloat');
  const hero       = document.querySelector('.hero');

  /* ---- 1. Nav sticky background on scroll ---- */
  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  /* ---- 2. Show floating WhatsApp button after hero ---- */
  function updateWaFloat() {
    if (!hero || !waFloat) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      waFloat.classList.add('is-visible');
    } else {
      waFloat.classList.remove('is-visible');
    }
  }

  /* ---- Combined scroll handler ---- */
  function onScroll() {
    updateNav();
    updateWaFloat();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- 3. Mobile nav toggle ---- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    /* Close nav when a link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    /* Close nav when clicking outside */
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- 4. Smooth scroll for anchor links (fallback for older browsers) ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* ---- 5. (Optional) Show "Aberto agora" status based on local time ---- */
  function checkOpenStatus() {
    const now   = new Date();
    const hours = now.getHours();
    const day   = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat

    // Open every day 18:00–23:00
    const isOpen = hours >= 18 && hours < 23;

    const hoursEl = document.querySelector('.final-cta__hours');
    if (!hoursEl) return;

    if (isOpen) {
      hoursEl.innerHTML = '<span style="color:#25D366;font-weight:600;">● Aberto agora</span> · WhatsApp · Seg–Dom · 18h às 23h';
    }
  }

  checkOpenStatus();

})();
