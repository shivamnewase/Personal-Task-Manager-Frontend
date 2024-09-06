import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Summary from "./TabsComponent/Summary";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            minHeight: 40, // Adjust the minimum height of the tabs
            ".MuiTab-root": {
              padding: "4px 8px", // Adjust padding to reduce tab size
              fontSize: "0.875rem", // Adjust font size
            },
          }}
        >
          <Tab
            iconPosition="start"
            icon={
              <i
                className="fa-solid fa-table-layout"
                style={{ fontSize: "1rem" }}
              ></i>
            } // Adjust icon size
            label="Summary"
            {...a11yProps(0)}
            sx={{
              minHeight: 40,
              marginRight: 2,
            }}
          />
          <Tab
            iconPosition="start"
            icon={
              <i
                className="fa-solid fa-square-kanban"
                style={{ fontSize: "1rem" }}
              ></i>
            } // Adjust icon size
            label="Board"
            {...a11yProps(1)}
            sx={{
              minHeight: 40,
              marginRight: 2,
            }}
          />
          <Tab
            iconPosition="start"
            icon={
              <i className="fa-solid fa-list" style={{ fontSize: "1rem" }}></i>
            } // Adjust icon size
            label="List"
            {...a11yProps(2)}
            sx={{
              minHeight: 40,
              marginRight: 2,
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Summary />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Board
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        List
      </CustomTabPanel>
    </Box>
  );
}
