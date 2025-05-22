document.addEventListener('DOMContentLoaded', () => {


    const hobbiesGridSection = document.querySelector('.hobbies-grid-section');

    const mainObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (hobbiesGridSection) {
        mainObserver.observe(hobbiesGridSection);
    }


    const hobbyCards = document.querySelectorAll('.hobby-card');

    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Déclenche quand 20% de la carte est visible
    };

    const hobbyCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.animateDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-zoom-in'); // Déclenche l'animation de zoom-in
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    hobbyCards.forEach(card => {
        hobbyCardObserver.observe(card);
    });

    // 3. Animation de frappe pour les titres des hobbies
    const typingElements = document.querySelectorAll('.hobby-title span');

    typingElements.forEach(element => {
        const fullText = element.textContent;
        element.textContent = '';
        const delay = parseInt(element.dataset.typingDelay) || 500;
        const speed = parseInt(element.dataset.typingSpeed) || 70;

        const typingObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        let i = 0;
                        function typeWriter() {
                            if (i < fullText.length) {
                                element.textContent += fullText.charAt(i);
                                i++;
                                requestAnimationFrame(() => setTimeout(typeWriter, speed));
                            }
                        }
                        typeWriter();
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        typingObserver.observe(element);
    });


});