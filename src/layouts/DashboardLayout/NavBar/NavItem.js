import React, { useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, Collapse, ListItem, makeStyles } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";


const useStyles = makeStyles((theme) => ({
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "#969ba1",
    padding: "10px 8px",
    justifyContent: "flex-start",
    display: "inline",

    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
  },
  buttonLeaf: {
    color: "#969ba1",
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontSize: "14px",
    display: "block",
    textAlign: "left",
    borderRadius: 0,
    borderLeft: "2px solid #0f212e !important",
    "&.depth-0": {
      textAlign: "left",
      alignItems: "center",
      borderLeftWidth: "2px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      padding: "0.75rem 1.5rem",
      width: "100%",
      "&:hover": {
        backgroundColor: theme.palette.background.default,
        borderLeft: "2px solid #E59446 !important",
        color: "#E59446 !important",
        "& $icon": {
          color: "#E59446 !important",
        },
      },
      "& $title": {
        fontWeight: theme.typography.fontWeightMedium,
        textAlign: "center",
      },
    },
  },
  icon: {
    display: "flex",
    alignItems: "center",
    padding: "0 14px",
    width: "16px",
    height: "15.06px",
    color: "#fff !important",
    "&:hover": {
      color: "#E59446 !important",
    },
  },
  title: {
    marginRight: "auto",
  },
  active: {
    color: "#fafafa",
    backgroundColor: theme.palette.background.default,
    borderLeft: "2px solid #E59446 !important",
    fontWeight: theme.typography.fontWeightRegular,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
      color: "#E59446 !important",
    },
    "& $icon": {
      color: "#E59446 !important",
    },
  },
}));

const NavItem = ({
  children,
  className,
  depth,
  href,
  icon: Icon,
  info: Info,
  open: openProp,
  title,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 8;

  if (depth > 0) {
    paddingLeft = 32 + 15 * depth;
  }

  const style = { paddingLeft };

  if (children) {
    return (
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        key={title}
        {...rest}
      >
        <Button
          className={classes.button}
          onClick={handleToggle}
          style={{ paddingLeft: "15px" }}
        >
          {Icon && <Icon className={classes.icon} size="20" />}
          <span className={classes.title}>{title}</span>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem
      className={clsx(classes.itemLeaf, className)}
      disableGutters
      key={title}
      {...rest}
    >
      <Button
        activeClassName={classes.active}
        className={clsx(classes.buttonLeaf, `depth-${depth}`)}
        component={RouterLink}
        exact
        style={style}
        to={href}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{title}</span>
        {Info && <Info />}
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  info: PropTypes.elementType,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

NavItem.defaultProps = {
  open: false,
};

export default NavItem;
