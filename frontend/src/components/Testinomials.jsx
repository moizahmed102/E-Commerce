import React from "react";
import { Box, Container, Typography, useTheme } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import RepeatIcon from "@mui/icons-material/Repeat";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";

const Testimonial = () => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "background.paper", py: 3, mt: 3 }}>
      <Container maxWidth="lg">
        <Box
          mt={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "300px", sm: "450px", md: "600px" },
            overflow: "hidden",
            borderRadius: 2,
          }}
        >
          <video
            autoPlay
            loop
            muted
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/test.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>

        <Box sx={{ mt: 8 }}> 
          <Container maxWidth="md">
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={4}
            >
             
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column", 
                  alignItems: "center",
                  textAlign: "center", 
                  gap: 2,
                }}
              >
                <EmojiEventsIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 60, 
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Awarded by Consumer Association of Pakistan
                  </Typography>
                  <Typography variant="body2">
                    Consumer Association of Pakistan recognized Scents N Stories in the 17th Consumer Choice Awards
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column", 
                  alignItems: "center",
                  textAlign: "center", 
                  gap: 2, 
                }}
              >
                <RepeatIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 60, 
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    15 Days Easy Returns Policy
                  </Typography>
                  <Typography variant="body2">
                    Didn't Love What You Ordered? Avail returns or exchange for your online purchases within 15 days. For in-store exchanges only.
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column", 
                  alignItems: "center",
                  textAlign: "center", 
                  gap: 2, 
                }}
              >
                <LocalFloristIcon
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 60, 
                  }}
                />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    High Concentration Perfumes
                  </Typography>
                  <Typography variant="body2">
                    We Set Our Concentrations As High As Possible To Ensure Maximum Performance Of The Perfumes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonial;
