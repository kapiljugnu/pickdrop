import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const PICK_LOCATION = 'pickLocation';
const DROP_LOCATION = 'dropLocation';

export default class Input extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        [PICK_LOCATION]: '',
        [DROP_LOCATION]: '',
    }

    onChange = (field) => (e) => {
        this.setState({ [field]: e.target.value });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state[PICK_LOCATION], this.state[DROP_LOCATION]);
    }

    onReset = () => {
        this.setState({ [PICK_LOCATION]: '', [DROP_LOCATION]: '' })
    }

    render() {
        return (
            <form>
                <label>Starting Location</label>
                <input type="text" id="pick" value={this.state[PICK_LOCATION]} onChange={this.onChange(PICK_LOCATION)}></input>
                <label>Drop-off point</label>
                <input type="text" id="drop" value={this.state[DROP_LOCATION]} onChange={this.onChange(DROP_LOCATION)}></input>
                <input type="submit" onClick={this.onFormSubmit}></input>
                <input type="button" value="Reset" onClick={this.onReset}></input>
            </form>
        );
    }
}