import React from "react";
import { Spin } from "antd";
import "./Loader.css";

const Loader = ({ height }) => {
  return (
    <div className={`loader ${height && "height"}`}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
