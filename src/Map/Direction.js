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
        const getCoordinates = (path) => new google.maps.LatLng(Number(path[0]), Number(path[1]))
        const { DirectionsService, TravelMode, DirectionsStatus } = google.maps;
        const directionsService = new DirectionsService();
        const waypoints = this.props.path.slice(1, -1).map((current) =>
            ({ location: getCoordinates(current) }));
        directionsService.route({
            origin: getCoordinates(this.props.path[0]),
            destination: getCoordinates(this.props.path[1]),
            waypoints,
            travelMode: TravelMode.DRIVING,
        }, (result, status) => {
            if (status === DirectionsStatus.OK) {
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