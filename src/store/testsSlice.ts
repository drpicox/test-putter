import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface TestCase {
  expression: string;
  expected: any;
}

interface TestResults {
  [key: string]: boolean;
}

interface TestsState {
  testCases: TestCase[];
  testResults: TestResults;
  visibleTests: number;
}

const initialTestCases: TestCase[] = [
  { expression: 'factorial(10)', expected: 3628800 },
  { expression: 'factorial(9)', expected: 362880 },
  { expression: 'factorial(8)', expected: 40320 },
  { expression: 'factorial(7)', expected: 5040 },
  { expression: 'factorial(6)', expected: 720 },
  { expression: 'factorial(5)', expected: 120 },
  { expression: 'factorial(4)', expected: 24 },
  { expression: 'factorial(3)', expected: 6 },
  { expression: 'factorial(2)', expected: 2 },
  { expression: 'factorial(1)', expected: 1 },
  { expression: 'factorial(0)', expected: 1 },
];

const initialState: TestsState = {
  testCases: initialTestCases,
  testResults: {},
  visibleTests: 1, // Start with one visible test (the simplest one)
};

export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTestResults: (state, action: PayloadAction<TestResults>) => {
      state.testResults = action.payload;
      
      // Auto-update visible tests based on passing tests
      const reversedTestOrder = [...state.testCases].reverse();
      let passedCount = 0;
      
      for (let i = 0; i < reversedTestOrder.length; i++) {
        const test = reversedTestOrder[i];
        if (state.testResults[test.expression]) {
          passedCount++;
        } else {
          break;
        }
      }
      
      // Reveal one more test if all current tests are passing
      if (passedCount >= state.visibleTests && state.visibleTests < state.testCases.length) {
        state.visibleTests = Math.min(state.visibleTests + 1, state.testCases.length);
      }
    },
    increaseVisibleTests: (state) => {
      if (state.visibleTests < state.testCases.length) {
        state.visibleTests += 1;
      }
    },
    resetTests: (state) => {
      state.testResults = {};
      state.visibleTests = 1;
    },
    setTestCases: (state, action: PayloadAction<TestCase[]>) => {
      state.testCases = action.payload;
      state.testResults = {};
      state.visibleTests = 1;
    },
  },
});

// Export actions
export const { 
  setTestResults, 
  increaseVisibleTests, 
  resetTests,
  setTestCases
} = testsSlice.actions;

// Base selectors
export const selectTestCases = (state: RootState) => state.tests.testCases;
export const selectTestResults = (state: RootState) => state.tests.testResults;
export const selectVisibleTests = (state: RootState) => state.tests.visibleTests;

// Memoized selectors using createSelector
export const selectVisibleTestCases = createSelector(
  [selectTestCases, selectVisibleTests],
  (testCases, visibleTests) => {
    return testCases.slice(testCases.length - visibleTests);
  }
);

export const selectAllTestsPassing = createSelector(
  [selectTestResults],
  (testResults) => {
    return Object.values(testResults).length > 0 && 
           Object.values(testResults).every(result => result === true);
  }
);

// Export reducer
export default testsSlice.reducer;