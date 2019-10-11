module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb-base",
  "env": {
    browser: true,
    node: true
  },
  "rules": {
    "indent": ["error", 2],
    "comma-dangle": ["error", "never"],
    "semi": ["error", "never"],
    "array-callback-return": ["error", { allowImplicit: true }],
    "no-console": ["error", { allow: ["warn", "error", "log"] }],
    "global-require": "off"
  }
}