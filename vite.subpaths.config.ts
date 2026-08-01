import {resolve} from 'node:path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        dynamic: resolve(__dirname, 'src/dynamic.ts'),
        data: resolve(__dirname, 'src/data.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: [
        {
          format: 'cjs',
          dir: 'dist',
          exports: 'named',
          entryFileNames: '[name].js',
        },
        {
          format: 'es',
          dir: 'esm',
          entryFileNames: '[name].js',
        },
      ],
    },
    minify: false,
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ['src/index.ts', 'src/dynamic.ts', 'src/data.ts'],
      entryRoot: 'src',
      rollupTypes: false,
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
