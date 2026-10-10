// Scroll reveal animation
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Nav border highlight on scroll
const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 50 ? 'var(--border)' : 'transparent';
  });
}

// ── Global Language Switcher (EN <-> DE) ──
function setGlobalLanguage(lang) {
  // Toggle all translatable data attributes across the site
  const translatables = document.querySelectorAll('[data-en][data-de]');
  translatables.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (text.includes('<') || text.includes('&quot;')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update all language toggle buttons active state
  document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Save preference
  try {
    localStorage.setItem('site_language_pref', lang);
  } catch (err) {
    // ignore in case of private mode restriction
  }
}

// Global click delegation for language switcher buttons
document.addEventListener('click', (e) => {
  const switchBtn = e.target.closest('.lang-switch-btn');
  if (switchBtn) {
    setGlobalLanguage(switchBtn.dataset.lang);
  }
});

// Restore saved language preference on load
try {
  const savedLang = localStorage.getItem('site_language_pref');
  if (savedLang && savedLang === 'de') {
    setGlobalLanguage('de');
  }
} catch (err) {
  // ignore
}
