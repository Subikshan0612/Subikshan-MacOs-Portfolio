import { forwardRef, useMemo, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import "./VariableProximity.css";

function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let frameId;
    const loop = () => {
      callbackRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { 
          x: x - rect.left, 
          y: y - rect.top 
        };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev) => {
      if (ev.touches[0]) {
        const touch = ev.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);
  
  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label = "welcome to my PORTFOLIO",
    fromFontVariationSettings = "'wght' 300, 'opsz' 8",
    toFontVariationSettings = "'wght' 900, 'opsz' 144",
    containerRef,
    radius = 120,
    falloff = "exponential",
    className = "",
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useMousePositionRef(containerRef);
  const lastPositionRef = useRef({ x: null, y: null });
  const internalContainerRef = useRef(null);
  const effectiveContainerRef = containerRef || internalContainerRef;

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) => {
      const settings = new Map();
      const pairs = settingsStr.split(",").map(s => s.trim());
      
      for (const pair of pairs) {
        const match = pair.match(/'([^']+)'\s+([0-9.]+)/);
        if (match) {
          settings.set(match[1], parseFloat(match[2]));
        }
      }
      return settings;
    };

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);
    
    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = useCallback((x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }, []);

  const calculateFalloff = useCallback((distance) => {
    const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
    switch (falloff) {
      case "exponential": 
        return norm ** 3;
      case "gaussian": 
        return Math.exp(-((distance / (radius / 3)) ** 2) / 2);
      case "inverse":
        return distance === 0 ? 1 : Math.min(radius / distance, 1);
      case "linear":
      default: 
        return norm;
    }
  }, [falloff, radius]);

  useAnimationFrame(useCallback(() => {
    if (!effectiveContainerRef?.current) return;

    const containerRect = effectiveContainerRef.current.getBoundingClientRect();
    const { x, y } = mousePositionRef.current;

    // Performance optimization: skip if mouse hasn't moved
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }

    lastPositionRef.current = { x, y };

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;

      const rect = letterRef.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

      const distance = calculateDistance(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        letterCenterX,
        letterCenterY
      );

      if (distance >= radius) {
        if (interpolatedSettingsRef.current[index] !== fromFontVariationSettings) {
          letterRef.style.fontVariationSettings = fromFontVariationSettings;
          letterRef.style.transform = 'scale(1)';
          interpolatedSettingsRef.current[index] = fromFontVariationSettings;
        }
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const scaleValue = 1 + (falloffValue * 0.15); // Slightly more pronounced scale effect
      
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${Math.round(interpolatedValue * 100) / 100}`;
        })
        .join(", ");

      if (interpolatedSettingsRef.current[index] !== newSettings) {
        letterRef.style.fontVariationSettings = newSettings;
        letterRef.style.transform = `scale(${scaleValue})`;
        interpolatedSettingsRef.current[index] = newSettings;
      }
    });
  }, [effectiveContainerRef, mousePositionRef, calculateDistance, calculateFalloff, parsedSettings, fromFontVariationSettings, radius]));

  const words = useMemo(() => label.split(" "), [label]);
  let letterIndex = 0;

  const handleWordClick = useCallback((word) => {
    console.log(`Word clicked: ${word}`);
    if (onClick) onClick(word);
  }, [onClick]);

  return (
    <motion.div
      ref={(node) => {
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
        internalContainerRef.current = node;
      }}
      className={`variable-proximity-container ${className}`}
      onClick={() => handleWordClick(label)}
      style={{ 
        display: "inline-block", 
        cursor: "pointer",
        userSelect: "none",
        ...style 
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }}
      {...restProps}
    >
      <h1 className="variable-proximity-text">
        <div className="text-line welcome-line">
          {words.slice(0, 3).map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="word-wrapper welcome-words"
              style={{ display: "inline-block", whiteSpace: "nowrap" }}
            >
              {word.split("").map((letter) => {
                const currentLetterIndex = letterIndex++;
                return (
                  <motion.span
                    key={currentLetterIndex}
                    ref={(el) => { letterRefs.current[currentLetterIndex] = el; }}
                    className="letter welcome-letter"
                    style={{
                      display: "inline-block",
                      fontVariationSettings: fromFontVariationSettings,
                      transformOrigin: "center",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: currentLetterIndex * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
              {wordIndex < 2 && (
                <span className="word-space">&nbsp;</span>
              )}
            </span>
          ))}
        </div>
        <div className="text-line portfolio-line">
          <span
            className="word-wrapper portfolio-word"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {words[3]?.split("").map((letter) => {
              const currentLetterIndex = letterIndex++;
              return (
                <motion.span
                  key={currentLetterIndex}
                  ref={(el) => { letterRefs.current[currentLetterIndex] = el; }}
                  className="letter portfolio-letter"
                  style={{
                    display: "inline-block",
                    fontVariationSettings: fromFontVariationSettings,
                    transformOrigin: "center",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: currentLetterIndex * 0.05,
                    ease: "easeOut"
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </span>
        </div>
      </h1>
      <span className="sr-only">{label}</span>
    </motion.div>
  );
});

VariableProximity.displayName = "VariableProximity";

export default VariableProximity;
