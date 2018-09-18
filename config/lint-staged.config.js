module.exports = {
    linters: {
        '*.js': ['eslint --config config/eslint.config.js --fix', 'git add'],
        '*.+(js|json|css|md)': ['prettier --write', 'git add'],
    },
};
