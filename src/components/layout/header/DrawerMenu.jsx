import { List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DrawerMenu = ({ items, onClick }) => (
  <List>
    {items.map((item) => (
      <ListItem
        button
        key={item.path}
        component={Link}
        to={item.path}
        onClick={onClick}
      >
        <ListItemText primary={item.label} />
      </ListItem>
    ))}
  </List>
);

DrawerMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DrawerMenu;
