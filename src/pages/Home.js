import { Box, Button, Divider, Grid } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import successStories from "@/data/successStories";
import Technology from "./Technology";
import Link from 'next/link';
import SuccessStory from "@/components/Design/successStory";
import Header from "@/components/common/Header"
import { useRouter } from 'next/router';
function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    setIsMounted(true);
    console.warn(successStories);
    document.title = "InternGo - Home"
  }, []);

  if (!isMounted) {
    // Render nothing or a loading spinner until the component mounts
    return null;
  }

  const handleExploreButton = () =>{
    router.push("/Internships")
  }

  return (
    <>
    <Header />
      <Box
        sx={{
          paddingTop: "40px",
          minHeight:"100vh",
        }}
      >
        <Grid
          container
          sx={{
            marginTop: isSmallScreen ? "2rem" : "10rem",
            paddingBottom: "20px",
          }}
        >
          <Grid item sm={6} xs={12} sx={{ padding: "20px 30px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Box sx={{ fontSize: isSmallScreen ? "24px" : "40px" }}>
                <h3
               
                  style={{ letterSpacing: "1px" }}
                >
                  Exploring Internship Options?
                  <span style={{ color: "red" }}>
                    {!isSmallScreen && <br />} Start{" "}
                  </span>{" "}
                  Here!
                </h3>
              </Box>
          
              <Box
                sx={{
                  fontSize: isSmallScreen ? "20px" : "24px",
                  fontFamily: "sans-serif",
                }}
              >
                <p
                 
                  style={{ lineHeight: isSmallScreen ? "22px" : "28px" }}
                >
                  Join our competitive internship program and gain real-world
                  experience in your field. Work alongside industry
                  professionals, develop your skills, and make valuable
                  connections. Apply today and take the first step towards a
                  successful career.
                </p>
              </Box>
              <Box data-aos="fade-right">
               
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleExploreButton}
                  >
                    Explore Now
                  </Button>
              
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box  >
              <Image
                src="/Home_Page_Banner.jpg"
                width={isSmallScreen ? 330 : 450}
                height={400}
                alt="Homepage banner"
                priority
                data-aos="zoom-in"
              />
            </Box>
            <Box
              sx={{
                height: "100px",
                backgroundColor: "blue",
                display: isSmallScreen ? "none" : "block",
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Offered Technologies */}

      <Box sx={{ padding: "20px 30px" }}>
        <Technology />
      </Box>

      <Box sx={{ padding: "20px 30px" }}>
       <SuccessStory/>
      </Box>
    </>
  );
}

export default Home;
