process.env.NODE_ENV = 'test';

const jest = require('jest');

let argv = process.argv.slice(2);

jest.run(argv);