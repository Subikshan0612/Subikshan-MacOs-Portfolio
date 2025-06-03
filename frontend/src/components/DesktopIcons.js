import React, { useState, useRef } from "react";
import "./DesktopIcons.css";

const DesktopIcons = ({ onAppOpen }) => {
  const [draggedIcon, setDraggedIcon] = useState(null);
  const [iconPositions, setIconPositions] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const desktopIcons = [
    {
      id: "about",
      name: "About Me",
      x: 50,
      y: 100,
      icon: "/assets/icons/Contacts.png",
      fallbackEmoji: "👤",
    },
    {
      id: "resume",
      name: "Resume",
      x: 50,
      y: 150,
      icon: "/assets/icons/Pdf.png",
      fallbackEmoji: "📄",
      url: "https://drive.google.com/file/d/1MmWOhnmrdqjsO2xtsxkxUqnBzV34pKWz/view?usp=drive_link",
    },
    {
      id: "healthcare-app",
      name: "Healthcare System",
      x: 50,
      y: 200,
      icon: "/assets/icons/Files.png",
      fallbackEmoji: "🏥",
    },
    {
      id: "matchmaking-pro",
      name: "Matchmaking Pro",
      x: 50,
      y: 300,
      icon: "/assets/icons/Files.png",
      fallbackEmoji: "💕",
    },
    {
      id: "portfolio",
      name: "Portfolio Site",
      x: 50,
      y: 400,
      icon: "/assets/icons/Files.png",
      fallbackEmoji: "🌐",
    },
    {
      id: "contact",
      name: "Contact",
      x: 50,
      y: 500,
      icon: "/assets/icons/Mail.png",
      fallbackEmoji: "📧",
    },
  ];

  const handleMouseDown = (e, iconId) => {
    if (e.button !== 0) return; // Only handle left mouse button

    const icon = e.currentTarget;
    const rect = icon.getBoundingClientRect();

    offsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setDraggedIcon(iconId);

    const handleMouseMove = (e) => {
      if (!draggedIcon && iconId) {
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y;

        setIconPositions((prev) => ({
          ...prev,
          [iconId]: { x: newX, y: newY },
        }));
      }
    };

    const handleMouseUp = () => {
      setDraggedIcon(null);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

//   const handleDoubleClick = (iconId) => {
//     // For project icons, open the Projects window
//     if (["healthcare-app", "matchmaking-pro", "portfolio"].includes(iconId)) {
//       onAppOpen("projects");
//     } else {
//       onAppOpen(iconId);
//     }
//   };

const handleDoubleClick = (iconId) => {
  // Handle resume icon - open Google Drive link
  if (iconId === 'resume') {
    const resumeIcon = desktopIcons.find(icon => icon.id === 'resume');
    if (resumeIcon && resumeIcon.url) {
      window.open(resumeIcon.url, '_blank', 'noopener,noreferrer');
    }
    return;
  }
  
  // For project icons, open the Projects window
  if (['healthcare-app', 'matchmaking-pro', 'portfolio'].includes(iconId)) {
    onAppOpen('projects');
  } else {
    onAppOpen(iconId);
  }
};


  const getIconPosition = (icon) => {
    const customPosition = iconPositions[icon.id];
    return customPosition || { x: icon.x, y: icon.y };
  };

  const handleImageError = (iconId) => {
    setImageErrors((prev) => ({ ...prev, [iconId]: true }));
  };

  const handleImageLoad = (iconId) => {
    setImageErrors((prev) => ({ ...prev, [iconId]: false }));
  };

  return (
    <div className="desktop-icons">
      {desktopIcons.map((icon) => {
        const position = getIconPosition(icon);
        const hasImageError = imageErrors[icon.id];

        return (
          <div
            key={icon.id}
            className={`desktop-icon ${
              draggedIcon === icon.id ? "dragging" : ""
            }`}
            style={{
              left: position.x,
              top: position.y,
              position: "absolute",
            }}
            onMouseDown={(e) => handleMouseDown(e, icon.id)}
            onDoubleClick={() => handleDoubleClick(icon.id)}
          >
            <div
              className={`app-icon ${icon.id} ${
                hasImageError ? "fallback-icon" : ""
              }`}
            >
              {!hasImageError && (
                <img
                  src={icon.icon}
                  alt={icon.name}
                  className="desktop-icon-image"
                  onError={() => handleImageError(icon.id)}
                  onLoad={() => handleImageLoad(icon.id)}
                />
              )}
              {hasImageError && (
                <span className="fallback-emoji">{icon.fallbackEmoji}</span>
              )}
            </div>
            <span className="icon-label">{icon.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopIcons;
