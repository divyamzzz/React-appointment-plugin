const resolve = require('@rollup/plugin-node-resolve').nodeResolve;
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel').default;
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const replace = require('@rollup/plugin-replace');
const json = require('@rollup/plugin-json');

const extensions = ['.js', '.jsx'];

module.exports = {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true
        }, {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve({extensions}),
        babel({
            babelHelpers: 'bundled',
            extensions,
            include: ['src/**/*'],
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env', '@babel/preset-react']
        }),
        commonjs({transformMixedEsModules: true}),
        json(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            preventAssignment: true
        })
    ]
};