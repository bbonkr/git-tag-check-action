module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  setupFiles: [
    'dotenv/config'
    // '<rootDir>/__tests__/setup.ts'
  ],
  verbose: true,
  cacheDirectory: '.test'
}
