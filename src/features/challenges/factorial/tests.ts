import { TestCase } from '@/features/testing/slice';

// Factorial test cases ordered from hardest to simplest
export const factorialTests: TestCase[] = [
  { expression: 'factorial(10)', expected: 3628800 },
  { expression: 'factorial(9)', expected: 362880 },
  { expression: 'factorial(8)', expected: 40320 },
  { expression: 'factorial(7)', expected: 5040 },
  { expression: 'factorial(6)', expected: 720 },
  { expression: 'factorial(5)', expected: 120 },
  { expression: 'factorial(4)', expected: 24 },
  { expression: 'factorial(3)', expected: 6 },
  { expression: 'factorial(2)', expected: 2 },
  { expression: 'factorial(1)', expected: 1 },
  { expression: 'factorial(0)', expected: 1 },
];