import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import typescript from "@rollup/plugin-typescript";

const plugins = [
  commonjs(),
  typescript({
    include: ["src/**/*.ts"],
    declaration: true,
    declarationDir: "dist",
    outDir: "dist",
  }),
  json({ preferConst: true, compact: true }),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/env'],
  }),
];

export default [
  {
    input: 'src/index.ts',
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
    ],
    plugins,
  },
  {
    input: 'src/index.ts',
    output: [
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
    plugins: [
      commonjs(),
      typescript({
        include: ["src/**/*.ts"],
        declaration: true,
        declarationDir: "esm",
        outDir: "esm",
      }),
      json({ preferConst: true, compact: true }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/env'],
      }),
    ],
  },
];
