const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((l) => l.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'page');
  });
});

const sections = [...document.querySelectorAll('section[id]')];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((link) => {
        const match = link.getAttribute('href') === `#${id}`;
        link.toggleAttribute('aria-current', match);
        if (match) {
          link.style.color = 'var(--accent)';
        } else {
          link.style.color = '';
        }
      });
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => observer.observe(section));

function initScrollReveal(root = document) {
  const elements = root.querySelectorAll('.reveal:not(.is-visible)');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => revealObserver.observe(el));
}

window.initScrollReveal = initScrollReveal;
initScrollReveal();
