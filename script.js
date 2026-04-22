// Menu hamburger pour mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Ajouter des URLs d'images pour les plats non-3D
    const imgPlaceholders = document.querySelectorAll('[data-src-placeholder]');
    imgPlaceholders.forEach(img => {
        // Remplacez les URLs vides par vos vraies URLs d'images
        // Exemple : img.src = "https://example.com/image.jpg";
        img.src = "https://placehold.co/400x300/EEDDCC/5D4037?text=Bab+Dzira";
    });
});

// Formulaire de contact simple
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci ! Votre message a été envoyé (démo).');
        contactForm.reset();
    });
}
