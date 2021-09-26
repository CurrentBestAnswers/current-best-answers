import React from "react";
import Graph from "../../components/Graph";
import AddGraph from "../../components/AddGraph";

import styles from "../index.module.scss";

const Add = ({}) => {
  return (
    <div className={styles.viewport}>
      <Graph />
      <AddGraph />
    </div>
  );
};

export default Add;
