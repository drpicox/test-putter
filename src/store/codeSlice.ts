import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CodeState {
  content: string;
  defaultCode: string;
}

const initialState: CodeState = {
  content: `function factorial(n) {
  return null;
}`,
  defaultCode: `function factorial(n) {
  return null;
}`,
};

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    updateCode: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    resetCode: (state) => {
      state.content = state.defaultCode;
    },
    setDefaultCode: (state, action: PayloadAction<string>) => {
      state.defaultCode = action.payload;
      // Optionally reset current content to the new default
      state.content = action.payload;
    },
  },
});

// Export actions
export const { updateCode, resetCode, setDefaultCode } = codeSlice.actions;

// Export selectors
export const selectCode = (state: RootState) => state.code.content;
export const selectDefaultCode = (state: RootState) => state.code.defaultCode;

// Export reducer
export default codeSlice.reducer;