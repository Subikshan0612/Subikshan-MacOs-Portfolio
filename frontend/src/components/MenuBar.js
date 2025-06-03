import React, { useState, useEffect } from "react";
import "./MenuBar.css";

const MenuBar = ({ onSpotlightOpen, activeWindows = [] }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = () => setActiveMenu(null);
    if (activeMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [activeMenu]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleMenuClick = (menuId, e) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === menuId ? null : menuId);
  };

  const menuItems = {
    apple: [
      { label: "About This Mac", action: () => console.log("About This Mac") },
      { type: "separator" },
      {
        label: "System Preferences...",
        action: () => console.log("System Preferences"),
      },
      { label: "App Store...", action: () => console.log("App Store") },
      { type: "separator" },
      { label: "Recent Items", action: () => console.log("Recent Items") },
      { type: "separator" },
      { label: "Force Quit...", action: () => console.log("Force Quit") },
      { type: "separator" },
      { label: "Sleep", action: () => console.log("Sleep") },
      { label: "Restart...", action: () => console.log("Restart") },
      { label: "Shut Down...", action: () => console.log("Shut Down") },
    ],
    portfolio: [
      {
        label: "About Portfolio",
        action: () => console.log("About Portfolio"),
      },
      { type: "separator" },
      { label: "Preferences...", action: () => console.log("Preferences") },
      { type: "separator" },
      { label: "Hide Portfolio", action: () => console.log("Hide Portfolio") },
      { label: "Hide Others", action: () => console.log("Hide Others") },
      { label: "Show All", action: () => console.log("Show All") },
      { type: "separator" },
      { label: "Quit Portfolio", action: () => console.log("Quit Portfolio") },
    ],
  };

  return (
    <div className="menubar">
      <div className="menubar-left">
        <div
          className={`menu-item ${activeMenu === "apple" ? "active" : ""}`}
          onClick={(e) => handleMenuClick("apple", e)}
        >
          <img
            src="/assets/icons/Apple.png"
            alt="Apple"
            className="apple-logo"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "inline";
            }}
          />
          <span className="apple-fallback" style={{ display: "none" }}>
            🍎
          </span>
        </div>

        <div
          className={`menu-item ${activeMenu === "portfolio" ? "active" : ""}`}
          onClick={(e) => handleMenuClick("portfolio", e)}
        >
          Subikshan's Portfolio
        </div>

        {activeWindows.length > 0 && <div className="menu-item">Window</div>}
      </div>

      <div className="menubar-right">
        <div className="menu-item" onClick={onSpotlightOpen}>
          🔍
        </div>
        <div className="menu-item">🔋</div>
        <div className="menu-item">📶</div>
        <div className="menu-item time">{formatTime(currentTime)}</div>
      </div>

      {/* Dropdown Menus */}
      {activeMenu && (
        <div className={`dropdown-menu ${activeMenu}`}>
          {menuItems[activeMenu]?.map((item, index) =>
            item.type === "separator" ? (
              <div key={index} className="menu-separator" />
            ) : (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => {
                  item.action();
                  setActiveMenu(null);
                }}
              >
                {item.label}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MenuBar;
