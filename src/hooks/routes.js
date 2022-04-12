import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import Login from "../pages/Login";
import Register from "../pages/Register/Register";
import Loader from "../components/Loader";
import Tests from "../pages/Tests";
import Results from "../pages/Results";
import Profile from "../pages/Profile";
import Test from "../pages/Test";

const authRoutes = [
  {
    path: "/tests",
    component: <Tests />,
  },
  {
    path: "/results",
    component: <Results />,
  },
  {
    path: "/profile",
    component: <Profile />,
  },
  {
    path: "/test/:id",
    component: <Test />,
  },
];

const noAuthRoutes = [
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
];

export const useRoutes = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Loader height />;

  const mapNoAuthRoutes = noAuthRoutes.map((route) => <Route key={route.path} exact path={route.path} element={route.component} />);
  const mapAuthRoutes = authRoutes.map((route) => <Route key={route.path} exact path={route.path} element={route.component} />);

  return (
    <Routes>
      {user ? mapAuthRoutes : mapNoAuthRoutes}
      <Route path="*" element={<Navigate to={user ? "/tests" : "/login"} />} />
    </Routes>
  );
};
