document.addEventListener('DOMContentLoaded', () => {

    const aboutRows = document.querySelectorAll('.about-row');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const aboutRowObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            
                entry.target.classList.add('animate', 'animate-fade-in-up'); 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    aboutRows.forEach(row => {
        aboutRowObserver.observe(row);
    });




    const typingElements = document.querySelectorAll('.about-text .text');

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

    // <span class="text" data-typing-delay="500" data-typing-speed="70"><i class="fas fa-book-open"></i>  _Présentation personnelle</span>
});