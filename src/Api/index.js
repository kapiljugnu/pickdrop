import React from 'react';
import PropTypes from 'prop-types';
import { getPath } from './action';

export default class RouteApi extends React.Component {
    static propTypes = {
        pickLocation: PropTypes.string,
        dropLocation: PropTypes.string,
    }

    state = { path: [] }

    componentDidMount() {
        this.callApi();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.pickLocation === this.props.pickLocation &&
            prevProps.dropLocation === this.props.dropLocation) {
            return;
        }
        this.callApi();
    }

    callApi() {
        if (!(this.props.pickLocation || this.props.dropLocation)) {
            return;
        }
        const details = {
            pick: this.props.pickLocation,
            drop: this.props.dropLocation,
        };
        getPath(details).then(({ data: { path = [] } }) => this.setState({ path }))
    }

    render() {
        return this.props.children(this.state.path)
    }
}