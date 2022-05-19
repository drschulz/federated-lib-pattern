import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Header, add } from "federated_lib";

import "./index.css";

const App = () => {
  

  return (
    <div style={{ paddingTop: '200px'}}>
      <Header backgroundColor='red' title='HOST HEADER' />
      <Counter />
    </div>
  );
};

const Counter: React.FC = () => {
  const [sum, setSum] = useState(0);

  const addNums = () => {
    setSum(curSum => add(curSum, 1));
  }

  return (
    <>
      <button onClick={addNums}>Increment</button>
      <div>Sum: {sum}</div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("app"));
