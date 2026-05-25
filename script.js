/* ═══════════════════════════════════════════════
   script.js — Portfolio Interactivity
═══════════════════════════════════════════════ */

/* ── Typing Effect ───────────────────────────── */
const roles = [
  'DevOps Engineer',
  'Site Reliability Engineer',
  'Cloud Engineer',
  'Infrastructure Architect'
];

let roleIndex = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentRole.length) {
    speed = 2200; // pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    roleIndex   = (roleIndex + 1) % roles.length;
    speed       = 400;
  }

  setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 600);
});

/* ── Navbar Scroll Behavior ──────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], footer[id]');

window.addEventListener('scroll', () => {
  // Scrolled style
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link highlighting
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

/* ── Mobile Nav Toggle ───────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

  // Close on link click
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
    });
  });
}

/* ── Scroll Animation (IntersectionObserver) ─── */
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

// Observe generic [data-aos] elements
document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

// Staggered project card animations
const projCards = document.querySelectorAll('.proj-card');
const projObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = Array.from(projCards).indexOf(card);
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 120);
      projObserver.unobserve(card);
    }
  });
}, { threshold: 0.1 });

projCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  projObserver.observe(card);
});

// Staggered cert card animations
const certCards = document.querySelectorAll('.cert-card');
const certObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = Array.from(certCards).indexOf(card);
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 160);
      certObserver.unobserve(card);
    }
  });
}, { threshold: 0.1 });

certCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  certObserver.observe(card);
});

// Staggered sidebar cards
const sidebarCards = document.querySelectorAll('.sidebar-card');
const sidebarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = Array.from(sidebarCards).indexOf(card);
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
      }, index * 100);
      sidebarObserver.unobserve(card);
    }
  });
}, { threshold: 0.1 });

sidebarCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateX(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, background 0.3s ease';
  sidebarObserver.observe(card);
});

/* ── Floating Particles ──────────────────────── */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const opacity = Math.random() * 0.5 + 0.1;

    // Alternate colors
    const colors = ['#FF9900', '#00A3E0', '#7ee787', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${opacity};
    `;

    container.appendChild(p);
  }
}

createParticles();

/* ── Tech Pill hover ripple ──────────────────── */
document.querySelectorAll('.tech-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.25s cubic-bezier(0.4,0,0.2,1)';
  });
});

/* ── Smooth anchor scrolling with offset ──────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Hero metrics counter animation ─────────── */
function animateCounter(el, end, suffix, decimals = 0) {
  let start = 0;
  const duration = 1600;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (end - start) * eased;

    el.textContent = decimals > 0
      ? value.toFixed(decimals) + suffix
      : Math.floor(value) + suffix;

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = (decimals > 0 ? end.toFixed(decimals) : end) + suffix;
  }

  requestAnimationFrame(step);
}

// Observe the metrics section
const metricsEl = document.querySelector('.hero-metrics');
let metricsAnimated = false;

if (metricsEl) {
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !metricsAnimated) {
        metricsAnimated = true;

        const metricNums = metricsEl.querySelectorAll('.metric-num');
        // 200+, 99.9%, 60%, 3+
        const metricData = [
          { end: 200, suffix: '+', decimals: 0 },
          { end: 99.9, suffix: '%', decimals: 1 },
          { end: 60, suffix: '%', decimals: 0 },
          { end: 3, suffix: '+', decimals: 0 },
        ];

        metricNums.forEach((el, i) => {
          const data = metricData[i];
          if (data) {
            const accentEl = el.querySelector('.accent');
            // We'll animate only the number part
            el.textContent = '';
            const numSpan = document.createElement('span');
            el.appendChild(numSpan);
            if (accentEl) el.appendChild(accentEl);
            animateCounter(numSpan, data.end, '', data.decimals);
          }
        });

        metricsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  metricsObserver.observe(metricsEl);
}

/* ── Tilt effect on project cards ─────────────── */
document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
  });
});

/* ── Console easter egg ─────────────────────── */
console.log(
  '%c Anudeep Neerulli Girishchandra ',
  'background: #FF9900; color: #000; font-weight: 900; font-size: 14px; padding: 8px 16px; border-radius: 4px;'
);
console.log(
  '%c DevOps · SRE · Cloud Engineer | nganudeep@gmail.com',
  'color: #00A3E0; font-size: 12px; padding: 4px 0;'
);
console.log(
  '%c Interested in hiring? Let\'s connect! https://linkedin.com/in/nganudeep',
  'color: #7ee787; font-size: 11px;'
);
