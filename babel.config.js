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
    '@babel/react'
  ],
  plugins: ["@babel/plugin-syntax-dynamic-import"]
}