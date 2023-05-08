import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
  TextField,
  FormHelperText,
  Paper,
  FormControl,
  Button,
} from "@material-ui/core";
import DataLoading from "src/component/DataLoading";
import TodoCard from "src/component/TodoCard";
import { useHistory } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import * as yup from "yup";
import { Formik, Form } from 'formik'
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import ApiConfig from "src/config/APICongig";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: " 50px 0px",
    [theme.breakpoints.down("md")]: {
      padding: "30px 15px",
    },
  },
  NewBreed: {
    backgroundColor: "#0F212E",
    padding: "20px",
    position: "relative",
    "& input::placeholder": {
      fontSize: "13px",
      fontWeight: 300,
    },
  },
  actionButtons: {
    position: "absolute",
    right: "10px",
    bottom: "15px"
  },
  input: {
    display: "none",
  },
  order1: {
    order: "0",
    [theme.breakpoints.down("sm")]: {
      order: "1"
    }
  },
  order2: {
    order: "1",
    [theme.breakpoints.down("sm")]: {
      order: "0"
    }
  }

}));

export default function Index() {
  const classes = useStyles();
  const history = useHistory();
  const [todosListData, setTodoListData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdating1, setIsUpdating1] = useState(false);
  const webToken = JSON.parse(localStorage.getItem('token'));

  const initialState = {
    title: "",
    description: "",
  };

  const initialSchema =
    yup.object().shape({
      title: yup
        .string()
        .required("Title is required.")
        .min(3, "Should be 3 character long")
        .max(100, "should not exceed 100 characters"),
      description: yup
        .string()
        .required("Description is required.")
        .min(8, "Should be 3 character long")
        .max(280, "should not exceed 280 characters"),
    })

  const getTodoListApiHandler = async (webToken) => {
    setIsUpdating(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.GET_TODO_LIST,
        headers: {
          auth: webToken
        }
      });
      if (res?.data?.status === 200) {
        setTodoListData(res?.data?.data?.todos);
        localStorage.setItem("username", res?.data?.data.username)
        localStorage.setItem("email", res?.data?.data.email)
        setIsUpdating(false);
      }
    } catch (error) {
      setIsUpdating(false);
      console.log("error", error);
    }
  };

  const createTodoApiHandler = async (values) => {
    setIsUpdating1(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.CREATE_TODO,
        headers: {
          auth: webToken
        },
        data: {
          title: values.title,
          description: values.description
        }
      })
      if (res.data.status === 200) {
        toast.success(res.data.message)
        getTodoListApiHandler();
        setIsUpdating1(false);
      }
      setIsUpdating1(false);
    } catch (error) {
      console.log(error);
      setIsUpdating1(false);
    }
  };

  useEffect(() => {
    if (webToken) {
      getTodoListApiHandler(webToken)
    }
  }, [])


  return (
    <Fragment>
      <Box className={classes.wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className={classes.order1}>
            <Grid container spacing={2}>
              {isUpdating ? (
                <DataLoading />
              ) : (
                todosListData && todosListData?.map((data, index) => {
                  return (
                    <Grid item xs={6}>
                      <TodoCard
                        todoItems={todosListData}
                        classes={classes} data={data} key={index}
                        getTodoListApiHandler={(items) => getTodoListApiHandler(items)}
                      />
                    </Grid>
                  )
                }))}
              {!isUpdating && todosListData?.length === 0 ? "No Task Found Please add your Task" : ""}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} className={classes.order2}>
            <Paper className={classes.NewBreed}>
              <Box mb={2} align="center">
                <Typography variant="h3">Create Your Task</Typography>
              </Box>
              <Formik
                initialValues={initialState}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={initialSchema}
                onSubmit={(values, { resetForm }) => {
                  createTodoApiHandler(values)
                  resetForm({ values: "" })
                }}
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
                              Title
                            </Typography>
                            <TextField
                              variant="outlined"
                              type="text"
                              placeholder="Enter title"
                              name="title"
                              size="small"
                              fullWidth="true"
                              value={values.title}
                              error={Boolean(
                                touched.title && errors.title
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.title && errors.title}
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
                              description
                            </Typography>

                            <TextField
                              variant="outlined"
                              type="description"
                              placeholder="Enter description"
                              name="description"
                              size="small"
                              fullWidth="true"
                              value={values.description}
                              multiline
                              minRows={4}
                              inputProps={{ className: classes.cls, maxLength: 800, }}
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.description && errors.description}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                          <Box pt={3} align="center">
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              size="large"
                              disabled={isUpdating1}
                            >
                              Create Todo
                              {isUpdating1 && <ButtonCircularProgress />}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Form>
                  );
                }}
              </Formik>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Fragment >
  );
}
