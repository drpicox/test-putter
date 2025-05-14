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

  const allTestsPassing = Object.values(results).every(result => result === true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Test Expectations</h3>
        <div className="flex items-center gap-2">
          <span className={`h-3 w-3 rounded-full ${allTestsPassing ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className={`text-sm font-medium ${allTestsPassing ? 'text-green-600' : 'text-red-600'}`}>
            {allTestsPassing ? 'All tests passing' : 'Tests failing'}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {testCases.map((test, index) => (
          <div 
            key={index}
            className={`p-3 rounded-md font-mono text-sm ${
              results[test.expression] 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}
          >
            <span>expect(</span>
            <span className="font-semibold">{test.expression}</span>
            <span>).toBe(</span>
            <span className="font-semibold">{typeof test.expected === 'string' 
              ? `"${test.expected}"` 
              : test.expected
            }</span>
            <span>)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestExpectations;