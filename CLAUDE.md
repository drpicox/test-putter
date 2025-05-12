# Test Putter Project Guide for Claude

## Project Description
Test Putter is a web application for learning Test-Driven Development (TDD) through interactive coding challenges. Each "hole" represents a programming problem that users solve by following the TDD approach - writing tests first, then implementing code to make them pass.

## Recent Work
We've transformed the application from a golf-themed putting game to a programming challenge platform with TDD functionality. Major changes include:

1. CodeMirror integration for code editing
2. TestRunner component for executing tests in sequence
3. Challenge structure in YAML with function signatures, tests, and learning objectives
4. UI transformation to reflect programming theme

## Project Structure

### Key Components:
- `/components/HoleDetail.tsx`: Displays individual coding challenges with code editor and tests
- `/components/TestRunner.tsx`: Executes tests against user code and displays results
- `/components/HolesList.tsx`: Lists all available challenges
- `/public/data/holes/*.yaml`: Challenge definitions in YAML format
- `/app/holes/[id]/page.tsx`: Dynamic route for individual challenges
- `/app/page.tsx`: Home page with challenge list and info

### YAML Structure for Challenges:
```yaml
id: "1"
name: "Factorial"
description: "Implement a function that calculates the factorial..."
difficulty: "beginner"
par: 5

function_name: "factorial"
parameters:
  - name: "n"
    type: "number"
return_type: "number"

starting_code: |
  function factorial(n) {
    // Your implementation here
  }

tests:
  - name: "handles zero input"
    code: "factorial(0)"
    expected: 1
    hint: "The factorial of 0 is defined as 1"
  # More tests...

solution_approaches:
  - name: "Iterative"
    description: "Use a loop to multiply all numbers from 1 to n"

learning_objectives:
  - "Understanding basic looping or recursion"
  # More objectives...
```

## Next Steps
Potential improvements to discuss in future sessions:

1. User progress tracking with localStorage or database
2. Solution submission and verification system
3. Authentication for tracking progress across sessions
4. Adding more programming challenges
5. Tutorial mode for users new to TDD
6. Enhanced code editor features
7. Solution comparison with optimal examples
8. Performance metrics tracking

## Commands
- `npm run dev` - Run development server
- `npm run build` - Build for production
- `npm run export` - Generate static site for GitHub Pages
- `npm test` - Run tests

## Notes for Future Sessions
When continuing this project, remember:
- The project is a TDD learning platform, not a golf game
- Each "hole" is actually a programming challenge
- The par value represents the estimated complexity/lines of code
- The current focus is on browser-based TDD with interactive feedback