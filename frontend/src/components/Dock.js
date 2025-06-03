import React, { useState, useEffect } from 'react';
import './Dock.css';

const Dock = ({ onAppOpen, openWindows = [] }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [imageStates, setImageStates] = useState({});

  const dockApps = [
    { id: 'finder', name: 'Files', icon: '/assets/icons/Files.png' },
    { id: 'safari', name: 'Safari', icon: '/assets/icons/Safari.png' },
    { id: 'terminal', name: 'Terminal', icon: '/assets/icons/Terminal.png' },
    { id: 'messages', name: 'Messages', icon: '/assets/icons/Message.png', isStatic: true },
    { id: 'maps', name: 'Maps', icon: '/assets/icons/Maps.png', isStatic: true },
    { id: 'photos', name: 'Photos', icon: '/assets/icons/Photos.png', isStatic: true },
    { id: 'fitness', name: 'Fitness', icon: '/assets/icons/Fitness.png', isStatic: true },
    { id: 'music', name: 'iTunes', icon: '/assets/icons/Itunes.png', isStatic: true },
    { id: 'notes', name: 'Notes', icon: '/assets/icons/Notes.png', isStatic: true },
    { id: 'projects', name: 'Projects', icon: '/assets/icons/VisualStudio.png' },
    { id: 'about', name: 'About Me', icon: '/assets/icons/Contacts.png' },
    { id: 'teams', name: 'Teams', icon: '/assets/icons/Teams.png', isStatic: true },
    { id: 'outlook', name: 'Outlook', icon: '/assets/icons/Outlook.png', isStatic: true },
    { id: 'settings', name: 'Settings', icon: '/assets/icons/Settings.png', isStatic: true },
  ];

  const getAppState = (appId) => {
    const window = openWindows.find(w => w.appId === appId);
    if (!window) return 'closed';
    return window.isMinimized ? 'minimized' : 'open';
  };

  const handleItemClick = (appId, isStatic) => {
    if (isStatic) {
      console.log(`Static app clicked: ${appId} - No action taken`);
      return;
    }
    
    console.log('Dock item clicked in Dock component:', appId);
    onAppOpen(appId);
  };

  const handleMouseEnter = (appId) => {
    setHoveredItem(appId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleImageLoad = (appId) => {
    console.log(`✅ Image loaded: ${appId}`);
    setImageStates(prev => ({ 
      ...prev, 
      [appId]: { loaded: true, error: false } 
    }));
  };

  const handleImageError = (appId) => {
    console.log(`❌ Image failed: ${appId}`);
    setImageStates(prev => ({ 
      ...prev, 
      [appId]: { loaded: false, error: true } 
    }));
  };

  const getEmojiForApp = (appId) => {
    const emojiMap = {
      'finder': '📁',
      'safari': '🌐',
      'messages': '💬',
      'contacts': '👤',
      'maps': '🗺️',
      'photos': '📷',
      'fitness': '💪',
      'music': '🎵',
      'notes': '📝',
      'projects': '💻',
      'about': '👨‍💻',
      'teams': '👥',
      'outlook': '📧',
      'settings': '⚙️'
    };
    return emojiMap[appId] || '📱';
  };

  return (
    <div className="dock-container">
      <div className="dock">
        {dockApps.map((app) => {
          const appState = getAppState(app.id);
          const imageState = imageStates[app.id] || { loaded: false, error: false };
          const showImage = imageState.loaded && !imageState.error;
          const showFallback = imageState.error;
          
          return (
            <div
              key={app.id}
              className={`dock-item ${appState} ${app.isStatic ? 'static' : ''}`}
              onClick={() => handleItemClick(app.id, app.isStatic)}
              onMouseEnter={() => handleMouseEnter(app.id)}
              onMouseLeave={handleMouseLeave}
              role="button"
              tabIndex={0}
              aria-label={`${app.isStatic ? 'Static app' : 'Open'} ${app.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemClick(app.id, app.isStatic);
                }
              }}
            >
              <div className={`dock-icon ${app.id} ${showFallback ? 'fallback-icon' : ''}`}>
                {/* Always render the image, but control visibility */}
                <img 
                  src={app.icon} 
                  alt={app.name}
                  className="dock-icon-image"
                  style={{ 
                    display: showImage ? 'block' : 'none'
                  }}
                  onLoad={() => handleImageLoad(app.id)}
                  onError={() => handleImageError(app.id)}
                />
                
                {/* Show fallback emoji only when image fails */}
                {showFallback && (
                  <div className="fallback-emoji">
                    {getEmojiForApp(app.id)}
                  </div>
                )}
                
                {/* Show loading state */}
                {!imageState.loaded && !imageState.error && (
                  <div className="loading-spinner">⏳</div>
                )}
              </div>
              
              {/* App state indicator - only show for non-static apps */}
              {!app.isStatic && appState !== 'closed' && (
                <div className={`dock-indicator ${appState}`}></div>
              )}
              
              {/* Tooltip */}
              {hoveredItem === app.id && (
                <div className="dock-tooltip">
                  {app.isStatic ? (
                    <span className="app-name">{app.name}</span>
                  ) : (
                    <>
                      <span className="app-name">{app.name}</span>
                      <span className="open-me-text">Open Me</span>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dock;
