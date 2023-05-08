import React from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Grid,
  Box,
  Hidden,
  Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  content: {
    height: "100vh",
    overflowX: "auto",
    backgroundColor: "#0F212E",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    display: 'flex',
    alignItems: "center",
    justifyContent: "center"
  },
  leftImageBox: {
    "& figure": {
      margin: "0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      "& img": {
        width: "100%",
        minHeight: "100%"
      }
    }
  }

}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Hidden smDown>
            <Grid item xs={12} md={6} >
              <Box className={classes.leftImageBox}>
                <figure>
                  {window.location.pathname === "/login" && (
                    <img
                      src="images/Login_Image.png"
                      alt="Login Image"
                    />
                  )}
                  {window.location.pathname === "/signup" && (
                    <img
                      src="images/SignUp_Image.png"
                      alt="Sign Image"
                    />
                  )}
                </figure>
              </Box>
            </Grid>
          </Hidden>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box className={classes.content}>{children}</Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

LoginLayout.propTypes = {
  children: PropTypes.node,
};

export default LoginLayout;