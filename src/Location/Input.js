import React from 'react';
import PropTypes from 'prop-types';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import './Input.css';
import Cross from './Cross';

class Input extends React.Component {
    pickSearchBoxRef = React.createRef();
    dropSearchBoxRef = React.createRef();
    pickInputRef = React.createRef();
    dropInputRef = React.createRef();

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onReset: PropTypes.func.isRequired,
        distance: PropTypes.string,
        duration: PropTypes.string,
    };

    static defaultProps = {
        distance: '',
        duration: '',
    }

    state = {
        pickLocation: '',
        dropLocation: '',
    }

    onPickChange = () => {
        const input = this.pickSearchBoxRef.current.getPlaces()[0].formatted_address;
        if (input) {
            this.setState({ pickLocation: input });
        }
    }

    onDropChange = () => {
        const input = this.dropSearchBoxRef.current.getPlaces()[0].formatted_address;
        if (input) {
            this.setState({ dropLocation: input });
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.pickLocation, this.state.dropLocation);
    }

    onPickClean = () => {
        this.pickInputRef.current.value = '';
        this.setState({ pickLocation: '' });
    }

    onDropClean = () => {
        this.dropInputRef.current.value = '';
        this.setState({ dropLocation: '' });
    }

    onReset = () => {
        this.pickInputRef.current.value = '';
        this.dropInputRef.current.value = '';
        this.setState({ pickLocation: '', dropLocation: '' }, () => {
            this.props.onReset();
        })
    }

    render() {
        const { distance, duration } = this.props;
        const submitText = distance && duration ? 'Re-Submit' : 'Submit';
        return (
            <form>
                <label htmlFor="pick">Starting Location</label>
                <StandaloneSearchBox ref={this.pickSearchBoxRef} onPlacesChanged={this.onPickChange}>
                    <div className={this.state.pickLocation ? 'cross hasValue' : 'cross'}>
                        <input type="text" id="pick" ref={this.pickInputRef} placeholder="Starting Location"></input>
                        <i onClick={this.onPickClean}>
                            <Cross />
                        </i>
                    </div>
                </StandaloneSearchBox>
                <label htmlFor="drop">Drop-off point</label>
                <StandaloneSearchBox ref={this.dropSearchBoxRef} onPlacesChanged={this.onDropChange}>
                    <div className={this.state.dropLocation ? 'cross hasValue' : 'cross'}>
                        <input type="text" id="drop" ref={this.dropInputRef} placeholder="Drop-off point"></input>
                        <i onClick={this.onDropClean}>
                            <Cross />
                        </i>
                    </div>
                </StandaloneSearchBox>
                {
                    distance !== '' && duration !== '' &&
                    (<React.Fragment>
                        <label>
                            <span>total distance:</span>
                            {distance}
                        </label>
                        <label>
                            <span>total time:</span>
                            {duration}
                        </label>
                    </React.Fragment>)
                }

                <br />
                <input type="submit" value={submitText} onClick={this.onFormSubmit}></input>
                <input type="button" value="Reset" onClick={this.onReset}></input>
            </form>
        );
    }
}

export default Input;
