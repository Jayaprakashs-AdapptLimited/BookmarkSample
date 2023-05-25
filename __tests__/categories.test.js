import React from 'react';
import renderer from 'react-test-renderer';
import arraySlice, {fetchCategories} from '../Redux/categories';
import {render} from '@testing-library/react-native';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getData} from '../Redux/categories';
import {storeData} from '../Redux/categories';
import fs from 'react-native-fs';

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

jest.mock(
  'path/to/assets/data/en.json',
  () => ({
    settings: 'someSetting',
  }),
  {virtual: true},
);

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
});

// const AsyncStorage = require('@react-native-async-storage/async-storage'); // Replace with the actual AsyncStorage library you are using
// const { storeData } = require('../Redux/categories'); // Replace './your-file' with the correct path to the file containing the storeData function

test('Storing data in English language', async () => {
  const staticArray = [1, 2, 3];
  const initialLanguage = 'en';

  const result = await storeData(staticArray, null, initialLanguage);

  const storedJson = await AsyncStorage.getItem('EngArray');
  console.log(storedJson, "Stored Json")
  const storedArray = JSON.parse(storedJson);

  expect(result).toEqual(staticArray);
  expect(storedArray).toEqual(staticArray);
});

// test('Storing data in French language', async () => {
//   const staticData = { name: 'John', age: 25 };
//   const initialLanguage = 'fr';

//   const result = await storeData(null, staticData, initialLanguage);

//   const storedJson = await AsyncStorage.getItem('FrArray');
//   const storedData = JSON.parse(storedJson);

//   expect(result).toEqual(staticData);
//   expect(storedData).toEqual(staticData);
// });

