module.exports = {
  setupFiles: ['<rootDir>/enzyme.config.js'],
  moduleNameMapper: {
    '^.+\\.(jpeg|jpg|css|less|scss)$': 'identity-obj-proxy',
  },
  roots: [
    '<rootDir>',
    '<rootDir>/src/components',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
};
