import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.header}>
      <Icon testID="angle" style={styles.bookmarkIconStyle} name="angle-left" size={22} />
      <Text style={styles.headerText}> Bookmark </Text>
    </View>
  );
};

const styles = StyleSheet.create({ 
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  headerText: {
    color: '#ccd9df',
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'light',
  },
  bookmarkIconStyle: {
    backgroundColor: '#00517c',
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 5,
    paddingBottom: 5,
    color: 'white',
    position: 'absolute',
    left: 18,
    borderRadius: 12,
  },
});

export default Header;
