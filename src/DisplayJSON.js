import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import './DisplayJSON.css';

class DisplayJSON extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="container">
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    );
  }
}

export default DisplayJSON;
