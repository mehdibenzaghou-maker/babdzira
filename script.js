document.addEventListener('DOMContentLoaded', () => {

    /* ── Header scroll shadow ─────────────────────── */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ── Hamburger ────────────────────────────────── */
    const burger   = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', () => navLinks.classList.toggle('open'));
    }

    /* ── Scroll reveal  ───────────────────────────────
       Elements start VISIBLE (no opacity:0 in HTML).
       JS adds .pre to hide them, then .in to show them.
       If JS/observer fails the text stays readable.
    ──────────────────────────────────────────────── */
    if ('IntersectionObserver' in window) {
        const revealEls = document.querySelectorAll('.reveal');
        revealEls.forEach(el => el.classList.add('pre'));

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });

        revealEls.forEach(el => obs.observe(el));

        // Safety: show anything already in viewport after 300 ms
        setTimeout(() => {
            document.querySelectorAll('.reveal.pre:not(.in)').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('in');
                }
            });
        }, 300);
    }

    /* ── Ripple on .btn-gold ──────────────────────── */
    document.querySelectorAll('.btn-gold').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const r   = document.createElement('span');
            const rect = this.getBoundingClientRect();
            r.classList.add('ripple-el');
            r.style.left = `${e.clientX - rect.left}px`;
            r.style.top  = `${e.clientY - rect.top}px`;
            this.appendChild(r);
            setTimeout(() => r.remove(), 650);
        });
    });

    /* ── Image lazy loading ───────────────────────── */
    document.querySelectorAll('[data-src]').forEach(img => {
        const url = img.dataset.src;
        img.src = (url && !url.startsWith('URL_'))
            ? url
            : 'https://placehold.co/600x400/163344/C9A84C?text=Bab+Dzira';
    });

    /* ── 3D model buttons ─────────────────────────── */
    document.querySelectorAll('.btn-3d').forEach(btn => {
        btn.addEventListener('click', function () {
            const container = this.closest('.model-container');
            const mv  = container?.querySelector('model-viewer');
            const url = container?.dataset.model;
            if (mv && url && !mv.hasAttribute('data-loaded')) {
                mv.setAttribute('src', url);
                mv.setAttribute('auto-rotate', '');
                mv.classList.remove('hidden-model');
                mv.setAttribute('data-loaded', 'true');
                this.style.display = 'none';
            }
        });
    });

    /* ── Category tabs ────────────────────────────── */
    const tabs     = document.querySelectorAll('.cat-tab');
    const sections = document.querySelectorAll('.menu-section[id]');

    if (tabs.length && sections.length) {
        // Click → scroll
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const el = document.getElementById(tab.dataset.target);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Scroll → active tab
        const navH = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h')) || 64;
        const tabH = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--tab-h')) || 68;

        const secObs = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    const id = e.target.id;
                    tabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
                    const active = document.querySelector(`.cat-tab[data-target="${id}"]`);
                    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                }
            });
        }, { rootMargin: `-${navH + tabH}px 0px -55% 0px`, threshold: 0 });

        sections.forEach(s => secObs.observe(s));
    }

    /* ── Stagger menu cards ───────────────────────── */
    if ('IntersectionObserver' in window) {
        const cardObs = new IntersectionObserver((entries) => {
            let i = 0;
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.style.animationDelay = `${(i++ % 6) * 0.06}s`;
                    e.target.style.animation = 'fadeUp 0.5s ease both';
                    cardObs.unobserve(e.target);
                }
            });
        }, { threshold: 0.05 });
        document.querySelectorAll('.menu-card').forEach(c => cardObs.observe(c));
    }

    /* ── Contact form feedback ────────────────────── */
    const form = document.querySelector('.contact-form-el');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const orig = btn.textContent;
            btn.textContent = '✓ Message envoyé !';
            btn.style.color = '#6fcf97';
            btn.style.borderColor = '#6fcf97';
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.color = '';
                btn.style.borderColor = '';
                form.reset();
            }, 3000);
        });
    }
});
