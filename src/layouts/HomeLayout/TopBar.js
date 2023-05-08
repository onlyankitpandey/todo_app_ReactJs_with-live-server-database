import React from 'react'
import { Container, AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px 15px",
    }
  }
}))

const TopBar = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container className="p-0">
      <AppBar className="headerNav" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h1'>
            TODO APP
          </Typography>
          <Button variant="contained" color="primary" onClick={() => history.push("/login")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default TopBar

