import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './index';

class Map {
  setCenter() { }
  setZoom() { }
}

it('renders without crashing', () => {
  global.google = { maps: { Map, places: { SearchBox: class { } }, event: { addListener: jest.fn(), removeListener: jest.fn() } } };
  const app = mount(<App
    loadingElement={<div style={{ height: `100%` }} />}
    googleMapURL='googleMapURL'
  />).setState({ loadingState: 'LOADED' });
  expect(toJson(app)).toMatchSnapshot();
});
