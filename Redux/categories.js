import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';

const storeData = async (staticArray, staticData, initialLanguage) => {
  try {
    if (initialLanguage === 'en') {
      const json = JSON.stringify(staticArray);
      await AsyncStorage.setItem('EngArray', json);
      return staticArray;
    } else if (initialLanguage === 'fr') {
      const json = JSON.stringify(staticData);
      await AsyncStorage.setItem('FrArray', json);
      return staticData;
    } else {
      console.log('No Language found');
    }
  } catch (error) {
    console.log('Error storing array: ', error);
  }
};

const getData = async initialLanguage => {
  const dataEnglish = await fs.readFileAssets('data/en.json', 'utf8');
  const variEnglish = JSON.parse(dataEnglish);
  const dataFrench = await fs.readFileAssets('data/fr.json', 'utf8');
  const variFrensh = JSON.parse(dataFrench);

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

  for (let i = 0; i < variEnglish.length; i++) {
    if (i < 3) {
      variEnglish[i]['date'] = formattedDate;
      variEnglish[i]['key'] = i;
    } else if (i < 6) {
      variEnglish[i]['date'] = formattedDates;
      variEnglish[i]['key'] = i;
    } else {
      variEnglish[i]['date'] = '2023-3-7';
      variEnglish[i]['key'] = i;
    }
  }
  for (let i = 0; i < variFrensh.length; i++) {
    if (i < 1) {
      variFrensh[i]['date'] = formattedDate;
      variFrensh[i]['key'] = i;
    } else if (i < 2) {
      variFrensh[i]['date'] = formattedDates;
      variFrensh[i]['key'] = i;
    } else {
      variFrensh[i]['date'] = '2023-3-7';
      variFrensh[i]['key'] = i;
    }
  }
  const staticArray = variEnglish;
  const staticData = variFrensh;

  try {
    const jsonEng = await AsyncStorage.getItem('EngArray');
    const jsonFr = await AsyncStorage.getItem('FrArray');

    if (initialLanguage == 'en' || initialLanguage == 'fr') {
      if (jsonEng == null || jsonFr == null) {
        const returnData = storeData(staticArray, staticData, initialLanguage);
        return returnData;
      } else {
        const myArray =
          initialLanguage === 'en' ? JSON.parse(jsonEng) : JSON.parse(jsonFr);
        return myArray;
      }
    } else {
      console.log('error in intial array');
    }
  } catch (error) {
    console.log('Error retrieving array: ', error);
  }
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async initialLanguage => {
    const data = getData(initialLanguage);
    return data;
  },
);
const arraySlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
  },
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.data = action.payload; 
    },
    [fetchCategories.pending]: state => {
      state.status = 'Fetching data. Please wait a moment...';
    },
    [fetchCategories.rejected]: state => {
      state.status = 'Failed to fetch data...';
    },
  },
});

export default arraySlice.reducer;
