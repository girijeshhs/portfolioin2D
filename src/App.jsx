import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticleFieldSimple from './components/Scene/ParticleFieldSimple';

function App() {
  return (
    <div className="app" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* REMOVED 3D Canvas - causing black screen issues */}
      {/* Background gradient instead */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #000000 100%)',
        pointerEvents: 'none'
      }} />

      {/* Content Layer - SECOND, on top of 3D */}
      <div className="content" style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <footer className="footer">
          <div className="container">
            <p>© 2025 Your Name. Built with React Three Fiber & Framer Motion.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
