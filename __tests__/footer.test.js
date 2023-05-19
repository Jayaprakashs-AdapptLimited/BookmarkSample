import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../components/footer';
import {render} from '@testing-library/react-native';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');

describe('Footer Component', () => {
  test('renders correctly', () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Check if icon is present', () => {
    const {getByTestId} = render(<Footer />);
    const spotifyIconElement = getByTestId('spotify');
    const homeIconElement = getByTestId('home');
    const clockIconElement = getByTestId('clock-o');
  
    expect(spotifyIconElement).toBeTruthy();
    expect(homeIconElement).toBeTruthy();
    expect(clockIconElement).toBeTruthy();
  });
});



// jest.mock('react-navigation/native', () => 'useNavigation');
// jest.mock('react-navigation/native', () => 'DrawerActions');
