import { challenges } from '@/features/challenges';
import ChallengeClient from './client';
import { notFound } from 'next/navigation';

// This enables static generation
export const dynamicParams = false;

// Generate static pages for all challenges
export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    id: challenge.id,
  }));
}

export default async function ChallengePage({ params }: { params: Promise<{ id: string }> }) {
  // Need to await params in async server components
  const { id } = await params;
  
  // Verify that the challenge exists
  const challenge = challenges.find(c => c.id === id);
  
  // If the challenge doesn't exist, return a 404
  if (!challenge) {
    return notFound();
  }
  
  return <ChallengeClient />;
}