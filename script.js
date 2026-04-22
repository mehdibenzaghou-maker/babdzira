document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Images par défaut
    const imgPlaceholders = document.querySelectorAll('[data-src-placeholder]');
    imgPlaceholders.forEach(img => {
        img.src = "https://placehold.co/600x400/EEDDCC/5D4037?text=Bab+Dzira";
    });

    // Gestion des boutons 3D
    const buttons3d = document.querySelectorAll('.btn-3d');
    
    buttons3d.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const container = this.closest('.model-container');
            const modelUrl = container.getAttribute('data-model');
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
});

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci ! Votre message a bien été envoyé.');
        contactForm.reset();
    });
}
