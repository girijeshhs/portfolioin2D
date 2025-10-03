import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          The Story Behind The Code
        </motion.h2>
        
        <div className="about-content">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="about-text"
          >
            <p className="about-intro">
              I'm a creative developer with a passion for building digital products that make a difference.
            </p>
            <p>
              With years of experience in full-stack development, I've mastered the art of turning ambitious 
              ideas into reality. My expertise spans across modern web technologies, cloud infrastructure, 
              and user experience design.
            </p>
            <p>
              I believe in writing clean, maintainable code that not only works but inspires. Every project 
              is an opportunity to push boundaries and create something extraordinary.
            </p>
            <a href="/resume.pdf" download className="btn btn-primary resume-btn glassmorphism">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download Resume
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="about-image"
          >
            <div className="image-placeholder">
              <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="var(--primary-color)" opacity="0.2"/>
                <circle cx="100" cy="100" r="70" fill="var(--primary-color)" opacity="0.3"/>
                <circle cx="100" cy="100" r="50" fill="var(--primary-color)" opacity="0.5"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
