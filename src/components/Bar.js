/*
  **************
  Satyam Tomar
  *************
*/

import React from "react";
import useWindowDimensions from "../getDimensions";

const Bars = ({ length, colorKey, arrayLen }) => {
  const { width } = useWindowDimensions();
  const colors = ["#3d5af1", "#ff304f", "#83e85a"];

  let barStyle = {
    background: colors[colorKey],
    height: 2 * length,
    marginTop: 300 - 2 * length,
    width: Math.max(width / 3 / arrayLen, 40),
    color: "white",
  };

  return (
    <div
      className="relative gap-x-2 hover:shadow-md hover:shadow-gray-200/50 "
      style={barStyle}
    >
      <span className="text-gray-800 font-bold absolute -rotate-90 top-2 left-0 ">
        {width > 640 && length}
      </span>
    </div>
  );
};

export default Bars;
