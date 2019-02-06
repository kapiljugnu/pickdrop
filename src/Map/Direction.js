/* global google */
import React from 'react';
import PropTypes from 'prop-types';
class Direction extends React.Component {
    static propTypes = { children: PropTypes.func, path: PropTypes.array }

    static defaultProps = {
        path: []
    }

    state = { directions: null }

    componentDidMount() {
        if (this.props.path.length > 0) {
            this.getDirections();
        }
    }

    componentDidUpdate() {
        if (this.props.path.length > 0) {
            this.getDirections();
        }
    }

    getDirections() {
        const DirectionsService = new google.maps.DirectionsService();
        const start = this.props.path[0];
        const end = this.props.path[1];
        DirectionsService.route({
            origin: new google.maps.LatLng(Number(start[0]), Number(start[1])),
            destination: new google.maps.LatLng(Number(end[0]), Number(end[1])),
            // waypoints:[{location:}],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    render() { return this.props.children(this.state.directions) }
}

export default Direction;