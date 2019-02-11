const webpack = require("webpack");
/**
 * This lets us inject things into html and setup templates.
 * This enables us to hash the filename and include the right
 * import in our index html
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
/**
 * We would normally use extract-text-webpack-pluigin.
 * However, for webpack 4, it's deprecated in favor of
 * mini-css-extract-plugin.
 *
 * See: https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/749#issuecomment-374549467
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * webpackDevServer configuration for serving and developing with HMR
 */
const devServerConfig = require("./webpack-dev-server.config");
/**
 * Babel configs to generate and code transform the application
 */
const babelConfig = require("./babel.config.js");
/**
 * Common paths inside the application
 */
const paths = require("./paths");
/**
 *
 */
const getEnv = require("./env");

/**
 * @param { Boolean } isProd is production environment?
 * @param { Boolean } useDevServer should I use the dev server?
 * @return { Arrray } list of plugins to include in webpack
 */
function generatePlugins(isProd, useDevServer) {
  return [
    new webpack.DefinePlugin({
      "process.env": getEnv()
    }),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      inject: true
    }),
    !isProd && useDevServer && new webpack.HotModuleReplacementPlugin({}),
    !useDevServer &&
      new MiniCssExtractPlugin({
        filename: isProd ? "[contenthash].style.css" : "style.css"
      })
  ].filter(Boolean);
}

/**
 * @param { Boolean } isProd is production environment?
 * @param { Boolean } useDevServer should I use the dev server?
 * @return { Object } rules
 */
function generateModule(isProd, useDevServer) {
  return {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: babelConfig()
      },
      {
        test: /\.css$/,
        include: paths.appSrc,
        use: [
          useDevServer && {
            loader: "style-loader"
          },
          // Extract CSS
          !useDevServer && {
            loader: MiniCssExtractPlugin.loader
          },
          // CSS-Loader lets you use @import like a js import
          {
            loader: "css-loader",
            options: {
              // This is just the number of loaders applied before this one
              importLoaders: 1
            }
          },
          // Magic loading with loads of goodies
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: paths.config,
                ctx: {
                  env: isProd ? "production" : "development"
                }
              }
            }
          }
        ].filter(Boolean)
      }
    ]
  };
}

/**
 * @param { Object } webpackEnv { production:Boolean }
 * @return { Object } webpack config
 */
module.exports = function(webpackEnv) {
  const isProd = Boolean(webpackEnv && webpackEnv.production);
  const useDevServer = Boolean(webpackEnv && webpackEnv.devServer);

  const devOpts = {
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600
    },
    devServer: devServerConfig
  };

  const cfg = {
    output: {
      filename: isProd ? "[contenthash].bundle.js" : "bundle.js",
      path: paths.dist,
      pathinfo: !isProd,
      publicPath: "/"
    },
    entry: [require.resolve("./polyfills"), paths.appIndexJs],
    resolve: {
      modules: [paths.nodeModules],
      extensions: [".js", "json"]
    },
    devtool: isProd ? false : "source-map",
    mode: isProd ? "production" : "development",
    module: generateModule(isProd, useDevServer),
    plugins: generatePlugins(isProd, useDevServer)
  };

  return !isProd && useDevServer ? Object.assign({}, devOpts, cfg) : cfg;
};
