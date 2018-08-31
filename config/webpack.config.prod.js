const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
    entry: [
        require.resolve('./polyfills'),
        paths.appIndexJs
    ],
    output: {
        // pathinfo adds filename comments to the requires in the output
        pathinfo: true,
        // This is not a real file
        filename: 'assets/js/bundle.js',
        // This serves the app from the root of localhost:<port>
        publicPath: '/',
    },
    resolve: {
        modules: [paths.nodeModules],
        extensions: ['.js', 'json']
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    cacheDirectory: true
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            inject: true
        })
    ]
}