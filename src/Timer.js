import React, { Component } from "react";

class Timer extends Component {
  constructor() {
    super();
    this.timer = React.createRef();
    this.state = {
      time: 0,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16)
    };
  }

  //Your code here

  componentDidMount() {
    this.interval = setInterval(
      this.clockTick,
      this.props.updateInterval * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { time, color, logText } = this.state;
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    );
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval
    }));
  };

  stopClock = () => {
    clearInterval(this.interval);
    this.setState({ className: "hidden" });
  };

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id);
  };

  componentDidUpdate = () => {
    this.timer.current.style.color = //ref to get .current is <section className="Timer" style={{ background: color }} ref={this.timer}>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

 /*  Changing the font color here may make it clearer to observe - each Timer is updating based on the interval, but is also subject to updates to the state of its parent component, App. App's state is connected to the buttons within the Controls component, so when the - and + buttons are pressed, it causes App, and subsequently, each Timer, to update. *///Whenever the (+) or (-) is pressed, it changes color, in addition to each second changing color

/*  As mentioned in the previous section, every time App's state changes, it causes its Timer children to update. We can actually intercept and stop this from happening.

shouldComponentUpdate takes in two arguments, the next props and state from the potential update. That is to say, when a component is about to update, it calls shouldComponentUpdate, passing in the new props and state. Whatever the return value is will determine if the component will continue with the update process. Because of this, from within shouldComponentUpdate, we have access to both the current props and state, accessible with this.state and this.props, and the next props and state, represented below as nextProps and nextState: */

shouldComponentUpdate = (nextProps, nextState) =>{ //If statement to determine if compoonentDidUpdate should be called
  if (this.state.time === nextState.time) {
    return false //true -true-false makes changes only when there are changes in the app, and disables the time from ticking until changes to the app (increment interval or add new timer) are make, although the clock will remain ticking in the background
    // setting false/ true makes means that the componentDidUpdate should not update if the only if the time does not change. "Out of the box, the shouldComponentUpdate() is a no-op that returns true. This means every time we start an Update in a Component, we will re-render."
    //false/true has the same result as true/false combination. 
  }
  return true //setting false-false deactivates all updates in app.js and timer.js
}
}

export default Timer;
