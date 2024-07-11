import React, { useState, useEffect } from "react";
import { memo } from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import Drawer from "@mui/material/Drawer";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import Style from "../../styles/header.module.css";
import Image from "next/image";
import AccountMenu from "../Design/AccountMenu";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const router = useRouter();
  console.log("header rendered")
  useEffect(() => {
    // Check local storage for isLoggedIn value on component mount
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Handle logout action
    setIsLoggedIn(false); // Update state
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("userID");
    
    router.push("/login"); // Redirect to login page or homepage as needed
  };

  const handleProfileClick = () => {
    router.push("/profile"); // Navigate to profile page
  };

  const handleDashboardClick = () => {
    router.push("/dashboard"); // Navigate to dashboard page
  };

  const headermenu = ["Home", "Internships", isLoggedIn ? "" : "Login", isLoggedIn ? "" : "Register"];

  const Navigationpage = ["/", "/Internships", isLoggedIn ? "/" : "/login", isLoggedIn ? "/" : "/register"];

  const isMobile = useMediaQuery("(max-width:600px)");
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box>
        <Box className={Style.headerContainer}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Image
              src="/logo.png"
              width={180} // Default width
              height={40} // Let the height adjust proportionally
              sx={{
                width: { xs: 150, sm: 250, xl: 350 }, // Set width based on breakpoint
                height: { xs: 30, sm: 40, xl: 50 }, // Set height based on breakpoint
              }}
              alt="Logo"
              onClick={()=> router.push("/")}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "30px" }}>
            {isMobile && (
              <MenuIcon onClick={toggleDrawer(true)} fontSize="large" />
            )}
            {!isMobile &&
              headermenu.map((menu, index) => (
                menu && (
                  <Typography
                    key={menu}
                    className={Style.menu}
                    onClick={() => router.push(Navigationpage[index])}
                    variant="h6"
                  >
                    {menu}
                  </Typography>
                )
              ))}
            {!isMobile && isLoggedIn && <AccountMenu onLogout={handleLogout} onProfileClick={handleProfileClick} onDashboardClick={handleDashboardClick} />}
          </Box>
        </Box>
      </Box>

      {/* Mobile Menu */}
      <Box>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box
            sx={{
              backgroundColor: "#690684",
              height: "60px",
              color: "white",
              padding: "10px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <CloseIcon
              fontSize="large"
              onClick={toggleDrawer(false)}
              sx={{ cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              paddingTop: "20px",
              backgroundColor: "#690684",
              height: "100vh",
              width: "200px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            <Box sx={{ paddingLeft: "10px" }}>
              {headermenu.map((menu, index) => (
                menu && (
                  <Typography
                    key={menu}
                    className={`${Style.mobileMenu} ${Style.menu}`}
                    onClick={() => router.push(Navigationpage[index])}
                    variant="body1"
                  >
                    {menu}
                  </Typography>
                )
              ))}
              {isLoggedIn && <AccountMenu  onLogout={handleLogout} onProfileClick={handleProfileClick} onDashboardClick={handleDashboardClick} />}
            </Box>
            <Box></Box>
            <Box className={Style.MobileHeaderSocialContainer}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Follow us on
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Link href="https://www.x.com/" target="_blank">
                  <XIcon sx={{ fontSize: "26px", color: "black" }} />
                </Link>
                <Link href="https://www.facebook.com/" target="_blank">
                  <FacebookIcon sx={{ fontSize: "30px" }} color="info" />
                </Link>
                <Link href="https://www.linkedin.com/" target="_blank">
                  <LinkedInIcon sx={{ fontSize: "30px" }} color="primary" />
                </Link>
                <Link href="https://www.instagram.com/" target="_blank">
                  <InstagramIcon sx={{ fontSize: "30px" }} color="error" />
                </Link>
              </Box>
            </Box>
          </Box>
        </Drawer>
      </Box>
      </>
)}
export default Header;