const paths = require('./paths');

module.exports = {
    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: paths.publicPath,
    quiet: true,
    host: '0.0.0.0',
    port: 3000,
    clientLogLevel: 'none',
    historyApiFallback: {
        disableDotRule: true
    },
    open: true
};
