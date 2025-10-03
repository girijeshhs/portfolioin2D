# 🎨 Quick Customization Guide

## 5-Minute Setup

### 1. Personal Information (index.html)

**Line 39-43**: Update hero section
```html
<h1 class="hero-title">Crafting Digital <br><span class="highlight">Experiences</span> That Matter</h1>
```
Change to your own headline.

**Line 44**: Update subtitle
```html
<p class="hero-subtitle">Full-Stack Developer • Creative Technologist • Design Enthusiast</p>
```
Add your titles/roles.

**Line 57-60**: Update about section
Replace placeholder text with your story.

**Line 274-288**: Update contact details
```html
<span>your.email@example.com</span>
<span>+1 (234) 567-8900</span>
<span>Your City, Country</span>
```

**Line 290-308**: Update social media links
Replace `#` with your actual profiles.

---

### 2. Projects (index.html)

**Lines 78-114**: Update each project card

For each project, update:
- `<h3>` - Project name
- `<p>` - Description
- `<span class="tag">` - Technologies
- `href="#"` - Add live demo and GitHub URLs

**Example:**
```html
<div class="project-card">
    <div class="project-image">
        <div class="project-placeholder">Your Project Name</div>
    </div>
    <div class="project-content">
        <h3>Your Project Title</h3>
        <p>Your amazing project description here.</p>
        <div class="project-tags">
            <span class="tag">React</span>
            <span class="tag">Node.js</span>
        </div>
        <div class="project-links">
            <a href="https://your-demo.com" class="project-link">Live Demo →</a>
            <a href="https://github.com/you/project" class="project-link">GitHub →</a>
        </div>
    </div>
</div>
```

---

### 3. Skills (index.html)

**Lines 159-238**: Adjust skill percentages

Change `style="width: X%"` to your actual skill level:
```html
<div class="skill-progress" style="width: 95%"></div>
```

Add/remove skills as needed.

---

### 4. Colors (styles.css)

**Lines 2-18**: Change color scheme
```css
:root {
    --primary-color: #6366f1;      /* Your primary brand color */
    --secondary-color: #8b5cf6;    /* Secondary accent */
    --accent-color: #ec4899;       /* Highlight color */
    --tertiary-color: #14b8a6;     /* Additional accent */
}
```

**Popular color combinations:**

**Blue & Purple** (Current):
```css
--primary-color: #6366f1;
--secondary-color: #8b5cf6;
--accent-color: #ec4899;
```

**Green & Teal**:
```css
--primary-color: #10b981;
--secondary-color: #14b8a6;
--accent-color: #06b6d4;
```

**Orange & Red**:
```css
--primary-color: #f97316;
--secondary-color: #ef4444;
--accent-color: #f59e0b;
```

**Purple & Pink**:
```css
--primary-color: #8b5cf6;
--secondary-color: #a855f7;
--accent-color: #ec4899;
```

---

### 5. Fonts (index.html)

**Lines 8-9**: Change Google Fonts

Current fonts:
- Playfair Display (headlines)
- Space Grotesk (body)
- JetBrains Mono (code/labels)

**Popular alternatives:**

**Modern Sans-Serif**:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
```
Then update CSS:
```css
body { font-family: 'Inter', sans-serif; }
h1, h2, h3 { font-family: 'Poppins', sans-serif; }
```

**Classic & Elegant**:
```html
<link href="https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600;700&family=Montserrat:wght@300;500;700&display=swap" rel="stylesheet">
```

---

### 6. 3D Scene Colors (script.js)

**Lines 50-51**: Update 3D shape colors

```javascript
const colors = isDark 
    ? [0x818cf8, 0xa78bfa, 0xf472b6, 0x14b8a6, 0x60a5fa, 0xfbbf24]
    : [0x6366f1, 0x8b5cf6, 0xec4899, 0x0891b2, 0x3b82f6, 0xf59e0b];
```

Use hex colors without the `#`:
- `0x6366f1` = #6366f1
- `0xff0000` = #ff0000 (red)
- `0x00ff00` = #00ff00 (green)

---

### 7. Resume File

Add your resume PDF:
1. Name it `resume.pdf`
2. Place in root folder (same location as index.html)
3. The download button will work automatically

---

### 8. Adjust 3D Complexity (script.js)

**Reduce shapes** (better performance):
Line 53: Change from 6 shapes to 4:
```javascript
const geometryConfigs = [
    { type: 'icosahedron', size: 1.2, detail: 1, wireframe: false },
    { type: 'torus', size: [0.8, 0.3, 16, 32], wireframe: false },
    { type: 'octahedron', size: 1.5, detail: 2, wireframe: false },
    { type: 'sphere', size: 1, detail: 32, wireframe: true }
];
```

**Reduce particles** (better performance):
Line 137: Change 1000 to 500:
```javascript
const particleCount = 500;
```

**Add more shapes** (if you want):
Just duplicate a geometry config block:
```javascript
{ type: 'dodecahedron', size: 1, detail: 0, wireframe: false },
```

---

## Testing Checklist

- [ ] Open in Chrome/Firefox/Safari/Edge
- [ ] Test dark/light mode toggle
- [ ] Check all links work
- [ ] Verify resume downloads
- [ ] Test on mobile device
- [ ] Check 3D animations are smooth
- [ ] Verify form fields work
- [ ] Test all hover effects

---

## Common Issues

### 3D scene not showing?
- Check browser console for errors
- Ensure Three.js CDN is loading
- Verify WebGL is supported

### Text looks different?
- Google Fonts may be blocked
- Check internet connection
- Fonts need time to load

### Performance issues?
- Reduce particle count (line 137)
- Remove some geometric shapes
- Lower detail level in geometries

---

## Deploy Checklist

Before deploying:
1. ✅ Updated all personal information
2. ✅ Added resume.pdf
3. ✅ Replaced placeholder project images
4. ✅ Updated project links
5. ✅ Adjusted colors (if desired)
6. ✅ Tested in multiple browsers
7. ✅ Checked mobile responsiveness
8. ✅ Updated social media links

---

## Quick Commands

**Test locally:**
```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

---

## Need Help?

Check these files:
- `README.md` - Full documentation
- `ENHANCEMENTS.md` - What's been added
- `index.html` - HTML structure
- `styles.css` - All styling
- `script.js` - 3D scene and interactions

---

**That's it! Your portfolio is ready to impress.** 🚀

Just customize, test, and deploy!
