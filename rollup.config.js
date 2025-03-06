import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { dts } from 'rollup-plugin-dts'
import postcss from "rollup-plugin-postcss"
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/cjs/index.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'dist/esm/index.js',
                format: 'esm',
                sourcemap: true,
            }
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                declaration: false,
                outDir: undefined,
                exclude: ["**/*.test.ts", "**/*.test.tsx", "**/*.stories.tsx"]
            }),
            postcss({
                extensions: ['.css'],
                minimize: true,
                inject: true,
            }),
            terser(),
        ],
        external: ["react", "react-dom"]
    },
    {
        input: 'src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'esm' }],
        plugins: [dts()],
        external: [/\.css$/, "react", "react-dom"]
    }
]