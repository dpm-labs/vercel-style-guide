const next = require('@next/eslint-plugin-next');
const { fixupPluginRules } = require('@eslint/compat');
const requirePackage = require('../utils/require-package');
const { JAVASCRIPT_FILES } = require('./constants');

requirePackage('next', '@next/eslint-plugin-next');

const babelOptions = {
  presets: (() => {
    try {
      require.resolve('next/babel');
      return ['next/babel'];
    } catch {
      return [];
    }
  })(),
};

// Start with all recommended rules and disable problematic ones for ESLint 9 compatibility
const compatibleNextRules = {
  ...next.configs.recommended.rules,
  // Disable rules that use deprecated ESLint 8 APIs incompatible with ESLint 9
  '@next/next/no-duplicate-head': 'off',
  '@next/next/google-font-display': 'off',
  '@next/next/google-font-preconnect': 'off',
  '@next/next/next-script-for-ga': 'off',
  '@next/next/no-before-interactive-script-outside-document': 'off',
};

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  {
    plugins: {
      '@next/next': fixupPluginRules(next),
    },
    rules: {
      ...compatibleNextRules,
    },
    languageOptions: {
      parserOptions: {
        babelOptions,
      },
    },
    ignores: ['**/.next/**'],
  },
  {
    files: JAVASCRIPT_FILES,
    languageOptions: {
      parserOptions: {
        babelOptions,
      },
    },
  },
];
