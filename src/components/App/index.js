import React, { useState } from 'react';
import { withScriptjs } from 'react-google-maps';
import Map from '../Map';
import Location from '../Location';
import './index.css';
import getPath from '../../services/getPath';
import { useDirections } from '../Map/Direction';
import { SERVER_ERROR, INPUT_ERROR } from '../../constants/messages';


const App = () => {
  const [paths, setPaths] = useState([]);
  const [message, setMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const { directions, distance, duration } = useDirections(paths);

  function onLocationSubmit(pick, drop) {
    if (!pick || !drop) {
      setPaths([]);
      setMessage(INPUT_ERROR);
      setIsFetching(false);
      return;
    }
    setPaths([]);
    setMessage('');
    setIsFetching(true);
    getPath({ pick, drop })
      .then(({ data: { path = [] } }) => {
        setPaths(path)
      })
      .catch((error) => {
        setMessage(SERVER_ERROR);
      })
      .finally(() => { setIsFetching(false) })
  }

  function onReset() {
    setPaths([]);
    setMessage('');
    setIsFetching(false);
  }

  return (
    <div className="container">
      <div className="form">
        <Location distance={distance.toString()} duration={duration.toString()} onSubmit={onLocationSubmit} onReset={onReset} />
        {isFetching && <div className="loader" />}
        {message && <div className="error">{message}</div>}
      </div>
      <Map
        directions={directions}
        containerElement={<div className="map" />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>)
}

export default withScriptjs(App);