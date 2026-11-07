(() => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  }));

  // Project category filters
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-categories]');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach(card => {
      const categories = (card.dataset.categories || '').split(/\s+/);
      const show = selected === 'all' || categories.includes(selected);
      card.classList.toggle('is-hidden', !show);
    });
  }));

  // Subtle reveal on scroll; content remains visible if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // The NASSCOM certificate URL is intentionally a clearly marked placeholder
  // until the owner supplies the public certificate verification link.
  const nasscomLink = document.querySelector('[data-certificate-link]');
  if (nasscomLink && nasscomLink.getAttribute('href') === 'NASSCOM_CERTIFICATE_URL') {
    nasscomLink.addEventListener('click', event => {
      event.preventDefault();
      alert('Add your NASSCOM FutureSkills Prime certificate URL in index.html before publishing.');
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
