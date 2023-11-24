/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  roots: ['tests'],
  testMatch: ['**/?(*.)+(test).+(ts|tsx)'],
  transform: { '^.+\\.(ts|tsx)$': 'esbuild-jest' },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.globals.js'],
}
