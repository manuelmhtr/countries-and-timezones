import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import dts from 'rollup-plugin-dts';

const plugins = [
  commonjs(),
  json(),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/env'],
  }),
  uglify(),
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
        file: 'esm/index.js',
        format: 'es',
        sourcemap: true,
      }
    ],
    plugins
  },
  {
    input: 'types/index.d.ts',
    output: {
      file: 'dist/types.d.ts',
      format: 'esm',
    },
    plugins: [dts(), json({ preferConst: true, compact: true })],
  }
];
