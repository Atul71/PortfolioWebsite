document.addEventListener('DOMContentLoaded', function () {
    // --- Loading Animation ---
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const percentageElement = document.getElementById('loading-percentage');
    
    if (loadingScreen && mainContent && percentageElement) {
        let currentPercentage = 0;
        const interval = setInterval(() => {
            currentPercentage++;
            percentageElement.textContent = `${currentPercentage}%`;

            if (currentPercentage >= 100) {
                clearInterval(interval);
                
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.style.display = 'block';
                    mainContent.style.opacity = '0';
                    mainContent.style.animation = 'fadeInMain 0.5s ease-out forwards';
                }, 500);
            }
        }, 20);
    }

    // --- Modern Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('mobile-menu');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const navOverlay = document.getElementById('nav-overlay');
    const body = document.body;

    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        navOverlay.classList.add('active');
        body.classList.add('menu-open');
        // Focus first link after a short delay for accessibility
        setTimeout(() => {
            if (navLinksItems.length) navLinksItems[0].focus();
        }, 200);
    }
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    }
    if (hamburger && navLinks && navOverlay) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!navLinks.classList.contains('active')) {
                openMenu();
            }
        });
        navOverlay.addEventListener('click', closeMenu);
        navLinksItems.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        // Add close button event
        const closeBtn = document.getElementById('close-mobile-menu');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeMenu();
                hamburger.focus();
            });
        }
        // Trap focus in menu when open (basic)
        document.addEventListener('keydown', function(e) {
            if (!navLinks.classList.contains('active')) return;
            if (e.key === 'Escape') closeMenu();
            if (e.key === 'Tab') {
                const focusable = [
                    ...Array.from(navLinksItems),
                    document.getElementById('close-mobile-menu')
                ];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });
    }

    // --- Smooth scrolling for navigation links ---
    const allNavLinks = document.querySelectorAll('nav a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Experience Section Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const item = this.closest('.experience-list-item');
            item.classList.toggle('active');
        });
    });

    // --- Intersection Observer for Fade-in Animations ---
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // --- Interactive pick cards ---
    const pickCards = document.querySelectorAll('.pick-card');
    pickCards.forEach(card => {
        card.addEventListener('click', function() {
            pickCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const targetId = this.dataset.target;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Recommendations Carousel ---
    const track = document.querySelector('.recommendations-grid');
    if (track) {
      const slides = Array.from(track.children);
      const nextButton = document.querySelector('.carousel-button.next');
      const prevButton = a= document.querySelector('.carousel-button.prev');
      let currentIndex = 0;

      const updateButtons = () => {
        if (!prevButton || !nextButton) return;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= slides.length - 1;
      };

      const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateButtons();
      };

      if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => {
          if (currentIndex < slides.length - 1) moveToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
          if (currentIndex > 0) moveToSlide(currentIndex - 1);
        });
        
        updateButtons();
      }
    }

    // --- Timeline Animation ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });
}); 