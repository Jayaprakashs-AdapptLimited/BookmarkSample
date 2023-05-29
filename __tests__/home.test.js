import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/home';
// import { render }  from '@testing-library/react-native';
import { render, screen } from '@testing-library/react-native';
import { langSlice } from '../Redux/LanguageRedux';
import {useDispatch, useSelector} from 'react-redux';
import Provider from 'react-redux';
import { store } from '../App';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-switch-selector', () => 'SwitchSelector');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('@react-navigation/drawer', () => 'Drawer');
// jest.mock('@react-navigation/drawer', () => 'createDrawerNavigator');

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
  // ... add more mocked methods as needed
}));


describe('Home', () => {
  beforeEach(() => {
    render(
    <Provider store={store}> 
    <Home />
    </Provider>);
  });

  it('renders the component', () => {
    expect(screen.getByTestId('home-component')).toBeDefined();
  });

  it('displays the header', () => {
    expect(screen.getByTestId('header-component')).toBeDefined();
  });

  it('displays the footer', () => {
    expect(screen.getByTestId('footer-component')).toBeDefined();
  });

  it('displays the switch selector', () => {
    expect(screen.getByTestId('switch-selector')).toBeDefined();
  });

  it('displays the list of items', () => {
    expect(screen.getByTestId('item-list')).toBeDefined();
  });
});


  
