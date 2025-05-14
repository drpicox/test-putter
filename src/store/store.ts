import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import keystrokesReducer from './keystrokesSlice';
import codeReducer from './codeSlice';
import testsReducer from './testsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Keep the sample counter for reference
    keystrokes: keystrokesReducer,
    code: codeReducer,
    tests: testsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;