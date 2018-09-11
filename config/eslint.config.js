module.exports = {
    extends: ['prettier'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        eqeqeq: 'error',
        'prefer-const': 'error',
    },
};
