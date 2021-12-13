/*
  **************
  Satyam Tomar
  *************
*/

import React, { useState, useEffect } from "react";

import Bar from "./components/Bar";
import BubbleSort from "./algorithms/BubbleSort";

import "./App.css";

// MyLogic (Responsive site made using tailwind css)
// 1) as page loads i will create  some random elements of some size n
// 2) then user can change length of input in provided input field
// 3) and after clicking on submit first i will generate all steps needed to sort.
// 4) then after getting all steps I will start showing animations according to steps i got.
// 5) Implemented component based coding with user friendly folder structure.

const App = () => {
  const [array, setarray] = useState([]); // this array contains length og bars
  const [steps, setsteps] = useState([]); // it is used to store all the steps to be done in bubbleSort
  const [colorkey, setcolorkey] = useState([]); // this stores colors of bars which I'm using in this website
  const [colors, setcolors] = useState([]); // this array contains color of particular bar
  const [timout, settimout] = useState([]); // this contains timeouts which used for animations

  const [currStep, setcurrStep] = useState(0); // Used to determine the current step
  const [count, setcount] = useState(10);

  // this delay is speed of animation
  const delay = 500;

  // this function runs on load and generate random elements..
  useEffect(() => {
    generateElements();
  }, []);

  // works on clicking startSort button
  const handleStart = () => {
    generateSteps();
    let STEPS = [...steps];
    let COLORS = [...colors];

    clearTimeouts();
    let timeouts = [];

    let i = 0;
    while (i < STEPS.length - currStep) {
      let timeout = setTimeout(() => {
        let CURRSTEP = currStep;
        setarray(STEPS[CURRSTEP]);
        setcolorkey(COLORS[CURRSTEP]);
        setcurrStep(CURRSTEP + 1);
        timeouts.push(timeout);
      }, delay * i);
      i++;
    }
    settimout(timeouts);
  };

  // generate steps to be done for bubble sort
  const generateSteps = () => {
    let ARR = [...array];
    let STEPS = [...steps];
    let COLORS = [...colors];

    const data = BubbleSort(ARR, 0, STEPS, COLORS);

    setsteps(data.steps);
    setcolors(data.colors);
  };

  // helper fn to generate random elements
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // clears timeouts after work done
  const clearTimeouts = () => {
    timout.forEach((timeout) => clearTimeout(timeout));
    settimout([]);
  };

  // clears colorKeys
  const clearColorKey = () => {
    let blank = new Array(count).fill(0);
    setcolorkey(blank);
    setcolors([blank]);
  };

  // create random length of bar upto 100...
  const generateElements = async () => {
    clearTimeouts();
    clearColorKey();

    let COUNT = count;
    let arr = [];

    for (let i = 0; i < COUNT; i++) {
      arr.push(generateRandomNumber(50, 200));
    }

    const fn = (cb) => {
      setarray([...arr]);
      setsteps([arr]);
      setcount(COUNT);
      setcurrStep(0);

      cb();
    };

    fn(generateSteps);
  };

  const allBars = array.map((value, index) => {
    return (
      <Bar
        key={index}
        length={value}
        colorKey={colorkey[index]}
        arrayLen={array.length}
      />
    );
  });

  return (
    <div className="app  ">
      <div className="flex flex-row justify-center md:pt-8 pt-4">
        <h1 className="text-2xl md:text-5xl text-gray-50 hover:text-gray-400 ">
          BubbleSort Visualizer
        </h1>
      </div>
      <div className="pt-8 md:pt-20  justify-center flex flex-row items-center gap-x-1">
        <div
          className="hover:bg-gray-900  w-6 text-center font-bold text-white cursor-pointer h-6 bg-sky-900"
          onClick={() => {
            if (count < 200) {
              setcount(count + 1);
              generateElements();
            }
          }}
        >
          +
        </div>
        <div className="border-2 border-gray-400 ">
          <input
            type="number"
            className="bg-white hover:bg-gray-400"
            value={count}
            onChange={handleCountChange}
          />
        </div>
        <div
          className="hover:bg-gray-900 w-6 text-center font-bold text-white cursor-pointer h-6 bg-sky-900"
          onClick={() => {
            if (count > 5) {
              setcount(count - 1);
              generateElements();
            }
          }}
        >
          -
        </div>
      </div>
      <div className="frame  w-full ">
        <div className="card container space-x-2 justify-center">{allBars}</div>
      </div>
      <div className="flex flex-row justify-center md:pt-8 pt-4">
        <button
          onClick={handleStart}
          className="rounded-full hover:bg-gray-900 py-2 px-3 font-lg bg-sky-900 text-gray-100 "
        >
          Start the sort
        </button>
      </div>
      <div className="flex flex-row justify-center md:pt-8 pt-4">
        <h1 className="text-xl md:text-2xl text-gray-50 hover:text-gray-400 pt-1 md:pt-4">
          Made by Satyam Tomar
        </h1>
      </div>
    </div>
  );
};

export default App;
