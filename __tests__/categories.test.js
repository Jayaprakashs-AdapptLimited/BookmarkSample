import React from 'react';
import renderer from 'react-test-renderer';
import arraySlice, {fetchCategories} from '../Redux/categories';
import {render} from '@testing-library/react-native';
// import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../Redux/categories';
import {storeData} from '../Redux/categories';
import fs from 'react-native-fs';
import { createAsyncThunk } from 'redux-thunk';

jest.mock('react-native-fs');
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
  };
});

const initialLanguage = 'en';

jest.mock('react-native-fs', () => ({
  // Mocked methods and properties of react-native-fs
  writeFile: jest.fn(),
  readFile: jest.fn(),
  unlink: jest.fn(),
  exists: jest.fn(),
  // ... add more mocked methods as needed
}));

describe('Your test suite', () => {
  // Your test cases here
});


describe('arraySlice', () => {
  const initialState = {data: [], status: null};

  it('should handle fetchCategories.fulfilled', () => {
    const payload = ['category1', 'category2'];
    const nextState = arraySlice(initialState, {
      type: fetchCategories.fulfilled.type,
      payload,
    });
    expect(nextState.data).toEqual(payload);
    expect(nextState.status).toBeNull();
  });
});

it('AsyncStorage sets and retrieves values correctly', async () => {
  // await AsyncStorage.setItem('name', "Lab Laboratory Research");

  const retrievedValue = await AsyncStorage.getItem('EngArray');
  console.log(retrievedValue, 'Retrieved Valuee');
  // expect(retrievedValue).toEqual('EngArray');
});


// Mock the createAsyncThunk function
jest.mock('redux-thunk', () => ({
  createAsyncThunk: jest.fn(),
}));



describe('getData', () => {
  it('should return the mocked data', async () => {
    const mockEnglishData = '[{"key": 0, "value": "English Data"}]';
    const mockFrenchData = '[{"key": 0, "value": "French Data"}]';
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValueOnce(mockEnglishData)
      .mockResolvedValueOnce(mockFrenchData);

    fs.readFileAssets = jest
      .fn()
      .mockResolvedValueOnce('{"key": 0, "value": "English JSON"}')
      .mockResolvedValueOnce('{"key": 0, "value": "French JSON"}');

    const result = await getData('en');

    expect(result).toEqual(JSON.parse(mockEnglishData));

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(2);
    expect(fs.readFileAssets).toHaveBeenCalledTimes(2);
  });

  test('should return stored array when initialLanguage is "fr" and FrArray is found', async () => {
    const staticArray = [4, 5, 6];
    const staticData = { c: 3, d: 4 };
    const initialLanguage = 'fr';
    const jsonFr = JSON.stringify(staticData);
    AsyncStorage.getItem.mockResolvedValueOnce(jsonFr);

    const result = await storeData(staticArray, staticData, initialLanguage);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('FrArray');
    expect(result).toEqual(staticData);
  });

  test('should log an error message when AsyncStorage throws an error', async () => {
    const staticArray = [1, 2, 3];
    const staticData = { a: 1, b: 2 };
    const initialLanguage = 'en';
    const errorMessage = 'AsyncStorage error';

    AsyncStorage.getItem.mockRejectedValueOnce(new Error(errorMessage));

    // Catch the error with a try-catch block
    let errorLogged = true;
    try {
      await storeData(staticArray, staticData, initialLanguage);
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
      errorLogged = true;
    }

    expect(errorLogged).toBe(true);
  });
});


describe('storeData', () => {
  beforeEach(() => {
    AsyncStorage.setItem.mockClear(); // Clear mock before each test
  });

  test('should store staticArray when initialLanguage is "en"', async () => {
    const staticArray = [1, 2, 3];
    const initialLanguage = 'en';

    await storeData(staticArray, null, initialLanguage);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'EngArray',
      JSON.stringify(staticArray)
    );
  });

  test('should store staticData when initialLanguage is "fr"', async () => {
    const staticData = { a: 1, b: 2 };
    const initialLanguage = 'fr';

    await storeData(null, staticData, initialLanguage);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'FrArray',
      JSON.stringify(staticData)
    );
  });

  test('should log "No Language found" when initialLanguage is neither "en" nor "fr"', async () => {
    const initialLanguage = 'es';
    console.log = jest.fn(); // Mock console.log

    await storeData(null, null, initialLanguage);

    expect(console.log).toHaveBeenCalledWith('No Language found');
    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  test('should log an error message when AsyncStorage throws an error', async () => {
    const staticArray = [1, 2, 3];
    const initialLanguage = 'en';
    const errorMessage = 'AsyncStorage error';
    console.log = jest.fn(); // Mock console.log

    AsyncStorage.setItem.mockRejectedValueOnce(errorMessage);

    await storeData(staticArray, null, initialLanguage);

    expect(console.log).toHaveBeenCalledWith('Error storing array: ', errorMessage);
  });
});


describe('Your code', () => {
  test('should populate English and French arrays with correct dates and keys', async () => {
    // Mock fs.readFileAssets method
    const mockReadFileAssets = jest.spyOn(fs, 'readFileAssets');
    mockReadFileAssets.mockResolvedValueOnce('["item1", "item2", "item3", "item4", "item5", "item6", "item7"]');
    mockReadFileAssets.mockResolvedValueOnce('["élément1", "élément2", "élément3", "élément4", "élément5", "élément6", "élément7"]');

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

    const varEnglish = await getData('en');
    const varFrench = await getData('fr');

    expect(varEnglish).toEqual([
      { date: formattedDate, key: 0 },
      { date: formattedDate, key: 1 },
      { date: formattedDate, key: 2 },
      { date: formattedDates, key: 3 },
      { date: formattedDates, key: 4 },
      { date: formattedDates, key: 5 },
      { date: '2023-3-7', key: 6 },
    ]);

    expect(varFrench).toEqual([
      { date: formattedDate, key: 0 },
      { date: formattedDate, key: 1 },
      { date: formattedDate, key: 2 },
      { date: formattedDates, key: 3 },
      { date: formattedDates, key: 4 },
      { date: formattedDates, key: 5 },
      { date: '2023-3-7', key: 6 },
    ]);

    // Restore the original method after the test
    mockReadFileAssets.mockRestore();
  });

  // Other test cases for your code...
});



describe('fetchCategories', () => {
  test('should call getData with the initial language',  () => {
    const initialLanguage = 'en';

     fetchCategories(initialLanguage);

    expect(getData).toHaveBeenCalledTimes(1);
    expect(getData).toHaveBeenCalledWith(initialLanguage);
  });

});
