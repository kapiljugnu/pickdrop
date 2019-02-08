import React from 'react';
import PropsTypes from 'prop-types';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"

const Map = ({ directions }) => (<GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
>
    {directions && <DirectionsRenderer directions={directions} />}
</GoogleMap>);

Map.propTypes = {
    directions: PropsTypes.array,
}

export default withGoogleMap(Map)