import React, { useCallback, useState } from "react";
import SplashScreen from "./src/components/SplashScreen";
import MainScreen from "./src/components/MainScreen";
import "./global.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <SplashScreen onComplete={handleSplashComplete} />
  ) : (
    <MainScreen />
  );
}

export default App;
