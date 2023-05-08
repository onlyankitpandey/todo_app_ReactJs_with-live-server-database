import React, { useState } from 'react'
import {
  Grid,
  Typography,
  Paper,
  Tooltip,
  IconButton,
  Box,
  makeStyles
} from "@material-ui/core";
import axios from "axios";
import toast from 'react-hot-toast';
import DeleteIcon from '@material-ui/icons/Delete';
import { FaEdit } from "react-icons/fa";
import ApiConfig from "src/config/APICongig";
import ConfirmationDialogBox from "./ConfirmationDialogBox";


const useStyles = makeStyles((theme) => ({
  NewBreed: {
    backgroundColor: "#0F212E",
    height: "100%",
    position: "relative",
    "& input::placeholder": {
      fontSize: "13px",
      fontWeight: 300,
    },
    "& .innerBox": {
      padding: "15px",
      [theme.breakpoints.down("sm")]: {
        padding: "10px"
      }
    }
  },
}))


const TodoCard = (props) => {
  const classes = useStyles();
  const { data, getTodoListApiHandler } = props;
  const [openDelete, setOpenDelete] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [itemsId, setItemsId] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const webToken = JSON.parse(localStorage.getItem('token'));

  const handleopenDelete = (id) => {
    setOpenDelete(true);
    setItemsId(id)
  }
  const handleopenCompleted = (id) => {
    setOpenCompleted(true);
    setItemsId(id)
  }


  const deleteTodoHandler = async () => {
    try {
      setIsUpdating(true);
      const res = await axios({
        method: "DELETE",
        url: ApiConfig.DELETE_TODO,
        headers: {
          auth: webToken
        },
        data: {
          todo_id: itemsId
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        props.getTodoListApiHandler()
        setIsUpdating(false);
        setOpenDelete(false)
      }
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
      if (error.response) {
        toast.success(error.response.data.message);
      } else {
        toast.success(error.message);
      }
    }
  };
  const completedTodoHandler = async () => {
    try {
      setIsUpdating(true);
      const res = await axios({
        method: "PUT",
        url: ApiConfig.MARK_TODO_COMPLETE,
        headers: {
          auth: webToken
        },
        data: {
          todo_id: itemsId
        },
      });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        getTodoListApiHandler()
        setIsUpdating(false);
        setOpenCompleted(false)
      }
    } catch (error) {
      setIsUpdating(false);
      console.log(error);
      if (error.response) {
        toast.success(error.response.data.message);
      } else {
        toast.success(error.message);
      }
    }
  };


  return (
    <Paper my={2} className={classes.NewBreed}>
      <Box className='innerBox'>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" >{data?.title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" >{data?.description}</Typography>
          </Grid>
        </Grid>
        <Box align="right">
          <Tooltip title="Make it Completed">
            <IconButton variant="contained" color="primary" disabled={data?.isCompleted === true} onClick={() => handleopenCompleted(data._id)}><FaEdit /></IconButton>
          </Tooltip>
          <Tooltip title="Delete Item"><IconButton variant="contained" color="primary" onClick={() => handleopenDelete(data._id)}><DeleteIcon /></IconButton></Tooltip>
        </Box>
        <ConfirmationDialogBox title="Mark as Completed Task" desc="Are you sure want to make this item completed ?" open={openCompleted} handleClose={() => setOpenCompleted(false)} actionHandler={completedTodoHandler} isUpdating={isUpdating} />
        <ConfirmationDialogBox title="Delete Task" desc="Are you sure want to delete this item ?" open={openDelete} handleClose={() => setOpenDelete(false)} actionHandler={deleteTodoHandler} isUpdating={isUpdating} />
      </Box>
    </Paper>
  )
}

export default TodoCard;