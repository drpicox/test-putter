import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { defaultChallenge } from '@/features/challenges';

export interface TestCase {
  expression: string;
  expected: number | string | boolean;
}

export interface TestResult {
    expression: string;
    passes: boolean;
    expected: number | string | boolean;
    actual: number | string | boolean | null;
}

interface TestsState {
  testCases: TestCase[];
  testResults: TestResult[];
  visibleTests: number;
}

const initialState: TestsState = {
  testCases: defaultChallenge.tests,
  testResults: [],
  visibleTests: 1, // Start with one visible test (the simplest one)
};

export const testsSlice = createSlice({
  name: 'tests',
  initialState,
  reducers: {
    setTestResults: (state, action: PayloadAction<TestResult[]>) => {
      state.testResults = action.payload;

      // Find the index of the first test case failing
        const firstFailingIndex = state.testResults.findIndex((result) => !result.passes);

        if (firstFailingIndex === -1) {
            // All tests are passing
            state.visibleTests = state.testCases.length;
        } else if (firstFailingIndex >= state.visibleTests) {
            // If there are failing tests, set visibleTests to the index of the first failing test
            state.visibleTests = firstFailingIndex + 1;
        }
    },
    increaseVisibleTests: (state) => {
      if (state.visibleTests < state.testCases.length) {
        state.visibleTests += 1;
      }
    },
    resetTests: (state) => {
      state.testResults = [];
      state.visibleTests = 1;
    },
    setTestCases: (state, action: PayloadAction<TestCase[]>) => {
      state.testCases = action.payload;
      state.testResults = action.payload.map(test => ({
        expression: test.expression,
        passes: false,
        expected: test.expected,
        actual: null,
      }));
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

export const selectVisibleTestCases = createSelector(
  [selectTestCases, selectVisibleTests],
  (testCases, visibleTests) => {
    return testCases.slice(0, visibleTests);
  }
);

export const selectVisibleTestResults = createSelector(
    [selectTestResults, selectVisibleTests],
    (testResults, visibleTests) => {
      return testResults.slice(0, visibleTests);
    }
);

export const selectAllTestsPassing = createSelector(
  [selectTestResults],
  (testResults) => {
    return testResults.every(result => result.passes);
  }
);

// Export reducer
export default testsSlice.reducer;