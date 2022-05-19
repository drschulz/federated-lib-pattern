import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Header } from "./components/Header";

import "./index.css";

const App = () => (
  <div>
    <Header title='REMOTE HEADER' backgroundColor='navy' />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
