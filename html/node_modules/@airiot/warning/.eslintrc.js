module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint-config-rackt",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": 0,
        'arrow-parens': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "no-unused-vars": 0,
        "no-console": 1,
        "comma-dangle": 0,
        "valid-jsdoc": 2,
        "react/jsx-uses-react": 1,
        "react/jsx-no-undef": 2,
        "react/jsx-wrap-multilines": 2,
        "react/prop-types": 0
    }
};