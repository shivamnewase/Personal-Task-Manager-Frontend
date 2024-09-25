import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useSelector } from "react-redux";
import { Grid, TextField, MenuItem, FormControl, FormHelperText } from "@mui/material";

const FormComponent = ({ formData, handleChange, handleDateChange, errors }) => {
  const { projectList } = useSelector((state) => state.project);
  const { userList } = useSelector((state) => state.auth);
  
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.project}>
          <TextField
            name="project"
            label="Project"
            value={formData.project}
            onChange={handleChange}
            select
            size="small"
            required
          >
            {projectList.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.projectName}
              </MenuItem>
            ))}
          </TextField>
          {errors.project && <FormHelperText>{errors.project}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.name}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            size="small"
            required
          />
          {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl fullWidth size="small" error={!!errors.description}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            size="small"
            required
          />
          {errors.description && <FormHelperText>{errors.description}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.summary}>
          <TextField
            name="summary"
            label="Summary"
            value={formData.summary}
            onChange={handleChange}
            size="small"
            required
          />
          {errors.summary && <FormHelperText>{errors.summary}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.status}>
          <TextField
            name="status"
            label="Status"
            value={formData.status}
            onChange={handleChange}
            select
            size="small"
            required
          >
            <MenuItem value="PROCESS">PROCESS</MenuItem>
            <MenuItem value="REVIEW">REVIEW</MenuItem>
            <MenuItem value="DONE">DONE</MenuItem>
            <MenuItem value="TO DO">TO DO</MenuItem>
          </TextField>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.priority}>
          <TextField
            name="priority"
            label="Priority"
            value={formData.priority}
            onChange={handleChange}
            select
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
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.reporter}>
          <TextField
            name="reporter"
            label="Reporter"
            value={formData.reporter}
            onChange={handleChange}
            select
            size="small"
            required
          >
            {userList.map((list) => (
              <MenuItem key={list._id} value={list._id}>
                {list.name}
              </MenuItem>
            ))}
          </TextField>
          {errors.reporter && <FormHelperText>{errors.reporter}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.assignee}>
          <TextField
            name="assignee"
            label="Assignee"
            value={formData.assignee}
            onChange={handleChange}
            select
            size="small"
            required
          >
            {userList.map((list) => (
              <MenuItem key={list._id} value={list._id}>
                {list.name}
              </MenuItem>
            ))}
          </TextField>
          {errors.assignee && <FormHelperText>{errors.assignee}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.startDate}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              name="startDate"
              sx={{ width: "100%", margin: "7px 0" }}
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
          {errors.startDate && <FormHelperText>{errors.startDate}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.reminder}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Reminder"
              value={formData.reminder}
              sx={{ width: "100%", margin: "7px 0" }}
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
          {errors.reminder && <FormHelperText>{errors.reminder}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth size="small" error={!!errors.dueDate}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              sx={{ width: "100%", margin: "7px 0" }}
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
          {errors.dueDate && <FormHelperText>{errors.dueDate}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormComponent;
