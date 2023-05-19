import React from 'react';
import renderer from 'react-test-renderer';
import arraySlice, { fetchCategories } from '../Redux/categories';
import { render }  from '@testing-library/react-native';


jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');


describe('arraySlice', ()=> {
  const initialState = { data: [], status: null, };
  
  it('should handle fetchCategories.fulfilled',
   () => { const payload = ['category1', 'category2'];
    const nextState = arraySlice(initialState,
       { type: fetchCategories.fulfilled.type, payload, });
  expect(nextState.data).toEqual(payload); 
  expect(nextState.status).toBeNull(); 
});


})



describe('arraySlicesss', ()=> {
  
  it('should fetchCategories ',
async () => {
   const initialLanguage = 'en';
   // const expectedCategories = [ { id: 1, name: 'Technology', }, { id: 2, name: 'Business', }, { id: 3, name: 'Sports', }, ];
   const expectedCategories = [ { id: 1, name: 'Technology', }, { id: 2, name: 'Business', }, { id: 3, name: 'Sports', }, ];
   const getData = jest.fn(() => Promise.resolve(expectedCategories)); 
   const result = await fetchCategories(initialLanguage); 
   expect(result).toEqual(expectedCategories); 
   expect(getData).toHaveBeenCalledWith(initialLanguage);
 })


})




