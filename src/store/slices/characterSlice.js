import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: []
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setMyCharacters: (state, action) => {
      state.characters = action.payload;
    },
    createMyCharacter: (state, action) => {
      state.characters = [...state.characters, action.payload];
    },
    updateMyCharacter: (state, action) => {
      const filteredCharacters = [...state.characters].filter(character => character.id !== action.payload.id);
      state.characters = [...filteredCharacters, action.payload];
    },
    deleteMyCharacter: (state, action) => {
      const filteredCharacters = [...state.characters].filter(character => character.id !== action.payload);
      state.characters = [...filteredCharacters];
    }
  }
});

export const { setMyCharacters, createMyCharacter, updateMyCharacter, deleteMyCharacter } = charactersSlice.actions;
export default charactersSlice.reducer;