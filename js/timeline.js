// ========================================
// Progress Bar
// ========================================

function updateProgressBar() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrollPercentage + '%';
    }
}

// ========================================
// Navbar Scroll Effect
// ========================================

function updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ========================================
// Mobile Navigation Toggle
// ========================================

function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ========================================
// Timeline View Toggle
// ========================================

function initTimelineToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const timelineContainer = document.querySelector('.timeline-container');
    const prevBtn = document.getElementById('timelineNavPrev');
    const nextBtn = document.getElementById('timelineNavNext');

    if (!toggleButtons.length || !timelineContainer) return;

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');

            // Update active button
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update timeline layout
            timelineContainer.setAttribute('data-layout', view);

            // Scroll to timeline section smoothly
            setTimeout(() => {
                const timelineSection = document.getElementById('journey');
                if (timelineSection) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = timelineSection.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);

            // If horizontal, make items visible immediately
            if (view === 'horizontal') {
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => item.classList.add('visible'));
            }
        });
    });

    // Navigation button functionality
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const scrollAmount = 370; // Card width + margin
            timelineContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            const scrollAmount = 370;
            timelineContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states on scroll
        timelineContainer.addEventListener('scroll', () => {
            const layout = timelineContainer.getAttribute('data-layout');
            if (layout === 'horizontal') {
                const scrollLeft = timelineContainer.scrollLeft;
                const maxScroll = timelineContainer.scrollWidth - timelineContainer.clientWidth;

                prevBtn.disabled = scrollLeft <= 0;
                nextBtn.disabled = scrollLeft >= maxScroll - 5;
            }
        });
    }
}

// ========================================
// Active Navigation Link
// ========================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ========================================
// Counter Animation for Stats
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function checkCounters() {
        if (countersAnimated) return;

        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        const heroRect = heroSection.getBoundingClientRect();
        const isVisible = heroRect.top < window.innerHeight && heroRect.bottom >= 0;

        if (isVisible) {
            countersAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
        }
    }

    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Check on load
}

// ========================================
// Timeline Items Reveal on Scroll
// ========================================

function initTimelineReveal() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    function checkTimelineItems() {
        timelineItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Reveal when item is 70% visible
            if (rect.top < windowHeight * 0.8) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100); // Stagger animation
            }
        });
    }

    window.addEventListener('scroll', checkTimelineItems);
    checkTimelineItems(); // Check on load
}

// ========================================
// Smooth Scroll for Navigation Links
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Skip empty or just # links
            if (href === '#' || href === '') return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Intersection Observer for Section Animations
// ========================================

function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(category);
    });

    // Observe contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// ========================================
// Parallax Effect for Hero Background
// ========================================

function initParallax() {
    const heroBackground = document.querySelector('.hero-background');

    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// ========================================
// Card Hover Effects Enhancement
// ========================================

function initCardEffects() {
    const cards = document.querySelectorAll('.content-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle scale effect
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// ========================================
// Tech Tag Interactive Effects
// ========================================

function initTechTags() {
    const techTags = document.querySelectorAll('.tech-tag, .skill-item');

    techTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Easter Egg: Konami Code
// ========================================

function initEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        // Add rainbow animation to all cards
        const cards = document.querySelectorAll('.content-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'rainbow 3s ease-in-out';
            }, index * 100);
        });

        // Add rainbow keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0%, 100% { border-color: #667eea; }
                25% { border-color: #764ba2; }
                50% { border-color: #f093fb; }
                75% { border-color: #4facfe; }
            }
        `;
        document.head.appendChild(style);

        // Show message
        alert('🎉 You found the secret! You must be a true developer!');
    }
}

// ========================================
// Performance Optimization: Debounce
// ========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// Scroll Event Handlers (Optimized)
// ========================================

function initScrollHandlers() {
    const debouncedProgressBar = debounce(updateProgressBar, 10);
    const debouncedNavbar = debounce(updateNavbar, 10);
    const debouncedActiveNav = debounce(updateActiveNavLink, 100);

    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            debouncedProgressBar();
            debouncedNavbar();
            debouncedActiveNav();
        });
    });

    // Initial calls
    updateProgressBar();
    updateNavbar();
    updateActiveNavLink();
}

// ========================================
// Preload Images
// ========================================

function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ========================================
// Initialize Everything on DOM Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initScrollHandlers();
    initMobileNav();
    initSmoothScroll();
    initTimelineToggle();

    // Animations
    initCounters();
    initTimelineReveal();
    initIntersectionObserver();
    initParallax();

    // Interactive effects
    initCardEffects();
    initTechTags();

    // Performance
    preloadImages();

    // Easter egg
    initEasterEgg();

    // Log message for developers
    console.log('%c👋 Hello, Developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
    console.log('%cThanks for checking out my portfolio code!', 'font-size: 14px; color: #764ba2;');
    console.log('%cBuilt with vanilla JavaScript, CSS Grid & Flexbox - no libraries!', 'font-size: 12px; color: #4facfe;');
    console.log('%cTry the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size: 12px; color: #f093fb;');
});

// ========================================
// Handle Resize Events
// ========================================

window.addEventListener('resize', debounce(() => {
    updateProgressBar();
}, 250));

// ========================================
// Prevent FOUC (Flash of Unstyled Content)
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
