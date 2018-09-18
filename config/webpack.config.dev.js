const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');
const webpackDevServerConfig = require('./webpack-dev-server.config');
const babelConfig = require('./babel.config.js');

process.env.NODE_ENV = 'development';

module.exports = {
    entry: [require.resolve('./polyfills'), paths.appIndexJs],
    output: {
        // pathinfo adds filename comments to the requires in the output
        pathinfo: true,
        // This is not a real file
        filename: 'assets/js/bundle.js',
        // This serves the app from the root of localhost:<port>
        publicPath: '/'
    },
    resolve: {
        modules: [paths.nodeModules],
        extensions: ['.js', 'json']
    },
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: paths.appSrc,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: babelConfig()
            },
            {
                test: /\.css$/,
                include: paths.appSrc,
                use: [
                    // Add css to the dom by adding a <style> tag
                    {
                        loader: 'style-loader'
                    },
                    // CSS-Loader lets you use @import like a js import
                    {
                        loader: 'css-loader',
                        options: {
                            // This is just the number of loaders applied before this one
                            importLoaders: 1
                        }
                    },
                    // Magic loading with loads of goodies
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: paths.config,
                                ctx: {
                                    env: 'development'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new HtmlWebpackPlugin({
            template: paths.appHtml,
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin({})
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    devServer: webpackDevServerConfig
};
