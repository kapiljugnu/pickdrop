import React from 'react';
import ReactDom from 'react-dom';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Location from './index';

jest.mock('react-dom');

describe('Input', () => {

    const querySelector = jest.fn();
    ReactDom.findDOMNode = jest.fn(() => ({ querySelector }));
    const onSubmit = jest.fn();
    const onReset = jest.fn();
    const LOCATION_PICK = 'location pick';
    const LOCATION_DROP = 'location drop';

    it('should match the snapshot', () => {
        const locationTee = renderer.create(<Location onSubmit={onSubmit} onReset={onReset} />).toJSON();
        expect(locationTee).toMatchSnapshot();
    });

    it('onSubmit should be called with pick and drop location', () => {
        const locationTree = mount(<Location onSubmit={onSubmit} onReset={onReset} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        locationTree.find('form').find('input[type="submit"]').simulate('click');
        expect(onSubmit).toHaveBeenCalledWith(LOCATION_PICK, LOCATION_DROP);
    });

    it('form should be reset on reset click', () => {
        const locationTree = mount(<Location onSubmit={onSubmit} onReset={onReset} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        locationTree.find('form').find('input[type="button"]').simulate('click');
        expect(locationTree.state().pickLocation).toBe('');
        expect(locationTree.state().dropLocation).toBe('');
        expect(onReset).toHaveBeenCalled();
    });

    it('pick location should be clean on cross button', () => {
        const locationTree = mount(<Location onSubmit={onSubmit} onReset={onReset} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        locationTree.find('form').find('#pick + i').simulate('click')
        expect(locationTree.state().pickLocation).toBe('');
        expect(locationTree.state().dropLocation).toBe(LOCATION_DROP);
    });

    it('drop location should be clean on cross button', () => {
        const locationTree = mount(<Location onSubmit={onSubmit} onReset={onReset} />)
            .setState({ pickLocation: LOCATION_PICK, dropLocation: LOCATION_DROP });
        locationTree.find('form').find('#drop + i').simulate('click')
        expect(locationTree.state().pickLocation).toBe(LOCATION_PICK);
        expect(locationTree.state().dropLocation).toBe('');
    });
});