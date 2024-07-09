import React from 'react';
import { Box, Button, Divider, InputLabel, MenuItem, Select, TextField, Typography, FormControl } from '@mui/material';

const Step1 = ({ formData, handleChange }) => (
  <Box>
    <TextField
      name="howDidYouHear"
      label="How Did You Hear About Us?"
      variant="outlined"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.howDidYouHear}
      onChange={handleChange}
    />
    <TextField
      name="countryRegion"
      label="Country/Region"
      required
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mb: 2 }}
      value={formData.countryRegion}
      onChange={handleChange}
    />
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" color="Black" sx={{ mb: 1 }}>Name</Typography>
    <TextField
      name="firstName"
      label="First Name"
      variant="outlined"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.firstName}
      onChange={handleChange}
    />
    <TextField
      name="firstName"
      label="Last Name"
      variant="outlined"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.lastName}
      onChange={handleChange}
    />
   
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" color="Black" sx={{ mb: 1 }}>Contact Details</Typography>
    <TextField
      name="phoneCode"
      label="Country/Region Phone Code"
      required
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mb: 2 }}
      value={formData.phoneCode}
      onChange={handleChange}
    />
    <TextField
      name="mobileNumber1"
      label="Mobile Number"
      required
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mb: 2 }}
      value={formData.mobileNumber1}
      onChange={handleChange}
    />
    <TextField
      name="mobileNumber2"
      label="Mobile Number"
      required
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mb: 2 }}
      value={formData.mobileNumber2}
      onChange={handleChange}
    />
    <TextField
      name="emailAddress"
      label="Email Address"
      variant="outlined"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.emailAddress}
      onChange={handleChange}
    />
    <Divider sx={{ my: 2 }} />
    <Typography variant="h6" color="Black" sx={{ mb: 1 }}>Profile Links</Typography>
    <TextField
      name="githubLink"
      label="GitHub Profile Link"
      required
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mb: 2 }}
      value={formData.githubLink}
      onChange={handleChange}
    />
    <TextField
      name="linkedinLink"
      label="LinkedIn Profile Link"
      required
      variant="outlined"
      color="secondary"
      fullWidth
      sx={{ mb: 2 }}
      value={formData.linkedinLink}
      onChange={handleChange}
    />
  </Box>
);

const Step2 = ({ formData, handleChange }) => (
  <Box>
    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel htmlFor="education-status">Education Status</InputLabel>
      <Select
        id="education-status"
        name="educationStatus"
        value={formData.educationStatus}
        onChange={handleChange}
        variant="outlined"
        required
      >
        <MenuItem value="PG">PG</MenuItem>
        <MenuItem value="UG">UG</MenuItem>
        <MenuItem value="Diploma">Diploma</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>

    <TextField
      name="collegeName"
      label="College Name"
      variant="outlined"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.collegeName}
      onChange={handleChange}
    />

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel htmlFor="degree">Degree</InputLabel>
      <Select
        id="degree"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        variant="outlined"
        required
      >
        <MenuItem value="Bachelor of Science">Bachelor of Science</MenuItem>
        <MenuItem value="Bachelor of Arts">Bachelor of Arts</MenuItem>
        <MenuItem value="Master of Science">Master of Science</MenuItem>
        <MenuItem value="Master of Arts">Master of Arts</MenuItem>
        <MenuItem value="Ph.D.">Ph.D.</MenuItem>
        <MenuItem value="Diploma">Diploma</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel htmlFor="field-of-study">Field of Study</InputLabel>
      <Select
        id="field-of-study"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
        onChange={handleChange}
        variant="filled"
        required
      >
        <MenuItem value="Computer Science">Computer Science</MenuItem>
        <MenuItem value="Engineering">Engineering</MenuItem>
        <MenuItem value="Business Administration">Business Administration</MenuItem>
        <MenuItem value="Psychology">Psychology</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>

    <TextField
      name="passingYear"
      label="Passing Year/Expected Year"
      variant="filled"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.passingYear}
      onChange={handleChange}
    />

    <TextField
      name="state"
      label="State"
      variant="outlined"
      color="secondary"
      required
      fullWidth
      sx={{ mb: 2 }}
      value={formData.state}
      onChange={handleChange}
    />
  </Box>
);

const Step3 = ({ formData, handleFileChange }) => (
  <Box>
    <Typography variant="h6" color="black" sx={{ mb: 2 }}>
      Upload Resume
    </Typography>
    <Button variant="contained" component="label" color="secondary">
      Upload File
      <input
        type="file"
        hidden
        onChange={handleFileChange}
      />
    </Button>
   
  </Box>
);

const Step4 = () => (
  <div>
    Additional Details Form or Content
  </div>
);

const Step5 = () => (
  <div>
    Terms & Conditions Form or Content
  </div>
);

const Step6 = () => (
  <div>
    Review Form or Content
  </div>
);

export { Step1, Step2, Step3, Step4, Step5, Step6 };