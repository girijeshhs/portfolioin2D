import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <footer className="footer">
        <div className="container">
          <p>© 2024 Your Name. Built with React Three Fiber & Framer Motion.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
