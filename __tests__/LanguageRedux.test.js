const { Languagetrans, langSlice } = require('../Redux/LanguageRedux'); // Replace './your-reducer-file' with the correct path to the file containing the reducer

describe('langSlice', () => {
  test('should update the language data correctly', () => {
    const initialState = {
      data: 'en',
    };

    const updatedLanguage = 'fr';

    const nextState = langSlice.reducer(initialState, Languagetrans(updatedLanguage));

    expect(nextState.data).toEqual(updatedLanguage);
  });

});
