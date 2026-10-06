import nextJest from 'next/jest.js';

export default nextJest({ dir: './' })({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['test/jest.setup.ts'],
  moduleNameMapper: { '^@/(.*)$': 'test/src/$1' },
});