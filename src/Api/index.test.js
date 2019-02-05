import React from 'react';
import { shallow } from 'enzyme';
import API from './index';

it('renders without crashing', () => {
    const spyRenderProp = jest.fn();
    const component = shallow(<API pickLocation='pick' dropLocation='drop'>{spyRenderProp}</API>,
        { disableLifecycleMethods: true });
    expect(spyRenderProp).toHaveBeenCalled();
    component.setState({ path: [1, 2] }, () => {
        expect(spyRenderProp).toHaveBeenCalledWith([1, 2]);
    })
});