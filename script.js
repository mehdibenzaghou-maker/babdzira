document.addEventListener('DOMContentLoaded', function () {

    /* Header scroll */
    var header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 30);
        }, { passive: true });
    }

    /* Hamburger */
    var burger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    if (burger && navLinks) {
        burger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
        });
    }

    /* Reveal */
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

        setTimeout(function () {
            document.querySelectorAll('.reveal.pre').forEach(function (el) {
                if (el.getBoundingClientRect().top < window.innerHeight + 50) {
                    showEl(el);
                }
            });
        }, 400);
    }

    /* Ripple effect */
    document.querySelectorAll('.btn-gold, .btn-3d-view').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            var r = document.createElement('span');
            var rect = this.getBoundingClientRect();
            r.classList.add('ripple-el');
            r.style.left = (e.clientX - rect.left) + 'px';
            r.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(r);
            setTimeout(function () { r.remove(); }, 650);
        });
    });

    /* Category tabs - scroll to section */
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.cat-tab'));
    var sections = Array.prototype.slice.call(document.querySelectorAll('.menu-section[id]'));

    if (tabs.length && sections.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = document.getElementById(tab.dataset.target);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        /* Highlight active tab on scroll */
        if ('IntersectionObserver' in window) {
            var navH = 64;
            var tabH = 66;

            var secObs = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (e.isIntersecting) {
                        var id = e.target.id;
                        tabs.forEach(function (t) {
                            t.classList.toggle('active', t.dataset.target === id);
                        });
                    }
                });
            }, {
                rootMargin: '-' + (navH + tabH) + 'px 0px -55% 0px',
                threshold: 0
            });
            sections.forEach(function (s) { secObs.observe(s); });
        }
    }

    /* 3D View buttons - toggle camera controls / fullscreen */
    var viewBtns = document.querySelectorAll('.btn-3d-view');
    viewBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var viewer = this.parentElement.querySelector('model-viewer');
            if (viewer) {
                viewer.cameraControls = true;
                viewer.autoRotate = false;
                viewer.style.height = '300px';
                setTimeout(function() {
                    viewer.style.height = '140px';
                    viewer.autoRotate = true;
                    setTimeout(function() { viewer.cameraControls = false; }, 5000);
                }, 8000);
            }
        });
    });

    /* Image URL input - update image on change */
    var imgInputs = document.querySelectorAll('.img-url-input');
    imgInputs.forEach(function (input) {
        input.addEventListener('change', function () {
            var img = this.parentElement.querySelector('.dish-img');
            if (img && this.value) {
                img.src = this.value;
            }
        });
    });

    /* Contact form feedback */
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
