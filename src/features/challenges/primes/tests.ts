import { TestCase } from '@/features/testing/slice';

// Prime numbers test cases ordered from hardest to simplest
export const primesTests: TestCase[] = [
  { expression: 'JSON.stringify(primes(30))', expected: '[2,3,5,7,11,13,17,19,23,29]' },
  { expression: 'JSON.stringify(primes(20))', expected: '[2,3,5,7,11,13,17,19]' },
  { expression: 'JSON.stringify(primes(15))', expected: '[2,3,5,7,11,13]' }, 
  { expression: 'JSON.stringify(primes(10))', expected: '[2,3,5,7]' },
  { expression: 'JSON.stringify(primes(5))', expected: '[2,3,5]' },
  { expression: 'JSON.stringify(primes(3))', expected: '[2,3]' },
  { expression: 'JSON.stringify(primes(2))', expected: '[2]' },
  { expression: 'JSON.stringify(primes(1))', expected: '[]' },
];