'use client';

import { useState, useEffect } from 'react';
import KeystrokesCounter from '@/components/KeystrokesCounter';
import CodeEditor from '@/components/CodeEditor';
import TestExpectations from '@/components/TestExpectations';

export default function StartPage() {
  const [keystrokesCount, setKeystrokesCount] = useState(0);
  const [code, setCode] = useState(`function factorial(n) {
  return 0;
}`);

  const testCases = [
    { expression: 'factorial(2)', expected: 2 },
    { expression: 'factorial(1)', expected: 1 },
    { expression: 'factorial(0)', expected: 1 },
  ];

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    // We'll track keystrokes in the CodeEditor component and lift the state up
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col gap-6">
        <KeystrokesCounter count={keystrokesCount} />
        
        <div className="flex-1 bg-white rounded-lg shadow-md overflow-hidden">
          <CodeEditor 
            code={code} 
            onChange={handleCodeChange} 
            onKeystroke={() => setKeystrokesCount(prev => prev + 1)}
          />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <TestExpectations code={code} testCases={testCases} />
        </div>
      </main>
    </div>
  );
}