# Boilerplate

Features:

-   Babel
-   Webpack
-   Webppack-serve

### TODO:

-   Chunking for caching https://webpack.js.org/guides/caching/
-   CSS Support (loading, autoprefixing, etc.)

### Acknowledgements

Pieces of this app boilerplate are inspired by
[create-react-app](https://github.com/facebook/create-react-app). The config
folder is very similar, with `config/paths.js` and `config/polyfills.js` being
the same idea. Some differences is CRA is using
[webpack-dev-server](https://github.com/webpack/webpack-dev-server), which is in
maintenance mode, while we're using
[webpack-serve](https://github.com/webpack-contrib/webpack-serve), which is the
future of webpack serving.

Upgrades over CRA: Webpack 4, Babel 7.
