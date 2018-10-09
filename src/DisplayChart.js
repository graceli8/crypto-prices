import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  LineChart,
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  Label,
  CartesianGrid,
  Tooltip
} from 'recharts';
import './DisplayChart.css';

class DisplayChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="fixed-width">
        <ResponsiveContainer width="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 0, left: 5, bottom: 30 }}
          >
            <XAxis dataKey="currency">
              <Label position="bottom">Currency Type</Label>
            </XAxis>
            <YAxis
              dataKey="value"
              tickFormatter={e => {
                return parseFloat(e.toFixed(4).replace(/\.?0*$/g, ''));
              }}
            />
            <CartesianGrid vertical={false} stroke="#ebf3f0" />
            <Tooltip />
            <Line dataKey="value" dot={false} stroke="#fa6d34" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default DisplayChart;
