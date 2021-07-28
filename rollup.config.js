import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';

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
    output: {
      name: 'ct',
      file: 'dist/index.js',
      format: 'umd',
      exports: 'named',
      sourcemap: true,
    },
    plugins
  },
];
