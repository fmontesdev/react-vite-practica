export default {
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'node',
    transformIgnorePatterns: [
        'node_modules/(?!(lodash-es)/)'
    ],
    testMatch: [
        "**/src/**/*.test.js"
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
}