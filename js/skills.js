document.addEventListener('DOMContentLoaded', () => {
    // Gestion de la rotation des cartes
    const behavioralCards = document.querySelectorAll('.behavioral-card');
    
    behavioralCards.forEach(card => {
        // Pour desktop - rotation au survol
        card.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                card.classList.add('flipped');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                card.classList.remove('flipped');
            }
        });
        
        // Pour mobile - clic pour afficher/masquer
        card.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                card.classList.toggle('active');
            }
        });
    });

    // Animation au scroll
    const animateOnScroll = (elements, animationClass, threshold = 0.1) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(animationClass);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });
        
        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll(
        document.querySelectorAll('[data-animate]'), 
        'animate'
    );
});
