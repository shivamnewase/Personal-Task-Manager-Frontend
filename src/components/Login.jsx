import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container, Grid, Box, Link, Typography } from "@mui/material";
import {useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initalState = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState({ ...initalState });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleLogin(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      return updatedData;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginAction(formData, navigate));
   
  };

  return (
    
      <Container
        maxWidth="lg"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid >
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              boxShadow: 3,
              backgroundColor: "background.default",
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              autoComplete="off"
              sx={{ width: "80%", maxWidth: 400 }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  
                }}
              >
                <img
                  src="/task-removebg.png" // Ensure this path is correct
                  alt="task logo"
                  style={{ width: "100%", height: "210px", objectFit: "cover" }}
                />
              </Box>
              <TextField
                id="outlined-basic-1"
                label="Username"
                name="username"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mb: 3 }}
                onChange={handleLogin}
              />
               <TextField
      id="outlined-basic-2"
      label="Password"
      name="password"
      variant="outlined"
      size="small"
      type={showPassword ? 'text' : 'password'}
      fullWidth
      sx={{ mb: 2 }}
      onChange={handleLogin} // Replace with your actual handler
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <i style={{fontSize:'14px'}} className="fa-sharp-duotone fa-solid fa-eye-slash"></i> : <i style={{fontSize:'14px'}} className="fa-sharp-duotone fa-solid  fa-eye"></i> }
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
              <Box mb={1} display="flex" flexDirection="column" alignItems="flex-end">
                <Link href="#" variant="body2" sx={{ color: "text.secondary" }}>
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
                <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                  Or login with
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        width: 120,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      startIcon={
                        <img
                          src="/google48.png" // Ensure this path is correct
                          alt="Google"
                          style={{ width: "24px", height: "24px" }}
                        />
                      }
                    >
                      Google
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{
                        width: 120,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      startIcon={
                        <img
                          src="/facebook48.png" // Ensure this path is correct
                          alt="Facebook"
                          style={{ width: "24px", height: "24px" }}
                        />
                      }
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
  )
};

export default Login;
