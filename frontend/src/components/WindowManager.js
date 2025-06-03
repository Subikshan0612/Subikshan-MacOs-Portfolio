import React from 'react';
import { AnimatePresence } from 'framer-motion';
import Window from './Window';

const WindowManager = ({ windows, onClose, onFocus, onMinimize }) => {
  return (
    <AnimatePresence>
      {windows.map((window) => (
        !window.minimized && (
          <Window
            key={window.id}
            window={window}
            onClose={() => onClose(window.id)}
            onFocus={() => onFocus(window.id)}
            onMinimize={() => onMinimize(window.id)}
          />
        )
      ))}
    </AnimatePresence>
  );
};

export default WindowManager;
