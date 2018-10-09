import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

class DisplayTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <Table striped bordered condensed hover responsive>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Current Price (in USD)</th>
          </tr>
        </thead>
        <tbody>
          {data.map(e => (
            <tr>
              <td>{e.currency}</td>
              <td>{e.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default DisplayTable;
