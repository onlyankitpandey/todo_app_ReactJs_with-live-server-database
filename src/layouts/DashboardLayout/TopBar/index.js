import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  makeStyles,
  IconButton,
  Hidden,
  SvgIcon,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import { TopBarData } from "./TopBarData";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.paper,
  },
  toolbar: {
    height: 80,
    padding: "0 10px",
    backgroundColor: theme.palette.primary.paper,
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
            style={{ marginRight: 10 }}
          >
            <SvgIcon fontSize="small">
              <MenuIcon style={{ color: "#ffffff" }} />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <TopBarData />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
