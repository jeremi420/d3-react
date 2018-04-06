import React, { Component } from "react";
import PropTypes from "prop-types";

import { select } from "d3-selection";
import { max } from "d3-array";
import { scaleLinear } from "d3-scale";
import { axisBottom } from "d3-axis";

const SVG_REF = "svg";
const BAR_WIDTH = 25;
const DEFAULT_PADDING = 50;

class BarChart extends Component {
	render() {
		const { width, height } = this.props;
		const padding = this.props.padding || DEFAULT_PADDING;
		return (
			<svg
				width={width + padding * 2}
				height={height + padding * 2}
				ref={SVG_REF}
			/>
		);
	}

	componentDidMount() {
		this.renderChart();
	}

	componentWillUpdate() {
		this.renderChart();
	}

	renderChart() {
		const { data, width, height } = this.props;
		const padding = this.props.padding || DEFAULT_PADDING;
		const maxVal = max(data);
		const yScale = scaleLinear()
			.domain([0, maxVal])
			.range([0, width]);
		const xScale = scaleLinear()
			.domain([0, 20])
			.range([0, width]);
		select(SVG_REF)
			.append("g")
			.attr("postion", "fixed")
			.attr("transform", `translate(${padding}, ${height + padding})`)
			.call(axisBottom(xScale).ticks(20));
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
			.attr("x", (d, i) => i * BAR_WIDTH + padding)
			.attr("y", d => height + padding - yScale(d))
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
