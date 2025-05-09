import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import logoTCVR from "../../../assets/images/logoTCVR.png";
import MenuButtons from "./MenuButtons";
import DrawerMenu from "./DrawerMenu";
import "./Navbar.css";
import { menuItems, adminMenuItems } from "./menuItems";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../../components/login/useAuth";

function MyNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role, logout } = useAuth(); // SOLO el contexto

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const itemsToShow =
    role === "admin" ? [...menuItems, ...adminMenuItems] : menuItems;

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <img src={logoTCVR} className="drawer-logo" alt="Logo" />
      <DrawerMenu items={itemsToShow} onClick={handleDrawerToggle} />
      {role === "admin" && <LogoutButton onLogout={logout} />}
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#F5F5DC", margin: 0 }}>
        <Toolbar className="toolbar" sx={{ padding: 0 }}>
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
                fontSize: { xs: "1.2rem", sm: "1.5rem" },
              }}
            >
              Territorio, comida y vida
            </Typography>
          </Box>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <MenuButtons items={itemsToShow} />
            {role === "admin" && <LogoutButton onLogout={logout} />}
          </Box>
        </Toolbar>
        <Box
          sx={{ height: "5px", backgroundColor: "#8BC34A", marginTop: "auto" }}
        />
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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
      <Box sx={{ marginTop: 0 }}></Box>
    </>
  );
}

export default MyNavbar;
