import { challenges } from '@/features/challenges';
import ChallengeClient from './client';

// This enables static generation
export const dynamicParams = false;

// Generate static pages for all challenges
export async function generateStaticParams() {
  return challenges.map((challenge) => ({
    slug: [challenge.id],
  }));
}

export default async function ChallengeDetailPage() {
  return <ChallengeClient />;
}