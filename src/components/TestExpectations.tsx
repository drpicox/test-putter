'use client';

import React, { useEffect, useState } from 'react';

interface TestCase {
  expression: string;
  expected: any;
}

interface TestExpectationsProps {
  code: string;
  testCases: TestCase[];
}

const TestExpectations: React.FC<TestExpectationsProps> = ({ code, testCases }) => {
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [visibleTests, setVisibleTests] = useState<number>(1); // Start with 1 visible test

  useEffect(() => {
    const evalCode = () => {
      try {
        // Create a safe evaluation context
        const evalContext = new Function(`
          ${code}
          
          return {
            ${testCases.map(test => `'${test.expression}': ${test.expression}`).join(',')}
          };
        `)();
        
        // Compare results with expected values
        const newResults: Record<string, boolean> = {};
        
        testCases.forEach(test => {
          const actualValue = evalContext[test.expression];
          newResults[test.expression] = actualValue === test.expected;
        });
        
        setResults(newResults);
      } catch (error) {
        // If there are errors in the code, mark all tests as failing
        const failedResults: Record<string, boolean> = {};
        testCases.forEach(test => {
          failedResults[test.expression] = false;
        });
        setResults(failedResults);
      }
    };

    evalCode();
  }, [code, testCases]);

  // Reveal more tests when previous tests pass
  useEffect(() => {
    // Reverse order (from end of array, which has simpler cases)
    const reversedTestOrder = [...testCases].reverse();
    
    // Check how many consecutive tests from the start are passing
    let passedCount = 0;
    for (let i = 0; i < reversedTestOrder.length; i++) {
      const test = reversedTestOrder[i];
      if (results[test.expression]) {
        passedCount++;
      } else {
        break;
      }
    }
    
    // Reveal one more test if all current tests are passing
    if (passedCount >= visibleTests && visibleTests < testCases.length) {
      setVisibleTests(prevVisible => Math.min(prevVisible + 1, testCases.length));
    }
  }, [results, testCases, visibleTests]);

  const allTestsPassing = Object.values(results).every(result => result === true);

  // Get the visible subset of tests
  const visibleTestCases = [...testCases].slice(testCases.length - visibleTests);
  
  // Count how many tests have been unlocked
  const unlockedTests = visibleTests;
  const totalTests = testCases.length;

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
        </div>
      </div>
      
      <div className="space-y-2">
        {visibleTestCases.map((test, index) => {
          const originalIndex = testCases.findIndex(t => t.expression === test.expression);
          return (
            <div 
              key={originalIndex}
              className={`p-3 rounded-md font-mono text-sm ${
                results[test.expression] 
                  ? 'bg-green-100/80 text-green-800 border border-green-200' 
                  : 'bg-red-100/80 text-red-800 border border-red-200'
              }`}
            >
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
                {results[test.expression] ? '✅' : '❌'}
              </span>
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