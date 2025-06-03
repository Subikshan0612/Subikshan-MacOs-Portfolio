import React, { useState, useEffect, useRef } from 'react';
import './Spotlight.css';

const Spotlight = ({ onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const inputRef = useRef(null);

  // Sample data for search with PNG icons
  const searchData = [
    { 
      id: 'about', 
      name: 'About Me', 
      description: 'Personal information and background', 
      icon: '/assets/icons/Contacts.png',
      fallbackIcon: '👤',
      type: 'app', 
      appId: 'about' 
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      description: 'Get in touch', 
      icon: '/assets/icons/Mail.png',
      fallbackIcon: '📧',
      type: 'app', 
      appId: 'contact' 
    },
    { 
      id: 'finder', 
      name: 'Finder', 
      description: 'File manager', 
      icon: '/assets/icons/Files.png',
      fallbackIcon: '📁',
      type: 'app', 
      appId: 'finder' 
    },
    { 
      id: 'safari', 
      name: 'Safari', 
      description: 'Web browser', 
      icon: '/assets/icons/Safari.png',
      fallbackIcon: '🌐',
      type: 'app', 
      appId: 'safari' 
    },
    { 
      id: 'terminal', 
      name: 'Terminal', 
      description: 'Command line interface', 
      icon: '/assets/icons/Terminal.png',
      fallbackIcon: '⚫',
      type: 'app', 
      appId: 'terminal' 
    },
  ];

  // Filter results based on query
  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchData.slice(0, 6)); // Show top 6 items when no query
    } else {
      const filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 8)); // Show top 8 matches
    }
    setSelectedIndex(0);
  }, [query]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex, onClose]);

  const handleSelect = (item) => {
    if (onSelect) {
      onSelect(query, item);
    }
  };

  const handleResultClick = (item, index) => {
    setSelectedIndex(index);
    handleSelect(item);
  };

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const handleImageLoad = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: false }));
  };

  return (
    <div className="spotlight-overlay" onClick={onClose}>
      <div className="spotlight-container" onClick={e => e.stopPropagation()}>
        <div className="spotlight-search">
          <span className="search-icon">🔍</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
        {results.length > 0 && (
          <div className="spotlight-results">
            {results.map((result, index) => {
              const hasImageError = imageErrors[result.id];
              
              return (
                <div
                  key={result.id}
                  className={`spotlight-result ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleResultClick(result, index)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`result-icon ${hasImageError ? 'fallback-icon' : ''}`}>
                    {!hasImageError && (
                      <img 
                        src={result.icon} 
                        alt={result.name}
                        className="result-icon-image"
                        onError={() => handleImageError(result.id)}
                        onLoad={() => handleImageLoad(result.id)}
                      />
                    )}
                    {hasImageError && (
                      <span className="fallback-emoji">{result.fallbackIcon}</span>
                    )}
                  </div>
                  <div className="result-info">
                    <div className="result-name">{result.name}</div>
                    <div className="result-description">{result.description}</div>
                  </div>
                  <div className="result-type">
                    {result.type === 'app' ? 'Application' : 'Project'}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {query && results.length === 0 && (
          <div className="spotlight-no-results">
            <div className="no-results-icon">🔍</div>
            <div className="no-results-text">No results found</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
