import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginForm.css";
import { NavLink, useNavigate } from "react-router-dom";
import { apiAuth } from "../../api/auth";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setIsLoading(true);
    apiAuth({ path: "sign-in", method: "POST", body: values, setIsLoading });
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Пароль" />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
          Войти
        </Button>
      </Form.Item>

      <Form.Item className="login-bottom">
        Еще нет аккаунта? <NavLink to="/register">Зарегистрироваться</NavLink>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
