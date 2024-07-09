import React, { useState, useEffect, useCallback } from "react";
import Style from "../styles/dashboard.module.css";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import DoneIcon from "@mui/icons-material/Done";
import Header from "@/components/common/Header";
import internshipsData from "@/data/courses";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [open, setOpen] = useState(false);
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userID") : null;
  const isLoggedIn =
    typeof window !== "undefined"
      ? localStorage.getItem("isLoggedIn") === "true"
      : false;

  const handleBacktoInternships = () => {
    router.push("/Internships");
  };

  const fetchUserInternships = useCallback(async () => {
    try {
      const response = await fetch(
        `http://10.201.0.169:5000/user_internships/${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userInternships = await response.json();
      const combinedData = userInternships.map((userInternship) => {
        const internshipDetails = internshipsData.find(
          (internship) => internship.id === userInternship.internship_Id
        );
        return {
          ...internshipDetails,
          ...userInternship,
        };
      });
      setInternships(combinedData);
    } catch (error) {
      console.error("Error fetching user internships:", error);
    }
  }, [userId]);

  const handleClickOpen = (internship) => {
    setSelectedInternship(internship);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInternship(null);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && isLoggedIn && userId) {
      fetchUserInternships();
    } else {
      const d = window.confirm("Login to access your dashboard");
      if (d) {
        router.push("/login");
      }
    }
  }, [fetchUserInternships, isLoggedIn, userId, router]);

  const handleMarkComplete = async () => {
    try {
      const response = await fetch(
        `http://10.201.0.169:5000/user_internships/${selectedInternship.internship_Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completion_date: new Date().toISOString().split("T")[0],
            userId: userId, // Include userId in the body
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Update locally in state
      setInternships((prevInternships) =>
        prevInternships.map((internship) =>
          internship.internship_Id === selectedInternship.internship_Id
            ? {
                ...internship,
                completion_date: new Date().toISOString().split("T")[0],
              }
            : internship
        )
      );
      handleClose();
    } catch (error) {
      console.error("Error marking internship as complete:", error);
    }
  };

  const joinedCount = internships.length;
  const completedCount = internships.filter(
    (internship) => internship.completion_date !== null
  ).length;
  const pendingCount = joinedCount - completedCount;

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: "70px", mb: 4, minHeight: "100vh" }}>
        <Typography variant="h5" gutterBottom sx={{ fontSize: "25px" }}>
          My Dashboard
        </Typography>
        <Grid container spacing={4} mt={2}>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Joined Internships
                </Typography>
                <Typography
                  variant="h3"
                  color="primary"
                  sx={{ color: "black" }}
                >
                  {joinedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ color: "green" }}
                >
                  Completed Internships
                </Typography>
                <Typography variant="h3" sx={{ color: "green" }}>
                  {completedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ color: "red" }}>
                  Pending Internships
                </Typography>
                <Typography variant="h3" color="error">
                  {pendingCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {internships.length === 0 ? (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" align="center">
                    No Internships Enrolled
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mt: 2 }}
                  >
                    You have not enrolled in any internships yet. Explore our
                    internships and join to get started!
                  </Typography>
                  <Box sx={{ textAlign: "center", mt: 5 }}>
                    <p
                      className={Style.backButton}
                      onClick={handleBacktoInternships}
                    >
                      <BackIcon sx={{ mr: "5px" }} /> Back to Internships
                    </p>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            internships.map((internship) => (
              <Grid item key={internship.internship_Id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={internship.img}
                    alt={internship.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {internship.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {internship.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Joined on:{" "}
                      {new Date(internship.join_date).toLocaleDateString()}
                    </Typography>
                    {internship.completion_date ? (
                      <Chip
                        label={`Completed on  ${new Date(
                          internship.completion_date
                        ).toLocaleDateString()}`}
                        color="success"
                        sx={{ mt: 1 }}
                      />
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ mt: 1, backgroundColor: "#0056b3" }}
                        onClick={() => handleClickOpen(internship)}
                      >
                        Mark as Complete{" "}
                        <DoneIcon sx={{ fontSize: "20px", pl: "5px" }} />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Mark as Complete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to mark this internship as complete?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleMarkComplete}
              color="secondary"
              variant="contained"
            >
              Confirm
            </Button>
            <Button onClick={handleClose} color="error" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Dashboard;
