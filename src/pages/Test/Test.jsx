import { Button, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../api";
import Loader from "../../components/Loader";
import TestCard from "../../components/TestCard";
import Tasks from "../../components/Tasks";
import Layout from "../../Layout";
import "./Test.css";

const Test = () => {
  const { id } = useParams();
  const userID = localStorage.getItem("userID");
  const [isLoading, setIsLoading] = useState(false);
  const [test, setTest] = useState({});
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const finishTest = () => {
    const answersForApi = Object.entries(answers).map(([key, value]) => ({ taskId: +key, answer: value.trim() }));
    const data = {
      answers: answersForApi,
      test: test.id,
      user: userID,
    };

    api({ path: "results/create", method: "POST", body: data, setIsLoading, navigateToSuccess: navigate("/results") });
  };

  useEffect(() => {
    async function fetchData() {
      const result = await api({ path: `tests/${id}`, method: "GET", setIsLoading });
      setTest(result.test);
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      {isLoading || !Object.keys(test).length ? (
        <Loader />
      ) : (
        <>
          <Row className="test-info">
            <Col span={14}>
              <TestCard test={test} />
            </Col>
          </Row>
          <Row>
            <Typography.Title className="test-tasks__title" level={3}>
              Задания
            </Typography.Title>
          </Row>

          <Row>
            <Tasks tasks={test.tasks} answers={answers} setAnswers={setAnswers} />
          </Row>

          <Row className="test-buttons">
            <Button type="primary" onClick={finishTest}>
              Завершить тест
            </Button>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default Test;
