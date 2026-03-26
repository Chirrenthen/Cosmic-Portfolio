// Navigation System
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetSection = item.dataset.section;
        
        // Remove active class from all nav items and sections
        navItems.forEach(nav => nav.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked nav item
        item.classList.add('active');
        
        // Show target section with animation
        const targetElement = document.getElementById(targetSection);
        targetElement.classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, `#${targetSection}`);
    });
});

// Handle direct URL navigation
function navigateToSection(sectionId) {
    sections.forEach(section => section.classList.remove('active'));
    navItems.forEach(nav => nav.classList.remove('active'));
    
    const targetSection = document.getElementById(sectionId);
    const targetNav = document.querySelector(`[data-section="${sectionId}"]`);
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    if (targetNav) {
        targetNav.classList.add('active');
    }
}

// Check URL on load
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToSection(hash);
    }
});

// Smooth section transitions
let isScrolling = false;
let scrollTimeout;

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        isScrolling = false;
    }, 150);
    
    const currentSection = document.querySelector('.section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll down
        isScrolling = true;
        const nextSection = sections[currentIndex + 1];
        const nextNav = document.querySelector(`[data-section="${nextSection.id}"]`);
        if (nextNav) nextNav.click();
    } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scroll up
        isScrolling = true;
        const prevSection = sections[currentIndex - 1];
        const prevNav = document.querySelector(`[data-section="${prevSection.id}"]`);
        if (prevNav) prevNav.click();
    }
}, { passive: true });

// Touch swipe navigation for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const currentSection = document.querySelector('.section.active');
    const currentIndex = Array.from(sections).indexOf(currentSection);
    
    if (touchStartY - touchEndY > swipeThreshold && currentIndex < sections.length - 1) {
        // Swipe up
        const nextSection = sections[currentIndex + 1];
        const nextNav = document.querySelector(`[data-section="${nextSection.id}"]`);
        if (nextNav) nextNav.click();
    } else if (touchEndY - touchStartY > swipeThreshold && currentIndex > 0) {
        // Swipe down
        const prevSection = sections[currentIndex - 1];
        const prevNav = document.querySelector(`[data-section="${prevSection.id}"]`);
        if (prevNav) prevNav.click();
    }
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
let isDarkMode = true;

themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.documentElement.style.setProperty('--dark-bg', '#0a0a1f');
        themeToggle.querySelector('i').className = 'fas fa-moon';
    } else {
        document.documentElement.style.setProperty('--dark-bg', '#1a1a3e');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    // Smooth transition
    document.body.style.transition = 'background-color 0.5s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 500);
});