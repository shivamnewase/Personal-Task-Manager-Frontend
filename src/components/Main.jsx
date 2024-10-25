import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Summary from "./TabsComponent/Summary/Summary";
import List from "./TabsComponent/List/List";
import { getTaskAction, taskLoading } from "../redux/actions/task.action";
import { useDispatch, useSelector } from "react-redux"; // Use useSelector to access the store
import {
  findProjectAction,
  getGraphAction,
  projectLoading,
  getPriorityGraphAction,
} from "../redux/actions/project.action";
import Backdrop from "../components/Spinner/BackDrop";
import TaskCalendar from "./Calender/Calander";
import Board from "./TabsComponent/Board/Board";
import Dashboard from "./Dashboard/Dashboard";
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
  const { projectTaks, activeProject } = useSelector((state) => state.project);
  const { tasksLoading: isLoading } = useSelector((state) => state.task);
  const {user} = useSelector((state) => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 2 && !dataLoaded[newValue]) {
      dispatch(taskLoading());
      dispatch(getTaskAction());
      setDataLoaded((prev) => ({ ...prev, [newValue]: true }));

      dispatch(findProjectAction(projectTaks._id));
    } else if (newValue === 0 && !dataLoaded[newValue]) {
      dispatch(projectLoading());
      dispatch(getGraphAction(projectTaks._id));
      dispatch(getPriorityGraphAction(projectTaks._id));
    }
  };

  React.useEffect(() => {
    if (value === 0 && !dataLoaded[value]) {
      dispatch(projectLoading());
      dispatch(getGraphAction(projectTaks._id));
      dispatch(getPriorityGraphAction(projectTaks._id));
    }
  }, []);

  return (
    <>
    <Backdrop isLoading={isLoading} />
    {activeProject ? (
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              minHeight: 40,
              ".MuiTab-root": {
                padding: "4px 8px",
                fontSize: "0.875rem",
              },
            }}
          >
            {/* Tab components remain the same */}
            <Tab label="Summary" {...a11yProps(0)} />
            <Tab label="Board" {...a11yProps(1)} />
            <Tab label="List" {...a11yProps(2)} />
            <Tab label="Calendar" {...a11yProps(3)} />
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
    ) : (
      user.role === 'Admin' && <Dashboard  />
    )}
  </>
  );
}
