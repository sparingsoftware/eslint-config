const defaultConfig = require('./index')

/** @type {import("eslint").Linter.Config}  */
const vue = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@sparing-software/eslint-config',
    '@vue/eslint-config-typescript/recommended'
  ],
  /* 
    This parser safe us from extra eslint problem after
    adding @typescript-eslint/prefer-nullish-coalescing flag into index.js
    https://stackoverflow.com/a/66598327 
  */
  parser: 'vue-eslint-parser',
  parserOptions: {
    ...defaultConfig.extends,
    ecmaVersion: 'latest'
  },
  rules: {
    ...defaultConfig.rules,
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: {
          order: 'asc'
        },
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always', // prettier
          normal: 'always',
          component: 'always'
        }
      }
    ],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/prefer-true-attribute-shorthand': ['warn', 'always'],
    'vue/component-tags-order': [
      'warn',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/define-props-declaration': 'warn'
  }
}

module.exports = vue
