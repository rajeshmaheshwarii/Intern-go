import React, { useState, useEffect } from "react";
import courses from "../data/courses.js";
import Snackbar from "@mui/material/Snackbar";
import Filter from "@/components/utils/Filter";
import Style from "../styles/commoncss.module.css";
import { useRouter } from 'next/router';
import Header from "@/components/common/Header";
import {
  useMediaQuery,
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CertificateIcon from "@mui/icons-material/CardMembership";
import Image from "next/image.js";

function Internships() {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:961px)");
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackbarMessage] = useState(null);
  const [finalCourses, setFinalCourses] = useState(courses);
  const [courseFound, setCourseFound] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const handleApplyInternship = (course) => {
    if (localStorage.getItem("isLoggedIn")) {
      router.push({
        pathname: "/Apply",
        query: {
          title: course.title,
          id: course.id,
          category: course.category,
          price: course.price,
          durationWeek: course.durationWeek,
          certificate: course.certificate,
          description: course.description,
          img: course.img,
        },
      });
    } else {
      setOpenDialog(true);
    }
  };

  const isCourseAvailable = (filteredCourses) => {
    if (filteredCourses.length > 1) {
      setFinalCourses(filteredCourses);
      setCourseFound(true);
    } else {
      setCourseFound(false);
    }
  };

  const handleFilterChange = (category, price) => {
    const filteredCourses = courses.filter(
      (course) =>
        (category === "All" || course.category === category) &&
        (price === "Free" ? course.price < 1 : course.price > 1)
    );
    console.log(`Category-> ${category} Price-> ${price}`);
    setFinalCourses(filteredCourses);
    setCourseFound(filteredCourses.length > 0);
  };

  useEffect(() => {
    console.log(courseFound);
    document.title = "InternGo - Internships";
  }, [courseFound]);

  return (
    <>
      <Header />
      <Box
        sx={{
          marginTop: "60px",
          padding: "20px 30px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isSmallScreen ? "column" : "row",
          }}
        >
          <Box>
            <Typography sx={{ fontSize: isSmallScreen ? "25px" : "30px" }}>
              Available Internships
            </Typography>
            <Divider
              sx={{
                width: "50px",
                backgroundColor: "red",
                height: "2px",
                borderRadius: "50px",
              }}
            />
          </Box>
          <Box sx={{ mt: isSmallScreen && "20px" }}>
            <Filter course={courses} handleFilterChange={handleFilterChange} />
          </Box>
        </Box>

        {!courseFound && (
          <Box sx={{ textAlign: "center", marginTop: "50px" }}>
            <Image
              src={"/course_not_found.png"}
              width={200}
              height={100}
              alt="Course not found"
              data-aos="zoom-in"
            />
          </Box>
        )}

        <Grid container spacing={4} sx={{ marginTop: "20px", marginBottom: "50px" }}>
          {finalCourses.map((course, index) => (
            <Grid
              item
              xs={12}
              sm={isLargeScreen ? 4 : isSmallScreen ? 12 : 6}
              md={3}
              key={index}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "#F1EAFF",
                }}
              >
                <CardActionArea>
                  <Typography
                    sx={{
                      position: "absolute",
                      top: "0",
                      zIndex: "1",
                      backgroundColor: "#EF2F31",
                      padding: "0 10px",
                      color: "white",
                    }}
                  >
                    {course.category}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <CardMedia
                      component="img"
                      src={course.img}
                      alt="Image"
                      sx={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {course.title}
                      </Typography>
                      <Typography variant="body2" sx={{ textAlign: "justify" }}>
                        {course.description}
                      </Typography>
                      <Box
                        sx={{
                          marginTop: "10px",
                          display: "flex",
                          gap: "15px",
                          flexWrap: "wrap",
                        }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "#3F2846",
                            padding: "0px 5px",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                            }}
                          >
                            <CurrencyRupeeIcon
                              sx={{ paddingRight: "3px", fontSize: "14px" }}
                            />
                            {course.price < 1 ? "Free" : course.price}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#3F2846",
                            padding: "0px 5px",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                            }}
                          >
                            <AccessTimeIcon
                              sx={{ paddingRight: "3px", fontSize: "14px" }}
                            />
                            {course.durationWeek + " weeks"}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            backgroundColor: "#3F2846",
                            padding: "0px 5px",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "14px",
                            }}
                          >
                            <CertificateIcon
                              sx={{ paddingRight: "3px", fontSize: "14px" }}
                            />
                            {course.certificate ? "Certificate" : "No certificate"}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                </CardActionArea>
                <CardActions sx={{ marginTop: "auto" }}>
                  <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#5D3587",
                      "&:hover": {
                        backgroundColor: "#392467",
                      },
                    }}
                    onClick={() => handleApplyInternship(course)}
                  >
                    Apply
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login Required"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Please log in to your account to proceed with applying for the internship
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => router.push("/login")} color="primary" variant="contained">
            Login
          </Button>
          <Button onClick={() => setOpenDialog(false)} color="error" variant="contained" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Internships;
