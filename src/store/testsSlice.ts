import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface TestCase {
  expression: string;
  expected: number | string | boolean;
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
      
      // Check if all current visible tests are passing
      let allCurrentTestsPassing = true;
      const visibleCases = state.testCases.slice(state.testCases.length - state.visibleTests);
      
      for (const test of visibleCases) {
        if (!state.testResults[test.expression]) {
          allCurrentTestsPassing = false;
          break;
        }
      }
      
      // If all visible tests are passing, reveal the next test
      if (allCurrentTestsPassing && state.visibleTests < state.testCases.length) {
        state.visibleTests += 1;
      }
      
      // Ensure we reveal all tests if they're all passing
      if (Object.values(state.testResults).length === state.testCases.length && 
          Object.values(state.testResults).every(r => r === true)) {
        state.visibleTests = state.testCases.length;
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
  [selectTestResults, selectTestCases],
  (testResults, testCases) => {
    // Make sure we have results for all tests
    const allTestsHaveResults = Object.keys(testResults).length === testCases.length;
    // Make sure all test results are passing
    const allResultsPass = Object.values(testResults).every(result => result === true);
    
    return allTestsHaveResults && allResultsPass;
  }
);

// Export reducer
export default testsSlice.reducer;