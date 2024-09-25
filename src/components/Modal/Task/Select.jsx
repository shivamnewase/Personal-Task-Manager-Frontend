import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const UserSelect = ({ formData, userList, handleChange,defaultValue }) => {
  return (
    <TextField
      margin="normal"
      name="reporter"
      label="Reporter"
      defaultValue={defaultValue}
      value={formData.reporter || ''} // Set default value, use empty string if not defined
      onChange={handleChange}
      select
      size="small"
      fullWidth
    >
     
      {userList.map((user) => (
        <MenuItem key={user._id} value={user._id}>
          {user.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default UserSelect;
