# 🌟 Premium Portfolio Website

A stunning, high-performance portfolio website featuring advanced Three.js 3D graphics, premium typography, and sophisticated animations.

## ✨ Exceptional Features

### � Advanced 3D Graphics
- **6 Complex Geometric Shapes** - Icosahedron, Dodecahedron, Octahedron, Torus, Torus Knot, and Wireframe Sphere
- **1000 Particle System** - Dynamic ambient particles with individual animations
- **Orbital Motion** - Shapes rotate around the center with unique speeds
- **Pulsating Effects** - Dynamic scale and emissive intensity animations
- **Camera Wobble** - Subtle camera movement for cinematic feel
- **Parallax Interaction** - Mouse-responsive camera positioning
- **Theme-Aware Colors** - 3D scene colors change with dark/light mode
- **Advanced Lighting** - Multiple light sources with shadows
- **Fog Effects** - Depth perception with exponential fog

### 🎨 Premium Design
- **Google Fonts Integration**:
  - Space Grotesk - Modern, geometric sans-serif for body text
  - Playfair Display - Elegant serif for headlines
  - JetBrains Mono - Technical monospace for code/labels
- **Gradient Animations** - Animated color gradients on text
- **Glassmorphism** - Modern frosted glass effects
- **Advanced Shadows** - Multi-layered shadow system
- **Glow Effects** - Luminous hover states
- **Smooth Transitions** - Cubic bezier easing functions

### 🚀 Performance Features
- **High-DPI Support** - Retina display optimization
- **Shadow Mapping** - Real-time shadow rendering
- **Tone Mapping** - Cinematic color grading
- **Efficient Rendering** - Optimized animation loops
- **Smart Caching** - Reused geometries and materials

### 💎 UI Enhancements
- **3D Button Effects** - Shimmer animations on hover
- **Animated Skill Bars** - Gradient progress with shimmer
- **Interactive Project Cards** - Multi-layer hover effects
- **Enhanced Social Icons** - Expanding background animations
- **Floating Labels** - Modern form inputs
- **Pulsing Backgrounds** - Subtle radial gradients

## 📑 Sections

1. **Hero** - Spectacular 3D scene with premium typography
2. **About** - Elegant introduction with serif headlines
3. **Projects** - Sophisticated cards with gradient overlays
4. **Skills** - Animated progress bars with shimmer effects
5. **Contact** - Premium form design with glassmorphism

## 🎨 Customization

### 📝 Personal Information
Edit `index.html` to update:
- Your name and title in hero section
- Hero description and call-to-action text
- About section content
- Project details, images, and links
- Contact information
- Social media URLs

### 🎨 Color Schemes
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;      /* Indigo */
    --secondary-color: #8b5cf6;    /* Purple */
    --accent-color: #ec4899;       /* Pink */
    --tertiary-color: #14b8a6;     /* Teal */
}
```

### 🔤 Typography
Current font stack:
- **Headlines**: Playfair Display (serif)
- **Body**: Space Grotesk (sans-serif)
- **Code/Labels**: JetBrains Mono (monospace)

Change fonts by updating the Google Fonts link in `index.html`.

### 📄 Resume
Place your `resume.pdf` file in the root directory for the download button.

### 🎯 3D Scene Customization
In `script.js`, adjust:
- Number of shapes (currently 6)
- Particle count (currently 1000)
- Colors array for different shapes
- Rotation speeds and orbital motion
- Camera position and fog density

### 🖼️ Projects
Update project cards with:
- Real project images (replace placeholders)
- Detailed descriptions
- Technology tags
- Live demo and GitHub links

### 📊 Skills
Adjust skill percentages in the `style` attribute of `.skill-progress` elements in `index.html`.

## ⚡ Performance

- **Three.js Optimizations**:
  - Shadow mapping with PCF soft shadows
  - Tone mapping for better colors
  - Efficient particle system with BufferGeometry
  - Reused materials and geometries
  - Optimized animation loop with requestAnimationFrame

- **CSS Optimizations**:
  - Hardware-accelerated transforms
  - CSS `will-change` for smooth animations
  - Debounced scroll events
  - Intersection Observer for scroll animations

- **Loading Optimizations**:
  - Preconnect to Google Fonts
  - Font display: swap
  - Lazy loading support for images
  - Minimal JavaScript (~15KB)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Requires WebGL support for 3D features

## 🚀 Getting Started

1. **Clone** the repository
2. **Customize** content in `index.html`
3. **Add** your `resume.pdf` file
4. **Update** colors in `styles.css` (optional)
5. **Open** `index.html` in a modern browser
6. **Deploy** to your favorite hosting service

## 📦 Deployment

Deploy to any of these platforms:
- **GitHub Pages** - Free hosting for public repos
- **Netlify** - One-click deploy with form handling
- **Vercel** - Instant deployments
- **Cloudflare Pages** - Fast global CDN
- Any static hosting service

## 🔧 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Advanced animations and effects
- **JavaScript (ES6+)** - Modern vanilla JS
- **Three.js** - 3D graphics rendering
- **Google Fonts** - Premium typography

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints optimized for all devices
- Touch-friendly interactions
- Accessible navigation

## ♿ Accessibility

- ARIA labels on interactive elements
- Reduced motion support for animations
- Keyboard navigation friendly
- Semantic HTML structure

## 📄 License

Free to use for personal and commercial projects.

## 🙏 Credits

- **Three.js** - 3D graphics library
- **Google Fonts** - Typography
- Built with ❤️ using vanilla web technologies

---

## 🎯 Quick Start Commands

```bash
# Open in browser
open index.html

# Or use a local server
python -m http.server 8000
# Then visit http://localhost:8000

# Or with Node.js
npx serve
```

Enjoy your stunning portfolio! 🌟

## Performance

- Optimized animations with CSS `will-change`
- Debounced scroll events
- Intersection Observer for efficient scroll animations
- Lazy loading support for images
- Reduced motion support for accessibility
- Minimal JavaScript bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Getting Started

1. Clone or download this repository
2. Customize the content in `index.html`
3. Add your `resume.pdf` file
4. Update colors and styles in `styles.css` if desired
5. Open `index.html` in a browser or deploy to your hosting service

## Deployment

You can deploy this website to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

## License

Free to use for personal and commercial projects.

## Credits

Built with vanilla HTML, CSS, and JavaScript - no frameworks required!
