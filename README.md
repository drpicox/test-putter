This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Development Approach

### Test-Driven Development (TDD)

This project follows Test-Driven Development principles. All new features are implemented using the TDD approach:

1. **Write the test first**: Before implementing any feature or model, we write tests that define the expected behavior.
2. **Run the test (watch it fail)**: Verify that the test fails since the feature hasn't been implemented yet.
3. **Write the code**: Implement the minimum amount of code to make the test pass.
4. **Run the test (ensure it passes)**: Verify that the implementation satisfies the test requirements.
5. **Refactor**: Clean up the code while ensuring tests continue to pass.

### Testing Structure

- **Model Tests**: Located in `src/models/__tests__/` to test data models
- **Component Tests**: Located in `src/components/__tests__/` to test React components
- **Data Service Tests**: Located in `src/data/__tests__/` to test data services
- **Page Tests**: Located in `src/app/__tests__/` to test page components

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (for development)
npm run test:watch
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

### Deploy on GitHub Pages

This project is configured for GitHub Pages deployment. The setup includes:

1. **GitHub Actions Workflow**: Automatically builds and deploys to GitHub Pages when changes are pushed to the main branch.
2. **Static Export Configuration**: Next.js is configured to generate static files that work on GitHub Pages.

To deploy to GitHub Pages:

1. Push your changes to the main branch
2. GitHub Actions will automatically build and deploy your site
3. Your site will be available at `https://your-username.github.io/test-putter/`

You can also manually trigger a deployment from the GitHub Actions tab in your repository.

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
