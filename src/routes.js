import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "src/layouts/HomeLayout";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "src/layouts/LoginLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/Home")),
  },
  {
    exact: true,
    path: "/login",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Login")),
  },
  {
    exact: true,
    path: "/signup",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/SignUp")),
  },
  {
    exact: true,
    guard: true,
    path: "/dashboard",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },
  {
    exact: true,
    guard: true,
    path: "/todo-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/TodoList")),
  },
  {
    exact: true,
    guard: true,
    path: "/completed-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/TodoList")),
  },
  {
    exact: true,
    guard: true,
    path: "/pending-list",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/TodoList")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
