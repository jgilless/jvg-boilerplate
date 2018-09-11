module.exports = {
    // Don't copy server URI to clipboard
    clipboard: false,
    // Hot Module Reload - native websockets only, use in modern browsers.
    hot: {
        hot: true,
        // Too noisy at higher levels, warnings are useful
        logLevel: 'warn',
        // Reload the page for build errors
        reload: true,
    },
    open: true,
    port: 3000,
};
