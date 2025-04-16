module.exports = {
  nodeVersion: ">=18",
  prettier: true,
  space: true,
  rules: {
    "@typescript-eslint/unified-signatures": "off",
    "import/extensions": "off",
    "unicorn/no-array-reduce": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "allowList": {
          "dst": true,
        }
      }
    ]
  }
};
