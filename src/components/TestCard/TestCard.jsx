import { Button, Card, Space, Statistic } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import "./TestCard.css";

const getMaxBalls = (tasks) => {
  return tasks.reduce((prev, current) => prev + current.balls, 0);
};

const TestCard = ({ test, link }) => {
  return (
    <Card size="small" className={`test-card ${link && "link"}`}>
      <Space size={30} wrap>
        <Statistic title="Название теста" value={test.title} />
        <Statistic title="Всего заданий" value={test.tasks.length} />
        <Statistic title="Максимум баллов" value={getMaxBalls(test.tasks)} />
      </Space>
      {link && (
        <NavLink className="test-button" to={`/test/${test.id}`}>
          <Button type="primary" block>
            Пройти тест
          </Button>
        </NavLink>
      )}
    </Card>
  );
};

export default TestCard;
