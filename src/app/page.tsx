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
            src="/golf-ball.svg"
            alt="Golf Ball"
            width={40}
            height={40}
            priority
            className="dark:invert"
          />
          <h1 className="text-3xl font-bold text-primary">Test Putter</h1>
          <Image
            src="/golf-flag.svg"
            alt="Golf Flag"
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
            <h2 className="text-xl font-semibold mb-4 text-primary">Improve Your Putting Game</h2>
            <ol className="list-inside list-decimal text-sm/6 text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2 tracking-[-.01em]">
                Analyze your putting stroke with precision
              </li>
              <li className="mb-2 tracking-[-.01em]">
                Track your progress over time with detailed metrics
              </li>
              <li className="tracking-[-.01em]">
                Get personalized tips to lower your scores on the green
              </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary text-background gap-2 hover:opacity-90 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                href="#"
                rel="noopener noreferrer"
              >
                <Image
                  src="/golf-ball.svg"
                  alt="Golf Ball"
                  width={20}
                  height={20}
                  className="invert"
                />
                Start Putting Analysis
              </a>
              <a
                className="rounded-full border border-solid border-primary/[.40] transition-colors flex items-center justify-center hover:bg-primary hover:bg-opacity-10 hover:border-primary font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
                href="#"
                rel="noopener noreferrer"
              >
                View Techniques
              </a>
            </div>
          </div>
        </section>

        <section className="w-full">
          <HolesList holes={holes} />
        </section>
      </main>

      <footer className="w-full py-6 flex gap-[24px] flex-wrap items-center justify-center text-primary">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/golf-ball.svg"
            alt="Golf Ball"
            width={16}
            height={16}
            className="dark:invert"
          />
          Putting Tips
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/golf-flag.svg"
            alt="Golf Flag"
            width={16}
            height={16}
            className="dark:invert"
          />
          Course Directory
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
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
          Golf News
        </a>
      </footer>
    </div>
  );
}
