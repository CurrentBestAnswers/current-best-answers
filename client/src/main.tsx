import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const StoreProvider = React.lazy(() => import("./pages/_app"));

ReactDOM.render(
  <Suspense fallback={<></>}>
    <StoreProvider />
  </Suspense>,
  document.getElementById("root")
);
