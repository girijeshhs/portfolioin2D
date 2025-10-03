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

// Three.js Scene Setup for Hero Section
let scene, camera, renderer, geometries = [];
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
    
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 5;
    
    // Renderer setup with performance optimizations
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit to 2x for performance
    
    // Get current theme for colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Create optimized geometries (reuse geometry and material)
    const geometryTypes = [
        new THREE.IcosahedronGeometry(0.5, 0),
        new THREE.OctahedronGeometry(0.5, 0),
        new THREE.TetrahedronGeometry(0.5, 0),
        new THREE.TorusGeometry(0.4, 0.15, 8, 16)
    ];
    
    // Colors based on theme
    const colors = isDark 
        ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x60a5fa]
        : [0x6366f1, 0x8b5cf6, 0xec4899, 0x3b82f6];
    
    // Create lightweight meshes
    for (let i = 0; i < 4; i++) {
        const material = new THREE.MeshPhongMaterial({
            color: colors[i],
            wireframe: false,
            transparent: true,
            opacity: 0.6,
            flatShading: true
        });
        
        const mesh = new THREE.Mesh(geometryTypes[i], material);
        
        // Random positioning
        mesh.position.x = (Math.random() - 0.5) * 8;
        mesh.position.y = (Math.random() - 0.5) * 6;
        mesh.position.z = (Math.random() - 0.5) * 4;
        
        // Random rotation speeds
        mesh.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
        };
        
        // Random floating animation
        mesh.userData.floatSpeed = Math.random() * 0.02 + 0.01;
        mesh.userData.floatOffset = Math.random() * Math.PI * 2;
        
        scene.add(mesh);
        geometries.push(mesh);
    }
    
    // Lighting - minimal for performance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    isThreeJsInitialized = true;
    
    // Start animation loop
    animate();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
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
    
    // Animate each geometry
    geometries.forEach((mesh, index) => {
        // Rotation
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;
        
        // Floating motion
        const time = Date.now() * 0.001;
        mesh.position.y += Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * 0.002;
    });
    
    renderer.render(scene, camera);
}

// Update Three.js colors on theme change
function updateThreeJSTheme() {
    if (!isThreeJsInitialized) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colors = isDark 
        ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x60a5fa]
        : [0x6366f1, 0x8b5cf6, 0xec4899, 0x3b82f6];
    
    geometries.forEach((mesh, index) => {
        mesh.material.color.setHex(colors[index]);
    });
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
