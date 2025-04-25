/// <reference types="vitest/config" />
import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import terser from '@rollup/plugin-terser';
import dts from 'vite-plugin-dts';

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
  plugins: [
    dts({
      include: ['src/index.ts', 'src/data.json'],
      entryRoot: 'src',
      rollupTypes: true,
      beforeWriteFile(filePath, content) {
        return {
          filePath: filePath.replace('index.d.ts', 'types.d.ts'),
          content,
        };
      },
      outDir: ['esm'],
    }),
  ],
});
