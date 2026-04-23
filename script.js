document.addEventListener('DOMContentLoaded', function () {

    /* ── Header scroll ─────────────────────────────── */
    var header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* ── Hamburger ─────────────────────────────────── */
    var burger   = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
    }

    /* ── Reveal ────────────────────────────────────── */
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

    /* ── Ripple ────────────────────────────────────── */
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

    /* ── "Voir mon dessert" — load 3D model on demand ─
       model-viewer uses data-src until the user clicks.
       On click: copy data-src → src, hide button.
    ─────────────────────────────────────────────────── */
    document.querySelectorAll('.voir-dessert-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var wrap = this.closest('.item-media-wrap');
            if (!wrap) return;
            var mv = wrap.querySelector('model-viewer');
            if (mv && !mv.getAttribute('src')) {
                var dataSrc = mv.getAttribute('data-src');
                if (dataSrc) {
                    mv.setAttribute('src', dataSrc);
                }
            }
            this.classList.add('loaded'); // hides the button via CSS
        });
    });

    /* ── 3D Modal ──────────────────────────────────── */
    var modal       = document.getElementById('modelModal');
    var modalViewer = document.getElementById('modal-viewer');

    window.openModal = function (btn) {
        var wrap = btn.closest('.item-media-wrap');
        if (!wrap || !modal || !modalViewer) return;
        var mv = wrap.querySelector('model-viewer');
        if (!mv) return;
        var src = mv.getAttribute('src') || mv.getAttribute('data-src') || '';
        modalViewer.setAttribute('src', src);
        modal.classList.add('open');
    };

    window.closeModal = function () {
        if (modal) modal.classList.remove('open');
        if (modalViewer) modalViewer.setAttribute('src', '');
    };

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) window.closeModal();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') window.closeModal();
    });

    /* ── Category tabs ─────────────────────────────── */
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

    /* ── Image error fallback ──────────────────────── */
    document.querySelectorAll('.item-img').forEach(function (img) {
        img.addEventListener('error', function () {
            var wrap = this.closest('.item-media-wrap');
            if (!wrap) return;
            this.style.display = 'none';
            var ph = document.createElement('div');
            ph.className = 'img-placeholder';
            ph.innerHTML = '<i class="fas fa-image"></i><span>Image à venir</span>';
            wrap.appendChild(ph);
        });
    });

    /* ── Contact form feedback ─────────────────────── */
    var form = document.querySelector('.contact-form-el');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn  = form.querySelector('button[type="submit"]');
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
