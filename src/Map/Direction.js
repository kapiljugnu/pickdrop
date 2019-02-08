/* global google */
import React from 'react';
import PropTypes from 'prop-types';

const defaultState = { directions: null, distance: '', duration: '' }
class Direction extends React.Component {
    static propTypes = { children: PropTypes.func, path: PropTypes.array }
    static defaultProps = {
        path: []
    }

    state = { ...defaultState };

    componentDidMount() {
        this.fetchDirection();
    }

    componentDidUpdate() {
        this.fetchDirection();
    }

    fetchDirection() {
        if (this.props.path.length > 0) {
            this.getDirections();
        }
    }

    getDirections() {
        const { DirectionsService, TravelMode, DirectionsStatus, LatLng } = google.maps;
        const getCoordinates = (path) => new LatLng(Number(path[0]), Number(path[1]));
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
                console.log(result.routes[0].legs)
                const computed = result.routes[0].legs.reduce((total, current) => {
                    total.distance += current.distance.value;
                    total.duration += current.duration.value;
                    return total
                }, { distance: 0, duration: 0 })
                this.setState({
                    directions: result,
                    distance: computed.distance,
                    duration: computed.duration,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    render() {
        let details = defaultState;
        if (this.props.path.length > 0) {
            details = this.state;
        }
        return this.props.children({ ...details })
    }
}

export default Direction;