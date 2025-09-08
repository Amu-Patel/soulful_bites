import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shadow] = useState(true); // shadow always ON
  const [city, setCity] = useState("");

  const menuItems = ["Partner with us", "About US", "LOGIN/SIGNUP"];
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setCity(savedLocation);
    }
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5b39854ac51743ac8008e9af0324d0b9`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const components = data.results[0].components;

          // Try to be more specific
          const area =
            components.suburb ||
            components.neighbourhood ||
            components.hamlet ||
            components.village;
          const cityName =
            components.city || components.town || components.municipality;

          // Combine area and city if both are available
          const displayName =
            area && cityName
              ? `${area}, ${cityName}`
              : cityName || area || components.state;

          setCity(displayName || "Unknown location");
          localStorage.setItem(
            "userLocation",
            displayName || "Unknown location"
          );
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        setCity("Location unavailable");
      }
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.8)", // transparent white
          boxShadow: shadow ? "0px 4px 12px rgba(0, 0, 0, 0.2)" : "none",
          margin: 0,
          top: 0,
          color: "black",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(8px)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <Toolbar>
          {/* Mobile Menu Button */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "flex", md: "none" }, mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Name + GPS Icon together */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Story Script", sans-serif', 
                fontWeight: "bold",
                letterSpacing: .1,
                color: "black",
              }}
            >
              Soulful <br/> Bites
            </Typography>
            <LocationOnIcon
              sx={{ color: "black", cursor: "pointer" }}
              onClick={handleGetLocation}
            />
            <Typography sx={{ cursor: "pointer" }} onClick={handleGetLocation}>
              {city ? city : "Set your location"}
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button key={item} color="inherit">
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {menuItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
