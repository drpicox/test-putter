import {TestCase, TestResult} from '../slice';

/**
 * Safely evaluates code against test cases
 * 
 * @param code The user-provided code to evaluate
 * @param testCases The test cases to evaluate against
 * @returns Object with test results
 */
export function evaluateCode(code: string, testCases: TestCase[]): { 
  results: TestResult[],
  error: boolean
} {
  try {
    // Create a safe evaluation context
    const evalContext = new Function(`
      ${code}
      
      return {
        ${testCases.map(test => `'${test.expression}': ${test.expression}`).join(',')}
      };
    `)();

    // Compare results with expected values
    const results: TestResult[] = testCases.map(test => {
      try {
        const actualValue = evalContext[test.expression];
        const isPassing = actualValue === test.expected;
        return {
          expression: test.expression,
          passes: isPassing,
          expected: test.expected,
          actual: actualValue
        };
      } catch (error: unknown) {
        return {
          expression: test.expression,
          passes: false,
          expected: test.expected,
          // @ts-expect-error error should be Error
          actual: `// Error: ${error.message}`
        };
      }
    });
    return { results, error: false };
  }catch (error: unknown) {
    return {
      results: testCases.map(test => {
        return {
          expression: test.expression,
          passes: false,
          expected: test.expected,
          // @ts-expect-error error should be Error
          actual: `// Error: ${error.message}`
        };
      }),
      error: true
    }
  }
}