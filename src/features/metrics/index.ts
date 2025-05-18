// Re-export components and slice
export { default as KeystrokesCounter } from './components/KeystrokesCounter';
export { default as Statistics } from './components/Statistics';
export { default as metricsReducer } from './slice';
export {
  incrementKeystrokes,
  resetKeystrokes,
  testPassed,
  testFailed,
  selectKeystrokeCount,
  selectTestKeystrokesInfo,
  selectLastPassedTestIndex,
  selectKeystrokesPerTest,
  type TestKeystrokesInfo
} from './slice';