import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import App, { store } from './App';
import { createDrawerNavigator } from '@react-navigation/drawer';

jest.mock('@react-navigation/drawer', () => ({
  createDrawerNavigator: jest.fn(),
}));

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders Provider component with correct store prop', () => {
    const wrapper = shallow(<App />);
    const providerComponent = wrapper.find(Provider);
    expect(providerComponent.prop('store')).toEqual(store);
  });

  it('renders NavigationContainer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationContainer)).toHaveLength(1);
  });

  it('renders MyDrawer component inside NavigationContainer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationContainer).find('MyDrawer')).toHaveLength(1);
  });
});
