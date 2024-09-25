import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Summary from "./TabsComponent/Summary/Summary";
import List from "./TabsComponent/List/List";
import { getTaskAction,taskLoading } from "../redux/actions/task.action";
import { useDispatch, useSelector } from "react-redux"; // Use useSelector to access the store
import {
  findProjectAction,
  getGraphAction,
  projectLoading,
  getPriorityGraphAction,
} from "../redux/actions/project.action";
import  Backdrop  from "../components/Spinner/BackDrop";
import TaskCalendar from "./Calender/Calander";



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
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  
  const [dataLoaded, setDataLoaded] = React.useState({});
  const { projectTaks } = useSelector((state) => state.project);
  const {tasksLoading:isLoading} = useSelector((state) => state.task);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 2 && !dataLoaded[newValue]) {
      dispatch(taskLoading())
      dispatch(getTaskAction());
      setDataLoaded((prev) => ({ ...prev, [newValue]: true }));
      
      dispatch(findProjectAction(projectTaks._id));
    } else if (newValue === 0 && !dataLoaded[newValue]) {
      dispatch(projectLoading())
      dispatch(getGraphAction(projectTaks._id));
      dispatch(getPriorityGraphAction(projectTaks._id));
    }
  };

  React.useEffect(()=>{
    if (value === 0 && !dataLoaded[value]) {
      dispatch(projectLoading())
      dispatch(getGraphAction(projectTaks._id));
      dispatch(getPriorityGraphAction(projectTaks._id));
    }
  },[])


  
  return (
    <>
    <Backdrop isLoading={isLoading}/>
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
            } 
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
            } 
            label="List"
            {...a11yProps(2)}
            sx={{
              minHeight: 40,
              marginRight: 2,
            }}
          />
          <Tab
            iconPosition="start"
            icon={
              <i className="fa-solid fa-calendar-days" style={{ fontSize: "1rem" }}></i>
            } 
            label="Calander"
            {...a11yProps(3)}
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
       {/* <Board /> */}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <List />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <TaskCalendar projectTaks={projectTaks} />
      </CustomTabPanel>
    </Box>
    </>
  );
}



