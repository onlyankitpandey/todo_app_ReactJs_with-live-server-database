import React, { Fragment, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "150px 50px",
    [theme.breakpoints.down("sm")]: {
      padding: "70px 30px",
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
  leftImageBox: {
    "& figure": {
      margin: "0px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      "& img": {
        width: '100%',
        minHeight: "100%"
      }
    }
  }
}));


const getLocalStorageItems = () => {
  const listItems = localStorage.getItem('localStoragelist')
  if (listItems) {
    return JSON.parse(localStorage.getItem('localStoragelist'));
  } else {
    return []
  }
}


export default function Index() {
  const classes = useStyles();
  const [editItemId, setEditItemId] = useState("");
  const [IsSubmit, setIsSubmit] = useState(false);
  const [addEditToggle, setAddEditToggle] = useState(false);
  const [todoItems, setTodoItems] = useState(getLocalStorageItems());
  const [todoData, setTodoData] = useState({
    title: "",
    description: ""
  })

  const handleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTodoData((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const addItemsHandlers = () => {
    setIsSubmit(true);
    if (todoData.title === "" || todoData.description === "") {
      // window.alert("Please Enter Title and Descrition Input field properly!")
    } else if (todoData.title !== "" && todoData.description !== "" && addEditToggle) {
      setTodoItems(
        todoItems.map((currentItems) => {
          if (currentItems.id === editItemId) {
            return { ...currentItems, title: todoData.title, description: todoData.description }
          }
          return currentItems;
        })
      )
      setTodoData({
        title: "",
        description: ""
      })
      setAddEditToggle(false);
      setIsSubmit(false);
    } else {
      const allInputData = { id: new Date().getTime().toString(), title: todoData.title, description: todoData.description }
      setTodoItems([...todoItems, allInputData])
      setEditItemId(null);
      setAddEditToggle(false);
      setTodoData({
        title: "",
        description: ""
      })
      setIsSubmit(false);
    }

  }

  useEffect(() => {
    localStorage.setItem('localStoragelist', JSON.stringify(todoItems))
  }, [todoItems])

  return (
    <Fragment>
      <Box className={classes.wrapper}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box className={classes.leftImageBox}>
              <figure>
                <img src="images/Home_Image.png" alt="Home Image" />
              </figure>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3">This is Full Stack Todo App </Typography>
            <Box mt={2} >
              <Typography variant="h6">This is Full Stack Todo Assignment App which was given by Oas36ty to Complete by Monday Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Typography>
              <Box mt={3}>
                <Typography variant="h6">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Typography>
              </Box>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment >
  );
}
