import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
// import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const Header = () => {
    return (
        <View style={styles.header}>
            <Icon style={styles.bookmarkIconStyle} name="angle-left" size={25} />
            <Text style={styles.headerText}>  Bookmark </Text> 
        </View> 
    )
}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: "purple",
        // height: 70,
        // marginTop: 50,
        flexDirection: 'row',
        // textAlign: 'center',
        justifyContent: 'center',

    },
    headerText: {
        color: '#ccd9df',
        textAlign: 'left',
        fontSize: 25,
        fontWeight: 'light',
        marginTop: 50,
        // paddingHorizontal: 15,
        // alignContent: 'center',
    },
    iconHeader: {
        // marginTop: 50,
    }, 
    bookmarkIconStyle: {
        backgroundColor: '#00517c',
        marginTop: 50,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        // justifyContent: 'space-evenly'
        color: 'white',
        position: 'absolute',
        left: 25,
    }
})

export default Header;