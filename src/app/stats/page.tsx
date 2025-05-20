'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectKeystrokeCount, selectKeystrokesPerTest } from '@/features/metrics/slice';
import { selectTestCases } from '@/features/testing/slice';
import { selectCurrentChallengeId } from '@/features/editor/slice';
import { getChallengeById } from '@/features/challenges';

export default function StatsPage() {
  const totalKeystrokes = useSelector(selectKeystrokeCount);
  const keystrokesPerTest = useSelector(selectKeystrokesPerTest);
  const testCases = useSelector(selectTestCases);
  const currentChallengeId = useSelector(selectCurrentChallengeId);
  const currentChallenge = getChallengeById(currentChallengeId);
  
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
    <div className="golf-bg min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-700/20 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-800">Test Putter</h1>
          <Link 
            href={currentChallengeId ? `/challenges/${currentChallengeId}` : '/challenges'}
            className="text-green-700 hover:text-green-900"
          >
            Back to Editor
          </Link>
        </div>
      </header>

      <main className="golf-content flex-1 container mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-green-700/20">
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Your Performance Statistics
          </h2>
          
          <p className="text-green-700 mb-6">
            Challenge: {currentChallenge?.name || 'Unknown'}
          </p>

          {/* Total keystrokes summary */}
          <div className="mb-8">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-800 text-lg font-medium">Total Keystrokes:</div>
              <div className="text-3xl font-bold text-green-800">{totalKeystrokes}</div>
            </div>
          </div>

          {/* Tests completed summary */}
          <div className="mb-8">
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-green-800 text-lg font-medium">Tests Completed:</div>
              <div className="text-3xl font-bold text-green-800">{keystrokesPerTest.length} / {testCases.length}</div>
            </div>
          </div>

          {/* Per-test statistics */}
          <h3 className="text-xl font-semibold text-green-800 mb-4">Keystrokes per Challenge</h3>
          
          <div className="overflow-hidden rounded-lg border border-green-200 mb-8">
            <table className="min-w-full divide-y divide-green-200">
              <thead className="bg-green-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                    Test
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                    Keystrokes
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">
                    Incremental
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-green-100">
                {sortedTestsInfo.map((test) => {
                  const testCase = testCases[test.index];
                  return (
                    <tr key={test.expression} className="hover:bg-green-50">
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-gray-900">
                        {testCase?.expression || test.expression}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {test.keystrokesWhenPassed}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          +{test.incremental}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {/* Call to action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={currentChallengeId ? `/challenges/${currentChallengeId}` : '/challenges'}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150 text-center"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-white border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition duration-150 text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto text-center py-3 text-green-900/70 text-sm bg-white/30 backdrop-blur-sm border-t border-green-700/20">
        <p>Test Putter - Golf-Inspired Coding Challenges</p>
      </footer>
    </div>
  );
}