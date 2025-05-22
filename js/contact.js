document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const heroSection = document.querySelector('.hero-section');
    const heroContentContainer = heroSection?.querySelector('.hero-container');
    const initialHeroContentHtml = heroContentContainer?.innerHTML || '';

    if (contactForm && formMessage && heroSection && heroContentContainer) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const subject = contactForm.querySelector('#subject').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (!name || !email || !subject || !message) {
                formMessage.textContent = 'Veuillez remplir tous les champs obligatoires.';
                formMessage.classList.add('error');
                formMessage.classList.remove('success');
                resetHeroSection();
                return;
            }

            heroContentContainer.innerHTML = `
                <h1 class="text-center mb-4 success-message-title">
                    <i class="fas fa-check-circle" aria-hidden="true"></i> Merci pour votre message !
                </h1>
                <p class="text-center section-description mb-4 success-message-text">
                    Je vous répondrai dans les plus brefs délais.
                </p>
            `;
            heroSection.classList.add('hero-success-state');

            formMessage.textContent = '';
            formMessage.classList.remove('error', 'success');
            contactForm.reset();
        });

        contactForm.addEventListener('reset', resetHeroSection);

        function resetHeroSection() {
            if (heroContentContainer && initialHeroContentHtml) {
                heroContentContainer.innerHTML = initialHeroContentHtml;
                heroSection.classList.remove('hero-success-state');
            }
        }
    }

    const contactSection = document.querySelector('.contact-section');
    const contactInfoCard = document.querySelector('.contact-info');
    const contactFormContainer = document.querySelector('.contact-form-container');

    if (contactSection && contactInfoCard && contactFormContainer) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        setTimeout(() => contactInfoCard.classList.add('animate-slide-in-left'), 200);
                        setTimeout(() => contactFormContainer.classList.add('animate-slide-in-right'), 400);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { root: null, rootMargin: '0px', threshold: 0.1 }
        );

        observer.observe(contactSection);
    }
});
