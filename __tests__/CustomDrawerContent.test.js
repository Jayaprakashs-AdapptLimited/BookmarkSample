import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {CustomDrawerContent} from '../components/CustomDrawerContent';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

jest.mock('@react-navigation/drawer', () => 'DrawerContentScrollView');
jest.mock('@react-navigation/drawer', () => 'DrawerItemList');
jest.mock('@react-navigation/drawer', () => 'DrawerItem');

jest.mock('../Redux/LanguageRedux', () => ({
  Languagetrans: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('CustomDrawerContent', () => {
  it('renders without errors', () => {
    render(<CustomDrawerContent />);
  });
});

describe('CustomDrawerContent', () => {
  test('renders English and French options', () => {
    const mockStore = configureMockStore();
    const store = mockStore({language: {data: 'en'}});
    const {queryByText} = render(
      <Provider store={store}>
        <CustomDrawerContent />
      </Provider>,
    );

    const englishOption = queryByText()('English');
    const frenchOption = queryByText()('French');

    expect(englishOption).toBeTruthy();
    expect(frenchOption).toBeTruthy();
  });
});
