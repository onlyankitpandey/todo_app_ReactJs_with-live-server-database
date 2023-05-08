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
import toast from 'react-hot-toast';
import * as yup from "yup";
import { Formik, Form } from 'formik'
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

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [isUpdating, setIsUpdating] = useState(false);

  const initialState = {
    username: "",
    password: "",
  };

  const initialSchema =
    yup.object().shape({
      username: yup
        .string()
        .required("Username is required.")
        .min(3, "Should be 3 character long")
        .max(30, "should not exceed 30 characters"),
      password: yup
        .string()
        .required("Password is required .")
        .min(8, "Should be 3 character long")
        .max(16, "should not exceed 10 characters"),
    })

  const loginApiHandler = async (values) => {
    try {
      setIsUpdating(true);
      const res = await axios({
        method: "POST",
        url: ApiConfig.LOGIN_URL,
        data: {
          username: values.username,
          password: values.password
        }
      })

      if (res.data.status === 200) {
        localStorage.setItem('token', JSON.stringify(res?.data?.data?.token))
        toast.success(res.data.message)
        history.push("/dashboard")
        setIsUpdating(false);
      }
      setIsUpdating(false);
    } catch (error) {
      console.log(error);
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
        onSubmit={loginApiHandler}
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
                <Typography variant="h3">Login </Typography>
                <Typography variant="h6">Welcome back to your TODO App !</Typography>
              </Box>
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
                    }}>If you already have registerd, please <RouterLink to="/signup" style={{ color: "#e59446" }}>SignUp</RouterLink></Typography>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      disabled={isUpdating}
                    >
                      Login
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
