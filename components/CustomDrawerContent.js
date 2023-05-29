import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  navigation,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {Languagetrans} from '../Redux/LanguageRedux';

export default function CustomDrawerContent(props) {
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
        // onPress={() => props.navigation.navigate('Home', { englishcomponent: englishcomponent })}
        onPress={() => englishcomponent()}
      />
      <DrawerItem
        label="French"
        focused={langEns.data === 'fr'}
        onPress={() => Frenchcomponent()}
      />
    </DrawerContentScrollView>
  );
}
