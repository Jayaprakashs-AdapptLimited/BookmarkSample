import React from 'react';
import Home from '../components/home';
import {render, screen} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {store} from '../App';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-switch-selector', () => 'SwitchSelector');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/drawer', () => 'Drawer');
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
  writeFile: jest.fn(),
  readFile: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
}));

describe('Home', () => {
  it('renders without errors', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          {' '}
          <Home />
        </NavigationContainer>
      </Provider>,
    );
  });
});
