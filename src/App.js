import React, { Component } from 'react';
import Map from './Map';
import LocationInput from './Location/Input';
import './App.css';
import { getPath } from './Api/action';

export class App extends Component {
  state = {
    path: []
  }

  onLocationSubmit = (pick, drop) => {
    const transformPath = (item) => ({ lat: item[0], lng: item[1] })
    getPath({ pick, drop }).then(({ data: { path = [] } }) => this.setState({ path: path.map(transformPath) }))
  }

  render() {
    const { path } = this.state;
    return (
      <div className="container">
        <div className="form">
          <LocationInput onSubmit={this.onLocationSubmit} />
        </div>
        <div className="map">
          <Map path={path} />
        </div>
      </div>
    );
  }
}

export default App;