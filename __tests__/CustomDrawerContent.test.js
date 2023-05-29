import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// import  CustomDrawerContent  from '../components/CustomDrawerContent';
import { Languagetrans } from '../Redux/LanguageRedux';
// import { DrawerItem } from '@react-navigation/drawer';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('@react-navigation/drawer', () => 'DrawerContentScrollView');
jest.mock('@react-navigation/drawer', () => 'DrawerItemList');
jest.mock('@react-navigation/drawer', () => 'DrawerItem');


// Mock the LanguageRedux module
jest.mock('../Redux/LanguageRedux', () => ({
  Languagetrans: jest.fn(),
}));

describe('CustomDrawerContent', () => {
  const mockStore = configureStore([]);
  let store;
  let component;

  beforeEach(() => {
    // Create a mock Redux store
    store = mockStore({
      language: {
        data: 'en',
      },
    });

    component = (
      <Provider store={store}>
        <CustomDrawerContent />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch Languagetrans action with "en" when English drawer item is pressed', () => {
    const { getByLabelText } = render(component);
    fireEvent.press(getByLabelText('English'));
    expect(Languagetrans).toHaveBeenCalledWith('en');
    expect(store.getActions()).toEqual([Languagetrans('en')]);
  });

  it('should dispatch Languagetrans action with "fr" when French drawer item is pressed', () => {
    const { getByLabelText } = render(component);
    fireEvent.press(getByLabelText('French'));
    expect(Languagetrans).toHaveBeenCalledWith('fr');
    expect(store.getActions()).toEqual([Languagetrans('fr')]);
  });
});




export function CustomDrawerContent(props) {
  const langEns = useSelector(state => state.language);
  const dispatch = useDispatch();

  const englishcomponent = () => {
    dispatch(Languagetrans('en'));
  };

  const Frenchcomponent = () => {
    dispatch(Languagetrans('fr'));
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="English"
        focused={langEns.data === 'en'}
        onPress={englishcomponent}
      />
      <DrawerItem
        label="French"
        focused={langEns.data === 'fr'}
        onPress={Frenchcomponent}
      />
    </DrawerContentScrollView>
  );
}
