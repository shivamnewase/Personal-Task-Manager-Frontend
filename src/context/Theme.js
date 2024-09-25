import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from '../theme/theme'; // Update the path to your themes file

// Create a ThemeContext
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProviderComponent");
  }
  return context;
};

// Define your theme provider component
export const ThemeProviderComponent = ({ children }) => {
  const savedThemeMode = localStorage.getItem("themeMode") || "light";
  const [themeMode, setThemeMode] = useState(savedThemeMode);

  // Determine the theme based on the themeMode
  const theme = themeMode === "light" ? lightTheme : darkTheme;

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem("themeMode", newThemeMode);
  };

  useEffect(() => {
    const savedThemeMode = localStorage.getItem("themeMode") || "light";
    setThemeMode(savedThemeMode);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
