import React from 'react';
import PropsTypes from 'prop-types';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps"
import Direction from './Direction';

export class Container extends React.Component {
    static propTypes = {
        path: PropsTypes.array,
    }

    render() {
        return (
            <Direction path={this.props.path}>
                {
                    (directions) => <GoogleMap
                        defaultZoom={8}
                        defaultCenter={{ lat: -34.397, lng: 150.644 }}
                    >
                        {directions && <DirectionsRenderer directions={directions} />}
                    </GoogleMap>
                }
            </Direction>

        )
    }
}

export default withGoogleMap(Container)