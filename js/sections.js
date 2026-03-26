// Section-specific interactions and animations

// GitHub Stats Animation (simulated)
function animateGitHubStats() {
    const reposEl = document.getElementById('github-repos');
    const commitsEl = document.getElementById('github-commits');
    const followersEl = document.getElementById('github-followers');
    
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Trigger animation when home section is active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(reposEl, 0, 50, 2000, '+');
                animateValue(commitsEl, 0, 1000, 2000, '+');
                animateValue(followersEl, 0, 100, 2000, '+');
            }
        });
    });
    
    observer.observe(document.getElementById('home'));
}

// About Section - Timeline Animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// Makerspace Category Interactions
function initMakerspaceInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category || card.querySelector('h3').textContent;
            
            // Visual feedback
            card.style.transform = 'scale(1.05) translateY(-10px)';
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
            
            // Show category content (placeholder for now)
            showMakerspaceModal(category);
        });
    });
}

function showMakerspaceModal(category) {
    // Create modal for makerspace items
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content glass-panel">
            <span class="modal-close" onclick="this.closest('.modal').remove()">&times;</span>
            <div class="modal-body" style="display: block; text-align: center;">
                <h2 style="color: var(--neon-green); margin-bottom: 20px;">${category}</h2>
                <p style="margin-bottom: 20px;">Explore amazing ${category.toLowerCase()} projects and components!</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 30px;">
                    <div class="glass-panel" style="padding: 20px;">
                        <i class="fas fa-microchip" style="font-size: 40px; color: var(--neon-green); margin-bottom: 10px;"></i>
                        <h4>Component 1</h4>
                        <p style="font-size: 0.9rem; opacity: 0.8;">Description here</p>
                    </div>
                    <div class="glass-panel" style="padding: 20px;">
                        <i class="fas fa-cog" style="font-size: 40px; color: var(--neon-green); margin-bottom: 10px;"></i>
                        <h4>Component 2</h4>
                        <p style="font-size: 0.9rem; opacity: 0.8;">Description here</p>
                    </div>
                    <div class="glass-panel" style="padding: 20px;">
                        <i class="fas fa-bolt" style="font-size: 40px; color: var(--neon-green); margin-bottom: 10px;"></i>
                        <h4>Component 3</h4>
                        <p style="font-size: 0.9rem; opacity: 0.8;">Description here</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Particle animation for contact section
function animateContactParticles() {
    const contactSection = document.getElementById('contact');
    const particlesContainer = document.getElementById('contact-particles');
    
    if (!particlesContainer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate particles based on mouse movement
                contactSection.addEventListener('mousemove', (e) => {
                    const rect = contactSection.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const particles = particlesContainer.querySelectorAll('.particle');
                    particles.forEach((particle, index) => {
                        const speed = (index + 1) * 0.5;
                        const newX = parseFloat(particle.style.left) + (x - rect.width / 2) * 0.001 * speed;
                        const newY = parseFloat(particle.style.top) + (y - rect.height / 2) * 0.001 * speed;
                        
                        particle.style.left = `${newX}%`;
                        particle.style.top = `${newY}%`;
                    });
                });
            }
        });
    });
    
    observer.observe(contactSection);
}

// Easter Egg - Click on planets
function initEasterEggs() {
    const facts = [
        "🌟 Fun Fact: I can code for 12 hours straight!",
        "🚀 I've built over 30 projects!",
        "🎮 I love gaming in my free time!",
        "☕ Coffee is my debugging tool!",
        "🌌 I'm fascinated by space exploration!"
    ];
    
    // Add click event to GitHub globe
    const githubGlobe = document.getElementById('github-globe');
    if (githubGlobe) {
        githubGlobe.addEventListener('click', () => {
            const randomFact = facts[Math.floor(Math.random() * facts.length)];
            
            const popup = document.createElement('div');
            popup.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 2px solid var(--neon-blue);
                border-radius: 20px;
                padding: 30px;
                z-index: 10000;
                animation: fadeInUp 0.5s ease;
                box-shadow: 0 0 50px var(--neon-blue);
                max-width: 400px;
                text-align: center;
            `;
            popup.innerHTML = `
                <h3 style="color: var(--neon-blue); margin-bottom: 15px;">Easter Egg Found!</h3>
                <p style="font-size: 1.2rem;">${randomFact}</p>
                <button onclick="this.parentElement.remove()" style="
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: var(--neon-blue);
                    border: none;
                    border-radius: 10px;
                    color: var(--dark-bg);
                    font-weight: 600;
                    cursor: none;
                ">Got it!</button>
            `;
            
            document.body.appendChild(popup);
            
            setTimeout(() => {
                popup.remove();
            }, 5000);
        });
    }
}

// Scroll-based animations
function initScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all cards and panels
    document.querySelectorAll('.glass-panel, .project-card, .idea-card, .category-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        animateOnScroll.observe(el);
    });
}

// Initialize all section interactions
document.addEventListener('DOMContentLoaded', () => {
    animateGitHubStats();
    initTimelineAnimation();
    initMakerspaceInteractions();
    animateContactParticles();
    initEasterEggs();
    initScrollAnimations();
    
    console.log('🌌 Cosmic Portfolio initialized successfully!');
});