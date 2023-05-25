const { Languagetrans } = require('../Redux/LanguageRedux'); // Replace './your-reducer-file' with the correct path to the file containing the reducer

describe('Languagetrans reducer', () => {
  test('should update state.data with the payload', () => {
    // Arrange
    const initialState = { data: null };
    const payload = 'English';

    // Act
    const newState = Languagetrans(initialState, { payload });

    // Assert
    expect(newState.data).toBe(payload);
  });
});
