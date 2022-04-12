import { Button, Col, Layout, Row, Typography } from "antd";
import React from "react";
import "./Layout.css";

import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const MainLayout = ({ children }) => {
  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Layout className="layout">
      <Layout.Header className="layout-header">
        <Row className="layout-header__row">
          <Col span={12}>
            <NavLink to="/">
              <img src={logo} alt="" className="layout-header__logo" />
            </NavLink>
          </Col>
          <Col span={12} className="layout-header__right">
            <NavLink to="/tests">
              <Typography.Text strong>Тесты</Typography.Text>
            </NavLink>
            <NavLink to="/results">
              <Typography.Text strong>Результаты</Typography.Text>
            </NavLink>
            <NavLink to="/profile">
              <Typography.Text strong>Мой профиль</Typography.Text>
            </NavLink>
            <Button type="link" onClick={logoutHandler}>
              <Typography.Text strong>Выйти</Typography.Text>
            </Button>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content className="layout-content">
        <div className="layout-content__main">{children}</div>
      </Layout.Content>
      <Layout.Footer className="layout-footer">
        <Row className="layout-footer__row">ВПР © {new Date().getFullYear()}</Row>
      </Layout.Footer>
    </Layout>
  );
};

export default MainLayout;
