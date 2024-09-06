import React,{useEffect} from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import moment from "moment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

  
const getGreeting = (user) => {
    const now = new Date();
    const hours = now.getHours();
  
    if (hours >= 5 && hours < 12) {
      return `Good Morning, ${user.name} ☕️` ;
    } else if (hours >= 12 && hours < 18) {
      return `Good Afternoon, ${user.name} ☀️`;
    } else {
      return `Good Evening, ${user.name}`;
    }
  };

export default function BasicGrid() {
  const { user } = useSelector((state) => state.auth);
  console.log("🚀 ~ BasicGrid ~ user:", user)
 

  
  const greeting = getGreeting(user);

  return (
    <Box>
      <Grid container 
          direction="column" 
          alignItems="center" 
          justifyContent="center" 
          style={{ minHeight: '20vh' }} 
    >
      <Grid item>
        <Typography variant="h6" noWrap component="div" align="center">
          {greeting} 
        </Typography>
        <Typography variant="p" noWrap component="span" align="center">
        Here's where you'll view a summary of DJL Web and App's status, priorities, workload, and more.
        </Typography>
      </Grid>
    </Grid>
    </Box>
  );
}
