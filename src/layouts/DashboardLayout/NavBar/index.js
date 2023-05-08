/* eslint-disable no-use-before-define */
import React, { useEffect, useContext, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  Typography,
  Button,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import { AiFillDashboard } from "react-icons/ai";
import { FaThList, FaListOl, FaRegListAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import NavItem from "./NavItem";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: AiFillDashboard,
        href: "/dashboard",
      },
      {
        title: "Todo List",
        icon: FaThList,
        href: "/todo-list",
      },
      {
        title: "Completed List",
        icon: FaListOl,
        href: "/completed-list",
      },
      {
        title: "Incompleted List",
        icon: FaRegListAlt,
        href: "/pending-list",
      },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    //eslint-disable-next-line
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean()}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 200,
    top: 80,
    height: "calc(100% - 80px)",
    background: theme.palette.background.paper,
  },
  contentBox: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.primary.paper,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const logOut = () => {
    // auth.userLogIn(false, null);
    history.push("/");
    window.localStorage.removeItem("token");
  };

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box height="100%" display="flex" flexDirection="column">
        <Box className={classes.contentBox}>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <Box >
              {sections.map((section, i) => {
                return (
                  <List
                    key={`menu${i}`}
                    subheader={
                      <ListSubheader disableGutters disableSticky>
                        {section.subheader}
                      </ListSubheader>
                    }
                  >
                    {renderNavItems({
                      items: section.items,
                      pathname: location.pathname,
                    })}
                  </List>
                );
              })}
            </Box>
          </PerfectScrollbar>
          <Box>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{
              position: "absolute",
              left: "40px",
              bottom: "20px"
            }}>
              logOut
            </Button>
            <ConfirmationDialogBox title="LogOut" desc="Are you sure want to LogOut ?" open={open} handleClose={() => setOpen(false)} actionHandler={logOut} />
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Typography variant="h1" onClick={() => history.push("/dashboard")} style={{
            cursor
              : "pointer", color: "#FFFFFF", padding: "20px"
          }}>TODO APP</Typography>
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
