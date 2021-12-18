import React, { Component, useEffect } from "react";                                                                 
import Bar from "./components/Bargraph";
import BubbleSort from "./algorithms/BubbleSortalgo";

import "./App.css";

class App extends Component {
  state = {
    array: [],
    steps: [],
    colorKey: [],
    colors: [],
    timouts: [],
    currentStep: 0,
    count: 20,
    delay: 500,
    algorithm: "",
  };

  componentDidMount() {
    this.generateElements();
  }
  handleCountChange = (e) => {
    let val = e.target.value;
		if (val === '') {
			this.setState({count:0},()=>this.generateElements());
		} else {
			val = parseInt(val);
      if(val > 100) val = 100;
      if(val < 1) val = 1;

      this.setState({count:val},()=>this.generateElements());
			
		}
  };

  handleStart = () => {
    let steps = this.state.steps;
    let colors = this.state.colors;

    //  this.clearTimeouts();
     let timeouts = [];

    let i = 0;
    while (i < steps.length - this.state.currentStep) {
      let timeout = setTimeout(() => {
        let currentStep = this.state.currentStep;
        this.setState({
          array: steps[currentStep],
          colorKey: colors[currentStep],
          currentStep: currentStep + 1,
        });
        timeouts.push(timeout);
      }, this.state.delay * i);
      i++;
    }

    // this.setState({
    //   timeouts: timeouts,
    // });
  };

  generateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.steps.slice();
    let colors = this.state.colors.slice();
    console.log(colors);
    BubbleSort(array, 0, steps, colors);
    console.log(colors);
    this.setState({
      steps: steps,
      colors: colors,
    });
  };

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  clearTimeouts = () => {
    this.state.timouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({ timeouts: [] });
  };

  clearColorKey = () => {
    let blank = new Array(this.state.count).fill(0);
    this.setState({ colorKey: blank, colors: [blank] });
  };

  generateElements = () => {
    this.clearTimeouts();
    this.clearColorKey();

    let count = this.state.count;
    let arr = [];

    for (let i = 0; i < count; i++) {
      arr.push(this.generateRandomNumber(20, 100));
    }

    this.setState(
      {
        array: arr,
        steps: [arr],
        count: count,
        currentStep: 0,
      },
      () => this.generateSteps()
    );

    console.log(arr);
  };

  changeArray = (index, value) => {
    let array = this.state.array;
    array[index] = value;
    this.setState(
      {
        array: array,
        steps: [array],
        currentStep: 0,
      },
      () => this.generateSteps()
    );
  };

  render() {
    const bars = this.state.array.map((value, index) => {
      return (
        <Bar
          key={index}
          index={index}
          length={value}
          colorKey={this.state.colorKey[index]}
          changeArray={this.changeArray}
          arrayLen={this.state.array.length}
        />
      );
    });
    return (
      <div className="app  ">
       <div className="flex flex-row justify-center md:pt-8 pt-4">
         <h1 className="text-2xl md:text-5xl text-gray-50 hover:text-gray-400 ">BubbleSort Visualizer</h1>
       </div>
        <div className="pt-8 md:pt-20  justify-center flex flex-row items-center gap-x-1">
          <div
            className="hover:bg-gray-900  w-6 text-center font-bold text-white cursor-pointer h-6 bg-sky-900"
            onClick={() => {
              if (this.state.count <200) {
                this.setState({ count: this.state.count + 1 },()=>this.generateElements());
              }
            }}
          >
            +
          </div>
          <div className="border-2 border-gray-400 "  >
          <input
            type="number"
            className="bg-white hover:bg-gray-400"
            placeholder="Enter length of array"
            value={this.state.count}
            onChange={this.handleCountChange}
          />
          </div>
          <div
            className="hover:bg-gray-900 w-6 text-center font-bold text-white cursor-pointer h-6 bg-sky-900"
            onClick={() => {
              if (this.state.count > 5) {
                this.setState({ count: this.state.count - 1 },()=>this.generateElements());
              }
            }}
          >
            -
          </div>
        </div>
        <div className="frame  w-full ">
          <div className="card container space-x-2 justify-center">{bars}</div>
        </div>
        <div className="flex flex-row justify-center md:pt-8 pt-4">
        <button onClick={this.handleStart} className="rounded-full hover:bg-gray-900 py-2 px-3 font-lg bg-sky-900 text-gray-100 " >Start the sort</button>
        </div>
        <div className="flex flex-row justify-center md:pt-8 pt-4">
         <h1 className="text-xl md:text-2xl text-gray-50 hover:text-gray-400 pt-1 md:pt-4">Made by Satyam Tomar</h1>
       </div>
      
      </div>
    );
  }
}

export default App;