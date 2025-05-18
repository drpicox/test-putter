import { configureStore } from '@reduxjs/toolkit';

// Import reducers from features
import { editorReducer } from '@/features/editor';
import { testingReducer } from '@/features/testing';
import { metricsReducer } from '@/features/metrics';

export const store = configureStore({
  reducer: {
    code: editorReducer,
    tests: testingReducer,
    keystrokes: metricsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;