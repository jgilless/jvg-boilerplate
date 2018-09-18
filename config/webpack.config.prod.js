const webpack = require('webpack');
/**
 * This lets us inject things into html and setup templates.
 * This enables us to hash the filename and include the right
 * import in our index html
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * We would normally use extract-text-webpack-pluigin.
 * However, for webpack 4, it's deprecated in favor of
 * mini-css-extract-plugin.
 *
 * See: https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/749#issuecomment-374549467
 */

// Minify CSS
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const paths = require('./paths');
const babelConfig = require('./babel.config.js');

process.env.NODE_ENV = 'production';

module.exports = {
    entry: [require.resolve('./polyfills'), paths.appIndexJs],
    output: {
        // pathinfo adds filename comments to the requires in the output
        pathinfo: false,
        path: paths.dist,
        filename: '[hash].bundle.js',
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
            {
                test: /\.css$/,
                include: paths.appSrc,
                use: [
                    // Extract CSS
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    // CSS-Loader lets you use @import like a js import
                    {
                        loader: 'css-loader',
                        options: {
                            // This is just the number of loaders applied before this one
                            importLoaders: 1,
                        },
                    },
                    // Magic loading with loads of goodies
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: paths.config,
                                ctx: {
                                    env: 'development',
                                },
                            },
                        },
                    },
                ],
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
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css',
        }),
    ],
};
