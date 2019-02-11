const postcssNormalize = require("postcss-normalize");

module.exports = {
  plugins: [
    require("autoprefixer"),
    postcssNormalize({
      browsers: "last 2 versions"
    })
  ]
};
