import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { api } from "../../api/index";
import "./Tests.css";
import Loader from "../../components/Loader";
import TestCard from "../../components/TestCard";
import { Col, Row } from "antd";

const Tests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const results = await api({ path: "tests/", method: "GET", body: null, setIsLoading });
      setTests(results.tests);
    }

    fetchData();
  }, []);

  const mapTests = (tests || []).map((test) => (
    <Col span={8} key={test.id}>
      <TestCard link test={test} />
    </Col>
  ));

  return (
    <Layout>
      <Row gutter={[16, 16]}>{isLoading ? <Loader /> : (tests || []).length ? mapTests : "Тестов нет идите отсюда"}</Row>
    </Layout>
  );
};

export default Tests;
