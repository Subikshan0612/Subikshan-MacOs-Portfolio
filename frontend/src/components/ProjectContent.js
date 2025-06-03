import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectContent.css';

const ProjectContent = ({ projectId }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFullscreen, setShowFullscreen] = useState(false);

  // Project data matching the structure from Project.js
  const projectsData = {
    'project-1': {
      id: 'healthcare-app',
      title: 'Healthcare Management System',
      category: 'web',
      description: 'A comprehensive healthcare management platform with patient records, appointment scheduling, and telemedicine features.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express'],
      status: 'completed',
      liveUrl: 'https://healthcare-demo.com',
      githubUrl: 'https://github.com/subikshan/healthcare-app',
      features: [
        'Patient Management System',
        'Appointment Scheduling',
        'Telemedicine Integration',
        'Medical Records Management',
        'Real-time Notifications',
        'Prescription Management'
      ],
      screenshots: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ],
      color: '#007AFF',
      icon: '🏥',
      subtitle: 'Full-Stack Web Application',
      detailedDescription: 'This comprehensive healthcare management system revolutionizes patient care through digital innovation. Built with modern web technologies, it provides seamless integration between healthcare providers and patients.',
      challenges: [
        'Real-time data synchronization across multiple devices',
        'HIPAA compliance and data security implementation',
        'Scalable architecture for growing user base',
        'Integration with existing healthcare systems'
      ],
      solutions: [
        'Implemented WebSocket connections for real-time updates',
        'Used encryption and secure authentication protocols',
        'Designed microservices architecture with load balancing',
        'Created RESTful APIs for third-party integrations'
      ]
    },
    'project-2': {
      id: 'matchmaking-pro',
      title: 'Matchmaking Pro Platform',
      category: 'mobile',
      description: 'An advanced matchmaking platform with AI-powered compatibility matching and real-time chat features.',
      image: '/api/placeholder/400/250',
      technologies: ['React Native', 'Firebase', 'Python', 'TensorFlow', 'WebRTC'],
      status: 'in-progress',
      liveUrl: 'https://matchmaking-demo.com',
      githubUrl: 'https://github.com/subikshan/matchmaking-pro',
      features: [
        'AI-Powered Matching Algorithm',
        'Real-time Chat System',
        'Video Call Integration',
        'Profile Verification',
        'Advanced Filtering',
        'Compatibility Scoring'
      ],
      screenshots: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ],
      color: '#FF6B6B',
      icon: '💕',
      subtitle: 'AI-Powered Mobile Application',
      detailedDescription: 'A sophisticated matchmaking platform that leverages artificial intelligence to create meaningful connections. The app uses machine learning algorithms to analyze user preferences and behavior patterns.',
      challenges: [
        'Developing accurate AI matching algorithms',
        'Ensuring user privacy and data protection',
        'Creating engaging user experience',
        'Implementing real-time communication features'
      ],
      solutions: [
        'Built custom ML models using TensorFlow',
        'Implemented end-to-end encryption for all communications',
        'Designed intuitive UI/UX with user feedback integration',
        'Used WebRTC for seamless video calling experience'
      ]
    },
    'project-3': {
      id: 'portfolio',
      title: 'Interactive Portfolio Website',
      category: 'web',
      description: 'A modern, interactive portfolio website built with React and featuring macOS-inspired design elements.',
      image: '/api/placeholder/400/250',
      technologies: ['React', 'Framer Motion', 'CSS3', 'JavaScript', 'Vercel'],
      status: 'completed',
      liveUrl: 'https://subikshan-portfolio.com',
      githubUrl: 'https://github.com/subikshan/portfolio',
      features: [
        'macOS-Inspired Interface',
        'Interactive Animations',
        'Responsive Design',
        'Dark Mode Support',
        'Project Showcase',
        'Contact Integration'
      ],
      screenshots: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ],
      color: '#4ECDC4',
      icon: '💻',
      subtitle: 'Interactive Web Portfolio',
      detailedDescription: 'An innovative portfolio website that mimics the macOS desktop experience. This project showcases advanced frontend development skills and creative design thinking.',
      challenges: [
        'Creating realistic macOS desktop simulation',
        'Implementing smooth animations and transitions',
        'Ensuring cross-browser compatibility',
        'Optimizing performance for mobile devices'
      ],
      solutions: [
        'Used Framer Motion for complex animations',
        'Implemented CSS Grid and Flexbox for layouts',
        'Added progressive web app features',
        'Optimized images and implemented lazy loading'
      ]
    }
  };

  const project = useMemo(() => {
    return projectsData[projectId] || projectsData['project-1'];
  }, [projectId]);

  const images = project.screenshots || [
    '/api/placeholder/600/400',
    '/api/placeholder/600/400',
    '/api/placeholder/600/400'
  ];

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

  const handleFullscreenOpen = () => {
    setShowFullscreen(true);
  };

  const handleFullscreenClose = () => {
    setShowFullscreen(false);
  };

  const handleLiveProjectClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleGithubClick = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="project-content">
      {/* Project Header */}
      <div className="project-header">
        <motion.div 
          className="project-hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="project-icon" style={{ backgroundColor: project.color }}>
            <span className="project-emoji">{project.icon}</span>
          </div>
          <div className="project-info">
            <div className="project-meta">
              <span className={`project-status ${project.status}`}>
                {project.status === 'completed' ? '✅ Completed' : '🚧 In Progress'}
              </span>
              <span className="project-category">{project.category}</span>
            </div>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-subtitle">{project.subtitle}</p>
            <p className="project-description">{project.description}</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="project-tech"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3>Technologies Used</h3>
          <div className="tech-grid">
            {project.technologies?.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Project Gallery */}
      <motion.div 
        className="project-gallery"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="gallery-main">
          <img 
            src={images[selectedImage]} 
            alt={`${project.title} preview ${selectedImage + 1}`}
            onClick={handleFullscreenOpen}
          />
          <div className="image-overlay">
            <button 
              className="fullscreen-btn"
              onClick={handleFullscreenOpen}
              aria-label="View fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>
        
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => handleImageClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project Details */}
      <div className="project-details">
        <div className="details-grid">
          <div className="details-section">
            <h3>Project Overview</h3>
            <p>{project.detailedDescription}</p>
          </div>
          
          <div className="details-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              {project.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          {project.challenges && (
            <div className="details-section">
              <h3>Challenges</h3>
              <ul className="challenges-list">
                {project.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          )}

          {project.solutions && (
            <div className="details-section">
              <h3>Solutions</h3>
              <ul className="solutions-list">
                {project.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="project-actions">
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLiveProjectClick}
            disabled={!project.liveUrl}
          >
            🚀 View Live Project
          </motion.button>
          <motion.button 
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGithubClick}
            disabled={!project.githubUrl}
          >
            📂 View Source Code
          </motion.button>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreen && (
          <motion.div
            className="fullscreen-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFullscreenClose}
          >
            <motion.img
              src={images[selectedImage]}
              alt="Fullscreen view"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              className="close-fullscreen"
              onClick={handleFullscreenClose}
              aria-label="Close fullscreen"
            >
              ×
            </button>
            <div className="fullscreen-nav">
              <button 
                className="nav-btn prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => prev > 0 ? prev - 1 : images.length - 1);
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <span className="image-counter">
                {selectedImage + 1} / {images.length}
              </span>
              <button 
                className="nav-btn next"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(prev => prev < images.length - 1 ? prev + 1 : 0);
                }}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectContent;
