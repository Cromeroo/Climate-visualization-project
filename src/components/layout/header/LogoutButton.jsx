import { useAuth } from "../../../components/login/useAuth";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button
      color="inherit"
      onClick={handleLogout}
      sx={{ color: "#8B0000", fontWeight: "bold", ml: 2 }}
    >
      Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
