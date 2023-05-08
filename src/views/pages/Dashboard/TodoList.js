import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  IconButton,
  TableBody,
  Tooltip,
  TableContainer,
  Container,
} from "@material-ui/core";
import DataLoading from "src/component/DataLoading";
import Page from "src/component/Page";
import moment from "moment";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import DeleteIcon from '@material-ui/icons/Delete';
import { FaEdit } from "react-icons/fa";
import ApiConfig from "src/config/APICongig";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
const useStyles = makeStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: "#0f212e99",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.table,
    },
  },
}));


function TodoList() {
  const location = useLocation();
  const classes = useStyles();
  const [todosListData, setTodoListData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const webToken = JSON.parse(localStorage.getItem('token'));
  const [openDelete, setOpenDelete] = useState(false);
  const [openCompleted, setOpenCompleted] = useState(false);
  const [itemsId, setItemsId] = useState("");

  const handleopenDelete = (id) => {
    setOpenDelete(true);
    setItemsId(id)
  }
  const handleopenCompleted = (id) => {
    setOpenCompleted(true);
    setItemsId(id)
  }


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
        setIsUpdating(false);
      }
    } catch (error) {
      setIsUpdating(false);
      console.log("error", error);
    }
  };

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
        setIsUpdating(false);
        toast.success(res.data.message);
        getTodoListApiHandler()
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
        setIsUpdating(false);
        toast.success(res.data.message);
        getTodoListApiHandler()
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

  useEffect(() => {
    if (webToken) {
      getTodoListApiHandler(webToken)
    }
  }, [])



  return (
    <>
      <Page title="Todo List">
        <Box className={classes.bannerBox}>
          <Box align="left" my={2}>
            <Typography variant="h4">{location.pathname === "/completed-list" ? "Completed" : location.pathname === "/pending-list" ? "Pending" : " "} Todo List Items</Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#E59446" }}>
                  <TableCell style={{ minWidth: "150px" }}>
                    Sr. No
                  </TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Mark as Completed</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {isUpdating ? (
                <DataLoading />
              ) : (

                <TableBody>
                  {todosListData &&
                    todosListData?.map((data, index) => {
                      return (
                        <TableRow className={classes.root}>
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            {`${data?.title}`}
                          </TableCell>
                          <TableCell style={{ textTransform: "capitalize" }}>
                            {data?.description}
                          </TableCell>
                          <TableCell style={{ textTransform: "capitalize" }}>
                            {data?.isCompleted === true ? "Completed" : "Pending"}
                          </TableCell>
                          <TableCell>
                            {moment(data?.createdAt).format("lll")}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Make it Completed">
                              <IconButton variant="contained" color="primary" disabled={data?.isCompleted === true} onClick={() => handleopenCompleted(data._id)}><FaEdit /></IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Item"><IconButton variant="contained" color="primary" onClick={() => handleopenDelete(data._id)}><DeleteIcon /></IconButton></Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {!isUpdating && todosListData.length == 0 && (
                    <Box align="center" className="moreBox1">
                      <Typography variant="body2">
                        No Execution Founds
                      </Typography>
                    </Box>
                  )}
                </TableBody>)
              }
            </Table>
          </TableContainer>
        </Box>
        <ConfirmationDialogBox title="Mark as Completed Task" desc="Are you sure want to make this item completed ?" open={openCompleted} handleClose={() => setOpenCompleted(false)} actionHandler={completedTodoHandler} isUpdating={isUpdating} />
        <ConfirmationDialogBox title="Delete Task" desc="Are you sure want to delete this item ?" open={openDelete} handleClose={() => setOpenDelete(false)} actionHandler={deleteTodoHandler} isUpdating={isUpdating} />
      </Page>
    </>
  );
}

export default TodoList;
