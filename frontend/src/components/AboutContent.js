import React from 'react';
import { motion } from 'framer-motion';
import './AboutContent.css';

const AboutContent = () => {
  const skills = [
    { 
      name: 'React.js', 
      level: 95, 
      icon: '⚛️',
      category: 'Frontend'
    },
    { 
      name: 'Node.js', 
      level: 90, 
      icon: '🟢',
      category: 'Backend'
    },
    { 
      name: 'JavaScript', 
      level: 98, 
      icon: '🟨',
      category: 'Language'
    },
    { 
      name: 'TypeScript', 
      level: 85, 
      icon: '🔷',
      category: 'Language'
    },
    { 
      name: 'Python', 
      level: 88, 
      icon: '🐍',
      category: 'Language'
    },
    { 
      name: 'MongoDB', 
      level: 87, 
      icon: '🍃',
      category: 'Database'
    },
    { 
      name: 'PostgreSQL', 
      level: 82, 
      icon: '🐘',
      category: 'Database'
    },
    { 
      name: 'Express.js', 
      level: 92, 
      icon: '🚀',
      category: 'Backend'
    },
    { 
      name: 'Next.js', 
      level: 89, 
      icon: '▲',
      category: 'Framework'
    },
    { 
      name: 'Docker', 
      level: 78, 
      icon: '🐳',
      category: 'DevOps'
    },
    { 
      name: 'AWS', 
      level: 75, 
      icon: '☁️',
      category: 'Cloud'
    },
    { 
      name: 'Git', 
      level: 94, 
      icon: '📝',
      category: 'Tools'
    }
  ];

  const techStack = {
    frontend: [
      { name: 'React', icon: '⚛️', color: '#61DAFB' },
      { name: 'Vue.js', icon: '💚', color: '#4FC08D' },
      { name: 'Angular', icon: '🅰️', color: '#DD0031' },
      { name: 'Next.js', icon: '▲', color: '#000000' },
      { name: 'Tailwind CSS', icon: '🎨', color: '#06B6D4' },
      { name: 'SASS', icon: '💅', color: '#CC6699' }
    ],
    backend: [
      { name: 'Node.js', icon: '🟢', color: '#339933' },
      { name: 'Express.js', icon: '🚀', color: '#000000' },
      { name: 'Django', icon: '🎯', color: '#092E20' },
      { name: 'FastAPI', icon: '⚡', color: '#009688' },
      { name: 'GraphQL', icon: '🔗', color: '#E10098' },
      { name: 'REST APIs', icon: '🌐', color: '#FF6B35' }
    ],
    database: [
      { name: 'MongoDB', icon: '🍃', color: '#47A248' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
      { name: 'MySQL', icon: '🗄️', color: '#4479A1' },
      { name: 'Redis', icon: '🔴', color: '#DC382D' },
      { name: 'Firebase', icon: '🔥', color: '#FFCA28' },
      { name: 'Supabase', icon: '⚡', color: '#3ECF8E' }
    ],
    tools: [
      { name: 'Docker', icon: '🐳', color: '#2496ED' },
      { name: 'Kubernetes', icon: '☸️', color: '#326CE5' },
      { name: 'AWS', icon: '☁️', color: '#FF9900' },
      { name: 'Vercel', icon: '▲', color: '#000000' },
      { name: 'Git', icon: '📝', color: '#F05032' },
      { name: 'VS Code', icon: '💻', color: '#007ACC' }
    ]
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="about-content">
      <motion.div 
        className="about-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile-section">
          <div className="profile-image">
            <img src="https://res.cloudinary.com/dfnj5fh0i/image/upload/v1748859724/BATMAN_2_gyxbqy.jpg" alt="Subikshan Ramachandran" />
          </div>
          <div className="profile-info">
            <h1>Subikshan Ramachandran</h1>
            <h2>Full Stack Developer & Software Engineer</h2>
            <p>
              Passionate full-stack developer with expertise in modern web technologies. 
              I specialize in building scalable applications using React, Node.js, and cloud technologies. 
              With a strong foundation in both frontend and backend development, I create seamless 
              user experiences backed by robust server-side architecture.
            </p>
            <div className="specializations">
              <span className="spec-tag">Frontend Development</span>
              <span className="spec-tag">Backend Architecture</span>
              <span className="spec-tag">Cloud Solutions</span>
              <span className="spec-tag">Database Design</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="about-sections">
        <motion.section 
          className="skills-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3>Skills & Expertise</h3>
          <div className="skills-categories">
            {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
              <div key={category} className="skill-category">
                <h4 className="category-title">{category}</h4>
                <div className="skills-grid">
                  {categorySkills.map((skill, index) => (
                    <motion.div 
                      key={skill.name} 
                      className="skill-item"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.5 + categoryIndex * 0.1 + index * 0.05, 
                        duration: 0.4 
                      }}
                    >
                      <div className="skill-header">
                        <div className="skill-name-wrapper">
                          <span className="skill-icon">{skill.icon}</span>
                          <span className="skill-name">{skill.name}</span>
                        </div>
                        <span className="skill-percentage">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div 
                          className="skill-progress"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ 
                            delay: 0.7 + categoryIndex * 0.1 + index * 0.05, 
                            duration: 1,
                            ease: "easeOut"
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="tech-stack-section"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3>Technology Stack</h3>
          <div className="tech-categories">
            {Object.entries(techStack).map(([category, technologies], categoryIndex) => (
              <motion.div 
                key={category} 
                className="tech-category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + categoryIndex * 0.1, duration: 0.6 }}
              >
                <h4 className="tech-category-title">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className="tech-grid">
                  {technologies.map((tech, index) => (
                    <motion.div 
                      key={tech.name} 
                      className="tech-item"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        delay: 0.8 + categoryIndex * 0.1 + index * 0.05, 
                        duration: 0.4 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 8px 25px ${tech.color}20`
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span 
                        className="tech-icon"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </span>
                      <span className="tech-name">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.div 
        className="about-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="contact-cta">
          <h3>Let's Build Something Amazing Together!</h3>
          <p>
            I'm always excited to work on innovative projects and collaborate with talented teams. 
            Whether you need a full-stack solution or want to discuss the latest in web development.
          </p>
          <div className="cta-buttons">
            <motion.button 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('mailto:subikshan@example.com')}
            >
              Get in Touch
            </motion.button>
            <motion.button 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://drive.google.com/file/d/1MmWOhnmrdqjsO2xtsxkxUqnBzV34pKWz/view?usp=sharing')}
            >
              Download Resume
            </motion.button>
            <motion.button 
              className="btn-tertiary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://github.com/Subikshan0612')}
            >
              View GitHub
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutContent;
