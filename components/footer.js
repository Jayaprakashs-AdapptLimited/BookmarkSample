import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {DrawerItem} from 'react-native-paper';

const footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footerIcons}>
      <TouchableOpacity>
        <Icon
          name="spotify"
          size={30}
          color="#adb0e1"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      </TouchableOpacity>
      <Icon name="home" size={30} color="#adb0e1" />

      <Icon name="clock-o" size={30} color="#adb0e1" />
    </View>
  );
};

const styles = StyleSheet.create({
  footerIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  },
});

export default footer;
