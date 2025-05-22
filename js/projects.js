document.addEventListener('DOMContentLoaded', () => {
   
    const gallerySection = document.querySelector('.gallery-section');

    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); 
            }
        });
    }, sectionObserverOptions);

    if (gallerySection) {
        sectionObserver.observe(gallerySection);
    }

   
    const projectCards = document.querySelectorAll('.project-card-wrapper');

    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.style.animationDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeInUp');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
});
