import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './styles/global.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
