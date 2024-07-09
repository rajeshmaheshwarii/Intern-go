import React, { useState,useEffect } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import AlertBox from '../Design/AlertBox'; // Import AlertBox component
import { useMediaQuery } from '@mui/material';
import Link from 'next/link';
import Header from "@/components/common/Header";
import { useRouter } from 'next/router'; // Import useRouter from Next.js

export default function RegisterForm({ isLoggedIn }) {
  const router = useRouter();
  const handleGoToLoginPage = () =>{
    router.push('/login')
  }
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [alertConfig, setAlertConfig] = useState({
    severity: 'info',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset alertConfig before validation
    setAlertConfig({
      severity: 'info',
      message: '',
    });

    // Validation logic
    if (userData.name === '' || userData.email === '' || userData.password === '' || userData.confirmPassword === '') {
      setAlertConfig({
        severity: 'warning',
        message: 'All fields are required',
      });
      return; // Exit early
    }
    if (userData.password !== userData.confirmPassword) {
      setAlertConfig({
        severity: 'error',
        message: 'Passwords do not match',
      });
      return; // Exit early
    }
    if (userData.password.length < 8) {
      setAlertConfig({
        severity: 'error',
        message: 'Password should be at least 8 characters long',
      });
      return; // Exit early
    }

    // If all validations pass, send data to backend
    try {
      const response = await fetch('http://10.201.0.169:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        setUserData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setAlertConfig({
          severity: 'success',
          message: 'Registration successful!',
        });
        // Optionally redirect to login page or handle as needed
      } else if (response.status === 409) {
        setAlertConfig({
          severity: 'error',
          message: 'User already registered. Please try logging in.',
        });
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      setAlertConfig({
        severity: 'error',
        message: 'Registration failed. Please try again later.',
      });
    }
  };


  const handleAlertClose = () => {
    setAlertConfig({
      ...alertConfig,
      message: '',
    });
  };

  useEffect(() => {
    // Check local storage for isLoggedIn value on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      const d = window.confirm("You are already registered user");
      if(d){
        router.push("/dashboard");
      }
      else{
        router.push("/"); 
      }
     
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Container component="main" maxWidth="lg" sx={{ height: '100vh' }}>
        <Box sx={{ paddingTop: 10 }}>
          <Grid container>
            <CssBaseline />
            {!isMobile && (
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Image src="/Login_Image.jpg" width={600} height={600} alt="Image" data-aos="fade-down" />
              </Grid>
            )}

            <Grid item xs={12} sm={8} md={5} component={Box} square>
              <Box
                sx={{
                  my: 8,
                  mx: isMobile ? 2 : 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#E9EBF7',
                  padding: '60px 40px',
                  borderRadius: '20px',
                }}
              >
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  {/* Render AlertBox component */}
                  <AlertBox
                    severity={alertConfig.severity}
                    message={alertConfig.message}
                    onClose={handleAlertClose}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    value={userData.name}
                    onChange={(e) => handleChange(e)}
                    name="name"
                    autoComplete="name"
                    // autoFocus
                    color="secondary"
                    size="small"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleChange(e)}
                    id="email"
                    autoComplete="email"
                    color="secondary"
                    size="small"
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={userData.password}
                    onChange={(e) => handleChange(e)}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    color="secondary"
                    size="small"
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={userData.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="confirm-password"
                    color="secondary"
                    size="small"
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mt: 3, mb: 2, fontSize: '16px' }}
                    data-aos="zoom-out"
                  >
                    Register
                  </Button>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <p>
                      Already have an account?{" "}
                      <span style={{ color: 'blue',cursor:"pointer" }} onClick={handleGoToLoginPage}>
                        Click here
                      </span>
                    </p>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
