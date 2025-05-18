import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCode } from '@/features/editor';
import { 
  selectTestCases, 
  setTestResults,
} from '@/features/testing';
import { 
  testPassed, 
  testFailed,
} from '@/features/metrics';
import { evaluateCode } from '@/features/testing';

/**
 * Hook to evaluate code against test cases
 */
export function useCodeEvaluation() {
  const dispatch = useDispatch();
  const code = useSelector(selectCode);
  const testCases = useSelector(selectTestCases);

  useEffect(() => {
    const runTests = () => {
      const { results: newResults } = evaluateCode(code, testCases);
      
      // Update test results
      dispatch(setTestResults(newResults));
      
      // Update metrics for each test
      testCases.forEach((test, index) => {
        if (newResults[test.expression]) {
          dispatch(testPassed({ index, expression: test.expression }));
        } else {
          dispatch(testFailed({ index, expression: test.expression }));
        }
      });
    };

    runTests();
  }, [code, testCases, dispatch]);

  return null;
}

export default useCodeEvaluation;