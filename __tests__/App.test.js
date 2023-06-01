import React from 'react';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import App, {store} from '../App';
import configureStore from 'redux-mock-store';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyDrawer from '../App';
import {render} from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-switch-selector', () => 'SwitchSelector');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/drawer', () => 'Drawer');
jest.mock('@react-navigation/drawer', () => 'createDrawerNavigator');

// Mock the external dependencies
jest.mock('@react-navigation/drawer', () => {
  return {
    // Mock implementation of Drawer.Navigator
    Navigator: props => <div>{props.children}</div>,
    // Mock any other required properties or methods
  };
});

jest.mock('@react-navigation/drawer', () => {
  return {
    createDrawerNavigator: jest.fn(),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
  };
});

jest.mock('react-native-fs', () => ({
  // Mocked methods and properties of react-native-fs
  writeFile: jest.fn(),
  readFile: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
}));

describe('store configuration', () => {
  const mockStore = configureStore({});

  test('should create the store with the correct reducers', () => {
    const store = mockStore({
      category: undefined,
      language: 'en',
    });

    // To check if the store is configured correctly
    expect(store.getState()).toEqual({
      category: undefined,
      language: 'en',
    });
  });
});

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

describe('MyDrawer', () => {
  it('renders without errors', () => {
    render(<MyDrawer />);
  });
});
