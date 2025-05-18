import { TestCase } from '../slice';

/**
 * Safely evaluates code against test cases
 * 
 * @param code The user-provided code to evaluate
 * @param testCases The test cases to evaluate against
 * @returns Object with test results
 */
export function evaluateCode(code: string, testCases: TestCase[]): { 
  results: Record<string, boolean>,
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
    const results: Record<string, boolean> = {};
    
    testCases.forEach((test) => {
      const actualValue = evalContext[test.expression];
      const isPassing = actualValue === test.expected;
      results[test.expression] = isPassing;
    });
    
    return { results, error: false };
  } catch {
    // If there are errors in the code, mark all tests as failing
    const failedResults: Record<string, boolean> = {};
    testCases.forEach((test) => {
      failedResults[test.expression] = false;
    });
    
    return { results: failedResults, error: true };
  }
}