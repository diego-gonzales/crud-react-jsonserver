import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/characterSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer
  }
});