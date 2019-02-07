import React, { Component } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from './Map';
import LocationInput from './Location/Input';
import './App.css';
import { getPath } from './Api/action';

export class App extends Component {

  state = { path: [] }

  onLocationSubmit = (pick, drop) => {
    if (pick && drop) {
      getPath({ pick, drop }).then(({ data: { path = [] } }) => this.setState({ path }));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="form">
          <LocationInput
            onSubmit={this.onLocationSubmit} />
        </div>
        <Map
          path={this.state.path}
          containerElement={<div className="map" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default withScriptjs(App);