import React, { Component } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from '../Map';
import LocationInput from '../Location/Input';
import './index.css';
import { getPath } from '../Api/action';
import Direction from '../Map/Direction';

export class App extends Component {

  state = { path: [], hasError: false }

  onLocationSubmit = (pick, drop) => {
    if (pick && drop) {
      getPath({ pick, drop })
        .then(({ data: { path = [] } }) => this.setState({ path }))
        .catch((error) => { this.setState({ hasError: true }) });
    }
  }

  onReset = () => {
    this.setState({ path: [] });
  }

  render() {
    return (
      <Direction path={this.state.path}>
        {
          ({ directions, distance, duration }) => <div className="container">
            <div className="form">
              <LocationInput distance={distance.toString()} duration={duration.toString()} onSubmit={this.onLocationSubmit} onReset={this.onReset} />
              {this.state.hasError && <div className="error">Error Occured while loading the data, please try again</div>}
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