import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fs from 'react-native-fs';

export const storeData = async (staticArray, staticData, initialLanguage) => {
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

export const getData = async initialLanguage => {
  const dataEnglish = await fs.readFileAssets('data/en.json', 'utf8');
  const varEnglish = JSON.parse(dataEnglish);
  const dataFrench = await fs.readFileAssets('data/fr.json', 'utf8');
  const varFrench = JSON.parse(dataFrench);

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

  for (let i = 0; i < varEnglish.length; i++) {
    if (i < 3) {
      varEnglish[i]['date'] = formattedDate;
      varEnglish[i]['key'] = i;
    } else if (i < 6) {
      varEnglish[i]['date'] = formattedDates;
      varEnglish[i]['key'] = i;
    } else {
      varEnglish[i]['date'] = '2023-3-7';
      varEnglish[i]['key'] = i;
    }
  }
  for (let i = 0; i < varFrench.length; i++) {
    if (i < 3) {
      varFrench[i]['date'] = formattedDate;
      varFrench[i]['key'] = i;
    } else if (i < 6) {
      varFrench[i]['date'] = formattedDates;
      varFrench[i]['key'] = i;
    } else {
      varFrench[i]['date'] = '2023-3-7';
      varFrench[i]['key'] = i;
    }
  }
  const staticArray = varEnglish;
  const staticData = varFrench;
 
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
    }
  },
});

export default arraySlice.reducer;
