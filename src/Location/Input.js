import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import './Input.css';

class Input extends React.Component {
    pickSearchBoxRef = React.createRef();
    dropSearchBoxRef = React.createRef();
    pickInputRef = React.createRef();
    dropInputRef = React.createRef();

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        pickLocation: '',
        dropLocation: '',
    }

    onPickChange = () => {
        const input = this.pickSearchBoxRef.current.getPlaces()[0].formatted_address;
        this.setState({ pickLocation: input });
    }

    onDropChange = () => {
        const input = this.dropSearchBoxRef.current.getPlaces()[0].formatted_address;
        this.setState({ dropLocation: input });
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.pickLocation, this.state.dropLocation);
    }

    onReset = () => {
        this.pickInputRef.current.value = '';
        this.dropInputRef.current.value = '';
        this.setState({ pickLocation: '', dropLocation: '' })
    }

    render() {
        return (
            <form>
                <StandaloneSearchBox ref={this.pickSearchBoxRef} onPlacesChanged={this.onPickChange}>
                    <input type="text" id="pick" ref={this.pickInputRef} placeholder="Pickup Location"></input>
                </StandaloneSearchBox>
                <StandaloneSearchBox ref={this.dropSearchBoxRef} onPlacesChanged={this.onDropChange}>
                    <input type="text" id="drop" ref={this.dropInputRef} placeholder="Where to?"></input>
                </StandaloneSearchBox>
                <input type="submit" onClick={this.onFormSubmit}></input>
                <input type="button" value="Reset" onClick={this.onReset}></input>
            </form>
        );
    }
}

export default withScriptjs(Input);
