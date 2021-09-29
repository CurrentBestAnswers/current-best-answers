import React from "react";
import { Helmet } from "react-helmet";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";
import RouterComp from "../router";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core";
import { store } from "../store";
import { SnackbarProvider } from "notistack";

import "./styles.scss";

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

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Header />
          <div className={classes.root}>
            <RouterComp />
          </div>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

const StoreProvider = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default StoreProvider;
