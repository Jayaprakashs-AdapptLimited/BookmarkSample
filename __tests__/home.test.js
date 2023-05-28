import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/home';
import { render }  from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import Provider from 'react-redux';
import { store } from '../App';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-switch-selector', () => 'SwitchSelector');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
// jest.mock('@react-navigation/drawer', () => 'Drawer');



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

describe('header Component', ()=> {
  test('Check if icon is present', () => {
    const { getByTestId } = render(
    <Provider store={store}> 
    <Home />
    </Provider>);
  });

})

  
