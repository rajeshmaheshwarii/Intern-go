import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import Style from "@/styles/applyform.module.css";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import {
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import terms from "@/data/terms.js"; // Assuming you have imported your terms array correctly

const ApplyForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const {
    title,
    category,
    price,
    durationWeek,
    certificate,
    description,
    img,
    id,
  } = router.query;

  const [internshipData, setInternshipData] = useState({
    user_Id: null,
    internship_Id: null,
    join_date: new Date().toISOString().split("T")[0],
    completion_date: null,
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [joiningMessage, setJoiningMessage] = useState({
    message: "",
    isAlreadyJoined : false,
  });

  const handleCloseJoiningMessage = () => {
    setOpenDialog(false);
  };

  const handleOkClick = () => {
    setOpenDialog(false);
    if(joiningMessage.isAlreadyJoined){
      router.push("/Internships");
    }
    else{
      router.push("/dashboard");
    }
       
  
  };

  const handleSubmitInternship = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/user_internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(internshipData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setJoiningMessage({
            message: `You've already joined the ${title} internship program.`,
            isAlreadyJoined : true,
          });
          setOpenDialog(true); // Open the dialog for the already joined message
        } else {
          throw new Error(errorData.error || "Failed to store internship data");
        }
      } else {
        setJoiningMessage({
          message: `Congratulations! You're now part of the ${title} internship program.`,
          isAlreadyJoined : false,
        });
        setOpenDialog(true); // Open the dialog for the successful join message
      }
    } catch (error) {
      setJoiningMessage({
        message: "Something went wrong while joining the internship",
      });
      setOpenDialog(true); // Open the dialog for the error message
    }
  }, [internshipData, title]);

  const handleTermsToggle = useCallback(() => {
    setTermsChecked((prev) => !prev);
    if (!termsChecked) {
      setShowModal(true);
    }
  }, [termsChecked]);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const handleProceedToPayment = useCallback(() => {
    setTermsChecked(true);
    setShowModal(false);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      handleSubmitInternship();
    },
    [handleSubmitInternship]
  );

  useEffect(() => {
    const userId = parseInt(localStorage.getItem("userID"), 10);
    if (userId) {
      setInternshipData((prevData) => ({ ...prevData, user_Id: userId }));
    }
  }, []);

  useEffect(() => {
    const internshipId = parseInt(id, 10);
    if (internshipId) {
      setInternshipData((prevData) => ({
        ...prevData,
        internship_Id: internshipId,
      }));
    }
  }, [id]);

  return (
    <>
      <Header />
      <Box className={Style.Container}>
        <Box className={Style.ApplyForm}>
          <Box className={Style.BackToInternship} onClick={() => router.back()}>
            <p>
              <BackIcon sx={{ paddingRight: "5px" }} />
              Back to Internships
            </p>
          </Box>
          <Box className={Style.InternshipTitle}>
            <Typography variant="h5">{title} Intern</Typography>
          </Box>
          <Box sx={{ width: "100%", marginTop: 2 }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <CardMedia
                component="img"
                src={img}
                alt="Course image"
                sx={{ width: isMobile ? "100%" : "40%", height: "auto" }}
              />
              <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="body2" sx={{ textAlign: "justify" }}>
                  {description}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body1">
                    <strong>Category:</strong> {category}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Price:</strong> {price < 1 ? "Free" : price}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Duration:</strong> {durationWeek} weeks
                  </Typography>
                  <Typography variant="body1">
                    <strong>Certificate:</strong> {price < 1 ? "No" : "Yes"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ mt: 5 }}>
              {price > 1 && (
                <Box sx={{ mt: 5 }}>
                  <h2>Net Payable Amount {price}/-</h2>
                </Box>
              )}
              {!termsChecked && (
                <Typography variant="body1" color="error" sx={{ mt: 2 }}>
                  Please accept terms & conditions to proceed.
                </Typography>
              )}

              <Typography variant="body1" sx={{ mt: 3 }}>
                <strong>
                  Terms & Conditions{" "}
                  <Checkbox
                    color="secondary"
                    checked={termsChecked}
                    onChange={handleTermsToggle}
                    inputProps={{ "aria-label": "terms checkbox" }}
                  />
                </strong>
              </Typography>

              <Modal
                open={showModal}
                onClose={handleCloseModal}
                aria-labelledby="terms-modal-title"
                aria-describedby="terms-modal-description"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    width: "90%",
                    maxWidth: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    maxHeight: "60vh",
                    overflowY: "auto",
                    margin: "auto",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                >
                  <Box sx={{ marginBottom: 2 }}>
                    <Typography
                      id="terms-modal-title"
                      variant="h6"
                      gutterBottom
                    >
                      Terms & Conditions
                    </Typography>
                  </Box>
                  <Box sx={{ maxHeight: "40vh", overflowY: "auto" }}>
                    <List>
                      {terms.map((term, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={`${index + 1}. ${term}`} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{ textAlign: "center", mt: 2 }}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleProceedToPayment}
                    >
                      Agree
                    </Button>
                  </Box>
                </Box>
              </Modal>

              {price < 1 && termsChecked && (
                <Box sx={{ mt: 5, textAlign: "center" }}>
                  <Typography variant="h6">Free Internship</Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    Join this internship for free!
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmitInternship}
                    sx={{ mt: 2 }}
                  >
                    Join Now
                  </Button>
                </Box>
              )}

              {price > 0 && termsChecked && (
                <Box sx={{ mt: 5 }}>
                  <Typography variant="h6">Payment Information</Typography>
                  <form onSubmit={handleSubmit}>
                    <TextField
                      label="Card Number"
                      fullWidth
                      variant="filled"
                      color="secondary"
                      margin="normal"
                      type="number"
                      name="cardNumber"
                      required
                      inputProps={{ maxLength: 16 }}
                    />
                    <TextField
                      label="Expiry Date"
                      fullWidth
                      variant="filled"
                      color="secondary"
                      type="number"
                      margin="normal"
                      name="expiryDate"
                      required
                      inputProps={{ maxLength: 5 }}
                      placeholder="MM/YY"
                    />
                    <TextField
                      label="CVV"
                      fullWidth
                      variant="filled"
                      margin="normal"
                      color="secondary"
                      name="cvv"
                      type="number"
                      required
                      inputProps={{ maxLength: 3 }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{ mt: 2 }}
                    >
                      Pay & Join
                    </Button>
                  </form>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Dialog
          open={openDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {joiningMessage.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleOkClick}
              color="primary"
              variant="contained"
            >
              {joiningMessage.isAlreadyJoined ? "Ok" : "Dashboard"}
            </Button>
            <Button
              onClick={handleCloseJoiningMessage}
              color="error"
              variant="contained"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default ApplyForm;
