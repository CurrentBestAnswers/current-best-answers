import React from "react";
import AppHeader from "../components/Header";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styles from "./index.module.scss";

const mapStateToProps = (state: any): any => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch): any => ({});

const Home = ({}) => {
  return (
    <div className={styles.viewport}>
      <AppHeader title={"Current Best Answers"} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
