import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './index';

it('renders without crashing', () => {
  const app = mount(<App
    loadingElement={<div style={{ height: `100%` }} />}
    googleMapURL='googleMapURL'
  />).setState({ loadingState: 'LOADED' });
  expect(toJson(app)).toMatchSnapshot();
});
