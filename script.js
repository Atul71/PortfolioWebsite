// Loading Animation
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Show main content initially hidden
    mainContent.style.display = 'block';
    
    // Hide loading screen after animations complete
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 3500); // Wait for loading bar and color animations to complete
});

// This file is ready for your custom scripts.
// For example, you could add smooth scrolling for navigation links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive pick cards
const pickCards = document.querySelectorAll('.pick-card');

pickCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove active class from all cards
        pickCards.forEach(c => c.classList.remove('active'));
        // Add active class to the clicked card
        this.classList.add('active');

        const targetId = this.dataset.target;
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Recommendations Carousel
const track = document.querySelector('.recommendations-grid');
if (track) {
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.next');
  const prevButton = document.querySelector('.carousel-button.prev');
  let currentIndex = 0;

  const updateButtons = () => {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
  };

  const moveToSlide = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
    updateButtons();
  };

  nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
      moveToSlide(currentIndex + 1);
    }
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      moveToSlide(currentIndex - 1);
    }
  });
  
  updateButtons();
}

// Scroll Animation for Experience Section
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(item => {
    observer.observe(item);
  });
}); 