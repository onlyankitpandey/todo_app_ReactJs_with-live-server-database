import React from "react";
import {
  Hidden,
  Box,
  makeStyles,
  IconButton,
  Badge,
  Typography,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  namePlace: {
    "& .MuiDialog-container": {
      maxHeight: "78%",
      minWidth: "214",
    },
  },
}));

export function TopBarData(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Hidden mdDown>
        <Typography variant="h1" onClick={() => history.push("/dashboard")} style={{
          cursor
            : "pointer"
        }}>TODO APP</Typography>
      </Hidden>
      <Box flexGrow={1} />
      <Box align="left">
        <Typography variant="body1" style={{ color: "#fff" }}>
          {localStorage.getItem("username")}
        </Typography>
        <Typography variant="body1" style={{ color: "#fff" }}>
          {localStorage.getItem("email")}
        </Typography>
      </Box>
      <IconButton onClick={() => history.push("/edit-profile")}>
        <Badge className={classes.namePlace} color="secondary">
          <Avatar src="/images/photo.png" alt="Profile Image" />
        </Badge>
      </IconButton>
    </>
  );
}
