/* =========================================================
   Israfil Hossain — portfolio shared script
   Every block is guarded, so the same file runs on the home
   page and on the project detail pages.
   ========================================================= */

/* ============ 1. Your social URLs — EDIT THESE ============
   Fill these in once and every button on every page goes live. */
const SOCIALS = {
  linkedin: 'https://www.linkedin.com/in/israfil-hossain-968036205',
  whatsapp: 'https://wa.me/+8801403221969',
  fiverr:   'https://www.fiverr.com/fil303' 
};

/* ============ 2. Projects (single source of truth) ============
   The home page builds its cards from this list, and each `slug`
   is the detail page that card opens. */
const PROJECTS = [
  { slug:'project-spot-trading.html',      emoji:'📈', role:'Backend Developer',
    t:'Crypto Spot Trading Platform',
    d:'High-traffic exchange with many active users. Buying, selling, staking & secure wallet management. Built & optimized APIs for web + mobile.',
    tech:['Laravel','ExpressJS','NextJS','Redis','Nginx','PHP 8.4','MySQL'] },

  { slug:'project-futures-trading.html',   emoji:'⚡', role:'Backend Developer',
    t:'Crypto Future Trading',
    d:'Binance-style futures: long/short positions, leverage, continuous PnL, auto-liquidation & funding fees. Optimized high-throughput APIs.',
    tech:['Laravel','NextJS','Redis','Nginx','PHP 8.4','MySQL'] },

  { slug:'project-copy-trading.html',      emoji:'🤝', role:'Backend Developer',
    t:'Spot Copy Trading Platform',
    d:"Followers auto-copy a Lead Trader's positions by allocation & settings. Each keeps ownership; lead earns profit-share commission.",
    tech:['Laravel','NextJS','Redis','Nginx','PHP 8.4','MySQL'] },

  { slug:'project-p2p-trading.html',       emoji:'🔁', role:'Full Stack Developer',
    t:'Crypto P2P Selling Platform',
    d:'Peer-to-peer buy/sell where users trade crypto directly & safely, with secure wallet management. Full frontend + backend.',
    tech:['Laravel','Bootstrap','Redis','Nginx','PHP 8.4','MySQL'] },

  { slug:'project-investment.html',        emoji:'💎', role:'Full Stack Developer',
    t:'Crypto Investment Platform',
    d:'Designed & built solo from scratch — users invest in crypto. Queues, Redis caching & clean Laravel architecture.',
    tech:['Laravel','Tailwind','Redis','AlpineJS','PHP 8.2','MySQL'],
    link:'https://github.com/fil303/walletorpro' },
];

/* ============ 3. Footer year ============ */
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

/* ============ 4. Custom cursor ============ */
(function () {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  const dot = document.querySelector('.cursor-dot'), ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let rx = 0, ry = 0, mx = 0, my = 0;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });
  (function loop () {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  // Delegated, so it also covers cards injected later.
  addEventListener('mouseover', e => {
    if (e.target.closest('a,button,.nav-target,.chip,.social,.social-dark,.project-card')) ring.classList.add('active');
  });
  addEventListener('mouseout', e => {
    if (e.target.closest('a,button,.nav-target,.chip,.social,.social-dark,.project-card')) ring.classList.remove('active');
  });
})();

/* ============ 5. Scroll progress, sticky nav shadow, back-to-top ============ */
(function () {
  const bar = document.getElementById('scrollbar');
  const navInner = document.querySelector('#nav nav');
  const toTop = document.getElementById('toTop');
  addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%';
    if (navInner) navInner.classList.toggle('shadow-xl', scrollY > 20);
    if (toTop) toTop.classList.toggle('show', scrollY > 500);
  });
  if (toTop) toTop.addEventListener('click', e => {
    e.preventDefault();
    scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();

/* ============ 6. Mobile menu ============ */
(function () {
  const btn = document.getElementById('menuBtn'), menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
})();

/* ============ 7. Reveal on scroll + skill bars ============ */
function showEl (el) {
  el.classList.add('show');
  el.querySelectorAll('.skill-fill').forEach(f => f.style.width = f.dataset.w);
}
const hasIO = 'IntersectionObserver' in window;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// If IntersectionObserver is missing, show everything rather than hide content.
const io = hasIO
  ? new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { showEl(en.target); io.unobserve(en.target); } });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' })
  : { observe: showEl, unobserve () {} };

// Only collapse the bars if we can actually animate them back up again —
// otherwise leave the accurate widths baked into the HTML.
if (hasIO && !reduced) {
  document.querySelectorAll('.skill-fill').forEach(f => f.style.width = '0');
}
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Safety net: nothing above the fold may stay invisible.
addEventListener('load', () => {
  document.querySelectorAll('.reveal:not(.show)').forEach(el => {
    if (el.getBoundingClientRect().top < innerHeight) showEl(el);
  });
});

/* ============ 8. Active nav link (home page only) ============ */
(function () {
  const links = [...document.querySelectorAll('.nav-link')];
  const sections = ['home', 'story', 'skills', 'projects', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !hasIO) return;
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id));
      }
    });
  }, { threshold: .5 });
  sections.forEach(s => spy.observe(s));
})();

/* ============ 9. Wire up placeholder social links ============ */
document.querySelectorAll('[data-placeholder]').forEach(a => {
  const url = SOCIALS[a.dataset.placeholder];
  if (url) { a.href = url; return; }
  a.addEventListener('click', e => {
    e.preventDefault();
    alert('Add your ' + a.dataset.placeholder.toUpperCase() + ' URL in the SOCIALS object at the top of assets/main.js');
  });
});

/* ============ 10. 3D tilt on the hero photo card ============ */
(function () {
  const card = document.getElementById('photoCard');
  if (!card || reduced) return;
  const wrap = card.parentElement;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.02)`;
  });
  wrap.addEventListener('mouseleave', () => card.style.transform = 'perspective(900px) rotateY(0) rotateX(0)');
})();

/* ============ 11. Build the project cards (home page only) ============ */
(function () {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  grid.innerHTML = PROJECTS.map(p => `
    <a href="${p.slug}" class="project-card reveal group glass rounded-3xl p-7 hover:-translate-y-1.5 transition-transform duration-300 relative overflow-hidden">
      <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-forest-200/40 blur-2xl group-hover:bg-forest-300/50 transition-colors"></div>
      <div class="flex items-start justify-between">
        <div class="w-14 h-14 rounded-2xl glass-deep grid place-items-center text-2xl">${p.emoji}</div>
        <span class="text-xs font-semibold text-forest-500 bg-forest-50 px-3 py-1 rounded-full">${p.role}</span>
      </div>
      <h3 class="font-grotesk font-bold text-xl text-forest-950 mt-5 group-hover:text-forest-600 transition-colors">${p.t}</h3>
      <p class="text-sm text-forest-900/65 mt-2 leading-relaxed">${p.d}</p>
      <div class="flex flex-wrap gap-2 mt-4">
        ${p.tech.map(x => `<span class="text-[11px] font-semibold text-forest-700 bg-white/70 border border-forest-100 px-2.5 py-1 rounded-full">${x}</span>`).join('')}
      </div>
      <span class="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-forest-600 group-hover:gap-3 transition-all">
        View case study
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </span>
    </a>`).join('');
  grid.querySelectorAll('.reveal').forEach(el => io.observe(el));
})();

/* ============ 12. Three.js hero scene (only where the canvas exists) ============ */
(function () {
  const canvas = document.getElementById('three-canvas');
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, .1, 100);
  camera.position.z = 6;

  // Offset right on desktop so it frames the photo instead of sitting under the headline.
  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.9, 1),
    new THREE.MeshBasicMaterial({ color: 0x18b866, wireframe: true, transparent: true, opacity: .30 })
  );
  group.add(core);

  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35, 0),
    new THREE.MeshBasicMaterial({ color: 0x0b5d39, wireframe: true, transparent: true, opacity: .20 })
  );
  group.add(inner);

  function place () { group.position.x = innerWidth >= 1024 ? 2.6 : 0; }
  place(); addEventListener('resize', place);

  // particle field
  const N = 650, pos = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - .5) * 22;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({
    color: 0x40d384, size: .045, transparent: true, opacity: .55
  }));
  scene.add(points);

  let mX = 0, mY = 0;
  addEventListener('mousemove', e => { mX = e.clientX / innerWidth - .5; mY = e.clientY / innerHeight - .5; });

  function resize () {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== w || canvas.height !== h) {
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
  }

  const clock = new THREE.Clock();
  (function animate () {
    resize();
    const t = clock.getElapsedTime();
    core.rotation.x = t * .15;  core.rotation.y = t * .2;
    inner.rotation.x = -t * .25; inner.rotation.y = -t * .18;
    points.rotation.y = t * .03;
    camera.position.x += (mX * 2 - camera.position.x) * .05;
    camera.position.y += (-mY * 2 - camera.position.y) * .05;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  })();
})();
