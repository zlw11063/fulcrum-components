module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
        corejs: '2',
        useBuiltIns: 'usage'
      }
    ],
    '@babel/react',
    // This is needed so { css } from emotion can work
    '@emotion/babel-preset-css-prop'
  ],
}