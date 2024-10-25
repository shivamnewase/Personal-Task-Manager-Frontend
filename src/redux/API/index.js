import axios from 'axios';

// Create an Axios instance with default configuration
export const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND, // Ensure this environment variable is set
  headers: {
    'Content-Type': 'application/json',
    'x-api-version': '1.0.0',
  },
});

// Function to set the Authorization header for authenticated requests
export const setAuthenticate = (token) => {
  API.interceptors.request.use((config) => {
    if (token) {
      console.log("🚀 ~ API.interceptors.request.use ~ token:", token)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

// Example API call
export const login = (body) => API.post('/test/login', body);

//========================= User ========================//
export const getUsersList = () => API.get('/test/getUsers');


//=========================tasks ========================//

export const createTask = (body)=> API.post('/test/creatTask', body);

export const getTask = ()=> API.get('/test/taskList');

export const getProjectList = ()=> API.get('/project/projectList');

export const updateTask = (body)=> API.post(`/test/updateTask`,body)

export const deleteTask = (body)=> API.post(`/test/deleteTask`,body)


//========================= Project ========================//

export const showProjectList = ()=> API.get('/project/showProject');
// showProject

export const findProjectList = (body)=>API.post('/project/projectFind', body);

export const createProject = (body) => API.post('/project/create', body)

export const getGraphDetails = (body) =>API.post('/graph/graphDetails',body)

export const getBarGraphDetails = (body)=>API.post('/graph/barGraph',body)
