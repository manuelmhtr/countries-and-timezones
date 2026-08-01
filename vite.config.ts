/// <reference types="vitest/config" />
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  test: {
    include: ['test/unit/*.ts'],
    environment: 'node',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ct',
      fileName: (format, entryName) =>
        `index${format === 'umd' ? '' : '.esm'}${entryName}.js`,
    },
    rollupOptions: {
      output: [
        {
          name: 'ct',
          format: 'umd',
          dir: 'dist',
          exports: 'named',
          entryFileNames: 'index.js',
        },
        {
          name: 'ct',
          format: 'umd',
          dir: 'dist',
          exports: 'named',
          entryFileNames: 'index.min.js',
          plugins: [terser()],
        },
        {
          format: 'es',
          dir: 'esm',
          entryFileNames: 'index.js',
        },
        {
          format: 'es',
          dir: 'esm',
          entryFileNames: 'index.min.js',
          plugins: [terser()],
        },
      ],
    },
    minify: false,
    sourcemap: true,
  },
});
