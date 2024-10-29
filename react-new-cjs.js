const eslintPluginReact = require('eslint-plugin-react')
const eslintPluginReactHooks = require('eslint-plugin-react-hooks')
const eslintPluginQuery = require('@tanstack/eslint-plugin-query')
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y')
const globals = require('globals')
const mainConfig = require('./index')

/** @type {import("eslint").Linter.Config} */
const reactPluginConfig = {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  plugins: {
    react: eslintPluginReact
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      ...globals.browser
    }
  },
  rules: {
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'ignore' }
    ],
    'react/jsx-boolean-value': ['warn', 'never'],
    'react/jsx-no-leaked-render': 'error',
    'react/prop-types': 'off'
  }
}

/** @type {import("eslint").Linter.Config} */
const a11yPluginConfig = {
  files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
  plugins: {
    'jsx-a11y': eslintPluginJsxA11y
  },
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      }
    }
  },
  rules: {
    'jsx-a11y/alt-text': [
      'error',
      {
        img: ['Image']
      }
    ],
    'jsx-a11y/img-redundant-alt': [
      'error',
      {
        components: ['Image']
      }
    ],
    'jsx-a11y/anchor-has-content': [
      'error',
      {
        components: ['Link']
      }
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to']
      }
    ]
  }
}

/** @type {import("eslint").Linter.Config} */
const reactHooksPluginConfig = {
  plugins: {
    'react-hooks': eslintPluginReactHooks
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    ...eslintPluginReactHooks.configs.recommended.rules
  }
}

/** @type {import("eslint").Linter.Config} */
const commonRules = {
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',

    // Import order rules
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
            pattern: '@/styles/**',
            group: 'internal',
            position: 'after'
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before'
          }
        ],
        'newlines-between': 'always'
      }
    ],

    // Restricted imports
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@/modules/*/*']
      }
    ],

    // Spacing and comments
    'spaced-comment': ['warn', 'always', { markers: ['/'] }]

    // Accessibility rules
  }
}

/** @type {import("eslint").Linter.Config[]} */
const reactConfig = [
  {
    ignores: ['**/dist', '**/*.cjs']
  },
  ...mainConfig,
  reactPluginConfig,
  reactHooksPluginConfig,
  ...eslintPluginQuery.configs['flat/recommended'],
  a11yPluginConfig,
  commonRules
  // {
  //   plugins: {
  //     jsxA11y: eslintPluginJsxA11y
  //   },
  //   languageOptions: {
  //     globals: globals.browser
  //   },
  //   settings: {
  //     react: {
  //       version: 'detect'
  //     }
  //   },
  //   rules: {
  //     '@typescript-eslint/consistent-type-imports': 'error',

  //     // Import order rules
  //     'import/order': [
  //       'warn',
  //       {
  //         groups: [
  //           'builtin',
  //           'external',
  //           'internal',
  //           ['parent', 'sibling', 'index']
  //         ],
  //         alphabetize: {
  //           order: 'asc'
  //         },
  //         pathGroups: [
  //           {
  //             pattern: '@/styles/**',
  //             group: 'internal',
  //             position: 'after'
  //           },
  //           {
  //             pattern: '@/**',
  //             group: 'internal',
  //             position: 'before'
  //           }
  //         ],
  //         'newlines-between': 'always'
  //       }
  //     ],

  //     // Restricted imports
  //     'no-restricted-imports': [
  //       'error',
  //       {
  //         patterns: ['@/modules/*/*']
  //       }
  //     ],

  //     // Spacing and comments
  //     'spaced-comment': ['warn', 'always', { markers: ['/'] }]

  //     // Accessibility rules
  //   }
  // }
]

module.exports = reactConfig