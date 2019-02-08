import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API}&v=3.exp&libraries=geometry,drawing,places`;


ReactDOM.render(<App
    googleMapURL={googleMapUrl}
    loadingElement={<div className="loader" />}
/>, document.getElementById('root'));
