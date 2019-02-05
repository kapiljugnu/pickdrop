import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Input from './Input';


describe('Input', () => {
    it('should match the snapshot', () => {
        const inputTree = renderer.create(<Input onSubmit={() => { }} />).toJSON();
        expect(inputTree).toMatchSnapshot();
    })

    it('onSubmit should be called with pick and drop location', () => {
        const onSubmit = jest.fn();
        const LOCATION_PICK = 'location pick';
        const LOCATION_DROP = 'location drop';
        const InputComponent = mount(<Input onSubmit={onSubmit} />);
        const form = InputComponent.find('form');
        form.find('#pick').simulate('change', { target: { value: LOCATION_PICK } });
        form.find('#drop').simulate('change', { target: { value: LOCATION_DROP } });
        form.find('input[type="submit"]').simulate('click');
        expect(onSubmit).toHaveBeenCalledWith(LOCATION_PICK, LOCATION_DROP);
    });

    it('form should be reset on reset click', () => {
        const onSubmit = jest.fn();
        const LOCATION_PICK = 'location pick';
        const LOCATION_DROP = 'location drop';
        const InputComponent = mount(<Input onSubmit={onSubmit} />);
        const form = InputComponent.find('form');
        const pick = form.find('#pick');
        const drop = form.find('#drop');
        pick.simulate('change', { target: { value: LOCATION_PICK } });
        drop.simulate('change', { target: { value: LOCATION_DROP } });
        form.find('input[type="button"]').simulate('click');
        expect(pick.props().value).toBe('');
        expect(drop.props().value).toBe('');
    });
});