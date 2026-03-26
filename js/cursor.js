// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorTrail = document.querySelector('.cursor-trail');

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth trail follow
function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Cursor effects on hover
document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('nav-item')) {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--neon-purple)';
        cursor.style.boxShadow = '0 0 30px var(--neon-purple), inset 0 0 15px var(--neon-purple)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.classList.contains('nav-item')) {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--neon-blue)';
        cursor.style.boxShadow = '0 0 20px var(--neon-blue), inset 0 0 10px var(--neon-blue)';
    }
});

// Click effect
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid var(--neon-blue);
        border-radius: 50%;
        left: ${mouseX}px;
        top: ${mouseY}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9998;
        animation: rippleExpand 0.6s ease-out forwards;
    `;
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleExpand {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Shooting stars on click
document.addEventListener('click', (e) => {
    if (e.target.closest('.section')) {
        createShootingStar(e.clientX, e.clientY);
    }
});

function createShootingStar(x, y) {
    const star = document.createElement('div');
    star.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        z-index: 9997;
        box-shadow: 0 0 10px white, 0 0 20px var(--neon-blue);
    `;
    document.body.appendChild(star);
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 200 + Math.random() * 200;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    star.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${endX - x}px, ${endY - y}px)`, opacity: 0 }
    ], {
        duration: 800 + Math.random() * 400,
        easing: 'ease-out'
    }).onfinish = () => star.remove();
}