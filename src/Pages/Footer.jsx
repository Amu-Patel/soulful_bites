import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: .5,
        px: 2,
        position:"fixed",
        bottom:0,
        left:0,
        width:"100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Brand */}
          <Grid item xs={12} sm={3}>
            <Typography 
              variant="h4"
              sx={{
                fontFamily: '"Story Script", sans-serif', // your custom font
                fontWeight:"bold", 
                letterSpacing: 1,
                color: "black",
                lineHeight: 1.2,
              }}
            >
              Soulful <br /> Bites
            </Typography>
          </Grid>

          {/* Website */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{fontWeight:"bold"}} gutterBottom>
              Website
            </Typography>
            <Stack spacing={1}>
                {['About us', 'Features', 'How it Works'].map((text) => (
                <Link
                    key={text}
                    href="#"
                    color="inherit"
                    underline="none"
                    sx={{ display: 'block' }}
                >
                    {text}
                </Link>
                ))}
            </Stack>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" sx={{fontWeight:"bold"}} gutterBottom>
              Links
            </Typography>
            <Stack spacing={1}>
                {['FAQs', 'Terms & Conditions', 'Contact Us'].map((text) => (
                <Link
                    key={text}
                    href="#"
                    color="inherit"
                    underline="none"
                    sx={{ display: 'block' }}
                >
                    {text}
                </Link>
                ))}
            </Stack>
          </Grid>

          {/* ⬇️ Your Original Block (kept unchanged) */}
          <Grid item xs={12} sm={3} textAlign="center">
            <Typography variant="h6" sx={{fontWeight:"bold"}} gutterBottom>
              Get in Touch
            </Typography>
            <IconButton color="inherit" href="#">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" href="#">
              <InstagramIcon />
            </IconButton>

            <Typography variant="h6" gutterBottom sx={{fontWeight:"bold", mt: 2 }}>
              Subscribe
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                size="small"
                sx={{ backgroundColor: "white", borderRadius: 25 }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: "25px", px: 3 }}
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom strip */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            {"© " + new Date().getFullYear()} Soulful Bites. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
