import React from 'react';
import renderer from 'react-test-renderer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import { render }  from '@testing-library/react-native';

jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('@react-navigation/drawer', () => 'DrawerContentScrollView');
jest.mock('@react-navigation/drawer', () => 'DrawerItemList');
jest.mock('@react-navigation/drawer', () => 'DrawerItem');


import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

describe('CustomDrawerContent', () => {
  test('should dispatch Languagetrans with "en" when English button is pressed', () => {
    const initialState = {
      language: {
        data: 'fr',
      },
    };

    const store = mockStore(initialState);

    const { getByLabelText } = render(
      <Provider store={store}>
        <CustomDrawerContent />
      </Provider>
    );

    const englishButton = getByLabelText('English');
    fireEvent.press(englishButton);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'language/Languagetrans', payload: 'en' }]);
  });

  test('should dispatch Languagetrans with "fr" when French button is pressed', () => {
    const initialState = {
      language: {
        data: 'en',
      },
    };

    const store = mockStore(initialState);

    const { getByLabelText } = render(
      <Provider store={store}>
        <CustomDrawerContent />
      </Provider>
    );

    const frenchButton = getByLabelText('French');
    fireEvent.press(frenchButton);

    const actions = store.getActions();
    expect(actions).toEqual([{ type: 'language/Languagetrans', payload: 'fr' }]);
  });

  // Other test cases for CustomDrawerContent...
});

  