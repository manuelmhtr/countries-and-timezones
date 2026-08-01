import type {FlatXoConfig} from 'xo';

const xoConfig: FlatXoConfig = [
  {
    ignores: ['vite.config.ts', 'vite.subpaths.config.ts'],
  },
  {
    prettier: true,
    space: true,
    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-loop-func': 'off',
      '@typescript-eslint/no-restricted-types': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      'import-x/extensions': ['error', 'never', {json: 'always'}],
      'n/file-extension-in-import': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-sort': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'require-unicode-regexp': 'off',
      'import-x/no-anonymous-default-export': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            dst: true,
            ct: true,
            tz: true,
            generatorDir: true,
          },
        },
      ],
    },
  },
];

export default xoConfig;
