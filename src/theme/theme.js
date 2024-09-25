import { createTheme } from "@mui/material/styles";

// Define your dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1e88e5', // Example color for primary button
    },
    // secondary:{main:'#00fff0'},
    background: {
      default: '#121212', // Background color for the app
      paper: '#1e1e1e', // Paper (AppBar, Drawer) background
    },
    text: {
      primary: '#ffffff', // Text color for primary text
      secondary: '#b0b0b0', // Text color for secondary text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e', // AppBar background color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Button text color
          borderRadius: '4px',
        },
        // contained: {
        //   backgroundColor: '#1e88e5', // Contained button background color
        // },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#ffffff', // Default text color
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e', // Drawer background color
        },
      },
    },
    IconButton:{
      styleOverrides: {
        color:'#ffffff'
      }
    },
  },
});

// Define your light theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1e88e5', // Example color for primary button
    },
    // secondary:{main:'#00fff0'},
    background: {
      default: '#f5f5f5', // Background color for the app
      paper: '#ffffff', // Paper (AppBar, Drawer) background
    },
    text: {
      primary: '#000000', // Text color for primary text
      secondary: '#666666', // Text color for secondary text
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff', // AppBar background color
         
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#000000', // Button text color
          borderRadius: '4px',
        },
        // contained: {
        //   backgroundColor: '#1e88e5', // Contained button background color
        // },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#000000', // Default text color
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff', // Drawer background color
        },
      },
    },
    IconButton:{
      styleOverrides: {
        root: {
        color:'#000000'
        },
      }
    },
    MuiBox:{
      styleOverrides: {
        box: {
          backgroundColor: '#ff00ff', // Drawer background color
        },
      },
    }
  },
});
