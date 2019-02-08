import React from 'react';
import Direction from './Direction';
import { shallow } from 'enzyme';

describe('Direction.js', () => {
    const renderProp = jest.fn();
    it('should return default state where path length is 0', () => {
        shallow(<Direction>{renderProp}</Direction>);
        expect(renderProp).toHaveBeenCalledWith({ directions: null, distance: '', duration: '' });
    });

    it('should call fetch directions', () => {
        const path = [[1, 2], [3, 4], [5, 6], [7, 8]]
        shallow(<Direction path={path}>{renderProp}</Direction>);
        expect(renderProp).toHaveBeenCalledWith({ directions: null, distance: '', duration: '' });
    });
})