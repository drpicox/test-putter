import { challenges } from '@/features/challenges';
import Link from 'next/link';
import Image from 'next/image';

// Server component - async function for server-side rendering
export default async function ChallengePage() {
  return (
    <div className="golf-bg min-h-screen grid grid-rows-[auto_1fr_auto]">
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-700/20 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-green-800">Test Putter</Link>
          <Link href="/stats" className="text-green-700 hover:text-green-900">
            Stats
          </Link>
        </div>
      </header>
      
      <div className="golf-content w-full h-full">
      <main className="flex-1 container mx-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-md text-center">Available Challenges</h1>
          
          <div className="mb-6 relative flex justify-center">
            <Image
              src="/golf-flag.svg"
              alt="Golf Hole Flag"
              width={200}
              height={200}
              priority
              className="drop-shadow-lg h-32 w-auto object-contain"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map(challenge => (
              <Link 
                key={challenge.id}
                href={`/challenges/${challenge.id}`}
                className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 border border-green-700/20 hover:bg-white transition-colors"
              >
                <h2 className="text-xl font-semibold text-green-800 mb-2">
                  {challenge.name}
                </h2>
                <p className="text-green-700 text-sm mb-4">
                  {challenge.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-green-600">
                    {challenge.tests.length} holes
                  </span>
                  <span className="text-green-700 text-sm font-medium">
                    Play now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      </div>
      <footer className="mt-auto text-center py-3 text-green-900/70 text-sm bg-white/30 backdrop-blur-sm border-t border-green-700/20">
        <p>Test Putter - Golf-Inspired Coding Challenges</p>
      </footer>
    </div>
  );
}