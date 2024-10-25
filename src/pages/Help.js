// Help.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: 'background.default',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Help & Support
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can find answers to common questions, guides, and support resources.
      </Typography>
      
      <Typography variant="h6" gutterBottom>
        Common Topics:
      </Typography>
      <Box sx={{ margin: 2 }}>
        <Typography variant="body2">1. How to create a new project?</Typography>
        <Typography variant="body2">2. Managing tasks and deadlines</Typography>
        <Typography variant="body2">3. User roles and permissions</Typography>
        <Typography variant="body2">4. Contacting support</Typography>
      </Box>
      
      <Typography variant="h6" gutterBottom>
        Contact Us:
      </Typography>
      <Typography variant="body2">
        For further assistance, please reach out to our support team:
      </Typography>
      <Typography variant="body2">Email: support@example.com</Typography>
      <Typography variant="body2">Phone: (123) 456-7890</Typography>

      <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
        FAQs:
      </Typography>
      <Box sx={{ margin: 2 }}>
        <Typography variant="body2">Q: How do I reset my password?</Typography>
        <Typography variant="body2">A: Go to the login page and click on "Forgot Password."</Typography>
        
        <Typography variant="body2">Q: Can I change my email address?</Typography>
        <Typography variant="body2">A: Yes, you can change your email address in your profile settings.</Typography>
        
        <Typography variant="body2">Q: How do I delete my account?</Typography>
        <Typography variant="body2">A: Please contact our support team for account deletion requests.</Typography>
      </Box>

      <Button variant="outlined" onClick={handleBack}>
        Go Back
      </Button>
    </Box>
  );
};

export default Help;
