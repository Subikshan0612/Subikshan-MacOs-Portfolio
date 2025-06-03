import React, { useState, useEffect, useCallback, useRef } from "react";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import DesktopIcons from "./DesktopIcons";
import Window from "./Window";
import ContextMenu from "./ContextMenu";
import Spotlight from "./Spotlight";
import ProjectContent from "./ProjectContent";
import AboutContent from "./AboutContent";
import ContactContent from "./ContactContent";
import FinderContent from "./FinderContent";
import Project from "./Project"; // Import the Project component
import VariableProximity from "./VariableProximity";
import "./Desktop.css";

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [contextMenu, setContextMenu] = useState(null);
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [nextZIndex, setNextZIndex] = useState(1000);
  const desktopRef = useRef(null);

  // Window management functions
  const openWindow = useCallback(
    (appId, title, content, options = {}) => {
      const existingWindow = windows.find((w) => w.appId === appId);

      if (existingWindow) {
        // Bring existing window to front
        bringToFront(existingWindow.id);
        return;
      }

      const newWindow = {
        id: Date.now(),
        appId,
        title,
        content,
        isMaximized: false,
        isMinimized: false,
        zIndex: nextZIndex,
        initialPosition: {
          x: 100 + windows.length * 30,
          y: 100 + windows.length * 30,
        },
        initialSize: { width: 800, height: 600 },
        ...options,
      };

      setWindows((prev) => [...prev, newWindow]);
      setNextZIndex((prev) => prev + 1);
    },
    [windows, nextZIndex]
  );

  const closeWindow = useCallback((windowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
  }, []);

  const minimizeWindow = useCallback((windowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((windowId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
      )
    );
  }, []);

  const bringToFront = useCallback(
    (windowId) => {
      setWindows((prev) =>
        prev.map((w) =>
          w.id === windowId
            ? { ...w, zIndex: nextZIndex, isMinimized: false }
            : w
        )
      );
      setNextZIndex((prev) => prev + 1);
    },
    [nextZIndex]
  );

  // App handlers
  const handleAppOpen = useCallback(
    (appId) => {
      console.log('Opening app:', appId); // Debug log
      
      const appConfigs = {
        about: {
          title: "About - Subikshan Ramchandran 2025",
          content: <AboutContent />,
          initialSize: { width: 800, height: 600 },
        },
        projects: {
          title: "Projects - Subikshan's Portfolio 2025",
          content: <Project />,
          initialSize: { width: 1200, height: 800 },
        },
        // Map project-specific IDs to the projects window
        "healthcare-app": {
          title: "Projects - Subikshan's Portfolio 2025",
          content: <Project />,
          initialSize: { width: 1200, height: 800 },
        },
        "matchmaking-pro": {
          title: "Projects - Subikshan's Portfolio 2025",
          content: <Project />,
          initialSize: { width: 1200, height: 800 },
        },
        "portfolio": {
          title: "Projects - Subikshan's Portfolio 2025",
          content: <Project />,
          initialSize: { width: 1200, height: 800 },
        },
        "project-1": {
          title: "Healthcare App - Subikshan's Portfolio 2025",
          content: <ProjectContent projectId="healthcare-app" />,
          initialSize: { width: 900, height: 700 },
        },
        "project-2": {
          title: "Matchmaking Pro - Subikshan's Portfolio 2025",
          content: <ProjectContent projectId="matchmaking-pro" />,
          initialSize: { width: 900, height: 700 },
        },
        "project-3": {
          title: "My Portfolio - Subikshan's Portfolio 2025",
          content: <ProjectContent projectId="portfolio" />,
          initialSize: { width: 900, height: 700 },
        },
        contact: {
          title: "Contact - Subikshan's Portfolio 2025",
          content: <ContactContent />,
          initialSize: { width: 700, height: 600 },
        },
        finder: {
          title: "Finder - Subikshan's Portfolio 2025",
          content: <FinderContent />,
          initialSize: { width: 900, height: 600 },
        },
        safari: {
          title: "Safari - Subikshan's Portfolio 2025",
          content: (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <h2>Safari Browser</h2>
              <p>Web browsing functionality would go here</p>
            </div>
          ),
          initialSize: { width: 1000, height: 700 },
        },
        terminal: {
          title: "Terminal - Subikshan's Portfolio 2025",
          content: (
            <div
              style={{
                padding: "20px",
                background: "#1e1e1e",
                color: "#00ff00",
                fontFamily: "Monaco, monospace",
                height: "100%",
              }}
            >
              <div>Last login: {new Date().toLocaleString()}</div>
              <div>subikshan@macbook-pro ~ % </div>
            </div>
          ),
          initialSize: { width: 800, height: 500 },
        },
      };

      const config = appConfigs[appId];
      console.log('App config found:', config); // Debug log
      
      if (config) {
        // For project-specific apps, use 'projects' as the appId to prevent multiple windows
        const windowAppId = ['healthcare-app', 'matchmaking-pro', 'portfolio'].includes(appId) ? 'projects' : appId;
        console.log('Using window appId:', windowAppId); // Debug log
        
        openWindow(windowAppId, config.title, config.content, {
          initialSize: config.initialSize,
        });
      } else {
        console.warn(`No configuration found for app: ${appId}`);
      }
    },
    [openWindow]
  );

  // Context menu handler
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: "New Folder",
          icon: "📁",
          action: () => {
            console.log("New Folder");
            setContextMenu(null);
          },
        },
        {
          label: "Get Info",
          icon: "ℹ️",
          action: () => {
            console.log("Get Info");
            setContextMenu(null);
          },
        },
        { type: "separator" },
        {
          label: "Change Desktop Background",
          icon: "🖼️",
          action: () => {
            console.log("Change Background");
            setContextMenu(null);
          },
        },
        {
          label: "Show View Options",
          icon: "⚙️",
          action: () => {
            console.log("View Options");
            setContextMenu(null);
          },
        },
      ],
    });
  }, []);

  // Spotlight search handler
  const handleSpotlightSearch = useCallback(
    (query, item) => {
      if (item && item.appId) {
        handleAppOpen(item.appId);
        setShowSpotlight(false);
      }
    },
    [handleAppOpen]
  );

  // Portfolio title click handler
  const handlePortfolioClick = useCallback(
    (word) => {
      console.log(`Portfolio word clicked: ${word}`);

      // Optional: Add specific actions for different words
      switch (word.toLowerCase()) {
        case "welcome":
          handleAppOpen("about");
          break;
        case "portfolio":
          handleAppOpen("projects");
          break;
        case "my":
          handleAppOpen("contact");
          break;
        default:
          // Default action for the full phrase
          console.log("Portfolio title interaction");
      }
    },
    [handleAppOpen]
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + Space for Spotlight
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        setShowSpotlight(true);
      }

      // Escape to close modals
      if (e.key === "Escape") {
        setContextMenu(null);
        setShowSpotlight(false);
      }

      // Cmd/Ctrl + W to close active window
      if ((e.metaKey || e.ctrlKey) && e.key === "w") {
        e.preventDefault();
        const activeWindow = windows
          .filter((w) => !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex)[0];
        if (activeWindow) {
          closeWindow(activeWindow.id);
        }
      }

      // Cmd/Ctrl + M to minimize active window
      if ((e.metaKey || e.ctrlKey) && e.key === "m") {
        e.preventDefault();
        const activeWindow = windows
          .filter((w) => !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex)[0];
        if (activeWindow) {
          minimizeWindow(activeWindow.id);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [windows, closeWindow, minimizeWindow]);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu]);

  // Handle dock item clicks
  const handleDockItemClick = useCallback(
    (appId) => {
      console.log('Dock item clicked:', appId); // Debug log
      
      const existingWindow = windows.find((w) => w.appId === appId);

      if (existingWindow) {
        if (existingWindow.isMinimized) {
          bringToFront(existingWindow.id);
        } else {
          minimizeWindow(existingWindow.id);
        }
      } else {
        handleAppOpen(appId);
      }
    },
    [windows, bringToFront, minimizeWindow, handleAppOpen]
  );

  return (
    <div className="desktop" onContextMenu={handleContextMenu} ref={desktopRef}>
      <MenuBar
        onSpotlightOpen={() => setShowSpotlight(true)}
        activeWindows={windows.filter((w) => !w.isMinimized)}
      />

      <div className="desktop-content">
        {/* Central Portfolio Text with Variable Proximity */}
        <div className="portfolio-title">
          <VariableProximity
            label="welcome to my PORTFOLIO"
            fromFontVariationSettings="'wght' 300, 'opsz' 8"
            toFontVariationSettings="'wght' 900, 'opsz' 144"
            containerRef={desktopRef}
            radius={150}
            falloff="exponential"
            onClick={handlePortfolioClick}
          />
        </div>

        <DesktopIcons onAppOpen={handleAppOpen} />

        {windows.map(
          (window) =>
            !window.isMinimized && (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                isMaximized={window.isMaximized}
                zIndex={window.zIndex}
                initialPosition={window.initialPosition}
                initialSize={window.initialSize}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onMaximize={maximizeWindow}
                onFocus={bringToFront}
              >
                {window.content}
              </Window>
            )
        )}
      </div>

      <Dock onAppOpen={handleDockItemClick} openWindows={windows} />

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
        />
      )}

      {showSpotlight && (
        <Spotlight
          onClose={() => setShowSpotlight(false)}
          onSelect={handleSpotlightSearch}
        />
      )}
    </div>
  );
};

export default Desktop;
