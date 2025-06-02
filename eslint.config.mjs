import eslintConfigPrettier from 'eslint-config-prettier'
import prettier from 'prettier'
import security from 'eslint-plugin-security'

export default [
    {
        ignores: [
            './node_modules/*',
            './bin/*',
            './src/common/error/errorHandler.js',
        ],
        languageOptions: {
            ecmaVersion: 13,
            sourceType: 'module',
        },
        plugins: {
            prettier,
        },
        rules: {
            eqeqeq: 'off',
            'no-unused-vars': 'error',
            'no-console': 'off',
            'func-names': 'off',
            'no-underscore-dangle': 'off',
            'detect-non-literal-regexp': 'off',
            'consistent-return': 'off',
            'security/detect-object-injection': 'off',
            'no-param-reassign': [2, { props: false }],
            'no-await-in-loop': 'off',
        },
    },
    security.configs.recommended,
    eslintConfigPrettier,
]