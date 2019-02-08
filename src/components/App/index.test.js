import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App, { App as ScriptChild } from './index';
import { SERVER_ERROR, INPUT_ERROR } from '../../constants/messages';


describe('App.js', () => {

  const loadingElement = <div style={{ height: `100%` }} />
  const googleMapURL = 'googleMapURL';

  it('renders without crashing', () => {
    const app = mount(<App
      loadingElement={loadingElement}
      googleMapURL={googleMapURL}
    />).setState({ loadingState: 'LOADED' });
    expect(toJson(app)).toMatchSnapshot();
  });

  it('onReset the app', () => {
    const appTree = mount(<App loadingElement={loadingElement}
      googleMapURL={googleMapURL} />).setState({ loadingState: 'LOADED' });
    const app = appTree.find(ScriptChild).setState({ hasError: true, message: 'mock' });
    expect(app.state().message).toBe('mock');
    expect(app.state().hasError).toBeTruthy();
    app.instance().onReset();
    expect(app.state().hasError).toBeFalsy();
    expect(app.state().message).toBe('');
  });

  it('onSubmit the location with no parameter', () => {
    const appTree = mount(<App loadingElement={loadingElement}
      googleMapURL={googleMapURL} />).setState({ loadingState: 'LOADED' });
    const app = appTree.find(ScriptChild);
    app.instance().onLocationSubmit();
    expect(app.state().hasError).toBeTruthy();
    expect(app.state().message).toBe(INPUT_ERROR);
  });

  it('onSubmit the location with parameter', () => {
    const appTree = mount(<App loadingElement={loadingElement}
      googleMapURL={googleMapURL} />).setState({ loadingState: 'LOADED' });
    const app = appTree.find(ScriptChild);
    app.instance().onLocationSubmit('location pick', 'location drop');
    expect(app.state().hasError).toBeFalsy();
    expect(app.state().message).toBe('');
    expect(app.state().isFetching).toBeTruthy();
    process.nextTick(() => {
      expect(app.state().isFetching).toBeFalsy();
      expect(app.state().path).toEqual([1, 2])
    });
  });
});
