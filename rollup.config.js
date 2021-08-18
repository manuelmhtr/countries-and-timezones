import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

const plugins = [
  commonjs(),
  json(),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/env'],
  }),
];

export default [
  {
    input: 'src/index.js',
    output: [
      {
        name: 'ct',
        file: 'dist/index.js',
        format: 'umd',
        exports: 'named',
        sourcemap: true,
      },
      {
        name: 'ct',
        file: 'dist/index.min.js',
        format: 'umd',
        exports: 'named',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: 'esm/index.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: 'esm/index.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
    plugins,
  },
  {
    input: 'types/index.d.ts',
    output: {
      file: 'esm/types.d.ts',
      format: 'es',
    },
    plugins: [
      dts(),
      json({ preferConst: true, compact: true }),
    ],
  },
];
