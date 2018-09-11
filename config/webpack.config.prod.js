const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const babelConfig = require('./babel.config.js');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: [require.resolve('./polyfills'), paths.appIndexJs],
    output: {
        // pathinfo adds filename comments to the requires in the output
        pathinfo: false,
        path: paths.dist,
        filename: 'bundle.js',
    },
    resolve: {
        modules: [paths.nodeModules],
        extensions: ['.js', 'json'],
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: babelConfig(),
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            inject: true,
        }),
    ],
};
