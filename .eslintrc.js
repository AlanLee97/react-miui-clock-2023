module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "import/extensions": 0,
    "react/jsx-filename-extension": 0,
    "react/react-in-jsx-scope": 0,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "no-underscore-dangle": 0,
    "linebreak-style": 0,
    "no-unused-vars": 1,
    "consistent-return": 0,
    "import/no-cycle": 1,
    "react/destructuring-assignment": 0,
    "react/no-access-state-in-setstate": 0,
    "class-methods-use-this": 0,
    "react/no-unused-state": 1,
    "react/sort-comp": 0,
    "no-return-assign": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/prop-types": 0,
    "react/no-unknown-property": 0,
    "no-shadow": 0,
    "no-use-before-define": 1,
    "no-plusplus": 0,
    "import/no-unresolved": 0,
    "max-len": 0,
    "react/no-unstable-nested-components": 0,
    "react/button-has-type": 0,
    "comma-dangle": 0,
    "react/jsx-one-expression-per-line": 0,
    "arrow-parens": 0,
    "quotes": 0,
    "quote-props": 0,
    "no-debugger": 1,
    "no-else-return": 0,
    "no-trailing-spaces": 0,
    "prefer-const": 1,
    "arrow-body-style": 0,
    "react/jsx-max-props-per-line": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-closing-tag-location": 0,
    "react/self-closing-comp": 0
  },
};
