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
import Image from 'next/image';

export default function SignInSide() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
         paddingTop:10,
        
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image src='/Login_Image.jpg' width={700} height={400} />
              </Grid>
          )}
            
           
            
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Box}
            // elevation={6}
            square
            
          >
            <Box
              sx={{
                my: 8,
                mx: isMobile ? 2 : 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor:'#E9EBF7',
                padding:'60px 40px',
                borderRadius:'20px'
              }}
            >
              <Typography component="h1" variant="h5">
                Log In
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
                
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  color="secondary"
                  size="small"
                 
                  
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
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
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="small"
                  sx={{ mt: 3, mb: 2, fontSize:'20px'}}
                >
                  Sign In
                </Button>
               <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',gap:'5px'}}>
                  <Link href="#">
                    Forget Password?
                  </Link>
                  <Link href="#">
                  Don't have an account? <span style={{color:'black'}} href="google.com"> Click here </span>
                  </Link>
               </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}