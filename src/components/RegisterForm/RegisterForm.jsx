import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { apiAuth } from "../../api/auth";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setIsLoading(true);
    apiAuth({ path: "sign-up", method: "POST", body: values, navigateToSuccess: navigate("/login"), setIsLoading });
  };

  return (
    <Form
      name="normal_register"
      className="register-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your First name!",
          },
        ]}
      >
        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Имя" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your Last name!",
          },
        ]}
      >
        <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Фамилия" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
            pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
          },
        ]}
      >
        <Input size="large" prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
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
      <Form.Item
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your Confirm Password!",
          },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Подтвердите пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" className="register-form-button">
          Зарегистрироваться
        </Button>
      </Form.Item>

      <Form.Item className="register-bottom">
        Уже есть аккаунт? <NavLink to="/login">Войти</NavLink>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
