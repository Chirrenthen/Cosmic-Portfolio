// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 2000);
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const phrases = [
    "Hi, I'm Chirrenthen, a cosmic web developer...",
    "Building innovative IoT solutions...",
    "Exploring the universe of technology...",
    "Creating seamless digital experiences..."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

setTimeout(typeEffect, 1000);

// Load Skills
async function loadSkills() {
    try {
        const response = await fetch('data/skills.json');
        const skills = await response.json();
        const skillsOrbit = document.getElementById('skills-orbit');
        const radius = 250;
        const centerX = skillsOrbit.offsetWidth / 2;
        const centerY = skillsOrbit.offsetHeight / 2;
        
        skills.forEach((skill, index) => {
            const angle = (index / skills.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 40;
            const y = centerY + radius * Math.sin(angle) - 40;
            
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.style.left = `${x}px`;
            skillItem.style.top = `${y}px`;
            skillItem.innerHTML = `
                <img src="${skill.icon}" alt="${skill.name}" onerror="this.src='https://via.placeholder.com/40'">
                <span>${skill.name}</span>
            `;
            
            skillsOrbit.appendChild(skillItem);
        });
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Rotate Skills Orbit
let currentRotation = 0;
document.getElementById('rotate-left').addEventListener('click', () => {
    currentRotation -= 45;
    document.getElementById('skills-orbit').style.transform = `rotate(${currentRotation}deg)`;
});

document.getElementById('rotate-right').addEventListener('click', () => {
    currentRotation += 45;
    document.getElementById('skills-orbit').style.transform = `rotate(${currentRotation}deg)`;
});

// Mouse wheel to rotate skills
document.getElementById('skills').addEventListener('wheel', (e) => {
    if (document.getElementById('skills').classList.contains('active')) {
        e.preventDefault();
        currentRotation += e.deltaY * 0.1;
        document.getElementById('skills-orbit').style.transform = `rotate(${currentRotation}deg)`;
    }
});

// Load Projects
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();
        const projectsGrid = document.getElementById('projects-grid');
        
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card glass-panel`;
            projectCard.dataset.category = project.category;
            projectCard.style.animationDelay = `${index * 0.1}s`;
            
            projectCard.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.desc}</p>
                <div class="project-links">
                    <a href="${project.links.view}" target="_blank" class="project-btn">
                        <i class="fas fa-external-link-alt"></i> View
                    </a>
                    <a href="${project.links.code}" target="_blank" class="project-btn">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
            `;
            
            projectCard.addEventListener('click', () => openProjectModal(project));
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Filter Projects
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Project Modal
function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = project.name;
    document.getElementById('modal-desc').textContent = project.desc;
    document.getElementById('modal-view').href = project.links.view;
    document.getElementById('modal-code').href = project.links.code;
    document.getElementById('modal-img').src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(project.name)}`;
    modal.classList.add('active');
}

document.querySelector('.modal-close').addEventListener('click', () => {
    document.getElementById('project-modal').classList.remove('active');
});

document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        document.getElementById('project-modal').classList.remove('active');
    }
});

// Contact Form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you can integrate with EmailJS or your backend
    console.log('Form submitted:', { name, email, message });
    
    alert('Message sent successfully! 🚀');
    e.target.reset();
});

// Contact Particles
function createContactParticles() {
    const container = document.getElementById('contact-particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--neon-blue);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${3 + Math.random() * 3}s ease-in-out infinite;
            opacity: ${0.3 + Math.random() * 0.7};
        `;
        container.appendChild(particle);
    }
}

// Inspiration Mode
document.getElementById('inspiration-btn').addEventListener('click', () => {
    const ideas = [
        { title: 'E-commerce Platform', desc: 'Build a modern online store with cart functionality', tags: ['React', 'Node.js', 'MongoDB'] },
        { title: 'Social Media Dashboard', desc: 'Analytics dashboard for social media metrics', tags: ['Vue.js', 'Chart.js', 'API'] },
        { title: 'AI Chatbot', desc: 'Intelligent chatbot using natural language processing', tags: ['Python', 'TensorFlow', 'Flask'] },
        { title: 'Real-time Chat App', desc: 'Instant messaging with WebSocket technology', tags: ['Socket.io', 'Express', 'React'] },
        { title: 'Fitness Tracker', desc: 'Track workouts, calories, and fitness goals', tags: ['React Native', 'Firebase'] },
        { title: 'Recipe Finder', desc: 'Search recipes by ingredients and dietary preferences', tags: ['JavaScript', 'API', 'CSS'] }
    ];
    
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    
    const ideaCard = document.createElement('div');
    ideaCard.className = 'idea-card glass-panel';
    ideaCard.style.animation = 'fadeInUp 0.6s ease forwards, pulse 2s ease-in-out';
    ideaCard.innerHTML = `
        <h3>${randomIdea.title}</h3>
        <p>${randomIdea.desc}</p>
        <div class="idea-tags">
            ${randomIdea.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <button class="save-idea-btn"><i class="fas fa-bookmark"></i> Save</button>
    `;
    
    const grid = document.getElementById('webdev-grid');
    grid.insertBefore(ideaCard, grid.firstChild);
    
    // Remove after animation
    setTimeout(() => {
        ideaCard.style.animation = 'none';
    }, 2000);
});

// Save Idea functionality
document.getElementById('webdev-grid').addEventListener('click', (e) => {
    if (e.target.classList.contains('save-idea-btn') || e.target.parentElement.classList.contains('save-idea-btn')) {
        const btn = e.target.classList.contains('save-idea-btn') ? e.target : e.target.parentElement;
        const ideaCard = btn.closest('.idea-card');
        const title = ideaCard.querySelector('h3').textContent;
        
        // Save to memory (you could use localStorage if needed)
        console.log('Saved idea:', title);
        
        btn.innerHTML = '<i class="fas fa-check"></i> Saved';
        btn.style.background = 'var(--neon-green)';
        btn.style.borderColor = 'var(--neon-green)';
        btn.style.color = 'var(--dark-bg)';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-bookmark"></i> Save';
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 2000);
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSkills();
    loadProjects();
    createContactParticles();
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    const sections = ['home', 'about', 'skills', 'projects', 'makerspace', 'webdev', 'contact'];
    const currentIndex = sections.findIndex(section => 
        document.getElementById(section).classList.contains('active')
    );
    
    // Arrow keys to navigate
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        const navItem = document.querySelector(`[data-section="${sections[nextIndex]}"]`);
        if (navItem) navItem.click();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        const navItem = document.querySelector(`[data-section="${sections[prevIndex]}"]`);
        if (navItem) navItem.click();
    }
});