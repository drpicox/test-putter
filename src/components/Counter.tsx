'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrement, increment, incrementByAmount } from '@/store/counterSlice';
import { useState } from 'react';

export default function Counter() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Redux Counter</h2>
      
      <div className="flex items-center justify-center mb-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-l"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className="px-4 py-2 border-t border-b text-xl">
          {count}
        </span>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-r"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
        <input
          className="border rounded px-2 py-1 text-right w-20"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
          type="text"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}