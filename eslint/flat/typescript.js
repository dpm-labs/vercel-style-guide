const tseslint = require('typescript-eslint');
const importPlugin = require('eslint-plugin-import');
const prettier = require('eslint-config-prettier');
const requirePackage = require('../utils/require-package');
const { TYPESCRIPT_FILES } = require('./constants');
const tsdoc = require('./tsdoc');

requirePackage('typescript', 'typescript');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  // Apply type-checked rules only to TypeScript files
  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: TYPESCRIPT_FILES,
  })),
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: TYPESCRIPT_FILES,
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: TYPESCRIPT_FILES,
  })),
  {
    ...importPlugin.flatConfigs.typescript,
    files: TYPESCRIPT_FILES,
  },
  {
    ...prettier,
    files: TYPESCRIPT_FILES,
  },
  {
    ...tsdoc,
    files: TYPESCRIPT_FILES,
  },
  {
    files: TYPESCRIPT_FILES,
    languageOptions: {
      globals: {
        React: 'readonly',
        JSX: 'readonly', // Prevent JSX deprecation warnings for compatibility with 5.2.0
      },
    },
    rules: {
      ...require('../rules/typescript').rules,
      ...require('../rules/typescript/extension').rules,
      ...require('../rules/typescript/import').rules,
      ...require('../rules/typescript/strict').rules,

      // 5.2.0 compatibility - disable strict rules that weren't errors before
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/no-unnecessary-type-conversion': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: true,
      },
    },
  },
];
