module.exports = {
  setupFiles: ['dotenv/config'],
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '..',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@user/(.*)$': '<rootDir>/src/user/$1',
    '^@teacher/(.*)$': '<rootDir>/src/teacher/$1',
    '^@activity/(.*)$': '<rootDir>/src/activity/$1',
    '^@subject/(.*)$': '<rootDir>/src/subject/$1',
    '^@overload/(.*)$': '<rootDir>/src/overload/$1',
    '^@student/(.*)$': '<rootDir>/src/student/$1',
  },
};
