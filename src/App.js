import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import {
  Navbar,
  Nav,
  FormGroup,
  ControlLabel,
  FormControl,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import Select from 'react-select';
import keys from './config/keys.js';
import DisplayTable from './DisplayTable';
import DisplayChart from './DisplayChart';
import DisplayJSON from './DisplayJSON';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      values: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.loadPrices = this.loadPrices.bind(this);
  }

  async componentDidMount() {
    setInterval(this.loadPrices, 60000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.values != prevState.values) {
      this.loadPrices();
    }
  }

  async loadPrices() {
    fetch(
      `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${this.state.values.split(
        ' '
      )}&tsyms=USD`,
      {
        method: 'GET'
      }
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.Response != 'Error') {
          const rates = Object.keys(data).map(key => {
            return { currency: key, value: data[key].USD };
          });
          this.setState({ data: [...rates] });
        } else {
          if (this.state.values.split(' ').length == 1) {
            this.setState({ data: [] });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.setState({ values: e.target.value.toUpperCase() });
  }

  render() {
    return (
      <div className="App">
        <Navbar className="nav" fluid>
          <Nav>Check Cyprtocurrency Values in Real Time</Nav>
        </Navbar>
        <Grid fluid className="grid-wrapper">
          <Row className="row">
            <Col md={1} />
            <Col md={5}>
              <ControlLabel className="form-label">
                Enter a cryptocurrency symbol to check its current price:
              </ControlLabel>
            </Col>
            <Col md={5}>
              <FormControl
                className="form-input"
                type="text"
                value={this.state.values}
                placeholder="Enter text"
                onChange={this.handleChange}
              />
            </Col>
          </Row>
          <DisplayTable data={this.state.data} />
          <DisplayChart data={this.state.data} />
          <DisplayJSON data={this.state.data} />
        </Grid>
      </div>
    );
  }
}

export default App;
