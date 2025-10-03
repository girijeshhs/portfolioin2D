import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration, inventory management, and real-time updates.',
    tags: ['React', 'Node.js', 'MongoDB'],
    gradient: 'linear-gradient(135deg, #8B5CF6, #3B82F6)'
  },
  {
    title: 'Task Management App',
    description: 'Collaborative task management tool with drag-and-drop functionality and team workspaces.',
    tags: ['Vue.js', 'Firebase', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #3B82F6, #06B6D4)'
  },
  {
    title: 'Weather Dashboard',
    description: 'Real-time weather application with interactive maps, forecasts, and location-based alerts.',
    tags: ['JavaScript', 'API', 'CSS3'],
    gradient: 'linear-gradient(135deg, #06B6D4, #8B5CF6)'
  },
  {
    title: 'Portfolio CMS',
    description: 'Custom content management system for portfolio websites with drag-and-drop page builder.',
    tags: ['React', 'GraphQL', 'PostgreSQL'],
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899)'
  }
];

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="project-card"
    >
      <div className="project-image" style={{ background: project.gradient }}>
        <div className="project-placeholder">{project.title}</div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a href="#" className="project-link">Live Demo →</a>
          <a href="#" className="project-link">GitHub →</a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Featured Projects
        </motion.h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
