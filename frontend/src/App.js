import React, { useState, useEffect } from 'react';
import Desktop from './components/Desktop';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? <LoadingScreen /> : <Desktop />}
    </div>
  );
}

export default App;
