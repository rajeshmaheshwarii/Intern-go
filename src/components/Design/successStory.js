import React, { useState } from "react";
import { Box, Typography, Divider, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Style from "@/styles/successStory.module.css";
import Stories from "@/data/successStories";
import Image from "next/image";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter"; // Changed from X to TwitterIcon

const SuccessStory = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:961px)");
  const [errorSrc, setErrorSrc] = useState({});

  const handleImageError = (index) => {
    setErrorSrc((prev) => ({ ...prev, [index]: "/user_fallback_image.jpg" }));
  };

  console.log("Final Stories", Stories);

  return (
    <Box sx={{ mt: 5 }} className={Style.container}>
      <Box>
        <Typography sx={{ fontSize: isSmallScreen ? "25px" : "30px" }}>
          Success Stories
        </Typography>
        <Divider
          sx={{
            width: "50px",
            backgroundColor: "red",
            height: "3px",
            borderRadius: "50px",
          }}
        />
      </Box>

      <Box sx={{ mt: 3 }} className={Style.StoryContainer}>
        <Grid container spacing={2}>
          {Stories.map((story, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box className={Style.StoryItems} data-aos="zoom-in">
                <Box className={Style.storyCol1}>
                  <Image
                    src={errorSrc[index] || story.photo}
                    width={100}
                    height={100}
                    alt="Photo"
                    onError={() => handleImageError(index)}
                    style={{ borderRadius: "10%", objectFit: "cover" }}
                  />
                </Box>
                <Box className={Style.storyCol2}>
                  <p>{story.success_message}</p>
                  <Box className={Style.StudentDetails}>
                    <Box className={Style.DetailsCol1}>
                      <p style={{ color: "#850F8D", fontSize: "18px" }}>
                        {story.name}
                      </p>
                      <p style={{ color: "#850F8D", fontSize: "14px" }}>
                        {story.current_role}
                      </p>
                    </Box>
                    <Box className={Style.Social_Icons}>
                      <a
                        href={story.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>
                          <GitHubIcon />
                        </p>
                      </a>
                      <a
                        href={story.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>
                          <LinkedInIcon />
                        </p>
                      </a>
                      <a
                        href={story.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>
                          <TwitterIcon />
                        </p>
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SuccessStory;
