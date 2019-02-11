module.exports = {
  linters: {
    "*.js": ["eslint --fix", "git add"],
    "*.+(js|json|css|md)": ["prettier --write", "git add"]
  }
};
