import eslintPluginImport from 'eslint-plugin-import'
import eslintJS from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

/**
 * It fixes the error: "Unable to resolve path to module '...' - import/no-unresolved"
 * https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module
 */
/** @type {import("eslint").Linter.Config}  */
const importResolverFixConfig = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}

/** @type {import("eslint").Linter.Config[]}  */
const baseConfig = [
  {
    ignores: ['**/dist', '**/*.cjs']
  },
  eslintJS.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      unicorn: eslintPluginUnicorn
    },
    languageOptions: {
      globals: globals.builtin
    },
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

      'prefer-destructuring': [
        'warn',
        {
          object: false,
          array: true
        }
      ],

      'no-multiple-empty-lines': [
        'error',
        {
          max: 2
        }
      ],

      'object-shorthand': ['warn', 'always'],

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

      'unicorn/prefer-ternary': 'warn',
      'unicorn/prefer-negative-index': 'warn',
      'unicorn/prefer-at': 'warn',
      'unicorn/prefer-switch': 'warn',
      'unicorn/switch-case-braces': ['warn', 'avoid'],
      'unicorn/consistent-destructuring': 'warn',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/expiring-todo-comments': 'warn',
      'unicorn/require-array-join-separator': 'warn'
    }
  },
  // Overrides
  {
    /*
      Vue and Astro config have their own parserOptions implementation so we don't attach them here.
    */
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: true
      }
    }
  },
  importResolverFixConfig
]

/** @type {import("eslint").Linter.Config[]}  */
export const mainConfig = [
  ...baseConfig,
  eslintPluginImport.flatConfigs.recommended,
  {
    rules: {
      'import/newline-after-import': [
        'warn',
        {
          count: 1
        }
      ],

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
      ]
    }
  }
]

// Astro main config doesn't include import plugin, as it breaks the "eslint-plugin-astro" package
/** @type {import("eslint").Linter.Config[]}  */
export const mainConfigAstro = [...baseConfig]

export default mainConfig