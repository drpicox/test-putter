'use client';

import KeystrokesCounter from '@/components/KeystrokesCounter';
import CodeEditor from '@/components/CodeEditor';
import TestExpectations from '@/components/TestExpectations';

export default function StartPage() {
  return (
    <div className="golf-bg min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-700/20 py-2 px-4">
        <div className="container mx-auto">
          <h1 className="text-xl font-bold text-green-800">Test Putter</h1>
        </div>
      </header>

      <main className="golf-content flex-1 container mx-auto px-4 py-8 flex flex-col gap-6">
        <KeystrokesCounter />
        
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md overflow-hidden border border-green-700/20" style={{ height: "60vh" }}>
          <CodeEditor />
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-green-700/20">
          <TestExpectations />
        </div>
      </main>

      <footer className="mt-auto text-center py-3 text-green-900/70 text-sm bg-white/30 backdrop-blur-sm border-t border-green-700/20">
        <p>Test Putter - Golf-Inspired Coding Challenges</p>
      </footer>
    </div>
  );
}