import React from "react";
import Layout from "./layout";

function UberGrid(props) {
  const data = [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ];

  return <div>
    <Layout data={data} />
  </div>;
}

export default UberGrid;
