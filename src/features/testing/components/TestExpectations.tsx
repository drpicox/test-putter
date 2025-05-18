'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { 
  selectTestCases, 
  selectTestResults, 
  selectVisibleTests, 
  selectVisibleTestCases, 
  selectAllTestsPassing,
  setTestResults 
} from '@/features/testing/slice';
import { selectCode } from '@/features/editor/slice';
import { 
  testPassed, 
  testFailed,
  selectTestKeystrokesInfo
} from '@/features/metrics/slice';
import { evaluateCode } from '../utils/evaluate';

const TestExpectations: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const code = useSelector(selectCode);
  const testCases = useSelector(selectTestCases);
  const results = useSelector(selectTestResults);
  const visibleTests = useSelector(selectVisibleTests);
  const visibleTestCases = useSelector(selectVisibleTestCases);
  const allTestsPassing = useSelector(selectAllTestsPassing);
  const testKeystrokesInfo = useSelector(selectTestKeystrokesInfo);

  // Count how many tests have been unlocked
  const totalTests = testCases.length;
  const unlockedTests = visibleTests;

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-green-800">Target Score</h3>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${allTestsPassing ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <div className="flex flex-col items-end">
            <span className={`text-sm font-medium ${allTestsPassing ? 'text-green-600' : 'text-red-600'}`}>
              {allTestsPassing ? 'Target reached!' : 'Not on target yet'}
            </span>
            <span className="text-xs text-gray-500">
              {unlockedTests} of {totalTests} holes unlocked
            </span>
          </div>
          
          {/* Show statistics button when all tests pass */}
          {allTestsPassing && (
            <button
              onClick={() => router.push('/stats')}
              className="ml-2 px-3 py-1 bg-green-600 text-white text-xs rounded-full hover:bg-green-700 transition-colors"
            >
              View Stats
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {visibleTestCases.map((test) => {
          const originalIndex = testCases.findIndex(t => t.expression === test.expression);
          const testInfo = testKeystrokesInfo[test.expression];
          const isPassing = results[test.expression];
          
          return (
            <div 
              key={originalIndex}
              className={`p-3 rounded-md font-mono text-sm ${
                isPassing 
                  ? 'bg-green-100/80 text-green-800 border border-green-200' 
                  : 'bg-red-100/80 text-red-800 border border-red-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="mr-2 text-gray-500">{originalIndex + 1}:</span>
                  <span>expect(</span>
                  <span className="font-semibold">{test.expression}</span>
                  <span>).toBe(</span>
                  <span className="font-semibold">{typeof test.expected === 'string' 
                    ? `"${test.expected}"` 
                    : test.expected
                  }</span>
                  <span>)</span>
                  <span className="ml-2">
                    {isPassing ? '✅' : '❌'}
                  </span>
                </div>
                
                {testInfo?.isPassed && (
                  <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded border border-green-200">
                    Passed at: <span className="font-semibold">{testInfo.keystrokesWhenPassed}</span> strokes
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        {visibleTests < totalTests && (
          <div className="p-3 rounded-md font-mono text-sm bg-gray-100/80 text-gray-500 border border-gray-200 flex items-center">
            <span className="mr-2">🔒</span>
            <span>Pass current tests to unlock next challenge...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestExpectations;