import React from "react";
import QuestionsView from "../../components/QuestionsView";
import styles from "../index.module.scss";

const Questions = ({}) => {
  return (
    <div className={styles.viewport}>
      <QuestionsView />
    </div>
  );
};

export default Questions;
