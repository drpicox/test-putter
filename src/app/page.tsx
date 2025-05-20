import Image from "next/image";
import Link from "next/link";
import { challenges } from "@/features/challenges";

export default function Home() {
  return (
    <div className="golf-bg min-h-screen grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)]">
      <div className="golf-content w-full h-full flex flex-col items-center justify-center p-8">
        <main className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center py-16 space-y-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-md">
              Test Putter
            </h1>
            
            <div className="mb-6 relative" style={{ height: "40vh" }}>
              <Image
                src="/golf-flag.svg"
                alt="Golf Hole Flag"
                width={400}
                height={400}
                priority
                className="drop-shadow-lg h-full w-auto object-contain"
              />
            </div>
            
            <p className="text-xl sm:text-2xl font-medium text-white mb-8 max-w-xl text-center drop-shadow-md">
              Pass the test with the minimum keystrokes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-lg">
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
            
            <Link 
              href="/challenges/factorial" 
              className="start-button"
            >
              Start with Factorial
            </Link>
          </div>
        </main>
      </div>
      
      <footer className="mt-auto p-4 text-center text-white/70 text-sm">
        <p>© {new Date().getFullYear()} Test Putter - The Golf-Inspired Testing Experience</p>
      </footer>
    </div>
  );
}