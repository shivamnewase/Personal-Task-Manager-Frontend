// import * as React from "react";
// import PropTypes from "prop-types";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import { useDispatch, useSelector } from "react-redux";
// import { MenuItem } from "@mui/material";
// import {
//   findProjectAction,
//   getGraphAction,
//   getPriorityGraphAction,
//   activeProjectAction,
// } from "../../redux/actions/project.action";
// import { useTheme } from "../../context/Theme";

// function CustomTabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// export default function BasicTabs() {
//   const theme = useTheme(); // Get the theme object
  
//   const [value, setValue] = React.useState(0);
//   const [selectedProjectId, setSelectedProjectId] = React.useState(null);

//   const { projectList, activeProject } = useSelector((state) => state.project);
//   const dispatch = useDispatch();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   React.useEffect(()=>{
//     if (projectList.length > 0) {
//       setSelectedProjectId(activeProject)
//     }
//   },[activeProject])

//   const handleProjectSelection = (projectId) => {
//     dispatch(activeProjectAction(projectId));
//     setSelectedProjectId(projectId);
//     dispatch(findProjectAction(projectId));
//     dispatch(getGraphAction(projectId));
//     dispatch(getPriorityGraphAction(projectId));
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           aria-label="basic tabs example"
//         >
//           <Tab
//             sx={{ textTransform: "capitalize" }}
//             label="Projects"
//             {...a11yProps(0)}
//           />
//           {/* <Tab
//             sx={{ textTransform: "capitalize" }}
//             label="Item Two"
//             {...a11yProps(1)}
//           />
//           <Tab
//             sx={{ textTransform: "capitalize" }}
//             label="Item Three"
//             {...a11yProps(2)}
//           /> */}
//         </Tabs>
//       </Box>
//       <CustomTabPanel value={value} index={0}>
//         {projectList.map((project) => (
//           <MenuItem
//             key={project._id}
//             sx={{
//               backgroundColor:
//                 project._id === selectedProjectId
//                   ? theme.theme.palette.primary.main
//                   : "transparent",
//               color:
//                 project._id === selectedProjectId
//                   ? theme.theme.palette.common.white
//                   : "inherit",
//             }}
//             onClick={() => handleProjectSelection(project._id)}
//           >
//             {project.projectName}
//           </MenuItem>
//         ))}
//       </CustomTabPanel>
//       {/* <CustomTabPanel value={value} index={1}>
//         Item Two
//       </CustomTabPanel>
//       <CustomTabPanel value={value} index={2}>
//         Item Three
//       </CustomTabPanel> */}
//     </Box>
//   );



// }



