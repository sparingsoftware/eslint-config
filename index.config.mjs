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
const mainConfig = [
  {
    ignores: ['**/dist', '**/*.cjs']
  },
  eslintJS.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginImport.flatConfigs.recommended,
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
    // Vue and Astro config have their own parserOptions implementation so we don't attach them here.
    files: ['**/*.ts', '**/*.tsx'],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',
      /*
        Rule @typescript-eslint/prefer-nullish-coalescing - require parserOptions reason:
        Error while loading rule '@typescript-eslint/prefer-nullish-coalescing':
        You have used a rule which requires parserServices to be generated. 
        You must therefore provide a value for the "parserOptions.project".
      */
      parserOptions: {
        parser: '@typescript-eslint/parser',
        project: true
      }
    }
  },
  // Overrides
  {
    /* 
        I try to fix rule: '@typescript-eslint/prefer-nullish-coalescing' for Astro but I can't find any solution.
        The problem occurred when we created a new .astro file in which case eslint gave this error:
        Parsing error: "parserOptions.programs" has been provided for @typescript-eslint/parser.
        The file was not found in any of the provided program instance(s).
      */
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],

    rules: {
      '@typescript-eslint/prefer-nullish-coalescing': 'warn'
    }
  },
  importResolverFixConfig
]

export default mainConfig
