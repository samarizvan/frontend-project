import React, { Component } from 'react';
import './App.css';
import Routes from "./routes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      appName: "Openhouse",
      home: true
    };
  }
  render() {
    return (
      <div className="mainWrapper">
      <Routes name={this.state.appName} />
    </div>
    )
  }
}

export default App