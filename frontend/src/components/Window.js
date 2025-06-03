import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Window.css';

const Window = ({ 
  id, 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize, 
  isMaximized = false,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 },
  zIndex = 1000,
  onFocus
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [resizeDirection, setResizeDirection] = useState('');
  
  const windowRef = useRef(null);

  // Handle window focus
  const handleWindowClick = useCallback(() => {
    if (onFocus) {
      onFocus(id);
    }
  }, [id, onFocus]);

  // Handle titlebar mouse down for dragging
  const handleTitlebarMouseDown = useCallback((e) => {
    if (e.target.closest('.window-controls')) {
      return;
    }
    
    if (isMaximized) {
      return;
    }
    
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    
    handleWindowClick();
  }, [position, isMaximized, handleWindowClick]);

  // Handle resize mouse down
  const handleResizeMouseDown = useCallback((e, direction) => {
    if (isMaximized) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y
    });
    
    handleWindowClick();
  }, [size, position, isMaximized, handleWindowClick]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        const newX = e.clientX - dragStart.x;
        const newY = Math.max(28, e.clientY - dragStart.y); // Prevent dragging above menu bar
        
        setPosition({ x: newX, y: newY });
      }
      
      if (isResizing && !isMaximized) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = resizeStart.posX;
        let newY = resizeStart.posY;
        
        // Handle different resize directions
        if (resizeDirection.includes('right')) {
          newWidth = Math.max(400, resizeStart.width + deltaX);
        }
        if (resizeDirection.includes('left')) {
          newWidth = Math.max(400, resizeStart.width - deltaX);
          newX = resizeStart.posX + (resizeStart.width - newWidth);
        }
        if (resizeDirection.includes('bottom')) {
          newHeight = Math.max(300, resizeStart.height + deltaY);
        }
        if (resizeDirection.includes('top')) {
          newHeight = Math.max(300, resizeStart.height - deltaY);
          newY = Math.max(28, resizeStart.posY + (resizeStart.height - newHeight));
        }
        
        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection('');
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = isDragging ? 'move' : 'nw-resize';
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, resizeDirection, isMaximized]);

  // Handle double-click to maximize/restore
  const handleDoubleClick = useCallback(() => {
    if (onMaximize) {
      onMaximize(id);
    }
  }, [id, onMaximize]);

  const windowStyle = isMaximized 
    ? {
        position: 'fixed',
        top: 28,
        left: 0,
        width: '100vw',
        height: 'calc(100vh - 28px)',
        zIndex
      }
    : {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex
      };

  return (
    <div 
      ref={windowRef}
      className={`window ${isMaximized ? 'maximized' : ''}`}
      style={windowStyle}
      onClick={handleWindowClick}
    >
      <div 
        className="window-titlebar"
        onMouseDown={handleTitlebarMouseDown}
        onDoubleClick={handleDoubleClick}
      >
        <div className="window-controls">
          <button 
            className="control-btn close" 
            onClick={(e) => {
              e.stopPropagation();
              onClose && onClose(id);
            }}
            title="Close"
          >
            <span>×</span>
          </button>
          <button 
            className="control-btn minimize" 
            onClick={(e) => {
              e.stopPropagation();
              onMinimize && onMinimize(id);
            }}
            title="Minimize"
          >
            <span>−</span>
          </button>
          <button 
            className="control-btn maximize" 
            onClick={(e) => {
              e.stopPropagation();
              onMaximize && onMaximize(id);
            }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <span>{isMaximized ? "⧉" : "□"}</span>
          </button>
        </div>
        <div className="window-title">{title}</div>
      </div>
      
      <div className="window-content">
        {children}
      </div>
      
      {!isMaximized && (
        <>
          {/* Corner resize handles */}
          <div 
            className="resize-handle corner top-left"
            onMouseDown={(e) => handleResizeMouseDown(e, 'top-left')}
          />
          <div 
            className="resize-handle corner top-right"
            onMouseDown={(e) => handleResizeMouseDown(e, 'top-right')}
          />
          <div 
            className="resize-handle corner bottom-left"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-left')}
          />
          <div 
            className="resize-handle corner bottom-right"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom-right')}
          />
          
          {/* Edge resize handles */}
          <div 
            className="resize-handle edge top"
            onMouseDown={(e) => handleResizeMouseDown(e, 'top')}
          />
          <div 
            className="resize-handle edge bottom"
            onMouseDown={(e) => handleResizeMouseDown(e, 'bottom')}
          />
          <div 
            className="resize-handle edge left"
            onMouseDown={(e) => handleResizeMouseDown(e, 'left')}
          />
          <div 
            className="resize-handle edge right"
            onMouseDown={(e) => handleResizeMouseDown(e, 'right')}
          />
        </>
      )}
    </div>
  );
};

export default Window;
