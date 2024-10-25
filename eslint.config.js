import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
    {
        ignores: ['dist', 'vite.config.ts'],
    },
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            globals: {
                browser: true,
                document: true,
            },
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                project: './tsconfig.app.json',
                tsconfigRootDir: __dirname,
            },
        },
        files: ['**/*.{ts,tsx}'],
        plugins: {
            react: reactPlugin,
            '@typescript-eslint': typescriptPlugin,
        },
        rules: {
            'no-unused-vars': ['off'],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
];
