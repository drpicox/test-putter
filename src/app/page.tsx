import Image from "next/image";
import { HolesList } from "../components/HolesList";
import { getHoles } from "../data/holesData";

export default function Home() {
  const holes = getHoles();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-4 pb-20 gap-8 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)]" style={{ backgroundColor: 'var(--background)' }}>
      <header className="w-full py-4 flex justify-center">
        <div className="flex items-center gap-4">
          <Image
            src="/file.svg"
            alt="Code File"
            width={40}
            height={40}
            priority
            className="dark:invert"
          />
          <h1 className="text-3xl font-bold text-primary">Test Putter</h1>
          <Image
            src="/window.svg"
            alt="Code Window"
            width={40}
            height={40}
            priority
            className="dark:invert"
          />
        </div>
      </header>

      <main className="flex flex-col items-center gap-12 max-w-6xl mx-auto w-full">
        <section className="w-full">
          <div className="p-6 rounded-lg bg-putting-green bg-opacity-20 border border-primary max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-primary">Improve Your Coding Skills with TDD</h2>
            <ol className="list-inside list-decimal text-sm/6 text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2 tracking-[-.01em]">
                Write tests first to define your requirements
              </li>
              <li className="mb-2 tracking-[-.01em]">
                Implement code step-by-step to pass each test
              </li>
              <li className="tracking-[-.01em]">
                Refactor your solution while maintaining test coverage
              </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-background gap-2 hover:opacity-90 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="#challenges"
                rel="noopener noreferrer"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Start Coding Challenges
              </a>
              <a
                className="rounded-full border border-solid border-primary/[.40] transition-colors flex items-center justify-center hover:bg-primary hover:bg-opacity-10 hover:border-primary font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                href="https://en.wikipedia.org/wiki/Test-driven_development"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn About TDD
              </a>
            </div>
          </div>
        </section>

        <section id="challenges" className="w-full">
          <HolesList holes={holes} />
        </section>
      </main>

      <footer className="w-full py-6 flex gap-[24px] flex-wrap items-center justify-center text-primary">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://en.wikipedia.org/wiki/Test-driven_development"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
          TDD Resources
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/topics/tdd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          GitHub Projects
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://twitter.com/hashtag/tdd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
            className="dark:invert"
          />
          #TDD Community
        </a>
      </footer>
    </div>
  );
}