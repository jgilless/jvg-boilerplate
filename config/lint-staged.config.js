module.exports = {
    linters: {
        '**/*.+(js|json|less|css||md)"': [
            'eslint --config ./eslint.config.js --fix',
            'prettier --config ./prettier.config.js --write',
            'git add',
        ],
    },
};
