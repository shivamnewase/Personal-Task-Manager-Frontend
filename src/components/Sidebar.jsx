import React, { useEffect, useState } from "react";
import { Button, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  findProjectAction,
  getGraphAction,
  getPriorityGraphAction
} from "../redux/actions/project.action";
import ProjectModal from "../components/Modal/Project/CreateProjectModal";

const ProjectList = ({ projectList, open }) => {
  const dispatch = useDispatch();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  useEffect(() => {
    if (projectList.length > 0) {
      handleProjectSelection(projectList[0]._id);
    }
  }, [projectList]);

  const handleProjectSelection = (projectId) => {
    setSelectedProjectId(projectId);
    dispatch(findProjectAction(projectId));
    dispatch(getGraphAction(projectId));
    dispatch(getPriorityGraphAction(projectId));
  };

  const handleCreateProject = () => {
    setOpenCreateProjectModal(true);
  };

  const handleCloseModal = () => {
    setOpenCreateProjectModal(false);
  };

  const renderProjectButton = (project) => (
    <ListItem key={project._id} sx={{ padding: "3px 6px" }}>
      <Button
        fullWidth={open}
        variant={selectedProjectId === project._id ? "contained" : "outlined"}
        onClick={() => handleProjectSelection(project._id)}
        sx={{
          justifyContent: "flex-start",
          textAlign: "left",
          alignItems: "center",
          width: open ? "100%" : "auto",
          minWidth: open ? "auto" : 1,
          py: 1,
          mb: 1,
          gap: 2,
          borderRadius: "8px", // Add rounded corners
          backgroundColor: selectedProjectId === project._id ? '#d1e7dd' : 'transparent', // Highlight selected
          '&:hover': {
            backgroundColor: selectedProjectId === project._id ? '#c3e6cb' : '#f1f1f1', // Change on hover
          }
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            minHeight: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <i className="fa-duotone fa-solid fa-file" />
        </ListItemIcon>
        {open && <ListItemText primary={project.projectName} />}
      </Button>
    </ListItem>
  );

  return (
    <>
      <Typography variant="h6" sx={{ padding: "16px", fontWeight: "bold" }}>
        Projects
      </Typography>
      <Divider />

      <List sx={{ marginTop: "10px" }}>
        {/* Create Project Button */}
        <ListItem sx={{ padding: "3px 6px" }}>
          <Button
            fullWidth={open}
            variant="contained"
            color="primary"
            onClick={handleCreateProject}
            sx={{
              justifyContent: "center",
              textAlign: "left",
              alignItems: "center",
              width: open ? "100%" : "auto",
              minWidth: open ? "auto" : 1,
              py: 1,
              mb: 3,
              gap: 2,
              borderRadius: "8px", // Rounded corners
              boxShadow: 2, // Add shadow for depth
              '&:hover': {
                backgroundColor: '#0056b3', // Darker blue on hover
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                minHeight: 30,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fa-duotone fa-solid fa-plus" />
            </ListItemIcon>
            {open && <ListItemText primary="Create Project" />}
          </Button>
        </ListItem>

       
        {projectList.map(renderProjectButton)}
      </List>

      <ProjectModal
        openModal={openCreateProjectModal}
        closeModal={handleCloseModal}
      />
    </>
  );
};

export default ProjectList;
