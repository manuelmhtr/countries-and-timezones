import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';

const input = 'src/index.js';
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
    input,
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'ct',
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      name: 'ct',
      sourcemap: true,
    },
    plugins,
  },
];
