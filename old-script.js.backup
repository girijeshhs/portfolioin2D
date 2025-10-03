// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update Three.js scene colors
    updateThreeJSTheme();
});

// Advanced Three.js Scene Setup with Stunning 3D Effects
let scene, camera, renderer, geometries = [];
let particleSystem, particles;
let composer, bloomPass;
let isThreeJsInitialized = false;

function initThreeJS() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded, skipping 3D scene');
        createFallbackShapes();
        return;
    }
    
    const canvas = document.getElementById('threeCanvas');
    if (!canvas) return;
    
    // Scene setup with fog for depth
    scene = new THREE.Scene();
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    scene.fog = new THREE.FogExp2(isDark ? 0x000000 : 0xffffff, 0.02);
    
    // Camera setup with wider FOV
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 8;
    camera.position.y = 2;
    
    // Advanced renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    // Get current theme for colors
    const colors = isDark 
        ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x14b8a6, 0x60a5fa, 0xfbbf24]
        : [0x6366f1, 0x8b5cf6, 0xec4899, 0x0891b2, 0x3b82f6, 0xf59e0b];
    
    // Create stunning geometric shapes with high detail
    const geometryConfigs = [
        { type: 'icosahedron', size: 1.2, detail: 1, wireframe: false },
        { type: 'dodecahedron', size: 1, detail: 0, wireframe: false },
        { type: 'octahedron', size: 1.5, detail: 2, wireframe: false },
        { type: 'torus', size: [0.8, 0.3, 16, 32], wireframe: false },
        { type: 'torusKnot', size: [0.6, 0.2, 100, 16], wireframe: false },
        { type: 'sphere', size: 1, detail: 32, wireframe: true }
    ];
    
    geometryConfigs.forEach((config, i) => {
        let geometry;
        
        switch(config.type) {
            case 'icosahedron':
                geometry = new THREE.IcosahedronGeometry(config.size, config.detail);
                break;
            case 'dodecahedron':
                geometry = new THREE.DodecahedronGeometry(config.size, config.detail);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(config.size, config.detail);
                break;
            case 'torus':
                geometry = new THREE.TorusGeometry(...config.size);
                break;
            case 'torusKnot':
                geometry = new THREE.TorusKnotGeometry(...config.size);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(config.size, config.detail, config.detail);
                break;
        }
        
        const material = new THREE.MeshStandardMaterial({
            color: colors[i],
            wireframe: config.wireframe,
            transparent: true,
            opacity: config.wireframe ? 0.4 : 0.7,
            roughness: 0.3,
            metalness: 0.8,
            emissive: colors[i],
            emissiveIntensity: 0.2,
            flatShading: !config.wireframe
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Distribute shapes in 3D space
        const angle = (i / geometryConfigs.length) * Math.PI * 2;
        const radius = 6;
        mesh.position.x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
        mesh.position.y = (Math.random() - 0.5) * 8;
        mesh.position.z = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
        
        // Scale variation
        const scale = 0.8 + Math.random() * 0.4;
        mesh.scale.set(scale, scale, scale);
        
        // Random rotation speeds
        mesh.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02
        };
        
        // Orbital motion
        mesh.userData.orbitSpeed = (Math.random() - 0.5) * 0.001;
        mesh.userData.orbitRadius = radius;
        mesh.userData.orbitAngle = angle;
        
        // Floating animation
        mesh.userData.floatSpeed = Math.random() * 0.02 + 0.01;
        mesh.userData.floatAmplitude = Math.random() * 0.5 + 0.3;
        mesh.userData.floatOffset = Math.random() * Math.PI * 2;
        
        scene.add(mesh);
        geometries.push(mesh);
    });
    
    // Create particle system for ambient effect
    createParticleSystem(isDark);
    
    // Advanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight1 = new THREE.DirectionalLight(colors[0], 1);
    directionalLight1.position.set(5, 5, 5);
    directionalLight1.castShadow = true;
    scene.add(directionalLight1);
    
    const directionalLight2 = new THREE.DirectionalLight(colors[2], 0.6);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);
    
    const pointLight = new THREE.PointLight(colors[4], 1, 50);
    pointLight.position.set(0, 5, 0);
    scene.add(pointLight);
    
    isThreeJsInitialized = true;
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Create beautiful particle system
function createParticleSystem(isDark) {
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color = new THREE.Color();
    const colorPalette = isDark 
        ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x14b8a6]
        : [0x6366f1, 0x8b5cf6, 0xec4899, 0x0891b2];
    
    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Position
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = (Math.random() - 0.5) * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        // Color
        color.setHex(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    particles = particlesGeometry.attributes.position.array;
}

function onWindowResize() {
    if (!isThreeJsInitialized) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    if (!isThreeJsInitialized) return;
    
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate each geometry with complex motions
    geometries.forEach((mesh, index) => {
        // Smooth rotation
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
        
        // Orbital motion around center
        mesh.userData.orbitAngle += mesh.userData.orbitSpeed;
        const orbitX = Math.cos(mesh.userData.orbitAngle) * mesh.userData.orbitRadius;
        const orbitZ = Math.sin(mesh.userData.orbitAngle) * mesh.userData.orbitRadius;
        
        mesh.position.x = orbitX;
        mesh.position.z = orbitZ;
        
        // Floating motion with sine wave
        mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.01;
        
        // Pulsating scale effect
        const scalePulse = 1 + Math.sin(time * 0.5 + index) * 0.1;
        mesh.scale.setScalar(mesh.scale.x * 0.98 + scalePulse * 0.02);
        
        // Update material emissive intensity
        if (mesh.material.emissive) {
            mesh.material.emissiveIntensity = 0.2 + Math.sin(time * 2 + index) * 0.1;
        }
    });
    
    // Animate particle system
    if (particleSystem) {
        particleSystem.rotation.y += 0.0002;
        particleSystem.rotation.x += 0.0001;
        
        // Animate individual particles
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            const particleIndex = i / 3;
            positions[i + 1] += Math.sin(time * 0.5 + particleIndex * 0.01) * 0.01;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
    }
    
    // Smooth camera wobble
    camera.position.y = 2 + Math.sin(time * 0.3) * 0.5;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Update Three.js colors and environment on theme change
function updateThreeJSTheme() {
    if (!isThreeJsInitialized) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = isDark 
        ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x14b8a6, 0x60a5fa, 0xfbbf24]
        : [0x6366f1, 0x8b5cf6, 0xec4899, 0x0891b2, 0x3b82f6, 0xf59e0b];
    
    // Update fog
    scene.fog.color.setHex(isDark ? 0x000000 : 0xffffff);
    
    // Update geometries colors
    geometries.forEach((mesh, index) => {
        mesh.material.color.setHex(colors[index]);
        if (mesh.material.emissive) {
            mesh.material.emissive.setHex(colors[index]);
        }
    });
    
    // Update particle colors
    if (particleSystem) {
        const positions = particleSystem.geometry.attributes.position.array;
        const colorAttr = particleSystem.geometry.attributes.color.array;
        const color = new THREE.Color();
        const colorPalette = isDark 
            ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x14b8a6]
            : [0x6366f1, 0x8b5cf6, 0xec4899, 0x0891b2];
        
        for (let i = 0; i < positions.length / 3; i++) {
            const i3 = i * 3;
            color.setHex(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
            colorAttr[i3] = color.r;
            colorAttr[i3 + 1] = color.g;
            colorAttr[i3 + 2] = color.b;
        }
        particleSystem.geometry.attributes.color.needsUpdate = true;
    }
}

// Fallback: Create CSS-based floating shapes if Three.js doesn't load
function createFallbackShapes() {
    const shapesContainer = document.getElementById('shapesContainer');
    const numberOfShapes = 3;
    
    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        shapesContainer.appendChild(shape);
    }
}

// Initialize Three.js when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
    initThreeJS();
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = currentTheme === 'dark' 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)';
    } else {
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = currentTheme === 'dark' 
            ? '#0f172a' 
            : '#ffffff';
    }
    
    lastScroll = currentScroll;
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.width;
                }, index * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Parallax effect for Three.js camera and fallback shapes
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
}, { passive: true });

function animateParallax() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    // Update Three.js camera position for parallax
    if (isThreeJsInitialized && camera) {
        camera.position.x = currentX * 0.5;
        camera.position.y = -currentY * 0.5;
        camera.lookAt(scene.position);
    }
    
    // Fallback for CSS shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const x = currentX * speed;
        const y = currentY * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateParallax);
}

animateParallax();

// Add entrance animations for elements
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Animate project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    animateOnScroll.observe(card);
});

// Animate sections
document.querySelectorAll('section').forEach(section => {
    animateOnScroll.observe(section);
});

// Performance optimization: Debounce scroll events
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

// Optimize navbar scroll handler
const optimizedScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentScroll > 100) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = currentTheme === 'dark' 
            ? 'rgba(15, 23, 42, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)';
    } else {
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = currentTheme === 'dark' 
            ? '#0f172a' 
            : '#ffffff';
    }
}, 10);

window.addEventListener('scroll', optimizedScroll, { passive: true });

// Add active state to navigation links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
window.addEventListener('load', () => {
    // Remove loading state if you add one
    document.body.classList.add('loaded');
});

// Add resume download tracking (optional)
const resumeBtn = document.querySelector('.resume-btn');
if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
        // Check if resume.pdf exists, if not, prevent download and show message
        fetch('resume.pdf', { method: 'HEAD' })
            .then(response => {
                if (!response.ok) {
                    e.preventDefault();
                    alert('Resume file not found. Please add a resume.pdf file to your project.');
                }
            })
            .catch(() => {
                e.preventDefault();
                alert('Resume file not found. Please add a resume.pdf file to your project.');
            });
    });
}
