import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "src/context/Auth";

export default function AuthGuard(props) {
  const { children } = props;
  const auth = useContext(AuthContext);
  if (!localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
  // if (!auth.userLoggedIn) {
  //   return <Redirect to="/" />;
  // }

  return <>{children}</>;
}
