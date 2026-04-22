document.addEventListener('DOMContentLoaded', function () {

    /* ── Header scroll ─────────────────────────────────── */
    var header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ── Hamburger ─────────────────────────────────────── */
    var burger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
    }

    /* ── Reveal — safe pattern ─────────────────────────────
       1. Add .pre to hide elements (opacity:0)
       2. Observer adds .in to show them
       3. If anything fails, .pre elements are shown after 400ms
    ──────────────────────────────────────────────────────── */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    function showEl(el) {
        el.classList.remove('pre');
        el.classList.add('in');
    }

    if (revealEls.length > 0 && 'IntersectionObserver' in window) {
        revealEls.forEach(function (el) { el.classList.add('pre'); });

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    showEl(e.target);
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });

        revealEls.forEach(function (el) { obs.observe(el); });

        /* Safety fallback — show anything already visible */
        setTimeout(function () {
            document.querySelectorAll('.reveal.pre').forEach(function (el) {
                if (el.getBoundingClientRect().top < window.innerHeight + 50) {
                    showEl(el);
                }
            });
        }, 400);
    }

    /* ── Ripple ────────────────────────────────────────── */
    document.querySelectorAll('.btn-gold').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var r = document.createElement('span');
            var rect = this.getBoundingClientRect();
            r.classList.add('ripple-el');
            r.style.left = (e.clientX - rect.left) + 'px';
            r.style.top  = (e.clientY - rect.top)  + 'px';
            this.appendChild(r);
            setTimeout(function () { r.remove(); }, 650);
        });
    });

    /* ── Category tabs ─────────────────────────────────── */
    var tabs     = Array.prototype.slice.call(document.querySelectorAll('.cat-tab'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.menu-section[id]'));

    if (tabs.length && sections.length) {
        /* Click → scroll to section */
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = document.getElementById(tab.dataset.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        /* Scroll → highlight active tab */
        if ('IntersectionObserver' in window) {
            var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
            var tabH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tab-h')) || 66;

            var secObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        var id = e.target.id;
                        tabs.forEach(function (t) {
                            t.classList.toggle('active', t.dataset.target === id);
                        });
                        var active = document.querySelector('.cat-tab[data-target="' + id + '"]');
                        if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                });
            }, {
                rootMargin: '-' + (navH + tabH) + 'px 0px -55% 0px',
                threshold: 0
            });
            sections.forEach(function (s) { secObs.observe(s); });
        }
    }

    /* ── Menu card stagger ─────────────────────────────── */
    if ('IntersectionObserver' in window) {
        var cardIdx = 0;
        var cardObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    var delay = (cardIdx % 6) * 0.055;
                    e.target.style.animationDelay = delay + 's';
                    e.target.style.animation = 'fadeUp 0.5s ease both';
                    cardObs.unobserve(e.target);
                    cardIdx++;
                }
            });
        }, { threshold: 0.05 });
        document.querySelectorAll('.menu-card').forEach(function (c) { cardObs.observe(c); });
    }

    /* ── Contact form feedback ─────────────────────────── */
    var form = document.querySelector('.contact-form-el');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            var orig = btn.textContent;
            btn.textContent = '✓ Message envoyé !';
            btn.style.color = '#6fcf97';
            btn.style.borderColor = '#6fcf97';
            setTimeout(function () {
                btn.textContent = orig;
                btn.style.color = '';
                btn.style.borderColor = '';
                form.reset();
            }, 3000);
        });
    }
});
