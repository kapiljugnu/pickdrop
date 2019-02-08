import React, { Component } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from '../Map';
import LocationInput from '../Location/Input';
import './index.css';
import { getPath } from '../Api/action';
import Direction from '../Map/Direction';
import { SERVER_ERROR, INPUT_ERROR } from '../constants/messages';

export class App extends Component {

  state = { path: [], hasError: false, message: '' }

  onLocationSubmit = (pick, drop) => {
    this.setState({ hasError: false, message: '' })
    if (pick && drop) {
      getPath({ pick, drop })
        .then(({ data: { path = [] } }) => this.setState({ path }))
        .catch((error) => { this.setState({ hasError: true, message: SERVER_ERROR }) });
    } else {
      this.setState({ hasError: true, message: INPUT_ERROR })
    }
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
              <LocationInput distance={distance.toString()} duration={duration.toString()} onSubmit={this.onLocationSubmit} onReset={this.onReset} />
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