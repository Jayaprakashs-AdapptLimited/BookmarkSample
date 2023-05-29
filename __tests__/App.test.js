import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import App, { store } from '../App';
import configureStore from 'redux-mock-store';
import { arraySlice } from '../Redux/categories'; // Replace with the actual path to your slices
import { langSlice } from '../Redux/LanguageRedux'; // Replace with the actual path to your slices
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MyDrawer } from '../App';
import { Drawer } from 'react-navigation-drawer';
import  Home  from '../components/home';
import { CustomDrawerContent } from '../components/CustomDrawerContent';


Enzyme.configure({ adapter: new Adapter() });


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('react-native-switch-selector', () => 'SwitchSelector');
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
// jest.mock('@react-navigation/drawer', () => 'Drawer');

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

describe('store configuration', () => {
  const mockStore = configureStore({});

  test('should create the store with the correct reducers', () => {
    const store = mockStore({
      category: undefined, // Add the initial state for category slice if needed
      language: 'en', // Add the initial state for language slice if needed
    });

    // Add your assertions to check if the store is configured correctly
    expect(store.getState()).toEqual({
      category: undefined, // Add the expected initial state for category slice if needed
      language: 'en', // Add the expected initial state for language slice if needed
    });
    // Add more assertions as needed
  });
});

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('renders Provider component with correct store prop', () => {
    const wrapper = shallow(<App />);
    const providerComponent = wrapper.find(Provider);
    expect(providerComponent.prop('store')).toEqual(store);
  });

  it('renders NavigationContainer component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationContainer)).toHaveLength(1);
  });

  it('renders MyDrawer component inside NavigationContainer', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(NavigationContainer).find('MyDrawer')).toHaveLength(1);
  });
});




describe('MyDrawer', () => {
  it('renders a Drawer.Navigator with expected props', () => {
    const wrapper = shallow(<MyDrawer />);
    
    // Find the Drawer.Navigator component
    const drawerNavigator = wrapper.find(Drawer.Navigator);
    
    // Assert that the drawerNavigator has the expected props
    expect(drawerNavigator.prop('screenOptions')).toEqual({ headerShown: false });
    expect(drawerNavigator.prop('drawerContent')).toEqual(expect.any(Function));
    
    // Render the drawerContent prop and assert that it is the CustomDrawerContent component
    const renderedDrawerContent = drawerNavigator.prop('drawerContent')({});
    expect(shallow(renderedDrawerContent).type()).toBe(CustomDrawerContent);
    
    // Find the Drawer.Screen component
    const drawerScreen = wrapper.find(Drawer.Screen);
    
    // Assert that the drawerScreen has the expected props
    expect(drawerScreen.prop('name')).toBe('Feed');
    expect(drawerScreen.prop('component')).toBe(Home);
  });
});

