// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function setActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop - 80;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < bottom) {
            navAnchors.forEach(a => a.classList.remove('active'));
            const active = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (active) active.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Also observe skill categories and cards for subtle entrance
document.querySelectorAll('.skill-category, .education-card, .award-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
