import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="golf-bg min-h-screen grid grid-rows-[auto_1fr_auto] font-[family-name:var(--font-geist-sans)]">
      <div className="golf-content w-full h-full flex flex-col items-center justify-center p-8">
        <main className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center py-16 space-y-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white drop-shadow-md">
              Test Putter
            </h1>
            
            <div className="mb-6 relative" style={{ height: "50vh" }}>
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
            
            <Link 
              href="/start" 
              className="start-button"
            >
              Start!
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
