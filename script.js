document.addEventListener('DOMContentLoaded', function () {

    /* ============================================================
       1. HAMBURGER MENU
    ============================================================ */
    const hamburger = document.querySelector('.hamburger');
    const navLinks  = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    /* ============================================================
       2. IMAGE LAZY LOADING
    ============================================================ */
    document.querySelectorAll('.dish-img[data-src]').forEach(img => {
        const url = img.getAttribute('data-src');
        img.src = (url && url !== '')
            ? url
            : 'https://placehold.co/600x400/D4A259/FFFFFF?text=Bab+Dzira';
    });

    /* ============================================================
       3. 3D MODEL BUTTONS
    ============================================================ */
    document.querySelectorAll('.btn-3d').forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const container  = this.closest('.model-container');
            const modelUrl   = container.getAttribute('data-model');
            const modelViewer = container.querySelector('model-viewer');
            if (modelViewer && modelUrl && !modelViewer.hasAttribute('data-loaded')) {
                modelViewer.setAttribute('src', modelUrl);
                modelViewer.setAttribute('auto-rotate', '');
                modelViewer.classList.remove('hidden-model');
                modelViewer.setAttribute('data-loaded', 'true');
                this.style.display = 'none';
            } else if (modelViewer && modelViewer.hasAttribute('data-loaded')) {
                modelViewer.classList.remove('hidden-model');
                this.style.display = 'none';
            }
        });
    });

    /* ============================================================
       4. CONTACT FORM
    ============================================================ */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = '✓ Message envoyé !';
            btn.style.background = 'linear-gradient(135deg, #4CAF50, #66BB6A)';
            setTimeout(() => {
                btn.textContent = 'Envoyer';
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    /* ============================================================
       5. SCROLL REVEAL (IntersectionObserver)
    ============================================================ */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left');
    if (revealEls.length) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Respect stagger delay already set via style
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => revealObserver.observe(el));
    }

    /* ============================================================
       6. RIPPLE EFFECT on .btn-primary and .btn-3d
    ============================================================ */
    document.querySelectorAll('.btn-primary, .btn-3d').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top  = `${e.clientY - rect.top}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });

    /* ============================================================
       7. 3D TILT on menu cards (desktop only)
    ============================================================ */
    if (window.innerWidth > 768) {
        document.querySelectorAll('.menu-item').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width  / 2) / 18;
                const y = (e.clientY - rect.top  - rect.height / 2) / 18;
                card.style.transform =
                    `perspective(900px) rotateX(${-y}deg) rotateY(${x}deg) translateY(-6px) scale(1.01)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.35s ease';
            });
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    }

    /* ============================================================
       8. SPARKLES on HERO
    ============================================================ */
    const hero = document.querySelector('.hero');
    if (hero) {
        const spawnSparkle = () => {
            const s = document.createElement('div');
            s.classList.add('sparkle');
            const size = Math.random() * 7 + 3;
            const opacity = (Math.random() * 0.5 + 0.3).toFixed(2);
            const duration = (Math.random() * 2 + 2).toFixed(1);
            s.style.cssText = `
                width:${size}px; height:${size}px;
                background: rgba(255,169,77,${opacity});
                left: ${Math.random() * 100}%;
                top:  ${Math.random() * 100}%;
                animation-duration: ${duration}s;
            `;
            hero.appendChild(s);
            setTimeout(() => s.remove(), parseFloat(duration) * 1000 + 200);
        };
        setInterval(spawnSparkle, 280);
    }

    /* ============================================================
       9. HEADER — scroll class
    ============================================================ */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ============================================================
       10. FEATURE CARDS — staggered reveal on hover row
    ============================================================ */
    document.querySelectorAll('.feature-card').forEach((card, i) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${i * 0.13}s`;
    });

    /* ============================================================
       11. MENU CATEGORY SECTIONS — staggered reveal
    ============================================================ */
    document.querySelectorAll('.menu-category-horizontal').forEach((sec, i) => {
        sec.classList.add('reveal');
        sec.style.transitionDelay = `${i * 0.07}s`;
    });

    /* ============================================================
       12. ABOUT & CONTACT sections reveal
    ============================================================ */
    document.querySelectorAll(
        '.about-preview, .contact-info, .contact-form, .menu-header'
    ).forEach(el => {
        el.classList.add('reveal');
    });

    /* ============================================================
       13. ORNAMENT STARS — slight random float delay
    ============================================================ */
    document.querySelectorAll('.ornament-star').forEach((star, i) => {
        star.style.animationDelay = `${(i * 0.4) % 3}s`;
    });

    /* ============================================================
       14. GEO SHAPES — random float durations
    ============================================================ */
    document.querySelectorAll('.geo-shape').forEach((shape, i) => {
        const dur  = 5 + i * 1.5;
        const delay = i * 0.8;
        shape.style.animationDuration = `${dur}s`;
        shape.style.animationDelay    = `${delay}s`;
    });

    /* ============================================================
       15. MENU ITEMS — stagger inside scroll wrappers
    ============================================================ */
    document.querySelectorAll('.scroll-wrapper').forEach(wrapper => {
        wrapper.querySelectorAll('.menu-item').forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s, box-shadow 0.35s ease, border-color 0.35s ease`;
        });

        const wrapObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.menu-item').forEach(item => {
                        item.style.opacity   = '1';
                        item.style.transform = 'translateY(0)';
                    });
                    wrapObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });
        wrapObs.observe(wrapper);
    });
});
