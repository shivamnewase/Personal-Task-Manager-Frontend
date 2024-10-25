import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ThemeToggleSwitch from "../theme/themeToggleSwitch";
import MenuItemTab from "../components/MenuDashboard/MenuItemsButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import MainContent from "../components/Main";
import { useDispatch, useSelector } from "react-redux";
import { logOutAction } from "../redux/actions/auth.action";
import { showAllProjectAction } from "../redux/actions/project.action";
import CreateModal from "../components/Modal/Task/CreateModal";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? "0px" : "41px", // Adjust margin based on drawer state
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: open ? `calc(100% - ${drawerWidth}px)` : "0",
    // marginLeft: open ? `${drawerWidth}px` : '0',
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Home() {
  const { projectList, activeProject } = useSelector((state) => state.project);
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [scroll, setScroll] = useState("paper");

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleCloseMenu = () => setAnchorEl(null);

  const logout = () => {
    handleCloseMenu(); // Close the menu on logout
    dispatch(logOutAction());
  };

  const handleOpenModal = (scrollType) => {
    setScroll(scrollType);
    setOpenCreateModal(true);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(showAllProjectAction());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CreateModal
        openCreateModal={openCreateModal}
        handleCloseModal={() => setOpenCreateModal(false)}
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
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ marginRight: 2, display: open ? "none" : "block" }}
      >
        <i className="fa-solid fa-bars"></i>
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Task Management
      </Typography>
      <MenuItemTab />
      <Button
        sx={{ textTransform: "capitalize" }}
        variant="contained"
        size="small"
        onClick={() => handleOpenModal("paper")}
      >
        Create
      </Button>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Button
        onClick={handleMenuClick}
        sx={{ textTransform: "capitalize" }}
        variant="contained"
        size="small"
      >
        Profile
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      <ThemeToggleSwitch />
    </Box>
  </Toolbar>
</AppBar>


      <Drawer
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ marginBottom: "-8px" }}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          <Sidebar
            projectList={projectList}
            open={open}
            activeProject={activeProject}
          />
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <MainContent />
      </Main>
    </Box>
  );
}

export default Home;

