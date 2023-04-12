import {createSlice} from '@reduxjs/toolkit';

export const langSlice = createSlice({
  name: 'language',
  initialState: {
    data: 'en',
  },
  reducers: {
    Languagetrans: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {Languagetrans} = langSlice.actions;

export default langSlice.reducer;
