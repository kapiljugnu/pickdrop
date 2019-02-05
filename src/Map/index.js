import React from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper, Marker, InfoWindow, Polyline } from 'google-maps-react';

export class Container extends React.Component {

    static propTypes = {
        path: PropTypes.array,
    }

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }
    
    render() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }
        return (
            <Map
                google={this.props.google}
                // zoom={14}
                // style={style}
                initialCenter={{ lat: 36.05298766, lng: -112.0837566 }}
            >
                {
                    this.props.path.map((path) => <Marker
                        position={path}
                    />)
                }
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API
})(Container);