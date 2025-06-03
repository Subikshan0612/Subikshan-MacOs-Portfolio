import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './FinderContent.css';

const FinderContent = () => {
  const [currentPath, setCurrentPath] = useState('Portfolio');
  const [viewMode, setViewMode] = useState('grid');

  const folders = [
    { name: 'Projects', type: 'folder', icon: '📁', items: 12 },
    { name: 'Design Assets', type: 'folder', icon: '🎨', items: 45 },
    { name: 'Prototypes', type: 'folder', icon: '⚡', items: 8 },
    { name: 'Research', type: 'folder', icon: '📊', items: 23 },
    { name: 'Presentations', type: 'folder', icon: '📑', items: 15 },
    { name: 'Resources', type: 'folder', icon: '📚', items: 67 }
  ];

  const files = [
    { name: 'Resume_Inika_2025.pdf', type: 'pdf', icon: '📄', size: '2.3 MB' },
    { name: 'Portfolio_Overview.sketch', type: 'sketch', icon: '💎', size: '15.7 MB' },
    { name: 'Brand_Guidelines.figma', type: 'figma', icon: '🎨', size: '8.2 MB' },
    { name: 'User_Research_Notes.txt', type: 'text', icon: '📝', size: '156 KB' }
  ];

  const sidebarItems = [
    { name: 'Favorites', icon: '⭐', items: ['Desktop', 'Documents', 'Downloads'] },
    { name: 'iCloud', icon: '☁️', items: ['Portfolio', 'Projects'] },
    { name: 'Locations', icon: '📍', items: ['Applications', 'Desktop', 'Documents'] }
  ];

  return (
    <div className="finder-content">
      <div className="finder-toolbar">
        <div className="toolbar-left">
          <button className="nav-btn">←</button>
          <button className="nav-btn">→</button>
          <span className="current-path">{currentPath}</span>
        </div>
        <div className="toolbar-center">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search Portfolio" />
          </div>
        </div>
        <div className="toolbar-right">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            ⊞
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            ☰
          </button>
        </div>
      </div>

      <div className="finder-main">
        <motion.div 
          className="finder-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {sidebarItems.map((section, index) => (
            <div key={index} className="sidebar-section">
              <div className="section-header">
                <span className="section-icon">{section.icon}</span>
                <span className="section-name">{section.name}</span>
              </div>
              <div className="section-items">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="sidebar-item">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="finder-content-area"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className={`items-container ${viewMode}`}>
            {folders.map((folder, index) => (
              <motion.div
                key={index}
                className="finder-item folder"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              >
                <div className="item-icon">{folder.icon}</div>
                <div className="item-info">
                  <div className="item-name">{folder.name}</div>
                  <div className="item-meta">{folder.items} items</div>
                </div>
              </motion.div>
            ))}
            
            {files.map((file, index) => (
              <motion.div
                key={index}
                className="finder-item file"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              >
                <div className="item-icon">{file.icon}</div>
                <div className="item-info">
                  <div className="item-name">{file.name}</div>
                  <div className="item-meta">{file.size}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinderContent;

