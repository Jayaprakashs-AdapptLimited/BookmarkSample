import { render, fireEvent } from '@testing-library/react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Footer from '../components/footer';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  DrawerActions: {
    toggleDrawer: jest.fn(),
  },
}));

describe('footer', () => {
  test('should call navigation.dispatch with DrawerActions.toggleDrawer when Spotify icon is pressed', () => {
    const mockNavigation = { dispatch: jest.fn() };
    useNavigation.mockReturnValue(mockNavigation);

    const { getByTestId } = render(<Footer />);

    const spotifyIcon = getByTestId('spotify');
    fireEvent.press(spotifyIcon);

    expect(mockNavigation.dispatch).toHaveBeenCalledWith(DrawerActions.toggleDrawer());
  });

  
});