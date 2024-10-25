import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2), // Increased padding for better spacing
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...(theme.palette.mode === "dark" && {
    backgroundColor: "#1A2027",
    color: theme.palette.text.primary,
  }),
}));

export default function Card({ list }) {
  const allCardNames = ["DONE", "PROCESS", "REVIEW", "TO DO"];

  return (
    <Grid container spacing={10} sx={{ marginBottom: "40px"}}>
      {allCardNames.map((cardName) => {
        const data = list?.find((item) => item._id === cardName) || { count: 0 };

        return (
          <Grid item xs={3} md={3} key={cardName}>
            <Item>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{cardName}</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.count}</Typography>
             
            </Item>
          </Grid>
        );
      })}
    </Grid>
  );
}
