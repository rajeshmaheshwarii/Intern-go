import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";

const SignInSide = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [UserName,setUserName] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGoToRegisterPage =()=>{
    router.push("/register")
  }
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://10.201.0.169:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("name", data.name); // Store user name from server
        localStorage.setItem("email", data.email);
        localStorage.setItem("userID",data.id);
        
        setIsLoggedIn(true);
        await router.push("/dashboard"); // Redirect to dashbaord page after successful login
      } else {
        const errorData = await response.json();
        setLoginError(errorData.message || "Incorrect username/password.");
        setIsLoggedIn(false); // Handle unsuccessful login
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setLoginError("Login failed. Please try again later.");
      setIsLoggedIn(false); // Handle unsuccessful login
    }

    // Reset form fields
    
  };

  useEffect(() => {
    document.title = "InternGo - Login";

    // Check local storage for isLoggedIn value on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      router.push("/Internships");
    }
  }, []);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Container component="main" maxWidth="lg" sx={{ height: "100vh" }}>
        <Box
          sx={{
            paddingTop: 10,
            flex: "1",
            display: "flex",
          }}
        >
          <Grid container>
            <CssBaseline />
            {!isMobile && (
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/Login_Image.jpg"
                  width={600}
                  height={600}
                  alt="Image"
                  data-aos="fade-down"
                />
              </Grid>
            )}

            <Grid item xs={12} sm={8} md={5} component={Box} square>
              <Box
                sx={{
                  my: 8,
                  mx: isMobile ? 2 : 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#E9EBF7",
                  padding: "60px 40px",
                  borderRadius: "20px",
                }}
              >
                <Typography component="h1" variant="h5">
                  Log In
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={userData.email}
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    color="secondary"
                    size="small"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    value={userData.password}
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    color="secondary"
                    size="small"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="secondary" />}
                    label="Remember me"
                  />
                  {loginError && (
                    <Typography variant="body2" color="error" align="center">
                      {loginError}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    size="small"
                    sx={{ mt: 3, mb: 2, fontSize: "16px" }}
                    data-aos="zoom-out"
                  >
                    Log In
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Link href="#">Forget Password?</Link>
                    <p>
                      Don't have an account?{" "}
                      <span style={{ color: "blue",cursor:"pointer" }} onClick={handleGoToRegisterPage}>
                        Click here{" "}
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
};

export default SignInSide;
