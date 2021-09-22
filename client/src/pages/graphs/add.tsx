import React from "react";
import styles from "../index.module.scss";
import Graph from "../../components/Graph";
import AddGraph from "../../components/AddGraph";

const Add = ({}) => {
  return (
    <div className={styles.viewport}>
      <Graph />
      <AddGraph />
    </div>
  );
};

export default Add;
