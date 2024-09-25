import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  InputLabel,
  FormControl,
  Chip,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import ListItemText from "@mui/material/ListItemText";
import { createProjectAction } from "../../../redux/actions/project.action";
const ProjectModal = ({ openModal, closeModal }) => {
  const { userList } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    type: "",
    projectName: "",
    defaultAssign: "",
    emailOnTaskDueDate: false,
    createdBy: "",
    tasks: [],
    users: [], // Note the plural form for multiple users
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(createProjectAction(formData));
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle change for multi-select
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      users: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Dialog open={openModal} onClose={closeModal} maxWidth="sm" fullWidth>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            size="small"
            margin="normal"
            name="type"
            label="Project Type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="projectName"
            label="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            required
            size="small"
          />
          <FormControl fullWidth size="small">
            <TextField
              name="createdBy"
              margin="normal"
              label="createdBy"
              value={formData.createdBy}
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
          </FormControl>

          <FormControl fullWidth size="small">
            <TextField
              name="defaultAssign"
              margin="normal"
              label="defaultAssign"
              value={formData.defaultAssign}
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
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="demo-multiple-checkbox-label">User's</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              margin="normal"
              size="small"
              value={formData.users}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {userList.map((name) => (
                <MenuItem key={name._id} value={name._id}>
                  <Checkbox checked={formData.users.includes(name._id)} />
                  <ListItemText primary={name.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Checkbox
                name="emailOnTaskDueDate"
                margin="normal"
                checked={formData.emailOnTaskDueDate}
                onChange={handleChange}
              />
            }
            label="Email on Task Due Date"
          />

          <DialogActions>
            <Button onClick={closeModal} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
