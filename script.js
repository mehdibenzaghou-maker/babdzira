document.addEventListener('DOMContentLoaded', function () {

    /* ── Header scroll ── */
    var header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ── Hamburger ── */
    var burger   = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
    }

    /* ── Scroll reveal ── */
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    function showEl(el) { el.classList.remove('pre'); el.classList.add('in'); }
    if (revealEls.length && 'IntersectionObserver' in window) {
        revealEls.forEach(function (el) { el.classList.add('pre'); });
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { showEl(e.target); obs.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        revealEls.forEach(function (el) { obs.observe(el); });
        setTimeout(function () {
            document.querySelectorAll('.reveal.pre').forEach(function (el) {
                if (el.getBoundingClientRect().top < window.innerHeight + 50) showEl(el);
            });
        }, 400);
    }

    /* ── Ripple on .btn-gold ── */
    document.querySelectorAll('.btn-gold').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var r = document.createElement('span');
            var rect = this.getBoundingClientRect();
            r.classList.add('ripple-el');
            r.style.left = (e.clientX - rect.left) + 'px';
            r.style.top  = (e.clientY - rect.top) + 'px';
            this.appendChild(r);
            setTimeout(function () { r.remove(); }, 650);
        });
    });

    /* ── Category tabs ── */
    var tabs     = Array.prototype.slice.call(document.querySelectorAll('.cat-tab'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.menu-section[id]'));
    if (tabs.length && sections.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = document.getElementById(tab.dataset.target);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
        if ('IntersectionObserver' in window) {
            var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
            var tabH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tab-h')) || 66;
            var secObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        var id = e.target.id;
                        tabs.forEach(function (t) { t.classList.toggle('active', t.dataset.target === id); });
                        var active = document.querySelector('.cat-tab[data-target="' + id + '"]');
                        if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                });
            }, { rootMargin: '-' + (navH + tabH) + 'px 0px -55% 0px', threshold: 0 });
            sections.forEach(function (s) { secObs.observe(s); });
        }
    }

    /* ── Contact form ── */
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

/* ================================================================
   loadModel(posterEl)
   Called when user clicks the poster overlay.
   1. Reads data-src from model-viewer and sets it as src → loads GLB
   2. Hides the poster so the 3D model is visible in its place
   The AR button (slot="ar-button") appears automatically once the
   model-viewer element has a src and the browser supports AR.
================================================================ */
function loadModel(posterEl) {
    var wrap = posterEl.closest('.item-media-wrap');
    if (!wrap) return;

    var mv = wrap.querySelector('model-viewer');
    if (mv && !mv.getAttribute('src')) {
        var glbUrl = mv.getAttribute('data-src');
        if (glbUrl) {
            mv.setAttribute('src', glbUrl);
        }
    }

    /* Hide the poster — transition handled by CSS .hidden class */
    posterEl.classList.add('hidden');
}
