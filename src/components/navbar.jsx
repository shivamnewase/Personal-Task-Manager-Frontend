import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import BasicTabs from "./Main";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from '../context/Theme'; // Ensure you are importing useTheme correctly
import ThemeToggleSwitch from "../theme/themeToggleSwitch";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open ? openedMixin(theme) : closedMixin(theme)),
  "& .MuiDrawer-paper": open ? openedMixin(theme) : closedMixin(theme),
}));

export default function MiniDrawer() {
  // const theme = useTheme(); // Ensure useTheme is being used correctly
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openButton = Boolean(anchorEl);
  const {theme } = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              display: open ? "none" : "block",
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Task Management
          </Typography>

          <Button
            variant="contained"
            size="small"
            sx={{ textTransform: "capitalize", marginRight: 2 }}
          >
            Create
          </Button>

          <Button
            sx={{
              backgroundColor: 'background.paper',
              width: 40,
              height: 40,
              minWidth: 'auto',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              color: 'text.primary',
            }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i className="fa-solid fa-user"></i>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openButton}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          
         <ThemeToggleSwitch />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <i
                className="fa-duotone fa-solid fa-angle-right"
                style={{ fontSize: "20px" }}
              ></i>
            ) : (
              <i
                className="fa-duotone fa-solid fa-angle-left"
                style={{ fontSize: "20px" }}
              ></i>
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Task List"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open && {
                    justifyContent: "initial",
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    ...(open && {
                      mr: 3,
                    }),
                  }}
                >
                  {index % 2 === 0 ? (
                    <i className="fa-duotone fa-solid fa-file"></i>
                  ) : (
                    text
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    ...(open ? { opacity: 1 } : { opacity: 0 }),
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open && {
                    justifyContent: "initial",
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    ...(open && {
                      mr: 3,
                    }),
                  }}
                >
                  {index % 2 === 0 ? text : text}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    ...(open ? { opacity: 1 } : { opacity: 0 }),
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))} */}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          <BasicTabs />
        </Typography>
      </Box>
    </Box>
  );
}
