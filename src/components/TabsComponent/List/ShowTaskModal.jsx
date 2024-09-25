import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const TaskModal = ({ open, onClose, task, onUpdate, userList, errors = {} }) => {
  
  const [formValues, setFormValues] = useState({
    name: "",
    priority: "",
    status: "",
    assignee: "",
    reporter: "",
    startDate: null,
    // reminder: null,
    dueDate: null,
  });

  useEffect(() => {
    
    if (task) {
      setFormValues({
        name: task.name || "",
        priority: task.priority || "",
        status: task.status || "",
        assignee: task.assignee || "",
        reporter: task.reporter || "",
        startDate: task.startDate ? moment(task.startDate) : null,
        // reminder: task.reminder ? moment(task.reminder) : null,
        dueDate: task.dueDate ? moment(task.dueDate) : null,
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (name) => (newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = () => {
    if (task) {
      const updatedTask = { ...task, 
        ...formValues,
        startDate: formValues.startDate ? formValues.startDate.toISOString() : null,
        dueDate: formValues.dueDate ? formValues.dueDate.toISOString() : null,
        reminder: formValues.reminder ? formValues.reminder.toISOString() : null
      };
      console.log("formValues",formValues)
      console.log("updatedTask",updatedTask)
      onUpdate(updatedTask); 
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ ...modalStyle, width: 900 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Task Details
        </Typography>
        {task ? (
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Box sx={{ flex: 1, pr: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formValues.name}
                variant="outlined"
                margin="normal"
                size="small"
                onChange={handleChange}
              />
              
              <FormControl fullWidth size="small" error={!!errors.status}>
          <TextField
            name="status"
            label="Status"
            value={formValues.status}
            onChange={handleChange}
            select
            size="small"
             margin="normal"
            required
          >
            <MenuItem value="PROCESS">PROCESS</MenuItem>
            <MenuItem value="REVIEW">REVIEW</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="TO DO">TO DO</MenuItem>
          </TextField>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>
              
              <FormControl fullWidth size="small" error={!!errors.priority}>
          <TextField
            name="priority"
            label="Priority"
            value={formValues.priority}
            onChange={handleChange}
            select
            margin="normal"
            size="small"
            required
          >
            <MenuItem value="Lowest">
              <i style={{ color: '#446dbf', marginRight: '8px' }} className="fa-duotone fa-solid fa-angles-down"></i>
              Lowest
            </MenuItem>
            <MenuItem value="Low">
              <i style={{ color: '#446dbf', marginRight: '8px' }} className="fa-sharp-duotone fa-solid fa-angle-down"></i>
              Low
            </MenuItem>
            <MenuItem value="Medium">
              <i style={{ color: '#f0ab29', marginRight: '8px' }} className="fa-sharp-duotone fa-solid fa-grip-lines"></i>
              Medium
            </MenuItem>
            <MenuItem value="High">
              <i style={{ color: '#d9624a', marginRight: '8px' }} className="fa-duotone fa-solid fa-angle-up"></i>
              High
            </MenuItem>
            <MenuItem value="Highest">
              <i style={{ color: '#d9624a', marginRight: '8px' }} className="fa-duotone fa-solid fa-angles-up"></i>
              Highest
            </MenuItem>
          </TextField>
          {errors.priority && <FormHelperText>{errors.priority}</FormHelperText>}
        </FormControl>
              <FormControl fullWidth size="small" error={!!errors.assignee}>
                <TextField
                  name="assignee"
                  label="Assignee"
                  value={formValues.assignee}
                  onChange={handleChange}
                  select
                  size="small"
                   margin="normal"
                  required
                >
                  {userList?.map((list) => (
                    <MenuItem key={list._id} value={list._id}>
                      {list.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.assignee && (
                  <FormHelperText>{errors.assignee}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth size="small" sx={{mb:2}} error={!!errors.reporter}>
                <TextField
                  name="reporter"
                  label="Reporter"
                  value={formValues.reporter}
                  
                  onChange={handleChange}
                  select
                  size="small"
                   margin="normal"
                  required
                >
                  {userList.map((list) => (
                    <MenuItem key={list._id} value={list._id}>
                      {list.name}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.reporter && (
                  <FormHelperText>{errors.reporter}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth size="small" sx={{mb:3}} error={!!errors.startDate}>
                <LocalizationProvider  dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Start Date"
                    value={formValues.startDate}
                    name="startDate"
                    margin="normal"
                    onChange={handleDateChange("startDate")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        required
                        error={!!errors.startDate}
                        helperText={errors.startDate}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth size="small" sx={{mb:3}} error={!!errors.dueDate}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Due Date"
                    value={formValues.dueDate}
                    onChange={handleDateChange("dueDate")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        
                        required
                        error={!!errors.dueDate}
                        helperText={errors.dueDate}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              {/* <FormControl fullWidth size="small" sx={{mb:3}} error={!!errors.reminder}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Reminder"
                    value={formValues.reminder}
                    onChange={handleDateChange("reminder")}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        error={!!errors.reminder}
                        helperText={errors.reminder}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl> */}
            </Box>
          </Box>
        ) : (
          <Typography sx={{ mt: 2 }}>Task not available</Typography>
        )}
        <Button onClick={handleSubmit} sx={{ mt: 2 }} variant="contained">
          Update
        </Button>
        <Button onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
