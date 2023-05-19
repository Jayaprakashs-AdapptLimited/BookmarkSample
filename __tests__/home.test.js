import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/home';
import { render }  from '@testing-library/react-native';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-switch-selector', () => 'SwitchSelector');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');


describe('header Component', ()=> {
  test('Check if icon is present', () => {
    const { getByTestId } = render(<Home />);
    expect(iconElement).toBeTruthy();
  });

})

  
