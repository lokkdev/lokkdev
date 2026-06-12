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
