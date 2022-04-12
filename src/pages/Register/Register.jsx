import { Typography } from "antd";
import React from "react";
import RegisterForm from "../../components/RegisterForm";
import "./Register.css";

const Register = () => {
  return (
    <div className="register">
      <div className="register-title">
        <Typography.Title>Регистрация</Typography.Title>
      </div>
      <div className="login-form">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
