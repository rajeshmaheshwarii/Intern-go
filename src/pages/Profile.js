import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AlertBox from "@/components/Design/AlertBox";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import Style from "@/styles/editprofile.module.css";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import dropdowns from "@/data/dropdowns";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const Profile = () => {
  const { fieldsOfStudy, educationStatuses, indianStates } = dropdowns;
  const router = useRouter();
  const [formData, setFormData] = useState({
    userId: "",
    howDidYouHear: "",
    countryRegion: "",
    firstName: "",
    lastName: "",
    phoneCode: "",
    mobileNumber1: "",
    mobileNumber2: "",
    emailAddress: "",
    githubLink: "",
    linkedinLink: "",
    educationStatus: "",
    collegeName: "",
    degree: "",
    fieldOfStudy: "",
    passingYear: "",
    state: "",
  });

  const [updateMessage, setUpdateMessage] = useState({
    severity: "info",
    message: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFirstName = localStorage.getItem("name");
      const storedEmail = localStorage.getItem("email");
      const storedUserId = parseInt(localStorage.getItem("userID"), 10);

      setFormData((prevFormData) => ({
        ...prevFormData,
        userId: storedUserId || "",
        firstName: storedFirstName || "",
        emailAddress: storedEmail || "",
      }));

      if (storedUserId) {
        fetchUserData(storedUserId);
      }
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://10.201.0.169:5000/profile/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...data,
        firstName: prevFormData.firstName,
        emailAddress: prevFormData.emailAddress,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCloseUpdateMessage = () => {
    setUpdateMessage({
      ...updateMessage,
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting formData:', formData);
    console.log("userId--", typeof(formData.userId)) 

    try {
      const { userId } = formData;
      const url = `http://10.201.0.169:5000/profile/${userId}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile data');
      }

      const responseData = await response.json();
      setUpdateMessage({
        severity: 'success',
        message: responseData.message,
      });
    } catch (error) {
      console.error('Error saving/updating user profile data:', error);
      setUpdateMessage({
        severity: 'error',
        message: 'Error updating profile. Please try again later.',
      });
    }
  };

  useEffect(() => {
    const isLogin = localStorage.getItem("isLoggedIn");
    const userID = localStorage.getItem("userID");
    if (!(isLogin === "true" && userID)) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Header />
      <Box className={Style.Container}>
        <Box className={Style.EditProfile}>
          <Typography variant="h3" className={Style.ProfileHeading}>
            My Profile
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Information Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Personal Information</Typography>
                <TextField
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  InputProps={{ readOnly: true }}
                  color="secondary"
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  color="secondary"
                />
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                >
                  <InputLabel>Country/Region</InputLabel>
                  <Select
                    name="countryRegion"
                    value={formData.countryRegion}
                    onChange={handleChange}
                    label="Country/Region"
                  >
                    <MenuItem value="India">India</MenuItem>
                    <MenuItem value="Canada">Canada</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                >
                  <InputLabel>How Did You Hear About Us?</InputLabel>
                  <Select
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                    label="How Did You Hear About Us?"
                  >
                    <MenuItem value="Friend">Friend</MenuItem>
                    <MenuItem value="Social Media">Social Media</MenuItem>
                    <MenuItem value="Advertisement">Advertisement</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>

              {/* Contact Information Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Contact Information</Typography>
                <TextField
                  label="Email Address"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="emailAddress"
                  value={formData.emailAddress}
                  InputProps={{ readOnly: true }}
                  color="secondary"
                />
                <TextField
                  label="Phone Code"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                  color="secondary"
                />
                <TextField
                  label="Mobile Number 1"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="mobileNumber1"
                  value={formData.mobileNumber1}
                  onChange={handleChange}
                  color="secondary"
                />
                <TextField
                  label="Mobile Number 2"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="mobileNumber2"
                  value={formData.mobileNumber2}
                  onChange={handleChange}
                  color="secondary"
                />
              </Grid>

              {/* Education Details Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Education Details</Typography>

                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                >
                  <InputLabel>Education Status</InputLabel>
                  <Select
                    name="educationStatus"
                    value={formData.educationStatus}
                    onChange={handleChange}
                    label="Education Status"
                    MenuProps={MenuProps}
                  >
                    {educationStatuses.map((education, index) => (
                      <MenuItem key={index} value={education.value}>
                        {education.label}
                      </MenuItem>
                    ))}
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <TextField
                  label="College Name"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  color="secondary"
                />

                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                >
                  <InputLabel>Field of Study</InputLabel>
                  <Select
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    label="Education Status"
                    MenuProps={MenuProps}
                  >
                    {fieldsOfStudy.map((field, index) => (
                      <MenuItem key={index} value={field.value}>
                        {field.label}
                      </MenuItem>
                    ))}
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>

                <TextField
                  label="Degree"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  color="secondary"
                />

                <TextField
                  label="Passing Year"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="passingYear"
                  value={formData.passingYear}
                  onChange={handleChange}
                  color="secondary"
                />
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  color="secondary"
                >
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    label="State"
                    MenuProps={MenuProps}
                  >
                    {indianStates.map((state, index) => (
                      <MenuItem key={index} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>

              {/* Links Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Links</Typography>
                <TextField
                  label="GitHub Link"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                  color="secondary"
                />
                <TextField
                  label="LinkedIn Link"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="linkedinLink"
                  value={formData.linkedinLink}
                  onChange={handleChange}
                  color="secondary"
                />
              </Grid>

              {/* Button Section */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="secondary">
                  Save Profile
                </Button>
              </Grid>
            </Grid>
          </form>
          {updateMessage.message && (
            <AlertBox
              severity={updateMessage.severity}
              message={updateMessage.message}
              onClose={handleCloseUpdateMessage}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
