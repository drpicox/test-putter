// Re-export components and slice
export { default as CodeEditor } from './components/CodeEditor';
export { default as editorReducer } from './slice';
export {
  updateCode,
  resetCode,
  setDefaultCode,
  setChallenge,
  selectCode,
  selectDefaultCode,
  selectCurrentChallengeId,
} from './slice';