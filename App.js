import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import Header from './components/header';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/FontAwesome';

const today = new Date();

const year = today.getFullYear();

const month = today.getMonth() + 1;

const day = today.getDate();

const formattedDate = `${year}-${month}-${day}`;

const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const years = yesterday.getFullYear();

const months = yesterday.getMonth() + 1;

const days = yesterday.getDate();

const formattedDates = `${years}-${months}-${days}`;

const tabs = [
  {label: 'All', value: '1', testID: 'All'},
  {
    label: 'Laboratory',
    value: '2',
    testID: 'Laboratory',
    source: require('./images/lab.png'),
  },
  {
    label: 'Diagnostics',
    value: '3',
    testID: 'Diagnostics',
    source: require('./images/diagnosis.png'),
  },
  {
    label: 'Field Works',
    value: '4',
    testID: 'Field Works',
    source: require('./images/field.png'),
  },
];

const maping = tabs.map(each => {
  return each.label;
});

const imageMap = tabs.map(each => {
  return each.source;
});

console.log(imageMap);

const bookmarks = [
  {
    name: 'Lab Laboratory Research',

    time: '07.43pm',

    date: formattedDate,

    tool: 'Laboratory',
  },

  {
    name: 'D High Risk Result',

    time: '05.33pm',

    date: formattedDate,

    tool: 'Diagnostics',
  },

  {
    name: 'Field name 1',

    time: '06.43pm',

    date: formattedDate,

    tool: 'Field Works',
  },

  {
    name: 'Lab Very High Risk Result',

    time: '06.43pm',

    date: formattedDate,

    tool: 'Laboratory',
  },

  {
    name: 'D Low Risk Result',

    time: '06.43pm',

    date: formattedDate,

    tool: 'Diagnostics',
  },

  {
    name: 'Field Very High Risk Result',

    time: '06.43pm',

    date: formattedDates,

    tool: 'Field Works',
  },

  {
    name: 'D Human Researach',

    time: '06.43pm',

    date: formattedDates,

    tool: 'Diagnostics',
  },

  {
    name: 'Lab Medium Risk Result',

    time: '06.43pm',

    date: formattedDates,

    tool: 'Laboratory',
  },

  {
    name: 'Field High Risk Result',

    time: '06.43pm',

    date: formattedDates,

    tool: 'Field Works',
  },

  {
    name: 'D Poor Result',

    time: '06.43pm',

    date: formattedDates,

    tool: 'Diagnostics',
  },

  {
    name: 'Lab Good Result',

    time: '06.43pm',

    date: formattedDates,

    tool: 'Laboratory',
  },

  {
    name: 'Lab Field Best Result',

    time: '06.43pm',

    date: '2023-3-25',

    tool: 'Laboratory',
  },
];

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

const App = () => {
  const [filteredList, setFilteredList] = useState([[], [], []]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    clickHandler('1');
  }, []);

  const clickHandler = tabs => {
    if (tabs === '1') {
      const todayArray = [];
      const yesterdayArray = [];
      const previousArray = [];
      const fullArray = [todayArray, yesterdayArray, previousArray];

      const today = new Date();
      bookmarks.forEach(item => {
        const itemDate = new Date(item.date);

        if (itemDate.toDateString() === today.toDateString()) {
          todayArray.push(item);
        } else if (itemDate.toDateString() === yesterday.toDateString()) {
          yesterdayArray.push(item);
        } else {
          previousArray.push(item);
        }
      });
      setFilteredList(fullArray);
      setIndex(0);
    }
    if (tabs === '2') {
      const filteredLab = bookmarks.filter(value => {
        return value.tool === 'Laboratory';
      });
      const todayArray = [];
      const yesterdayArray = [];
      const previousArray = [];

      const fullArray = [todayArray, yesterdayArray, previousArray];

      const today = new Date();
      filteredLab.forEach(item => {
        const itemDate = new Date(item.date);

        if (itemDate.toDateString() === today.toDateString()) {
          todayArray.push(item);
        } else if (itemDate.toDateString() === yesterday.toDateString()) {
          yesterdayArray.push(item);
        } else {
          previousArray.push(item);
        }
      });

      setFilteredList(fullArray);
      setIndex(1);
    }
    if (tabs === '3') {
      const filteredDiag = bookmarks.filter(value => {
        return value.tool === 'Diagnostics';
      });

      const todayArray = [];
      const yesterdayArray = [];
      const previousArray = [];

      const fullArray = [todayArray, yesterdayArray, previousArray];

      const today = new Date();
      filteredDiag.forEach(item => {
        const itemDate = new Date(item.date);

        if (itemDate.toDateString() === today.toDateString()) {
          todayArray.push(item);
        } else if (itemDate.toDateString() === yesterday.toDateString()) {
          yesterdayArray.push(item);
        } else {
          previousArray.push(item);
        }
      });
      setFilteredList(fullArray);
      setIndex(2);
    }
    if (tabs === '4') {
      const filteredField = bookmarks.filter(value => {
        return value.tool === 'Field Works';
      });

      const todayArray = [];
      const yesterdayArray = [];
      const previousArray = [];

      const fullArray = [todayArray, yesterdayArray, previousArray];

      const today = new Date();
      filteredField.forEach(item => {
        const itemDate = new Date(item.date);

        if (itemDate.toDateString() === today.toDateString()) {
          todayArray.push(item);
        } else if (itemDate.toDateString() === yesterday.toDateString()) {
          yesterdayArray.push(item);
        } else {
          previousArray.push(item);
        }
      });
      setFilteredList(fullArray);
      setIndex(3);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.selectorTab}>
        <SwitchSelector
          options={tabs}
          initial={0}
          backgroundColor="#00517c"
          textColor="#4d87a4"
          selectedColor="white"
          buttonColor="#00324b"
          onPress={clickHandler}
        />
      </View>

      <View style={styles.lineStyle} />
      <View style={styles.ListTitle}>
        <Image source={imageMap[index]} style={{width: 30, height: 30}} />
        <Text style={styles.textTitle}>{maping[index]}</Text>
      </View>

      <View style={styles.todayWrapper}>
        <View>
          <Text style={styles.todayTextStyle}>Today</Text>
        </View>

        <View style={{flex: 1, height: 1, backgroundColor: '#407792'}} />
      </View>
      <View style={{height: 480}}>
        <ScrollView>
          <View style={styles.listView}>
            {filteredList[0].map((item, index) => (
              <Item
                title={item.name}
                date={item.date}
                time={item.time}
                tool={item.tool}
              />
            ))}
          </View>

          <View style={styles.todayWrapper}>
            <View>
              <Text style={styles.yesterdayTextStyle}>Yesterday</Text>
            </View>

            <View style={{flex: 1, height: 1, backgroundColor: '#407792'}} />
          </View>
          <View>
            {filteredList[1].map((item, index) => (
              <Item
                title={item.name}
                date={item.date}
                time={item.time}
                tool={item.tool}
              />
            ))}
          </View>

          <View style={styles.yesterdayWrapper}>
            <View>
              <Text style={styles.yesterdayTextStyle}>Previous</Text>
            </View>

            <View style={{flex: 1, height: 1, backgroundColor: '#407792'}} />
          </View>
          <View>
            {filteredList[2].map((item, index) => (
              <Item
                title={item.name}
                date={item.date}
                time={item.time}
                tool={item.tool}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004162',
  },
  selectorTab: {
    backgroundColor: '#00517b',
    marginTop: 10,
    marginHorizontal: 23,
    borderRadius: 18,
    padding: 8,
  },
  ListTitle: {
    marginTop: 20,
    marginHorizontal: 30,

    flexDirection: 'row',
  },
  textTitle: {
    color: '#97b4c2',
    fontWeight: 'light',
    fontSize: 16,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  lineStyle: {
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,

    paddingTop: 20,
  },
  contents: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 26,
    borderRadius: 18,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  timelineStyle: {
    color: '#d4d5d9',
    paddingTop: 10,
  },
  timeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayLineStyle: {
    marginHorizontal: 26,
  },
  contentDataRow: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  todayTextStyle: {
    width: 50,
    textAlign: 'center',
    color: '#407792',
  },
  todayWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingTop: 15,
  },
  yesterdayWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingTop: 15,
  },
  yesterdayTextStyle: {
    width: 70,
    textAlign: 'center',
    color: '#407792',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteIcon: {
    marginHorizontal: 20,
  },
});

export default App;
