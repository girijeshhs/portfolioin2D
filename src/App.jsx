import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import SimpleScene from './components/Scene/SimpleScene';

function App() {
  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Animated 3D Background using React Three Fiber */}
      <Suspense fallback={null}>
        <SimpleScene />
      </Suspense>

      {/* Content Layer - ALWAYS on top with z-index: 1 */}
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <footer className="footer">
          <div className="container">
            <p>© 2025 Your Name. Built with Spline & Framer Motion.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
