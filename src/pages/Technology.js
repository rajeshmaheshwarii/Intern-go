import { Box, Divider, Grid } from "@mui/material";
import React from "react";
import { Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import Style from ".././styles/focusedTechnology.module.css";

function Technology() {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const TechnologyIcons = [
    "/aiml.jpeg",
    "/aws.jpeg",
    "/DevOps.jpg",
    "/java.png",
    "/react.jpeg",
    "/android.webp",
  ];
  const TechnologyNames = [
    "AI/ML",
    "Cloud",
    "DevOps",
    "Java",
    "React Js",
    "Android",
  ];

  return (
    <>
      <Box>
        <Typography sx={{ fontSize: isSmallScreen ? "25px" : "30px" }}>
          Focused Technologies
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
      <Box sx={{ marginTop: "25px" }}>
        <Grid container spacing={2}>
          {TechnologyIcons.map((technology, index) => (
            <Grid item xs={6} sm={2} md={2} key={index}>
              <Box
                className={Style.technologyItems}
                data-aos="zoom-in"
                  
              >
                <Image
                  src={technology}
                  width={isSmallScreen ? 80 : 100}
                  height={isSmallScreen ? 70 : 100}
                  alt={TechnologyNames[index]}
                />
                <Typography variant="h6">{TechnologyNames[index]}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Technology;
