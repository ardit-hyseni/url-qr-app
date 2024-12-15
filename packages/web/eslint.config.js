import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // Include TypeScript recommended rules
      ...tseslint.configs.strict, // Enforce stricter TypeScript rules
    ],
    files: ['**/*.{ts,tsx}'], // Apply rules to TS and TSX files
    languageOptions: {
      ecmaVersion: 2020, // Use modern ECMAScript features
      globals: globals.browser, // Browser-specific global variables
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // TypeScript-specific rules
      '@typescript-eslint/explicit-function-return-type': 'error', // Require explicit return types
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // No unused variables
      '@typescript-eslint/no-explicit-any': 'warn', // Avoid 'any' type usage
      '@typescript-eslint/semi': ['error', 'always'], // Enforce semicolons
      '@typescript-eslint/consistent-type-imports': 'error', // Prefer type imports
      '@typescript-eslint/no-non-null-assertion': 'warn', // Warn on non-null assertions
      '@typescript-eslint/ban-types': 'error', // Ban certain types like 'Function' or '{}'
      '@typescript-eslint/prefer-readonly': 'error', // Prefer readonly modifiers

      // General JavaScript rules
      eqeqeq: ['error', 'always'], // Require strict equality
      curly: 'error', // Require curly braces for all control statements
      'no-console': 'warn', // Warn on console logs
      'no-debugger': 'error', // Disallow debugger statements
      quotes: ['error', 'single', { avoidEscape: true }], // Enforce single quotes
      indent: ['error', 2, { SwitchCase: 1 }], // Enforce consistent indentation
      'comma-dangle': ['error', 'always-multiline'], // Enforce trailing commas where valid
    },
  }
);
