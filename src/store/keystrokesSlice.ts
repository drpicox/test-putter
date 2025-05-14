import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

interface TestKeystrokesInfo {
  index: number;           // Test index
  expression: string;      // Test expression
  keystrokesWhenPassed: number;  // How many keystrokes when test was passed
  isPassed: boolean;       // If test has been passed
}

interface KeystrokesState {
  count: number;               // Total keystrokes
  testKeystrokesInfo: Record<string, TestKeystrokesInfo>;  // Data indexed by test expression
  lastPassedTestIndex: number; // Index of the last passed test
}

const initialState: KeystrokesState = {
  count: 0,
  testKeystrokesInfo: {},
  lastPassedTestIndex: -1,
};

export const keystrokesSlice = createSlice({
  name: 'keystrokes',
  initialState,
  reducers: {
    incrementKeystrokes: (state) => {
      state.count += 1;
    },
    resetKeystrokes: (state) => {
      state.count = 0;
      state.testKeystrokesInfo = {};
      state.lastPassedTestIndex = -1;
    },
    testPassed: (state, action: PayloadAction<{ index: number, expression: string }>) => {
      const { index, expression } = action.payload;
      
      // Only record the first time a test passes
      if (!state.testKeystrokesInfo[expression]?.isPassed) {
        state.testKeystrokesInfo[expression] = {
          index,
          expression,
          keystrokesWhenPassed: state.count,
          isPassed: true
        };
        
        // Update the last passed test if this is a new highest
        if (index > state.lastPassedTestIndex) {
          state.lastPassedTestIndex = index;
        }
      }
    },
    testFailed: (state, action: PayloadAction<{ index: number, expression: string }>) => {
      const { index, expression } = action.payload;
      
      // If this test was previously passed, we don't update anything
      // This preserves the keystrokes required for first success
      if (!state.testKeystrokesInfo[expression]) {
        state.testKeystrokesInfo[expression] = {
          index,
          expression,
          keystrokesWhenPassed: 0,
          isPassed: false
        };
      }
    },
  },
});

// Export actions
export const { 
  incrementKeystrokes, 
  resetKeystrokes,
  testPassed,
  testFailed
} = keystrokesSlice.actions;

// Base selectors
export const selectKeystrokeCount = (state: RootState) => state.keystrokes.count;
export const selectTestKeystrokesInfo = (state: RootState) => state.keystrokes.testKeystrokesInfo;
export const selectLastPassedTestIndex = (state: RootState) => state.keystrokes.lastPassedTestIndex;

// Memoized selectors
export const selectKeystrokesPerTest = createSelector(
  [selectTestKeystrokesInfo],
  (testKeystrokesInfo) => {
    // Convert to array and sort by index
    return Object.values(testKeystrokesInfo)
      .filter(info => info.isPassed)
      .sort((a, b) => a.index - b.index);
  }
);

// Export reducer
export default keystrokesSlice.reducer;