import { notification } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const ICONS_TYPE = Object.freeze({
  Success: <CheckCircleOutlined style={{ color: "#4CAF50" }} />,
  Error: <CloseCircleOutlined style={{ color: "#F44336" }} />,
  Warning: <ExclamationCircleOutlined style={{ color: "#FFC107" }} />,
});

export const showNotification = (type, message) => {
  notification.open({
    message: type,
    description: message,
    icon: ICONS_TYPE[type],
  });
};
