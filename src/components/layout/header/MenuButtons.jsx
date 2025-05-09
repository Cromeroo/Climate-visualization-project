import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuButtons = ({ items }) => (
  <>
    {items.map((item) => (
      <Button
        key={item.path}
        color="inherit"
        component={Link}
        to={item.path}
        sx={{ color: "#8B0000", fontWeight: "bold" }}
      >
        {item.label}
      </Button>
    ))}
  </>
);
MenuButtons.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MenuButtons;
