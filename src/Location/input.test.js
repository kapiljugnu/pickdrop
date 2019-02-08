import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Input from './Input';

jest.mock('react-dom');

describe('Input', () => {

    const querySelector = jest.fn();
    ReactDom.findDOMNode = jest.fn(() => ({ querySelector }));
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const LOCATION_PICK = 'location pick';
    const LOCATION_DROP = 'location drop';

    it('should match the snapshot', () => {
        const inputTree = renderer.create(<Input onSubmit={onSubmit} onReset={onReset} />).toJSON();
        expect(inputTree).toMatchSnapshot();
    });

    it('onSubmit should be called with pick and drop location', () => {
        const input = mount(<Input onSubmit={onSubmit} onReset={onReset} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        input.find('form').find('input[type="submit"]').simulate('click');
        expect(onSubmit).toHaveBeenCalledWith(LOCATION_PICK, LOCATION_DROP);
    });

    it('form should be reset on reset click', () => {
        const input = mount(<Input onSubmit={onSubmit} onReset={onReset} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        input.find('form').find('input[type="button"]').simulate('click');
        expect(input.state().pickLocation).toBe('');
        expect(input.state().dropLocation).toBe('');
    });
});