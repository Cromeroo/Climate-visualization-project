import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logoTCVR from "../../assets/images/logoTCVR.png";
import "./Navbar.css";

function MyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={logoTCVR} className="drawer-logo" alt="Logo" />
      <List>
        <ListItem button component={Link} to="/proyecto">
          <ListItemText primary="Proyecto" />
        </ListItem>
        <ListItem button component={Link} to="/territorios">
          <ListItemText primary="Territorios" />
        </ListItem>
        <ListItem button component={Link} to="/espacios">
          <ListItemText primary="Espacios de cocreación" />
        </ListItem>
        <ListItem button component={Link} to="/variabilidad-climatica">
          <ListItemText primary="Variabilidad climática" />
        </ListItem>
        <ListItem button component={Link} to="/indicadores-climaticos">
          <ListItemText primary="Indicadores climáticos" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#F5F5DC", paddingY: 2 }}
      >
        {" "}
        <Toolbar className="toolbar">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "#8B0000" }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={logoTCVR} className="logo" alt="Logo" />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              className="title"
              sx={{
                color: "#8B0000",
                textDecoration: "none",
                marginLeft: 1,
                fontWeight: "bold",
              }}
            >
              Territorio, comida y vida
            </Typography>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              color="inherit"
              component={Link}
              to="/proyecto"
              sx={{ color: "#8B0000", fontWeight: "bold" }}
            >
              Proyecto
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/territorios"
              sx={{ color: "#8B0000", fontWeight: "bold" }}
            >
              Territorio
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/espacios"
              sx={{ color: "#8B0000", fontWeight: "bold" }}
            >
              Biodiversidad
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/variabilidad-climatica"
              sx={{ color: "#8B0000", fontWeight: "bold" }}
            >
              Variabilidad climática
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/indicadores-climaticos"
              sx={{ color: "#8B0000", fontWeight: "bold" }}
            >
              Adaptación
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
              backgroundColor: "#F5F5DC",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box sx={{ marginTop: 4 }}></Box>
    </>
  );
}

export default MyNavbar;
