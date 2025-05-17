/*=============== EMAIL JS ===============*/
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Afficher un message de chargement
            contactMessage.textContent = 'Envoi en cours...';
            contactMessage.style.display = 'block';
            contactMessage.style.color = 'var(--color-cyan)';

            // serviceID - templateID - #form - publickey
            emailjs.sendForm('service_9anth5e', 'template_j0p0a6s', '#contact-form', 'QgHEtImt1XwvJhgj_')
                .then(() => {
                    // Message de confirmation
                    contactMessage.textContent = 'Message envoyé avec succès ✅';
                    contactMessage.style.color = 'var(--color-cyan-light)';

                    // Retirer le message après 5 secondes
                    setTimeout(() => {
                        contactMessage.textContent = '';
                        contactMessage.style.display = 'none';
                    }, 5000);

                    // Réinitialiser le formulaire
                    contactForm.reset();
                })
                .catch((error) => {
                    // Message d'erreur
                    contactMessage.textContent = 'Le message n\'a pas pu être envoyé ❌';
                    contactMessage.style.color = 'red';
                    console.error('Erreur EmailJS:', error);
                });
        });
    }
});