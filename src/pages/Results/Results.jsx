import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { api } from "../../api";
import Loader from "../../components/Loader";
import Result from "../../components/Results";
import "./Results.css";

const Results = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    async function fetchData() {
      const result = await api({ path: `results/${userID}`, method: "GET", setIsLoading });
      setResults(result.results);
    }
    fetchData();
  }, []);

  return <Layout>{isLoading ? <Loader /> : <Result results={results || []} />}</Layout>;
};

export default Results;
