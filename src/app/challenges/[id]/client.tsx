'use client';

import Link from 'next/link';
import { KeystrokesCounter } from '@/features/metrics';
import { CodeEditor } from '@/features/editor';
import { TestExpectations } from '@/features/testing';
import { useChallenge } from '@/features/challenges/hooks';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ChallengeClient() {
  const params = useParams();
  const { currentChallenge, switchChallenge } = useChallenge();
  
  // Get challenge ID from params
  const challengeId = params.id as string;
  
  // Set the challenge based on the ID
  useEffect(() => {
    if (challengeId && challengeId !== currentChallenge?.id) {
      switchChallenge(challengeId);
    }
  }, [challengeId, currentChallenge, switchChallenge]);

  return (
    <div className="golf-bg min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-700/20 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-green-800">Test Putter</Link>
          
          <div className="flex gap-4 items-center">
            <Link href="/challenges" className="text-green-700 hover:text-green-900">
              Challenges
            </Link>
            <Link href="/stats" className="text-green-700 hover:text-green-900">
              Stats
            </Link>
          </div>
        </div>
      </header>

      <main className="golf-content flex-1 container mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <KeystrokesCounter />
          
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-4 border border-green-700/20">
            <h2 className="text-xl font-semibold text-green-800 mb-2">{currentChallenge?.name}</h2>
            <p className="text-green-800">{currentChallenge?.description}</p>
          </div>
        </div>
        
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