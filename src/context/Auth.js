import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import ApiConfig from "src/config/APICongig";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    axios.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem("token");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData] = useState({});
  const [todosListData, setTodoListData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const webToken = JSON.parse(localStorage.getItem('token'));
  const getTodoListApiHandler = async (webToken) => {
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

  useEffect(() => {
    if (webToken) {
      getTodoListApiHandler(webToken)
    }
  })

  let data = {
    userLoggedIn: isLogin,
    userData,
    todosListData,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
