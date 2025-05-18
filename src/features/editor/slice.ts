import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { defaultChallenge } from '@/features/challenges';

interface CodeState {
  content: string;
  defaultCode: string;
  currentChallengeId: string;
}

const initialState: CodeState = {
  content: defaultChallenge.template,
  defaultCode: defaultChallenge.template,
  currentChallengeId: defaultChallenge.id,
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
    setChallenge: (state, action: PayloadAction<{ id: string, template: string }>) => {
      state.currentChallengeId = action.payload.id;
      state.defaultCode = action.payload.template;
      state.content = action.payload.template;
    },
  },
});

// Export actions
export const { 
  updateCode, 
  resetCode, 
  setDefaultCode,
  setChallenge
} = codeSlice.actions;

// Export selectors
export const selectCode = (state: RootState) => state.code.content;
export const selectDefaultCode = (state: RootState) => state.code.defaultCode;
export const selectCurrentChallengeId = (state: RootState) => state.code.currentChallengeId;

// Export reducer
export default codeSlice.reducer;