import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HoleDetail from '@/components/HoleDetail';
import { getHoles } from '@/data/holesData';

// Control whether pages not included in generateStaticParams should be generated on demand
export const dynamicParams = false;

export async function generateStaticParams() {
  const holes = getHoles();

  return holes.map((hole) => ({
    id: hole.id,
  }));
}

export default async function HolePage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // Get all holes to find the one with matching ID
  const holes = getHoles();
  const hole = holes.find((h) => h.id === id);

  // If hole not found, display a 404 page
  if (!hole) {
    notFound();
  }

  return (
    <div className="min-h-screen p-4 pb-20 sm:p-6 md:p-8 font-[family-name:var(--font-geist-sans)]" style={{ backgroundColor: 'var(--background)' }}>
      <header className="w-full py-4 flex justify-between items-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span>Back to all holes</span>
        </Link>

        <div className="flex items-center gap-2">
          <Image
            src="/golf-ball.svg"
            alt="Golf Ball"
            width={24}
            height={24}
            className="dark:invert"
          />
          <h1 className="text-xl font-semibold text-primary">Test Putter</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <HoleDetail holeId={id} />
      </main>
    </div>
  );
}