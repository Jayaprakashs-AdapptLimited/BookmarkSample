import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Home from './components/home';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator, DrawerActions} from '@react-navigation/drawer';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import arraySlice from './Redux/categories';
import langSlice from './Redux/LanguageRedux';
import {CustomDrawerContent} from './components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Home} />
    </Drawer.Navigator>
  );
}

export const store = configureStore({
  reducer: {
    category: arraySlice,
    language: langSlice,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004162',
  },
});
export default App;
