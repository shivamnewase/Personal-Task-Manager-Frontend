import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Grid, Box, Link, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {loginAction} from "../redux/actions/auth.action";
import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
const Login = () => {
   const dispatch  = useDispatch();
   const navigate = useNavigate();
   const initalState = {
   username:'',
   password:'',
  }
   const [formData, setFormData] = useState({...initalState});
   
   function handleLogin(e){
      e.preventDefault();
    const {name, value} = e.target;
    console.log("🚀 ~ handleLogin ~ name:", name)
    
   
    setFormData((prevData)=>{
     const updatedData = {
         ...prevData,
         [name]:value
     }
      return updatedData;
    })
   
   }
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      
      dispatch(loginAction(formData, navigate))
    }

   return (
    <Container maxWidth="lg" style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Grid container>
        {/* Left Side - Image */}
        <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img
            src="./login.jpg" // Replace with your image URL
            alt="Login"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </Grid>

        
        <Grid item xs={12} sm={6} sx={{ padding: 2, boxShadow: 3, backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{ width: '80%', maxWidth: 400 }}
          >
            <TextField
              id="outlined-basic-1"
              label="Username"
              name="username"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              onChange={handleLogin}
            />
            <TextField
              id="outlined-basic-2"
              label="Password"
              name="password"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              sx={{ mb: 1 }}
              onChange={handleLogin}
            />
            <Box mb={2} display="flex" flexDirection="column" alignItems="flex-end">
              <Link href="#" variant="body2" sx={{ color: 'text.secondary' }}>
                Reset Password
              </Link>
            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 1 }}
            >
              Login
            </Button>

            <Box mt={3} display="flex" flexDirection="column" alignItems="center">
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                Or login with
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: 120, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    startIcon={<img src="./google48.png" alt="Google" style={{ width: '24px', height: '24px' }} />}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ width: 120, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    startIcon={<img src="./facebook48.png" alt="Facebook" style={{ width: '24px', height: '24px' }} />}
                  >
                    Facebook
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
         
      
      </Grid>
    </Container>
  );
};

export default Login;
