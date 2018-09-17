module.exports = {
    verbose: true,
    rootDir: '../../',
    collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,mjs}'],
    setupFiles: ['<rootDir>/config/polyfills.js'],
    testMatch: [
        '<rootDir>/test/*.{js}',
        '<rootDir>/test/**/?(*.)(spec|test).{js}',
    ],
    testEnvironment: 'node',
    testURL: 'http://localhost',
    transform: {
        '^.+\\.css$': '<rootDir>/config/jest/css-transform.js',
        '^.+\\.(js)$': '<rootDir>/config/jest/jest-transform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'],
    moduleFileExtensions: [
        'web.js',
        'js',
        'json',
        'web.jsx',
        'jsx',
        'node',
        'mjs',
    ],
};
