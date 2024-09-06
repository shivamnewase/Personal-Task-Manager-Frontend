import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProviderComponent");
  }
  return context;
};

export const ThemeProviderComponent = ({ children }) => {
  const savedThemeMode = localStorage.getItem("themeMode") || "light";
  const [themeMode, setThemeMode] = useState(savedThemeMode);

  const theme = createTheme({
    direction: themeMode === "rtl" ? "rtl" : "ltr",
    palette: {
      mode: themeMode,
    },
  });

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
