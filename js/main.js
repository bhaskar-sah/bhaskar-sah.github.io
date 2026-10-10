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

// ── Skills Matrix Language Switcher (EN <-> DE) ──
const skillsSection = document.getElementById('skills');

function setSkillsLanguage(lang) {
  if (!skillsSection) return;

  // Toggle all translatable data attributes
  const translatables = skillsSection.querySelectorAll('[data-en][data-de]');
  translatables.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.textContent = text;
    }
  });

  // Update header toggle buttons active state
  document.querySelectorAll('.lang-switch-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update card badge buttons to point to the alternative language
  const nextLang = lang === 'en' ? 'de' : 'en';
  const nextLabel = lang === 'en' ? '🇩🇪 DE' : '🇬🇧 EN';
  const nextTitle =
    lang === 'en'
      ? 'Click to view entire section in German'
      : 'Click to view entire section in English';

  document.querySelectorAll('.card-lang-badge').forEach((badge) => {
    badge.textContent = nextLabel;
    badge.title = nextTitle;
    badge.dataset.targetLang = nextLang;
  });

  // Save preference
  try {
    localStorage.setItem('skills_language_pref', lang);
  } catch (err) {
    // ignore in case of private mode restriction
  }
}

// Global click delegation for language switcher buttons
document.addEventListener('click', (e) => {
  const switchBtn = e.target.closest('.lang-switch-btn');
  if (switchBtn) {
    setSkillsLanguage(switchBtn.dataset.lang);
    return;
  }

  const cardBadge = e.target.closest('.card-lang-badge');
  if (cardBadge) {
    const target = cardBadge.dataset.targetLang || 'de';
    setSkillsLanguage(target);
  }
});

// Restore saved language preference on load
try {
  const savedLang = localStorage.getItem('skills_language_pref');
  if (savedLang && savedLang === 'de') {
    setSkillsLanguage('de');
  }
} catch (err) {
  // ignore
}
