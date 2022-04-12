import { Card, Collapse, Input, Space, Statistic, Table } from "antd";
import React from "react";
import "./Results.css";
import { columns } from "./constants";

const dataForTable = (data) =>
  data.test.tasks.map((key) => ({
    number: key.id,
    description: key.description,
    answer: key.answer,
    yourAnswer: data.answers.find((a) => key.id === a.taskId)?.answer || "ПУСТО",
    balls: key.balls,
  }));

const getRightAnswers = (tasks, answers) =>
  tasks.filter((task) => task.answer === answers.find((a) => a.taskId === task.id)?.answer).length;

const getAllBalls = (tasks) => tasks.reduce((prev, current) => prev + current.balls, 0);
const getRightBalls = (tasks, answers) =>
  tasks.reduce((prev, current) => {
    if (current.answer === answers.find((a) => a.taskId === current.id)?.answer) {
      return prev + current.balls;
    }

    return prev;
  }, 0);

const getResults = (results) =>
  results.map((result) => ({ test: result.tests[0], answers: result.answers, id: result.id, user: result.user }));

const Results = ({ results }) => {
  const mapResults = getResults(results).map((result, idx) => (
    <Collapse.Panel header={`Тест: ${result.test.title}`} key={idx}>
      <Table pagination={{ position: ["none", "none"] }} bordered columns={columns} dataSource={dataForTable(result)} />
      <Card>
        <Space size="large">
          <Statistic title="Всего дано ответов" value={`${result.answers.length} из ${result.test.tasks.length}`} />
          <Statistic
            title="Правильных ответов"
            value={`${getRightAnswers(result.test.tasks, result.answers)} из ${result.test.tasks.length}`}
          />
          <Statistic
            title="Полученно баллов"
            value={`${getRightBalls(result.test.tasks, result.answers)} из ${getAllBalls(result.test.tasks)}`}
          />
        </Space>
      </Card>
    </Collapse.Panel>
  ));

  return <>{results.length ? <Collapse className="results">{mapResults}</Collapse> : "Вы еще не прошли не один тест"}</>;
};

export default Results;
