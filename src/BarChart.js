import React, { Component } from "react";
import PropTypes from "prop-types";

import { select } from "d3-selection";
import { max } from "d3-array";
import { scaleLinear } from "d3-scale";

const SVG_REF = "svg";
// const BAR_COLOR = "#fe9922";
const BAR_WIDTH = 25;

class BarChart extends Component {
	render() {
		const { width, height } = this.props;
		return <svg width={width} height={height} ref={SVG_REF} />;
	}

	componentDidMount() {
		this.renderChart();
	}

	componentWillUpdate() {
		this.renderChart();
	}

	renderChart() {
		const { data, width } = this.props;
		const maxVal = max(data);
		const yScale = scaleLinear()
			.domain([0, maxVal])
			.range([0, width]);
		select(SVG_REF)
			.selectAll("rect")
			.data(data)
			.enter()
			.append("rect");
		select(SVG_REF)
			.selectAll("rect")
			.data(data)
			.exit()
			.remove();
		select(SVG_REF)
			.selectAll("rect")
			.data(data)
			.attr("class", "chartBar")
			.attr("x", (d, i) => i * BAR_WIDTH)
			.attr("y", d => width - yScale(d))
			.attr("height", d => yScale(d))
			.attr("width", BAR_WIDTH);
	}
}

BarChart.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	data: PropTypes.array.isRequired
};

export default BarChart;
