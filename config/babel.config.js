const env = process.env.NODE_ENV;

const presetEnvCfg = {
    modules: env === 'test' ? 'commonjs' : false,
    useBuiltIns: 'entry',
    targets: env === 'test' ? { node: 'current' } : { browsers: 'ie 11' },
    loose: true,
};

/**
 * TODO: Method that checks deps in package.json
 * This would allow us to require things like presets for React if
 * React is a dependency
 * if (env === 'production' && isDep('react')) {
 *      //Use babel-plugin-transform-react-remove-prop-types
 * }
 */

module.exports = () => ({
    presets: [['@babel/preset-env', presetEnvCfg]].filter(Boolean),
    plugins: ['@babel/plugin-proposal-object-rest-spread'].filter(Boolean),
});

/*
{
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
*/
