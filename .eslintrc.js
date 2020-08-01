module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/label-has-for":"off",
    "import/prefer-default-export": "off",
    "spaced-comment": "off",
    "react/prefer-stateless-function": "off",
    "react/self-closing-comp": "off",
    "react/prop-types": "off",
    "react/destructuring-assignment": "off",
    "consistent-return": "off",
    "react/require-default-props": "off",
    "react/forbid-prop-types": "off",
    "no-alert":"off",
    "no-console": "off",
    "arrow-body-style":"off",
    "class-methods-use-this":"off",
    "react/jsx-filename-extension":"off",
    "react/sort-comp": "off",
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to", "hrefLeft", "hrefRight" ],
      "aspects": [ "noHref", "invalidHref", "preferButton" ]
    }],
    "max-len": ["error", {"code": 400, "ignoreRegExpLiterals": true, "tabWidth": 2}],
    "linebreak-style": "off",
    "react/jsx-one-expression-per-line": [0, { "allow": "literal" }]    
  },
};
