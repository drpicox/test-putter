import { factorialTests } from './factorial/tests';
import { factorialTemplate } from './factorial/template';
import { primesTests } from './primes/tests';
import { primesTemplate } from './primes/template';
import { TestCase } from '@/features/testing/slice';

// Define challenge interface
export interface Challenge {
  id: string;
  name: string;
  description: string;
  tests: TestCase[];
  template: string;
}

// Define the available challenges
export const challenges: Challenge[] = [
  {
    id: 'factorial',
    name: 'Factorial',
    description: 'Implement a function that calculates the factorial of a number',
    tests: factorialTests,
    template: factorialTemplate,
  },
  {
    id: 'primes',
    name: 'Prime Numbers',
    description: 'Implement a function that returns all prime numbers less than or equal to n',
    tests: primesTests,
    template: primesTemplate,
  },
];

// Helper function to get a challenge by ID
export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find(challenge => challenge.id === id);
}

// Default challenge is factorial
export const defaultChallenge = challenges[0];