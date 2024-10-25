import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Drawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  activeProjectAction,
} from "../redux/actions/project.action";
import ProjectModal from "../components/Modal/Project/CreateProjectModal";
import ListItemButton from "@mui/material/ListItemButton";
import { useTheme } from "../context/Theme";

const ProjectList = ({ projectList, open, activeProject }) => {
  
  const theme = useTheme();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  const handleCreateProject = () => {
    setOpenCreateProjectModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateProjectModal(false);
  };

  const handleItemClick = (btnValue) => {
    switch (btnValue) {
      case "Dashboard":
        dispatch(activeProjectAction(""));

        break;

      default:
        console.log("Unknown button clicked:", btnValue);
    }
  };

  return (
    <>
      <Divider />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div>
          {" "}
          <Typography variant="h6" sx={{ margin: "5px 0px 5px 5px" }}>
            Projects
          </Typography>
        </div>
        <div>
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateProject}
              sx={{
                justifyContent: "center",
                textAlign: "left",
                width: "auto",
                gap: 2,
                borderRadius: "2px",
                boxShadow: 2,
                "&:hover": {
                  backgroundColor: "#0056b3",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <i className="fa-duotone fa-solid fa-plus" />
              </ListItemIcon>
            </Button>
          </ListItem>
        </div>
      </div>
      <Divider />
      {user.role === 'Admin' && ( // Render the button only if the user is an admin
        <List>
          {["Dashboard"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleItemClick(text);
                }}
                sx={{
                  backgroundColor:
                    activeProject === ""
                      ? theme.theme.palette.primary.main
                      : "inherit",
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 && (
                    <i className="fa-solid fa-grid-horizontal"></i>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
      <ProjectModal
        openModal={openCreateProjectModal}
        closeModal={handleCloseModal}
      />
    </>
  );
};

export default ProjectList;
