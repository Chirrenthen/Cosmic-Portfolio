// Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 50;

// Create Starfield
function createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;
        
        // Random colors (blue, purple, pink tints)
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
            colors[i] = 0; colors[i + 1] = 0.83; colors[i + 2] = 1; // Blue
        } else if (colorChoice < 0.66) {
            colors[i] = 0.72; colors[i + 1] = 0.27; colors[i + 2] = 1; // Purple
        } else {
            colors[i] = 1; colors[i + 1] = 0; colors[i + 2] = 0.43; // Pink
        }
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    return stars;
}

const stars = createStars();

// Create Planets
function createPlanet(size, color, x, y, z) {
    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(x, y, z);
    
    // Add glow
    const glowGeometry = new THREE.SphereGeometry(size * 1.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    planet.add(glow);
    
    scene.add(planet);
    return planet;
}

const planet1 = createPlanet(3, 0x00d4ff, 30, 20, -30);
const planet2 = createPlanet(2, 0xb744ff, -40, -15, -40);
const planet3 = createPlanet(2.5, 0xff006e, 35, -25, -35);

// Create Nebula Clouds
function createNebula() {
    const nebulaGroup = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry(15, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x00d4ff : 0xb744ff,
            transparent: true,
            opacity: 0.05,
            side: THREE.DoubleSide
        });
        const cloud = new THREE.Mesh(geometry, material);
        cloud.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 50 - 50
        );
        nebulaGroup.add(cloud);
    }
    
    scene.add(nebulaGroup);
    return nebulaGroup;
}

const nebula = createNebula();

// Particle System for cosmic dust
function createCosmicDust() {
    const geometry = new THREE.BufferGeometry();
    const count = 500;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 50;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.3,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    const dust = new THREE.Points(geometry, material);
    scene.add(dust);
    return dust;
}

const cosmicDust = createCosmicDust();

// Mouse parallax effect
let mouseXParallax = 0;
let mouseYParallax = 0;

document.addEventListener('mousemove', (e) => {
    mouseXParallax = (e.clientX / window.innerWidth) * 2 - 1;
    mouseYParallax = -(e.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate stars slowly
    stars.rotation.y += 0.0002;
    stars.rotation.x += 0.0001;
    
    // Rotate planets
    planet1.rotation.y += 0.005;
    planet2.rotation.y += 0.003;
    planet3.rotation.y += 0.004;
    
    // Orbit planets
    const time = Date.now() * 0.0001;
    planet1.position.x = Math.cos(time * 0.5) * 30;
    planet1.position.z = Math.sin(time * 0.5) * 30 - 30;
    
    planet2.position.x = Math.cos(time * 0.3 + Math.PI) * 40;
    planet2.position.z = Math.sin(time * 0.3 + Math.PI) * 40 - 40;
    
    planet3.position.x = Math.cos(time * 0.4 + Math.PI / 2) * 35;
    planet3.position.z = Math.sin(time * 0.4 + Math.PI / 2) * 35 - 35;
    
    // Rotate nebula
    nebula.rotation.z += 0.0001;
    
    // Rotate cosmic dust
    cosmicDust.rotation.y += 0.0005;
    
    // Parallax effect
    camera.position.x += (mouseXParallax * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseYParallax * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create shooting star effect
function createShootingStarThree() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100 * 3; i += 3) {
        positions[i] = Math.random() * 200 - 100;
        positions[i + 1] = Math.random() * 100 + 50;
        positions[i + 2] = Math.random() * -100 - 50;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        size: 1.5,
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending
    });
    
    const shootingStar = new THREE.Points(geometry, material);
    scene.add(shootingStar);
    
    // Animate shooting star
    let progress = 0;
    const shootingInterval = setInterval(() => {
        progress += 0.02;
        shootingStar.position.x += 2;
        shootingStar.position.y -= 1;
        material.opacity = 1 - progress;
        
        if (progress >= 1) {
            clearInterval(shootingInterval);
            scene.remove(shootingStar);
        }
    }, 16);
}

// Randomly create shooting stars
setInterval(() => {
    if (Math.random() < 0.3) {
        createShootingStarThree();
    }
}, 3000);