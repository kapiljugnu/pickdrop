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

    beforeAll(() => {
        global.google = { maps: { places: { SearchBox: class { } }, event: { addListener: jest.fn(), removeListener: jest.fn() } } };
    });

    it('should match the snapshot', () => {
        const inputTree = renderer.create(<Input onSubmit={onSubmit} />).toJSON();
        expect(inputTree).toMatchSnapshot();
    });

    it('onSubmit should be called with pick and drop location', () => {
        const LOCATION_PICK = 'location pick';
        const LOCATION_DROP = 'location drop';
        const input = mount(<Input onSubmit={onSubmit} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        input.find('form').find('input[type="submit"]').simulate('click');
        expect(onSubmit).toHaveBeenCalledWith(LOCATION_PICK, LOCATION_DROP);
    });

    it('form should be reset on reset click', () => {
        const LOCATION_PICK = 'location pick';
        const LOCATION_DROP = 'location drop';
        const input = mount(<Input onSubmit={onSubmit} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        input.find('form').find('input[type="button"]').simulate('click');
        expect(input.state().pickLocation).toBe('');
        expect(input.state().dropLocation).toBe('');
    });
});