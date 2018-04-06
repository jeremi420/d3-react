import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import mockData from "./data/mockData.json";
import BarChart from "./BarChart";

class App extends Component {
	render() {
		// debugger;
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to
					reload.
				</p>
				<BarChart width={500} height={500} data={mockData} />
			</div>
		);
	}
}

export default App;
