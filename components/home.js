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
import Footer from './footer';
import Item from './Item';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCategories} from '../Redux/categories';
import translations from '../translations';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {
  const langEns = useSelector(state => state.language);
  const English = translations.en;
  const French = translations.fr;
  const tabs = [
    {
      label: langEns.data === 'en' ? English.All : French.All,
      value: '1',
      testID: 'All',
      source: require('../images/diagnosis.png'),
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
            ? fetchData.filter(f => f.date === formattedDate)
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
          fetchData != null ? fetchData.filter(f => f.date === '2023-3-7') : [],
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
    <View style={{flex: 1}} testID="home-component">
      <View style={styles.container}>
        <LinearGradient
          colors={['#004263', '#105c7e', '#408ab3']}
          style={{
            borderWidth: 0,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 35,
            marginLeft: 8,
            marginRight: 8,
          }}>
          <View>
            <Header testID="header-component"/>
            <View style={styles.selectorTab}>
              <SwitchSelector
                testID="switch-selector"
                borderRadius={10}
                fontSize={13}
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
              <Image source={imageMap[index]} style={{width: 25, height: 25}} />
              <Text style={styles.textTitle}>{maping[index]}</Text>
            </View>

            <View style={{height: 520}}>
              <ScrollView testID="item-list">
                <View>
                  {filteredList?.map((item, index) => (
                    <View>
                      <View style={styles.dayWrapper}>
                        <Text style={styles.dayTextStyle}>{item?.day}</Text>
                        <View
                          style={{
                            flex: 1,
                            height: 1.5,
                            backgroundColor: '#126c9f',
                            marginLeft: 8,
                          }}
                        />
                      </View>
                      <View></View>
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
          </View>
        </LinearGradient>
        <Footer testID="footer-component"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  components: {
    marginLeft: 8,
    marginRight: 8,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  selectorTab: {
    backgroundColor: '#00517b',
    marginTop: 20,
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 4,
  },
  ListTitle: {
    marginTop: 20,
    marginHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    color: '#97b4c2',
    fontWeight: 'light',
    fontSize: 16,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  lineStyle: {
    borderBottomColor: '#1979a5',
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

  dayTextStyle: {
    textAlign: 'center',
    color: '#639fbe',
  },
  dayWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    paddingTop: 12,
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
