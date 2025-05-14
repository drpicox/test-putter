'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { selectKeystrokeCount, selectKeystrokesPerTest } from '@/store/keystrokesSlice';
import { selectTestCases } from '@/store/testsSlice';

interface StatisticsProps {
  onClose: () => void;
}

const Statistics: React.FC<StatisticsProps> = ({ onClose }) => {
  const totalKeystrokes = useSelector(selectKeystrokeCount);
  const keystrokesPerTest = useSelector(selectKeystrokesPerTest);
  const testCases = useSelector(selectTestCases);
  
  // Calculate the incremental keystrokes needed for each test
  const incrementalKeystrokes = keystrokesPerTest.map((test, index) => {
    if (index === 0) {
      return {
        ...test,
        incremental: test.keystrokesWhenPassed
      };
    } else {
      const previousTest = keystrokesPerTest[index - 1];
      return {
        ...test,
        incremental: test.keystrokesWhenPassed - previousTest.keystrokesWhenPassed
      };
    }
  });

  // Sort tests by their original index for consistent display
  const sortedTestsInfo = [...incrementalKeystrokes].sort((a, b) => a.index - b.index);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-800">Your Performance Statistics</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-800">Total Keystrokes:</div>
              <div className="text-2xl font-bold text-green-800">{totalKeystrokes}</div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-green-800 mb-3">Keystrokes per Challenge</h3>
          
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keystrokes</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Incremental</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTestsInfo.map((test) => {
                  const testCase = testCases[test.index];
                  return (
                    <tr key={test.expression}>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-gray-900">
                        {testCase?.expression || test.expression}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {test.keystrokesWhenPassed}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        +{test.incremental}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;