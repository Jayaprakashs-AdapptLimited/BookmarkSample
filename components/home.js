import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import Header from './header';
import SwitchSelector from 'react-native-switch-selector';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './footer';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Item from './Item';
import {log} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../Redux/categories';
import translations from '../translations';
import {useRoute} from '@react-navigation/native';

const Home = () => {
  const langEns = useSelector(state => state.language);
  const English = translations.en;
  const French = translations.fr;
  const tabs = [
    {
      label: langEns.data === 'en' ? English.All : French.All,
      value: '1',
      testID: 'All',
    },
    {
      label: langEns.data === 'en' ? English.Laboratory : French.Laboratory,
      value: '2',
      testID: 'Laboratory',
      source: require('../images/lab.png'),
    },
    {
      label: langEns.data === 'en' ? English.Diagnostics : French.Diagnostics,
      value: '3',
      testID: 'Diagnostics',
      source: require('../images/diagnosis.png'),
    },
    {
      label: langEns.data === 'en' ? English.Field_Works : French.Field_Works,
      value: '4',
      testID: 'Field Works',
      source: require('../images/field.png'),
    },
  ];
  const maping = tabs.map(each => {
    return each.label;
  });

  const imageMap = tabs.map(each => {
    return each.source;
  });

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

  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const dispatch = useDispatch();

  function dataStructure(fetchData) {
    const value = [
      {
        day: fetchData != null ? 'Today' : [],
        data:
          fetchData != null
            ? fetchData.filter(f => f.date == formattedDate)
            : [],
      },
      {
        day: 'Yesterday',
        data:
          fetchData != null
            ? fetchData.filter(f => f.date === formattedDates)
            : [],
      },
      {
        day: 'Previous',
        data:
          fetchData != null ? fetchData.filter(f => f.date == '2023-3-7') : [],
      },
    ];
    setFilteredList(value);
  }

  const initialData = async initialLanguage => {
    const fetchData = await dispatch(fetchCategories(initialLanguage));
    setData(fetchData.payload);
    dataStructure(fetchData.payload);
  };

  useEffect(() => {
    // setEngl()
    initialData(langEns.data);
    clickHandler('1');
  }, [langEns.data]);

  const clickHandler = tabs => {
    if (tabs === '1') {
      const value = data.map((item, index) => {
        return item;
      });
      dataStructure(value);
      setIndex(0);
    }
    if (tabs === '2') {
      const value = data.filter(item => {
        return item.tool == 'Laboratory';
      });
      dataStructure(value);
      setIndex(1);
    }
    if (tabs === '3') {
      const value = data.filter(item => {
        return item.tool == 'Diagnostics';
      });
      dataStructure(value);

      setIndex(2);
    }
    if (tabs === '4') {
      const value = data.filter(item => {
        return item.tool == 'Field Works';
      });
      dataStructure(value);
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
          onPress={value => clickHandler(value)}
        />
      </View>
      <View style={styles.lineStyle} />
      <View style={styles.ListTitle}>
        <Image source={imageMap[index]} style={{width: 30, height: 30}} />
        <Text style={styles.textTitle}>{maping[index]}</Text>
      </View>
      <View style={styles.todayWrapper}>
        <View style={{flex: 1, height: 1, backgroundColor: '#407792'}} />
      </View>
      <View style={{height: 480}}>
        <ScrollView>
          <View>
            {filteredList?.map((item, index) => (
              <View>
                <View>
                  <Text style={styles.yesterdayTextStyle}>{item?.day}</Text>
                </View>
                <View
                  style={{flex: 1, height: 1, backgroundColor: '#407792'}}
                />
                {item.data?.map((item, index) => (
                  <Item
                    key={index.key}
                    title={item.name}
                    date={item.date}
                    time={item.time}
                    tool={item.tool}
                  />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <Footer />
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

export default Home;
