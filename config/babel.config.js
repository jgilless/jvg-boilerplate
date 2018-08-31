module.exports = {
    cacheDirectory: true,
    babelrc: false,
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                // When someone drags @babel/polyfill
                useBuiltIns: 'entry'
            }
        ]
    ],
    plugins: [
        '@babel/plugin-proposal-object-rest-spread'
    ]
};

//Don't do this.
const possiblities = {
    "@babel/plugin-proposal-class-properties": "7.0.0",
    "@babel/plugin-proposal-object-rest-spread": "7.0.0",
    "@babel/plugin-syntax-dynamic-import": "7.0.0",
    "@babel/plugin-transform-classes": "7.0.0",
    "@babel/plugin-transform-destructuring": "7.0.0",
    "@babel/plugin-transform-react-constant-elements": "7.0.0",
    "@babel/plugin-transform-react-display-name": "7.0.0",
    "@babel/plugin-transform-regenerator": "7.0.0",
    "@babel/plugin-transform-runtime": "7.0.0",
    "@babel/preset-react": "7.0.0",
    "babel-plugin-macros": "2.4.0",
    "babel-plugin-transform-dynamic-import": "2.0.0",
    "babel-plugin-transform-react-remove-prop-types": "0.4.15"
}