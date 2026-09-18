/* =========================================================
   Etcetera BioProcess Services
   Shared JavaScript
   ========================================================= */

(function() {
  'use strict';

  // Nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Form submission stub (replace with real handler)
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent('Website inquiry from ' + (data.get('name') || 'website visitor'));
      const lines = [];
      data.forEach((value, key) => { if (value) lines.push(key + ': ' + value); });
      const body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:info@etcbioprocessservices.com?subject=' + subject + '&body=' + body;
      let note = form.querySelector('.form-confirm');
      if (!note) {
        note = document.createElement('p');
        note.className = 'form-confirm';
        note.setAttribute('role', 'status');
        note.style.cssText = 'margin-top:16px;color:#0F9D8F;font-weight:600;';
        form.appendChild(note);
      }
      note.textContent = 'Your email app should now open with your message addressed to info@etcbioprocessservices.com. If it does not, please email us directly at that address.';
    });
  });
})();
