// eslint.config.mjs
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['dist', 'build', 'node_modules'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      ...config.languageOptions,
      parserOptions: {
        ...config.languageOptions?.parserOptions,
        projectService: true, // ou project: ['./tsconfig.json'] si tu préfères
        tsconfigRootDir: import.meta.dirname,
      },
    },
  })),

  // Désactive les règles en conflit avec Prettier
  eslintConfigPrettier,
];
