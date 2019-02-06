import React, { Component } from 'react';
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
          <LocationInput onSubmit={this.onLocationSubmit} />
        </div>
        <Map
          path={this.state.path}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div className="map" />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default App;