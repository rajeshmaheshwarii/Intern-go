import React, { useState } from "react";
import Style from "../../styles/footer.module.css";
import { Box, Divider, TextField, IconButton } from "@mui/material";
import Image from "next/image";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import AddressIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";

function Footer() {
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    if (email === "") alert("Email required");
    else {
      alert(`Received email for newsletter is ${email}`);
      setEmail("");
    }
  };

  return (
    <>
      <Box className={Style.footer}>
        {/* Footer Column 1 */}
        <Box className={`${Style.footerCol} ${Style.footerCol_1}`}>
          <Image
            src="/logo.png"
            width={180} // Default width
            height={40} // Let the height adjust proportionally
            alt="Logo"
            sx={{
              width: { xs: 150, sm: 250, xl: 350 }, // Set width based on breakpoint
              height: { xs: 30, sm: 40, xl: 50 }, // Set height based on breakpoint
            }}
          />
          <p>
            Choose InternGo for industry-leading IT internships that provide
            superior experience and growth opportunities. Set the standard with
            us.
          </p>
        </Box>

        {/* Footer Column 2 */}
        <Box className={`${Style.footerCol} ${Style.footerCol_2}`}>
          <Box className={Style.footerTitle}>
            <p>Contact</p>
            <Divider className={Style.FooterTitleDivider} />
          </Box>
          <Box className={Style.footerNavigations}>
            <ul>
              <li>
                <AddressIcon />
                <p>
                  Main Road, Bhuj-Kachchh
                  <br />
                  Gujarat, PIN 370001
                  <br />
                  India.
                </p>
              </li>
              <li>
                <EmailIcon />
                <a
                  href="mailto:support@interngo.com"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  support@interngo.com
                </a>
              </li>
              <li>
                <PhoneIcon />
                <a
                  href="tel:1234567890"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  1234567890
                </a>
              </li>
            </ul>
          </Box>
        </Box>

        {/* Footer Column 3 */}
        <Box className={`${Style.footerCol} ${Style.footerCol_3}`}>
          <Box className={Style.footerTitle}>
            <p>Navigation</p>
            <Divider className={Style.FooterTitleDivider} />
          </Box>
          <Box className={Style.footerNavigations}>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Testimonial</li>
              <li>Support</li>
              <li>Terms & Conditions</li>
            </ul>
          </Box>
        </Box>

        {/* Footer Column 4 */}
        <Box className={`${Style.footerCol} ${Style.footerCol_4}`}>
          <Box className={Style.footerTitle}>
            <p>Newsletter</p>
            <Divider className={Style.FooterTitleDivider} />
          </Box>
          <Box sx={{ width: "100%" }}>
            {" "}
            {/* Ensure full width container */}
            <TextField
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSubmit} edge="end">
                      <SendIcon sx={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: "white" }, // Sets text color to white
                sx: { "& ::placeholder": { color: "white" } },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { border: "2px solid white" }, // Sets border color to white
                  "&:hover fieldset": { borderColor: "white" },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <a
                href="https://www.x.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XIcon
                  sx={{ fontSize: "26px", color: "black" }}
                  className={Style.footerIcons}
                />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon
                  sx={{ fontSize: "30px", color: " #1877F2" }}
                  className={Style.footerIcons}
                />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon
                  sx={{ fontSize: "30px", color: "#0A66C2" }}
                  className={Style.footerIcons}
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon
                  sx={{ fontSize: "30px", color: " red" }}
                  className={Style.footerIcons}
                />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#280934",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          color: "white",
          padding: "20px 100px",
        }}
        className={Style.copyrightcontainer}
      >
        <p>InternGo © 2024 - All Rights Reserved </p>
      </Box>
    </>
  );
}

export default Footer;
