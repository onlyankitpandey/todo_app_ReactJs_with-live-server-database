import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  makeStyles,
  TextField,
  FormHelperText,
  FormControl,
  Button,
} from "@material-ui/core";
import { } from "react-feather";
import { useHistory, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
import CircularProgress from "@material-ui/core/CircularProgress";
import * as yup from "yup";
import { Formik, ErrorMessage, Form } from "formik";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APICongig";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "150px 25px 50px 25px",
    [theme.breakpoints.down("sm")]: {
      padding: "100px 25px 50px 25px",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [isUpdating, setIsUpdating] = useState(false);

  const initialState = {
    name: "",
    username: "",
    email: "",
    password: "",
  };

  const initialSchema =
    yup.object().shape({
      name: yup
        .string()
        .required("Full Name is required.").trim('The Name cannot include leading and trailing spaces')
        .min(3, "Should be 3 character long")
        .max(30, "should not exceed 30 characters"),
      username: yup
        .string()
        .required("Username is required.")
        .min(3, "Should be 3 character long")
        .max(30, "should not exceed 30 characters"),
      email: yup
        .string()
        .required("Email address is required.")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email address"
        ),
      password: yup
        .string()
        .required("Password is required .")
        .min(8, "Should be 3 character long")
        .max(16, "should not exceed 10 characters"),
    })


  const registerApiHandler = async (values) => {
    try {
      setIsUpdating(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.REGISTER_URL,
        data: {
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password
        }
      })
      if (res.data.status === 200) {
        toast.success(res.data.message)
        history.push("/login")
        setIsUpdating(false);
      }
      setIsUpdating(false);
      toast.error(res.error.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      setIsUpdating(false);
    }
  };

  return (
    <Box className={classes.wrapper}>
      <Formik
        initialValues={initialState}
        initialStatus={{
          success: false,
          successMsg: "",
        }}
        validationSchema={initialSchema}
        onSubmit={registerApiHandler}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
          setFieldValue,
        }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Box mb={2} align="center">
                <Typography variant="h3">Register</Typography>
                <Typography variant="h6">If you are visiting firt time to the Todo Application yours Welcome !</Typography>
              </Box>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Typography
                    variant="body2"
                    style={{
                      paddingBottom: "3px",
                      color: "white",
                    }}
                  >
                    Full Name
                  </Typography>

                  <TextField
                    variant="outlined"
                    placeholder="Enter Full Name"
                    name="name"
                    size="small"
                    fullWidth="true"
                    value={values.name}
                    error={Boolean(
                      touched.name && errors.name
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.name && errors.name}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      style={{
                        paddingBottom: "3px",
                        color: "white",
                      }}
                    >
                      Username
                    </Typography>
                    <TextField
                      variant="outlined"
                      type="text"
                      placeholder="Enter username"
                      name="username"
                      size="small"
                      fullWidth="true"
                      value={values.username}
                      error={Boolean(
                        touched.username && errors.username
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.username && errors.username}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      style={{
                        paddingBottom: "3px",
                      }}
                    >
                      Email Address
                    </Typography>

                    <TextField
                      variant="outlined"
                      placeholder="Enter email address"
                      name="email"
                      value={values.email}
                      fullWidth="true"
                      size="small"
                      error={Boolean(touched.email && errors.email)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.email && errors.email}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body2"
                      style={{
                        paddingBottom: "3px",
                      }}
                    >
                      Password
                    </Typography>

                    <TextField
                      variant="outlined"
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      size="small"
                      fullWidth="true"
                      value={values.password}
                      error={Boolean(
                        touched.password && errors.password
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.password && errors.password}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box pt={3} align="center">
                    <Typography variant="body2" style={{
                      marginBottom
                        : "10px"
                    }}>If you already have registerd, please <RouterLink to="/login" style={{ color: "#e59446" }}>Login</RouterLink></Typography>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isUpdating}
                    >
                      Register Now
                      {isUpdating && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}
