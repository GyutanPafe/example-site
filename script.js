document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Intersection Observer for scroll animations
    const animationObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing after it becomes visible once
                observer.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // 4. Form submission handler
    const form = document.getElementById('inquiryForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Implement loading states or send data here
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> 送信中...';
            btn.disabled = true;

            // Simulate API Call
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> 送信完了';
                btn.style.backgroundColor = '#4bb543'; // Success color
                btn.style.borderColor = '#4bb543';
                
                setTimeout(() => {
                    form.reset();
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                }, 3000);
            }, 1500);
        });
    }
});
