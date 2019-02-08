import React, { Component } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from '../Map';
import Location from '../Location';
import './index.css';
import getPath from '../../services/getPath';
import Direction from '../Map/Direction';
import { SERVER_ERROR, INPUT_ERROR } from '../../constants/messages';

export class App extends Component {

  state = { path: [], hasError: false, message: '', isFetching: false }

  onLocationSubmit = (pick, drop) => {
    if (!pick || !drop) {
      this.setState({ hasError: true, message: INPUT_ERROR, isFetching: false });
      return;
    }
    this.setState({ hasError: false, message: '', isFetching: true })
    getPath({ pick, drop })
      .then(({ data: { path = [] } }) => this.setState({ path }))
      .catch((error) => { this.setState({ hasError: true, message: SERVER_ERROR }) })
      .finally(() => { this.setState({ isFetching: false }) })
  }

  onReset = () => {
    this.setState({ path: [], hasError: false, message: '' });
  }

  render() {
    return (
      <Direction path={this.state.path}>
        {
          ({ directions, distance, duration }) => <div className="container">
            <div className="form">
              <Location distance={distance.toString()} duration={duration.toString()} onSubmit={this.onLocationSubmit} onReset={this.onReset} />
              {this.state.isFetching && <div className="loader" />}
              {this.state.hasError && <div className="error">{this.state.message}</div>}
            </div>
            <Map
              directions={directions}
              containerElement={<div className="map" />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>
        }
      </Direction>
    );
  }
}

export default withScriptjs(App);