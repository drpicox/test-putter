'use client';

import React from 'react';

interface KeystrokesCounterProps {
  count: number;
}

const KeystrokesCounter: React.FC<KeystrokesCounterProps> = ({ count }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 flex items-center justify-between border border-green-700/20">
      <div className="flex items-center">
        <span className="text-xl font-bold mr-2">⛳</span>
        <h2 className="text-xl font-semibold text-green-800">Strokes</h2>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-green-700">{count}</span>
        <span className="text-sm text-green-600">keystrokes</span>
      </div>
    </div>
  );
};

export default KeystrokesCounter;