import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../components/header';
import { render }  from '@testing-library/react-native';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');


describe('header Component', ()=> {
  test('Check if icon is present', () => {
    const { getByTestId } = render(<Header />);
    const iconElement = getByTestId('angle');
    expect(iconElement).toBeTruthy();
  });

  test('Check if specific text is present', () => {
    const { getByText } = render(<Header />);
    const textElement = getByText('Bookmark');
    expect(textElement).toBeTruthy();
  });
})

  
