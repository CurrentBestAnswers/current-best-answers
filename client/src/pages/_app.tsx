import { configureStore } from "@xrengine/client-core/src/store";
import React, { useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import reducers from "../reducers";
import "./styles.scss";
import { restoreState } from "@xrengine/client-core/src/persisted.store";
import RouterComp from "../router";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "calc(100vh - 64px)",
    width: "100%",
    overflow: "auto",
  },
}));

const App = (): any => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initApp = useCallback(() => {
    dispatch(restoreState());
  }, []);

  useEffect(initApp, []);

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Header />
        <div className={classes.root}>
          <RouterComp />
        </div>
      </ThemeProvider>
    </>
  );
};

const StoreProvider = () => {
  return (
    <Provider store={configureStore(reducers)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default StoreProvider;
