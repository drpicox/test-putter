import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]" style={{ backgroundColor: 'var(--background)' }}>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
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

        <div className="p-6 rounded-lg bg-putting-green bg-opacity-20 border border-primary">
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
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
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
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-primary">
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
