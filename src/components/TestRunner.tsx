'use client';

import React, { useState } from 'react';

interface TestCase {
  name: string;
  code: string;
  expected?: unknown;
  expected_error?: boolean;
  hint: string;
}

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
  actual?: unknown;
  expected?: unknown;
  hint?: string;
}

interface TestRunnerProps {
  code: string;
  tests: TestCase[];
  onTestsComplete?: (results: TestResult[]) => void;
}

export default function TestRunner({ code, tests, onTestsComplete }: TestRunnerProps) {
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [activeTest, setActiveTest] = useState<number | null>(null);

  // Function to run the tests
  const runTests = () => {
    setRunning(true);
    setResults([]);
    
    // We'll run tests in sequence to better simulate TDD workflow
    runTestSequence(0);
  };

  // Function to run tests in sequence
  const runTestSequence = (index: number) => {
    if (index >= tests.length) {
      setRunning(false);
      setActiveTest(null);
      if (onTestsComplete) {
        onTestsComplete(results);
      }
      return;
    }

    setActiveTest(index);
    const currentTest = tests[index];
    
    try {
      // Create a safe execution environment
      const testResult = executeTest(code, currentTest);
      
      // Add to results
      const newResults = [...results, testResult];
      setResults(newResults);
      
      // If test passed, continue to next test
      setTimeout(() => {
        runTestSequence(index + 1);
      }, 500); // Add small delay between tests for visual feedback
    } catch (error) {
      console.error('Error running test:', error);
      
      // Add failed test result
      const newResults = [...results, {
        name: currentTest.name,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        expected: currentTest.expected,
        hint: currentTest.hint
      }];
      
      setResults(newResults);
      setRunning(false);
      setActiveTest(null);
      
      if (onTestsComplete) {
        onTestsComplete(newResults);
      }
    }
  };

  // Function to safely execute a test
  const executeTest = (codeString: string, test: TestCase): TestResult => {
    try {
      // Create a function from the code
      // Using new Function is safer than eval but still has security implications
      // In a production app, consider using a sandboxed environment or Web Workers
      new Function('return ' + codeString)();

      // For expected_error tests, we need to check if it throws
      if (test.expected_error) {
        let threwError = false;
        let errorMessage = '';

        try {
          // Evaluate the test code with the user's function
          // This is potentially unsafe, but necessary for evaluating code
          Function(`
            ${codeString}
            ${test.code};
          `)();
        } catch (e) {
          threwError = true;
          errorMessage = e instanceof Error ? e.message : 'Unknown error';
        }

        if (!threwError) {
          return {
            name: test.name,
            passed: false,
            error: 'Expected error, but none was thrown',
            expected: 'Error to be thrown',
            actual: 'No error',
            hint: test.hint
          };
        }

        return {
          name: test.name,
          passed: true,
          actual: `Error: ${errorMessage}`,
          expected: 'Error to be thrown',
          hint: test.hint
        };
      }

      // For regular tests, evaluate the result
      // Using Function instead of eval for better safety
      const resultFunction = Function(`
        ${codeString}
        return ${test.code};
      `);
      const result = resultFunction();

      // Check if result matches expected
      const passed = deepEqual(result, test.expected);

      return {
        name: test.name,
        passed,
        actual: result,
        expected: test.expected,
        hint: test.hint
      };
    } catch (error) {
      return {
        name: test.name,
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        expected: test.expected,
        hint: test.hint
      };
    }
  };

  // Deep equality check function
  const deepEqual = (a: unknown, b: unknown): boolean => {
    if (a === b) return true;

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) {
      return a === b;
    }

    const keysA = Object.keys(a as Record<string, unknown>);
    const keysB = Object.keys(b as Record<string, unknown>);

    if (keysA.length !== keysB.length) return false;

    return keysA.every(key =>
      keysB.includes(key) && deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    );
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-primary">Test Cases</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
          onClick={runTests}
          disabled={running}
        >
          {running ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Running Tests...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Run Tests
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        {tests.map((test, index) => {
          const testResult = results.find(r => r.name === test.name);
          
          return (
            <div 
              key={test.name} 
              className={`p-4 rounded-lg border transition-all ${
                testResult 
                  ? testResult.passed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                  : activeTest === index
                    ? 'bg-blue-50 border-blue-200 animate-pulse'
                    : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {testResult ? (
                    testResult.passed ? (
                      <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                  <h3 className="font-medium">{test.name}</h3>
                </div>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{test.code}</code>
              </div>
              
              {testResult && (
                <div className="mt-2">
                  {testResult.passed ? (
                    <div className="text-green-700 text-sm">
                      <span className="font-semibold">Expected:</span> {JSON.stringify(testResult.expected)} 
                      <span className="font-semibold ml-2">Actual:</span> {JSON.stringify(testResult.actual)}
                    </div>
                  ) : (
                    <div className="text-red-700 text-sm">
                      {testResult.error ? (
                        <div className="font-semibold">{testResult.error}</div>
                      ) : (
                        <>
                          <span className="font-semibold">Expected:</span> {JSON.stringify(testResult.expected)} 
                          <span className="font-semibold ml-2">Actual:</span> {JSON.stringify(testResult.actual)}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {(!testResult || !testResult.passed) && (
                <div className="mt-2 bg-yellow-50 p-2 rounded text-sm text-yellow-800">
                  <span className="font-semibold">Hint:</span> {test.hint}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}