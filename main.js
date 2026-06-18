// ── Scroll reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Navbar scroll class ───────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30), { passive: true });

// ── Active nav on scroll ──────────────────────────────────
const sections = ['hero','products','reviews'].map(id => document.getElementById(id)).filter(Boolean);
const navLinks  = document.querySelectorAll('.nl[href^="#"]');

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.45 }).observe(...sections.length ? [sections[0]] : []);

sections.forEach(s => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { threshold: 0.4 }).observe(s);
});

// ── Modal ─────────────────────────────────────────────────
const modal     = document.getElementById('modal');
const modalClose = document.getElementById('modal-close');
const mImg      = document.getElementById('m-img');
const mName     = document.getElementById('m-name');

const gameData = {
  'tab-fivem':      { name: 'FiveM',    img: 'https://i.imgur.com/4svzraD.png' },
  'tab-fortnite':   { name: 'Fortnite', img: 'https://i.imgur.com/XVYcUpt.png' },
  'tab-cs2':        { name: 'CS2',      img: 'https://i.imgur.com/ECQw4GF.png' },
  'sgcard-fivem':   { name: 'FiveM',    img: 'https://i.imgur.com/4svzraD.png' },
  'sgcard-fortnite':{ name: 'Fortnite', img: 'https://i.imgur.com/XVYcUpt.png' },
  'sgcard-cs2':     { name: 'CS2',      img: 'https://i.imgur.com/ECQw4GF.png' },
};

function openModal(id) {
  const d = gameData[id]; if (!d) return;
  mImg.src = d.img; mImg.alt = d.name;
  mName.textContent = d.name;
  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gs-tab.gs-soon, .p-row').forEach(el => {
  el.addEventListener('click', e => { e.preventDefault(); openModal(el.id); });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
