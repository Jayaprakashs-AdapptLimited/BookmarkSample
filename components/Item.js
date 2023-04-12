import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Header from './header';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './footer';
import App from '../drawer';

const Item = ({title, date, time}) => (
    <View>
      <View style={styles.contents}>
        <View>
          <View style={styles.contentDataRow}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.icons}>
              <View style={styles.deleteIcon}>
                <Icon
                  style={styles.bookmarkIconStyle}
                  name="trash"
                  size={18}
                  color="red"
                />
              </View>
              <View>
                <Icon
                  style={styles.bookmarkIconStyle}
                  name="arrow-right"
                  size={18}
                  color="#a2a7b6"
                />
              </View>
            </View>
          </View>
          <View style={styles.timelineStyle}>
            <View style={styles.timeContent}>
              <Text style={styles.time}>{time}</Text>
              <Text>{date}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

const styles = StyleSheet.create({
    contents: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 26,
        borderRadius: 18,
      },
      contentDataRow: {
        flexDirection: 'row',
    
        justifyContent: 'space-between',
      },
      title: {
        fontSize: 18,
        color: 'black',
      },
      icons: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      deleteIcon: {
        marginHorizontal: 20,
      },
      timelineStyle: {
        color: '#d4d5d9',
        paddingTop: 10,
      },
      timeContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
})

  export default Item;