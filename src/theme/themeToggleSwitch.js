import React from 'react';
import Switch from '@mui/material/Switch';
import { useTheme } from '../context/Theme'; // Ensure you import useTheme correctly

const ThemeToggleSwitch = () => {
    const  updateTheme =  localStorage.getItem('themeMode')

  const { toggleTheme } = useTheme();
 
  const isDarkMode = updateTheme === 'dark';


  return (
    <Switch
      aria-label="toggle-theme"
      checked={isDarkMode}
      onChange={toggleTheme}
    //   color="default" 
    />
  );
};

export default ThemeToggleSwitch;
