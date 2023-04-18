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
          {/* {console.log(title.length, "Lengthhh")} */}
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
    
            <View style={styles.timeWrapper}> 
            <Icon style={styles.bookmarkIconStyle} name="clock-o" size={15} />
            <Text style={styles.time}>{time}</Text>
            </View>
            <View style={styles.dateWrapper}> 
            <Icon style={styles.bookmarkIconStyle} name="calendar-o" size={15} />
            <Text style={styles.date}>{date}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  contents: {
    backgroundColor: 'white',
    padding: 17,
    marginVertical: 3,
    marginHorizontal: 23,
    borderRadius: 18,
  },
  contentDataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: 'black',
    width: 220,
  },
  icons: {
    flexDirection: 'row',
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
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    marginHorizontal: 6,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  date: {
    marginHorizontal: 6,
  }
});

export default Item;
