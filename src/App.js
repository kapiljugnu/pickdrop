import React, { Component } from 'react';
import Map from './Map';
import LocationInput from './Location/Input';
import './App.css';
import API from './Api';

export class App extends Component {
  state = {
    pick: '',
    drop: '',
  }

  onLocationSubmit = (pick, drop) => {
    this.setState({ pick, drop })
  }

  render() {
    const { pick, drop } = this.state;
    return (
      <div className="container">
        <div className="form">
          <LocationInput onSubmit={this.onLocationSubmit} />
        </div>
        <div className="map">
          <API pickLocation={pick} dropLocation={drop}>
            {
              (path) => <Map path={path} />
            }
          </API>
        </div>
      </div>
    );
  }
}

export default App;