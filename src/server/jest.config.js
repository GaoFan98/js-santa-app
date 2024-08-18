module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@app/(.*)$': '<rootDir>/src/$1',
      '^@tests/(.*)$': '<rootDir>/tests/$1',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    transform: {
      '^.+\\.ts$': ['ts-jest', {
        tsconfig: 'tsconfig.json',
      }],
    },
    testMatch: ['**/tests/**/*.test.ts'],
  };  