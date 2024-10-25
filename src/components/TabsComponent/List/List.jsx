import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";
import TaskModal from "./ShowTaskModal";
import {
  updateTaskAction,
  taskLoading,
  deleteTaskAction,
} from "../../../redux/actions/task.action";

import {
  // Modal,
  // Box,
  Typography,
  Button,
  TextField,
  // MenuItem,
  FormControl,
  Grid,
  // FormHelperText,
} from "@mui/material";

const paginationModel = { page: 0, pageSize: 25 };
const userColors = ["#2f6e53", "#446dbf", "#f0ab29", "#d9624a"];
const priorityIcons = {
  Lowest: (
    <i
      style={{ color: "#446dbf" }}
      className="fa-duotone fa-solid fa-angles-down"
    ></i>
  ),
  Low: (
    <i
      style={{ color: "#446dbf" }}
      className="fa-sharp-duotone fa-solid fa-angle-down"
    ></i>
  ),
  Medium: (
    <i
      style={{ color: "#f0ab29" }}
      className="fa-sharp-duotone fa-solid fa-grip-lines"
    ></i>
  ),
  High: (
    <i
      style={{ color: "#d9624a" }}
      className="fa-duotone fa-solid fa-angle-up"
    ></i>
  ),
  Highest: (
    <i
      style={{ color: "#d9624a" }}
      className="fa-duotone fa-solid fa-angles-up"
    ></i>
  ),
};

export default function DataTable() {
  const { projectTaks } = useSelector((state) => state.project);

  const { userList } = useSelector((state) => state.auth);

  const [projectData, setProjectData] = useState([]);
  const [updatedProjectData, setUpdatedProjectData] = useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedIDs, setSelectedIDs] = React.useState([
    { projectId: "", taskId: "" },
  ]);
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({
    priority: "",
    assignee: "",
    reporter: "",
    startDate: "",
    reminder: "",
    dueDate: "",
  });

  useEffect(() => {
    setProjectData(projectTaks?.tasks);
    setUpdatedProjectData(projectTaks?.tasks);
  }, []);

  const handleRowClick = (params) => {
    if (!openModal) {
      setSelectedRow(params.row);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleUpdate = (updatedTask) => {
    const reBody = {
      ...updatedTask,
      taskId: updatedTask._id,
    };
    dispatch(taskLoading());
    dispatch(updateTaskAction(reBody));
  };

  const handleDelete = () => {
    dispatch(deleteTaskAction(selectedIDs));
    setSelectedIDs([]);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Update the search term state

    if (value.length >= 3) {
      const updatedData = projectData.filter((list) => {
        return list.name.toLowerCase().includes(value.toLowerCase());
      });
      setProjectData(updatedData);
    } else {
      setProjectData(updatedProjectData);
    }
  };

  const rows = projectData?.map((list) => ({
    id: list._id,
    key: list.taskNumber,
    name: list.name,
    priority: priorityIcons[list.priority],
    status: list.status,
    dueDate: list.dueDate,
    assignee: list.assignee?.name || "N/A",
    createdAt: list.createdAt,
    updatedAt: list.updatedAt,
    reporter: list.reporter?.name || "N/A",
  }));

  const columns = [
    {
      field: "key",
      headerName: "Key",
      width: 100,
      renderCell: (params) => (
        <Button onClick={(event) => handleRowClick(params)}>
          {params.value}
        </Button>
      ),
    },
    { field: "name", headerName: "NAME", flex: 1 },
    {
      field: "priority",
      headerName: "PRIORITY",
      width: 120,
      renderCell: (params) => (
        <Button onClick={(event) => handleRowClick(params)}>
          {params.value}
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "STATUS",
      width: 150,
      renderCell: (params) => (
        <Button
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "12px",
            fontSize: "12px",
            animation: "none",
            fontWeight: "600",
            color:
              params.row.status === "DONE"
                ? "#2f6e53"
                : params.row.status === "PROCESS"
                  ? "#1e59b5"
                  : params.row.status === "TO DO"
                    ? "#d9624a" // Color for TO DO
                    : params.row.status === "REVIEW"
                      ? "#f0ab29" // Color for REVIEW
                      : "", // Default color
            backgroundColor:
              params.row.status === "DONE"
                ? "#e0fdf3"
                : params.row.status === "PROCESS"
                  ? "#ebf0f9"
                  : params.row.status === "TO DO"
                    ? "#ffe0e0" // Background for TO DO
                    : params.row.status === "REVIEW"
                      ? "#fff5e0" // Background for REVIEW
                      : "", // Default background
          }}
          variant="rounded"
          width={80}
          height={25}
          onClick={(event) => handleRowClick(params)}
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "dueDate",
      headerName: "DUE DATE",
      width: 200,
      renderCell: (params) => (
        <Skeleton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
          variant="rounded"
          width={120}
          height={30}
        >
          {moment(params.row.dueDate).format("MMM Do YYYY")}
        </Skeleton>
      ),
    },
    {
      field: "assignee",
      headerName: "ASSIGNEE",
      width: 200,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          {params.row.assignee}
        </Typography>
      ),
    },
    {
      field: "createdAt",
      headerName: "CREATED",
      width: 200,
      renderCell: (params) => (
        <Skeleton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
          variant="rounded"
          width={120}
          height={30}
        >
          {moment(params.row.createdAt).format("MMM Do YYYY")}
        </Skeleton>
      ),
    },
    {
      field: "updatedAt",
      headerName: "UPDATED",
      width: 200,
      renderCell: (params) => (
        <Skeleton
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
          variant="rounded"
          width={120}
          height={30}
        >
          {moment(params.row.updatedAt).format("MMM Do YYYY")}
        </Skeleton>
      ),
    },
    {
      field: "reporter",
      headerName: "REPORTER",
      width: 200,
      renderCell: (params) => (
        <Typography
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          {params.row.reporter}
        </Typography>
      ),
    },
  ];

  

  return (
    <>
      <Grid container spacing={1} >
  <Grid
    item
    xs={9}
    md={9}
    container
    justifyContent="start"
    alignItems="center"
    
  >
    <Typography
      variant="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        pt: -25, // Optionally reduce padding on Typography if needed
      }}
    >
      {userList.map((list, index) => (
        <Paper
          key={list._id}
          sx={{
            backgroundColor: `${userColors[index]}`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "-5px",
            zIndex: 2,
            transition: "transform 0.3s, border 0.3s", 
            "&:hover": {
              transform: "scale(1.1)", 
              border: "2px solid white", 
            },
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            {list.name.split("")[0]}
          </Typography>
        </Paper>
      ))}
    </Typography>
  </Grid>
  <Grid item xs={3} md={3} sx={{pt:5}}>
    <FormControl fullWidth size="small" sx={{ mb: 2, mt:0 }}>
      <TextField
        name="search"
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        size="small"
        margin="normal"
        required
      />
    </FormControl>
  </Grid>
</Grid>


      <Paper
        sx={{
          height: 800,
          width: "100%",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row.id}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setSelectedIDs({
              taskId: newRowSelectionModel,
              projectId: projectTaks?._id,
            });
          }}
          sx={{ border: 0 }}
          onRowClick={handleRowClick}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          disabled={selectedIDs.length === 0}
          sx={{
            position: "absolute",
            bottom: "13px",
            right: "170px",
            pointerEvents: selectedIDs.length === 0 ? "none" : "auto",
            opacity: selectedIDs.length === 0 ? 0.5 : 1,
          }}
        >
          <i
            className="fa-duotone fa-solid fa-trash"
            style={{ color: selectedIDs.length === 0 ? "silver" : "red" }}
          ></i>
        </Button>
      </Paper>

      <TaskModal
        open={openModal}
        onClose={handleCloseModal}
        task={selectedRow}
        onUpdate={handleUpdate}
        userList={userList}
        errors={errors}
      />
    </>
  );
}
