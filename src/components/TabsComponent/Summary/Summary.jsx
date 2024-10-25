import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Card from "./Card";
import SimplePieChart from "../../Charts/PieChart";
import SimpleBarChart from "../../Charts/BarChart";
import { useTheme } from "../../../context/Theme";
// Styled Paper component
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...(theme.palette.mode === "dark" && {
    backgroundColor: "#1A2027",
    color: theme.palette.text.primary,
  }),
}));

// Function to get greeting message based on the time of day
const getGreeting = (user) => {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 5 && hours < 12) {
    return `Good Morning, ${user.name} ☕️`;
  } else if (hours >= 12 && hours < 18) {
    return `Good Afternoon, ${user.name} ☀️`;
  } else {
    return `Good Evening, ${user.name} 🌆`;
  }
};

export default function BasicGrid() {
  const { user } = useSelector((state) => state.auth);
  const theme = useTheme(); // Access the theme
  
  
  const { taskStatusList, projectTaks, taskPriorityList, } = useSelector(
    (state) => state.project
  );

  // Get greeting message
  const greeting = getGreeting(user);

  return (
    <>
      <Box>
        <Grid
          // container
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "18vh" }}
        >
          <Grid item>
            <Typography variant="h5" noWrap component="div" align="center">
              {greeting}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              align="center"
              sx={{ marginTop: "12px" }}
            >
              Here's where you'll view a summary of {projectTaks.projectName}{" "}
              status, priorities, workload, and more.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {taskStatusList.length > 0 && <Card list={taskStatusList} />}

      {taskStatusList.length > 0 && (
        <Grid container spacing={5} >
          <Grid item xs={6} md={6}>
            <Item sx={{ display:'flex',justifyContent:'center' }}>
              <SimplePieChart taskStatusList={taskStatusList} />
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item sx={{ display:'flex',justifyContent:'center' }}>
              <SimpleBarChart taskPriorityList={taskPriorityList} />
            </Item>
          </Grid>
         
        </Grid>
      )}
    </>
  );
}
