import { Typography } from "antd";
import React from "react";
import LoginForm from "../../components/LoginForm";
import "./Login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login-title">
        <Typography.Title>Вход</Typography.Title>
      </div>
      <div className="login-form">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
