/** @type {import("eslint").Linter.Config}  */
const defaultConfig = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  plugins: ['import', 'unicorn'],
  rules: {
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'TSInterfaceDeclaration',
        message: 'Prefer using types instead of interfaces'
      }
    ],
    'arrow-body-style': ['warn', 'as-needed'],
    'spaced-comment': ['warn', 'always'],
    'no-empty': 'warn',
    'no-duplicate-imports': 'warn',
    'prefer-destructuring': ['warn', { object: false, array: true }],
    'no-multiple-empty-lines': ['error', { max: 2 }],
    'object-shorthand': ['warn', 'always'],
    'import/newline-after-import': ['warn', { count: 1 }],
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
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before'
          }
        ],
        'newlines-between': 'always'
      }
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/array-type': 'warn',
    '@typescript-eslint/method-signature-style': 'warn',
    '@typescript-eslint/consistent-type-assertions': [
      'warn',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter'
      }
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    'unicorn/prefer-ternary': 'warn',
    'unicorn/prefer-negative-index': 'warn',
    'unicorn/prefer-at': 'warn',
    'unicorn/prefer-switch': 'warn',
    'unicorn/switch-case-braces': ['warn', 'avoid'],
    'unicorn/consistent-destructuring': 'warn',
    'unicorn/no-useless-undefined': 'warn',
    'unicorn/expiring-todo-comments': 'warn',
    'unicorn/require-array-join-separator': 'warn'
  },
  /*
    Rule @typescript-eslint/prefer-nullish-coalescing - require parserOptions reason:
    Error while loading rule '@typescript-eslint/prefer-nullish-coalescing':
    You have used a rule which requires parserServices to be generated. 
    You must therefore provide a value for the "parserOptions.project"
  */
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: true
  }
}

module.exports = defaultConfig
