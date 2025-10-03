# Portfolio Website

A modern, performant portfolio website with dark mode, floating 3D shapes, and smooth animations.

## Features

- 🌓 **Dark Mode Toggle** - Seamless theme switching with localStorage persistence
- 🎨 **Floating 3D Shapes** - Animated background shapes in the hero section with parallax effect
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Performance Optimized** - Fast loading with debounced events and lazy loading support
- 🎯 **Smooth Animations** - Intersection Observer API for scroll animations
- 📄 **Resume Download** - Easy resume download functionality
- 💼 **Project Showcase** - Beautiful project cards with hover effects
- 🎓 **Skills Section** - Animated skill bars
- 📧 **Contact Form** - Working contact form with validation

## Sections

1. **Hero** - Eye-catching introduction with floating 3D shapes
2. **About** - Personal introduction with resume download
3. **Projects** - Showcase of your best work
4. **Skills** - Visual representation of your technical skills
5. **Contact** - Form and contact information

## Customization

### Personal Information
Edit `index.html` to update:
- Your name in the hero section
- About me text
- Project details
- Contact information
- Social media links

### Colors
Modify CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
}
```

### Resume
Add your `resume.pdf` file to the root directory for the download button to work.

### Projects
Update the project cards in `index.html` with:
- Project images (replace the placeholder divs)
- Project descriptions
- Technologies used
- Live demo and GitHub links

### Skills
Adjust skill percentages in the `style` attribute of `.skill-progress` elements.

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
