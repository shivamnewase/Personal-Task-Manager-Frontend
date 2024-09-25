import React, { useContext, useEffect, useState } from "react";
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
import { useTheme } from "../context/Theme"; // Ensure you are importing useTheme correctly
import ThemeToggleSwitch from "../theme/themeToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../redux/actions/auth.action";
import MenuItemTab from "./MenuDashboard/MenuItemsButton";
import CreateModal from "./Modal/Task/CreateModal";
import { showAllProjectAction } from "../redux/actions/project.action";
import Sidebar from "./Sidebar";

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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scroll, setScroll] = React.useState("paper");
  const [projectDataLoaded, setProjectDataLoaded] = useState(false);
  const createTaskModal = useContext('sss');
  const openButton = Boolean(anchorEl);
  const { theme } = useTheme();
  const { projectList } = useSelector((state) => state.project);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const logout = () => {
    handleClose(); // Close the menu on logout
    dispatch(logOutAction());
  };

  // const handleOpenModal = () => setOpenCreateModal(true);

  const handleOpenModal = (scrollType) => {
    setScroll(scrollType);
    setOpenCreateModal(true);

    setProjectDataLoaded(true);
  };

  const handleCloseModal = () => {
    setOpenCreateModal(false);
  };

  useEffect(() => {
    dispatch(showAllProjectAction());
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CreateModal
        openCreateModal={openCreateModal}
        handleCloseModal={handleCloseModal}
        scroll={scroll}
      />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            // color="inherit"
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

          <Typography variant="h6" noWrap component="div">
            Task Management
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginLeft: 2,
              flexGrow: 1,
              textTransform: "capitalize",
              gap: 2,
            }}
          >
            <MenuItemTab />
            <Button
              sx={{ textTransform: "capitalize" }}
              variant="contained"
              size="small"
              onClick={() => handleOpenModal("paper")}
            >
              {" "}
              Create
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
             
            </Menu>
          </Box>

          <Button
            sx={{
              backgroundColor: "background.paper",
              width: 40,
              height: 40,
              minWidth: "auto",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 0,
              color: "text.primary",
            }}
            id="basic-button"
            aria-controls={openButton ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openButton ? "true" : undefined}
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
            <MenuItem onClick={logout}>Logout</MenuItem>
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
        <Sidebar projectList={projectList} open={open} />
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
