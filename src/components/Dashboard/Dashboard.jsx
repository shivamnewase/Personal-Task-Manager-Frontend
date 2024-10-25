import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { projectList } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleHelpClick = () => {
    navigate("/help");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        bgcolor: "background.default",
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Task Management Dashboard
      </Typography>
      <Typography variant="body1" gutterBottom>
        You can create a new project to get started!
      </Typography>

      <Box sx={{ marginTop: 3 }}>
        <Typography variant="h6">
          Active Projects: {projectList.length}
        </Typography>
        {/* <Typography variant="h6">Completed Tasks: 12</Typography> */}
        {/* <Typography variant="h6">Upcoming Deadlines: 2</Typography> */}
      </Box>
      {/* <Typography variant="h6" gutterBottom>
        Recent Activities
      </Typography> */}
      {/* <Box>
        <Typography variant="body2">Project "Alpha" updated 2 hours ago</Typography>
        <Typography variant="body2">Task "Design UI" completed 1 hour ago</Typography>
      </Box> */}
      <Box sx={{ marginTop: 3 }}>
        <Button variant="outlined" sx={{ margin: 1 }}>
          View All Projects
        </Button>
        <Button variant="outlined" sx={{ margin: 1 }} onClick={handleHelpClick}>
          Help
        </Button>
      </Box>
     
    </Box>
  );
};

export default Dashboard;
