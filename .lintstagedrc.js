module.exports = {
  "*.js": ["xo --fix"],
  "*.json": ["prettier --write"],
  "*.md": ["markdownlint --fix", "prettier --write"]
};

