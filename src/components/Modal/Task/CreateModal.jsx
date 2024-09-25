import React, { useState, useCallback, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CreateTaskForm from './CreateTaskForm'
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { createTaskAction, taskLoading } from "../../../redux/actions/task.action";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersListAction } from "../../../redux/actions/auth.action";
import  Backdrop  from '../../Spinner/BackDrop';

const ScrollDialog = ({ openCreateModal, handleCloseModal, scroll }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth); 
  const { projectTaks, isLoading } = useSelector((state) => state.project);
  
  

  const [formData, setFormData] = useState({
    project: '',
    name: '',
    description: '',
    summary: '',
    status: '',
    startDate: null,
    dueDate: null,
    reminder: null,
    priority: '',
    assignee: '',
    reporter: user ? user._id : '' 
  });
  const [errors, setErrors] = useState({}); 

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }, []);
  
  const handleDateChange = useCallback((name) => (date) => {
    setFormData(prevData => ({ ...prevData, [name]: date }));

    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  }, []);
  

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (openCreateModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openCreateModal]);

  useEffect(() => {
    dispatch(getUsersListAction());
  }, [dispatch]);

  
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.project) newErrors.project = 'Project is required';
    if (!formData.summary) newErrors.summary = 'Summary is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    if (!formData.reporter) newErrors.reporter = 'Reporter is required';
    if (!formData.assignee) newErrors.assignee = 'Assignee is required';
    if (!formData.startDate) newErrors.startDate = 'Start Date is required';
    
    // Conditionally validate dueDate
    if (projectTaks?.emailOnTaskDueDate && !formData.dueDate) {
      newErrors.dueDate = 'Due Date is required';
    }
    
    if (!formData.reminder) newErrors.reminder = 'Reminder Date is required';

    // Validate date fields
    if (formData.dueDate && formData.startDate && formData.dueDate.isBefore(formData.startDate)) {
      newErrors.dueDate = 'Due Date cannot be before Start Date';
    }
    // Remove error if input is valid
    Object.keys(newErrors).forEach((key) => {
      if (formData[key] && formData[key] instanceof Date && !isNaN(formData[key].getTime())) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = () => {
    if (validateForm()) {
      const formattedFormData = {
        ...formData,
        startDate: formData.startDate ? formData.startDate.toISOString() : null,
        dueDate: formData.dueDate ? formData.dueDate.toISOString() : null,
        reminder: formData.reminder ? formData.reminder.toISOString() : null
      };
       dispatch(taskLoading());
      dispatch(createTaskAction(formattedFormData));
    }
  };

  return (
    <>
    
    <Backdrop isLoading={isLoading}/>
    <Dialog
      open={openCreateModal}
      onClose={handleCloseModal}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Create Task</DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <CreateTaskForm
            formData={formData}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            errors={errors} 
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button variant="contained" size="small" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default ScrollDialog;
