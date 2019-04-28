// Rollup plugins
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'

const config = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'bundle',
      globals: {
        react: 'React'
      }
    }
  ],
  plugins: [
    resolve(),
    babel(require('./babel.config.js')),
    commonjs({
      namedExports: {
        'react': [ 'react' ],
        'react-dom': [ 'react' ]
      }
    }),
    css({
      output: 'bundle.css'
    })
  ],
  external: ['react']
}

export default config
